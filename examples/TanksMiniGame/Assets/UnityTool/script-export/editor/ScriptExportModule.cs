using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEditor;

namespace WeChat {

    // example inherit class
    [InitializeOnLoad]
    public class ScriptExportModule : ExportPluginModule {

        private DirectoryStructure references;
        private DirectoryStructure build;
        private DirectoryStructure configs;

        private List<string> textResList = new List<string>() { "bridge.json", "BridgeTypes.txt" };
        private List<string>  bridgeResList = new List<string>() { "Bridge.dll", "Retyped.Core.dll", "Retyped.es5.dll" };
        private List<string>  adaptorResList = new List<string>() { "minigame-adaptor-config.js.lib", "minigame-adaptor-util.js.lib", "minigame-adaptor.js.lib", "weapp-adapter.js.lib" };

        static ScriptExportModule() {
            ExportPluginModule.registerExportPluginModule("script", new ScriptExportModule());
        }
        
        public ScriptExportModule() : base("script", "1.0.0") {

        }
        
        public override void OnModuleInstall() {

        }


        public override void OnModuleInit() {
            Debug.Log(this.ToString() + " install callback");

            // Build Directories
            var path = Path.Combine(DirectoryStructure.TopRoot, "References~", "Bridge", "Bridge.dll");
            var exist = Precheck();
            if (!exist) {
                Debug.Log("Bridge resources not exist, download...");
                EditorUtility.DisplayProgressBar("Module Install", "下载模块所需资源", 0.0f);
                DownloadRes();
            }
            
            EditorUtility.DisplayProgressBar("Module Install", "初始化资源", 0.5f);
            BuildDirectories(exist);

            EditorUtility.DisplayProgressBar("Module Install", "清空临时文件", 0.9f);
            BridgeExport.RemoveProjectCodeDir();
            CleanTmpDirectory();

            EditorUtility.ClearProgressBar();
        }


        public override void OnModuleVersionChange() {
            // Debug.Log(this.ToString() + " version change callback");
            var bridgeDLL = references["Bridge"].GetFilePath("Bridge.dll");
            if (File.Exists(bridgeDLL)) {
                File.Delete(bridgeDLL);
            }
        }


        private void BuildDirectories(bool exist) {
            BuildBuildDirectory(exist);
            BuildConfigsDirectory(exist);
            BuildReferencesDirectory(exist);
            BuildDependencyDirectory(exist);
        }

        private void BuildBuildDirectory(bool exist) {
            var build = DirectoryBuilder.RegisterDirectory("build", new DirectoryStructure("Build~"));
            build.AddReadme("## 存放代码转换产生的中间文件");

            build.AddSubDirectory("Output", "## Output");
            build.AddSubDirectory("Plugins", "## Plugins");
            build.AddSubDirectory("Project", "## Project");
            build.AddSubDirectory("Temp", "## Temp");
            build.AddSubDirectory("BindingsCache", "## binding文件缓存");

            build.BuildDirectory();
        }

        private void BuildConfigsDirectory(bool exist) {
            var configs = DirectoryBuilder.RegisterDirectory("configs", new DirectoryStructure("Configs"));
            configs.AddReadme("## 存放配置文件");

            configs.AddSubDirectory("ScriptableObject", "## 存放ScriptableObject类型的配置文件");
            configs.AddSubDirectory("Text", "## 存放文本类型的配置文件");

            if (!exist) {
                // Debug.Log("not exist, move file");
                var dist = new DirectoryInfo(Path.Combine(Application.dataPath, "__wx__tmp__res~", "Bridge"));
                configs["Text"]["bridge.json"] = Path.Combine(dist.FullName, "bridge.json");
                configs["Text"]["BridgeTypes.txt"] = Path.Combine(dist.FullName, "BridgeTypes.txt");
            }
            configs.BuildDirectory();
        }


