using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using WeChat;
using System;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{
    [InitializeOnLoad]
    [DeclarePreset("plugins-script", typeof(UnityPluginConfig))]
    public class PluginScriptExportPreset : ExportPreset
    {
        static PluginScriptExportPreset()
        {
            ExportPreset.registerExportPreset("plugins-script", new PluginScriptExportPreset());
        }

        public PluginScriptExportPreset() : base()
        {
        }

        public override string GetChineseName()
        {
            return "导出插件脚本";
        }
        protected override void DoExport()
        {
            EditorUtility.DisplayProgressBar("导出插件脚本", "", 0.0f);
            var plugins = ConfigManager.configEntry.unityPluginConfig.unityPlugins;
            List<string> allRecursiveAssets = new List<string>();

            int i = 0;
            int len = plugins.Count;
            try {
                plugins
                    .Where(p => p.enable).ToList()
                    .ForEach(plugin => {
                        EditorUtility.DisplayProgressBar("处理插件", "", (float)i / len);
                        DirectoryInfo jsDir = null;
                        string pluginName = plugin.pluginName;
                        if (plugin.pluginState == UnityPlugin.PluginState.convert && plugin.convertedPath.convertedJSPath != null && plugin.convertedPath.convertedJSPath != "") {
                            jsDir = new DirectoryInfo(plugin.convertedPath.convertedJSPath);
                        } else if (plugin.pluginState == UnityPlugin.PluginState.stub && plugin.stubPath.stubJSPath != null && plugin.stubPath.stubJSPath != ""){
                            jsDir = new DirectoryInfo(plugin.stubPath.stubJSPath);
                            pluginName += "-stub";
                        }

                        // 有文件就直接打包，没文件就转换
                        if (jsDir == null || !jsDir.Exists || jsDir.GetFiles() == null || jsDir.GetFiles().Length == 0) {
                            BridgeExport.ExportPluginMenu(plugin);
                        }
                        PackFiles(pluginName, jsDir.FullName);
                        i++;
                });
            } catch(Exception e) { 
                throw e;
            } finally {
                EditorUtility.ClearProgressBar();
            }
            
            Debug.Log("导出插件代码： " + i);
        }

        private void PackFiles(string pkgName, string dirPath) {
            if (!Directory.Exists(dirPath)) {
                return;
            }
            EditorUtility.DisplayProgressBar("插件代码打包", "", 0.0f);

            var files = Directory.EnumerateFiles(dirPath, "*.js", SearchOption.AllDirectories).ToList();
            List<string> allRecursiveAssets = new List<string>();

            // all converted scripts
            var t = 0;
            foreach (var file in files)
            {
                // bridge plugin blacklist
                var name = Path.GetFileName(file);
                // Debug.Log(name);
                // 插件代码不打包这几个文件
                if (name.Equals("minigame-adaptor-lib.js")      ||
                    name.Equals("minigame-adaptor-lib.meta.js") ||
                    name.Equals("minigame-adaptor-lib-patch.js"))
                {
                    continue;
                }
                JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
                var cutIndex = Path.GetFullPath(file).IndexOf(dirPath) + dirPath.Length + 1; //      +1 : '/'
                string path = Path.GetFullPath(file).Substring(cutIndex).Replace('\\', '/');

                string content = File.ReadAllText(file);
                ExportStore.AddTextFile(path, content, WXUtility.GetMD5FromString(content));
                List<string> useFile = new List<string>();
                useFile.Add(path);
                ExportStore.AddResource(path, "script", null, useFile);
                allRecursiveAssets.Add(path);

                EditorUtility.DisplayProgressBar("插件代码打包", "", t++ / files.Count);
                
            }

            ExportStore.GenerateResourcePackage(
                pkgName,
                allRecursiveAssets
            );
        }

        public override bool WillPresetShow()
        {
            return true;
        }

    }
}

