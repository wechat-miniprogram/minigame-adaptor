using UnityEditor;
using UnityEngine;
namespace WeChat {
    internal abstract class WXEngineImageFile : WXAssetFile {
        public WXEngineImageFile (string unityAssetPath) : base (unityAssetPath) { }

        protected override bool DoExport () {
            ExportStore.AddImageFile (
                GetExportPath (),
                GetContent (),
                GetHash ()
            );

            return true;
        }

        protected abstract byte[] GetContent ();
    }

    // 被cubemap所使用的图片文件
    internal class WXCubeMapTextureImage : WXEngineImageFile {
        private TextureUtil.EnumTexFileExt ext;
        private Texture2D texture;
        private string faceName;

        public WXCubeMapTextureImage (
            Texture2D texture,
            TextureUtil.EnumTexFileExt ext,
            string faceName,
            string texturePath
        ) : base (texturePath) {
            this.ext = ext;
            this.texture = texture;
            this.faceName = faceName;
        }

        protected override byte[] GetContent () {
            switch (ext) {
                case TextureUtil.EnumTexFileExt.JPG:
                    return texture.EncodeToJPG ();
                case TextureUtil.EnumTexFileExt.PNG:
                    return texture.EncodeToPNG ();
                default:
                    return null;
            }
        }

        public override string GetExportPath () {
            switch (ext) {
                case TextureUtil.EnumTexFileExt.JPG:
                    return wxFileUtil.cleanIllegalChar (unityAssetPath.Split ('.') [0], false) + '.' + faceName + ".jpg";
                case TextureUtil.EnumTexFileExt.PNG:
                    return wxFileUtil.cleanIllegalChar (unityAssetPath.Split ('.') [0], false) + '.' + faceName + ".png";
                default:
                    return "";
            }
        }
    }
}