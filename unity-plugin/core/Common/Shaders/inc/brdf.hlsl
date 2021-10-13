#ifndef __BRDF_HLSL_
    #define __BRDF_HLSL_

    #include "./math.hlsl"
    #include "./unityUtils.hlsl"
    #include "./dataStruct.hlsl"
    #include "./globalIllumination.hlsl"

    inline void InitializeBRDFData(SurfaceData surfaceData, out BRDFData outData){

        InitializeBRDFData(surfaceData.baseColor, surfaceData.metallic, surfaceData.specular, surfaceData.smoothness, surfaceData.alpha, outData);
    }

    half3 DirectBDRF(BRDFData brdfData, half3 normalWS, half3 lightDirectionWS, half3 viewDirectionWS)
    {
        // Based on Minimalist CookTorrance BRDF
        // Implementation is slightly different from original derivation: http://www.thetenthplanet.de/archives/255
        //
        // * NDF [Modified] GGX
        // * Modified Kelemen and Szirmay-​Kalos for Visibility term
        // * Fresnel approximated with 1/LdotH

        half3 halfDir = SafeNormalize(lightDirectionWS + viewDirectionWS);

        half NoH = saturate(dot(normalWS, halfDir));
        half LoH = saturate(dot(lightDirectionWS, halfDir));

        // GGX Distribution multiplied by combined approximation of Visibility and Fresnel
        // BRDFspec = (D * V * F) / 4.0
        // D = roughness² / ( NoH² * (roughness² - 1) + 1 )²
        // V * F = 1.0 / ( LoH² * (roughness + 0.5) )
        // See "Optimizing PBR for Mobile" from Siggraph 2015 moving mobile graphics course
        // https://community.arm.com/events/1155

        // Final BRDFspec = roughness² / ( NoH² * (roughness² - 1) + 1 )² * (LoH² * (roughness + 0.5) * 4.0)
        // We further optimize a few light invariant terms
        // brdfData.normalizationTerm = (roughness + 0.5) * 4.0 rewritten as roughness * 4.0 + 2.0 to a fit a MAD.
        half d = NoH * NoH * brdfData.roughness2MinusOne + 1.00001h;

        half LoH2 = LoH * LoH;
        half specularTerm = brdfData.roughness2 / ((d * d) * max(0.1h, LoH2) * brdfData.normalizationTerm);
        
        // on mobiles (where half actually means something) denominator have risk of overflow
        // clamp below was added specifically to "fix" that, but dx compiler (we convert bytecode to metal/gles)
        // sees that specularTerm have only non-negative terms, so it skips max(0,..) in clamp (leaving only min(100,...))
        specularTerm = specularTerm - HALF_MIN;
        specularTerm = clamp(specularTerm, 0.0, 100.0); // Prevent FP16 overflow on mobiles

        half3 color = specularTerm  * brdfData.specular + brdfData.diffuse;
        return color;
    }

    half3 LightingPhysicallyBased(BRDFData brdfData, half3 lightColor, half3 lightDirectionWS, half lightAttenuation, half3 normalWS, half3 viewDirectionWS)
    {
        half NdotL = saturate(dot(normalWS, lightDirectionWS));
        half3 radiance = lightColor * (lightAttenuation * NdotL);
        return DirectBDRF(brdfData, normalWS, lightDirectionWS, viewDirectionWS) * radiance;
    }

    half3 StandardLightingBase(SurfaceData surfaceData, PixelInput input, half3 lightColor, half3 lightDirWS){

        BRDFData brdfData;
        InitializeBRDFData(surfaceData, brdfData);

        fixed3 color = GlobalIllumination(brdfData, input.bakeGI, surfaceData.occlusion, input.normalWS, input.viewDirWS);
        
        color += LightingPhysicallyBased(brdfData, lightColor, lightDirWS, input.shadowAtten, input.normalWS,  input.viewDirWS);

        color += surfaceData.emission;

        return color;
    }

    half3 StandardLightingAdd(SurfaceData surfaceData, PixelInput input, half3 lightColor, half3 lightDirWS, half attenuation){

        BRDFData brdfData;
        InitializeBRDFData(surfaceData, brdfData);

        fixed color = LightingPhysicallyBased(brdfData, lightColor, lightDirWS, attenuation, input.normalWS,  input.viewDirWS);

        return color;
    }


#endif //__BRDF_HLSL_