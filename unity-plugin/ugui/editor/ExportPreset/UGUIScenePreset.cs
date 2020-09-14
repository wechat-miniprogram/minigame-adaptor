using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

namespace WeChat
{
    // 导出场景树中的第一个UIRoot 为Scene2D
    [InitializeOnLoad]
    [DeclarePreset("ugui-rootScene", typeof(UGUIRootExportConfig))]
    internal class UGUISceneExportPreset : ExportPreset
    {

        Canvas sceneRoot = null;
        GameObject objectRoot = null;

        static UGUISceneExportPreset()
        {
            ExportPreset.registerExportPreset("ugui-rootScene", new UGUISceneExportPreset());
        }

        public UGUISceneExportPreset() : base()
        {
        }
        
        public override string GetChineseName()
        {
            return "UIRootScene";
        }

        protected override void DoExport()
        {
            Scene gameScene = SceneManager.GetActiveScene();
            string path = gameScene.path;
            WXUGUITree converter = new WXUGUITree(objectRoot, path, true, true);
            PresetUtil.writeGroup(converter, this);
        }

        public override bool WillPresetShow()
        {
            try
            {
                FindUGUIRootInScene();
                return sceneRoot != null;
            }
            catch (Exception e)
            {
                return false;
            }
        }
 
        private void FindUGUIRootInScene()
        {
            foreach (GameObject rootObj in SceneManager.GetActiveScene().GetRootGameObjects())
            {
                sceneRoot = rootObj.GetComponent(typeof(Canvas)) as Canvas;
                if (sceneRoot)
                {
                    objectRoot = rootObj;
                }
                
            }
        }

    }
}