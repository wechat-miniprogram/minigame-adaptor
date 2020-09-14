using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;

namespace WeChat {

     [CustomEditor(typeof(ConfigEntry))]
    public class ConfigEntryEditor: WXEditor {
        private SerializedProperty globalConfig;
        private SerializedProperty projectExportConfig;
        private SerializedProperty exportDirectoryListConfig;
        private SerializedProperty unityPluginConfig;

        private void OnEnable() {
            globalConfig = serializedObject.FindProperty("globalConfig");
            projectExportConfig = serializedObject.FindProperty("projectExportConfig");
            exportDirectoryListConfig = serializedObject.FindProperty("exportDirectoryListConfig");
            unityPluginConfig = serializedObject.FindProperty("unityPluginConfig");
        }

        private void CreatePropertyField(string label, string hint, SerializedProperty sp) {
            var last = GUILayoutUtility.GetLastRect();
            EditorGUI.PropertyField(
                new Rect(
                    last.x, last.y + EditorGUIUtility.singleLineHeight,
                    EditorGUIUtility.currentViewWidth - 30, EditorGUIUtility.singleLineHeight
                ),
                sp,
                new GUIContent(label, hint)
            );
            for(var i = 0; i < 5; i++) EditorGUILayout.Space();
        }

        public override void OnInspectorGUI() {
            serializedObject.Update();
            var configEntry = target as ConfigEntry;

            EditorGUILayout.LabelField("Global Config Entry", EditorStyles.boldLabel);
            EditorGUI.indentLevel++;            // indent 1

                EditorGUILayout.Space();

                CreatePropertyField("Global Config", "全局配置项", globalConfig);
                CreatePropertyField("Project Export Config", "项目导出配置文件", projectExportConfig);
                CreatePropertyField("Resources Directory Config", "资源文件配置文件", exportDirectoryListConfig);
                CreatePropertyField("Unity Plugin Config", "插件配置文件", unityPluginConfig);

                serializedObject.ApplyModifiedProperties();
            EditorGUI.indentLevel--;            // indent 0
        }
    }
}
