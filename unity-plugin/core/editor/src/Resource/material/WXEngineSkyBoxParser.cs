using System;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    class WXSkyBoxParser:WXMaterialParser
    {

        public override void onParse(WXMaterial wxbb_material)
        {
            Material material = this.m_material;

            SetEffect("@system/skybox");

            AddTexture("_MainTex", "_Tex");

            AddShaderParam("_TintColor", material.GetColor("_TintColor"), true);

            AddShaderParam("_Exposure", material.GetFloat("_Exposure"));
            AddShaderParam("_Rotation", material.GetFloat("_Rotation"));

        }


        protected override void SetEffect(String effect)
        {
            m_mainJson.SetField("effect", effect);
        }
    }
}