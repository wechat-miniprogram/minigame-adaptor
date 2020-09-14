using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Reflection;
using System;

namespace WeChat {
    public class WXPostProcessProfileEditor
    {
        private SerializedProperty m_SettingsProperty;
        internal SerializedObject serializedObject { get; private set; }
        internal WXPostProcessProfile target { get; private set; }

        private List<WXPostProcessBaseEditor> editors = new List<WXPostProcessBaseEditor>();

        public WXPostProcessProfileEditor(WXPostProcessProfile profile)
        {
            target = profile;
            serializedObject = new SerializedObject(profile);
        }

        public void OnEnable()
        {
            m_SettingsProperty = serializedObject.FindProperty("settings");

            var profile = target as WXPostProcessProfile;

            for (int i = 0; i < profile.settings.Count; i++)
            {
                var setting = profile.settings[i];
                var editor = AddEditor(setting, m_SettingsProperty.GetArrayElementAtIndex(i));
            }
        }

        private void DrawHeader(
            string title,
            SerializedProperty activeProperty,
            SerializedProperty baseProperty,
            Action removeAction
        )
        {
            var backgroundRect = GUILayoutUtility.GetRect(1f, 17f);

            var labelRect = backgroundRect;
            labelRect.xMin += 32f;
            labelRect.xMax -= 20f;

            var foldoutRect = backgroundRect;
            foldoutRect.y += 1f;
            foldoutRect.width = 13f;
            foldoutRect.height = 13f;

            var toggleRect = backgroundRect;
            toggleRect.x += 16f;
            toggleRect.y += 2f;
            toggleRect.width = 13f;
            toggleRect.height = 13f;

            var menuIcon = (Texture2D)EditorGUIUtility.Load("Builtin Skins/LightSkin/Images/pane options.png");
            var menuRect = new Rect(labelRect.xMax + 4f, labelRect.y + 4f, menuIcon.width, menuIcon.height);

            backgroundRect.xMin = 0f;
            backgroundRect.width += 4f;

            EditorGUI.DrawRect(backgroundRect, new Color(1f, 1f, 1f, 0.2f));

            EditorGUI.LabelField(labelRect, title, EditorStyles.boldLabel);

            baseProperty.serializedObject.Update();
            baseProperty.isExpanded = GUI.Toggle(foldoutRect, baseProperty.isExpanded, GUIContent.none, EditorStyles.foldout);
            baseProperty.serializedObject.ApplyModifiedProperties();

            activeProperty.serializedObject.Update();
            activeProperty.boolValue = GUI.Toggle(toggleRect, activeProperty.boolValue, GUIContent.none, new GUIStyle("ShurikenToggle"));
            activeProperty.serializedObject.ApplyModifiedProperties();

            GUI.DrawTexture(menuRect, menuIcon);

            var e = Event.current;

            if (e.type == EventType.MouseDown)
            {
                if (menuRect.Contains(e.mousePosition))
                {
                    var menu = new GenericMenu();

                    menu.AddItem(new GUIContent("remove"), false, () => removeAction());

                    e.Use();

                    menu.ShowAsContext();
                }
            }
        }

        private void RemoveEffect(int index)
        {
            editors[index].OnDisable();
            editors.RemoveAt(index);

            serializedObject.Update();

            var property = m_SettingsProperty.GetArrayElementAtIndex(index);
            var effect = property.objectReferenceValue;
            property.objectReferenceValue = null;
            m_SettingsProperty.DeleteArrayElementAtIndex(index);

            for (int i = 0; i < editors.Count; i++)
            {
                editors[i].baseProperty = m_SettingsProperty.GetArrayElementAtIndex(i);
            }

            serializedObject.ApplyModifiedProperties();
            Undo.DestroyObjectImmediate(effect);

            AssetDatabase.SaveAssets();
        }

        private void AddEffect(System.Type t)
        {
            var instance = ScriptableObject.CreateInstance(t) as WXPostProcessEffectSetting;
            AssetDatabase.AddObjectToAsset(instance, target);
            instance.hideFlags = HideFlags.HideInHierarchy | HideFlags.HideInInspector;

            serializedObject.Update();
            //Undo.RecordObject(instance, "New Effect");
            m_SettingsProperty.arraySize++;
            var effectProp = m_SettingsProperty.GetArrayElementAtIndex(m_SettingsProperty.arraySize - 1);
            effectProp.objectReferenceValue = instance;
            AddEditor(instance, effectProp);

            serializedObject.ApplyModifiedProperties();

            AssetDatabase.SaveAssets();
        }

        private WXPostProcessBaseEditor AddEditor(WXPostProcessEffectSetting setting, SerializedProperty baseProperty)
        {
            System.Type editorType;
            if (WXPostProcessEnv.PostProcessTypeMap.TryGetValue(setting.GetType(), out editorType))
            {

                var editor = System.Activator.CreateInstance(editorType) as WXPostProcessBaseEditor;
                editors.Add(editor);
                editor.Init(setting);
                editor.baseProperty = baseProperty.Copy();
                return editor;
            }
            Debug.LogErrorFormat("Editor not found for class: {0}", setting.GetType().Name);
            return null;
        }

        public void OnGUI()
        {

            serializedObject.Update();
            for (int i = 0; i < editors.Count; i++)
            {
                int index = i;
                var editor = editors[i];
                
                DrawHeader(
                    GetEffectName(editor.target.GetType()), editor.activeProperty, editor.baseProperty,
                    () => RemoveEffect(index)
                );

                if (editor.baseProperty.isExpanded)
                {
                    editor.OnGUI();
                }
            }

            if (GUILayout.Button("Add Effect...", EditorStyles.miniButton))
            {
                var menu = new GenericMenu();

                foreach (var t in WXPostProcessEnv.PostProcessTypeMap.Keys)
                {
                    menu.AddItem(new GUIContent(GetEffectName(t)), false, () => AddEffect(t));
                }

                menu.ShowAsContext();
            }
            serializedObject.ApplyModifiedProperties();
        }

        private string GetEffectName(System.Type t)
        {
            var attr = wxAttributeUtil.GetAttribute<WXPostProcessEffectNameAttribute>(t);
            if (attr != null)
            {
                return attr.effectName;
            }
            return t.Name;
        }
    }
}

