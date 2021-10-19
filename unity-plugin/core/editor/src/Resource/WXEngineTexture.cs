using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat {

    public class TextureImageFile : WXEngineImageFile {
        private Texture2D sourceTexture;

        public TextureImageFile (Texture2D sourceTexture) : base (AssetDatabase.GetAssetPath (sourceTexture.GetInstanceID ())) {
            this.sourceTexture = sourceTexture;
        }

        public override string GetExportPath () {
            if (TextureUtil.ResolveFileExt (sourceTexture.format) == TextureUtil.EnumTexFileExt.JPG) {
                return wxFileUtil.cleanIllegalChar (unityAssetPath.Split ('.') [0], false) + ".jpg";
            } else {
                return wxFileUtil.cleanIllegalChar (unityAssetPath.Split ('.') [0], false) + ".png";
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
                if (TextureUtil.ResolveFileExt (tex.format) == TextureUtil.EnumTexFileExt.JPG) {
                    content = tex.EncodeToJPG ();
                } else {
                    content = tex.EncodeToPNG ();
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