using UnityEngine;
using UnityEditor;

namespace WeChat
{
    [CustomEditor(typeof(NGUIExportConfig))]
    internal class NGUIExportConfigEditor : Editor
    {
        public override void OnInspectorGUI()
        {
            //base.OnInspectorGUI();
            SerializedProperty ignoreNonActive = serializedObject.FindProperty("ignoreNonActive");
            SerializedProperty ignoreParticle = serializedObject.FindProperty("ignoreParticle");
            SerializedProperty exportAsScene = serializedObject.FindProperty("exportAsScene");

            EditorGUILayout.BeginVertical();
            EditorGUILayout.PropertyField(ignoreNonActive, new GUIContent("忽略非激活节点"));
            EditorGUILayout.PropertyField(ignoreParticle, new GUIContent("忽略粒子系统"));
            EditorGUILayout.PropertyField(exportAsScene, new GUIContent("导出为场景"));
            serializedObject.ApplyModifiedProperties();

            EditorGUILayout.EndVertical();
        }
    }
}