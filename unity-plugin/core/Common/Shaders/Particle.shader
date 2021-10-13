Shader "WXBBShader/ShurikenParticle" {
	Properties {
		_MainTex("Main Texture", 2D) = "white" {}
		_MaskTex("Mask Texture", 2D) = "white" {}
		_Bright("Bright",Range(0, 10)) = 2.0
		_TintColor("Tint Color", Color) = (0.5,0.5,0.5,0.5)

		[HideInInspector] _ZWrite("ZWrite Value", Float) = 0.0
		[HideInInspector] _ZTest("Ztest Value", Float) = 4.0

		[HideInInspector] _Cutoff("Cutoff Value", Range(0.0, 1.0)) = 0.01
		[HideInInspector] _Cull ("Cull", Float) = 0.0
		
		[HideInInspector] _Mode ("Mode", Float) = 1.0
		[HideInInspector] _RenderQueue("Render Queue", Float) = 3000.0

		[HideInInspector] _SrcBlend ("SrcBlend", Float) = 5.0
		[HideInInspector] _DstBlend ("DstBlend", Float) = 10.0
	}
	SubShader {
		Tags {"RenderType"="Transparent" "Queue"="Transparent" "IgnoreProjector"="True" }
		Pass {
			Tags { "LightMode"="ForwardBase" }
			Blend [_SrcBlend] [_DstBlend]
			Cull Off
			ZWrite Off
			Lighting On
			ColorMask RGB
			

			CGPROGRAM

			#pragma vertex VertexProgram
			#pragma fragment FragmentProgram
			
			#pragma shader_feature ADDTIVEFOG
			#pragma multi_compile_fog

			#include "UnityCG.cginc"

			sampler2D _MainTex;
			sampler2D _MaskTex;
			float4 _MainTex_ST;
			float4 _TintColor;
			float _Bright;

			struct VertexInput {
				float4 pos : POSITION;
				float4 color : COLOR;
				float2 uv : TEXCOORD0;
			};

			struct Interpolators {
				float4 pos : SV_POSITION;
				float4 color : COLOR;
				float2 uv : TEXCOORD0;
				UNITY_FOG_COORDS(1)
			};

			Interpolators VertexProgram(VertexInput input)
			{
				Interpolators output;

				output.color = input.color;
				output.uv = TRANSFORM_TEX(input.uv, _MainTex);
				output.pos = UnityObjectToClipPos(input.pos);
				
				UNITY_TRANSFER_FOG(output, output.pos);
				return output;
			}

			fixed4 FragmentProgram(Interpolators input) : SV_Target
			{
				float4 color = input.color * tex2D(_MainTex, input.uv) * _Bright * _TintColor;
				
				half mask = tex2D(_MaskTex, input.uv).r;
				color.w = color.w * mask;

				#if ADDTIVEFOG
					UNITY_APPLY_FOG_COLOR(input.fogCoord, color, fixed4(0, 0, 0, 0));
				#else
					UNITY_APPLY_FOG(input.fogCoord, color);
				#endif

				color = clamp(color, 0, 1);
				return color;
			}
			ENDCG
		}
	}
	CustomEditor "WeChat.EffectGUI"
}
