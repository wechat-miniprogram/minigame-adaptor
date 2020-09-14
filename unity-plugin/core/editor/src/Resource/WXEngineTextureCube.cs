using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    class WXTextureCube : WXResource
    {
        private Cubemap _cubemap;
        private string path;

        public WXTextureCube(Cubemap cubemap)
        {
            _cubemap = (Cubemap)cubemap;
            path = AssetDatabase.GetAssetPath(cubemap.GetInstanceID());
        }

        private static readonly string[] faceNames =
        {
            "right", "left",
            "top", "bottom",
            "front", "back"
        };

        public override string GetExportPath()
        {
            return wxFileUtil.cleanIllegalChar(path.Split('.')[0], false) + ".texturecube";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(path);
        }

        protected override string GetResourceType()
        {
            return "texturecube";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            Cubemap cubemap = _cubemap;

            JSONObject jsonFile = new JSONObject(JSONObject.Type.OBJECT);

            jsonFile.AddField("desc", TextureUtil.getMeta(cubemap));

            JSONObject m_files = new JSONObject(JSONObject.Type.OBJECT);
            TextureUtil.EnumTexFileExt ext = TextureUtil.ResolveFileExt(cubemap.format);

             for (int i = 0; i < 6; i++)
            {
                Texture2D texture2D = DuplicateTexture(cubemap, i);
                /*
               this behavior is by design: if we speak about cubemaps they are intended to be sampled for reflection, 
               i.e. with reflection vector, which means that we "want" image to be flipped both vert/horz 
                and this is exactly what cubemap inspector does with images you assign to slots. 
               When you copy textures you will get "mirrored" reflection (and you can see this in the preview too)
               */
                if (faceNames[i] != "top" && faceNames[i] != "bottom")
                {
                    Color[] colors = texture2D.GetPixels(0, 0, texture2D.width, texture2D.height);
                    System.Array.Reverse(colors, 0, colors.Length);
                    Texture2D t = new Texture2D(texture2D.width, texture2D.height, texture2D.format, true);
                    //Debug.Log("Pixel size:" + capx + " " + capy + " " + capwidth + " " + capheight);
                    //t.ReadPixels(new Rect(capx, capy, capwidth, capheight), 0, 0, false);
                    t.SetPixels(colors);
                    t.Apply();
                    texture2D = t;
                }

                m_files.AddField(
                    faceNames[i],
                    AddFile(
                        new WXCubeMapTextureImage(texture2D, ext, faceNames[i], path)
                    )
                );
            }
			
			
            jsonFile.AddField("files", m_files);

            jsonFile.AddField("version", 2);
            return jsonFile;
        }

        private static Texture2D DuplicateTexture(Cubemap source, int face)
        {
            Texture2D texture2D = new Texture2D(source.width, source.height, source.format, false);
            Graphics.CopyTexture(source, face, 0, texture2D, 0, 0);
            return texture2D;
        }




        // 被cubemap所使用的图片文件
        private class WXCubeMapTextureImage : WXEngineImageFile
        {
            private TextureUtil.EnumTexFileExt ext;
            private Texture2D texture;
            private string faceName;

            public WXCubeMapTextureImage(
                Texture2D texture,
                TextureUtil.EnumTexFileExt ext,
                string faceName,
                string texturePath
            ) : base(texturePath)
            {
                this.ext = ext;
                this.texture = texture;
                this.faceName = faceName;
            }

            protected override byte[] GetContent()
            {
                switch (ext)
                {
                    case TextureUtil.EnumTexFileExt.JPG:
                        return texture.EncodeToJPG();
                    case TextureUtil.EnumTexFileExt.PNG:
                        return texture.EncodeToPNG();
                    default:
                        return null;
                }
            }

            public override string GetExportPath()
            {
                switch (ext)
                {
                    case TextureUtil.EnumTexFileExt.JPG:
                        return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + '.' + faceName + ".jpg";
                    case TextureUtil.EnumTexFileExt.PNG:
                        return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + '.' + faceName + ".png";
                    default:
                        return "";
                }
            }
        }
    }
}
