using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat
{

    class WXSpriteFrame : WXResource
    {

        private UISpriteData data;
        private string texturePath;
        private string picturePath;

        public WXSpriteFrame(UISpriteData spriteData, string texturePath, string picturePath)
        {
            data = spriteData;
            this.texturePath = texturePath;
            this.picturePath = picturePath;
        }

        public override string GetExportPath()
        {
            return texturePath.Split('.')[0] + "@" + data.name + ".spriteframe";
        }

        public override string GetHash()
        {
            return AssetDatabase.GetAssetDependencyHash(picturePath).ToString() + "@" + WXUtility.GetMD5FromString(data.name);
        }

        protected override string GetResourceType()
        {
            return "spriteframe";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {

            float[] rect = { data.x, data.y, data.width, data.height };
            JSONObject frameJSON = new JSONObject(JSONObject.Type.OBJECT);
            frameJSON.AddField("texture", texturePath);
            if (data.hasPadding)
            {
                JSONObject trimJSON = new JSONObject(JSONObject.Type.ARRAY);
                trimJSON.Add(data.paddingTop);
                trimJSON.Add(data.paddingRight);
                trimJSON.Add(data.paddingBottom);
                trimJSON.Add(data.paddingLeft);
                frameJSON.AddField("trim", trimJSON);
            }
            JSONObject rectJSON = new JSONObject(JSONObject.Type.ARRAY);
            rectJSON.Add(rect[0]);
            rectJSON.Add(rect[1]);
            rectJSON.Add(rect[2]);
            rectJSON.Add(rect[3]);
            frameJSON.AddField("rect", rectJSON);
            if (data.hasBorder)
            {
                float[] slicedRect = { data.borderLeft, data.borderTop, rect[2] - (data.borderLeft + data.borderRight), rect[3] - (data.borderTop + data.borderBottom) };
                JSONObject innerRectJSON = new JSONObject(JSONObject.Type.ARRAY);
                innerRectJSON.Add(slicedRect[0]);
                innerRectJSON.Add(slicedRect[1]);
                innerRectJSON.Add(slicedRect[2]);
                innerRectJSON.Add(slicedRect[3]);
                frameJSON.AddField("slicedRect", innerRectJSON);
            }
            //JSONObject depJSON = new JSONObject(JSONObject.Type.ARRAY);
            //depJSON.Add(picturePath);
            // List<string> dependencies = new List<string>();
            // dependencies.Add(picturePath);
            AddDependencies(texturePath);

            frameJSON.AddField("version", 2);
            return frameJSON;

        }

        internal static string getSprite(UIAtlas atlas, string uispriteName, ExportPreset preset)
        {
            Material atlasMaterial = atlas.spriteMaterial;
            Texture2D texture2D = (Texture2D)atlasMaterial.GetTexture("_MainTex");
            string res = null;
            if (texture2D != null)
            {
                string picturePath = AssetDatabase.GetAssetPath(texture2D.GetInstanceID());
                //Texture2D copyTexture = DuplicateTexture(texture2D);

                //picturePath = path.Split('.')[0] + ".png";
                string texturePath = new WXTexture(texture2D).Export(preset);

                JSONObject metadata = TextureUtil.getMeta(texture2D);

                BetterList<string> allSpriteList = atlas.GetListOfSprites();
                string[] list = allSpriteList.ToArray();
                foreach (string spriteName in list)
                {
                    UISpriteData currentData = atlas.GetSprite(spriteName);
                    WXSpriteFrame spriteConverter = new WXSpriteFrame(currentData, texturePath, picturePath);
                    string uuid = spriteConverter.Export(preset);
                    // 这里不需要了，外部去给hierarchyContext addResource就好
                    if (spriteName == uispriteName)
                    {
                        res = uuid;
                        return res;
                        //    WXBeefBallExportContext.addDep(uuid);

                    }
                    //else
                    //{
                    //    WXBeefBallExportContext.addNoDependence(uuid);
                    //}
                }
            }
            return res;
        }
    }
}
