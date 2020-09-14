using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using System;

namespace WeChat
{
    /**
     * 一键导出相关功能的控制类
     *
     */
    public class QuickExportUI
    {

        [MenuItem("微信小游戏/一键快速导出..", false, 3)]
        static void QuickExport()
        {
            string title = "一键快速导出";
#if UNITY_2017_1_OR_NEWER
            ExportWindow window = (ExportWindow)EditorWindow.GetWindow(typeof(ExportWindow));
            window.titleContent = new GUIContent(title);
            window.Show(true);
#elif UNITY_5_5_OR_NEWER
        ExportWindow window = (ExportWindow) EditorWindow.GetWindow (typeof (ExportWindow), true, title);
#endif
        }
        
        /** 弹出的导出窗口 */
        internal class ExportWindow : EditorWindow
        {
            // 场景配置
            HierarchyExportConfig hierarchyExportConfig;
            HierarchyExportConfigEditor hierarchyExportConfigEditor;
            ExportSceneList sceneExportConfig;
            ExportSceneListEditor sceneExportEditor;
            
            // 目录配置
            ExportDirectoryList directoryExportConfig;
            ExportDirectoryListEditor directoryExportEditor;

            // 插件代码导出
            UnityPluginConfig unityPluginConfig;
            UnityPluginConfigEditor unityPluginConfigEditor;

            // 工程代码导出
            ProjectExportConfig projectScriptExportConfig;
            ProjectExportConfigEditor projectScriptExportConfigEditor;

            // 原始资源导出
            RawResourceExportConfig rawResourceExportConfig;
            RawResourceExportConfigEditor rawResourceExportConfigEditor;

            // 全局配置信息
            GlobalConfig globalConfig;
            GlobalConfigEditor globalConfigEditor;

            private void OnEnable()
            {
                unityPluginConfig = DirectoryUtil.CreateScriptableObject<UnityPluginConfig>("preset/plugins-script", false);
                unityPluginConfigEditor = Editor.CreateEditor(unityPluginConfig) as UnityPluginConfigEditor;

                projectScriptExportConfig = DirectoryUtil.CreateScriptableObject<ProjectExportConfig>("preset/project-script", false);
                projectScriptExportConfigEditor = Editor.CreateEditor(projectScriptExportConfig) as ProjectExportConfigEditor;

                // scenes
                hierarchyExportConfig = DirectoryUtil.CreateScriptableObject<HierarchyExportConfig>("quickexport/hierarchy", false);
                hierarchyExportConfigEditor = Editor.CreateEditor(hierarchyExportConfig) as HierarchyExportConfigEditor;
                sceneExportConfig = DirectoryUtil.CreateScriptableObject<ExportSceneList>("quickexport/scenes", false);
                sceneExportEditor = Editor.CreateEditor(sceneExportConfig) as ExportSceneListEditor;

                directoryExportConfig = DirectoryUtil.CreateScriptableObject<ExportDirectoryList>("quickexport/directories", false);
                directoryExportEditor = Editor.CreateEditor(directoryExportConfig) as ExportDirectoryListEditor;

                globalConfig = DirectoryUtil.CreateScriptableObject<GlobalConfig>("bridge/entry/GlobalConfig", false);
                globalConfigEditor = Editor.CreateEditor(globalConfig) as GlobalConfigEditor;

                rawResourceExportConfig = DirectoryUtil.CreateScriptableObject<RawResourceExportConfig>("quickexport/rawres", false);
                rawResourceExportConfigEditor = Editor.CreateEditor(rawResourceExportConfig) as RawResourceExportConfigEditor;
                
                BeefBall.DoInstallationCheck();

                ConfigManager.Init();
            }

            bool expandGlobalConfig = true;
            bool expandSceneConfig = true;
            bool checkSceneConfig = true;
            bool expandPrefabConfig = true;
            bool checkPrefabConfig = true;
            bool expandPluginCodeConfig = true;
            bool checkPluginCodeConfig = true;
            bool expandProjectCodeConfig = true;
            bool checkProjectCodeConfig = true;
            bool expandRawResourceConfig = true;
            bool checkRawResourceConfig = true;

