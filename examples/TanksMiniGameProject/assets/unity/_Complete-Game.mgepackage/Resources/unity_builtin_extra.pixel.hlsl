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
    float _InvFade;
    float4 _MainTex_ST;
}


// 根据原shader的properties自动生成
DECLARE_TEXTURE(_MainTex);


float4 Main(in FVertexOutput In) : SV_Target0
{
    // 请根据原shader的frag函数填充代码
    return float4(1.0, 0.0, 1.0, 1.0);
}
