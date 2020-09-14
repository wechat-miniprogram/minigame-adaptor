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
    [DeclarePreset("project-script", typeof(ProjectExportConfig))]
    public class ProjectScriptExportPreset : ExportPreset
    {
        static ProjectScriptExportPreset()
        {
            ExportPreset.registerExportPreset("project-script", new ProjectScriptExportPreset());
        }

        public ProjectScriptExportPreset() : base()
        {
        }

        public override string GetChineseName()
        {
            return "导出工程脚本";
        }

        protected override void DoExport()
        {
            var build = DirectoryBuilder.GetDirectory("build");
            // check cache
            var projectDir = new DirectoryInfo(build["Project"].FullPath);
            // Debug.Log(projectDir.GetFiles().Length);
            if (!projectDir.Exists || projectDir.GetFiles() == null || projectDir.GetFiles().Length <= 1)
            {
                BridgeExport.ExportCodeMenu();
            }

            // convert
            // BridgeExport.ExportCode();

            // EditorUtility.ClearProgressBar();
            // BridgeExport.isProcessing = false;
            EditorUtility.DisplayProgressBar("代码导出", "", 0.0f);

            var dirPath = BridgeExport.PROJECT_CODE_PATH;
            var files = Directory.EnumerateFiles(dirPath, "*.js", SearchOption.AllDirectories).ToList();

            List<string> allRecursiveAssets = new List<string>();

            // all converted scripts
            var t = 0;
            foreach (var file in files)
            {
                // bridge plugin blacklist
                var name = Path.GetFileName(file);
                // Debug.Log(name);
                // 使用引擎插件不打包这几个文件，以节省代码包体积
                if (WXBridge.isWXBridgePlugin && (
                        name.Equals("minigame-adaptor-lib.js") ||
                        name.Equals("minigame-adaptor-lib.meta.js") ||
                        name.Equals("minigame-adaptor-lib-patch.js")))
                {
                    continue;
                }
                JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
                metadata.AddField("version", 1);
                // string path = Path.GetFullPath(file).Replace(Path.Combine(Application.dataPath.Replace("Assets", ""), "__tmp_dist_script~"), "Assets");
                var cutIndex = Path.GetFullPath(file).IndexOf(dirPath) + dirPath.Length + 1; //      +1 : '/'
                string path = Path.GetFullPath(file).Substring(cutIndex).Replace('\\', '/');
                // Debug.Log(path);
                // Debug.Log(file + "===" + path);
                // Debug.Log(path);

                string content = File.ReadAllText(file);
                ExportStore.AddTextFile(path, content, WXUtility.GetMD5FromString(content));
                List<string> useFile = new List<string>();
                useFile.Add(path);
                ExportStore.AddResource(path, "script", null, useFile);
                allRecursiveAssets.Add(path);

                EditorUtility.DisplayProgressBar("代码导出", "", t++ / files.Count);
            }

            // var libs = Directory.EnumerateFiles(Path.Combine(bridgeRootPath, "lib"), "*.lib");
            var libs = Directory.EnumerateFiles(DirectoryBuilder.GetDirectory("references")["Adaptor"].FullPath, "*.lib");
            // Debug.Log(libs);
            foreach (var lib in libs)
            {
                var name = Path.GetFileName(lib);
                //  Debug.Log(name);

                // bridge plugin blacklist
                // 使用引擎插件的情况
                if (WXBridge.isWXBridgePlugin)
                {
                    // 如果使用了插件但是要用自己的adaptor.js,这个文件也要打包
                    if (!WXBridge.isWXBridgePluginAdaptor)
                    {
                        if (!name.Equals("minigame-adaptor-util.js.lib") && !name.Equals("minigame-adaptor-config.js.lib") && !name.Equals("minigame-adaptor.js.lib"))
                        {
                            continue;
                        }
                    }
                    else
                    {
                        if (!name.Equals("minigame-adaptor-util.js.lib") && !name.Equals("minigame-adaptor-config.js.lib"))
                        {
                            continue;
                        }
                    }
                }

                JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
                metadata.AddField("version", 1);
                string path = name.Substring(0, name.Length - 4);

                // 配置文件内容根据插件的配置来生成
                if (name.Equals("minigame-adaptor-config.js.lib"))
                {
                    // var content = String.Format("module.exports = {{\r\n    userMiniGameAdaptorPlugin:{0},\r\n    userMiniGameAdaptorJs:{1},\r\n    pluginAlias:'WXBridge'\r\n}}", WXBridge.isWXBridgePlugin ? 1 : 0, WXBridge.isWXBridgePluginAdaptor ? 1 : 0);
                    var content = ScriptExportHelper.ExportGameConfig();
                    ExportStore.AddTextFile(path, content, WXUtility.GetMD5FromString(content));
                }
                else
                {
                    string content = File.ReadAllText(lib);
                    ExportStore.AddTextFile(path, content, WXUtility.GetMD5FromString(content));
                }


                List<string> useFile = new List<string>();
                useFile.Add(path);
                ExportStore.AddResource(path, "script", null, useFile);
                allRecursiveAssets.Add(path);
            }

            // game config js
            // {
            //     JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
            //     metadata.AddField("version", 1);
            //     string path = "Assets/bridge_game_config.js";

            //     JSONObject content = ScriptExportHelper.ExportSceneJson();
            //     WXExportStore.AddJSONFile(path, content, WXUtility.GetMD5FromString(content.ToString()));
            //     List<string> useFile = new List<string>();
            //     useFile.Add(path);
            //     WXExportStore.AddResource(path, "script", null, useFile);
            //     allRecursiveAssets.Add(path);
            // }

            //string savePath = Path.Combine(SAVE_BASE_PATH, "Scripts.mgepackage/");
            //JSONObject manifestRoot = new JSONObject(JSONObject.Type.OBJECT);
            //manifestRoot.AddField("resourceMeta", exportContext.writeResourcesTo(savePath, allRecursiveAssets));
            //wxFileUtil.SaveJsonFile(manifestRoot, savePath + "group.manifest.json");



            ExportStore.GenerateResourcePackage(
                "WXScripts",
                allRecursiveAssets
            );

            EditorUtility.ClearProgressBar();
            Debug.Log("导出工程代码： 1");
        }

        public override bool WillPresetShow()
        {
            return true;
        }

    }
}

