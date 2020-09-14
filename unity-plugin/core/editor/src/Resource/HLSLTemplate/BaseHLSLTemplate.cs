using System;
using System.Collections.Generic;
namespace WeChat
{
    class BaseHLSLTemplate
    {
        static Dictionary<string, string> typeMap = new Dictionary<string, string>
        {
            { "Float", "float"},
            { "Vector4", "float4"},
            { "Vector3", "float3"}
        };
        static protected string GetUniformString(WXEffect wxbb_shader)
        {
            string result = "cbuffer custom {\n";
            foreach (WXEffect.property property in wxbb_shader.properties)
            {
                string typeName;
                if (!typeMap.TryGetValue(property.type, out typeName))
                {
                    typeName = "float";
                }
                result += string.Format("    {0} {1};\n", typeName, property.key);
            }
            foreach (WXEffect.property texture in wxbb_shader.textures)
            {
                result += string.Format("    float4 {0}_ST;\n", texture.key);
            }
            return result + "}\n";
        }
        static public string Export(WXEffect wxbb_shader)
        {
            return "";
        }

        static protected string GetTextureDeclaration(WXEffect wxbb_shader)
        {
            string result = "";
            foreach (WXEffect.property texture in wxbb_shader.textures)
            {
                if (texture.type == "TextureCube")
                {
                    result += string.Format("DECLARE_CUBEMAP({0});\n", texture.key);
                }
                else
                {
                    result += string.Format("DECLARE_TEXTURE({0});\n", texture.key);
                }
            }
            return result;
        }

    }
}