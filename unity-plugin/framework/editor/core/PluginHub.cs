using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.Networking;
using System.Runtime.CompilerServices;
using System.IO;

[assembly: InternalsVisibleToAttribute("Core"), InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat {
    /**
     * 模块管理窗口
     */
    public class PluginHub {
        //[MenuItem ("微信小游戏/测试用", false, 111)]
        //static void test () {
        //    TextAsset text = Resources.Load<TextAsset> ("WeChatGameConfig/index");
        //    Debug.Log (text);
        //}

        [MenuItem ("微信小游戏/扩展模块管理", false, 111)]
        static void showPluginUI () {
            string title = "安装扩展模块";
            HubWindow window = (HubWindow) EditorWindow.GetWindow (typeof (HubWindow), true, title);
        }

        // 导出插件版本。该字符串会在构建流程里被修改，请勿改动
        private static string _frameworkVersion = "0.7.0";

        // 分辨是源码版还是发布后的代码版
        public static readonly string distribution = "Debug";

        public static string frameworkVersion {
            get { return _frameworkVersion; }

            set {

                string pluginVersionPath = Path.Combine (DirectoryStructure.TopRoot, "version.md");

                if (_frameworkVersion == value && File.Exists (pluginVersionPath)) {
                    return;
                }
                
                _frameworkVersion = value;
                using (StreamWriter sw = new StreamWriter (pluginVersionPath)) {
                    sw.Write (_frameworkVersion);
                }
            }
        }
        public static string readVersionFromFile () {
            string pluginVersionPath = Path.Combine (DirectoryStructure.TopRoot, "version.md");
            if (File.Exists (pluginVersionPath)) {
                using (var sr = new StreamReader (pluginVersionPath)) {
                    _frameworkVersion = sr.ReadToEnd ();
                }
            }
            return _frameworkVersion;
        }
        public static List<string> versionList = new List<string> (new string[] { "0.7.0" });
        public static int versionIndex = 0;
        public static ExportPluginModule coreModule = null;
        public static ExportPluginModule nguiModule = null;
    }
}