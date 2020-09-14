using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;

namespace WeChat
{

    class WXUGUISpriteFrame : WXResource
    {

        private Sprite data;
        private string texturePath;
        private string picturePath;

        public WXUGUISpriteFrame(Sprite spriteData, string texturePath, string picturePath)
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

            float[] rect = { data.rect.x, data.rect.y, data.rect.width, data.rect.height };
            JSONObject frameJSON = new JSONObject(JSONObject.Type.OBJECT);
            frameJSON.AddField("texture", texturePath);
            /*var style = data.style;
            if (style)
            {
                JSONObject trimJSON = new JSONObject(JSONObject.Type.ARRAY);
                trimJSON.Add(style.paddingTop);
                trimJSON.Add(style.paddingRight);
                trimJSON.Add(style.paddingBottom);
                trimJSON.Add(style.paddingLeft);
                frameJSON.AddField("trim", trimJSON);
            } */
            JSONObject rectJSON = new JSONObject(JSONObject.Type.ARRAY);
            rectJSON.Add(rect[0]);
            rectJSON.Add(rect[1]);
            rectJSON.Add(rect[2]);
            rectJSON.Add(rect[3]);
            frameJSON.AddField("rect", rectJSON);
           /* if (style)
            {
                float[] slicedRect = { style.borderLeftWidth, style.borderTopWidth, rect[2] - (style.borderLeftWidth + style.borderRightWidth), rect[3] - (style.borderTopWidth + style.borderBottomWidth) };
                JSONObject innerRectJSON = new JSONObject(JSONObject.Type.ARRAY);
                innerRectJSON.Add(slicedRect[0]);
                innerRectJSON.Add(slicedRect[1]);
                innerRectJSON.Add(slicedRect[2]);
                innerRectJSON.Add(slicedRect[3]);
                frameJSON.AddField("slicedRect", innerRectJSON);
            } */

            AddDependencies(texturePath);

            frameJSON.AddField("version", 2);
            return frameJSON;

        }

        internal static string getSprite(Sprite sprite, ExportPreset preset)
        {
            Texture2D texture2D = sprite.texture as Texture2D;
            string res = null;
            if (texture2D != null)
            {
                string picturePath = AssetDatabase.GetAssetPath(texture2D.GetInstanceID());

                string texturePath = new WXTexture(texture2D).Export(preset);

                WXUGUISpriteFrame spriteConverter = new WXUGUISpriteFrame(sprite, texturePath, picturePath);
                string uuid = spriteConverter.Export(preset);
                return uuid;
                
            }
            return res;
        }
    }
}
