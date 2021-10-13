#ifndef __DATA_STRUCT_HLSL_
    #define __DATA_STRUCT_HLSL_

    half _Cutoff;
    half _GlossMapScale;
    half _Metallic;
    float4 _Color;
    float4 _EmissionColor;
    float4 _MainTex_ST;
    sampler2D _MainTex;
    sampler2D _NormalMap;
    sampler2D _MetallicGlossMap;
    sampler2D _EmissionMap;
    sampler2D _OcclusionMap;
    #if defined(CLEAR_COAT_SHADINGMODEL)
        half _ClearCoat;
        half _ClearCoatRoughness;
    #endif

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
        #if defined(USE_NORMAL_MAP)
            float3 tangentWS: TEXCOORD5;
            float3 bitangentWS: TEXCOORD6;
        #endif
        float4 positionWS: TEXCOORD7;
        SHADOW_COORDS(8)
        UNITY_FOG_COORDS(9)
    };

    struct SurfaceData{
        fixed3 baseColor;
        fixed3 specular;
        fixed  metallic;
        fixed  smoothness;
        fixed3 normalTS;
        fixed3 emission;
        fixed3 occlusion;
        fixed  alpha;
        #if defined(CLEAR_COAT_SHADINGMODEL)
        fixed  clearCoat;
        fixed  clearCoatRoughness;
        #endif
    };

    struct PixelInput{
        float3 positionWS;
        fixed3 normalWS;
        fixed3 viewDirWS;
        fixed3 bakeGI;   
        fixed  shadowAtten; 
    };

    fixed3 SampleLightmap(float2 lightmapUV)
    {
        #if !defined(SHADOWS_SHADOWMASK)
            fixed3 lightMapColor = fixed4(DecodeLightmap(UNITY_SAMPLE_TEX2D(unity_Lightmap, lightmapUV)), 1.0).rgb;
        #else
            fixed3 lightMapColor = fixed3(0,0,0);
        #endif
        return lightMapColor;
    }

    void InitializeSurfaceData(fixed2 uv, inout SurfaceData surfaceData){
        
        // base color and alpha
        fixed4 albedo = tex2D(_MainTex, uv);
        albedo = albedo * _Color;
        surfaceData.baseColor = albedo.xyz;	
        
        // alpha		
        surfaceData.alpha = albedo.a; // * _AlbedoIntensity;
        #if ENABLE_ALPHA_CUTOFF
            clip(surfaceData.alpha - _Cutoff);
        #endif
        
        // metallic工作流
        #if defined(USE_METALLIC_MAP)
            fixed4 metallicGloss = tex2D(_MetallicGlossMap, uv);
            surfaceData.metallic = metallicGloss.r;
            surfaceData.smoothness = metallicGloss.a * _GlossMapScale;
        #else
            surfaceData.metallic = _Metallic;
            surfaceData.smoothness = _GlossMapScale;
        #endif
        surfaceData.specular = fixed3(0, 0, 0);
        
        // normal
        #if defined(USE_NORMAL_MAP)
            fixed3 normal = ReadNormal(tex2D(_NormalMap, uv));
            surfaceData.normalTS = normal;
        #else
            surfaceData.normalTS = half3(0, 0, 1);
        #endif

        // occulusion
        #if defined(USE_AO_MAP)
            surfaceData.occlusion = tex2D(_OcclusionMap, uv);
        #else
            surfaceData.occlusion = 1.0;
        #endif
        
        // emission
        #if defined(USE_EMISSIVE_MAP)
            fixed4 emissionTexColor = tex2D(_EmissionMap, uv);
            surfaceData.emission = _EmissionColor.rgb * emissionTexColor.rgb;
        #else 
            surfaceData.emission = _EmissionColor.rgb;
        #endif

        #if defined(CLEAR_COAT_SHADINGMODEL)
            surfaceData.clearCoat = _ClearCoat;
            surfaceData.clearCoatRoughness = _ClearCoatRoughness;
        #endif
    }

    void InitializePixelInputCore(v2f input, fixed3 normalTS, inout PixelInput pixelInput){
        
        pixelInput.positionWS = input.positionWS.xyz;
        pixelInput.viewDirWS = SafeNormalize(input.viewDirWS);

        // normal
        #if defined(USE_NORMAL_MAP)
            half3x3 TBN = half3x3(input.tangentWS, input.bitangentWS, input.normalWS);
            pixelInput.normalWS = TransformTangentToWorld(normalTS, TBN);
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #else
            pixelInput.normalWS = input.normalWS;
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #endif
        
    }

    void InitializePixelInput(v2f input, fixed3 normalTS, inout PixelInput pixelInput){
        InitializePixelInputCore(input, normalTS, pixelInput);
        
        // shadow
        pixelInput.shadowAtten = SHADOW_ATTENUATION(input);

        // gi
        #ifdef LIGHTMAP_ON
            fixed3 lightMapColor = SampleLightmap(input.uv2);
            pixelInput.bakeGI = MixLightmapWithRealtimeAttenuation(lightMapColor, pixelInput.shadowAtten, pixelInput.normalWS);
        #else
            // pixelInput.bakeGI = ShadeSH9(float4(pixelInput.normalWS,1));
            pixelInput.bakeGI = fixed3(UNITY_LIGHTMODEL_AMBIENT.rgb);
        #endif
    }

    struct BRDFData{
        fixed3 diffuse;
        fixed3 specular;
        fixed  perceptualRoughness;
        fixed  roughness;
        fixed  roughness2;
        fixed  grazingTerm;

        fixed  normalizationTerm; // roughness * 4.0 - 2.0
        fixed  roughness2MinusOne;
    };


    half OneMinusReflectivityMetallic(half metallic)
    {
        half oneMinusDielectricSpec = kDieletricSpec.a;
        return oneMinusDielectricSpec - metallic * oneMinusDielectricSpec;
    }

    inline void InitializeBRDFData(half3 albedo, half metallic, half3 specular, half smoothness, half alpha, out BRDFData outBRDFData)
    {
        half oneMinusReflectivity = OneMinusReflectivityMetallic(metallic);
        half reflectivity = 1.0 - oneMinusReflectivity;

        outBRDFData.diffuse = albedo * oneMinusReflectivity;
        outBRDFData.specular = lerp(kDieletricSpec.rgb, albedo, metallic);

        outBRDFData.grazingTerm = saturate(smoothness + reflectivity);
        outBRDFData.perceptualRoughness = 1.0 - smoothness;
        outBRDFData.roughness = outBRDFData.perceptualRoughness * outBRDFData.perceptualRoughness;
        outBRDFData.roughness2 = outBRDFData.roughness * outBRDFData.roughness;

        outBRDFData.normalizationTerm = outBRDFData.roughness * 4.0h + 2.0h;
        outBRDFData.roughness2MinusOne = outBRDFData.roughness2 - 1.0h;
    }

    struct ShadingContext
    {
        half  opacity;
        half3 diffuse;
        half3 specular;
        half3 V;
        half3 H;
        half  NoH;
        half  NoL;
        float NoV;
        
        #if defined(CLEAR_COAT_SHADINGMODEL)
            half clearCoat;
            half clearCoatRoughness;
            half3 specPreEnvBrdf;
            half clearCoatGrazingTerm;
        #endif

        //IBL context
        half smoothness;
        half grazingTerm;
        half fresnelTerm;
        half3 reflectVector;
    };

    struct GBufferData
    {
        // normalized
        float3 normalWS;
        float3 baseColor;
        float  metallic;
        // 0..1
        float  specular;
        float  roughness;
        float  ao;
    };

    struct DLightingResult
    {
        /* data */
        half3 specular;
        half3 diffuse;
    };

#endif