            private Vector2 verticalScrollPosition = new Vector2();

            private void OnGUI()
            {
                verticalScrollPosition = GUILayout.BeginScrollView(verticalScrollPosition,  false, false, GUIStyle.none, GUI.skin.verticalScrollbar);
                GUILayout.BeginHorizontal(); 
                EditorGUILayout.Space();
                GUILayout.BeginVertical();
                EditorGUILayout.Space();

                EditorGUILayout.HelpBox("一键快速导出可以按一定流程快速地执行多个导出任务。", MessageType.Info);

                // 全局配置
                EditorGUILayout.Space();
                {
                    EditorGUILayout.BeginHorizontal();
                    GUIStyle sceneStyle = new GUIStyle(EditorStyles.foldout);
                    sceneStyle.fixedWidth = 10;
                    expandGlobalConfig = EditorGUILayout.Foldout(expandGlobalConfig, "==== 全局配置", true, sceneStyle);
                    GUILayout.Label("", GUILayout.ExpandWidth(true));
                    EditorGUILayout.EndHorizontal();
                    if (expandGlobalConfig) {
                        EditorGUI.indentLevel++;
                        globalConfigEditor.OnInspectorGUI();
                        EditorGUI.indentLevel--;
                    }
                }


                // 插件
                EditorGUILayout.Space();
                int PluginCodeFold = EditorHelper.FoldableTitleline("导出插件代码", expandPluginCodeConfig, checkPluginCodeConfig);
                expandPluginCodeConfig = (PluginCodeFold & 0x10) == 0x10;
                checkPluginCodeConfig = (PluginCodeFold & 0x1) == 0x1;
                if (expandPluginCodeConfig)
                {
                    EditorGUI.indentLevel++;
                    unityPluginConfigEditor.OnInspectorGUI();
                    EditorGUI.indentLevel--;
                }

                // 工程
                EditorGUILayout.Space();
                int PluginProjectFold = EditorHelper.FoldableTitleline("导出工程代码", expandProjectCodeConfig, checkProjectCodeConfig);
                expandProjectCodeConfig = (PluginProjectFold & 0x10) == 0x10;
                checkProjectCodeConfig = (PluginProjectFold & 0x1) == 0x1;
                if (expandProjectCodeConfig)
                {
                    EditorGUI.indentLevel++;
                    // globalConfigEditor.OnInspectorGUI();
                    projectScriptExportConfigEditor.OnInspectorGUI();
                    EditorGUI.indentLevel--;
                }

                // 场景
                EditorGUILayout.Space();

                int sceneFold = EditorHelper.FoldableTitleline("导出所有场景", expandSceneConfig, checkSceneConfig);
                expandSceneConfig = (sceneFold & 0x10) == 0x10;
                checkSceneConfig = (sceneFold & 0x1) == 0x1;
                if (expandSceneConfig)
                {
                    EditorGUI.indentLevel++;
                    hierarchyExportConfigEditor.OnInspectorGUI();
                    sceneExportEditor.OnInspectorGUI(); 
                    EditorGUI.indentLevel--;
                }

                // prefab
                EditorGUILayout.Space();
                int prefabFold = EditorHelper.FoldableTitleline("导出目录下的 prefab", expandPrefabConfig, checkPrefabConfig);
                expandPrefabConfig = (prefabFold & 0x10) == 0x10;
                checkPrefabConfig = (prefabFold & 0x1) == 0x1;
                if (expandPrefabConfig)
                {
                    EditorGUI.indentLevel++;
                    directoryExportEditor.OnInspectorGUI();
                    EditorGUI.indentLevel--;
                }


                // 原始资源
                EditorGUILayout.Space();

                int rawFold = EditorHelper.FoldableTitleline("导出原始资源", expandRawResourceConfig, checkRawResourceConfig);
                expandRawResourceConfig = (rawFold & 0x10) == 0x10;
                checkRawResourceConfig = (rawFold & 0x1) == 0x1;
                if (expandRawResourceConfig)
                {
                    EditorGUI.indentLevel++;
                    rawResourceExportConfigEditor.OnInspectorGUI(); 
                    EditorGUI.indentLevel--;
                }

                EditorGUILayout.Space();
                EditorGUILayout.Space();
                GUIStyle exportButtonStyle = new GUIStyle(GUI.skin.button);
                exportButtonStyle.fontSize = 14;
                var isExportBtnPressed = GUILayout.Button("导出", exportButtonStyle, GUILayout.Height(40), GUILayout.Width(EditorGUIUtility.currentViewWidth - 20));

                GUILayout.EndVertical();
                EditorGUILayout.Space();
                GUILayout.EndHorizontal();
                EditorGUILayout.Space();

                GUILayout.EndScrollView();

                if (isExportBtnPressed) {
                    if (checkPluginCodeConfig) {
                        Debug.Log("导出插件代码...");
                        ExportPreset.GetExportPreset("plugins-script").Export();
                    }

                    if (checkProjectCodeConfig) {
                        Debug.Log("导出工程代码...");
                        ExportPreset.GetExportPreset("project-script").Export();
                    }

                    if (checkSceneConfig) {
                        Debug.Log("导出全部游戏场景...");
                        ExportAllScenes();
                    }

                    if (checkPrefabConfig) {
                        Debug.Log("导出资源文件夹...");
                        ExportAllResourcesDirectories();
                    }

                    if(checkRawResourceConfig){
                        Debug.Log("导出裸资源文件...");
                        ExportPreset.GetExportPreset("rawres").Export();
                    }
                }
            }

