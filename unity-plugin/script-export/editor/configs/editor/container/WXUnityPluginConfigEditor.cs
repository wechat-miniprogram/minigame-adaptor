using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;

namespace WeChat {

     [CustomEditor(typeof(UnityPluginConfig))]
    public class UnityPluginConfigEditor: WXEditor {
        private ReorderableList unityPlugins;
        private PluginListView listView;


        private void OnEnable() {
            if (ConfigManager.configEntry == null) {
                ConfigManager.Init();
            }
            unityPlugins = EditorHelper.CreateReorderableList("unityPlugins", "工程插件列表", serializedObject);
            // unityPlugins = new ReorderableList(
            //     serializedObject,
            //     serializedObject.FindProperty("unityPlugins"),
            //     false, true, true, true
            // );

            // unityPlugins.drawElementCallback += (Rect rect, int index, bool isActive, bool isFocused) =>
            // {
            //     var element = unityPlugins.serializedProperty.GetArrayElementAtIndex(index);
            //     rect.y += 4;

            //     var width = EditorGUIUtility.currentViewWidth - 200;
            //     var pluginDrawRect = new Rect(rect.x, rect.y, width, EditorGUIUtility.singleLineHeight);
            //     SerializedProperty plugin = element;
            //     if (plugin.objectReferenceValue != null)
            //     {
            //         plugin.objectReferenceValue = null;
            //     }
            //     EditorGUI.PropertyField(
            //         pluginDrawRect,
            //         plugin,
            //         GUIContent.none
            //     );

            //     // EditorGUI.PropertyField(
            //     //     enableDrawRect,
            //     //     element.FindPropertyRelative("enable"),
            //     //     new GUIContent("Enable")
            //     // );
            // };

            unityPlugins.onAddCallback += (ReorderableList list) => {
                // add existed plugins
                var pluginConfig = target as UnityPluginConfig;
                if (pluginConfig.unityPlugins != null && pluginConfig.unityPlugins.Count == 0) {
                    var configs = DirectoryBuilder.RegisterDirectory("config", new DirectoryStructure("Configs"));
                    var _path = configs["ScriptableObject"].GetFilePath("bridge/plugins").PathToAssets();
                    // Debug.Log(_path);
                    var pluginsGUID = AssetDatabase.FindAssets("t:UnityPlugin", new[] { _path });
                    Debug.Log("No plugins in List, add " + pluginsGUID.Length);
                    if (pluginsGUID != null) {
                        foreach (string plugin in pluginsGUID) {
                            var soPath = AssetDatabase.GUIDToAssetPath(plugin);
                            var so = AssetDatabase.LoadAssetAtPath<UnityPlugin>(soPath);
                            pluginConfig.unityPlugins.Add(so);
                        }
                    }
                }

                // Debug.Log("!!!");
                listView = (PluginListView)EditorWindow.GetWindow(typeof(PluginListView), true, "快速选择插件文件夹", true);
                listView.IterateAllDirectories();
                listView.Show(true);

                listView.onAddCallback = (UnityPlugin plugin) => {
                    Debug.Log("Add Plugin : " + plugin.pluginName);
                    pluginConfig.unityPlugins.Add(plugin);
                    
                    EditorUtility.SetDirty(pluginConfig);
                    AssetDatabase.SaveAssets();
                    // TODO: Repaint
                };

                // Debug.Log("setdirty");
                EditorUtility.SetDirty(pluginConfig);
                AssetDatabase.SaveAssets();
            };
        }

        public override void OnInspectorGUI() {
            serializedObject.Update();

            // EditorGUILayout.LabelField("工程插件列表", EditorStyles.boldLabel);
            EditorGUI.indentLevel++;            // indent 1
                unityPlugins.DoLayoutList();
            EditorGUI.indentLevel--;            // indent 0

            serializedObject.ApplyModifiedProperties();
        }
        
    }
}