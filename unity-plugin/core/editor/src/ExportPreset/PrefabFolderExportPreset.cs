using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WeChat
{

    // 导出选中的prefab
    [InitializeOnLoad]
    [DeclarePreset("prefab-folder", typeof(HierarchyExportConfig))]
    class PrefabFolderExportPreset : ExportPreset
    {
        static PrefabFolderExportPreset()
        {
            ExportPreset.registerExportPreset("prefabfolder", new PrefabFolderExportPreset());
        }
        public PrefabFolderExportPreset(): base()
        {
        }

        public override string GetChineseName()
        {
            return "该目录下的所有prefab";
        }

        protected override void DoExport()
        {
            var go = Selection.activeObject;
            string path = AssetDatabase.GetAssetPath(go);
            string[] assetIDs = AssetDatabase.FindAssets("t:Prefab", new string[] { path });

            foreach (string guid in assetIDs)
            {
                exportQueue.Enqueue(guid);
            }

            DequeueAndExport(exportQueue.Count);

        }

        Queue<string> exportQueue = new Queue<string>();
        // 导出一个资源
        private void DequeueAndExport(int maxCount)
        {
            if(maxCount == 0) return;

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
            //RichText.StaticTextCreator[] staicTextCreators = prefabRoot.GetComponentsInChildren<RichText.StaticTextCreator>();
            //if (staicTextCreators != null && staicTextCreators.Length > 0)
            //{
            //    for (int k = 0; k < staicTextCreators.Length; k++)
            //    {
            //        RichText.StaticTextCreator stc = staicTextCreators[k];
            //        stc.ParseStaticText(true);
            //    }
            //}

            WXPrefab wxPrefab = new WXPrefab(prefab, assetPath);
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