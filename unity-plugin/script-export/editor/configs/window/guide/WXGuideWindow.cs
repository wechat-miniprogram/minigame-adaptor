//using System;
//using System.Collections;
//using System.Collections.Generic;
//using System.IO;
//using UnityEngine;
//using UnityEditor;
//using UnityEditor.SceneManagement;


//namespace WeChat
//{
//    public class WXGuideWindow : EditorWindow
//    {

//        [MenuItem("WeChat/Guide")]
//        public static void GuideWindowInit()
//        {
//            var width = Screen.currentResolution.width;
//            var height = Screen.currentResolution.height;

//            WXGuideWindow window = (WXGuideWindow)EditorWindow.GetWindowWithRect(
//                typeof(WXGuideWindow),
//                new Rect(width / 2, height / 2, 800, 600),
//                false
//            );

//            window.titleContent = new GUIContent("WeChat Minigame Export Panel");

//            if (window.configEntry == null)
//            {
//                window.configEntry = new SerializedObject(ConfigManager.configEntry);
//            }

//            window.Show(true);
//        }


//        private GUIStyle titleStyle;
//        private GUIStyle subtitleStyle;

//        private SerializedObject configEntry;

//        private PluginListView listView;

//        private bool foldout = false;

//        private void InitGUIStyle()
//        {
//            titleStyle = new GUIStyle();
//            titleStyle.fontSize = 24;
//            titleStyle.alignment = TextAnchor.MiddleCenter;

//            subtitleStyle = new GUIStyle();
//            subtitleStyle.fontSize = 18;
//            subtitleStyle.fontStyle = FontStyle.Normal;
//            subtitleStyle.alignment = TextAnchor.MiddleCenter;
//        }

//        private void OnGUI()
//        {

//            if (configEntry == null)
//            {
//                configEntry = new SerializedObject(ConfigManager.configEntry);
//            }

//            GUIStyle style = new GUIStyle();
//            style.padding = new RectOffset(10, 10, 20, 0);
//            InitGUIStyle();

//            GUILayout.Label("项目导出配置面板", titleStyle);

//            GUILayout.BeginHorizontal(style);

//            GUIStyle itemStyle = new GUIStyle();
//            itemStyle.padding = new RectOffset(30, 30, 30, 30);
//            itemStyle.margin = new RectOffset(5, 5, 20, 20);
//            itemStyle.alignment = TextAnchor.MiddleCenter;

//            GUILayout.BeginVertical(itemStyle);
//            GUILayout.Label("资源目录配置", subtitleStyle);

//            // foldout = EditorGUILayout.Foldout(foldout, "资源目录配置");
//            // if (foldout) {
//            EditorGUILayout.PropertyField(configEntry.FindProperty("resourcesDirectoryConfig"), GUIContent.none);
//            if (GUILayout.Button("查找Resources目录", GUILayout.Width(200)))
//            {
//                ResourcesDirectoryUtil.SearchAllResourcesDirectories();
//                var res = Resources.FindObjectsOfTypeAll(typeof(ExportDirectoryItem));
//                if (res.Length > 0)
//                {
//                    Selection.activeObject = res[0];
//                    EditorUtility.DisplayDialog("Resources目录配置", "请逐一选择资源目录导出类型及是否启用", "ok");
//                }
//                else
//                {
//                    EditorUtility.DisplayDialog("Resources目录配置", "未找到任何Resources目录", "ok");
//                }
//            }
//            if (GUILayout.Button("添加所有资源目录", GUILayout.Width(200)))
//            {
//                if (ResourcesDirectoryUtil.AttachResDirectoriesToConfig())
//                {
//                    EditorUtility.DisplayDialog("Resources目录配置", "已添加所有资源目录", "ok");
//                    Selection.activeObject = ConfigManager.configEntry.resourcesDirectoryConfig;
//                }
//                else
//                {
//                    EditorUtility.DisplayDialog("Resources目录配置", "未找到任何Resources目录", "ok");
//                }
//            }

