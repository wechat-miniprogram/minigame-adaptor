using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    public class WXTexture : WXResource
    {

        private Texture2D texture2D;
        public WXTexture(Texture2D _texture) : base(AssetDatabase.GetAssetPath(_texture.GetInstanceID()))
        {
            texture2D = _texture;
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                .setResource(this)
                .error(ErrorUtil.ErrorCode.Texture_PathError, "Texture文件的unity路径为空");
            }
        }

        protected override string GetResourceType()
        {
            return "texture2d";
        }

        public override string GetExportPath()
        {
            return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + ".texture2d";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(texture2D.name);
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            JSONObject metadata = JSONObject.Create("{\"data\":{}, \"file\":{}}");
            string texturePath = AddFile(new TextureImageFile(texture2D));
            metadata.GetField("file").AddField("src", texturePath);
            metadata.SetField("data", TextureUtil.getMeta(texture2D));

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