        private void BuildReferencesDirectory(bool exist) {
            var references = DirectoryBuilder.RegisterDirectory("references", new DirectoryStructure("References~"));
            references.AddReadme("## 存放需用用到的资源");

            references.AddSubDirectory("Adaptor", "## 存放代码导出用到的辅助脚本");
            references.AddSubDirectory("Bridge", "## 存放代码导出用到的DLL库");

            if (!exist) {
                // Debug.Log("not exist, move file");
                var dist = new DirectoryInfo(Path.Combine(Application.dataPath, "__wx__tmp__res~", "Bridge"));
                references["Bridge"]["Bridge.dll"] = Path.Combine(dist.FullName, "Bridge.dll");
                references["Bridge"]["Retyped.Core.dll"] = Path.Combine(dist.FullName, "Retyped.Core.dll");
                references["Bridge"]["Retyped.es5.dll"] = Path.Combine(dist.FullName, "Retyped.es5.dll");

                references["Adaptor"]["minigame-adaptor-config.js.lib"] = Path.Combine(dist.FullName, "minigame-adaptor-config.js.lib");
                references["Adaptor"]["minigame-adaptor-util.js.lib"] = Path.Combine(dist.FullName, "minigame-adaptor-util.js.lib");
                references["Adaptor"]["minigame-adaptor.js.lib"] = Path.Combine(dist.FullName, "minigame-adaptor.js.lib");
                references["Adaptor"]["weapp-adapter.js.lib"] = Path.Combine(dist.FullName, "weapp-adapter.js.lib");
            }

            references.BuildDirectory();
        }

        private void BuildDependencyDirectory(bool exist) {
            var build = DirectoryBuilder.RegisterDirectory("dependency", new DirectoryStructure("Dependency~"));
            build.AddReadme("## 存放依赖分析结果");

            build.AddSubDirectory("Output", "## Output");

            build.BuildDirectory();
        }

        /// <summary>
        /// 判断资源文件是否存在，返回False为任意一个文件不存在
        /// </summary>
        /// <returns>Boolean</returns>
        private bool Precheck() {
            // DirectoryStructure Init
            if (build == null) {
                build = DirectoryBuilder.RegisterDirectory("build", new DirectoryStructure("Build~"));
            }
            if (references == null) {
                references = DirectoryBuilder.RegisterDirectory("references", new DirectoryStructure("References~"));
            }
            if (configs == null) {
                configs = DirectoryBuilder.RegisterDirectory("configs", new DirectoryStructure("Configs"));
            }

            // Check Files
            return textResList.TrueForAll(res => CheckFileExist(configs, "Text", res))          &&
                   bridgeResList.TrueForAll(res => CheckFileExist(references, "Bridge", res))   &&
                   adaptorResList.TrueForAll(res => CheckFileExist(references, "Adaptor", res));
        }

        private bool CheckFileExist(DirectoryStructure structure, string subPath, string filePath) {
            // Debug.Log("fullpath: " + structure[subPath].GetFilePath(filePath) + " Exist: " + structure[subPath].Exists(filePath));
            return structure[subPath].Exists(filePath);
        }

        // [MenuItem("test/Mock Download Resources")]
        public static void DownloadRes() {
            // var url = "https://res.wx.qq.com/wechatgame/product/webpack/userupload/20200609/193724/res.zip";
            var url = WXConfig.moduleCDNPrefix + PluginHub.frameworkVersion + "/Bridge.zip";
            // Debug.Log(url);
            var dist = new DirectoryInfo(Path.Combine(Application.dataPath, "__wx__tmp__res~"));
            // Debug.Log(dist);
            if (!dist.Exists) dist.Create();
            ProjectCreator.downloadAndUnpackWebURL(dist.FullName, url);
        }

        public static void CleanTmpDirectory() {
            var dist = new DirectoryInfo(Path.Combine(Application.dataPath, "__wx__tmp__res~"));
            if(dist.Exists) {
                dist.Delete(true);
            }
        }

    }
}