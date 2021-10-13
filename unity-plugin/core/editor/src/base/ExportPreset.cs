using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using System.IO;
using System;
using System.Reflection;

namespace WeChat 
{

    /**
     * 指定preset所用的ScriptableObject的CustomEditor
     */
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class DeclarePresetAttribute : Attribute
    {
        public readonly Type ExportConfigType;

        public DeclarePresetAttribute(string key, Type exportConfigType)
        {
            this.ExportConfigType = exportConfigType;
        }
    }

    public class ExportConfig : ScriptableObject { }

    /**
     * 导出preset，用于管理一种导出类型
     */
    public abstract class ExportPreset
    {
        public string presetKey;

        public bool is2d = false;

        public ScriptableObject exportConfigs = null;
        protected ExportPreset()
        {
            InitExportConfig();
            BeefBall.onInitializeCheckers.Add(InitExportConfig);
        }

        private void InitExportConfig()
        {
            if (exportConfigs != null)
            {
                return;
            }
            // 从attribute中取得key和ScriptableObject的类型
            GetType().GetCustomAttributes(true);
            Type scriptableObjectType = null;

            // 从Attribute里获得ScriptableObject
#if UNITY_5_5_OR_NEWER
            IList<CustomAttributeData> attributes = CustomAttributeData.GetCustomAttributes(GetType());
            foreach (CustomAttributeData data in attributes) {
				if(data.Constructor.ReflectedType.UnderlyingSystemType == typeof(DeclarePresetAttribute))
                {
                    presetKey = data.ConstructorArguments[0].Value as string;
                    scriptableObjectType = data.ConstructorArguments[1].Value as Type;
                }
            }
#else
            foreach (System.Reflection.CustomAttributeData data in GetType().GetCustomAttributesData())
            {
                if (data.AttributeType == typeof(DeclarePresetAttribute))
                {
                    presetKey = data.ConstructorArguments[0].Value as string;
                    scriptableObjectType = data.ConstructorArguments[1].Value as Type;
                }
            }
#endif

            if (scriptableObjectType != null)
            {
                exportConfigs = DirectoryUtil.GetScriptableObject<ScriptableObject>("preset/" + presetKey);
                if (exportConfigs == null && scriptableObjectType != null)
                {
                    exportConfigs = DirectoryUtil.CreateScriptableObject("preset/" + presetKey + ".asset", scriptableObjectType);
                }
            }
        }

        public abstract string GetChineseName();

        public abstract bool WillPresetShow();

        public void Export() {
            try
            {
                // 尝试更新dependencyHash
                AssetDatabase.ExportPackage("Assets", "dummy_package");
            }
            catch (Exception)
            { }

            ErrorUtil.ExportErrorReporter.cleanWarnCount();
            DoExport();
            if (ErrorUtil.ExportErrorReporter.warnCount != 0)
            {
                Debug.LogError(
                    string.Format("本次导出产生了{0}个警告，请注意修复", ErrorUtil.ExportErrorReporter.warnCount)
                );
            }
        }

        public void Draw()
        {
            if (exportConfigs != null)
            {
                Editor editor = Editor.CreateEditor(exportConfigs);
                editor.OnInspectorGUI();
            }
        }

        protected abstract void DoExport();



        static private Dictionary<string, ExportPreset> presetMap = new Dictionary<string, ExportPreset>();

        static public void registerExportPreset(string name, ExportPreset preset)
        {
            presetMap.Add(name, preset);
        }

        static public ExportPreset GetExportPreset(string name) 
        {
            if (presetMap.ContainsKey(name)) {
                return presetMap[name];
            } 
            return null;
        }

        static public Dictionary<string, ExportPreset>.KeyCollection GetAllPresetKeys()
        {
            return presetMap.Keys;
        }
    }

}