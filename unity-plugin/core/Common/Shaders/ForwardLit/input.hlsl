#ifndef __INPUT_HLSL_
    #define __INPUT_HLSL_
    #include "math.hlsl"

    struct PixelInput
    {
        float3  positionWS;
        half3   normalWS;
        half3   viewDirWS;
        half3   bakedGI;
        fixed   shadowAtten;
    };

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

    void InitPixelInput(v2f input, fixed3 normalTS, inout PixelInput pixelInput){
        pixelInput.positionWS = input.positionWS.xyz;
        pixelInput.viewDirWS = normalize(input.viewDirWS);

        // normal
        #if defined(USE_NORMALMAP)
            half3x3 TBN = half3x3(input.tangentWS, input.bitangentWS, input.normalWS);
            pixelInput.normalWS = TransformTangentToWorld(normalTS, TBN);
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #else
            pixelInput.normalWS = input.normalWS;
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #endif

        // shadow
        pixelInput.shadowAtten = SHADOW_ATTENUATION(input);

        // gi
        #ifdef LIGHTMAP_ON
            fixed3 lightMapColor = SampleLightmap(input.uv2);
            pixelInput.bakedGI = MixLightmapWithRealtimeAttenuation(lightMapColor, pixelInput.shadowAtten, pixelInput.normalWS);
        #else
            pixelInput.bakedGI = ShadeSH9(float4(pixelInput.normalWS,1));
        #endif
    }

    void InitPixelInputAddPass(v2f input, fixed3 normalTS, inout PixelInput pixelInput){
        pixelInput.positionWS = input.positionWS.xyz;
        pixelInput.viewDirWS = normalize(input.viewDirWS);

        // normal
        #if defined(USE_NORMALMAP)
            half3x3 TBN = half3x3(input.tangentWS, input.bitangentWS, input.normalWS);
            pixelInput.normalWS = TransformTangentToWorld(normalTS, TBN);
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #else
            pixelInput.normalWS = input.normalWS;
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #endif
    }

#endif