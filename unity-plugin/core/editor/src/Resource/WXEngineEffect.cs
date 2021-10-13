using System;
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

namespace WeChat
{
    public class WXEffect : WXResource
    {
        public Shader shader;
        public int property_count;
        public struct property
        {
            public string key;
            public string type;
            public JSONObject defaultValue;
        }
        public List<property> properties;
        public List<property> textures;

        public WXEffect(Shader _shader) : base(AssetDatabase.GetAssetPath(_shader.GetInstanceID()))
        {
            this.shader = (Shader)_shader;
            this.properties = new List<property>();
            this.textures = new List<property>();

            this.property_count = ShaderUtil.GetPropertyCount(shader);

            for (int i = 0; i < property_count; i++)
            {
                string name = ShaderUtil.GetPropertyName(shader, i);
                string typeName = "";
                ShaderUtil.ShaderPropertyType type = ShaderUtil.GetPropertyType(shader, i);
                JSONObject defaultValue = new JSONObject(0);
                switch (type)
                {
                    case ShaderUtil.ShaderPropertyType.Float:
                    case ShaderUtil.ShaderPropertyType.Range:
                        typeName = "Float";
                        defaultValue = new JSONObject(JSONObject.Type.ARRAY);
                        defaultValue.Add(0);
                        break;
                    case ShaderUtil.ShaderPropertyType.Vector:
                        typeName = "Vector4";
                        defaultValue = new JSONObject(JSONObject.Type.ARRAY);
                        defaultValue.Add(0); defaultValue.Add(0);
                        defaultValue.Add(0); defaultValue.Add(1);
                        break;
                    case ShaderUtil.ShaderPropertyType.Color:
                        typeName = "Vector4";
                        defaultValue = new JSONObject(JSONObject.Type.ARRAY);
                        defaultValue.Add(1); defaultValue.Add(1);
                        defaultValue.Add(1); defaultValue.Add(1);
                        break;
                    case ShaderUtil.ShaderPropertyType.TexEnv:
                        typeName = "unresolved_tex";
                        defaultValue = JSONObject.CreateStringObject("white");
                        break;
                }
                if (typeName == "") continue;
                if (typeName == "unresolved_tex")
                {
                    UnityEngine.Rendering.TextureDimension texType = ShaderUtil.GetTexDim(shader, i);
                    switch (texType)
                    {
                        case UnityEngine.Rendering.TextureDimension.Tex2D:
                            typeName = "Texture2D";
                            break;
                        case UnityEngine.Rendering.TextureDimension.Cube:
                            typeName = "TextureCube";
                            break;
                    }
                    if (typeName == "unresolved_tex") continue;
                    this.textures.Add(new property { key = name, type = typeName, defaultValue = defaultValue });
                }
                else
                {
                    this.properties.Add(new property { key = name, type = typeName, defaultValue = defaultValue });
                }
            }

        }

        protected override string GetResourceType()
        {
            return "effect";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath);
        }

        protected string GetRawPath()
        {
            return wxFileUtil.cleanIllegalChar(unityAssetPath, false);
        }
        public override string GetExportPath()
        {
            return GetRawPath() + ".effect";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            if (shader == null)
            {
                return null;
            }

            // .effect
            JSONObject jsonFile = new JSONObject(JSONObject.Type.OBJECT);

            JSONObject m_shaderProperties = new JSONObject(JSONObject.Type.ARRAY);
            foreach (property p in this.properties)
            {
                JSONObject m_property = new JSONObject(JSONObject.Type.OBJECT);
                m_property.AddField("key", p.key);
                m_property.AddField("type", p.type);
                m_property.AddField("default", p.defaultValue);
                m_shaderProperties.Add(m_property);
            }

            JSONObject m_textures = new JSONObject(JSONObject.Type.ARRAY);
            foreach (property p in this.textures)
            {
                JSONObject m_property = new JSONObject(JSONObject.Type.OBJECT);
                m_property.AddField("key", p.key + "_ST");
                m_property.AddField("type", "Vector4");
                JSONObject defaultValue = new JSONObject(JSONObject.Type.ARRAY);
                defaultValue.Add(1); defaultValue.Add(1);
                defaultValue.Add(0); defaultValue.Add(0);
                m_property.AddField("default", defaultValue);
                m_shaderProperties.Add(m_property);

                JSONObject m_texture = new JSONObject(JSONObject.Type.OBJECT);
                m_texture.AddField("key", p.key);
                m_texture.AddField("type", p.type);
                m_texture.AddField("default", p.defaultValue);
                m_textures.Add(m_texture);
            }
            jsonFile.SetField("shaderProperties", m_shaderProperties);
            jsonFile.SetField("textures", m_textures);
            jsonFile.SetField("defaultRenderQueue", 2000);
            JSONObject m_passes = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject m_pass = new JSONObject(JSONObject.Type.OBJECT);

            m_pass.SetField("lightMode", "ForwardBase");
            m_pass.SetField("useMaterialRenderStates", false);

            m_pass.SetField("renderStates", new JSONObject(JSONObject.Type.OBJECT));

            JSONObject m_compileFlags = new JSONObject(JSONObject.Type.ARRAY);
            m_compileFlags.Add("Skin");
            m_compileFlags.Add("Particle");
            m_compileFlags.Add("Line");
            m_compileFlags.Add("Trail");
            m_pass.SetField("compileFlags", m_compileFlags);

            JSONObject m_multiCompile = new JSONObject(JSONObject.Type.ARRAY);
            m_pass.SetField("multiCompile", m_multiCompile);

            m_passes.Add(m_pass);
            jsonFile.SetField("passes", m_passes);

            JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
            metadata.AddField("version", 1);

            //if (BeefBall.currentExportPreset.configs.ContainsKey("GenShaderTemplate")
            //&& (bool)BeefBall.currentExportPreset.configs["GenShaderTemplate"])
            //{
            string vs_uid = AddFile(new WXVertexFile(this));
            vs_uid = "." + vs_uid.Substring(vs_uid.LastIndexOf('/'));
            string fs_uid = AddFile(new WXPixelFile(this));
            fs_uid = "." + fs_uid.Substring(fs_uid.LastIndexOf('/'));

            m_pass.SetField("vs", vs_uid);
            m_pass.SetField("ps", fs_uid);
            //}

            var editorInfo = new JSONObject(JSONObject.Type.OBJECT);
            editorInfo.AddField("assetVersion", 2);

            jsonFile.AddField("editorInfo", editorInfo);
            return jsonFile;
        }

        class WXVertexFile : WXEngineTextFile
        {
            private WXEffect effect;

            public WXVertexFile(WXEffect effect) : base(effect.unityAssetPath)
            {
                this.effect = effect;
            }

            public override string GetExportPath()
            {
                return effect.GetRawPath() + ".vertex.hlsl";
            }

            protected override string GetContent()
            {
                return VertexHLSLTemplate.Export(effect);
            }
        }
        class WXPixelFile : WXEngineTextFile
        {
            private WXEffect effect;

            public WXPixelFile(WXEffect effect) : base(effect.unityAssetPath)
            {
                this.effect = effect;
            }

            public override string GetExportPath()
            {
                return effect.GetRawPath() + ".pixel.hlsl";
            }

            protected override string GetContent()
            {
                return PixelHLSLTemplate.Export(effect);
            }
        }
    }
}
