using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
/**
* prefab导出器，输入prefab实例，输出json，或者直接往context挂东西
*/
namespace WeChat
{

    public class WXNGUITree : WXResource
    {
        private GameObject prefabRoot;
        private string exportName;
        private string prefabPath;
        private bool exportAsScene;
        private bool exportSceneRoot;
        public WXNGUITree(GameObject prefabRoot, string prefabPath, bool exportAsScene, bool rootExport = false): base(prefabPath)
        {
            this.prefabRoot = prefabRoot;
            this.prefabPath = prefabPath;
            this.exportAsScene = exportAsScene;
            this.exportSceneRoot = rootExport;

            exportName = WXUtility.GetFileNameFromPath(prefabPath);
        }

        public override string GetHash()
        {
            if (exportAsScene) {
                return WXUtility.GetMD5FromString(prefabPath);
            }
            return WXUtility.GetMD5FromAssetPath(prefabPath);
        }

        public override string GetExportPath()
        {
            if (exportSceneRoot)
            {
                prefabPath = prefabPath.Replace(".unity", ".scene");
            }
            else if (exportAsScene)
            {
                prefabPath = prefabPath.Replace("prefab", "scene");
            }
            return prefabPath;
        }

        protected override string GetResourceType()
        {
            return exportAsScene ? "scene" : "prefab";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            WXHierarchyContext hierarchyContext = new WXHierarchyContext(preset, prefabPath);

            hierarchyContext.prefab2dType = typeof(WXNGUITree);

            // 初始化输出的JSON对象
            JSONObject prefabJSONObject = new JSONObject(JSONObject.Type.OBJECT);

            JSONObject metaJson = new JSONObject(JSONObject.Type.OBJECT);
            prefabJSONObject.AddField("meta", metaJson);


            // 填充meta
            metaJson.AddField("name", exportName);
            metaJson.AddField("type", "2D");

            if (exportAsScene)
            {

                JSONObject configJson = new JSONObject(JSONObject.Type.OBJECT);
                metaJson.AddField("config", configJson);

                JSONObject resolutionJson = new JSONObject(JSONObject.Type.ARRAY);

                UIRoot uiRoot = getUIRoot(prefabRoot);
                if (uiRoot != null) {
                    Debug.Log("uiRoot is");
                    // var a = JsonUtility.ToJson(uiRoot, true);
                    // Debug.Log(a);
                    // Debug.Log(uiRoot.activeHeight);
                    // Debug.Log(uiRoot.manualWidth);
                    // Debug.Log(uiRoot.manualHeight);

                    UIRoot.Scaling scalingStyle = uiRoot.scalingStyle;
                    configJson.AddField("scalingStyle", (int)scalingStyle);
                    configJson.AddField("manualWidth", uiRoot.manualWidth);
                    configJson.AddField("manualHeight", uiRoot.manualHeight);
                    configJson.AddField("minimumHeight", uiRoot.minimumHeight);
                    configJson.AddField("maximumHeight", uiRoot.maximumHeight);
                    configJson.AddField("fitWidth", uiRoot.fitWidth);
                    configJson.AddField("fitHeight", uiRoot.fitHeight);
                    configJson.AddField("adjustByDPI", uiRoot.adjustByDPI);
                    configJson.AddField("shrinkPortraitUI", uiRoot.shrinkPortraitUI);

                    if (scalingStyle == UIRoot.Scaling.Flexible) {
                        // 目前引擎没有对Flexible这种情况的支持，所以默认先导出一个假定的resolution
                        resolutionJson.Add(uiRoot.activeHeight);
                        resolutionJson.Add(uiRoot.activeHeight);
                    } else {
                        resolutionJson.Add(uiRoot.manualWidth);
                        resolutionJson.Add(uiRoot.manualHeight);
                    }
                } else {
                    // 无root情况，使用默认大小
                    resolutionJson.Add(1280);
                    resolutionJson.Add(720);
                }

                configJson.AddField("resolution", resolutionJson);
            }

			// 开始遍历
			WXEntity rootEntity = hierarchyContext.IterateGameObject(prefabRoot);

            prefabJSONObject.AddField("gameObjectList", hierarchyContext.GetGameObjectListJSON());
            prefabJSONObject.AddField("componentList", hierarchyContext.GetComponentListJSON());

            JSONObject editorInfo = new JSONObject(JSONObject.Type.OBJECT);
            editorInfo.AddField("assetVersion", 2);
            prefabJSONObject.AddField("editorInfo", editorInfo);
            //Debug.Log("Export Prefab " + prefabPath + "  " + hierarchyContext.resourceList.Count);

            foreach (string resource in hierarchyContext.resourceList)
            {
                AddDependencies(resource);
            }

            return prefabJSONObject;
        }

        protected UIRoot getUIRoot(GameObject gameObject) {

            UIRoot uiRoot = gameObject.GetComponent(typeof(UIRoot)) as UIRoot;
            if (uiRoot != null)
            {
                return uiRoot;
            } else if (gameObject.transform.parent) {
                return getUIRoot(gameObject.transform.parent.gameObject);
            } else {
                return null;   
            }
        }
    }

}