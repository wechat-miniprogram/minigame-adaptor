using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat
{

    // 导出选中的prefab
    [InitializeOnLoad]
    [DeclarePreset("ugui-prefabfolder", typeof(UGUIExportConfig))]
    internal class UGUIPrefabFolderPreset : ExportPreset
    {
        static UGUIPrefabFolderPreset()
        {
            ExportPreset.registerExportPreset("ugui-prefabfolder", new UGUIPrefabFolderPreset());
        }
        public UGUIPrefabFolderPreset(): base()
        {
        }
        public override string GetChineseName()
        {
            return "该目录下的所有ugui-prefab";
        }

        protected override void DoExport()
        {

             GameObject[] prefabRoots = Selection.gameObjects;

            foreach (GameObject prefabRoot in prefabRoots){
                string path =  AssetDatabase.GetAssetPath(WXUtility.GetPrefabSource(prefabRoot));
                string[] assetIDs = AssetDatabase.FindAssets("t:Prefab", new string[] { path });

                foreach (string guid in assetIDs)
                {
                    exportQueue.Enqueue(guid);
                }
            }

            
            DequeueAndExport(exportQueue.Count);

        }

        Queue<string> exportQueue = new Queue<string>();
        // 导出一个资源
        private void DequeueAndExport(int maxCount)
        {
            string guid = exportQueue.Dequeue();
            string assetPath = AssetDatabase.GUIDToAssetPath(guid);

            EditorUtility.DisplayProgressBar(
                "资源导出",
                assetPath,
                (float)(maxCount - exportQueue.Count - 1) / maxCount
            );

            GameObject prefab = (GameObject)AssetDatabase.LoadAssetAtPath(
                assetPath,
                AssetDatabase.GetMainAssetTypeAtPath(assetPath)
            );
            // prefab
            // 忘了为什么要加这句判断了，资源管理器里的prefab理论上这里返回都是null
            if (WXUtility.GetPrefabSource(prefab))
            {
                DequeueAndExport(maxCount);
                return;
            }

            // 资源管理器里的prefab，GetPrefabSource是null，这里就要实例化之后再取。
            prefab = (GameObject)PrefabUtility.InstantiatePrefab(prefab);
            Selection.activeObject = prefab;
            prefab.transform.position = Vector3.zero;
            prefab.SetActive(true);
            //RichText.StaticTextCreator[] staicTextCreators = prefab.GetComponentsInChildren<RichText.StaticTextCreator>();
            //if (staicTextCreators != null && staicTextCreators.Length > 0)
            //{
            //    for (int k = 0; k < staicTextCreators.Length; k++)
            //    {
            //        RichText.StaticTextCreator stc = staicTextCreators[k];
            //        stc.ParseStaticText(true);
            //    }
            //}

            WXUGUITree wxPrefab = new WXUGUITree(prefab, assetPath, false);
            PresetUtil.writeGroup(wxPrefab, this/*, (string)(configs.ContainsKey("exportPath") ? configs["exportPath"] : "")*/);

            UnityEngine.Object.DestroyImmediate(prefab);


            if (exportQueue.Count == 0)
            {
                EditorUtility.ClearProgressBar();
            }
            else
            {
                DequeueAndExport(maxCount);
            }
        }


        public override bool WillPresetShow()
        {
            return Selection.activeObject != null &&
                AssetDatabase.IsValidFolder(AssetDatabase.GetAssetPath(Selection.activeObject));
        }
    }
}