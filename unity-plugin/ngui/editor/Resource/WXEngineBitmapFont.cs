using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using System.Text.RegularExpressions;

namespace WeChat
{
    class WXBitmapFont : WXResource
    {
        private UIFont _bitmapFont;
        private string unityAssetPath;

        public WXBitmapFont(UIFont bitmapFont)
        {
            // 处理reference的情况
            while (bitmapFont.replacement != null)
            {
                bitmapFont = bitmapFont.replacement as UIFont;
            }
            _bitmapFont = bitmapFont;
            unityAssetPath = AssetDatabase.GetAssetPath(_bitmapFont);
        }

        public override string GetExportPath()
        {
            return unityAssetPath.Replace(".prefab", ".bitmapfont");
        }

        protected override string GetResourceType()
        {
            return "bitmapfont";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath);
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            // 搞配置
            string[] lines = System.IO.File.ReadAllLines(unityAssetPath);
            string pattern = @"^\s+";
            JSONObject bitmapFontResource = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject bitmapFontConfig = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject currentcharacterConfig = null;
            string currentIndex = "";
            for (int i = 0; i < lines.Length; i++)
            {
                string line = Regex.Replace(lines[i], pattern, "");

                if (line.StartsWith("mSize")) {
                    string[] array = line.Split(':');
                    int lineHeight = Int32.Parse(array[1].Trim());
                    bitmapFontResource.AddField("lineHeight", lineHeight);
                }
                else if (line.StartsWith("mBase")) {
                    string[] array = line.Split(':');
                    int fontSize = Int32.Parse(array[1].Trim());
                    bitmapFontResource.AddField("fontSize", fontSize);
                }
                else if (line.StartsWith("mWidth")) {
                    string[] array = line.Split(':');
                    int width = Int32.Parse(array[1].Trim());
                    bitmapFontResource.AddField("width", width);
                }
                else if (line.StartsWith("mHeight")) {
                    string[] array = line.Split(':');
                    int height = Int32.Parse(array[1].Trim());
                    bitmapFontResource.AddField("height", height);
                }

                if (line.StartsWith("- index"))
                {
                    if (currentcharacterConfig)
                    {
                        bitmapFontConfig.AddField(currentIndex, currentcharacterConfig);
                        currentcharacterConfig = null;
                    }

                    JSONObject characterConfig = new JSONObject(JSONObject.Type.OBJECT);
                    string index = line.Replace("- index: ", "");
                    currentcharacterConfig = characterConfig;
                    currentIndex = index;
                }
                else if (currentcharacterConfig)
                {
                    string[] array = line.Split(':');
                    string key = array[0].Trim();
                    if (key == "x" || key == "y" || key == "width" || key == "height"
                    || key == "offsetX" || key == "offsetY" || key == "advance" || key == "channel")
                    {
                        int value = Int32.Parse(array[1].Trim());
                        currentcharacterConfig.AddField(key, value);
                    }
                }
            }
            if (currentcharacterConfig)
            {
                bitmapFontConfig.AddField(currentIndex, currentcharacterConfig);
            }

            Texture2D unityTexture = _bitmapFont.material.mainTexture as Texture2D;
            string wxbbTextureID = AddDependencies(new WXTexture(unityTexture));

            List<string> dependencyResource = new List<string>();
            dependencyResource.Add(wxbbTextureID);

            bitmapFontResource.AddField("frames", bitmapFontConfig);
            bitmapFontResource.AddField("texture", wxbbTextureID);

            bitmapFontResource.AddField("version", 2);
            return bitmapFontResource;
        }
    }

}
