using UnityEngine;
using UnityEditor;

namespace WeChat
{
    [CustomEditor(typeof(HierarchyExportConfig))]
    public class HierarchyExportConfigEditor : Editor
    {
        public override void OnInspectorGUI()
        {
            //base.OnInspectorGUI();
            SerializedProperty ignoreNonActive = serializedObject.FindProperty("ignoreNonActive");
            SerializedProperty ignoreParticle = serializedObject.FindProperty("ignoreParticle");

            EditorGUILayout.BeginVertical();
            EditorGUILayout.PropertyField(ignoreNonActive, new GUIContent("忽略非激活节点"));
            EditorGUILayout.PropertyField(ignoreParticle, new GUIContent("忽略粒子系统"));
            serializedObject.ApplyModifiedProperties();

            EditorGUILayout.EndVertical();
        }
    }
}