//            GUILayout.Space(80.0f);
//            GUILayout.Label("资源导出", subtitleStyle);
//            if (GUILayout.Button("导出所有资源目录下的Prefab", GUILayout.Width(200)))
//            {
//                ExportAllResourcesDirectories();
//            }

//            if (GUILayout.Button("导出所有场景", GUILayout.Width(200)))
//            {
//                ExportAllScenes();
//            }
//            // }




//            GUILayout.EndVertical();

//            GUILayout.BeginVertical(itemStyle, GUILayout.MinHeight(20));
//            GUILayout.Label("插件配置", subtitleStyle);
//            EditorGUILayout.PropertyField(configEntry.FindProperty("unityPluginConfig"), GUIContent.none);


//            if (GUILayout.Button("遍历所有文件夹", GUILayout.Width(200)))
//            {
//                var dir = Directory.EnumerateDirectories(Application.dataPath, "WXPlugins", SearchOption.AllDirectories).FilesListToLine().PathToAssets();
//                // Debug.Log(dir);
//                // if (dir != null) {
//                //     Debug.Log(AssetDatabase.IsValidFolder(dir));
//                //     Selection.activeObject = AssetDatabase.LoadMainAssetAtPath(dir);
//                // }
//                Selection.activeObject = AssetDatabase.LoadMainAssetAtPath(ConfigManager.pluginsPath.PathToAssets());

//                listView = (PluginListView)EditorWindow.GetWindow(typeof(PluginListView), true, "快速选择插件文件夹", true);
//                listView.IterateAllDirectories();
//                listView.Show(true);
//            }

//            if (GUILayout.Button("添加所有插件配置", GUILayout.Width(200)))
//            {
//                UnityPluginUtil.AttachPluginsToConfig();
//                EditorUtility.DisplayDialog("插件导出配置", "已添加所有插件", "ok");
//                Selection.activeObject = ConfigManager.configEntry.unityPluginConfig;
//            }

//            if (GUILayout.Button("移除所有插件配置", GUILayout.Width(200)))
//            {
//                UnityPluginUtil.DeattachAllPlugins();
//                EditorUtility.DisplayDialog("插件导出配置", "已移除所有插件", "ok");
//                Selection.activeObject = ConfigManager.configEntry.unityPluginConfig;
//            }

//            if (GUILayout.Button("删除所有插件配置", GUILayout.Width(200)))
//            {
//                if (EditorUtility.DisplayDialog("插件导出配置", "确认需要从磁盘删除所有插件配置信息吗？", "yes", "no"))
//                {
//                    UnityPluginUtil.RemoveAllPlugins();
//                    EditorUtility.DisplayDialog("插件导出配置", "已删除所有插件配置信息", "ok");
//                }
//                Selection.activeObject = AssetDatabase.LoadMainAssetAtPath(ConfigManager.pluginsPath);
//            }

//            if (GUILayout.Button("检查所有插件配置状态", GUILayout.Width(200)))
//            {
//                var plugins = ConfigManager.configEntry.unityPluginConfig.unityPlugins;
//                var num = plugins.Count;
//                var stubs = 0;
//                var enable = 0;
//                foreach (var p in plugins)
//                {
//                    if (p.pluginState == UnityPlugin.PluginState.stub)
//                    {
//                        stubs++;
//                    }

//                    if (p.enable)
//                    {
//                        enable++;
//                    }
//                }
//                EditorUtility.DisplayDialog("插件导出配置", "插件总数： " + num + "， 激活插件数： " + enable + "， 桩代码插件数： " + stubs, "ok");
//            }

//            GUILayout.Space(15.0f);
//            GUILayout.Label("插件导出", subtitleStyle);

