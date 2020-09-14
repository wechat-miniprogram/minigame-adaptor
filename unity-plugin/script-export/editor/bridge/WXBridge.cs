using System;
using System.IO;
using System.Text;
using UnityEngine;
using UnityEditor;

namespace WeChat {

    [InitializeOnLoad]
    public class WXBridge : ScriptableObject {

        public static bool isNGUIPreset = false;
        public static bool isUGUIPreset = false;

        // 标识是否使用微信小游戏引擎插件功能
        public static bool isWXBridgePlugin {
            get {
                // Debug.Log(ConfigManager.configEntry.globalConfig.isWXBridgePlugin);
                return ConfigManager.configEntry.globalConfig.isWXBridgePlugin;
            }
            set {
                ConfigManager.configEntry.globalConfig.isWXBridgePlugin = value;
            }
        }

        // 标识是否使用微信小游戏引擎插件功能
        public static bool isWXBridgePluginAdaptor {
            get {
                return ConfigManager.configEntry.globalConfig.isWXBridgePluginAdaptor;
            }
            set {
                ConfigManager.configEntry.globalConfig.isWXBridgePluginAdaptor = value;
            }
        }

        public static string TMP_RESOURCES_PATH = "__tmp_resources~";

        static WXBridge() {
            // InitializeEngineConfig();
            RegisterDelegates();
            // ReadGlobalConfigFromJsonFile();
        }

        static void InitializeEngineConfig() {
            //WXConfig.EnginePluginPath = "/unity-export";
            // BeefBall.absolutePath = Path.Combine(Application.dataPath, "unity-export/core/editor");
            // BeefBall.quickStartPackagePath = "http://stream.weixin.qq.com/wegameenginetest/outdoor/download_unzip/35/quickstart.zip";
        }

        static void RegisterDelegates() {
            BeefBall.RegisterPresetCompleteEvent(() => {
                WXMonoBehaviourExportHelper.exportedResourcesSet.Clear();
                isNGUIPreset = false;
                isUGUIPreset = false;
            });
        }

        [MenuItem("微信小游戏/调试/强制刷新 #%L")]
        public static void RefreshAssetDatabase() {
            AssetDatabase.Refresh();
            AssetDatabase.ImportAsset(AssetDatabase.GUIDToAssetPath(AssetDatabase.FindAssets("t:Script")[0]));
        }
        
    }
}