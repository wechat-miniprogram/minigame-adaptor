#include <common.inc>

// vertex阶段输入，请根据原shader文件保留需要的项
struct FVertexInput
{
    float4 Position : a_position;
    float2 TexCoord : a_texCoord;
    float3 Normal : a_normal;
    float4 Tangent : a_tangent;
    float2 LightMapCoord : a_lightMapCoord;
    float4 BoneWeight : a_boneWeight;
    float4 BoneIndex : a_boneIndex;
};

// vertex的输出，pixel的输入，请根据原shader文件修改
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


void Main(in FVertexInput In, out FVertexOutput Out)
{
    // 请根据原shader的vert函数修改以下代码
    FSkinning Skin;
    Skin.BoneWeight = In.BoneWeight;
    Skin.BoneIndex = In.BoneIndex;
    Skin.Normal = In.Normal;
    Skin.Tangent = In.Tangent;
    Skin.Position = In.Position;
    TransformSkin(Skin);

    Out.TexCoord = In.TexCoord;

    float4 worldPosition = ObjectToWorldPosition(Skin.Position);
    Out.Position = WorldToClipPosition(worldPosition);

    float3 worldNormal = ObjectToWorldNormal(Skin.Normal);
    float3 worldTangent = ObjectToWorldNormal(Skin.Tangent.xyz);
    float3 worldBinormal = cross(worldTangent, worldNormal) * Skin.Tangent.w;
    float3x3 worldToTangent = float3x3(worldTangent, worldBinormal, worldNormal);

    float3 worldSpaceViewDir = normalize(WorldSpaceViewPosition - worldPosition.xyz);
    float3 worldSpaceLightDir = WorldSpaceLightDir;

    Out.LightDir = mul(worldToTangent, worldSpaceLightDir);
    Out.ViewDir = mul(worldToTangent, worldSpaceViewDir);

    TRANSFER_LIGHTMAP(In, Out);
    TRANSFER_SHADOW(Out);
    TRANSFER_FOG(Out, worldPosition.xyz);
}

