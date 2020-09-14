using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;
using System.IO;
using System.Linq;

namespace WeChat
{
    /**
     * 在一键导出里，用于编辑所有导scene的路径的ScriptableObject
     *
     */
    [CustomEditor(typeof(ExportSceneList))]
    public class ExportSceneListEditor : WXEditor
    {
        private ReorderableList sceneList;

        private void OnEnable()
        {
            // if (serializedObject == null) {
            //     return;
            // }

            sceneList = new ReorderableList(
                serializedObject,
                serializedObject.FindProperty("exportScenes"),
                false, true, true, true
            );

            sceneList.drawElementCallback += (Rect rect, int index, bool isActive, bool isFocused) =>
            {
                var element = sceneList.serializedProperty.GetArrayElementAtIndex(index);
                rect.y += 4;

                var width = EditorGUIUtility.currentViewWidth - 400;
                var directoryDrawRect = new Rect(rect.x, rect.y, width, EditorGUIUtility.singleLineHeight);
                SerializedProperty scene = element.FindPropertyRelative("scene");
                if (
                    scene.objectReferenceValue != null &&
                    !AssetDatabase.GetAssetPath(scene.objectReferenceValue.GetInstanceID()).EndsWith(".unity")
                )
                {
                    scene.objectReferenceValue = null;
                }
                EditorGUI.PropertyField(
                    directoryDrawRect,
                    scene,
                    GUIContent.none
                );
                
                var exportTypeDrawRect2 = new Rect(rect.x + width, rect.y, 200, EditorGUIUtility.singleLineHeight);
                EditorGUI.PropertyField(
                    exportTypeDrawRect2,
                    element.FindPropertyRelative("isUGUI"),
                    new GUIContent("UGUI 2D场景")
                );

                var exportTypeDrawRect = new Rect(rect.x + width + 200, rect.y, 200, EditorGUIUtility.singleLineHeight);
                EditorGUI.PropertyField(
                    exportTypeDrawRect,
                    element.FindPropertyRelative("isNGUI"),
                    new GUIContent("NGUI 2D场景")
                );
                
                
                
            };

            sceneList.drawHeaderCallback += (Rect rect) =>
            {
                rect.x = rect.x - 16;
                EditorGUI.LabelField(rect, "场景列表");

                rect.x = rect.width - rect.x - 135;
                GUIStyle style = new GUIStyle(GUI.skin.label);
                style.normal.textColor = new Color(0, 0, 0.8f);
                if (GUI.Button(rect, "重设为所有场景", style))
                {
                    SearchAllScenes();
                    EditorUtility.SetDirty(ConfigManager.configEntry.exportDirectoryListConfig);
                    AssetDatabase.SaveAssets();
                }
            };
        }

        public override void OnInspectorGUI()
        {
            serializedObject.Update();
            var resourcesDirectoryConfig = target as ExportDirectoryList;

            EditorGUI.indentLevel++;            // indent 1
                sceneList.DoLayoutList();
            EditorGUI.indentLevel--;            // indent 0

            serializedObject.ApplyModifiedProperties();
        }

        public void SearchAllScenes()
        {
            ExportSceneList exportSceneList = target as ExportSceneList;
            if (exportSceneList.exportScenes == null)
            {
                exportSceneList.exportScenes = new List<ExportSceneList.ExportSceneItem>();
            }
            else
            {
                exportSceneList.exportScenes.Clear();
            }

            var scenes = UnityEditor.EditorBuildSettings.scenes;
            foreach (var scene in scenes)
            {
                try
                {
                    exportSceneList.exportScenes.Add(new ExportSceneList.ExportSceneItem(scene.path));
                }
                catch (ArgumentException e)
                {
                    // 被添加的Scene不存在，不做处理
                }
            }

        }

    }
}