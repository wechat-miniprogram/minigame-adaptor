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
     * 在一键导出里，用于编辑所有导prefab的路径的ScriptableObject
     *
     */
    [CustomEditor(typeof(ExportDirectoryList))]
    public class ExportDirectoryListEditor : WXEditor
    {
        private ReorderableList directoryList;

        private void OnEnable()
        {
            // if (serializedObject == null) {
            //     return;
            // }

            directoryList = new ReorderableList(
                serializedObject,
                serializedObject.FindProperty("exportDirectories"),
                false, true, true, true
            );

            directoryList.drawElementCallback += (Rect rect, int index, bool isActive, bool isFocused) =>
            {
                var element = directoryList.serializedProperty.GetArrayElementAtIndex(index);
                rect.y += 4;

                var width = EditorGUIUtility.currentViewWidth - 400;
                var directoryDrawRect = new Rect(rect.x, rect.y, width, EditorGUIUtility.singleLineHeight);
                SerializedProperty directory = element.FindPropertyRelative("directory");
                if (
                    directory.objectReferenceValue != null &&
                    !AssetDatabase.IsValidFolder(
                        AssetDatabase.GetAssetPath(directory.objectReferenceValue.GetInstanceID())
                    )
                )
                {
                    directory.objectReferenceValue = null;
                }
                EditorGUI.PropertyField(
                    directoryDrawRect,
                    directory,
                    GUIContent.none
                );

                /*
                var exportTypeDrawRect = new Rect(rect.x + width, rect.y, 200, EditorGUIUtility.singleLineHeight);
                EditorGUI.PropertyField(
                    exportTypeDrawRect,
                    element.FindPropertyRelative("isNGUI"),
                    new GUIContent("以NGUI形式导出")
                );
                var exportTypeDrawRect2 = new Rect(rect.x + width + 200, rect.y, 200, EditorGUIUtility.singleLineHeight);
                EditorGUI.PropertyField(
                    exportTypeDrawRect2,
                    element.FindPropertyRelative("isUGUI"),
                    new GUIContent("以UGUI形式导出")
                ); */
            };

            directoryList.drawHeaderCallback += (Rect rect) =>
            {
                rect.x = rect.x - 16;
                EditorGUI.LabelField(rect, "prefab目录列表");

                rect.x = rect.width - rect.x - 135;
                GUIStyle style = new GUIStyle(GUI.skin.label);
                style.normal.textColor = new Color(0, 0, 0.8f);
                if (GUI.Button(rect, "重设为所有resources目录", style))
                {
                    SearchAndSaveAllResourcesDirectories();
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
            directoryList.DoLayoutList();
            EditorGUI.indentLevel--;            // indent 0

            serializedObject.ApplyModifiedProperties();
        }


        public void SearchAndSaveAllResourcesDirectories()
        {
            var rootPath = Application.dataPath;
            string[] blackList = {
                "unity-export",
                "Editor",
                "editor",
                "WeChat"
            };

            var dirs = Directory.EnumerateDirectories(rootPath, "*esources", SearchOption.AllDirectories)
                                    .Where(d =>
                                    {
                                        foreach (var b in blackList)
                                        {
                                            if (d.IndexOf(b) >= 0)
                                            {
                                                return false;
                                            }
                                        }
                                        return true;
                                    })
                                    .Where(d => d.IndexOf("Resources") >= 0 || d.IndexOf("resources") >= 0)
                                    .Select(d =>
                                    {
                                        return d.PathToAssets();
                                    });

            ExportDirectoryList exportDirectoryList = target as ExportDirectoryList;
            if (exportDirectoryList.exportDirectories == null)
            {
                exportDirectoryList.exportDirectories = new List<ExportDirectoryList.ExportDirectoryItem>();
            }
            else
            {
                exportDirectoryList.exportDirectories.Clear();
            }
            foreach (string path in dirs)
            {
                exportDirectoryList.exportDirectories.Add(new ExportDirectoryList.ExportDirectoryItem(path));
            }
            //Debug.Log(serializedObject.FindProperty("exportDirectories") as List<ExportDirectoryItem>);
            //List<string> list = ;

            // create new ResourcesDirectory ScriptableObject
            
            //var i = ConfigManager.configEntry.resourcesDirectoryConfig.exportDirectories.Count + 1;
            //foreach (var dir in dirs.Except(existed))
            //{
            //    var so = ScriptableObject.CreateInstance(typeof(ExportDirectoryItem)) as ExportDirectoryItem;
            //    so.directory = AssetDatabase.LoadAssetAtPath(dir, typeof(UnityEngine.Object));

            //    var dstPath = Path.Combine(ConfigManager.resourcesPath.PathToAssets(), "WX_RES_DIRECTORY_" + i + ".asset");
            //    AssetDatabase.CreateAsset(so, dstPath);
            //    i++;
            //}
            //AssetDatabase.SaveAssets();
            //AssetDatabase.Refresh();
        }
    }
}