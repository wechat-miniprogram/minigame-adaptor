#ifndef __LIGHTING_HLSL_
    #define __LIGHTING_HLSL_

    #define kDieletricSpec half4(0.04, 0.04, 0.04, 1.0 - 0.04) // standard dielectric reflectivity coef at incident angle (= 4%)

    struct BRDFData
    {
        half3 diffuse;
        half3 specular;
        half perceptualRoughness;
        half roughness;
        half roughness2;
        half grazingTerm;

        // We save some light invariant BRDF terms so we don't have to recompute
        // them in the light loop. Take a look at DirectBRDF function for detailed explaination.
        half normalizationTerm;     // roughness * 4.0 + 2.0
        half roughness2MinusOne;    // roughness² - 1.0
    };

    half ReflectivitySpecular(half3 specular)
    {
        return specular.r; // Red channel - because most metals are either monocrhome or with redish/yellowish tint
    }

    half OneMinusReflectivityMetallic(half metallic)
    {
        // We'll need oneMinusReflectivity, so
        //   1-reflectivity = 1-lerp(dielectricSpec, 1, metallic) = lerp(1-dielectricSpec, 0, metallic)
        // store (1-dielectricSpec) in kDieletricSpec.a, then
        //   1-reflectivity = lerp(alpha, 0, metallic) = alpha + metallic*(0 - alpha) =
        //                  = alpha - metallic * alpha
        half oneMinusDielectricSpec = kDieletricSpec.a;
        return oneMinusDielectricSpec - metallic * oneMinusDielectricSpec;
    }

    inline void InitializeBRDFData(half3 albedo, half metallic, half3 specular, half smoothness, out BRDFData outBRDFData)
    {
        #ifdef _SPECULAR_SETUP
            half reflectivity = ReflectivitySpecular(specular);
            half oneMinusReflectivity = 1.0 - reflectivity;

            outBRDFData.diffuse = albedo * (half3(1.0h, 1.0h, 1.0h) - specular);
            outBRDFData.specular = specular;
        #else

            half oneMinusReflectivity = OneMinusReflectivityMetallic(metallic);
            half reflectivity = 1.0 - oneMinusReflectivity;

            outBRDFData.diffuse = albedo * oneMinusReflectivity;
            outBRDFData.specular = lerp(kDieletricSpec.rgb, albedo, metallic);
        #endif

        outBRDFData.grazingTerm = saturate(smoothness + reflectivity);
        outBRDFData.perceptualRoughness = 1.0 - smoothness;
        outBRDFData.roughness = outBRDFData.perceptualRoughness * outBRDFData.perceptualRoughness;
        outBRDFData.roughness2 = outBRDFData.roughness * outBRDFData.roughness;

        outBRDFData.normalizationTerm = outBRDFData.roughness * 4.0h + 2.0h;
        outBRDFData.roughness2MinusOne = outBRDFData.roughness2 - 1.0h;
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

    half3 LightingPhysicallyBased(BRDFData brdfData, half3 lightColor, half3 lightDirWS, half lightAtten, half3 normalWS, half3 viewDirWS)
    {
        half NdotL = saturate(dot(normalWS, lightDirWS));
        half3 radiance = lightColor * (lightAtten * NdotL);
        return DirectBDRF(brdfData, normalWS, lightDirWS, viewDirWS) * radiance;
    }

    half3 LightForwardPBR(PixelInput inputData, half3 lightColor, half3 lightDirWS, half lightAtten, half3 albedo, half metallic, half3 specular, half smoothness)
    {
        BRDFData brdfData;
        InitializeBRDFData(albedo, metallic, specular, smoothness, brdfData);

        half3 color = LightingPhysicallyBased(brdfData, lightColor, lightDirWS, lightAtten, inputData.normalWS, inputData.viewDirWS);
        return color;
    }
    // GI
    #define UNITY_SPECUBE_LOD_STEPS 6
    fixed RoughnessToMipmapLevel(fixed roughness)
    {
        uint mipMapCount = UNITY_SPECUBE_LOD_STEPS;
        roughness = roughness * (1.7 - 0.7 * roughness);
        return roughness * mipMapCount;
    }
    
    half3 EnvironmentReflection(half3 reflectVector, half perceptualRoughness, half occlusion)
    {
        half mip = RoughnessToMipmapLevel(perceptualRoughness);
        half3 encodedIrradiance = DecodeHDR(UNITY_SAMPLE_TEXCUBE_LOD(unity_SpecCube0, reflectVector, mip), unity_SpecCube0_HDR);
        half3 irradiance = encodedIrradiance.rgb;
        return irradiance * occlusion;
    }

    half3 EnviromentBRDF(BRDFData brdfData, half3 indirectDiffuse, half3 indirectSpecular, half fresnelTerm)
    {
        half3 color = indirectDiffuse * brdfData.diffuse;
        float surfaceReduction = 1.0/(brdfData.roughness2 + 1.0);
        color += surfaceReduction * indirectSpecular * lerp(brdfData.specular, brdfData.grazingTerm, fresnelTerm);
        return color;
    }

    half3 GlobalIllumination(BRDFData brdfData, half3 bakedGI, half occlusion, half3 normalWS, half3 viewDirWS)
    {
        half3 relfectVector = reflect(-viewDirWS, normalWS);
        half fresnelTerm = pow4(1.0 - saturate(dot(normalWS, viewDirWS)));

        half3 indirectDiffuse = bakedGI * occlusion;
        half3 indirectSpecular = EnvironmentReflection(relfectVector, brdfData.perceptualRoughness, occlusion);
        return EnviromentBRDF(brdfData, indirectDiffuse, indirectSpecular, fresnelTerm);
    }

#endif