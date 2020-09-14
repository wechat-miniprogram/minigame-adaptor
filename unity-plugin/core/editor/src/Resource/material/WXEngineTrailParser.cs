using System;
using UnityEditor;
using UnityEngine;

namespace WeChat
{

    class WXTrailParser : WXMaterialParser
    {
        public override void onParse(WXMaterial wxbb_material)
        {

            Material material = this.m_material;
            SetEffect("@system/trail");

            // main texture
            AddTexture("_MainTex", "_MainTex");
            // main texture scale offset
            Vector2 textureScale = material.GetTextureScale("_MainTex");
            Vector2 textureOffset = material.GetTextureOffset("_MainTex");
            AddShaderParam("_MainTex_ST", new float[4] { textureScale.x, textureScale.y, textureOffset.x, textureOffset.y });
            // tint color
            AddShaderParam("_TintColor", material.GetColor("_TintColor"), true);
            if (material.HasProperty("_Bright"))
            {
                AddShaderParam("_Bright", material.GetFloat("_Bright"));
            }

            // mask texture
            AddTexture("_MaskTex", "_MaskTex");
            // additive fog
            AddShaderDefination("USE_ADDITIVE_FOG", material.IsKeywordEnabled("ADDTIVEFOG") ? true : false);

            // alpha blend
            SetBlendOn(true);
            SetBlendFactor(ConvertBlendFactor(material.GetInt("_SrcBlend")), ConvertBlendFactor(material.GetInt("_DstBlend")));
            // depth write
            // SetDepthWrite(material.GetInt("_ZWrite") == 1? true:false);
            // // depth test
            // SetDepthTest(ConvertCompareFunc(material.GetInt("_ZTest")));
            // // cull
            // SetCullMode(ConvertCullMode(material.GetInt("_Cull")));
        }

        protected override void SetEffect(string effect)
        {
            m_mainJson.SetField("effect", effect);
        }
    }
}