using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat {

    public class WXMaterial : WXResource {
        protected override string GetResourceType () {
            return "material";
        }

        private Material material;
        private Component component;
        private JSONObject definition;
        private string unityAssetPath;

        private static Dictionary<string, WXMaterialParser> parsers = new Dictionary<string, WXMaterialParser> ();
        public WXMaterial (Material _material, Component component) {
            this.material = _material;
            this.component = component;
            unityAssetPath = AssetDatabase.GetAssetPath (material.GetInstanceID ());
            if (unityAssetPath == "")
            {
                throw new Exception("转化Material '" + material.name + "'失败：无法获取该资源的路径。请确认它是AssetDatabase里的资源。");
            }
        }

        public override string GetHash () {
            return WXUtility.GetMD5FromAssetPath (unityAssetPath);
        }

        public override string GetExportPath () {
            string path = unityAssetPath;
            string etcName = Path.GetExtension (path);
            if (etcName != ".mat") {
                path = path + ".mat";
            }

            path = wxFileUtil.cleanIllegalChar (path, false);

            return path;
        }

        protected override JSONObject ExportResource (ExportPreset preset) {
            if (material == null) {
                return null;
            }
            string name = material.shader.name;
            JSONObject jsonFile = new JSONObject (JSONObject.Type.OBJECT);

            WXMaterialParser parser;
            string parserName = name;
            if (name == "Skybox/6 Sided" || name == "Skybox/Cubemap") {
                parserName = "Skybox";
            }
            HierarchyExportConfig exportConfigs = preset.exportConfigs as HierarchyExportConfig;
            if (!parsers.ContainsKey (name)&& exportConfigs.createEffectTemplate) {
                parserName = "CustomShader";
            }
            if (parsers.TryGetValue (parserName, out parser)) {
                jsonFile = parser.parse (this, AddDependencies);
            } else if (component != null) {
                Debug.LogErrorFormat ("WXBeefBallMaterial: Unsupported Shader {0} in {1}, which {2} is using!", name, unityAssetPath, component.name);
            }

            JSONObject editorInfo = new JSONObject(JSONObject.Type.OBJECT);
            editorInfo.AddField("assetVersion", 2);
            jsonFile.AddField("editorInfo", editorInfo);

            return jsonFile;
        }

        public static void registerParser (string name, WXMaterialParser parser) {
            parsers.Add (name, parser);
        }
        public Component GetComponent () {
            return this.component;
        }

        public Material GetMaterial () {
            return this.material;
        }

        public static bool IsMaterialRegistered (Material mat) {
            return WXMaterial.parsers.ContainsKey (mat.shader.name);
        }
    }
}