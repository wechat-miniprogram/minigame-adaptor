using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat
{
    [InitializeOnLoad]
    [DeclarePreset("asset", typeof(HierarchyExportConfig))]
    class AssetExportPreset : ExportPreset
    {
        // 外部指定assetIDs，用于使用脚本驱动导出的情况
        public string[] specifiedAssetIDs = null;

        static AssetExportPreset()
        {
            ExportPreset.registerExportPreset("asset", new AssetExportPreset());
        }

        public AssetExportPreset() : base()
        {
        }

        public override string GetChineseName()
        {
            return "选中的资源";
        }

        protected override void DoExport()
        {
            string[] assetIDs;
            Queue<string> selectionAssetGuids = new Queue<string>();
            // 导出批量文件
            assetIDs = specifiedAssetIDs != null ? specifiedAssetIDs : Selection.assetGUIDs;

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
            string guid = exportQueue.Dequeue();
            string assetPath = AssetDatabase.GUIDToAssetPath(guid);

            EditorUtility.DisplayProgressBar(
                "资源导出",
                assetPath,
                (float)(maxCount - exportQueue.Count - 1) / maxCount
            );

            // texture2d
            if (AssetDatabase.GetMainAssetTypeAtPath(assetPath) == typeof(Texture2D))
            {
                Texture2D texture = (Texture2D)AssetDatabase.LoadAssetAtPath(assetPath, AssetDatabase.GetMainAssetTypeAtPath(assetPath));

                try
                {
                    WXTexture converter = new WXTexture(texture);
                    PresetUtil.writeGroup(converter, this/*, (string)(configs.ContainsKey("exportPath") ? configs["exportPath"] : "")*/);
                }
                catch (Exception e)
                {
                    Debug.Log(e.Message);
                    Debug.LogError(e.StackTrace);
                }
                finally
                {
                    if (exportQueue.Count == 0)
                    {
                        EditorUtility.ClearProgressBar();
                    }
                    else
                    {
                        DequeueAndExport(maxCount);
                    }

                }
                return;
            }

            // texturecube
            if (AssetDatabase.GetMainAssetTypeAtPath(assetPath) == typeof(Cubemap))
            {

                Cubemap textureCube = (Cubemap)AssetDatabase.LoadAssetAtPath(assetPath, AssetDatabase.GetMainAssetTypeAtPath(assetPath));

                try
                {
                    WXTextureCube converter =new WXTextureCube(textureCube);
                    PresetUtil.writeGroup(converter, this/*, (string)(configs.ContainsKey("exportPath") ? configs["exportPath"] : "")*/);
                }
                catch (Exception e)
                {
                    Debug.Log(e.Message);
                    Debug.LogError(e.StackTrace);
                }
                finally
                {
                    if (exportQueue.Count == 0)
                    {
                        EditorUtility.ClearProgressBar();
                    }
                    else
                    {
                        DequeueAndExport(maxCount);
                    }

                }
                return;
            }

            // gameObject
            if (AssetDatabase.GetMainAssetTypeAtPath(assetPath) == typeof(GameObject))
            {
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
            }

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
            return Selection.assetGUIDs.Length > 0;
        }
    }
}