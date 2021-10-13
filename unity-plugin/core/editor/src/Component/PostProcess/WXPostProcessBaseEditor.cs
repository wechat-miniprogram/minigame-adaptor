using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

namespace WeChat {
    public class WXPostProcessBaseEditor
    {
        internal WXPostProcessEffectSetting target { get; private set; }
        internal SerializedObject serializedObject { get; private set; }

        internal SerializedProperty baseProperty;

        internal SerializedProperty activeProperty;

        internal void Init(WXPostProcessEffectSetting target)
        {
            this.target = target;
            this.serializedObject = new SerializedObject(target);
            this.activeProperty = serializedObject.FindProperty("active");
            this.OnEnable();
        }

        public virtual void OnEnable() { }

        public virtual void OnDisable() { }

        public virtual void OnGUI()
        {
            serializedObject.Update();

            SerializedProperty property = serializedObject.GetIterator();
            property.NextVisible(true);
            property.NextVisible(true);
            do
            {
                EditorGUILayout.PropertyField(property);

            } while (property.NextVisible(false));

            serializedObject.ApplyModifiedProperties();
        }
    }
}

