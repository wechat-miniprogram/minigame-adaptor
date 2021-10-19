

Shader "WXBBShader/StandardLit" {

	Properties{
		[HideInInspector] _WorkflowMode("WorkflowMode", Float) = 1.0
		_MainTex("Main Map", 2D) = "white" {}
		_Color("Base Color", Color) = (0.5,0.5,0.5,1)

		_NormalMap("Normal", 2D) = "bump" {}

		_Glossiness("Smoothness", Range(0.0, 1.0)) = 0.5
		_GlossMapScale("Smoothness Scale", Range(0.0, 1.0)) = 1.0
		_SmoothnessTextureChannel("Smoothness texture channel", Float) = 0

		_Metallic("Metallic", Range(0.0, 1.0)) = 0.0
		_MetallicGlossMap("Metallic", 2D) = "white" {}

		_Specular("Specular", Color) = (0.2, 0.2, 0.2)
		_SpecGlossMap("Specular", 2D) = "white" {}
		
		_OcclusionMap("Occlusion", 2D) = "white" {}

		_EmissionColor("Color", Color) = (0,0,0)
		_EmissionMap("Emission", 2D) = "black" {}

		[ToggleOff] _AlphaTest("AlphaTest", Float) = 0.0
		[ToggleOff] _AlphaBlend("AlphaBlend", Float) = 0.0
		_Cutoff("Alpha Cutoff", Range(0.0, 1.0)) = 0.5

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
			#pragma shader_feature _SPECULAR_SETUP
			#pragma shader_feature USE_METALLICSPECGLOSSMAP
			#pragma shader_feature USE_SPECGLOSSMAP
			#pragma shader_feature USE_METALLICGLOSSMAP
			#pragma shader_feature _SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A
			#pragma shader_feature USE_NORMALMAP
			#pragma shader_feature USE_EMISSIONMAP
			#pragma shader_feature USE_AOMAP
			#pragma shader_feature ENABLE_ALPHA_CUTOFF
			#pragma shader_feature _ALPHABLEND_ON
			#pragma shader_feature _ALPHATEST_ON
			#pragma shader_feature EnableLighting
			#pragma shader_feature EnableFog

			#pragma multi_compile_fwdbase
			#pragma multi_compile_fog
			#pragma multi_compile LIGHTMAP_OFF LIGHTMAP_ON

			#pragma vertex vert
			#pragma fragment frag

			#include "Lighting.cginc"
			#include "AutoLight.cginc"

			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 tangent : TANGENT;
				float4 texcoord : TEXCOORD0;
				float4 texcoord1: TEXCOORD1;
			};

			struct v2f {
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				float2 uv2: TEXCOORD1; // lightmap uv
				float3 normalWS: TEXCOORD2;
				float3 viewDirWS: TEXCOORD3;
				float3 lightDirWS: TEXCOORD4;
				#if defined(USE_NORMALMAP)
					float3 tangentWS: TEXCOORD5;
					float3 bitangentWS: TEXCOORD6;
				#endif
				float4 positionWS: TEXCOORD7;
				SHADOW_COORDS(8)
				UNITY_FOG_COORDS(9)
			};

			#include "./ForwardLit/material.hlsl"
			#include "./ForwardLit/input.hlsl"
			#include "./ForwardLit/lit.hlsl"
			
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

				#if defined(USE_NORMALMAP)
					o.tangentWS = UnityObjectToWorldDir(v.tangent.xyz);
					o.bitangentWS = cross(o.normalWS, o.tangentWS) * v.tangent.w;
				#endif

				TRANSFER_SHADOW(o);
				UNITY_TRANSFER_FOG(o, o.pos);

				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {

				Material material = (Material)0;
				InitMaterial(i.uv, material);

				PixelInput pixelInput = (PixelInput)0;
				InitPixelInput(i, material.normalTS, pixelInput);

				BRDFData brdfData = (BRDFData)0;;
				InitializeBRDFData(material.albedo, material.metallic, material.specular, material.smoothness, brdfData);

				half3 color = LightingPhysicallyBased(brdfData, _LightColor0.xyz, i.lightDirWS, 1.0, pixelInput.normalWS, pixelInput.viewDirWS);

				color += GlobalIllumination(brdfData, pixelInput.bakedGI, material.occlusion, pixelInput.normalWS, pixelInput.viewDirWS);
				
				color += material.emission;

				fixed4 finalColor = fixed4(color, material.alpha);
				
				#if EnableFog
					UNITY_APPLY_FOG(i.fogCoord, finalColor);
				#endif
				
				return finalColor;

			}

			ENDCG
		}

		Pass {
			Tags { "LightMode" = "ForwardAdd" }

			Blend One One
			ZWrite[_ZWrite]
			ZTest[_ZTest]
			Cull[_Cull]

			CGPROGRAM
			#pragma shader_feature _SPECULAR_SETUP
			#pragma shader_feature USE_METALLICSPECGLOSSMAP
			#pragma shader_feature USE_SPECGLOSSMAP
			#pragma shader_feature USE_METALLICGLOSSMAP
			#pragma shader_feature _SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A
			#pragma shader_feature USE_NORMALMAP
			#pragma shader_feature USE_EMISSIONMAP
			#pragma shader_feature USE_AOMAP
			#pragma shader_feature ENABLE_ALPHA_CUTOFF
			#pragma shader_feature _ALPHABLEND_ON
			#pragma shader_feature _ALPHATEST_ON
			#pragma shader_feature EnableLighting
			#pragma shader_feature EnableFog

			#pragma multi_compile_fwdadd
			#pragma multi_compile_fog
			#pragma multi_compile POINT SPOT

			#pragma vertex vert
			#pragma fragment frag

			#include "Lighting.cginc"
			#include "AutoLight.cginc"
			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 tangent : TANGENT;
				float4 texcoord : TEXCOORD0;
				float4 texcoord1: TEXCOORD1;
			};

			struct v2f {
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				float3 normalWS: TEXCOORD1;
				float3 viewDirWS: TEXCOORD2;
				#if defined(USE_NORMALMAP)
					float3 tangentWS: TEXCOORD3;
					float3 bitangentWS: TEXCOORD4;
				#endif
				float4 positionWS: TEXCOORD5;
				UNITY_FOG_COORDS(6)
			};

			#include "./ForwardLit/material.hlsl"
			#include "./ForwardLit/input.hlsl"
			#include "./ForwardLit/lit.hlsl"
			#include "./ForwardLit/light.hlsl"

			v2f vert(a2v v) {

				v2f o;

				o.pos = UnityObjectToClipPos(v.vertex);

				o.positionWS = mul(unity_ObjectToWorld, v.vertex);

				o.viewDirWS = UnityWorldSpaceViewDir(o.positionWS);

				o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);
				
				o.normalWS = UnityObjectToWorldNormal(v.normal);

				#if defined(USE_NORMALMAP)
					o.tangentWS = UnityObjectToWorldDir(v.tangent.xyz);
					o.bitangentWS = cross(o.normalWS, o.tangentWS) * v.tangent.w;
				#endif

				UNITY_TRANSFER_FOG(o, o.pos);

				return o;
			}
			
			fixed4 frag(v2f i) : SV_Target {

				Material material = (Material)0;
				InitMaterial(i.uv, material);

				PixelInput pixelInput = (PixelInput)0;
				InitPixelInputAddPass(i, material.normalTS, pixelInput);

				BRDFData brdfData = (BRDFData)0;;
				InitializeBRDFData(material.albedo, material.metallic, material.specular, material.smoothness, brdfData);

				Light light = GetAdditionalLight(i.positionWS);

				half3 color = LightingPhysicallyBased(brdfData, _LightColor0.xyz, light.direction, light.attenuation, pixelInput.normalWS, pixelInput.viewDirWS);
				
				fixed4 finalColor = fixed4(color, material.alpha);
				
				#if EnableFog
					UNITY_APPLY_FOG(i.fogCoord, finalColor);
				#endif
				
				return finalColor;
			}

			ENDCG
		}
	}
	CustomEditor "WeChat.StandardLitGUI"
	FallBack "Standard"
}