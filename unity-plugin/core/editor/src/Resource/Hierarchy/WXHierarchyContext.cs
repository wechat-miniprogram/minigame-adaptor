using System;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using System.Reflection;

namespace WeChat
{
    /**
     * 一个场景或一个prefab导出过程中的context
     */
    public class WXHierarchyContext
    {
        private readonly List<WXEntity> gameObjectList;
        private readonly List<WXComponent> componentList;
        public readonly List<string> resourceList;
        public ExportPreset preset;
        public string resourcePath;
        public Type prefab2dType;

        // 排重用，同一个gameObject可能被转换过两次
        private Dictionary<string, WXComponent> componentDictionary;

        private Dictionary<GameObject, WXEntity> prefabRootDict;

        // 记录当前导出的Hierarchy的Root节点
        private bool _root = false;
        public GameObject Root { get; private set; }

        private bool shouldExport(GameObject go)
        {

            if (
                !(preset.exportConfigs as HierarchyExportConfig).ignoreNonActive ||
                go.activeSelf
            )
            {

                if (go.GetComponent<ParticleSystem>() == null)
                {
                    return true;

                }
                else
                {
                    if (!(preset.exportConfigs as HierarchyExportConfig).ignoreParticle)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public WXHierarchyContext(ExportPreset _preset, string _resourcePath)
        {
            // 初始化列表
            gameObjectList = new List<WXEntity>();
            componentList = new List<WXComponent>();
            componentDictionary = new Dictionary<string, WXComponent>();
            resourceList = new List<string>();
            prefabRootDict = new Dictionary<GameObject, WXEntity>();
            preset = _preset;
            resourcePath = _resourcePath;
        }

        public JSONObject GetGameObjectListJSON()
        {
            JSONObject gameObjectListJSON = new JSONObject(JSONObject.Type.ARRAY);
            // list<T> 转化为jsonObject
            int index = 0;
            foreach (WXEntity gameObject in gameObjectList)
            {

                var result = gameObject.ToJSON();
                result.AddField("_index", index++);
                if (result == null)
                {
                    EditorUtility.DisplayDialog("Error", "导出gameObject为空 " + gameObject.name, "确定");

                }
                else
                {
                    gameObjectListJSON.Add(result);

                }
            }
            return gameObjectListJSON;
        }

        public JSONObject GetComponentListJSON()
        {
            JSONObject componentListJSON = new JSONObject(JSONObject.Type.ARRAY);
            int index = 0;
            foreach (WXComponent component in componentList)
            {
                var result = component.GetJSON();
                if (component.filePath != null && component.filePath != "" && component.filePath != ".prefab") { // 只有prefab中的component可以获取其filePath
                    result.AddField("__prefab", component.filePath);
                }
                result.AddField("__fileId", WXUtility.GenerateLongByString(component.objectId.ToString() + component.getTypeName()).ToString());

                result.AddField("_index", index++);
                if (result == null)
                {
                    EditorUtility.DisplayDialog("Error", "导出compoennt为空 " + component.getTypeName(), "确定");

                }
                else
                {
                    componentListJSON.Add(result);

                }
            }
            return componentListJSON;
        }

        private static SortedList<string, Action<GameObject, WXEntity, WXHierarchyContext, ExportPreset>> ComponentConverters = new SortedList<string, Action<GameObject, WXEntity, WXHierarchyContext, ExportPreset>>();

        public static void registerComponentConverter(string priority, Action<GameObject, WXEntity, WXHierarchyContext, ExportPreset> entityConverter)
        {
            ComponentConverters.Add(priority, entityConverter);
        }

        /**
         * 递归转换所有UnityGameObject为WXBBEntity
         */
        public WXEntity IterateGameObject(GameObject go, WXEntity parent = null)
        {
            //  记录遍历起点的根节点
            if (!_root) {
                _root = true;
                Root = go;
            }

            WXEntity entity = MakeEntity(go);// new WXEntity(go);
            // 处理prefab根节点，并生成prefab资源文件并存储prefab根节点以便于之后生成diffData
            if (entity.isOutermostPrefabRoot) {
                exportPrefabResource(go, entity);
            }
            entity.parent = parent;
            entity.name = go.name;
            /**
             * 转换规则
             * 3D场景下，UI不转换
             */
            // UIRoot uiRootComponent = go.GetComponent(typeof(UIRoot)) as UIRoot;
            // if (uiRootComponent != null)
            // {
            //     return entity;
            // }

            entity.active = go.activeSelf;

            if (preset.is2d)
            {
                if (go.GetComponent(typeof(Light)) != null || go.GetComponent(typeof(Camera)) != null)
                {
                    return entity;
                }
            }
            //Debug.Log("converterKeys " + ComponentConverters.Keys);
            foreach (string converterKey in ComponentConverters.Keys)
            {
                //Debug.Log("convertKey" + converterKey);
                Action<GameObject, WXEntity, WXHierarchyContext, ExportPreset> converter = ComponentConverters[converterKey];

                converter.Invoke(go, entity, this, preset);
            }

            foreach (Transform child in go.transform)
            {
                if (shouldExport(child.gameObject))
                {
                    WXEntity childGameObject = IterateGameObject(child.gameObject, entity);
                }
            }

            return entity;
        }

        /**
         * 登记一个要转换成entity的gameObject，返回entity实例
         * 同时建立一个map做排重
         */
        private Dictionary<GameObject, WXEntity> entityMap = new Dictionary<GameObject, WXEntity>();
        public WXEntity MakeEntity(GameObject gameObject)
        {
            if (gameObject != null && entityMap.ContainsKey(gameObject))
            {
                return entityMap[gameObject];
            }

            WXEntity entity = new WXEntity(gameObject, gameObjectList.Count(), resourcePath);
            if (gameObject != null) 
            {
                entityMap.Add(gameObject, entity);
            }
            gameObjectList.Add(entity);

            return entity;
        }

        /**
         * 登记一个要转换的component，返回component的id
         *
         * @param component
         * @param entity 挂component的entity
         * @param nativeComponent 对应的u3dcomponent，排重用
         */
        public int AddComponent(WXComponent component, Component nativeComponent = null)
        {
            string cacheKey = nativeComponent != null ?
                nativeComponent.GetInstanceID().ToString() + component.GetType() :
                "";
// -----------------------获取component的objectId start-------------------------------------
            if (nativeComponent != null) {
                component.objectId = WXUtility.GetFileIdInInspector(nativeComponent);
            }
#if UNITY_2018_4_OR_NEWER
            if (nativeComponent != null) {
                try {
                    Component prefabComp = PrefabUtility.GetCorrespondingObjectFromOriginalSource(nativeComponent);
                    string guid;
                    long fileId;
                    if (AssetDatabase.TryGetGUIDAndLocalFileIdentifier(prefabComp, out guid, out fileId)) {
                        string path = AssetDatabase.GUIDToAssetPath(guid);
                        if (!path.EndsWith(".prefab")) {
                            path = path + ".prefab";
                        }
                        component.filePath = path;
                        component.objectId = fileId;
                    }
                    // Debug.Log("UNITY_2018_1_OR_NEWER component objectID" + fileId);
                }
                catch { 
                    // 如果导出一个prefab，这个在场景中给这个prefab加了一个entity，那么这个entity中的component其实不在unity prefab文件中，
                    // 而是在scene的diffData中，因此调用PrefabUtility.GetCorrespondingObjectFromOriginalSource这个方法时会抛异常，
                    // 就直接用inspector中的m_LocalIdentfierInFile即可。
                    // Debug.LogWarning("UNITY_2018_1_OR_NEWER prefab component objectID " + component.objectId);
                }
            }
#else 
            if (nativeComponent != null) {
                try {
                    UnityEngine.Object prefabComp = PrefabUtility.GetPrefabParent(nativeComponent);
                    PropertyInfo inspectorModeInfo =
                    typeof(UnityEditor.SerializedObject).GetProperty ("inspectorMode",
                    BindingFlags.NonPublic | BindingFlags.Instance);
                    string path = AssetDatabase.GetAssetPath(prefabComp);
                    if (!path.EndsWith(".prefab")) {
                        path = path + ".prefab";
                    }
                    component.filePath = path;
                    SerializedObject serializedObject = new SerializedObject(prefabComp);
                    inspectorModeInfo.SetValue(serializedObject, UnityEditor.InspectorMode.Debug, null);
                    SerializedProperty localIdProp = serializedObject.FindProperty("m_LocalIdentfierInFile");
                    if (localIdProp!= null) {
                        long localId = localIdProp.longValue;
                        component.objectId = localId;
                        // Debug.LogWarning("component localId " + localIdProp.longValue);
                    } else {
                        component.objectId = 0;
                        // Debug.LogWarning("can't get component localId");
                    }
                }
                catch { 
                    // 应该不会走道这里。单独导出prefab时，nativeComponent已经是一个实例了，会被GetCorrespondingObjectFromOriginalSource方法抛错
                    // Debug.LogWarning("component use default localId " + component.objectId);
                }
            }
#endif
            if ((component.objectId == 0 || component.objectId == -1) && nativeComponent != null) {
                Debug.LogError("component fileId is 0, component type" + component.getTypeName() + " entity name: " + nativeComponent.gameObject.name);
            }
// -----------------------获取component的objectId end-------------------------------------

            // 以原生component作为key建立一个缓存表，如果已存在，则复用
            //
            // 后续更新：这里不仅仅是复用
            // 因为AddComponent的时候，有可能是外面对这个component做了一些新的修改
            // 所以还要调用一次OnIterateTo，走一下相关更新逻辑
            if (
                nativeComponent != null
                && componentDictionary.ContainsKey(cacheKey)
            // && component.GetType() == componentDictionary[nativeComponent].GetType()
            )
            {
                //Debug.Log("" + nativeComponent.GetInstanceID());
                var bbcomp = componentDictionary[cacheKey];
                bbcomp.OnIterateTo(this);
                return bbcomp.arrayId;
            }
            else
            {
                componentList.Add(component);
                int num = componentList.Count() - 1;
                component.arrayId = num;
                if (nativeComponent != null)
                {
                    //Debug.Log("" + nativeComponent.GetInstanceID());
                    componentDictionary.Add(cacheKey, component);
                }
                component.OnIterateTo(this);
                return num;
            }
        }

        public WXComponent GetConvertedComponent(Type wxComponentType, Component nativeComponent)
        {
            string key = nativeComponent.GetInstanceID().ToString() + wxComponentType;
            if (componentDictionary.ContainsKey(key))
            {
                return componentDictionary[key];
            }
            else
            {
                return null;
            }
        }

        public string AddComponentInProperty(WXComponent component, Component nativeComponent = null) {
            return "$COMP$" + this.AddComponent(component, nativeComponent);
        }

        /**
         * 登记一个要使用的resource
         */
        public void AddResource(string path)
        {
            if (path == null || path == "/" || path == "")
            {
                throw new Exception("非法路径");
            }
            if (resourceList.Contains(path))
            {
                return;
            }
            resourceList.Add(path);
        }

        private void exportPrefabResource(GameObject go, WXEntity entity) {
#if UNITY_2018_4_OR_NEWER
            GameObject sourceObj = PrefabUtility.GetCorrespondingObjectFromOriginalSource(go);
            if (preset.is2d) {
                // Debug.LogError("preset.is2d" + preset.is2d);
                // Debug.LogError(prefab2dType);
                // prefabPath
                WXResource prefabInstance = (WXResource)Activator.CreateInstance(prefab2dType, new object[] {sourceObj, entity.prefabPath, false, false});
                AddResource(prefabInstance.Export(preset));
            } else {
                // Debug.LogError("preset.is2d" + preset.is2d);
                WXPrefab prefab = new WXPrefab(sourceObj, entity.unityAssetPath);
                AddResource(prefab.Export(preset));
            }
#else
            GameObject sourceObj = PrefabUtility.GetPrefabParent(go) as GameObject;
            if (preset.is2d) {
                // Debug.LogError("preset.is2d" + preset.is2d);
                // Debug.LogError(prefab2dType);
                WXResource prefabInstance = (WXResource)Activator.CreateInstance(prefab2dType, new object[] {sourceObj, entity.prefabPath, false, false});
                AddResource(prefabInstance.Export(preset));
                // WXNGUITree prefab = new WXNGUITree(sourceObj, entity.prefabPath, false);
                // AddResource(prefab.Export(preset));
            } else {
                // Debug.LogError("preset.is2d" + preset.is2d);
                WXPrefab prefab = new WXPrefab(sourceObj, entity.unityAssetPath);
                AddResource(prefab.Export(preset));
            }
#endif
        }
    }

}

