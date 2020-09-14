using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;
/**
* prefab导出器，输入prefab实例，输出json，或者直接往context挂东西
*/
namespace WeChat
{

    public class WXUGUITree : WXResource
    {
        private GameObject prefabRoot;
        private string exportName;
        private string prefabPath;
        private bool exportAsScene;
        private bool exportSceneRoot;
        public WXUGUITree(GameObject prefabRoot, string prefabPath, bool exportAsScene, bool rootExport = false)
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
                
                
                Canvas uiRoot = getUIRoot(prefabRoot);
                if (uiRoot != null) {

                    var canvasScaler = uiRoot.GetComponent<CanvasScaler>();
                    if (canvasScaler != null && canvasScaler.uiScaleMode == CanvasScaler.ScaleMode.ScaleWithScreenSize)
                    {
                        
                        resolutionJson.Add(canvasScaler.referenceResolution.x * uiRoot.transform.localScale.x);
                        resolutionJson.Add(canvasScaler.referenceResolution.y * uiRoot.transform.localScale.y);
                        if(canvasScaler.screenMatchMode == CanvasScaler.ScreenMatchMode.MatchWidthOrHeight)
                        {

                            if (canvasScaler.matchWidthOrHeight > 0.75)
                            {
                                configJson.AddField("adaptationType", 0); //以高度适配
                            }else if (canvasScaler.matchWidthOrHeight <0.25)
                            {
                                configJson.AddField("adaptationType", 1); //以宽适配
                            }
                            // 默认居中
                        }
                        
                    }
                    else
                    {
                        RectTransform ct = uiRoot.transform as RectTransform;
                        resolutionJson.Add(ct.rect.width);
                        resolutionJson.Add(ct.rect.height);
                    }
                    
                } else {
                    // 无root情况，使用默认大小
                    resolutionJson.Add(1280);
                    resolutionJson.Add(720);
                }


                configJson.AddField("resolution", resolutionJson);
            }

            //todo add a empty object in prefabRoot。自研引擎的场景根节点不支持挂载componets， 所以强制增加一个空节点
            //Canvas root = getUIRoot(prefabRoot);
            //if(root != null)
            //{
            //    Debug.Log("ugui root is canvas. Add an empty gameobject.");
            //    GameObject newroot = new GameObject();
            //    root.transform.parent = newroot.transform;
            //    prefabRoot = newroot;
            //} else {
            //    Debug.Log("ugui root is not canvas.");
            //}


            // 开始遍历
            WXEntity rootEntity = hierarchyContext.IterateGameObject(prefabRoot);

            prefabJSONObject.AddField("gameObjectList", hierarchyContext.GetGameObjectListJSON());
            prefabJSONObject.AddField("componentList", hierarchyContext.GetComponentListJSON());

            JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
            prefabJSONObject.AddField("version", 2);
            //Debug.Log("Export Prefab " + prefabPath + "  " + hierarchyContext.resourceList.Count);

            foreach (string resource in hierarchyContext.resourceList)
            {
                AddDependencies(resource);
            }

            return prefabJSONObject;
        }

        protected Canvas getUIRoot(GameObject gameObject) {

            if (gameObject == null)
            {
                return null;
            }
            Canvas uiRoot = gameObject.GetComponent(typeof(Canvas)) as Canvas;
            if (uiRoot != null)
            {
                return uiRoot.rootCanvas;
            } else if (gameObject.transform.parent) {
                return getUIRoot(gameObject.transform.parent.gameObject);
            } else {
                return null;   
            }
        }
    }

}