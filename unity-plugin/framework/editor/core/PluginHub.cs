using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.Networking;
using System.Runtime.CompilerServices;

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

        public static readonly string frameworkVersion = "0.7.0";
        public static List<string> versionList = new List<string> (new string[] { "0.7.0" });
        public static int versionIndex = 0;
        public static ExportPluginModule coreModule = null;
        public static ExportPluginModule nguiModule = null;
        public static ExportPluginModule uguiModule = null;
        public static ExportPluginModule scriptModule = null;
    }
}