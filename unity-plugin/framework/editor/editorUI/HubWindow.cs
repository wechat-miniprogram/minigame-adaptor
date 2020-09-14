using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using UnityEditor;
using UnityEngine;
using UnityEngine.Networking;

namespace WeChat {

    /** 弹出的安装插件窗口 */
    public class HubWindow : EditorWindow {
        private int versionIndex;
        private void OnEnable () {
            if (ExportPluginModule.coreModule != null && PluginHub.coreModule == null) {
                PluginHub.coreModule = ExportPluginModule.coreModule;
            }
            if (ExportPluginModule.nguiModule != null && PluginHub.nguiModule == null) {
                PluginHub.nguiModule = ExportPluginModule.nguiModule;
            }
            if (ExportPluginModule.uguiModule != null && PluginHub.uguiModule == null) {
                PluginHub.uguiModule = ExportPluginModule.uguiModule;
            }
            if (ExportPluginModule.scriptModule != null && PluginHub.scriptModule == null) {
                PluginHub.scriptModule = ExportPluginModule.scriptModule;
            }

            // 只有一项代表还没初始化
            if (PluginHub.versionList.Count == 1) {
                refreshVersionList ();
            }
            versionIndex = PluginHub.versionIndex;
        }
        private void refreshVersionList () {
            using (UnityWebRequest webRequest = UnityWebRequest.Get ("https://servicewechat.com/engine/engine-version")) {

                // if(UnityVersion.UNITY_2017_1_OR_NEWER){
                //     webRequest.SendWebRequest ();
                // }
                // else if(UnityVersion.UNITY_5_5_OR_NEWER){
                    webRequest.Send ();
                // }
                // else{
                //     return;
                // }

                while (!webRequest.isDone) { }

                if (webRequest.responseCode == 200) {
                    PluginHub.versionList.Clear ();
                    WeChatFrameWork.JSONObject result = WeChatFrameWork.JSONObject.Create (System.Text.Encoding.UTF8.GetString (webRequest.downloadHandler.data));
                    WeChatFrameWork.JSONObject versionListJSON = result.GetField ("version");
                    // 如果是测试版本号
                    if(PluginHub.frameworkVersion.StartsWith("0.")){
                        PluginHub.versionList.Add (PluginHub.frameworkVersion);
                        PluginHub.versionIndex = 0;
                    }
                    for (int i = versionListJSON.Count - 1; i >= 0; i--) {
                        string version = versionListJSON[i].GetField ("engine").GetRawString ();
                        PluginHub.versionList.Add (version);
                        if (version == PluginHub.frameworkVersion) {
                            PluginHub.versionIndex = PluginHub.versionList.Count - 1;
                        }
                    }
                }
            }
        }

