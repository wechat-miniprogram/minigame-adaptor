using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.IO;


namespace WeChat {
    [CustomEditor(typeof(WXPostProcess))]
    public class WXPostProcessEditor : Editor
    {
        SerializedProperty m_Profile;
        WXPostProcessProfileEditor editor;
        WXPostProcessProfile lastProfile;
        private void OnEnable()
        {
            m_Profile = serializedObject.FindProperty("profile");
            var profile = m_Profile.objectReferenceValue as WXPostProcessProfile;
            InitEditor(profile);
        }

        private void InitEditor(WXPostProcessProfile profile)
        {
            if (profile != null && profile != lastProfile)
            {
                editor = new WXPostProcessProfileEditor(profile);
                editor.OnEnable();
            }
            lastProfile = profile;
        }

        public override void OnInspectorGUI()
        {
            serializedObject.Update();
            var profile = m_Profile.objectReferenceValue as WXPostProcessProfile;
            InitEditor(profile);
            EditorGUILayout.PropertyField(m_Profile);
            Rect lastRect = GUILayoutUtility.GetLastRect();
            var buttonRect = new Rect(lastRect.x + 60, lastRect.y, 45, 18);
            if (GUI.Button(buttonRect, new GUIContent("New")))
            {
                profile = CreateProfile();
                m_Profile.objectReferenceValue = profile;
            }
            else if (profile != null && editor != null)
            {
                editor.OnGUI();
            }
            serializedObject.ApplyModifiedProperties();
        }

        private WXPostProcessProfile CreateProfile()
        {
            CheckDir();
            var profile = (WXPostProcessProfile)ScriptableObject.CreateInstance(typeof(WXPostProcessProfile));
            int i = 0;
            while (File.Exists(GetNewProfilePath(i)))
            {
                i++;
            }
            AssetDatabase.CreateAsset(profile, GetNewProfilePath(i));
            AssetDatabase.SaveAssets();
            return profile;
        }

        const string profileDir = "Assets/WXEngineAuto/PostProcess";

        private string GetNewProfilePath(int index)
        {
            return string.Format("{0}/profile_{1}.asset", profileDir, index);
        }

        private void CheckDir()
        {
            if (!Directory.Exists(profileDir))
            {
                Directory.CreateDirectory(profileDir);
            }
        }

    }
}
