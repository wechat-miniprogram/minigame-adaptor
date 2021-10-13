using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEngine;

namespace WeChat
{

    class WXLightMap : WXResource
    {
        protected override string GetResourceType()
        {
            return "texture2d";
        }

        private Texture2D lightmapColor;
        public WXLightMap(Texture2D _lightmapColor): base(AssetDatabase.GetAssetPath(_lightmapColor.GetInstanceID()))
        {
            lightmapColor = _lightmapColor;
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                .setResource(this)
                .error(ErrorUtil.ErrorCode.LightMap_PathError, "Lightmap文件的unity路径为空");
            }
        }

        public override string GetExportPath()
        {
            return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + ".texture2d";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath);
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            if (string.IsNullOrEmpty(unityAssetPath))
            {
                Debug.LogError("WXBeefBallTexture null lightmap.");
                return null;
            }

            JSONObject metadata = JSONObject.Create("{\"data\":{}, \"file\":{}}");
            string texturePath = AddFile(new TextureImageFile(lightmapColor));
            metadata.GetField("file").AddField("src", texturePath);
            metadata.SetField("data", TextureUtil.getMeta(lightmapColor));

            var editorInfo = new JSONObject(JSONObject.Type.OBJECT);
            editorInfo.AddField("assetVersion", 2);

            metadata.AddField("editorInfo", editorInfo);
            return metadata;
        }

        private static Texture2D DuplicateTexture(Texture2D source)
        {
            RenderTexture renderTex = RenderTexture.GetTemporary(
                        source.width,
                        source.height,
                        0,
                        RenderTextureFormat.Default,
                        RenderTextureReadWrite.Linear);

            Graphics.Blit(source, renderTex);
            RenderTexture previous = RenderTexture.active;
            RenderTexture.active = renderTex;
            Texture2D readableText = new Texture2D(source.width, source.height);
            readableText.ReadPixels(new Rect(0, 0, renderTex.width, renderTex.height), 0, 0);
            readableText.Apply();
            RenderTexture.active = previous;
            RenderTexture.ReleaseTemporary(renderTex);
            return readableText;
        }

        // 这个跟Texture2D.cs里一样，后面DRY掉
        private class TextureImageFile : WXEngineImageFile
        {
            private Texture2D copyTexture;

            public TextureImageFile(Texture2D sourceTexture)
                : base(AssetDatabase.GetAssetPath(sourceTexture.GetInstanceID()))
            {
                copyTexture = DuplicateTexture(sourceTexture);
            }

            public override string GetExportPath()
            {
                if (TextureUtil.ResolveFileExt(copyTexture.format) == TextureUtil.EnumTexFileExt.JPG)
                {
                    return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + ".jpg";
                }
                else
                {
                    return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + ".png";
                }
            }

            protected override byte[] GetContent()
            {

                if (TextureUtil.ResolveFileExt(copyTexture.format) == TextureUtil.EnumTexFileExt.JPG)
                {
                    return copyTexture.EncodeToJPG();
                }
                else
                {
                    return copyTexture.EncodeToPNG();
                }
            }
        }
    }

}