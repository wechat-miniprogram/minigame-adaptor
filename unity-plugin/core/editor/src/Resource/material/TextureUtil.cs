using UnityEditor;
using UnityEngine;

namespace WeChat {
    public static class TextureUtil {

        public enum EnumTexFileExt {
            JPG = 1,
            PNG = 2
        }
        public static JSONObject getMeta (Texture tex) {
            var res = new JSONObject (JSONObject.Type.OBJECT);
            res.AddField ("width", tex.width);
            res.AddField ("height", tex.height);
            if (tex is Texture2D) {
                res.AddField ("mipmap", ((Texture2D) tex).mipmapCount);
            } else if (tex is Cubemap) {
                res.AddField ("mipmap", ((Cubemap) tex).mipmapCount);
            } else {
                res.AddField ("mipmap", 1);
            }
            bool m_useMipmap = false;
            bool m_sRGB = false;
            if (tex is Texture2D) {
                AssetImporter importer = TextureImporter.GetAtPath(AssetDatabase.GetAssetPath(tex.GetInstanceID()));
                if (importer is TextureImporter || importer == null)
                {
                    TextureImporter textureImporter = (TextureImporter)importer;
                    m_useMipmap = importer == null ? false : textureImporter.mipmapEnabled;
                    m_sRGB = importer == null ? false : textureImporter.sRGBTexture;
                }
                else 
                {
                    ErrorUtil.ExportErrorReporter.create()
                        .error(ErrorUtil.ErrorCode.Texture_TypeUnsupported, "遇到了不支持的纹理类型:" + AssetDatabase.GetAssetPath(tex.GetInstanceID()));
                }
            }
            res.AddField ("useMipmap", m_useMipmap);
            res.AddField ("sRGB", m_sRGB);
            res.AddField ("needPremultiplyAlpha", false);
#if UNITY_2017_1_OR_NEWER
            res.AddField ("wrapU", ResolveTextureWrapMode (tex.wrapModeU));
            res.AddField ("wrapV", ResolveTextureWrapMode (tex.wrapModeV));
#else
            res.AddField ("wrapU", ResolveTextureWrapMode (tex.wrapMode));
            res.AddField ("wrapV", ResolveTextureWrapMode (tex.wrapMode));
#endif

            FilterMode minF = tex.filterMode;
            if (minF == FilterMode.Bilinear) {
                res.AddField ("filterMode", 1);
            }
            if (minF == FilterMode.Point) {
                res.AddField ("filterMode", 0);
            }
            if (minF == FilterMode.Trilinear) {
                if (m_useMipmap) {
                    res.AddField ("filterMode", 2);
                } else {
                    res.AddField ("filterMode", 0);
                }
            }
            res.AddField ("anisoLevel", tex.anisoLevel);
            var sformat = ResolveTexturePixelFormat (GetTextureFormat (tex));
            res.AddField ("pixelFormat", sformat);

            return res;
        }

        public static EnumTexFileExt ResolveFileExt (TextureFormat format) {
            switch (format) {
                case TextureFormat.ASTC_RGB_10x10:
                case TextureFormat.ASTC_RGB_12x12:
                case TextureFormat.ASTC_RGB_4x4:
                case TextureFormat.ASTC_RGB_5x5:
                case TextureFormat.ASTC_RGB_6x6:
                case TextureFormat.ASTC_RGB_8x8:
                case TextureFormat.ETC2_RGB:
                case TextureFormat.ETC_RGB4:
#if UNITY_2017_1_OR_NEWER
                case TextureFormat.ETC_RGB4Crunched:
                case TextureFormat.RGB9e5Float:
#endif
                case TextureFormat.ETC_RGB4_3DS:
                case TextureFormat.PVRTC_RGB2:
                case TextureFormat.PVRTC_RGB4:
                case TextureFormat.RGB24:
                case TextureFormat.RGB565:
                    return EnumTexFileExt.JPG;
                default:
                    return EnumTexFileExt.PNG;
            }
        }

        public static TextureFormat GetTextureFormat (Texture tex) {
            if (tex is Texture2D) {
                return ((Texture2D) tex).format;
            } else if (tex is Cubemap) {
                return ((Cubemap) tex).format;
            }
            return TextureFormat.RGBA32;
        }

