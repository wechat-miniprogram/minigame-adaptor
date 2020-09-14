using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditorInternal;

namespace WeChat {
    public static class EditorHelper {
        public static void PropertyChangeCheckValidFolder(Rect rect, SerializedProperty element, string label = "") {
            EditorGUI.BeginChangeCheck();
            EditorGUI.PropertyField(
                rect,
                element,
                label == "" ? GUIContent.none : new GUIContent(label)
            );
            if (EditorGUI.EndChangeCheck()) {
                var assetPath = element.objectReferenceValue != null ? AssetDatabase.GetAssetPath(element.objectReferenceValue) : null;
                if (assetPath != null && !AssetDatabase.IsValidFolder(assetPath)) {
                    EditorUtility.DisplayDialog("Error", "invalid directory asset", "Retry");
                    element.objectReferenceValue = null;
                    element.serializedObject.Update();
                    element.serializedObject.ApplyModifiedProperties();
                }
            }
        }
        
        public static ReorderableList CreateReorderableList(string propertyName, string propertyLabel, SerializedObject serializedObject, bool checkFolder = false) {
            var serializedProperty = serializedObject.FindProperty(propertyName);
            var rList = new ReorderableList(
                serializedObject,
                serializedProperty,
                false, true, true, true
            );

            rList.drawElementCallback += (Rect rect, int index, bool isActive, bool isFocused) => {
                var element = rList.serializedProperty.GetArrayElementAtIndex(index);
                rect.y += 4;
                var width = EditorGUIUtility.currentViewWidth - 30;
                var drawRect = new Rect(rect.x, rect.y, width, EditorGUIUtility.singleLineHeight);
                if(checkFolder) {
                    PropertyChangeCheckValidFolder(drawRect, element);
                } else {
                    EditorGUI.PropertyField(
                        drawRect,
                        element,
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

        /**
         * 带文字的分割线
         */
        public static void LabeledSplitLine(string text) {
            EditorGUILayout.Space();
            GUILayout.BeginHorizontal();
            GUIStyle lineStyle = new GUIStyle(GUI.skin.box);
            lineStyle.margin.top = 10;
            GUILayout.Box("", lineStyle, GUILayout.Height(2), GUILayout.Width(10));
            GUIStyle labelStyle = new GUIStyle(GUI.skin.label);
            labelStyle.alignment = TextAnchor.LowerCenter;
            GUILayout.Label(text, labelStyle, GUILayout.ExpandWidth(false));
            GUILayout.Box("", lineStyle, GUILayout.Height(2), GUILayout.ExpandWidth(true));
            GUILayout.EndHorizontal();
        }

        public static int FoldableTitleline(string text, bool fold, bool isCheck)
        {
            bool temp;
            bool temp2;
            EditorGUILayout.BeginHorizontal();
            GUIStyle sceneStyle = new GUIStyle(EditorStyles.foldout);
            sceneStyle.fixedWidth = 10;
            temp = EditorGUILayout.Foldout(fold, "====", true, sceneStyle);
            temp2 = GUILayout.Toggle(isCheck, text, GUILayout.ExpandWidth(false));
            GUILayout.Label("", GUILayout.ExpandWidth(true));
            EditorGUILayout.EndHorizontal();

            int ret = (temp ? 0x10 : 0x00) + (temp2 ? 0x1 : 0x0);
            return ret;
        }
    }
}