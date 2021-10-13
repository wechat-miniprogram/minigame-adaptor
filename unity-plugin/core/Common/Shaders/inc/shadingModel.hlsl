#ifndef __SHADING_MODEL_HLSL_
	#define __SHADING_MODEL_HLSL_

	#include "./dataStruct.hlsl"

	// Taken from https://gist.github.com/romainguy/a2e9208f14cae37c579448be99f78f25
	// Normal Distribution Function
	half D_GGX_Mobile(half roughness, float NoH)
	{
		float oneMinusNoHSqr = 1.0 - NoH * NoH; 
		half a = roughness * roughness;
		half n = NoH * a;
		half p = a / (oneMinusNoHSqr + n * n);
		half d = p * p;
		// clamp to avoid overlfow in a bright env
		return min(d, 2048.0);
	}

	// Vis(l,v): G(l,v) 项和 4(n,l)(n,v)
	half Vis_SmithJointApprox(half roughness, half NoV, half NoL){
		half a = roughness * roughness;
		half Vis_SmithV = NoL * (NoV * (1 - a) + a);
		half Vis_SmithL = NoV * (NoL * (1 - a) + a);
		float Vis = 0.5 * rcp(Vis_SmithV + Vis_SmithL);
		// float Vis = 0.5 / (Vis_SmithV + Vis_SmithL);
		return Vis;
	}

	half CalcSpecular(half roughness, half NoH)
	{
		return (roughness*0.25 + 0.25) * D_GGX_Mobile(roughness, NoH);
	}

	void InitGBufferData(inout GBufferData gbuffer, SurfaceData surface, half3 normalWS){
		gbuffer.normalWS = normalWS;
		gbuffer.baseColor = surface.baseColor;
		gbuffer.metallic = surface.metallic;
		gbuffer.specular = surface.specular;
		gbuffer.roughness = max(0.015625, 1.0 - surface.smoothness);
		gbuffer.ao = surface.occlusion;
	}

	void InitClearCoatContext(inout ShadingContext context, inout GBufferData gbuffer, half CustomData0, half CustomData1, half NoV){
		#if defined(CLEAR_COAT_SHADINGMODEL)
			context.clearCoat = saturate(CustomData0);
			context.clearCoatRoughness = clamp(CustomData1, 0.015625, 1.0);

			// Approximation of refraction's effect on EnvBRDF
			half refractionScale = ((NoV * 0.5 + 0.5) * NoV - 1) * saturate(1.25 - 1.25 * gbuffer.roughness) + 1;

			gbuffer.specular = gbuffer.specular * (lerp(1, refractionScale, context.clearCoat));
			half kd = 0.08 * gbuffer.specular; // kd —— kDieletricSpec
			context.specular = (kd - kd * gbuffer.metallic) + gbuffer.baseColor * gbuffer.metallic;	// 2 mad
			context.specPreEnvBrdf = context.specular;
			context.diffuse = gbuffer.baseColor - gbuffer.baseColor * gbuffer.metallic;
			
			// This is to prevent Vis to get inf when both NoL and NoV are 0.
			context.NoV = saturate(abs(NoV) + 1e-5);
		#endif
	}

	void InitShadingContext(inout ShadingContext context, inout GBufferData gbuffer, SurfaceData surface, half3 viewDirWS, half3 lightDirWS)
	{
		half3 halfDir = normalize(lightDirWS + viewDirWS);
		half NoV = max(dot(gbuffer.normalWS, viewDirWS), 0);
		half NoH = saturate(dot(gbuffer.normalWS, halfDir));
		half NoL = saturate(dot(gbuffer.normalWS, lightDirWS));

		context.opacity = surface.alpha;
		context.V = viewDirWS;
		context.H = halfDir;
		context.NoH = NoH;
		context.NoL = NoL;
		
		#if defined(CLEAR_COAT_SHADINGMODEL)
			InitClearCoatContext(context, gbuffer, surface.clearCoat, surface.clearCoatRoughness, NoV);
			context.clearCoatGrazingTerm = saturate(1.0 - surface.clearCoatRoughness + kDieletricSpec.r);
		#endif
		context.specular = GetEnvBRDF(context.specular, gbuffer.roughness, NoV);

		//IBL context
		half oneMinusReflectivity = OneMinusReflectivityMetallic(gbuffer.metallic);
        half reflectivity = 1.0 - oneMinusReflectivity;
		context.grazingTerm = saturate(surface.smoothness + reflectivity);
		context.reflectVector =  reflect(-viewDirWS, gbuffer.normalWS);
		context.fresnelTerm = pow4(1.0 - saturate(dot(gbuffer.normalWS, viewDirWS)));

	}

	DLightingResult LightingClearCoat(ShadingContext context, GBufferData gbuffer){
		DLightingResult lighting = (DLightingResult)0;
		#if defined(CLEAR_COAT_SHADINGMODEL)
			half clearCoatRoughness = context.clearCoatRoughness;
			half clearCoat = context.clearCoat;
			
			half NoL = context.NoL;
			half NoH = context.NoH;
			half NoV = context.NoV;

			half3 V = context.V;
			half3 H = context.H;
			
			// Fresnel: Schlick近似计算
			half VoH = max(0, dot(V, H));
			half F0 = 0.04;
			half Fc = pow5(1 - VoH);
			half F = Fc + (1 - Fc) * F0;
			half layerAttenuation = 1 - F;
			layerAttenuation *= layerAttenuation;

			// Vis: G与4(n * l)(n * v)的合并项
			float Vis = Vis_SmithJointApprox(clearCoatRoughness, NoV, NoL);
			
			lighting.specular = NoL * clearCoat * F * Vis * D_GGX_Mobile(clearCoatRoughness, NoH);

			half eta = 0.66666667f;
			half refractionBlendFactor = (0.63 - 0.22 * VoH) * VoH - 0.745;
			half refractionProjectionTerm = refractionBlendFactor * NoH;
			half bottomNoV = saturate(eta * NoV - refractionProjectionTerm);
			half bottomNoL = saturate(eta * NoL - refractionProjectionTerm);

			half3 transmission = 0.0;
			if (bottomNoL > 0.0 && bottomNoV > 0.0)
			{
				// Normalized layer thickness documented for clarity
				half thinDistance = (rcp(bottomNoV) + rcp(bottomNoL));
				half absorptionMix = gbuffer.metallic;

				transmission = 1.0;
				if (absorptionMix > 0.0)
				{
					// Base color represents reflected color viewed at 0 incidence angle, after being absorbed through the substrate.
					// Because of this, extinction is normalized by traveling through layer thickness twice
					half3 transmissionColor = gbuffer.baseColor;
					half3 extinctionCoefficient = -log(transmissionColor) * 0.5f;
					half3 opticalDepth = extinctionCoefficient * max(thinDistance - 2.0, 0.0);
					transmission = saturate(exp(-opticalDepth));
					transmission = lerp(1.0, transmission, absorptionMix);
				}
			}

			half3 commonDiffuse = context.diffuse;
			half3 defaultDiffuse = NoL;
			half3 refractedDiffuse = (layerAttenuation * bottomNoL) * transmission;
			lighting.diffuse = commonDiffuse * lerp(defaultDiffuse, refractedDiffuse, clearCoat);

			half3 commonSpecular = context.specular * CalcSpecular(gbuffer.roughness, NoH);
			half3 defaultSpecular = NoL;
			half3 refractedSpecular = layerAttenuation * transmission * bottomNoL;
			lighting.specular += commonSpecular * lerp(defaultSpecular, refractedSpecular, clearCoat);
		#endif
		return lighting;
	}

	DLightingResult LightingBxDFCore(ShadingContext context, GBufferData gbuffer)
	{	
		DLightingResult lighting = (DLightingResult)0;
		#if defined(CLEAR_COAT_SHADINGMODEL)
			return LightingClearCoat(context, gbuffer);
		#endif
		return lighting;
	}

	fixed3 LightingBxDF(SurfaceData surface, PixelInput input, half3 lightColor, half3 lightDirWS){

		fixed3 color = 0;
		GBufferData gbuffer = (GBufferData)0;
		InitGBufferData(gbuffer, surface, input.normalWS);

		ShadingContext shadingContext = (ShadingContext)0;;
		InitShadingContext(shadingContext, gbuffer, surface, input.viewDirWS, lightDirWS);	
	
		// direct
		DLightingResult lighting = LightingBxDFCore(shadingContext, gbuffer);
		color += lightColor * input.shadowAtten *(lighting.specular + lighting.diffuse);
		
		
		// indirect 
		half3 indirectLighting = GlobalIllumination(shadingContext, gbuffer, input.bakeGI);
		color += indirectLighting;

		return sqrt(color);
	}

	fixed3 LightingBxDFNoGI(SurfaceData surface, PixelInput input, half3 lightColor, half3 lightDirWS){

		fixed3 color = 0;
		GBufferData gbuffer = (GBufferData)0;
		InitGBufferData(gbuffer, surface, input.normalWS);

		ShadingContext shadingContext = (ShadingContext)0;;
		InitShadingContext(shadingContext, gbuffer, surface, input.viewDirWS, lightDirWS);	
	
		// direct
		DLightingResult lighting = LightingBxDFCore(shadingContext, gbuffer);
		color += lightColor * input.shadowAtten *(lighting.specular + lighting.diffuse);
		
		return sqrt(color);
	}


#endif//__SHADING_MODEL_HLSL_