//            if (GUILayout.Button("转换插件代码", GUILayout.Width(200)))
//            {
//                EditorUtility.DisplayDialog("代码转换配置", "Doing", "ok");
//            }

//            GUILayout.EndVertical();


//            GUILayout.BeginVertical(itemStyle);
//            GUILayout.Label("代码转换配置", subtitleStyle);
//            EditorGUILayout.PropertyField(configEntry.FindProperty("projectExportConfig"), GUIContent.none);

//            if (GUILayout.Button("代码预检查", GUILayout.Width(200)))
//            {
//                EditorUtility.DisplayDialog("代码转换配置", "Doing", "ok");
//            }

//            if (GUILayout.Button("检查Bridge环境", GUILayout.Width(200)))
//            {
//                EditorUtility.DisplayDialog("代码转换配置", "Doing", "ok");
//            }

//            if (GUILayout.Button("依赖分析", GUILayout.Width(200)))
//            {
//                EditorUtility.DisplayDialog("代码转换配置", "Doing", "ok");
//            }

//            GUILayout.Space(60.0f);
//            GUILayout.Label("代码导出", subtitleStyle);


//            if (GUILayout.Button("生成插件桩代码", GUILayout.Width(200)))
//            {
//                // GenerateStubProc.GenePluginsStub();
//                // GenerateStubProc.GeneUnityStub();
//            }

//            if (GUILayout.Button("转换工程代码", GUILayout.Width(200)))
//            {
//                // BridgeExport.ExportCode();
//            }

//            if (GUILayout.Button("导出代码", GUILayout.Width(200)))
//            {
//                BeefBall.presetMap["script"].Export();
//            }
//            GUILayout.EndVertical();

//            GUILayout.EndHorizontal();


//            GUILayout.BeginHorizontal(style);
//            GUILayout.BeginVertical(itemStyle);

//            EditorGUILayout.HelpBox("导出面板说明", MessageType.Info);
//            // GUILayout.Label("导出流程说明", subtitleStyle);
//            GUILayout.Label("1. 如果项目使用了Resources.Load接口，则需要配置Resources目录的类型（3d prefab及ngui prefab）、以及是否被用于批量自动导出。\n    查找Resources目录 -> 添加所有资源目录，并手动编辑自动生成的ScriptableObject配置文件");
//            GUILayout.Label("2. 如果项目使用了第三方插件，需要进行插件信息的配置，决定插件是否参与代码转换、是否生成桩代码等。\n    遍历所有文件夹(选择插件的根目录文件夹，在自动生成的ScriptableObject上进行配置) -> 添加所有插件配置");
//            GUILayout.Label("3. 代码导出前需要检查环境............");

//            var t = 0;
//            var T = 2 * 5;
//            if (GUILayout.Button("一键导出(test)", GUILayout.Width(150), GUILayout.Height(30)))
//            {
//                try
//                {
//                    // stub
//                    EditorUtility.DisplayProgressBar("工程一键导出", "生成桩代码", t++ / T);
//                    Debug.Log("生成桩代码......");
//                    // GenerateStubProc.GenePluginsStub();
//                    // GenerateStubProc.GeneUnityStub();
//                    EditorUtility.DisplayProgressBar("工程一键导出", "生成桩代码完成", t++ / T);
//                    Debug.Log("生成桩代码完成");

//                    // convert
//                    EditorUtility.DisplayProgressBar("工程一键导出", "转换游戏项目代码", t++ / T);
//                    Debug.Log("转换游戏项目代码......");
//                    // BridgeExport.ExportCode();
//                    EditorUtility.DisplayProgressBar("工程一键导出", "转换代码完成", t++ / T);
//                    Debug.Log("转换代码完成");

//                    // script package
//                    EditorUtility.DisplayProgressBar("工程一键导出", "打包js脚本到mgepackage", t++ / T);
//                    Debug.Log("打包js脚本到mgepackage......");
//                    BeefBall.presetMap["script"].Export();
//                    EditorUtility.DisplayProgressBar("工程一键导出", "脚本打包完成", t++ / T);
//                    Debug.Log("脚本打包完成");

