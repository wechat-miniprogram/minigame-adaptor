// Upgrade NOTE: replaced 'mul(UNITY_MATRIX_MVP,*)' with 'UnityObjectToClipPos(*)'

Shader "Conversion/CubemapToEquirectangular" {
  Properties {
		_MainTex ("Cubemap (RGB)", CUBE) = "" {}
		_Mipmap("Mipmap", Float) = 0.0
		_TilingOffset("TilingOffset", Vector) = (1.0, 1.0, 0.0, 0.0)
	}

	Subshader {
		Pass {
			ZTest Always Cull Off ZWrite Off
			Fog { Mode off }      

			CGPROGRAM
				#pragma vertex vert
				#pragma fragment frag
				#pragma fragmentoption ARB_precision_hint_fastest
				//#pragma fragmentoption ARB_precision_hint_nicest
				#include "UnityCG.cginc"

				#define PI    3.141592653589793
				#define TWOPI 6.283185307179587

				struct v2f {
					float4 pos : POSITION;
					float2 uv : TEXCOORD0;
				};
		
				float _Mipmap;
				float4 _TilingOffset;
				samplerCUBE _MainTex;

				v2f vert( appdata_img v )
				{
					v2f o;
					o.pos = UnityObjectToClipPos(v.vertex);
					float2 posSC = ((o.pos + 1.0) * 0.5).xy;
					posSC.x = posSC.x * _TilingOffset.x + _TilingOffset.y;
					posSC.y = posSC.y  * _TilingOffset.z + _TilingOffset.w;

					o.pos.x = posSC.x * 2.0 - 1.0;
					o.pos.y = posSC.y * 2.0 - 1.0;

					o.uv = v.texcoord.xy * float2(TWOPI, PI);
					return o;
				}

		
				fixed4 frag(v2f i) : COLOR 
				{
					float theta = i.uv.y;
					float phi = i.uv.x;
					float3 unit = float3(0,0,0);

					unit.x = sin(phi) * sin(theta) * -1;
					unit.y = cos(theta) * -1;
					unit.z = cos(phi) * sin(theta) * -1;

					half4 tex = texCUBElod(_MainTex, float4(unit, _Mipmap));
					half3 c = DecodeHDR (tex, 1.0);
					return float4(c, 1.0);
				}
			ENDCG
		}
	}
	Fallback Off
}