

Shader "WXBBShader/BlinnPhong" {

	Properties{
		_MainTex("Albedo Texture", 2D) = "white" {}
		_Color("Albedo Color", Color) = (1,1,1,1)
		_AlbedoIntensity("Albedo Intensity", Range(1.0, 4.0)) = 1.0
		_SpecGlossMap("Specular Texture", 2D) = "black" {}
		_EmissionMap("Emissive Texture", 2D) = "black" {}
		_SpecColor("Specular Color", Color) = (0.5, 0.5, 0.5, 1)
		_EmissionColor("Emissive Color", Color) = (1.0, 1.0, 1.0, 1.0)
		_Shininess("Specular Shininess", Range(0.01, 1)) = 0.078125
		[HideInInspector] _SpecularSource("__source", Float) = 0.0
		_BumpMap("Normal Texture", 2D) = "bump" {}

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

			#pragma shader_feature SpecularTexture
			#pragma shader_feature NormalTexture
			#pragma shader_feature EmissiveTexture
			#pragma shader_feature EnableAlphaCutoff
			#pragma shader_feature EnableLighting
			#pragma shader_feature EnableFog

			#pragma multi_compile_fwdbase
			#pragma multi_compile_fog
			#pragma multi_compile LIGHTMAP_OFF LIGHTMAP_ON

			#pragma vertex vert
			#pragma fragment frag

			#include "Lighting.cginc"
			#include "AutoLight.cginc"

			float4 _Color;
			float4 _EmissionColor;
			sampler2D _MainTex;
			float _AlbedoIntensity;
			float4 _MainTex_ST;
			sampler2D _BumpMap;
			sampler2D _SpecGlossMap;
			sampler2D _EmissionMap;
			sampler2D _ColorCustomMap;
			half _Shininess;
			half _Cutoff;


			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 tangent : TANGENT;
				float4 texcoord : TEXCOORD0;
				float4 texcoord1: TEXCOORD1;
				float4 color : COLOR;
			};

			struct v2f {
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				float2 uv2: TEXCOORD1;
				float4 worldPos : TEXCOORD2;
				float3 lightDir: TEXCOORD3;
				float3 viewDir : TEXCOORD4;
				float4 color : COLOR;
				SHADOW_COORDS(5)
				UNITY_FOG_COORDS(6)
				float3 worldNormal:TEXCOORD7;
			};

			#if UNITY_VERSION < 560
				#define unity_ShadowColor fixed4(0.42,0.48,0.63,1.0)
			#endif
			
			// from UnityGlobalIllumination.cginc
			inline half3 MixLightmapWithRealtimeAttenuation(half3 lightmap, half attenuation, half3 normalWorld)
			{
				// Let's try to make realtime shadows work on a surface, which already contains
				// baked lighting and shadowing from the main sun light.
				half3 shadowColor = unity_ShadowColor.rgb;
				half shadowStrength = _LightShadowData.x;

				// Summary:
				// 1) Calculate possible value in the shadow by subtracting estimated light contribution from the places occluded by realtime shadow:
				//      a) preserves other baked lights and light bounces
				//      b) eliminates shadows on the geometry facing away from the light
				// 2) Clamp against user defined ShadowColor.
				// 3) Pick original lightmap value, if it is the darkest one.


				// 1) Gives good estimate of illumination as if light would've been shadowed during the bake.
				//    Preserves bounce and other baked lights
				//    No shadows on the geometry facing away from the light
				half ndotl = saturate(dot(normalWorld, _WorldSpaceLightPos0.xyz));
				half3 estimatedLightContributionMaskedByInverseOfShadow = ndotl * (1 - attenuation) * _LightColor0.rgb;
				half3 subtractedLightmap = lightmap - estimatedLightContributionMaskedByInverseOfShadow;

				// 2) Allows user to define overall ambient of the scene and control situation when realtime shadow becomes too dark.
				half3 realtimeShadow = max(subtractedLightmap, shadowColor);
				realtimeShadow = lerp(realtimeShadow, lightmap, shadowStrength);

				// 3) Pick darkest color
				return min(lightmap, realtimeShadow);
			}

			inline half3 ReadNormal(half4 color)
			{
				half2 normalxy = (color.rg - 0.5f)*2.0f;
				half normalz = sqrt(max(1e-3, 1.0f - dot(normalxy, normalxy)));
				return half3(normalxy, normalz);
			}

			void BlinnPhongLighting(in half3 lightColor, in half3 lightDir, in half3 normal, in half3 viewDir, in float specularFactor, out float3 diffuseOut, out float3 specularOut)
			{
				half3 h = normalize(viewDir + lightDir);
				half ln = max(0.0, dot(+lightDir, normal));
				float nh = max(0.0, dot(h, normal));
				diffuseOut = lightColor * ln;
				specularOut = lightColor * pow(nh, specularFactor * 128.0);
			}

			v2f vert(a2v v) {

				v2f o;

				o.pos = UnityObjectToClipPos(v.vertex);

				o.worldPos = mul(unity_ObjectToWorld, v.vertex);

				o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);

				o.uv2 = v.texcoord1.xy * unity_LightmapST.xy + unity_LightmapST.zw;

				o.color = v.color;
				o.lightDir = WorldSpaceLightDir(v.vertex);
				o.viewDir = WorldSpaceViewDir(v.vertex);

				fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);
				o.worldNormal = worldNormal;
				#if defined(NormalTexture)

					fixed3 worldTangent = UnityObjectToWorldDir(v.tangent.xyz);
					fixed3 worldBinormal = cross(worldNormal, worldTangent) * v.tangent.w;
					float3x3 worldToTangent = float3x3(worldTangent, worldBinormal, worldNormal);

					o.lightDir = mul(worldToTangent, o.lightDir);
					o.viewDir = mul(worldToTangent, o.viewDir);

				#endif

				// Pass shadow coordinates to pixel shader
				TRANSFER_SHADOW(o);
				UNITY_TRANSFER_FOG(o, o.pos);

				return o;
			}

			fixed4 frag(v2f i) : SV_Target {

				fixed4 mainTexColor = tex2D(_MainTex, i.uv);
				fixed4 texAlbedo = mainTexColor * _Color;
				fixed4 albedo = texAlbedo * _AlbedoIntensity;

				#if EnableAlphaCutoff
					clip(albedo.a - _Cutoff);
				#endif

				fixed3 diffuse = fixed3(0.0, 0.0, 0.0);
				fixed3 specular = fixed3(0.0, 0.0, 0.0);

				half3 lightDir = normalize(i.lightDir);
				half3 viewDir = normalize(i.viewDir);
				half3 worldNormal = normalize(i.worldNormal);
				#if defined(NormalTexture)
					fixed3 normal = ReadNormal(tex2D(_BumpMap, i.uv));
					BlinnPhongLighting(_LightColor0, lightDir, normal, viewDir, _Shininess, diffuse, specular);
				#else
					BlinnPhongLighting(_LightColor0, lightDir, worldNormal, viewDir, _Shininess, diffuse, specular);
				#endif


				float attenuation = SHADOW_ATTENUATION(i);

				fixed3 finalDiffuse = fixed3(0.0,0.0,0.0);

				#if defined(LIGHTMAP_ON) && !defined(SHADOWS_SHADOWMASK) && defined(SHADOWS_SCREEN)
					// only support substractive mode
					// shadowMask mode is not supported now
					fixed3 lightMapColor = fixed4(DecodeLightmap(UNITY_SAMPLE_TEX2D(unity_Lightmap, i.uv2)), 1.0);
					finalDiffuse = MixLightmapWithRealtimeAttenuation(lightMapColor, attenuation, i.worldNormal);
				#else
					finalDiffuse = fixed3(UNITY_LIGHTMODEL_AMBIENT.rgb) + diffuse.rgb * attenuation;
				#endif

				#if defined(SpecularTexture)
					specular = specular * tex2D(_SpecGlossMap, i.uv) * _SpecColor;
				#else
					specular = specular * mainTexColor.a * _SpecColor;
				#endif

				fixed4 color = fixed4(albedo.rgb * (finalDiffuse + specular), albedo.a);

				#if defined(EmissiveTexture)
					fixed4 emissionTexColor = tex2D(_EmissionMap, i.uv);
					fixed3 emission = _EmissionColor.rgb * emissionTexColor.r;
					color.rgb += emission;
				#endif

				#if EnableFog
					UNITY_APPLY_FOG(i.fogCoord, color);
				#endif

				return color;
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

			#pragma shader_feature SpecularTexture
			#pragma shader_feature NormalTexture
			#pragma shader_feature EmissiveTexture
			#pragma shader_feature EnableAlphaCutoff
			#pragma shader_feature EnableLighting
			#pragma shader_feature EnableFog

			#pragma multi_compile_fwdadd
			#pragma multi_compile_fog
			#pragma multi_compile POINT SPOT

			#pragma vertex vert
			#pragma fragment frag

			#include "Lighting.cginc"
			#include "AutoLight.cginc"
			#include "UnityPBSLighting.cginc"
			#include "Forward.cginc"

			float4 _Color;
			float4 _EmissionColor;
			sampler2D _MainTex;
			float _AlbedoIntensity;
			float4 _MainTex_ST;
			sampler2D _BumpMap;
			sampler2D _SpecGlossMap;
			sampler2D _EmissionMap;
			sampler2D _ColorCustomMap;
			half _Shininess;
			half _Cutoff;

			struct a2v {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 tangent : TANGENT;
				float4 texcoord : TEXCOORD0;
				float4 texcoord1: TEXCOORD1;
				float4 color : COLOR;
			};

			struct v2f {
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				float4 worldPos : TEXCOORD2;
				float3 viewDir : TEXCOORD4;
				float4 color : COLOR;
				SHADOW_COORDS(5)
				UNITY_FOG_COORDS(6)
				float3 worldNormal:TEXCOORD7;
			};

			#if UNITY_VERSION < 560
				#define unity_ShadowColor fixed4(0.42,0.48,0.63,1.0)
			#endif
			

			inline half3 ReadNormal(half4 color)
			{
				half2 normalxy = (color.rg - 0.5f)*2.0f;
				half normalz = sqrt(max(1e-3, 1.0f - dot(normalxy, normalxy)));
				return half3(normalxy, normalz);
			}

			void BlinnPhongLighting(in half3 lightColor, in half3 lightDir, in half3 normal, in half3 viewDir, in float specularFactor, out float3 diffuseOut, out float3 specularOut)
			{
				half3 h = normalize(viewDir + lightDir);
				half ln = max(0.0, dot(+lightDir, normal));
				float nh = max(0.0, dot(h, normal));
				diffuseOut = lightColor * ln;
				specularOut = lightColor * pow(nh, specularFactor * 128.0);
			}

			v2f vert(a2v v) {

				v2f o;

				o.pos = UnityObjectToClipPos(v.vertex);

				o.worldPos = mul(unity_ObjectToWorld, v.vertex);

				o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);

				o.color = v.color;
				
				o.viewDir = WorldSpaceViewDir(v.vertex);

				fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);

				o.worldNormal = worldNormal;

				#if defined(NormalTexture)
					fixed3 worldTangent = UnityObjectToWorldDir(v.tangent.xyz);
					fixed3 worldBinormal = cross(worldNormal, worldTangent) * v.tangent.w;
					float3x3 worldToTangent = float3x3(worldTangent, worldBinormal, worldNormal);
				#endif

				// Pass shadow coordinates to pixel shader
				TRANSFER_SHADOW(o);
				UNITY_TRANSFER_FOG(o, o.pos);

				return o;
			}

			fixed4 frag(v2f i) : SV_Target {

				fixed4 mainTexColor = tex2D(_MainTex, i.uv);
				fixed4 texAlbedo = mainTexColor * _Color;
				fixed4 albedo = texAlbedo * _AlbedoIntensity;

				#if EnableAlphaCutoff
					clip(albedo.a - _Cutoff);
				#endif

				fixed3 diffuse = fixed3(0.0, 0.0, 0.0);
				fixed3 specular = fixed3(0.0, 0.0, 0.0);

				Light light = GetAdditionalLight(i.worldPos);
				float attenuation = light.attenuation;
				half3 lightDir = light.direction;

				half3 viewDir = normalize(i.viewDir);
				half3 worldNormal = normalize(i.worldNormal);
				
				#if defined(NormalTexture)
					fixed3 normal = ReadNormal(tex2D(_BumpMap, i.uv));
					BlinnPhongLighting(_LightColor0*attenuation, lightDir, normal, viewDir, _Shininess, diffuse, specular);
				#else
					BlinnPhongLighting(_LightColor0*attenuation, lightDir, worldNormal, viewDir, _Shininess, diffuse, specular);
				#endif
				
				#if defined(SpecularTexture)
					specular = specular * tex2D(_SpecGlossMap, i.uv) * _SpecColor;
				#else
					specular = specular * mainTexColor.a * _SpecColor;
				#endif

				fixed4 color = fixed4(albedo.rgb * (diffuse + specular), albedo.a);

				#if EnableFog
					UNITY_APPLY_FOG(i.fogCoord, color);
				#endif

				return color;
			}

			ENDCG
		} 
	}
	CustomEditor "WeChat.BlinnPhongGUI"
	FallBack "Standard"
}