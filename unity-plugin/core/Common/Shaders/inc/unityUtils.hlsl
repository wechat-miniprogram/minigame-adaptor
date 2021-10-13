#ifndef __UNITY_UTILS_HLSL_
    #define __UNITY_UTILS_HLSL_

    // #define SAMPLE_TEXURECUBE_LOD(textureName, samplerName, coord3, lod) textureName.SampleLevel(samplerName, coord3, lod)

    inline half3 ReadNormal(half4 color)
    {
        half2 normalxy = (color.rg - 0.5f)*2.0f;
        half normalz = sqrt(max(1e-3, 1.0f - dot(normalxy, normalxy)));
        return half3(normalxy, normalz);
    }

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



    // half3 DecodeHDREnviroment(fixed4 encodedIrradiance, fixed4 decodedInstructions)
    // {   
        //     fixed alpha = max(decodedInstructions.w*(encodedIrradiance.a - 1.0) + 1.0, 0.0);
        //     return (decodedInstructions.x * PositivePow(alpha, decodedInstructions.y))*encodedIrradiance.rgb;
    // }

#endif // __UNITY_UTILS_HLSL_