using System;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    class WXStandardLitParser : WXMaterialParser
    {
        public override void onParse(WXMaterial wxbb_material)
        {

            Material material = this.m_material;

            SetEffect("@system/standardLit");

            // diffuse texture
            AddTexture("_MainTex", "_MainTex");
            // diffuse texture scale offset
            Vector2 textureScale = material.GetTextureScale("_MainTex");
            Vector2 textureOffset = material.GetTextureOffset("_MainTex");
            AddShaderParam("_MainTex_ST", new float[4] { textureScale.x, textureScale.y, textureOffset.x, textureOffset.y });
            
            // diffuse color
            AddShaderParam("_Color", material.GetColor("_Color"), true);

            // normal map
            if (material.GetTexture("_NormalMap") != null)
            {
                AddTexture("_NormalMap", "_NormalMap");
                AddShaderDefination("USE_NORMALMAP", true);
            }

            // MatallicGloss map
            if (material.GetTexture("_MetallicGlossMap") != null)
            {
                AddTexture("_MetallicGlossMap", "_MetallicGlossMap");
                AddShaderDefination("USE_METALLICMAP", true);
            }
     
             // MatallicGloss map
            if (material.GetTexture("_OcclusionMap") != null)
            {
                AddTexture("_OcclusionMap", "_OcclusionMap");
                AddShaderDefination("USE_OCCLUTIONMAP", true);
            }

            // emission map
            if (material.GetTexture("_EmissionMap") != null)
            {
                AddTexture("_EmissionMap", "_EmissionMap");
                AddShaderDefination("USE_EMISSIONMAP", true);
            }
            AddShaderParam("_EmissionColor", material.GetColor("_EmissionColor"), true);

            AddShaderParam("_Cutoff", material.GetFloat("_Cutoff"));
            
            AddShaderParam("_GlossMapScale", material.GetFloat("_GlossMapScale"));
            
            AddShaderDefination("USE_LIGHTING", (double)material.GetFloat("_Lighting") == 0.0 ? true : false);

            // laya里面，这个shader属性是写反了的
            AddShaderDefination("USE_FOG", (double)material.GetFloat("_Fog") == 1.0 ? false : true);

            // alpha test
            if (material.IsKeywordEnabled("_ALPHATEST_ON"))
            {
                AddShaderDefination("USE_ALPHA_TEST", true);
            }

            // alpha blend
            if (material.IsKeywordEnabled("_ALPHABLEND_ON"))
            {
                SetBlendOn(true);
                SetBlendFactor(ConvertBlendFactor(material.GetInt("_SrcBlend")), ConvertBlendFactor(material.GetInt("_DstBlend")));
            }
            else
            {
                SetBlendOn(false);
            }
            // depth write
            SetDepthWrite(material.GetInt("_ZWrite") == 1 ? true : false);
            // depth test
            SetDepthTest(ConvertCompareFunc(material.GetInt("_ZTest")));
            // cull
            SetCullMode(ConvertCullMode(material.GetInt("_Cull")));
        }

        protected override void SetEffect(String effect)
        {
            m_mainJson.SetField("effect", effect);
        }
    }
}
