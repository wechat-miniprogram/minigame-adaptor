using UnityEngine;
using UnityEditor;

namespace WeChat
{
    [CustomEditor(typeof(RawResourceExportConfig))]
    public class RawResourceExportConfigEditor : Editor
    {
        public override void OnInspectorGUI()
        {
            //base.OnInspectorGUI();
            SerializedProperty ignoreAudio = serializedObject.FindProperty("ignoreAudio");
            SerializedProperty ignoreText = serializedObject.FindProperty("ignoreText");

            EditorGUILayout.BeginVertical();
            EditorGUILayout.PropertyField(ignoreAudio, new GUIContent("忽略音频文件"));
            EditorGUILayout.PropertyField(ignoreText, new GUIContent("忽略文本文件"));
            serializedObject.ApplyModifiedProperties();

            EditorGUILayout.EndVertical();
        }
    }
}