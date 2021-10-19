#ifndef __MATERIAL_HLSL_
    #define __MATERIAL_HLSL_

    // uniforms
    float4 _MainTex_ST;
    half4 _Color;
    half4 _Specular;
    half4 _EmissionColor;
    half _Cutoff;
    half _Glossiness;
    half _GlossMapScale;
    half _Metallic;
    half _OcclusionStrength;

    sampler2D _MainTex;
    sampler2D _NormalMap;
    sampler2D _EmissionMap;
    sampler2D _OcclusionMap;
    sampler2D _SpecGlossMap;
    sampler2D _MetallicGlossMap;

    struct Material{
        half3 albedo;
        half3 specular;
        half  metallic;
        half  smoothness;
        half3 normalTS;
        half3 emission;
        half  occlusion;
        half  alpha;
    };

    half GetAlpha(half albedoAlpha, half4 color, half cutoff)
    {
        #if !defined(_SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A)
            half alpha = albedoAlpha * color.a;
        #else
            half alpha = color.a;
        #endif

        #if defined(_ALPHATEST_ON)
            clip(alpha - cutoff);
        #endif

        return alpha;
    }

    #if defined(_SPECULAR_SETUP)
        #define SAMPLE_METALLICSPECULAR(uv) tex2D(_SpecGlossMap, uv)
    #else
        #define SAMPLE_METALLICSPECULAR(uv) tex2D(_MetallicGlossMap, uv)
    #endif

    half4 GetMetallicSpecGloss(float2 uv, half albedoAlpha)
    {
        half4 specGloss;
        #if defined(USE_METALLICSPECGLOSSMAP)
            specGloss = SAMPLE_METALLICSPECULAR(uv);
            #if defined(_SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A)
                specGloss.a = albedoAlpha * _GlossMapScale;
            #else
                specGloss.a *= _GlossMapScale;
            #endif
        #else // USE_METALLICSPECGLOSSMAP
            #if defined (_SPECULAR_SETUP)
                specGloss.rgb = _Specular.rgb;
            #else
                specGloss.rgb = _Metallic.rrr;
            #endif

            #if defined (_SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A)
                specGloss.a = albedoAlpha * _GlossMapScale;
            #else
                specGloss.a = _Glossiness;
            #endif
        #endif

        return specGloss;
    }

    half3 GetMaterialNormal(float2 uv)
    {
        #if defined(USE_NORMALMAP)
            half4 normalTS = tex2D(_NormalMap, uv);
            return UnpackNormal(normalTS);
        #else
            return half3(0.0h, 0.0h, 1.0h);
        #endif
    }

    half GetMaterialOcclusion(float2 uv)
    {
        #if defined(USE_AOMAP)
            return tex2D(_OcclusionMap, uv);
        #else
            return 1.0;
        #endif
    }

    half3 GetMaterialEmission(float2 uv){
        #if defined(USE_EMISSIONMAP)
            fixed4 emissionMapColor = tex2D(_EmissionMap, uv);
            return _EmissionColor.rgb * emissionMapColor.rgb;
        #else 
            return _EmissionColor.rgb;
        #endif
    }

    void InitMaterial(float2 uv, inout Material material){
        fixed4 albedoAlpha = tex2D(_MainTex, uv);
        material.alpha = GetAlpha(albedoAlpha.a, _Color, _Cutoff);

        half4 specGloss = GetMetallicSpecGloss(uv, albedoAlpha.a);
        material.albedo = albedoAlpha.rgb * _Color.rgb;

        #if defined (_SPECULAR_SETUP)
            material.metallic = 1.0h;
            material.specular = specGloss.rgb;
        #else
            material.metallic = specGloss.r;
            material.specular = half3(0.0h, 0.0h, 0.0h);
        #endif

        material.smoothness = specGloss.a;
        material.normalTS = GetMaterialNormal(uv);
        material.occlusion = GetMaterialOcclusion(uv);
        material.emission = GetMaterialEmission(uv);
    }

#endif