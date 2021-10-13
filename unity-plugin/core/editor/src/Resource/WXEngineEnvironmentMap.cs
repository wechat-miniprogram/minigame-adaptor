using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEngine;

namespace WeChat
{

    class WXEnvironmentMap : WXResource
    {

        private Cubemap envMap;
        public WXEnvironmentMap(Cubemap _envMap) : base(AssetDatabase.GetAssetPath(_envMap.GetInstanceID()))
        {
            envMap = _envMap;
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                    .setResource(this)
                    .error(ErrorUtil.ErrorCode.EnvironmentMap_PathError, "EnvironmentMap文件的unity路径为空");
            }
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath);
        }

        public override string GetExportPath()
        {
            return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + ".texturecube";
        }

        protected override string GetResourceType()
        {
            return "texturecube";
        }

        private static readonly string[] faceNames = {
            "right",
            "left",
            "top",
            "bottom",
            "back",
            "front"
        };

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            if (string.IsNullOrEmpty(unityAssetPath))
            {
                Debug.LogError("Baked reflection probe null.");
                return null;
            }

            JSONObject jsonFile = new JSONObject(JSONObject.Type.OBJECT);

            jsonFile.AddField("desc", TextureUtil.getMeta(envMap));
            JSONObject m_files = new JSONObject(JSONObject.Type.OBJECT);

            // get file type
            TextureUtil.EnumTexFileExt ext = TextureUtil.ResolveFileExt(envMap.format);

            for (int i = 0; i < 6; i++)
            {
                Texture2D texture2D = DuplicateTexture(envMap, i);
                Texture2D flipV2D = VerticalFlipTexture(texture2D);

                m_files.AddField(
                    faceNames[i],
                    AddFile(
                        new WXCubeMapTextureImage(flipV2D, ext, faceNames[i], unityAssetPath)
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
            return TextureUtil.DuplicateTexture2D(texture2D);
        }

        Texture2D VerticalFlipTexture(Texture2D texture)
        {
            int width = texture.width;
            int height = texture.height;

            Texture2D flipTexture = new Texture2D(width, height);
            for (int i = 0; i < height; i++)
            {
                flipTexture.SetPixels(0, i, width, 1, texture.GetPixels(0, height - i - 1, width, 1));
            }
            flipTexture.Apply();
            return flipTexture;
        }
    }

    public static class ReflectionProbeUtil
    {

        public static List<Cubemap> getEnvironmentMapByScene(string scenePath)
        {
            string sceneName = Path.GetFileNameWithoutExtension(scenePath);
            string sceneDir = Path.GetDirectoryName(scenePath);
            string bakedGIDir = Path.Combine(sceneDir, sceneName);
            List<Cubemap> environmentMaps = new List<Cubemap>();
            if (!Directory.Exists(bakedGIDir))
            {
                Debug.Log("scenePath: " + bakedGIDir);
                return environmentMaps;
            }

            string[] bakedFiles = Directory.GetFiles(bakedGIDir);
            foreach (string file in bakedFiles)
            {
                string name = Path.GetFileNameWithoutExtension(file);

                if (name.StartsWith("ReflectionProbe") && !name.EndsWith(".meta"))
                {
                    Cubemap cubemap = (Cubemap)AssetDatabase.LoadAssetAtPath(file, typeof(Cubemap));
                    if (cubemap)
                    {
                        environmentMaps.Add(cubemap);
                    }
                }
            }
            return environmentMaps;
        }

    }

}