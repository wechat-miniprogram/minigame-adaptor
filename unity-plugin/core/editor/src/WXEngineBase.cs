using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace WeChat
{

    public abstract class WXExportable
    {
        protected ExportPreset usingPreset;

        public abstract string GetHash();

        protected virtual string DoGetHash()
        {
            return GetHash();
        }

        public abstract string GetExportPath();

        protected abstract bool DoExport();

        public string Export(ExportPreset preset)
        {
            usingPreset = preset;
            if (!ExportStore.IsFileConverted(GetExportPath(), DoGetHash()))
            {
                if (DoExport())
                {
                    return GetExportPath();
                }
                else
                {
                    return "";
                }
            }
            return GetExportPath();
        }
    }

    /**
     * 一个资源文件
     * 
     */
    public abstract class WXAssetFile : WXExportable
    {
        protected string unityAssetPath;
        public WXAssetFile(string assetPath)
        {
            unityAssetPath = assetPath;
        }

        public override string GetHash()
        {
            return "" + WXUtility.GetMD5FromString(GetExportPath()) + File.GetLastWriteTime(unityAssetPath).Ticks;
        }
    }

    /**
     * WXResource
     * 无论如何同一个unity资源只会被导出一次.
     */
    public abstract class WXResource : WXExportable
    {
        // 存储所有WXResource的地方
        public delegate WXResource ConverterFactory(GameObject go);
        public static Dictionary<Type, ConverterFactory> resourcesConverters = new Dictionary<Type, ConverterFactory>();
        public static WXResource getConverter(UnityEngine.Object obj, GameObject go)
        {
            return resourcesConverters[obj.GetType()](go);
        }

        // 对应的unity资源路径。当然也可能没有。
        protected string unityAssetPath;
        public WXResource(string unityAssetPath)
        {
            this.unityAssetPath = unityAssetPath;
            // if (unityAssetPath == "")
            // {
            //     ErrorUtil.ExportErrorReporter.create()
            //         .error(0, "资源转换失败，没法拿到对应的unity资源。");
            // }
        }

        protected List<string> dependencies = new List<string>();
        protected List<string> useFile = new List<string>();
        protected JSONObject importSetting = null;

        // 添加一个依赖资源
        protected string AddDependencies(WXResource resource)
        {
            string convertedPath = resource.Export(usingPreset);

            if (convertedPath != "" && convertedPath != null)
            {
                dependencies.Add(convertedPath);
            }

            return convertedPath;
        }
        // 添加一个依赖资源
        protected void AddDependencies(string convertedPath)
        {
            dependencies.Add(convertedPath);
        }
        // 登记一个使用的文件
        protected string AddFile(WXAssetFile file)
        {
            string filePath = file.Export(usingPreset);
            useFile.Add(filePath);
            return filePath;
        }

        protected abstract JSONObject ExportResource(ExportPreset preset);

        protected abstract string GetResourceType();

        protected override string DoGetHash()
        {
            return GetResourceType() + "_" + GetHash();
        }

        protected bool dontExportDescriptionJSON = false;
        protected override bool DoExport()
        {
            JSONObject json = ExportResource(usingPreset);

            if (json == null && !dontExportDescriptionJSON)
            {
                return false;
            }

            string exportPath = GetExportPath();
            useFile.Add(exportPath);
            if (!dontExportDescriptionJSON)
            {
                ExportStore.AddJSONFile(
                    exportPath,
                    json,
                    DoGetHash()
                );
            }
            ExportStore.AddResource(
                exportPath,
                GetResourceType(),
                dependencies,
                useFile,
                // 有importSetting的时候才传importSetting
                importSetting == null ? null : importSetting
            );

            return true;
        }
    }

    /**
     * WXBeefBallEntity
     * 对应一个微信引擎里的Enitty
     */
    public class WXEntity
    {
        // -------为导出scene中引用prefab所用-------
        public bool isOutermostPrefabRoot = false;
        public bool isNestedPrefabRoot = false;
        public bool isPrefabNodeInParentInstance = false;
        public bool isPrefabNode = false;
        public bool isPrefabRoot = false;
        public long fileIdInOriginalSource = -1; // is fileId in unity
        public long prefabRootInstanceFileId = -1;
        public string prefabPath;
        public string unityAssetPath;
        // ---------end------------

        public string name;
        public int arrayId;
        //public bool isExtraEntity;
        //public bool isNguiChild;
        public bool active = false;

        // entity下的component
        public List<int> components;
        public GameObject gameObject;

        // entity下的子entity
        private List<WXEntity> children;
        private WXEntity _parent = null;
        public WXEntity parent
        {
            get
            {
                return _parent;
            }
            set
            {
                if (_parent != null)
                {
                    _parent.children.RemoveAt(_parent.children.IndexOf(this));
                }
                if (value != null)
                {
                    _parent = value;
                    _parent.children.Add(this);
                }
            }
        }

        private void getFileIdAndPrefabInfo(GameObject gameObject, string _resourcePath) {
            if (gameObject != null) {
                fileIdInOriginalSource = WXUtility.GetFileIdInInspector(gameObject);
            }

#if UNITY_2018_4_OR_NEWER
            string guid;
            long fileId;
            if (gameObject != null) {
                isPrefabNode = PrefabUtility.IsPartOfPrefabInstance(gameObject) || PrefabUtility.IsPartOfPrefabAsset(gameObject);
                bool isDisconnectedPrefabInstance = PrefabUtility.IsDisconnectedFromPrefabAsset(gameObject);
                // Debug.LogError("gameObject.name: " + gameObject.name + " isDisconnectedPrefabInstance: " + isDisconnectedPrefabInstance + " IsPartOfAnyPrefab: " + isPrefabNode + " isAssetPrefabNode: " + PrefabUtility.IsPartOfPrefabAsset(gameObject) + " isPrefabInstanceNode: " + PrefabUtility.IsPartOfPrefabInstance(gameObject) + " IsPartOfModelPrefab: " + PrefabUtility.IsPartOfModelPrefab(gameObject) + " IsPartOfNonAssetPrefabInstance: " + PrefabUtility.IsPartOfNonAssetPrefabInstance(gameObject) + " IsPartOfPrefabThatCanBeAppliedTo: " + PrefabUtility.IsPartOfPrefabThatCanBeAppliedTo(gameObject) + " IsPartOfRegularPrefab: " + PrefabUtility.IsPartOfRegularPrefab(gameObject) + " IsPartOfVariantPrefab: " + PrefabUtility.IsPartOfVariantPrefab(gameObject) + " IsPrefabAssetMissing: " + PrefabUtility.IsPrefabAssetMissing(gameObject));
                if (isPrefabNode && !isDisconnectedPrefabInstance) {
                    GameObject sourceObj = PrefabUtility.GetCorrespondingObjectFromOriginalSource(gameObject);
                    if (sourceObj != null && AssetDatabase.TryGetGUIDAndLocalFileIdentifier(sourceObj, out guid, out fileId)) {
                        string path = AssetDatabase.GUIDToAssetPath(guid);
                        unityAssetPath = path;
                        if (!path.EndsWith(".prefab")) {
                            path = path + ".prefab";
                        }
                        prefabPath = path;
                        fileIdInOriginalSource = fileId;
                        if (_resourcePath != prefabPath) {
                            isPrefabNodeInParentInstance = PrefabUtility.IsPartOfPrefabInstance(gameObject);

                            GameObject sourceGameObject = gameObject;
                            try {
                                // 处理S1->P1->P2的场景下，导出P1，P2应该是P1的outermostPrefabRoot
                                if (!_resourcePath.EndsWith(".scene")) {
                                    GameObject source = PrefabUtility.GetCorrespondingObjectFromSourceAtPath(sourceGameObject, _resourcePath);
                                    if (source) {
                                        sourceGameObject = source;
                                    }
                                }
                            } catch {

                            }
                            isOutermostPrefabRoot = PrefabUtility.IsOutermostPrefabInstanceRoot(sourceGameObject);
                            prefabRootInstanceFileId = WXUtility.GetFileIdInInspector(sourceGameObject.transform);

                            bool isAnyPrefabInstanceRoot = PrefabUtility.IsAnyPrefabInstanceRoot(gameObject);
                            // Debug.Log("prefabObj: " + gameObject.name + " isAnyPrefabInstanceRoot: " + isAnyPrefabInstanceRoot + " isOutermostPrefabRoot: " + isOutermostPrefabRoot);
                            if (isAnyPrefabInstanceRoot && !isOutermostPrefabRoot) { // 如果不是最外层的prefabRoot
                                //  处理S1->P1->P2的场景下，计算P2的prefabInstanceLocalId时，先找到P2的父节点，再通过父节点找到所在的P1文件，再拿到P2在P1中的Instance，再通过其transform的fileId作为prefabInstanceLocalId
                                string prefabAssetPath = PrefabUtility.GetPrefabAssetPathOfNearestInstanceRoot(gameObject.transform.parent.gameObject);
                                // GameObject instanceRoot = PrefabUtility.GetCorrespondingObjectFromSource(gameObject);
                                GameObject instanceRoot = PrefabUtility.GetCorrespondingObjectFromSourceAtPath(gameObject, prefabAssetPath);
                                isNestedPrefabRoot = true;
                                if (instanceRoot != null) {
                                    prefabRootInstanceFileId = WXUtility.GetFileIdInInspector(instanceRoot.transform);
                                }
                            }

                            // string prefabAssetPath = PrefabUtility.GetPrefabAssetPathOfNearestInstanceRoot(gameObject);
                            // bool isModelPrefabInstance = prefabAssetPath.EndsWith(".FBX");
                            // // 对于model的根节点，统一设置其prefabRootInstanceFileId
                            // if (isModelPrefabInstance && isAnyPrefabInstanceRoot) {
                            //     GameObject instanceRoot = PrefabUtility.GetCorrespondingObjectFromOriginalSource(gameObject);
                            //     prefabRootInstanceFileId = WXUtility.GetFileIdInInspector(instanceRoot.transform);
                            // }
                        }
                        // Debug.Log("sourceObj: " + sourceObj.name + " guid: " + guid + " fileID: " + fileIdInOriginalSource + " path: " + prefabPath);
                    } else {
                        Debug.LogError("2 can't get component localId " + gameObject.name);
                    }
                }
                
            }
#else
            if (gameObject != null && PrefabUtility.GetPrefabParent(gameObject) != null) {
                try {
                    PrefabType type = PrefabUtility.GetPrefabType(gameObject);
                    if (type == PrefabType.DisconnectedPrefabInstance || 
                        type == PrefabType.DisconnectedModelPrefabInstance || 
                        type == PrefabType.MissingPrefabInstance) {
                        return;
                    }

                    UnityEngine.Object prefabGameObject = PrefabUtility.GetPrefabParent(gameObject);
                    
                    string path = AssetDatabase.GetAssetPath(prefabGameObject);
                    unityAssetPath = path;
                    if (!path.EndsWith(".prefab")) {
                        path = path + ".prefab";
                    }
                    prefabPath = path;
                    if (prefabPath == _resourcePath) {
                        isPrefabNodeInParentInstance = false;
                    } else {
                        GameObject prefabRoot = PrefabUtility.FindRootGameObjectWithSameParentPrefab(gameObject);
                        if (prefabRoot == gameObject) {
                            isOutermostPrefabRoot = true;
                            prefabRootInstanceFileId = WXUtility.GetFileIdInInspector(gameObject.transform);
                        }

                        isPrefabNodeInParentInstance = true;
                    }

                    fileIdInOriginalSource = WXUtility.GetFileIdInInspector(prefabGameObject);

                }
                catch { 
                    // 应该不会走道这里单独导出prefab时，nativeComponent已经是一个实例了，会被GetCorrespondingObjectFromOriginalSource方法抛错
                    Debug.LogError("2 can't get component localId " + gameObject.name);
                    
                }
            }
#endif
        }
        public WXEntity(GameObject _go, int _arrayId, string _resourcePath)
        {
            gameObject = _go;
            children = new List<WXEntity>();
            components = new List<int>();
            //arrayId = -1;
            arrayId = _arrayId;

            getFileIdAndPrefabInfo(gameObject, _resourcePath);

            if (fileIdInOriginalSource == -1 || fileIdInOriginalSource == 0) {
                Debug.LogError("entity localId is 0, can't get entity localId " + gameObject.name);
                WXUtility.SaveSingleGameObject(gameObject, SceneManager.GetActiveScene());
                getFileIdAndPrefabInfo(gameObject, _resourcePath);
            }
        }

        public void AddChild(WXEntity entity)
        {
            entity.parent = this;
        }
        public int GetChildrenCount()
        {
            return children.Count;
        }

        public JSONObject ToJSON()
        {
            // 创建json对象
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("name", name);

            if (isPrefabNodeInParentInstance) {
                json.AddField("__type", "prefabNode");
                json.AddField("__prefab", prefabPath);
            }
            if (isNestedPrefabRoot) {
                json.AddField("__type", "nestedPrefabRoot");
                json.AddField("__prefab", prefabPath);
                json.AddField("__prefabInstanceFileId", prefabRootInstanceFileId.ToString());
            }
            if (isOutermostPrefabRoot) {
                json.AddField("__type", "outermostPrefabRoot");
                json.AddField("__prefab", prefabPath);
                json.AddField("__prefabInstanceFileId", prefabRootInstanceFileId.ToString());
            }
            
            json.AddField("__fileId", fileIdInOriginalSource.ToString());

            if (children.Count > 0)
            {
                // 如果有一个子元素，就创建json数组
                JSONObject childrenArray = new JSONObject(JSONObject.Type.ARRAY);
                foreach (WXEntity go in children)
                {
                    childrenArray.Add(go.arrayId);
                }

                json.AddField("children", childrenArray);
            }

            if (components.Count > 0)
            {
                JSONObject componentsArray = new JSONObject(JSONObject.Type.ARRAY);
                foreach (int comp in components)
                {
                    componentsArray.Add(comp);
                }

                json.AddField("components", componentsArray);
            }

            JSONObject data = json.GetField("data");
            if (data != null)
            {
                data.AddField("active", active);
                data.AddField("layer", gameObject == null ? 0 : gameObject.layer);
            }
            else
            {
                JSONObject newData = new JSONObject(JSONObject.Type.OBJECT);
                newData.AddField("active", active);
                newData.AddField("layer", gameObject == null ? 0 : gameObject.layer);
                json.AddField("data", newData);
            }

            //if (isExtraEntity && !isNguiChild)
            //{
            //    json = new JSONObject(JSONObject.Type.BAKED);
            //}

            return json;
        }
    }


    public abstract class WXComponent
    {
        public long objectId = -1;
        public string filePath = null;
        abstract public string getTypeName();

        /**
         * 整体遍历完成之后，遍历转换数据的hook
         */
        abstract protected JSONObject ToJSON(WXHierarchyContext context);

        private JSONObject json;
        /**
         * 遍历加入时的回调hook
         */
        public void OnIterateTo(WXHierarchyContext context)
        {
            // ToJSON阶段有可能还会增加component，会违反c#的遍历限制。
            // 所以不能在最终计算节点树json的时候做这个事情。
            // 只能在这时候做。
            json = ToJSON(context);
        }

        public JSONObject GetJSON()
        {
            return json;
            //return ToJSON(usedContext);
        }

        public int arrayId = -1;

        protected WXComponent()
        {
        }
    }
}
