using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat
{
    [InitializeOnLoad]
    [DeclarePreset("scene", typeof(HierarchyExportConfig))]
    public class SceneExportPreset : ExportPreset
    {
        static SceneExportPreset()
        {
            ExportPreset.registerExportPreset("scene", new SceneExportPreset());
        }

        public SceneExportPreset() : base()
        {
        }

        public override string GetChineseName()
        {
            return "当前场景";
        }

        protected override void DoExport()
        {
            Scene gameScene = SceneManager.GetActiveScene();

            GameObject[] root = gameScene.GetRootGameObjects();
            List<GameObject> rootList = new List<GameObject>();
            
            foreach (GameObject obj in root)
            {
                // obj.transform.SetParent(dummySceneRootGO.transform);
                rootList.Add(obj);
            }

            GameObject dummySceneRootGO = new GameObject("sceneDummyRoot");
            foreach (GameObject obj in rootList) {
                obj.transform.SetParent(dummySceneRootGO.transform);
            }
            EditorSceneManager.SaveScene(gameScene, gameScene.path);

            // WXUtility.TraverseSceneTreeToSave(dummySceneRootGO, gameScene);

            WXScene converter = new WXScene(gameScene, gameScene.path);
            PresetUtil.writeGroup(converter, this/*, (string)(configs.ContainsKey("exportPath") ? configs["exportPath"] : "")*/);

            List<Transform> transList = new List<Transform>();
            foreach (Transform child in dummySceneRootGO.transform)
            {
                transList.Add(child);
            }
            foreach (Transform child in transList) {
                child.SetParent(null);
            }
            UnityEngine.Object.DestroyImmediate(dummySceneRootGO);
            EditorSceneManager.SaveScene(gameScene, gameScene.path);
        }

        public override bool WillPresetShow()
        {
            return true;
            //return Selection.activeObject == null;
        }

    }
}