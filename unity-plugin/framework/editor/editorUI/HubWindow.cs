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
        private string latestVersion = PluginHub.frameworkVersion;
        const string PluginName = "UnityTool";
        private void OnEnable () {
            if (ExportPluginModule.coreModule != null && PluginHub.coreModule == null) {
                PluginHub.coreModule = ExportPluginModule.coreModule;
            }
            if (ExportPluginModule.nguiModule != null && PluginHub.nguiModule == null) {
                PluginHub.nguiModule = ExportPluginModule.nguiModule;
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

                string localVersion = PluginHub.readVersionFromFile ();

                if (webRequest.responseCode == 200) {
                    PluginHub.versionList.Clear ();
                    WeChatFrameWork.JSONObject result = WeChatFrameWork.JSONObject.Create (System.Text.Encoding.UTF8.GetString (webRequest.downloadHandler.data));
                    WeChatFrameWork.JSONObject versionListJSON = result.GetField ("version");
                    // 如果是测试版本号
                    if (localVersion.StartsWith ("0.")) {
                        PluginHub.versionList.Add (localVersion);
                        PluginHub.versionIndex = 0;
                    }
                     bool latestVersionDirty = false;
                    for (int i = versionListJSON.Count - 1; i >= 0; i--)
                    {
                        string version = versionListJSON[i].GetField("engine").GetRawString();
                        PluginHub.versionList.Add(version);
                        if (version == localVersion)
                        {
                            PluginHub.versionIndex = PluginHub.versionList.Count - 1;
                        }
                        
                        if (version.CompareTo(latestVersion) > 0)
                        {
                            latestVersion = version;
                            latestVersionDirty = true;
                            Debug.Log("1:" + latestVersion);
                        }
                    }
                    if (latestVersionDirty)
                    {
                        Debug.Log(latestVersion);
                        // ChangeModuleVersion(ModulePackageName.FRAMEWORK, latestVersion);
                    }
                }
            }
        }

        bool IsNGUIExist () {
            string classType = "UIRoot";
            var type = Type.GetType (String.Format ("{0},Assembly-CSharp", classType));
            return type != null;
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
            // EditorGUI.BeginDisabledGroup (versions[versionIndex] == PluginHub.frameworkVersion);
            if (GUILayout.Button (versions[versionIndex] == PluginHub.frameworkVersion ? "重装" : "切换")) {
                changeVersion (PluginHub.versionList[versionIndex]);
            }
            // EditorGUI.EndDisabledGroup ();
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
                GUILayout.Label ("【必装】核心模块", fontStyle, GUILayout.Height (24));
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
                GUILayout.Label ("【选装】NGUI导出", fontStyle, GUILayout.Height (24));
                string nguiStatusText = "";
                if (PluginHub.nguiModule != null) {
                    if (PluginHub.nguiModule.ModuleVersion == PluginHub.frameworkVersion) {
                        nguiStatusText = "已安装";
                    } else {
                        nguiStatusText = "非法版本";
                    }
                } else {
                    if (IsNGUIExist ()) {
                        nguiStatusText = "未安装";
                    } else {
                        nguiStatusText = "未检测到NGUI";
                    }

                }
                GUILayout.Label (
                    nguiStatusText,
                    installStatusStyle, GUILayout.Width (80), GUILayout.Height (24)
                );
                GUILayout.EndHorizontal ();
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("提供把NGUI节点导出为2D场景的能力；");

                if (nguiStatusText != "已安装" && nguiStatusText != "未检测到NGUI") {
                    if (GUILayout.Button ("安装", moduleButtonStyle, GUILayout.Width (50))) {
                        InstallModule (ModulePackageName.NGUI);
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
            bool bReInstall = (PluginHub.frameworkVersion.CompareTo(version)==0);
            PluginHub.frameworkVersion = version;
            bool success = true;

            // 保持framework为最新
            // {
            //     ChangeModuleVersion(ModulePackageName.FRAMEWORK, latestVersion);
            // }
            if (PluginHub.coreModule != null)
            {
                PluginHub.coreModule.OnModuleVersionChange();
                success = ChangeModuleVersion(ModulePackageName.CORE, version);
                if (success == false)
                {
                    Debug.LogError("Core切换版本失败");
                }
            }
            if (PluginHub.nguiModule != null)
            {
                PluginHub.nguiModule.OnModuleVersionChange();
                success = ChangeModuleVersion(ModulePackageName.NGUI, version);
                if (success == false)
                {
                    Debug.LogError("NGUI切换版本失败");
                }
            }
            if (success == true)
            {
                string logInfo = bReInstall?"重装成功":"切换至:" + version;
                Debug.Log(logInfo);
                
            }
        }

        private static bool InstallModule(ModulePackageName name, string version = null)
        {
            try
            {
                // 如果版本传空，则直接使用当前版本
                if (version == null)
                {
                    version = PluginHub.frameworkVersion;
                }

                var dir = Path.Combine(Application.dataPath, "__wx__tmp__download~");
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }
                string modulePackageName = GetModulePackageName(name);
                if (modulePackageName == null)
                {
                    Debug.LogError("微信小游戏工具未支持当前版本的Unity");
                    return false;
                }
                string path = Path.Combine(dir, GetModulePackageName(name));

                string url = "https://dldir1.qq.com/WechatWebDev/plugins/BeefBallEngine-unitytool/" + version + "/" + GetModulePackageName(name);
                bool success = ProjectCreator.downloadFromWebURl(path, url);
                if (success)
                {
                    AssetDatabase.ImportPackage(path, false);
                    AssetDatabase.Refresh();
                    File.Delete(path);
                }
                Directory.Delete(dir);
            }
            catch (Exception e)
            {
                Debug.LogError(e);
                return false;
            }
            return true;

        }

        private static bool UnInstallModule(ModulePackageName name)
        {
            string modulePath = Path.Combine(Application.dataPath, PluginName);
            string moduleName = GetModuleName(name);
            var dir = Path.Combine(modulePath, moduleName);
            if (!Directory.Exists(dir))
            {
                Debug.LogWarning("未找到安装路径:" + dir);
                return false;
            }
            else
            {
                Directory.Delete(dir, true);
                return true;
            }
        }

        private static void ReInstallModule(ModulePackageName name)
        {
            bool suc = UnInstallModule(name);
            if (suc)
            {
                InstallModule(name);
                string packageName = GetModulePackageName(name, false);
                Debug.Log("重装" + packageName + "成功");
            }
        }

        private static bool ChangeModuleVersion(ModulePackageName name, string version)
        {
            bool suc = UnInstallModule(name);
            if (suc)
            {
                suc = InstallModule(name, version);
            }
            return suc;
        }

        private static string GetModulePackageName(ModulePackageName name, bool includeSuffix = true)
        {
            string[] packageNames = { "core", "ngui", "UnityTool", };
            if (includeSuffix)
            {
                for (int i = 0; i < packageNames.Length; i++)
                {
                    packageNames[i] = packageNames[i] + ".unitypackage";
                }
            }

            int index = 3;
            switch (name)
            {
                case ModulePackageName.CORE:
                    index = 0;
                    break;
                case ModulePackageName.NGUI:
                    index = 1;
                    break;

            }
            return packageNames[index];
        }

        private static string GetModuleName(ModulePackageName name)
        {
            string[] packageNames = { "core", "ngui","framework" };
          
            int index = 3;
            switch (name)
            {
                case ModulePackageName.CORE:
                    index = 0;
                    break;
                case ModulePackageName.NGUI:
                    index = 1;
                    break;
            }
            return packageNames[index];
        }

        private enum ModulePackageName
        {
            CORE = 0,
            NGUI = 1,
            FRAMEWORK = 3,
        }
    }
}