using System;
using UnityEditor;
using UnityEngine;
using WeChat;
namespace WeChat {
    [InitializeOnLoad]
    internal class CustomMaterialParser : WXMaterialParser

    {
        static CustomMaterialParser () {
            WXMaterial.registerParser ("CustomShader", new CustomMaterialParser ());
        }

        public override void onParse (WXMaterial wxbb_material) {

            Material material = this.m_material;

            // 生成shader模板
            Shader shader = m_material.shader;
            WXEffect wxbb_effect = new WXEffect (shader);
            this.dependenciesAdder (wxbb_effect);

            if (shader == null) {
                Debug.LogErrorFormat ("材质{0}缺少自定义shader", material.name);
                return;
            }

            // 指定shader名字
            SetEffect (wxbb_effect.Export (null));

            for (int i = 0; i < ShaderUtil.GetPropertyCount (shader); i++) {
                string name = ShaderUtil.GetPropertyName (shader, i);
                ShaderUtil.ShaderPropertyType type = ShaderUtil.GetPropertyType (shader, i);
                switch (type) {
                    case ShaderUtil.ShaderPropertyType.Float:
                    case ShaderUtil.ShaderPropertyType.Range:
                        AddShaderParam (name, material.GetFloat (name));
                        break;
                    case ShaderUtil.ShaderPropertyType.Vector:
                        Vector4 v = material.GetVector (name);
                        AddShaderParam (name, new float[] { v.x, v.y, v.z, v.w });
                        break;
                    case ShaderUtil.ShaderPropertyType.Color:
                        AddShaderParam (name, material.GetColor (name), true);
                        break;
                    case ShaderUtil.ShaderPropertyType.TexEnv:
                        AddTexture (name, name);
                        Vector4 st = material.GetVector (name + "_ST");
                        AddShaderParam (name + "_ST", new float[] { st.x, st.y, st.z, st.w });
                        break;
                }
            }
        }

        protected override void SetEffect (String effect) {
            m_mainJson.SetField ("effect", effect);
        }
    }
}