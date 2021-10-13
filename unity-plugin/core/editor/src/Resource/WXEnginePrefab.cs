using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
/**
* prefab导出器，输入prefab实例，输出json，或者直接往context挂东西
*/
namespace WeChat
{

    public class WXPrefab : WXResource
    {
        private GameObject prefabRoot;
        private string exportName;
        private string prefabPath;
        public WXPrefab(GameObject prefabRoot, string prefabPath): base(prefabPath)
        {
            if (!prefabPath.EndsWith(".prefab")) {
                this.prefabPath = prefabPath + ".prefab";
            } else {
                this.prefabPath = prefabPath;
            }

            this.prefabRoot = prefabRoot;
            exportName = WXUtility.GetFileNameFromPath(prefabPath);

            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                    .setResource(this)
                    .setGameObject(prefabRoot)
                    .error(ErrorUtil.ErrorCode.Prefab_PathError, "Prefab文件的unity路径为空");
            }
        }

        protected override string GetResourceType()
        {
            return "prefab";
        }

        public override string GetExportPath()
        {
            return prefabPath;
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath);
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
            metaJson.AddField("type", /*WXBeefBall.HierarchyType == WXBeefBall.EHierarchyType.TwoD ? "2D" : */"3D");

            JSONObject configJson = new JSONObject(JSONObject.Type.OBJECT);
            metaJson.AddField("config", configJson);
            //if (WXBeefBall.HierarchyType == WXBeefBall.EHierarchyType.TwoD)
            //{
            //    JSONObject resolutionJson = new JSONObject(JSONObject.Type.ARRAY);
            //    resolutionJson.Add(1280);
            //    resolutionJson.Add(720);
            //    configJson.AddField("resolution", resolutionJson);
            //}


            // 开始遍历
            WXEntity rootEntity = /*WXBeefBall.HierarchyType == WXBeefBall.EHierarchyType.TwoD ?
                hierarchyContext.Iterate2DGameObject(prefabRoot) :
                hierarchyContext.Iterate3DGameObject(prefabRoot);*/hierarchyContext.IterateGameObject(prefabRoot, null);

            prefabJSONObject.AddField("gameObjectList", hierarchyContext.GetGameObjectListJSON());
            prefabJSONObject.AddField("componentList", hierarchyContext.GetComponentListJSON());

            JSONObject editorInfo = new JSONObject(JSONObject.Type.OBJECT);
            editorInfo.AddField("assetVersion", 2);
            prefabJSONObject.AddField("editorInfo", editorInfo);
            Debug.Log("Export Prefab " + prefabPath + "  " + hierarchyContext.resourceList.Count);
            //WXResourceStore.AddJSONResource(
            //    prefabPath,
            //    "prefab",
            //    prefabJSONObject,
            //    metadata,
            //    hierarchyContext.resourceList,
            //    assetVersion

            //    //AssetDatabase.GetAssetDependencyHash(prefabPath).ToString()
            //);

            //return prefabPath;
            foreach (string resource in hierarchyContext.resourceList)
            {
                AddDependencies(resource);
            }

            return prefabJSONObject;
        }
    }
}