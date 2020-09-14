/* todo shanexy
using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
namespace WeChat
{
    class WXSkyboxParser : WXMaterialParser
    {

        public static Texture2D GetCubeMapTextureData(Color[] color)
        {
            int num = 0;
            int num2;
            int num3 = num2 = (int)Mathf.Sqrt((float)color.Length);
            Texture2D texture2D = new Texture2D(num3, num2);
            for (int i = 0; i < num2; i++)
            {
                for (int j = 0; j < num3; j++)
                {
                    texture2D.SetPixel(j, num2 - 1 - i, color[num++]);
                }
            }
            return texture2D;
        }

        public static string SaveSkyboxMaterial(Material material)
        {
            string name = material.shader.name;
            if (name == "Skybox/6 Sided")
            {
                List<string> dependencies = new List<string>();
                JSONObject jsonFile = new JSONObject(JSONObject.Type.OBJECT);
                string frontID = MaterialUtil.SaveMaterialFile(material, "_FrontTex", ref dependencies);
                jsonFile.AddField("front", frontID);
                string backID = MaterialUtil.SaveMaterialFile(material, "_BackTex", ref dependencies);
                jsonFile.AddField("back", backID);
                string leftID = MaterialUtil.SaveMaterialFile(material, "_LeftTex", ref dependencies);
                jsonFile.AddField("left", leftID);
                string rightID = MaterialUtil.SaveMaterialFile(material, "_RightTex", ref dependencies);
                jsonFile.AddField("right", rightID);
                string upID = MaterialUtil.SaveMaterialFile(material, "_UpTex", ref dependencies);
                jsonFile.AddField("up", upID);
                string downID = MaterialUtil.SaveMaterialFile(material, "_DownTex", ref dependencies);
                jsonFile.AddField("down", downID);

                int instanceID = material.GetInstanceID();
                string path = AssetDatabase.GetAssetPath(instanceID);
                path = wxFileUtil.cleanIllegalChar(path.Split('.')[0], false) + ".cubemap.json";
                JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
                metadata.AddField("version", 1);
                WXBeefBall.exportContext.AddJSONResource(path, "texturecube", jsonFile, metadata, dependencies);
                return path;
            }
            else if (name == "Skybox/Cubemap")
            {
                List<string> dependencies = new List<string>();
                JSONObject jsonFile = new JSONObject(JSONObject.Type.OBJECT);
                if (material.HasProperty("_Tex"))
                {
                    Cubemap cubemap = (Cubemap)material.GetTexture("_Tex");
                    if (cubemap != null)
                    {
                        return WXResource.GetExport<WXTextureCube>(cubemap);
                    }
                }
            }
            return null;
        }

        public override void onParse(WXMaterial wxbb_material)
        {

            Material material = this.m_material;

            SetEffect("@system/skybox");
            m_dependencies.Add(SaveSkyboxMaterial(material));
        }

        protected override void SetEffect(String effect)
        {
            m_mainJson.SetField("effect", effect);
        }
    }
}
*/