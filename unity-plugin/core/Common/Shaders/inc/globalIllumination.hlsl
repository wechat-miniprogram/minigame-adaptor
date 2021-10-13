#ifndef __GLOBAL_ILLUMINATION_HLSL_
    #define __GLOBAL_ILLUMINATION_HLSL_
    #include "./dataStruct.hlsl"

    // IBL
    #if UNITY_VERSION < 560
        #define unity_ShadowColor fixed4(0.42,0.48,0.63,1.0)
    #endif
    #define UNITY_SPECUBE_LOD_STEPS 6
    fixed RoughnessToMipmapLevel(fixed roughness)
    {
        uint mipMapCount = UNITY_SPECUBE_LOD_STEPS;
        roughness = roughness * (1.7 - 0.7 * roughness);
        return roughness * mipMapCount;
    }
    half3 GetEnvBRDF( half3 specular, half roughness, half NoV )
	{
		// [ Lazarov 2013, "Getting More Physical in Call of Duty: Black Ops II" ]
		// Adaptation to fit our G term.
		const half4 c0 = { -1, -0.0275, -0.572, 0.022 };
		const half4 c1 = { 1, 0.0425, 1.04, -0.04 };
		half4 r = roughness * c0 + c1;
		half a004 = min( r.x * r.x, exp2( -9.28 * NoV ) ) * r.x + r.y;
		half2 AB = half2( -1.04, 1.04 ) * a004 + r.zw;

		// Anything less than 2% is physically impossible and is instead considered to be shadowing
		// Note: this is needed for the 'specular' show flag to work, since it uses a specular of 0
		AB.y *= saturate( 50.0 * specular.g );

		return specular * AB.x + AB.y;
	}
    half3 GlossyEnvironmentReflection(half3 reflectVec, half perceptualRoughness, half occlusion)
    {
        // half4 encodedIrradiance = UNITY_SAMPLE_TEXCUBE(unity_SpecCube0, reflectVec) * (1 - perceptualRoughness);
        // return encodedIrradiance.rgb * occlusion;

        half mip = RoughnessToMipmapLevel(perceptualRoughness);
        half4 encodedIrradiance = unity_SpecCube0.SampleLevel(samplerunity_SpecCube0, reflectVec, mip);
        return encodedIrradiance.rgb * occlusion;
    }

    half3 EnviromentBRDF(BRDFData brdfData, half3 indirectDiffuse, half3 indirectSpecular, half fresnelTerm)
    {
        half3 color = indirectDiffuse * brdfData.diffuse;
        float surfaceReduction = 1.0/(brdfData.roughness2 + 1.0);
        color += surfaceReduction * indirectSpecular * lerp(brdfData.specular, brdfData.grazingTerm, fresnelTerm);
        return color;
    }

    half3 GlobalIllumination(BRDFData brdfData, half3 bakeGI, half occlusion, half3 normalWS, half3 viewDirWS)
    {
        half3 relfectVector = reflect(-viewDirWS, normalWS);
        half fresnelTerm = pow4(1.0 - saturate(dot(normalWS, viewDirWS)));

        half3 indirectDiffuse = bakeGI * occlusion;
        half3 indirectSpecular = GlossyEnvironmentReflection(relfectVector, brdfData.perceptualRoughness, occlusion);
        return EnviromentBRDF(brdfData, indirectDiffuse, indirectSpecular, fresnelTerm);
    }

    half3 GetImageBasedLighting(half3 reflectVector, half roughness, half grazingTerm, half fresnelTerm, half3 specular, half alpha){
        half roughness4 = pow4(roughness);
        half surfaceReduction = 1.0/(roughness4 + 1.0);
        half3 indirectSpecular = GlossyEnvironmentReflection(reflectVector, roughness, alpha);
        half3 color = surfaceReduction * indirectSpecular * lerp(specular, grazingTerm, fresnelTerm);
        return color;
    }

    half3 GetIndirectDiffuse(half3 bakeGI, half occlusion, half3 diffuse){
        half3 indirectDiffuse = bakeGI * occlusion;
        half3 color = indirectDiffuse * diffuse;
        return color;
    }

    half3 GlobalIllumination(ShadingContext shadingContext, GBufferData gbuffer, half3 bakeGI){
        
        half3 color = half3(0.0, 0.0, 0.0);

        half3 indirectDiffuse = GetIndirectDiffuse(bakeGI, gbuffer.ao, shadingContext.diffuse);
		color += indirectDiffuse;

		half3 specularIBL = GetImageBasedLighting(
			shadingContext.reflectVector, gbuffer.roughness,
			shadingContext.grazingTerm, shadingContext.fresnelTerm, 
			shadingContext.specular, 1.0
		);
		#if defined(CLEAR_COAT_SHADINGMODEL)
			half F = GetEnvBRDF(0.04, shadingContext.clearCoatRoughness, shadingContext.NoV).x;
			F *= shadingContext.clearCoat;

			half layerAttenuation = (1 - F);
			// Fc * Vis
			half3 Fc = (shadingContext.specular - shadingContext.specPreEnvBrdf) * rcp(saturate(50 * shadingContext.specPreEnvBrdf.g) - shadingContext.specPreEnvBrdf);
			half2 AB = half2(1 - Fc.x, Fc.x);

			color += specularIBL * layerAttenuation * saturate(shadingContext.specPreEnvBrdf * AB.x + AB.y * saturate(50 * shadingContext.specPreEnvBrdf.g) * (1 - shadingContext.clearCoat));

			specularIBL = GetImageBasedLighting(
				shadingContext.reflectVector, shadingContext.clearCoatRoughness,
				shadingContext.clearCoatGrazingTerm, shadingContext.fresnelTerm, 
				shadingContext.clearCoat, F
			);
			color += specularIBL;
        #else
            color += specularIBL * shadingContext.specular;
		#endif
        return color;
    }


#endif //__GLOBAL_ILLUMINATION_HLSL_