using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{

    public class WXMaterial : WXResource
    {
        private static Dictionary<string, string> buildInEffectNameToUUIDMap = new Dictionary<string, string>(){
            {"@system/blinnPhong3d", "c7fb21R-abb109E-a8e91bS-54b4baR"},
            {"@system/blinnPhongNew", "c7fb21R-abb109E-a8e91bS-54b4baR"},
            {"@system/standardLit", "65a8a7R-238beeE-76ecf2S-c46e83R"},
            {"@system/blit", "998444R-4e8cd1E-52b60bS-d1c239R"},
            {"@system/bloom", "405eabR-ca288aE-5bf4f3S-3b3bd3R"},
            {"@system/effect3d", "f75b6eR-26db4aE-74d251S-b121f3R"},
            {"@system/line", "f75b6eR-26db4aE-74d251S-b121f3R"},
            {"@system/trail", "f75b6eR-26db4aE-74d251S-b121f3R"},
            {"@system/particle3d", "f75b6eR-26db4aE-74d251S-b121f3R"},
            {"@system/fxaa", "a89e58R-501dacE-58eef3S-f88a8dR"},
            {"@system/grayScale2d", "df6f5aR-6fbfeaE-0bfd4dS-2c1c6cR"},
            {"@system/hdr", "e2931cR-e5d63dE-13ccc4S-7a797dR"},
            {"@system/image2d", "769610R-923901E-302c63S-76c641R"},
            {"@system/mask2d", "ec27ccR-ba688fE-364978S-923276R"},
            {"@system/shadowCasterFallBack", "a015d5R-d0771eE-be912dS-f16081R"},
            {"@system/simple3d", "d08196R-9a6914E-21f968S-ef5e28R"},
            {"@system/text2d", "822a17R-a8d0cfE-45d126S-6f7b6bR"},
			{"@system/skybox", "2c795aR-a40aecE-8c06a8S-993847R"}
        };
        protected override string GetResourceType()
        {
            return "material";
        }

        private Material material;
        private Component component;
        private JSONObject definition;

        private static Dictionary<string, WXMaterialParser> parsers = new Dictionary<string, WXMaterialParser>();
        public WXMaterial(Material _material, Component component) : base(AssetDatabase.GetAssetPath(_material.GetInstanceID()))
        {
            this.material = _material;
            this.component = component;
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                    .setResource(this)
                    .setGameObject(component.gameObject)
                    .error(ErrorUtil.ErrorCode.Material_PathError, "Material文件的unity路径为空");
            }
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(material.name);
        }

        public override string GetExportPath()
        {
            string path = unityAssetPath;
            string etcName = Path.GetExtension(path);
            if (etcName != ".mat")
            {
                path = path + ".mat";
            }

            path = wxFileUtil.cleanIllegalChar(path, false);

            return path;
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            if (material == null)
            {
                return null;
            }
            string name = material.shader.name;
            JSONObject jsonFile = new JSONObject(JSONObject.Type.OBJECT);

            WXMaterialParser parser;
            string parserName = name;
            if (name == "Skybox/6 Sided" || name == "Skybox/Cubemap")
            {
                parserName = "Skybox";
            }
            HierarchyExportConfig exportConfigs = preset.exportConfigs as HierarchyExportConfig;
            if (!parsers.ContainsKey(name) && exportConfigs.createEffectTemplate)
            {
                parserName = "CustomShader";
            }
            if (parsers.TryGetValue(parserName, out parser))
            {
                jsonFile = parser.parse(this, AddDependencies);
            }
            else if (component != null)
            {
                ErrorUtil.ExportErrorReporter.create()
                    .setResource(this)
                    .setGameObject(component.gameObject)
                    .error(ErrorUtil.ErrorCode.Material_UnsupportedShader, "遇到了不支持的Shader： " + name);
            }

            string effectName = jsonFile.GetField("effect").GetRawString();
            string effectUUID;
            if (buildInEffectNameToUUIDMap.TryGetValue(effectName, out effectUUID))
            {
                jsonFile.SetField("effect", effectUUID);
            }

            JSONObject editorInfo = new JSONObject(JSONObject.Type.OBJECT);
            editorInfo.AddField("assetVersion", 3);
            jsonFile.AddField("editorInfo", editorInfo);

            return jsonFile;
        }

        public static void registerParser(string name, WXMaterialParser parser)
        {
            parsers.Add(name, parser);
        }
        public Component GetComponent()
        {
            return this.component;
        }

        public Material GetMaterial()
        {
            return this.material;
        }

        public static bool IsMaterialRegistered(Material mat)
        {
            return WXMaterial.parsers.ContainsKey(mat.shader.name);
        }
    }
}