

Shader "WXBBShader/StandardLit" {

	Properties{
		_MainTex("Main Map", 2D) = "white" {}
		_Color("Base Color", Color) = (1,1,1,1)
		_NormalMap("Normal", 2D) = "bump" {}
		_MetallicGlossMap("MatallicGloss", 2D) = "black" {}
		_Metallic("Metallic", Range(0.0, 1.0)) = 1.0
		_GlossMapScale("Smoothness Scale", Range(0.0, 1.0)) = 1.0
		_OcclusionMap("Occlusion", 2D) = "black" {}
		_EmissionMap("Emissive Texture", 2D) = "black" {}
		_EmissionColor("Emissive Color", Color) = (1.0, 1.0, 1.0, 1.0)
		[HideInInspector] _SpecularSource("__source", Float) = 0.0

		[ToggleOff] _AlphaTest("AlphaTest", Float) = 0.0
		_Cutoff("Alpha Cutoff", Range(0.0, 1.0)) = 0.01
		[ToggleOff] _AlphaBlend("AlphaBlend", Float) = 0.0

		[HideInInspector] _Lighting("__Lighting", Float) = 0.0
		[HideInInspector] _Fog("__Fog", Float) = 0.0
		[HideInInspector] _Cull("__cull", Float) = 2.0
		[HideInInspector] _Mode("__mode", Float) = 0.0
		[HideInInspector] _SrcBlend("__src", Float) = 1.0
		[HideInInspector] _DstBlend("__dst", Float) = 0.0
		[HideInInspector] _ZWrite("__zw", Float) = 1.0
		[HideInInspector] _ZTest("__zt", Float) = 4.0
		[HideInInspector] _RenderQueue("__rq", Float) = 2000.0
	}

	SubShader{
		Tags {"IgnoreProjector" = "True" "RenderType" = "Opaque"}

		Pass {
			Tags { "LightMode" = "ForwardBase" }

			Blend[_SrcBlend][_DstBlend]
			ZWrite[_ZWrite]
			ZTest[_ZTest]
			Cull[_Cull]

			CGPROGRAM
			#pragma shader_feature USE_NORMAL_MAP
			#pragma shader_feature USE_EMISSIVE_MAP
			#pragma shader_feature USE_AO_MAP
			#pragma shader_feature USE_METALLIC_MAP
			#pragma shader_feature ENABLE_ALPHA_CUTOFF
			#pragma shader_feature EnableLighting
			#pragma shader_feature EnableFog

			#pragma multi_compile_fwdbase
			#pragma multi_compile_fog
			#pragma multi_compile LIGHTMAP_OFF LIGHTMAP_ON

			#pragma vertex vert
			#pragma fragment frag

			#include "Lighting.cginc"
			#include "AutoLight.cginc"
			#include "./inc/brdf.hlsl"
			#include "./inc/unityUtils.hlsl"
			#include "./inc/dataStruct.hlsl"
			
			v2f vert(a2v v) {

				v2f o;

				o.pos = UnityObjectToClipPos(v.vertex);

				o.positionWS = mul(unity_ObjectToWorld, v.vertex);

				o.viewDirWS = UnityWorldSpaceViewDir(o.positionWS);

				o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);
				
				o.normalWS = UnityObjectToWorldNormal(v.normal);

				#ifdef LIGHTMAP_ON
					o.uv2 = v.texcoord1.xy * unity_LightmapST.xy + unity_LightmapST.zw;
				#endif

				o.lightDirWS = normalize(UnityWorldSpaceLightDir(o.positionWS));

				#if defined(USE_NORMAL_MAP)
					o.tangentWS = UnityObjectToWorldDir(v.tangent.xyz);
					o.bitangentWS = cross(o.normalWS, o.tangentWS) * v.tangent.w;
				#endif

				// Pass shadow coordinates to pixel shader
				TRANSFER_SHADOW(o);
				UNITY_TRANSFER_FOG(o, o.pos);

				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {

				SurfaceData surfaceData = (SurfaceData)0;;
				InitializeSurfaceData(i.uv, surfaceData);

				PixelInput pixelInput = (PixelInput)0;
				InitializePixelInput(i, surfaceData.normalTS, pixelInput);

				fixed3 color = StandardLightingBase(surfaceData, pixelInput, _LightColor0.xyz, i.lightDirWS);
				
				fixed4 finalColor = fixed4(color, surfaceData.alpha);
				
				#if EnableFog
					UNITY_APPLY_FOG(i.fogCoord, finalColor);
				#endif
				
				return finalColor;

			}

			ENDCG
		}

		// Pass {
		// 	Tags { "LightMode" = "ForwardAdd" }

		// 	Blend One One
		// 	ZWrite[_ZWrite]
		// 	ZTest[_ZTest]
		// 	Cull[_Cull]

		// 	CGPROGRAM
		// 	#pragma shader_feature USE_NORMAL_MAP
		// 	#pragma shader_feature USE_EMISSIVE_MAP
		// 	#pragma shader_feature USE_AO_MAP
		// 	#pragma shader_feature USE_METALLIC_MAP
		// 	#pragma shader_feature ENABLE_ALPHA_CUTOFF
		// 	#pragma shader_feature EnableLighting
		// 	#pragma shader_feature EnableFog

		// 	#pragma multi_compile_fwdadd
		// 	#pragma multi_compile_fog
		// 	#pragma multi_compile POINT SPOT

		// 	#pragma vertex vert
		// 	#pragma fragment frag

		// 	#include "Lighting.cginc"
		// 	#include "AutoLight.cginc"
		// 	#include "./inc/brdf.hlsl"
		// 	#include "./inc/unityUtils.hlsl"
		// 	#include "./inc/dataStruct.hlsl"
		// 	#include "./inc/light.hlsl"

		// 	v2f vert(a2v v) {

		// 		v2f o;

		// 		o.pos = UnityObjectToClipPos(v.vertex);

		// 		o.positionWS = mul(unity_ObjectToWorld, v.vertex);

		// 		o.viewDirWS = UnityWorldSpaceViewDir(o.positionWS);

		// 		o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);
				
		// 		o.normalWS = UnityObjectToWorldNormal(v.normal);

		// 		#ifdef LIGHTMAP_ON
		// 			o.uv2 = v.texcoord1.xy * unity_LightmapST.xy + unity_LightmapST.zw;
		// 		#endif

		// 		o.lightDirWS = normalize(UnityWorldSpaceLightDir(o.positionWS));

		// 		#if defined(USE_NORMAL_MAP)
		// 			o.tangentWS = UnityObjectToWorldDir(v.tangent.xyz);
		// 			o.bitangentWS = cross(o.normalWS, o.tangentWS) * v.tangent.w;
		// 		#endif

		// 		// Pass shadow coordinates to pixel shader
		// 		UNITY_TRANSFER_FOG(o, o.pos);

		// 		return o;
		// 	}
			
		// 	fixed4 frag(v2f i) : SV_Target {

		// 		SurfaceData surfaceData = (SurfaceData)0;;
		// 		InitializeSurfaceData(i.uv, surfaceData);

		// 		PixelInput pixelInput = (PixelInput)0;
		// 		InitializePixelInputCore(i, surfaceData.normalTS, pixelInput);

		// 		Light light = GetAdditionalLight(i.positionWS);
		// 		half3 lightDir = light.direction;

		// 		fixed3 color = StandardLightingAdd(surfaceData, pixelInput, _LightColor0.xyz, i.lightDirWS, light.attenuation);
				
		// 		fixed4 finalColor = fixed4(color, surfaceData.alpha);
				
		// 		#if EnableFog
		// 			UNITY_APPLY_FOG(i.fogCoord, finalColor);
		// 		#endif
				
		// 		return finalColor;
		// 	}

		// 	ENDCG
		// }
	}
	CustomEditor "WeChat.StandardLitGUI"
	FallBack "Standard"
}