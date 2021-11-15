using System;
using UnityEditor;
using UnityEngine;

namespace WeChat {
    class WXStandardLitParser : WXMaterialParser {
        enum RenderMode {
            Opaque = 0,
            Cutout = 1,
            Transparent = 2,
            Custom = 3
        }
        public override void onParse (WXMaterial wxbb_material) {

            Material material = this.m_material;

            SetEffect ("@system/standardLit");

            // diffuse texture
            AddTexture ("_MainTex", "_MainTex");
            // diffuse texture scale offset
            Vector2 textureScale = material.GetTextureScale ("_MainTex");
            Vector2 textureOffset = material.GetTextureOffset ("_MainTex");
            AddShaderParam ("_MainTex_ST", new float[4] { textureScale.x, textureScale.y, textureOffset.x, textureOffset.y });

            // color
            AddShaderParam ("_Color", material.GetColor ("_Color"), true);

            // normal map
            if (material.GetTexture ("_NormalMap") != null) {
                AddTexture ("_NormalMap", "_NormalMap");
                AddShaderDefination ("USE_NORMALMAP", true);
            }

            // WorkFlow
            bool isSpecularWorkFlow = (double)material.GetFloat ("_WorkflowMode") == 0.0;
            if (isSpecularWorkFlow) {
                AddShaderDefination ("_SPECULAR_SETUP", true);
            }
            // hasGlossMap
            bool hasGlossMap = false;
            if (isSpecularWorkFlow)
                hasGlossMap = material.GetTexture ("_SpecGlossMap");
            else
                hasGlossMap = material.GetTexture ("_MetallicGlossMap");
            if (hasGlossMap) {
                AddShaderDefination ("USE_METALLICSPECGLOSSMAP", true);
            }
            AddShaderParam ("_Glossiness", material.GetFloat ("_Glossiness"));
            AddShaderParam ("_GlossMapScale", material.GetFloat ("_GlossMapScale"));

            // Specular Gloss Map
            AddShaderParam ("_Specular", material.GetColor ("_Specular"), true);
            if (hasGlossMap && isSpecularWorkFlow) {
                AddTexture ("_SpecGlossMap", "_SpecGlossMap");
            }
            // Metallic Gloss Map
            AddShaderParam ("_Metallic", material.GetFloat ("_Metallic"));
            if (hasGlossMap && !isSpecularWorkFlow) {
                AddTexture ("_MetallicGlossMap", "_MetallicGlossMap");
            }
            
            // Gloss Channel
            if (material.HasProperty ("_SmoothnessTextureChannel")) {
                // MaterialProperty smoothnessMapChannel;
                // bool smoothnessChannelAlbedoA = (double)material.GetFloat("_SmoothnessTextureChannel") == 1.0;
                // if(smoothnessChannelAlbedoA){
                //     AddShaderDefination ("_SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A", smoothnessChannelAlbedoA);
                // }
            }

            // AO Map
            if (material.GetTexture ("_OcclusionMap") != null) {
                AddTexture ("_OcclusionMap", "_OcclusionMap");
                AddShaderDefination ("USE_AOMAP", true);
            }

            // Emission Map
            if (material.GetTexture ("_EmissionMap") != null) {
                AddTexture ("_EmissionMap", "_EmissionMap");
                AddShaderDefination ("USE_EMISSIONMAP", true);
            }
            AddShaderParam ("_EmissionColor", material.GetColor ("_EmissionColor"), true);

            AddShaderParam ("_Cutoff", material.GetFloat ("_Cutoff"));

            AddShaderDefination ("USE_LIGHTING", (double) material.GetFloat ("_Lighting") == 0.0 ? true : false);

            // laya里面，这个shader属性是写反了的
            AddShaderDefination ("USE_FOG", (double) material.GetFloat ("_Fog") == 1.0 ? false : true);

            // alpha test
            if (material.IsKeywordEnabled ("_ALPHATEST_ON")) {
                AddShaderDefination ("USE_ALPHA_TEST", true);
            }

            // alpha blend
            if (material.IsKeywordEnabled ("_ALPHABLEND_ON")) {
                SetBlendOn (true);
                SetBlendFactor (ConvertBlendFactor (material.GetInt ("_SrcBlend")), ConvertBlendFactor (material.GetInt ("_DstBlend")));
            } else {
                SetBlendOn (false);
            }
            // depth write
            SetDepthWrite (material.GetInt ("_ZWrite") == 1 ? true : false);
            // depth test
            SetDepthTest (ConvertCompareFunc (material.GetInt ("_ZTest")));
            // cull
            SetCullMode (ConvertCullMode (material.GetInt ("_Cull")));

            // Render Mode
            RenderMode mode = (RenderMode) material.GetFloat ("_Mode");
            switch (mode) {
                case RenderMode.Opaque:
                    break;
                case RenderMode.Cutout:
                    AddShaderDefination ("USE_ALPHA_TEST", true);
                    break;
                case RenderMode.Transparent:
                    break;
                case RenderMode.Custom:
                    if (material.IsKeywordEnabled ("_ALPHABLEND_ON")) {
                        AddShaderDefination ("USE_ALPHA_TEST", true);
                    }
                    break;
                default:
                    break;
            }

        }

        protected override void SetEffect (String effect) {
            m_mainJson.SetField ("effect", effect);
        }
    }
}