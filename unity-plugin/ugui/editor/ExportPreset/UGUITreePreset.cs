using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat
{
    // 导出选中的prefab

    // 后续更新：这里已经支持了导出2D scene。某些变量名和常量还保持prefab只是为了保护历史包袱
    [InitializeOnLoad]
    [DeclarePreset("ugui-prefab", typeof(UGUIExportConfig))]
    internal class UGUITreeExportPreset : ExportPreset
    {
        static UGUITreeExportPreset()
        {
            ExportPreset.registerExportPreset("ugui-prefab", new UGUITreeExportPreset());
        }

        public UGUITreeExportPreset() : base()
        {
        }

        public override string GetChineseName()
        {
            return "选中的ugui节点";
        }

        protected override void DoExport()
        {
            GameObject prefabRoot = (GameObject)Selection.activeObject;
            
            WXUGUITree converter = new WXUGUITree(
                prefabRoot,
                AssetDatabase.GetAssetPath(WXUtility.GetPrefabSource(prefabRoot)),
                (this.exportConfigs as UGUIExportConfig).exportAsScene
            );

            PresetUtil.writeGroup(converter, this/*, (string)(configs.ContainsKey("exportPath") ? configs["exportPath"] : "")*/);
        }

        public override bool WillPresetShow()
        {
            if (Selection.activeObject == null)
            {
                return false;
            }
            try
            {
                return WXUtility.GetPrefabSource(Selection.activeObject);
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}