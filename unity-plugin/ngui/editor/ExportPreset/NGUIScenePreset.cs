using System;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat
{
    // 导出场景树中的第一个UIRoot 为Scene2D
    [InitializeOnLoad]
    [DeclarePreset("ngui-rootScene", typeof(NGUIRootExportConfig))]
    internal class NGUISceneExportPreset : ExportPreset
    {

        UIRoot sceneRoot = null;
        GameObject objectRoot = null;

        static NGUISceneExportPreset()
        {
            ExportPreset.registerExportPreset("ngui-rootScene", new NGUISceneExportPreset());
        }

        public NGUISceneExportPreset() : base()
        {
            is2d = true;
        }
        
        public override string GetChineseName()
        {
            return "导出UI场景";
        }

        protected override void DoExport()
        {
            Scene gameScene = SceneManager.GetActiveScene();
            string path = gameScene.path;

            EditorSceneManager.SaveScene(gameScene, path);

            WXNGUITree converter = new WXNGUITree(objectRoot, path, true, true);
            PresetUtil.writeGroup(converter, this);
        }

        public override bool WillPresetShow()
        {
            try
            {
                FindNGUIRootInScene();
                return sceneRoot != null;
            }
            catch (Exception e)
            {
                return false;
            }
        }
 
        private void FindNGUIRootInScene() {
            foreach (GameObject rootObj in SceneManager.GetActiveScene().GetRootGameObjects())
            {
                sceneRoot = rootObj.GetComponent(typeof(UIRoot)) as UIRoot;
                if (sceneRoot)
                {
                    objectRoot = rootObj;
                    return;
                }
                
            }
        }

    }
}