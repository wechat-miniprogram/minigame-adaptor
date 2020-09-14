using UnityEngine;
using UnityEditor;
using System.IO;
using System;
using WeChat;

namespace WeChat
{

    public class WXEngineScript : WXResource
    {
        MonoScript script;
        public WXEngineScript(MonoScript script)
        {
            this.script = script;
        }

        protected override string GetResourceType()
        {
            return "script";
        }

        public override string GetExportPath()
        {
            var scriptPath = Path.Combine("bindings", WXMonoBehaviourExportHelper.GetValidTypeNameUnescapeNamespace(script.GetClass()) + ".binding.js");
            //            scriptPath = Path.ChangeExtension(scriptPath, ".binding.js");

            var path = scriptPath.Replace('\\', '/'); // Path.Combine("Assets/", scriptPath);
            return path;
        }

        public override string GetHash()
        {
            string convertedBridgeScriptPath = Path.Combine(BridgeExport.TMP_BINDING_CACHE, GetExportPath());
            return "" + WXUtility.GetMD5FromString(convertedBridgeScriptPath) + File.GetLastWriteTime(convertedBridgeScriptPath).Ticks;
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            var realPath = Path.Combine(BridgeExport.TMP_BINDING_CACHE, GetExportPath());

            if (ExportLogger.LOGGING)
                ExportLogger.AddLog(new ExportLogger.Log(ExportLogger.Log.Type.System, "File: " + realPath + " Exists: " + File.Exists(realPath)));

            AddFile(new WXScriptFile(realPath, GetExportPath()));

            dontExportDescriptionJSON = true;
            return null;
        }

        class WXScriptFile : WXEngineTextFile
        {
            private string exportJSPath;
            public WXScriptFile(string unityAssetPath, string exportJSPath) : base(unityAssetPath)
            {
                this.exportJSPath = exportJSPath;
            }

            protected override string GetContent()
            {
                if (File.Exists(unityAssetPath)) {
                    return File.ReadAllText(unityAssetPath);
                }

                var cachePath = Path.Combine(BridgeExport.TMP_BINDING_CACHE, Path.GetFileName(unityAssetPath));
                // Debug.Log(cachePath);
                if (Directory.Exists(BridgeExport.TMP_BINDING_CACHE) && File.Exists(cachePath)) {
                    return File.ReadAllText(cachePath);
                }

                return "throw new Error('converted script not found');";
            }

            public override string GetExportPath()
            {
                return this.exportJSPath;
            }
        }
    }
}
