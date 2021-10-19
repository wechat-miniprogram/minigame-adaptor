using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEngine;

namespace WeChat {

    class WXEnvironmentMap : WXResource {

        private Texture2D envMap;
        public WXEnvironmentMap (string textureAssetPath) : base (textureAssetPath) {
            envMap = (Texture2D) AssetDatabase.LoadAssetAtPath(textureAssetPath, typeof(Texture2D));;
            if (unityAssetPath == null || unityAssetPath == "") {
                ErrorUtil.ExportErrorReporter.create ()
                    .setResource (this)
                    .error (ErrorUtil.ErrorCode.EnvironmentMap_PathError, "EnvironmentMap文件的unity路径为空");
            }
        }

        public override string GetHash () {
            return WXUtility.GetMD5FromAssetPath (unityAssetPath);
        }

        public override string GetExportPath () {
            return wxFileUtil.cleanIllegalChar (unityAssetPath.Split ('.') [0], false) + ".texture2d";
        }

        protected override string GetResourceType () {
            return "texture2d";
        }

        protected override JSONObject ExportResource (ExportPreset preset) {
            if (string.IsNullOrEmpty (unityAssetPath)) {
                Debug.LogError ("Baked reflection probe null.");
                return null;
            }
            JSONObject metadata = JSONObject.Create ("{\"data\":{}, \"file\":{}}");
            string texturePath = AddFile (new TextureImageFile (envMap));
            metadata.GetField ("file").AddField ("src", texturePath);
            metadata.SetField ("data", TextureUtil.getMeta (envMap));

            var editorInfo = new JSONObject (JSONObject.Type.OBJECT);
            editorInfo.AddField ("assetVersion", 2);

            metadata.AddField ("editorInfo", editorInfo);
            return metadata;
        }
    }

    public static class ReflectionProbeUtil {

        public static List<Cubemap> getEnvironmentMapByScene (string scenePath) {
            string sceneName = Path.GetFileNameWithoutExtension (scenePath);
            string sceneDir = Path.GetDirectoryName (scenePath);
            string bakedGIDir = Path.Combine (sceneDir, sceneName);
            List<Cubemap> environmentMaps = new List<Cubemap> ();
            if (!Directory.Exists (bakedGIDir)) {
                Debug.Log ("scenePath: " + bakedGIDir);
                return environmentMaps;
            }

            string[] bakedFiles = Directory.GetFiles (bakedGIDir);
            foreach (string file in bakedFiles) {
                string name = Path.GetFileNameWithoutExtension (file);

                if (name.StartsWith ("ReflectionProbe") && !name.EndsWith (".meta")) {
                    Cubemap cubemap = (Cubemap) AssetDatabase.LoadAssetAtPath (file, typeof (Cubemap));
                    if (cubemap) {
                        environmentMaps.Add (cubemap);
                    }
                }
            }
            return environmentMaps;
        }

        public static List<string> getReflectionEquirectangular (string scenePath) {
            List<string> equirectangulars = new List<string> ();
            List<Cubemap> cubemaps = getEnvironmentMapByScene (scenePath);
            CubemapToEquirectangularWizard converter = new CubemapToEquirectangularWizard();
            for (int i = 0; i < cubemaps.Count; i++) {
                equirectangulars.Add(converter.CubeToEquirectangular(cubemaps[i]));
            }
            return equirectangulars;
        }

    }

}