        public static int ResolveTextureWrapMode (TextureWrapMode mode) {
            switch (mode) {
                case TextureWrapMode.Repeat:
                    return 1;
                case TextureWrapMode.Clamp:
                    return 2;
#if UNITY_2017_1_OR_NEWER
                case TextureWrapMode.Mirror:
                    return 3;
                default:
                    return 3;
#else
                default:
                    return 2;
#endif
            }
        }

        public static int ResolveTexturePixelFormat (TextureFormat format) {
            // 保留了原来判断PixelFormat的逻辑，统一输出RGBA8
            return 2;
            switch (format) {
                case TextureFormat.Alpha8:
                case TextureFormat.ARGB4444:
                case TextureFormat.RGB24:
                case TextureFormat.RGBA32:
                case TextureFormat.ARGB32:
                case TextureFormat.RGB565:
                case TextureFormat.R16:
                    return 0;
                case TextureFormat.DXT1:
                    return 13;
                case TextureFormat.DXT5:
                    return 15;
                case TextureFormat.RGBA4444:
                case TextureFormat.BGRA32:
                case TextureFormat.RHalf:
                case TextureFormat.RGHalf:
                case TextureFormat.RGBAHalf:
                case TextureFormat.RFloat:
                case TextureFormat.RGFloat:
                case TextureFormat.RGBAFloat:
                case TextureFormat.YUY2:
#if UNITY_2017_1_OR_NEWER
                case TextureFormat.RGB9e5Float:
#endif
                case TextureFormat.BC4:
                case TextureFormat.BC5:
                case TextureFormat.BC6H:
                case TextureFormat.BC7:
                case TextureFormat.DXT1Crunched:
                case TextureFormat.DXT5Crunched:
                case TextureFormat.PVRTC_RGB2:
                case TextureFormat.PVRTC_RGBA2:
                case TextureFormat.PVRTC_RGB4:
                case TextureFormat.PVRTC_RGBA4:
                case TextureFormat.ETC_RGB4:
                case TextureFormat.EAC_R:
                case TextureFormat.EAC_R_SIGNED:
                case TextureFormat.EAC_RG:
                case TextureFormat.EAC_RG_SIGNED:
                case TextureFormat.ETC2_RGB:
                case TextureFormat.ETC2_RGBA1:
                    return 0;
                case TextureFormat.ETC2_RGBA8:
                    return 2;
                case TextureFormat.ASTC_RGB_4x4:
                case TextureFormat.ASTC_RGB_5x5:
                case TextureFormat.ASTC_RGB_6x6:
                case TextureFormat.ASTC_RGB_8x8:
                case TextureFormat.ASTC_RGB_10x10:
                case TextureFormat.ASTC_RGB_12x12:
                case TextureFormat.ASTC_RGBA_4x4:
                case TextureFormat.ASTC_RGBA_5x5:
                case TextureFormat.ASTC_RGBA_6x6:
                case TextureFormat.ASTC_RGBA_8x8:
                case TextureFormat.ASTC_RGBA_10x10:
                case TextureFormat.ASTC_RGBA_12x12:
                case TextureFormat.ETC_RGB4_3DS:
                case TextureFormat.ETC_RGBA8_3DS:
#if UNITY_2017_1_OR_NEWER
                case TextureFormat.RG16:
                case TextureFormat.R8:
                case TextureFormat.ETC_RGB4Crunched:
                case TextureFormat.ETC2_RGBA8Crunched:
#endif
                    return 0;
                default:
                    return 0;
            }
        }

        public static Texture2D DuplicateTexture2D (Texture2D source, bool autoRect = true, int x = 0, int y = 0, int w = 0, int h = 0) {
            RenderTexture renderTex = RenderTexture.GetTemporary (
                source.width,
                source.height,
                0,
                RenderTextureFormat.Default,
                RenderTextureReadWrite.Linear);

            Graphics.Blit (source, renderTex);
            RenderTexture previous = RenderTexture.active;
            RenderTexture.active = renderTex;

            if (autoRect) {
                x = 0;
                y = 0;
                w = source.width;
                h = source.height;
            }

            Rect sourceRect = new Rect (x, y, w, h);

            Texture2D readableText = new Texture2D ((int) sourceRect.width, (int) sourceRect.height);
            // readableText.ReadPixels (new Rect (0, 0, renderTex.width, renderTex.height), 0, 0);
            readableText.ReadPixels (sourceRect, 0, 0);
            readableText.Apply ();
            RenderTexture.active = previous;
            RenderTexture.ReleaseTemporary (renderTex);
            return readableText;
        }
    }
}