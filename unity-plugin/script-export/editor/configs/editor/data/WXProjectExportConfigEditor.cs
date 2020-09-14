using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;

namespace WeChat {

     [CustomEditor(typeof(ProjectExportConfig))]
    public class ProjectExportConfigEditor: WXEditor {

        private ReorderableList projectSourcesList;
        private ReorderableList projectExcludesList;
        private ReorderableList projectLibsList;
        private ReorderableList defineMacrosList;

        private void OnEnable() {
            if (ConfigManager.configEntry == null) {
                ConfigManager.Init();
            }
            projectSourcesList  = CreateProjectConfigReorderableList("project.sources", "代码源文件路径");
            projectExcludesList = CreateProjectConfigReorderableList("project.excludes", "忽略目录路径");
            projectLibsList     = CreateProjectConfigReorderableList("project.libs", "依赖库路径");
            defineMacrosList    = EditorHelper.CreateReorderableList("defineMacros", "宏", serializedObject);
        }

        private ReorderableList CreateProjectConfigReorderableList(string propertyName, string propertyLabel) {
            var rList = new ReorderableList(
                serializedObject,
                serializedObject.FindProperty(propertyName),
                false, true, true, true
            );

            rList.drawElementCallback += (Rect rect, int index, bool isActive, bool isFocused) => {
                var element = rList.serializedProperty.GetArrayElementAtIndex(index);
                rect.y += 4;
                var width = EditorGUIUtility.currentViewWidth - 130;

                var pathType = element.FindPropertyRelative("pathType");
                EditorGUI.PropertyField(
                    new Rect(rect.x, rect.y, 100, EditorGUIUtility.singleLineHeight),
                    pathType,
                    GUIContent.none
                );

                var folder = element.FindPropertyRelative("folder");
                if (pathType.enumValueIndex == (int)ProjectExportConfig.ProjectConfigs.FolderOrGlobPath.PathType.Folder) {
                    EditorGUI.BeginChangeCheck();
                    EditorGUI.PropertyField(
                        new Rect(rect.x + 100, rect.y, width, EditorGUIUtility.singleLineHeight),
                        folder,
                        GUIContent.none
                    );
                    if (EditorGUI.EndChangeCheck()) {
                        var assetPath = folder.objectReferenceValue != null ? AssetDatabase.GetAssetPath(folder.objectReferenceValue) : null;
                        if (assetPath != null && !AssetDatabase.IsValidFolder(assetPath)) {
                            EditorUtility.DisplayDialog("Error", "非法文件夹", "Retry");
                            folder.objectReferenceValue = null;
                            folder.serializedObject.Update();
                            folder.serializedObject.ApplyModifiedProperties();
                        }
                    }
                } else {
                    EditorGUI.PropertyField(
                        new Rect(rect.x + 100, rect.y, width, EditorGUIUtility.singleLineHeight),
                        element.FindPropertyRelative("glob"),
                        GUIContent.none
                    );
                }
  
            };

            rList.drawHeaderCallback += (Rect rect) => {
                rect.x -= 16;
                EditorGUI.LabelField(rect, propertyLabel);
            };

            return rList;
        }
        public override void OnInspectorGUI() {
            serializedObject.Update();
            // var projectExportConfig = target as ProjectExportConfig;
            var globIgnoreCase = serializedObject.FindProperty("globIgnoreCase");

            EditorGUILayout.LabelField("代码转换配置", EditorStyles.boldLabel);

            EditorGUI.indentLevel++;
                projectSourcesList.DoLayoutList();
                projectExcludesList.DoLayoutList();
                projectLibsList.DoLayoutList();
                defineMacrosList.DoLayoutList();
                serializedObject.ApplyModifiedProperties();
            EditorGUI.indentLevel--;

            EditorGUILayout.LabelField("其他设置", EditorStyles.boldLabel);

            EditorGUI.indentLevel++;
                EditorGUILayout.BeginHorizontal();
                EditorGUILayout.LabelField(new GUIContent("Glob忽略大小写", "Glob路径匹配忽略大小写"), GUILayout.Width(150));
                EditorGUILayout.PropertyField(globIgnoreCase, GUIContent.none, true, GUILayout.MinWidth(50));
                EditorGUILayout.EndHorizontal();
                // projectExportConfig.globIgnoreCase = EditorGUILayout.ToggleLeft("Glob忽略大小写 ", projectExportConfig.globIgnoreCase);
            EditorGUI.indentLevel--;

            serializedObject.ApplyModifiedProperties();

        }
    }
}