        private void OnGUI () {
            //Debug.Log("HubWindow OnGUI");
            GUILayout.BeginHorizontal ();
            EditorGUILayout.Space ();
            GUILayout.BeginVertical ();
            EditorGUILayout.Space ();

            // 版本列表区块 start
            // 样式定义
            GUIStyle versionLabelStyle = new GUIStyle (GUI.skin.label);
            versionLabelStyle.fontSize = 14;
            versionLabelStyle.alignment = TextAnchor.MiddleLeft;

            GUIStyle versionPopupStyle = new GUIStyle (EditorStyles.popup);
            versionPopupStyle.alignment = TextAnchor.MiddleLeft;
            versionPopupStyle.fixedHeight = 20;

            // 绘制
            EditorGUILayout.Space ();
            GUILayout.BeginHorizontal ();

            // 获取版本号列表
            string[] versions = PluginHub.versionList.ToArray ();
            GUILayout.Label ("版本号：", versionLabelStyle);
            versionIndex = EditorGUILayout.Popup (Math.Min (versionIndex, versions.Length), versions, versionPopupStyle);
            if (GUILayout.Button ("刷新")) {
                refreshVersionList ();
            }
            EditorGUI.BeginDisabledGroup (versions[versionIndex] == PluginHub.frameworkVersion);
            if (GUILayout.Button ("切换")) {
                changeVersion (PluginHub.versionList[versionIndex]);
            }
            EditorGUI.EndDisabledGroup ();
            GUILayout.EndHorizontal ();

            // 版本列表区块 end

            // 分割线 start
            GUILayout.Box ("", GUILayout.Height (2), GUILayout.ExpandWidth (true));
            // 分割线 end

            // 模块列表 start

            // 样式定义
            GUIStyle fontStyle = new GUIStyle (GUI.skin.label);
            fontStyle.fontSize = 16;

            GUIStyle moduleButtonStyle = new GUIStyle (GUI.skin.button);
            moduleButtonStyle.margin.left = 15;
            moduleButtonStyle.margin.right = 15;

            GUIStyle installStatusStyle = new GUIStyle (GUI.skin.label);
            installStatusStyle.alignment = TextAnchor.LowerCenter;

            // 绘制
            {
                // core
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("核心模块", fontStyle, GUILayout.Height (24));
                string coreStatusText = "";
                if (PluginHub.coreModule != null) {
                    if (PluginHub.coreModule.ModuleVersion == PluginHub.frameworkVersion) {
                        coreStatusText = "已安装";
                    } else {
                        coreStatusText = "非法版本";
                    }
                } else {
                    coreStatusText = "未安装";
                }
                GUILayout.Label (
                    coreStatusText,
                    installStatusStyle, GUILayout.Width (80), GUILayout.Height (24)
                );
                GUILayout.EndHorizontal ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("核心导出框架；3D场景等资源导出能力；");
                if (coreStatusText != "已安装") {
                    if (GUILayout.Button ("安装", moduleButtonStyle, GUILayout.Width (50))) {
                        InstallModule (ModulePackageName.CORE);
                    }
                }
                GUILayout.EndHorizontal ();
            }

            {
                //ngui
                EditorGUILayout.Space ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("NGUI导出", fontStyle, GUILayout.Height (24));
                string nguiStatusText = "";
                if (PluginHub.nguiModule != null) {
                    if (PluginHub.nguiModule.ModuleVersion == PluginHub.frameworkVersion) {
                        nguiStatusText = "已安装";
                    } else {
                        nguiStatusText = "非法版本";
                    }
                } else {
                    nguiStatusText = "未安装";
                }
                GUILayout.Label (
                    nguiStatusText,
                    installStatusStyle, GUILayout.Width (80), GUILayout.Height (24)
                );
                GUILayout.EndHorizontal ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("提供把NGUI节点导出为2D场景的能力；");
                if (nguiStatusText != "已安装") {
                    if (GUILayout.Button ("安装", moduleButtonStyle, GUILayout.Width (50))) {
                        InstallModule (ModulePackageName.NGUI);
                    }
                }
                GUILayout.EndHorizontal ();
            }
            
            {
                //ugui
                EditorGUILayout.Space ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("UGUI导出", fontStyle, GUILayout.Height (24));
                string uguiStatusText = "";
                if (PluginHub.uguiModule != null) {
                    if (PluginHub.uguiModule.ModuleVersion == PluginHub.frameworkVersion) {
                        uguiStatusText = "已安装";
                    } else {
                        uguiStatusText = "非法版本";
                    }
                } else {
                    uguiStatusText = "未安装";
                }
                GUILayout.Label (
                    uguiStatusText,
                    installStatusStyle, GUILayout.Width (80), GUILayout.Height (24)
                );
                GUILayout.EndHorizontal ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("提供把UGUI节点导出为2D场景的能力；");
                if (uguiStatusText != "已安装") {
                    if (GUILayout.Button ("安装", moduleButtonStyle, GUILayout.Width (50))) {
                        InstallModule (ModulePackageName.UGUI);
                    }
                }
                GUILayout.EndHorizontal ();
            }

            {
                //ugui
                EditorGUILayout.Space ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("UGUI导出", fontStyle, GUILayout.Height (24));
                string uguiStatusText = "";
                if (PluginHub.uguiModule != null) {
                    if (PluginHub.uguiModule.ModuleVersion == PluginHub.frameworkVersion) {
                        uguiStatusText = "已安装";
                    } else {
                        uguiStatusText = "非法版本";
                    }
                } else {
                    uguiStatusText = "未安装";
                }
                GUILayout.Label (
                    uguiStatusText,
                    installStatusStyle, GUILayout.Width (80), GUILayout.Height (24)
                );
                GUILayout.EndHorizontal ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("提供把UGUI节点导出为2D场景的能力；");
                if (uguiStatusText != "已安装") {
                    if (GUILayout.Button ("安装", moduleButtonStyle, GUILayout.Width (50))) {
                        InstallModule (ModulePackageName.UGUI);
                    }
                }
                GUILayout.EndHorizontal ();
            }

            if(UnityVersion.UNITY_2017_1_OR_NEWER)
            {
                EditorGUILayout.Space ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("Script导出", fontStyle, GUILayout.Height (24));
                string scriptStatusText = "";
                if (PluginHub.scriptModule != null) {
                    if (PluginHub.scriptModule.ModuleVersion == PluginHub.frameworkVersion) {
                        scriptStatusText = "已安装";
                    } else {
                        scriptStatusText = "非法版本";
                    }
                } else {
                    scriptStatusText = "未安装";
                }
                GUILayout.Label (
                    scriptStatusText,
                    installStatusStyle, GUILayout.Width (80), GUILayout.Height (24)
                );
                GUILayout.EndHorizontal ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("提供把c#代码转换成js并导出的能力。");
                if (scriptStatusText != "已安装") {
                    if (GUILayout.Button ("安装", moduleButtonStyle, GUILayout.Width (50))) {
                        InstallModule (ModulePackageName.SCRIPT);
                    }
                }
                GUILayout.EndHorizontal ();
            }
            // 模块列表 end

            GUILayout.EndVertical ();
            EditorGUILayout.Space ();
            GUILayout.EndHorizontal ();
            EditorGUILayout.Space ();

        }

