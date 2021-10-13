using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

namespace WeChat {
    [CustomEditor(typeof(WXPostProcessProfile))]
    public class WXPostProcessProfileEditorDefault : Editor
    {
        WXPostProcessProfileEditor editor;
        private void OnEnable()
        {
            editor = new WXPostProcessProfileEditor(target as WXPostProcessProfile);
            editor.OnEnable();
        }

        public override void OnInspectorGUI()
        {
            editor.OnGUI();
        }
    }
}