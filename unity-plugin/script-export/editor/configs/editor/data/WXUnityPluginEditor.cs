using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;

namespace WeChat {

     [CustomEditor(typeof(UnityPlugin))]
    public class UnityPluginEditor: WXEditor {

        private ReorderableList pluginPathSourcesList;
        private ReorderableList pluginPathExcludesList;
        private ReorderableList pluginPathLibsList;

        private ReorderableList pluginMacros;

        private bool debugPathEditable;

        private SerializedProperty pluginPathPluginRoot;

        private void OnEnable() {
            pluginPathSourcesList  = EditorHelper.CreateReorderableList("pluginPath.sources", "源码路径", serializedObject, true);
            pluginPathExcludesList = EditorHelper.CreateReorderableList("pluginPath.excludes", "忽略路径", serializedObject, true);
            pluginPathLibsList     = EditorHelper.CreateReorderableList("pluginPath.libs", "依赖路径", serializedObject, true);

            pluginMacros           = EditorHelper.CreateReorderableList("defineMacros", "宏", serializedObject);

            pluginPathPluginRoot = serializedObject.FindProperty("pluginPath.pluginRoot");
        }

        // string[] pluginTypes = { "C# 源码", "C# DLL", "C# 源码 & DLL", "C# 源码 & C++ Native DLL", "全部", "其他" };
        string[] pluginStates = { "转换代码", "生成桩代码" };

        public override void OnInspectorGUI() {
            serializedObject.Update();
            var unityPlugin = target as UnityPlugin;

            unityPlugin.enable = EditorGUILayout.ToggleLeft("启用插件", unityPlugin.enable);

            using (new EditorGUI.DisabledScope(!unityPlugin.enable))
            {
                EditorGUILayout.LabelField("基本配置", EditorStyles.boldLabel);

                EditorGUI.indentLevel++;
                    unityPlugin.pluginName = EditorGUILayout.TextField("插件名称", unityPlugin.pluginName);
                    // unityPlugin.type = (UnityPlugin.PluginType)EditorGUILayout.EnumPopup("插件类型", unityPlugin.type);
                    // unityPlugin.type = (UnityPlugin.PluginType)EditorGUILayout.Popup(
                    //     "插件类型",
                    //     (int)unityPlugin.type,
                    //     pluginTypes
                    // );
                EditorGUI.indentLevel--;

                EditorGUILayout.LabelField("路径配置", EditorStyles.boldLabel);

                EditorGUI.indentLevel++;
                    var last = GUILayoutUtility.GetLastRect();
                    EditorHelper.PropertyChangeCheckValidFolder(new Rect(
                            last.x, last.y + EditorGUIUtility.singleLineHeight,
                            EditorGUIUtility.currentViewWidth - 30, EditorGUIUtility.singleLineHeight
                        ),
                        pluginPathPluginRoot,
                        "插件根目录"
                    );
                    
                    for(var i = 0; i < 4; i++) EditorGUILayout.Space();

                    pluginPathSourcesList.DoLayoutList();
                    pluginPathExcludesList.DoLayoutList();
                    pluginPathLibsList.DoLayoutList();
                    serializedObject.ApplyModifiedProperties();
                EditorGUI.indentLevel--;

                EditorGUILayout.LabelField("转换配置", EditorStyles.boldLabel);

                EditorGUI.indentLevel++;
                    pluginMacros.DoLayoutList();
                    serializedObject.ApplyModifiedProperties();
                    // unityPlugin.pluginState = (UnityPlugin.PluginState)EditorGUILayout.EnumPopup("插件类型", unityPlugin.pluginState);
                    unityPlugin.pluginState = (UnityPlugin.PluginState)EditorGUILayout.Popup(
                        "插件类型",
                        (int)unityPlugin.pluginState,
                        pluginStates
                    );
                    if (unityPlugin.pluginState == UnityPlugin.PluginState.stub) {
                        EditorGUILayout.LabelField("桩代码生成配置", EditorStyles.boldLabel);

                        EditorGUI.indentLevel++;
                            unityPlugin.stubConfig.generateStub = EditorGUILayout.ToggleLeft("生成C#桩代码", unityPlugin.stubConfig.generateStub);
                            unityPlugin.stubConfig.generateJSTemplate = EditorGUILayout.ToggleLeft( "生成桩代码JavaScript模板", unityPlugin.stubConfig.generateJSTemplate);
                        EditorGUI.indentLevel--;

                        EditorGUILayout.LabelField("输出文件夹", EditorStyles.boldLabel);

                        EditorGUI.indentLevel++;
                            debugPathEditable = EditorGUILayout.ToggleLeft("调试编辑", debugPathEditable);
                            using (new EditorGUI.DisabledScope(!debugPathEditable)) {
                                unityPlugin.stubPath.stubCSPath = EditorGUILayout.TextField("桩C#代码路径", unityPlugin.stubPath.stubCSPath);
                                unityPlugin.stubPath.stubDLLPath = EditorGUILayout.TextField("桩DLL路径", unityPlugin.stubPath.stubDLLPath);
                                unityPlugin.stubPath.stubJSPath = EditorGUILayout.TextField("JavaScript模板路径", unityPlugin.stubPath.stubJSPath);
                                unityPlugin.stubPath.stubRefCSPath = EditorGUILayout.TextField("桩依赖C#代码路径", unityPlugin.stubPath.stubRefCSPath);
                                unityPlugin.stubPath.stubRefDLLPath = EditorGUILayout.TextField("桩依赖DLL路径", unityPlugin.stubPath.stubRefDLLPath);
                            }
                        EditorGUI.indentLevel--;

                        } else {
                            EditorGUILayout.LabelField("代码转换配置", EditorStyles.boldLabel);
                            EditorGUILayout.LabelField("输出文件夹", EditorStyles.boldLabel);

                            EditorGUI.indentLevel++;
                                debugPathEditable = EditorGUILayout.ToggleLeft("调试编辑", debugPathEditable);
                                using (new EditorGUI.DisabledScope(!debugPathEditable)) {
                                    unityPlugin.convertedPath.convertedJSPath = EditorGUILayout.TextField("转换后JavaScript路径", unityPlugin.convertedPath.convertedJSPath);
                                    unityPlugin.convertedPath.convertedDLLPath = EditorGUILayout.TextField("转换后DLL路径", unityPlugin.convertedPath.convertedDLLPath);
                                }
                            EditorGUI.indentLevel--;

                        }
                EditorGUI.indentLevel--;

            }
        }
    }
}