        private void changeVersion (string version) {
            PluginHub.versionIndex = versionIndex;
            if (PluginHub.coreModule != null) {
                PluginHub.coreModule.OnModuleVersionChange ();
                InstallModule (ModulePackageName.CORE, version);
            }
            if (PluginHub.nguiModule != null) {
                PluginHub.nguiModule.OnModuleVersionChange ();
                InstallModule (ModulePackageName.NGUI, version);
            }
            if (PluginHub.uguiModule != null) {
                PluginHub.uguiModule.OnModuleVersionChange ();
                InstallModule (ModulePackageName.UGUI, version);
            }
            if (PluginHub.scriptModule != null) {
                PluginHub.scriptModule.OnModuleVersionChange ();
                InstallModule (ModulePackageName.SCRIPT, version);
            }
        }

        private static void InstallModule (ModulePackageName name, string version = null) {
            // 如果版本传空，则直接使用当前版本
            if (version == null) {
                version = PluginHub.frameworkVersion;
            }

            var dir = Path.Combine (Application.dataPath, "__wx__tmp__download~");
            if (!Directory.Exists (dir)) {
                Directory.CreateDirectory (dir);
            }
            string modulePackageName = GetModulePackageName (name);
            if(modulePackageName==null){
                Debug.LogError("微信小游戏工具未支持当前版本的Unity");
                return;
            }
            string path = Path.Combine (dir, GetModulePackageName (name));

            string url = "https://dldir1.qq.com/WechatWebDev/plugins/BeefBallEngine-unitytool/" + version + "/" + GetModulePackageName (name);
            bool success = ProjectCreator.downloadFromWebURl (path, url);
            if (success) {
                AssetDatabase.ImportPackage (path, false);
                AssetDatabase.Refresh ();
                File.Delete (path);
            }
            Directory.Delete (dir);
        }

        private static string GetModulePackageName (ModulePackageName name) {
            string[] packageNames = { "core.unitypackage", "ngui.unitypackage", "script.unitypackage","ugui.unitypackage" };
            int index = name == ModulePackageName.SCRIPT ? 2 : (name == ModulePackageName.NGUI ? 1 : (name == ModulePackageName.UGUI ? 3: 0));
            return packageNames[index];
        }

        private enum ModulePackageName {
            CORE = 0,
            NGUI = 1,
            SCRIPT = 2,
            UGUI = 3
        }
    }
}