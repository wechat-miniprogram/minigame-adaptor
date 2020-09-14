using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WeChat
{
    public static class ScriptExportHelper {

        static readonly string gameConfigHeader = "module.exports = {{\r\n{0}\r\n}}";
        static readonly string pluginConfigBody = "    pluginConfig: {{\r\n{0}\r\n    }}";
        static readonly string sceneConfigBody = "    sceneConfig: {{\r\n{0}\r\n    }}";

        static readonly string i2nHeader = "        index2NameMap: {{\r\n{0}\r\n        }}";
        static readonly string n2pHeader = "        name2PathMap: {{\r\n{0}\r\n        }}";

        static readonly string sceneConfigTemplateString = "                \"{0}\": \"{1}\"{2}";
        

        
        // [MenuItem("WeChat/Utility/Show Game Export Config")]
        public static void ShowExportGameConfig() {
            Debug.Log(ExportGameConfig());
        }

        public static string ExportGameConfig() {
            var pluginConfig = string.Format(pluginConfigBody, ExportWXPluginConfig());
            var sceneConfig = string.Format(sceneConfigBody, ExportSceneConfig());
            var configs = pluginConfig + ",\r\n" + sceneConfig;
            
            return string.Format(gameConfigHeader, configs);
        }

        private static string ExportSceneConfig() {
            var scenes = UnityEditor.EditorBuildSettings.scenes;
            var i2n = "";
            var n2p = "";
            for(int i = 0; i < scenes.Length; i++) {
                if (scenes[i].path.Length <= 0) continue;

                string name = scenes[i].path.Substring(scenes[i].path.LastIndexOf('/') + 1);
                name = name.Substring(0, name.Length - 6);
                var _i2n = string.Format(sceneConfigTemplateString, i, name, i != scenes.Length - 1 ? ", \r\n" : "");
                var _n2p = string.Format(sceneConfigTemplateString, name, scenes[i].path.ReplaceUnityByScene(), i != scenes.Length - 1 ? ", \r\n" : "");
                i2n += _i2n;
                n2p += _n2p;
            }
            // Debug.Log(i2n);
            // Debug.Log(n2p);
            return string.Format(i2nHeader, i2n) + ",\r\n" + string.Format(n2pHeader, n2p);
        }

        private static string ReplaceUnityByScene(this string s) {
            return s.Substring(0, s.Length - 6) + ".scene";
        }

        private static string ExportWXPluginConfig() {
            var pluginConfig = string.Format("        useMiniGameAdaptorPlugin: {0},\r\n        useMiniGameAdaptorJs: {1},\r\n        pluginAlias: \"WXBridge\"", WXBridge.isWXBridgePlugin.ToString().ToLower(), WXBridge.isWXBridgePluginAdaptor.ToString().ToLower());
            return pluginConfig;
        }

        // public static JSONObject ExportSceneJson() {
        //     var json = new JSONObject(JSONObject.Type.OBJECT);
        //     var index2NameMap = new JSONObject(JSONObject.Type.OBJECT);
        //     var name2PathMap = new JSONObject(JSONObject.Type.OBJECT);
        //     json.AddField("index2NameMap", index2NameMap);
        //     json.AddField("name2PathMap", name2PathMap);

        //     var scenes = UnityEditor.EditorBuildSettings.scenes;
        //     for(int i = 0; i < scenes.Length; i++) {
        //         if (scenes[i].path.Length <= 0) continue;

        //         string name = scenes[i].path.Substring(scenes[i].path.LastIndexOf('/') + 1);
        //         name = name.Substring(0, name.Length - 6);
        //         index2NameMap.AddField(i.ToString(), name);
        //         name2PathMap.AddField(name, scenes[i].path.ReplaceUnityByScene());
        //     }

        //     return json;
        // }



    }
}