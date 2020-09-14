using System;
using System.IO;
using System.Text;
using UnityEngine;
using UnityEditor;

namespace WeChat {
    
    [InitializeOnLoad]
    internal static class ConfigManager {

        // private static readonly string rootPath = Path.Combine(Application.dataPath, "unity-export/resources/configs");

        // public static readonly string configsPath = Path.Combine(rootPath, "WXConfigs");

        // public static readonly string pluginsPath = Path.Combine(rootPath, "WXPlugins");
        // public static readonly string resourcesPath = Path.Combine(rootPath, "WXResources");
        public static ConfigEntry configEntry;

        private static DirectoryStructure configs;

        static ConfigManager() {
            try {
                Init();
            } catch(NullReferenceException e) {
                // DO NOTTHING
            }
        }

        public static void Init() {
            //var bridge = new ScriptExportModule();
            //bridge.OnModuleInstall();
            //ExportModuleManager.RegisterModule(bridge);

            InitConfigs();
        }

        private static void InitConfigs() {
            configEntry = DirectoryUtil.CreateScriptableObject<ConfigEntry>("bridge/ConfigEntry", false);

            configEntry.globalConfig = DirectoryUtil.CreateScriptableObject<GlobalConfig>("bridge/entry/GlobalConfig", false);
            configEntry.projectExportConfig = DirectoryUtil.CreateScriptableObject<ProjectExportConfig>("preset/project-script", false);
            configEntry.exportDirectoryListConfig = DirectoryUtil.CreateScriptableObject<ExportDirectoryList>("quickexport/directories", false);
            configEntry.unityPluginConfig = DirectoryUtil.CreateScriptableObject<UnityPluginConfig>("preset/plugins-script", false);
        }

        [MenuItem("微信小游戏/调试/重检查代码导出模块环境")]
        private static void CheckConfigEntry() {
            InitConfigs();
        }


    }
}