//                    // scene
//                    EditorUtility.DisplayProgressBar("工程一键导出", "转换当前游戏场景", t++ / T);
//                    Debug.Log("转换所有游戏场景......");
//                    ExportAllScenes();
//                    EditorUtility.DisplayProgressBar("工程一键导出", "游戏场景打包完成", t++ / T);
//                    Debug.Log("游戏场景打包完成");

//                    // resources
//                    EditorUtility.DisplayProgressBar("工程一键导出", "转换所有Resources目录下的prefab", t++ / T);
//                    Debug.Log("转换所有Resources目录下的prefab......");
//                    ExportAllResourcesDirectories();
//                    EditorUtility.DisplayProgressBar("工程一键导出", "prefab打包完成", t++ / T);
//                    Debug.Log("prefab打包完成");

//                    // script package
//                    EditorUtility.DisplayProgressBar("工程一键导出", "导出原始资源到mgepackage", t++ / T);
//                    Debug.Log("导出原始资源到mgepackage......");
//                    BeefBall.presetMap["rawres"].Export();
//                    EditorUtility.DisplayProgressBar("工程一键导出", "原始资源打包完成", t++ / T);
//                    Debug.Log("原始资源打包完成");

//                    EditorUtility.ClearProgressBar();
//                }
//                catch (Exception e)
//                {
//                    Debug.LogError(e);
//                }

//            }

//            GUILayout.EndVertical();
//            GUILayout.EndHorizontal();

//        }

//        private void ExportAllResourcesDirectories()
//        {
//            var res = ConfigManager.configEntry.resourcesDirectoryConfig.exportDirectories;
//            if (res == null || res.Count == 0)
//            {
//                EditorUtility.DisplayDialog("Resources目录配置", "未找到任何Resources目录", "ok");
//                return;
//            }
//            foreach (var r in res)
//            {
//                UnityEngine.Object dir = r.directory;
//                if (r.enabled && dir != null)
//                {
//                    EditorUtility.FocusProjectWindow();
//                    Selection.activeObject = dir;
//                    if (r.isNGUI && BeefBall.presetMap.ContainsKey("ngui-prefabfolder"))
//                    {
//                        BeefBall.presetMap["ngui-prefabfolder"].Export();
//                    }
//                    else
//                    {
//                        BeefBall.presetMap["prefabfolder"].Export();
//                    }
//                }
//            }
//        }

//        private void ExportAllScenes()
//        {
//            var activeScene = EditorSceneManager.GetActiveScene();
//            string currentScenePath = "";
//            if (activeScene != null && activeScene.path != "")
//            {
//                currentScenePath = EditorSceneManager.GetActiveScene().path;
//            }

//            var scenes = UnityEditor.EditorBuildSettings.scenes;
//            foreach (var scene in scenes)
//            {
//                try
//                {
//                    EditorSceneManager.OpenScene(scene.path);
//                    BeefBall.presetMap["scene"].Export();
//                }
//                catch (ArgumentException e)
//                {
//                    // 被添加的Scene不存在，不做处理
//                }
//            }

//            if (currentScenePath != "")
//            {
//                EditorSceneManager.OpenScene(currentScenePath);
//            }
//        }
//    }
//}
//scenes = UnityEditor.EditorBuildSettings.scenes;
////            foreach (var scene in scenes)
////            {
////                try
////                {
////                    EditorSceneManager.OpenScene(scene.path);
////                    BeefBall.presetMap["scene"].Export();
////                }
////                catch (ArgumentException e)
////                {
////                    // 被添加的Scene不存在，不做处理
////                }
////            }

////            if (currentScenePath != "")
////            {
////                EditorSceneManager.OpenScene(currentScenePath);
////            }
////        }
////    }
////}