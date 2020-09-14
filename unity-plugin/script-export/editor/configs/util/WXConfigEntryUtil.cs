// using UnityEngine;
// using UnityEditor;
// using System;
// using System.IO;
// using System.Linq;
// using System.Collections;
// using System.Collections.Generic;


// namespace WeChat {
//     public static class ConfigEntryUtil {

//         public static readonly string configsPath = "configs/WXConfigs";

//         private static ConfigEntry entry = ConfigManager.configEntry;
// 		public static void InitializeGlobalConfig()
// 		{
// 			// InitializeProjectExportConfig();
// 			//InitializeResourcesDirectories();
// 		}

// 		public static void InitializeProjectExportConfig() {

//             var configs = Resources.LoadAll<WXScriptableObject>(configsPath);
//             // Debug.Log(configs);
//             if (configs == null || configs.Length == 0) {
//                 Debug.Log("[...]初始化配置文件");
//                 CreateConfigScriptableObject(typeof(GlobalConfig), Path.Combine(ConfigManager.configsPath, "GlobalConfig.asset").PathToAssets());
//                 CreateConfigScriptableObject(typeof(ProjectExportConfig), Path.Combine(ConfigManager.configsPath, "ProjectExportConfig.asset").PathToAssets());
//                 // CreateConfigScriptableObject(typeof(ExportDirectoryList), Path.Combine(ConfigManager.configsPath, "ResourcesDirectoryConfig.asset").PathToAssets());
//                 CreateConfigScriptableObject(typeof(UnityPluginConfig), Path.Combine(ConfigManager.configsPath, "UnityPluginConfig.asset").PathToAssets());
//                 configs = Resources.LoadAll<WXScriptableObject>(configsPath);
//             }

//             // 防止ScriptableObject被改名字的情况下读不出来
//             Array.ForEach(configs, (config) => {
//                 if (config.GetType() == typeof(GlobalConfig)) {
//                     entry.globalConfig = (GlobalConfig)config;
//                 }
//                 else if (config.GetType() == typeof(ProjectExportConfig)) {
//                     entry.projectExportConfig = (ProjectExportConfig)config;
//                 }
//                 // else if (config.GetType() == typeof(ExportDirectoryList)) {
//                 //     entry.resourcesDirectoryConfig = (ExportDirectoryList)config;
//                 // }
//                 else if (config.GetType() == typeof(UnityPluginConfig)) {
//                     entry.unityPluginConfig = (UnityPluginConfig)config;
//                 }
//             });

//             // entry.globalConfig = Resources.Load(configsPath + "WXGlobalConfig") as GlobalConfig;
//             // entry.projectExportConfig = Resources.Load(configsPath + "WXProjectExportConfig") as ProjectExportConfig;
//             // entry.resourcesDirectoryConfig = Resources.Load(configsPath + "WXResourcesDirectoryConfig") as ResourcesDirectoryConfig;
//             // entry.unityPluginConfig = Resources.Load(configsPath + "WXUnityPluginConfig") as UnityPluginConfig;
//         }

//         private static void CreateConfigScriptableObject(Type type, string path) {
//             var config = ScriptableObject.CreateInstance(type);
//             AssetDatabase.CreateAsset(config, path);
//             AssetDatabase.SaveAssets();
//             AssetDatabase.Refresh();
//         }

//         public static void InitializeResourcesDirectories() {
//            var allResDirs = Resources.LoadAll<ExportDirectoryItem>("configs/WXResources") as ExportDirectoryItem[];
//            // Debug.Log(allResDirs);
//            if (allResDirs != null && 
//                (entry.resourcesDirectoryConfig == null ||
//                entry.resourcesDirectoryConfig.exportDirectories == null ||
//                entry.resourcesDirectoryConfig.exportDirectories.Count == 0)) {

//                entry.resourcesDirectoryConfig.exportDirectories = new List<ExportDirectoryItem>(allResDirs);
//            }
//         }
//     }
// }