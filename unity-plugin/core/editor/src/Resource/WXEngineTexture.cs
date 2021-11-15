using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using System.IO;

namespace WeChat {

    public static class ExtensionMethod {
        public static Texture2D DeCompress (this Texture2D source) {
            RenderTexture renderTex = RenderTexture.GetTemporary (
                source.width,
                source.height,
                0,
                RenderTextureFormat.Default,
                RenderTextureReadWrite.Linear);

            Graphics.Blit (source, renderTex);
            RenderTexture previous = RenderTexture.active;
            RenderTexture.active = renderTex;
            Texture2D readableText = new Texture2D (source.width, source.height);
            readableText.ReadPixels (new Rect (0, 0, renderTex.width, renderTex.height), 0, 0);
            readableText.Apply ();
            RenderTexture.active = previous;
            RenderTexture.ReleaseTemporary (renderTex);
            return readableText;
        }
    }

    public class TextureImageFile : WXEngineImageFile {
        private Texture2D sourceTexture;

        public TextureImageFile (Texture2D sourceTexture) : base (AssetDatabase.GetAssetPath (sourceTexture.GetInstanceID ())) {
            this.sourceTexture = sourceTexture;
        }

        public override string GetExportPath () {
            return wxFileUtil.cleanIllegalChar (unityAssetPath.Split ('.') [0], false) + "." + GetTextureFormat();
        }

        public string GetTextureFormat () {
            if (Path.GetExtension (this.unityAssetPath) == ".jpg") {
                return "jpg";
            } else {
                return "png";
            }
        }

        public static void DoActionForTexture (ref Texture2D tex, Action<Texture2D> action) {
            TextureImporter im = AssetImporter.GetAtPath (AssetDatabase.GetAssetPath (tex)) as TextureImporter;

            if (!im) {
                action (tex);
                return;
            }

            bool readable = im.isReadable;
            TextureImporterCompression format = im.textureCompression;
            TextureImporterType type = im.textureType;
            bool isConvertedBump = im.convertToNormalmap;

            if (!readable)
                im.isReadable = true;
            if (type != TextureImporterType.Default)
                im.textureType = TextureImporterType.Default;

            im.textureCompression = TextureImporterCompression.Uncompressed;
            im.SaveAndReimport ();

            action (tex);

            if (!readable)
                im.isReadable = false;
            if (type != TextureImporterType.Default)
                im.textureType = type;
            if (isConvertedBump)
                im.convertToNormalmap = true;

            im.textureCompression = format;
            im.SaveAndReimport ();
        }

        protected override byte[] GetContent () {
            byte[] content = { };
            DoActionForTexture (ref this.sourceTexture, tex => {
                Texture2D texTemp = ExtensionMethod.DeCompress (tex);
                // if (TextureUtil.ResolveFileExt (tex.format) == TextureUtil.EnumTexFileExt.JPG) {
                if (this.GetTextureFormat () == "jpg") {
                    content = texTemp.EncodeToJPG ();
                } else {
                    content = texTemp.EncodeToPNG ();
                }
            });
            return content;

        }
    }

    public class WXTexture : WXResource {

        private Texture2D texture2D;
        public WXTexture (Texture2D _texture) : base (AssetDatabase.GetAssetPath (_texture.GetInstanceID ())) {
            texture2D = _texture;
            if (unityAssetPath == null || unityAssetPath == "") {
                ErrorUtil.ExportErrorReporter.create ()
                    .setResource (this)
                    .error (ErrorUtil.ErrorCode.Texture_PathError, "Texture文件的unity路径为空");
            }
        }

        protected override string GetResourceType () {
            return "texture2d";
        }

        public override string GetExportPath () {
            return wxFileUtil.cleanIllegalChar (unityAssetPath.Split ('.') [0], false) + ".texture2d";
        }

        public override string GetHash () {
            return WXUtility.GetMD5FromAssetPath (unityAssetPath) + WXUtility.GetMD5FromString (texture2D.name);
        }

        protected override JSONObject ExportResource (ExportPreset preset) {
            JSONObject metadata = JSONObject.Create ("{\"data\":{}, \"file\":{}}");
            string texturePath = AddFile (new TextureImageFile (texture2D));
            metadata.GetField ("file").AddField ("src", texturePath);
            metadata.SetField ("data", TextureUtil.getMeta (texture2D));

            var editorInfo = new JSONObject (JSONObject.Type.OBJECT);
            editorInfo.AddField ("assetVersion", 2);

            metadata.AddField ("editorInfo", editorInfo);
            return metadata;
        }
    }
}