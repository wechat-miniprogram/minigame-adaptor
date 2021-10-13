using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    /**
     * 导出窗口
     *
     */
    public class ExportWindow : EditorWindow
    {
        [MenuItem("微信小游戏/导出", false, 1)]
        static void showExportUI()
        {

            string title = "导出到微信";
#if UNITY_2017_1_OR_NEWER
            ExportWindow window = (ExportWindow)EditorWindow.GetWindow(typeof(ExportWindow));
            window.titleContent = new GUIContent(title);
            window.Show(true);
#elif UNITY_5_5_OR_NEWER
            ExportWindow window = (ExportWindow) EditorWindow.GetWindow (typeof (ExportWindow), true, title);
#endif
        }

        [MenuItem("微信小游戏/清除缓存/清除资源缓存", false, 2)]
        static void cleanCache()
        {
            ExportStore.ResetStorage();
        }

        private void OnFocus()
        {
            ExportStore.CheckCacheConsistent();
        }

        private void OnEnable()
        {
            BeefBall.DoInstallationCheck();
        }

        private void handleClickedOnGUI(
            bool createProjectButtonClicked,
            bool choosePathButtonClicked,
            bool openTargetButtonClicked,
            bool resetButtonClicked,
            bool exportButtonClicked
        )
        {
            if (createProjectButtonClicked)
            {
                string createPath = EditorUtility.SaveFolderPanel("选择创建目录", "WXExport", ""); // + "/";
                if (createPath != "")
                {
                    ProjectCreator.createQuickStartProject(createPath);
                    string unityPath = Path.Combine(createPath, "assets/unity");
                    ExportStore.storagePath = unityPath[unityPath.Length - 1] == '/' ? unityPath : unityPath + "/";
                }
            }
            if (choosePathButtonClicked)
            {
                // 弹出选目录窗口
                string savePath = EditorUtility.SaveFolderPanel("选择你的资源导出目录", "WXExport", ""); // + "/";
                if (savePath != "")
                {
                    ExportStore.storagePath = savePath[savePath.Length - 1] == '/' ? savePath : savePath + "/";
                }
            }
            if (openTargetButtonClicked)
            {
                UnityUtil.ShowInExplorer(ExportStore.storagePath);
            }
            if (resetButtonClicked)
            {
                ExportStore.storagePath = "";
            }
            if (exportButtonClicked)
            {
                // targetPlatform不对的提示
                if (
                    EditorUserBuildSettings.activeBuildTarget != BuildTarget.iOS &&
                    EditorUserBuildSettings.activeBuildTarget != BuildTarget.Android
                )
                {
                    EditorUtility.DisplayDialog("提示", "检测到您目前Unity项目的BuildTarget并非iOS和Android，导出产物所还原的效果可能不一致", "好的");
                }

                try
                {
                    currentPreset.Export();
                }
                catch (Exception e)
                {
                    Debug.LogError(e);
                    EditorUtility.ClearProgressBar();
                }
                BeefBall.OnPresetComplete();
            }
        }

        private ExportPreset currentPreset = null;
        private int selectingPresetIndex = 0;
        private Vector2 exportModeScrollPosition = new Vector2(0, 0);
        private Vector2 verticalScrollPosition = new Vector2(0, 0);
        private void OnGUI()
        {

            verticalScrollPosition = GUILayout.BeginScrollView(verticalScrollPosition, false, false, GUIStyle.none, GUI.skin.verticalScrollbar);
            GUILayout.BeginHorizontal();
            EditorGUILayout.Space();
            GUILayout.BeginVertical();
            EditorGUILayout.Space();

            bool createProjectButtonClicked = false;
            bool choosePathButtonClicked = false;
            bool openTargetButtonClicked = false;
            bool resetButtonClicked = false;
            bool exportButtonClicked = false;
            // 带文本的分割线
            EditorHelper.LabeledSplitLine("1. 目标导出路径");

            // 路径选择 start
            int pathButtonHeight = 28;
            GUIStyle pathLabelStyle = new GUIStyle(GUI.skin.textField);
            pathLabelStyle.fontSize = 12;
            pathLabelStyle.alignment = TextAnchor.MiddleLeft;
            pathLabelStyle.margin.top = 6;
            pathLabelStyle.margin.bottom = 6;

            // 如果没有设置过path，显示创建按钮
            if (ExportStore.storagePath == null || ExportStore.storagePath == "")
            {
                GUILayout.BeginHorizontal();
#if UNITY_2017_1_OR_NEWER
                createProjectButtonClicked = GUILayout.Button("创建小游戏项目模板", GUILayout.Height(pathButtonHeight));
#endif
                choosePathButtonClicked = GUILayout.Button("手动选择导出路径", GUILayout.Height(pathButtonHeight));
                GUILayout.EndHorizontal();
            }
            else
            {
                GUILayout.BeginHorizontal();
                // 路径框
                GUILayout.Label(ExportStore.storagePath, pathLabelStyle, GUILayout.Height(pathButtonHeight - 6), GUILayout.ExpandWidth(true), GUILayout.MaxWidth(EditorGUIUtility.currentViewWidth - 106));
                openTargetButtonClicked = GUILayout.Button("打开", GUILayout.Height(pathButtonHeight), GUILayout.Width(40));
                resetButtonClicked = GUILayout.Button("重选", GUILayout.Height(pathButtonHeight), GUILayout.Width(40));
                GUILayout.EndHorizontal();
                // 路径选择 end

                // 带文本的分割线
                EditorHelper.LabeledSplitLine("2. 导出模式");

                // 模式选择 start

                // 确定本次导出所使用的preset
                List<string> presetNames = new List<string>();
                List<ExportPreset> exportPresets = new List<ExportPreset>();
                foreach (string key in ExportPreset.GetAllPresetKeys())
                {
                    ExportPreset preset = ExportPreset.GetExportPreset(key);
                    if (preset.WillPresetShow())
                    {
                        presetNames.Add(preset.GetChineseName());
                        exportPresets.Add(preset);
                    }
                }
                // 绘制
                exportModeScrollPosition = GUILayout.BeginScrollView(exportModeScrollPosition, false, false, GUILayout.Height(45));
                selectingPresetIndex = GUILayout.Toolbar(
                    selectingPresetIndex,
                    presetNames.ToArray(),
                    new GUIStyle(GUI.skin.button),
#if UNITY_2018_1_OR_NEWER
                        GUI.ToolbarButtonSize.Fixed,
#endif

                    GUILayout.Height(22)
                );
                GUILayout.EndScrollView();
                selectingPresetIndex = Math.Min(selectingPresetIndex, exportPresets.Count - 1);
                EditorGUILayout.Space();
                // 模式选择 end

                // 模式配置 start
                exportPresets[selectingPresetIndex].Draw();
                // 模式配置 end

                // 导出按钮 start

                // 带文本的分割线
                EditorGUILayout.Space();
                EditorGUILayout.Space();
                EditorHelper.LabeledSplitLine("3. 最后一步");

                // 样式定义
                GUIStyle exportButtonStyle = new GUIStyle(GUI.skin.button);
                exportButtonStyle.fontSize = 14;
                exportButtonClicked = GUILayout.Button("导出", exportButtonStyle, GUILayout.Height(40), GUILayout.Width(EditorGUIUtility.currentViewWidth - 20));
                // 导出按钮 end

                currentPreset = exportPresets[selectingPresetIndex];
            }

            GUILayout.EndVertical();
            EditorGUILayout.Space();
            GUILayout.EndHorizontal();
            EditorGUILayout.Space();
            GUILayout.EndScrollView();

            handleClickedOnGUI(
                createProjectButtonClicked,
                choosePathButtonClicked,
                openTargetButtonClicked,
                resetButtonClicked,
                exportButtonClicked
            );
        }

        private void OnSelectionChange()
        {
            // 用户选择的东西发生变更时，很有可能改变导出选项
            Repaint();
        }
    }
}