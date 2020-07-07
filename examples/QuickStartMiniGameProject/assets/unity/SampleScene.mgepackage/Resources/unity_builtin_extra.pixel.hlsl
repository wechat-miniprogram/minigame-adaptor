#include <common.inc>

// vertex的输出，pixel的输入，请和.vertex.hlsl文件保持一致
struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
    float3 LightDir : TEXCOORD1;
    float3 ViewDir : TEXCOORD2;
    float3 WorldPosition : TEXCOORD3;
    LIGHTMAP_COORDS(4)
    FOG_COORDS(5)
    SHADOW_COORDS(6)
};

// 根据原shader的properties自动生成
cbuffer custom {
    float4 _Color;
    float _Cutoff;
    float _Glossiness;
    float _GlossMapScale;
    float _SmoothnessTextureChannel;
    float _Metallic;
    float _SpecularHighlights;
    float _GlossyReflections;
    float _BumpScale;
    float _Parallax;
    float _OcclusionStrength;
    float4 _EmissionColor;
    float _DetailNormalMapScale;
    float _UVSec;
    float _Mode;
    float _SrcBlend;
    float _DstBlend;
    float _ZWrite;
    float4 _MainTex_ST;
    float4 _MetallicGlossMap_ST;
    float4 _BumpMap_ST;
    float4 _ParallaxMap_ST;
    float4 _OcclusionMap_ST;
    float4 _EmissionMap_ST;
    float4 _DetailMask_ST;
    float4 _DetailAlbedoMap_ST;
    float4 _DetailNormalMap_ST;
}


// 根据原shader的properties自动生成
DECLARE_TEXTURE(_MainTex);
DECLARE_TEXTURE(_MetallicGlossMap);
DECLARE_TEXTURE(_BumpMap);
DECLARE_TEXTURE(_ParallaxMap);
DECLARE_TEXTURE(_OcclusionMap);
DECLARE_TEXTURE(_EmissionMap);
DECLARE_TEXTURE(_DetailMask);
DECLARE_TEXTURE(_DetailAlbedoMap);
DECLARE_TEXTURE(_DetailNormalMap);


float4 Main(in FVertexOutput In) : SV_Target0
{
    // 请根据原shader的frag函数填充代码
    return float4(1.0, 0.0, 1.0, 1.0);
}
