using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

namespace WeChat {
    public class WXPostProcessBloomEditor : WXPostProcessBaseEditor
    {
        SerializedProperty m_Intensity;

        public override void OnEnable()
        {
            m_Intensity = this.serializedObject.FindProperty("intensity");
        }

        public override void OnGUI()
        {
            this.serializedObject.Update();
            EditorGUILayout.PropertyField(m_Intensity);
            this.serializedObject.ApplyModifiedProperties();
        }
    }
}