            private void ExportAllScenes()
            {
                var activeScene = EditorSceneManager.GetActiveScene();
                string currentScenePath = "";
                if (activeScene != null && activeScene.path != "")
                {
                    currentScenePath = EditorSceneManager.GetActiveScene().path;
                }

                int i = 0;
                var scenes = sceneExportConfig.exportScenes;
                if (scenes != null && scenes.Count > 0) 
                {
                    scenes.ForEach(scene => {
                        var path = AssetDatabase.GetAssetPath(scene.scene);
                        try
                        {
                            EditorSceneManager.OpenScene(path);
                            if (scene.isNGUI)
                            {
                                ExportPreset.GetExportPreset("ngui-rootScene").WillPresetShow();
                                ExportPreset.GetExportPreset("ngui-rootScene").Export();
                            }
                            else if (scene.isUGUI)
                            {
                                ExportPreset.GetExportPreset("ugui-rootScene").WillPresetShow();
                                ExportPreset.GetExportPreset("ugui-rootScene").Export();
                            }
                            else
                            {
                                ExportPreset.GetExportPreset("scene").Export();
                            }
                            i++;
                        }
                        catch (ArgumentException e)
                        {
                            // 被添加的Scene不存在，不做处理
                        }
                    });
                }

                if (currentScenePath != "")
                {
                    EditorSceneManager.OpenScene(currentScenePath);
                }
                Debug.Log("导出场景： " + i);
            }

            private void ExportAllResourcesDirectories()
            {
                var res = ConfigManager.configEntry.exportDirectoryListConfig.exportDirectories;
                if (res == null || res.Count == 0)
                {
                    EditorUtility.DisplayDialog("Resources目录配置", "未找到任何Resources目录或未添加至列表中", "ok");
                    return;
                }
                int i = 0;
                foreach (var r in res)
                {
                    UnityEngine.Object dir = r.directory;
                    if (dir != null)
                    {
                        EditorUtility.FocusProjectWindow();
                        Selection.activeObject = dir;
                        if (r.isNGUI)
                        {
                            ExportPreset.GetExportPreset("ngui-prefabfolder").Export();
                        }else if (r.isUGUI)
                        {
                            ExportPreset.GetExportPreset("ugui-prefabfolder").Export();
                        }
                        else
                        {
                            ExportPreset.GetExportPreset("prefabfolder").Export();
                        }
                        i++;
                    }
                }
                Debug.Log("导出资源文件夹： " + i);
            }

        }
    }

}