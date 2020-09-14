using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;

namespace WeChat {

     [CustomEditor(typeof(GlobalConfig))]
    public class GlobalConfigEditor: WXEditor {

        private void OnEnable() {
 
        }
        public override void OnInspectorGUI() {
            serializedObject.Update();
            // var globalConfig = target as GlobalConfig;

            SerializedProperty isWXBridgePlugin = serializedObject.FindProperty("isWXBridgePlugin");
            SerializedProperty isWXBridgePluginAdaptor = serializedObject.FindProperty("isWXBridgePluginAdaptor");

            // EditorGUILayout.LabelField("全局配置", EditorStyles.boldLabel);

            EditorGUI.indentLevel++;
                EditorGUILayout.BeginVertical();
                    EditorGUILayout.BeginHorizontal();
                    EditorGUILayout.LabelField(new GUIContent("使用Adaptor引擎插件framework", "使用Adaptor小游戏插件，包含代码桥接核心模块"), GUILayout.Width(200));
                    EditorGUILayout.PropertyField(isWXBridgePlugin, GUIContent.none, true, GUILayout.MinWidth(50));
                    EditorGUILayout.EndHorizontal();

                    if (isWXBridgePlugin.boolValue) {
                        EditorGUILayout.BeginHorizontal();
                        EditorGUILayout.LabelField(new GUIContent("使用Adaptor引擎插件runtime", "使用Adaptor小游戏插件，并使用runtime功能适配模块"), GUILayout.Width(200));
                        EditorGUILayout.PropertyField(isWXBridgePluginAdaptor, GUIContent.none, true, GUILayout.MinWidth(50));
                        EditorGUILayout.EndHorizontal();
                    } else {
                        isWXBridgePluginAdaptor.boolValue = false;
                    }

                EditorGUILayout.EndVertical();
                // globalConfig.isWXBridgePlugin = EditorGUILayout.Toggle("使用Adaptor引擎插件", globalConfig.isWXBridgePlugin, GUILayout.ExpandWidth(true));
                // globalConfig.isWXBridgePluginAdaptor = EditorGUILayout.Toggle("使用Adaptor引擎插件内置minigame-adaptor.js", globalConfig.isWXBridgePluginAdaptor, GUILayout.ExpandWidth(true));
            EditorGUI.indentLevel--;
            EditorGUILayout.Space();

            serializedObject.ApplyModifiedProperties();
        }
    }
}
