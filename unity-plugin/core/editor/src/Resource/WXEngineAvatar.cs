using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;
using System;
using System.IO;
using System.Text;
using System.Threading;

namespace WeChat
{

    class WXAvatar : WXResource
    {
        private bool isHuman = false;
        private HumanDescription desc = new HumanDescription();
        public Dictionary<string, string> humanMap = new Dictionary<string, string>();
        private Avatar avatar;
        private GameObject gameObject;

        protected override string GetResourceType()
        {
            return "avatar";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(avatar.name); ;
        }

        public WXAvatar(Avatar _avatar, GameObject _gameObject) : base(AssetDatabase.GetAssetPath(_avatar.GetInstanceID()))
        {
            avatar = _avatar;
            gameObject = _gameObject;
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                .setResource(this)
                .setGameObject(_gameObject)
                .error(ErrorUtil.ErrorCode.Avatar_PathError, "avatar文件的unity路径为空");
            }
        }

        public override string GetExportPath()
        {
            int index = unityAssetPath.LastIndexOf('.');
            string filename = index == -1 ? unityAssetPath : unityAssetPath.Substring(0, index);
            return wxFileUtil.cleanIllegalChar(filename, false) + ".avatar";
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            if (avatar.isHuman)
            {
                isHuman = GetHumanDescription(avatar, ref desc);
                if (isHuman)
                {
                    foreach (var pair in desc.human)
                    {
                        humanMap.Add(pair.humanName, pair.boneName);
                    }
                }
            }
            JSONObject avatarJSON = new JSONObject(JSONObject.Type.OBJECT);

            /*
                * {
                *  avatar:{
                *      path,
                *      linkSprites
                *  }
                * }
                */
            int id = -2;
            // GetAvatarNodeData(gameObject, rootNode, gameObject, ref id);
            bool succ = false;
            JSONObject avatarRootNodeJSON = GetAvatarRootNodeJSON(gameObject, gameObject, ref id, ref succ);
            if (avatarRootNodeJSON == null)
            {
                return null;
            }
            JSONObject paths = new JSONObject(JSONObject.Type.ARRAY);
            AssetImporter importer = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(avatar.GetInstanceID()));
            ModelImporter mImporter = importer as ModelImporter;
            if (mImporter != null)
            {
                for (int k = 0; k < mImporter.extraExposedTransformPaths.Length; k++)
                {
                    paths.Add(mImporter.extraExposedTransformPaths[k]);
                }
            }
            avatarJSON.AddField("name", avatar.name);
            avatarJSON.AddField("rootNode", avatarRootNodeJSON);
            avatarJSON.AddField("optimized", mImporter.optimizeGameObjects);
            string avatarPath = Path.GetFullPath(Directory.GetParent(Application.dataPath) + "/" + AssetDatabase.GetAssetPath(avatar.GetInstanceID()));
            float scale = (Path.GetExtension(avatarPath).ToLower() == ".fbx" && mImporter.useFileUnits) ? 0.01f : 1.0f;
            avatarJSON.AddField("scaleFactor", succ ? scale : 1.0f);
            avatarJSON.AddField("paths", paths);

            // 在importsetting里关联fbx文件
            if (Path.GetExtension(avatarPath).ToLower() == ".fbx")
            {
                importSetting = new JSONObject();
                WXRawResource fbx = new WXRawResource(AssetDatabase.GetAssetPath(avatar.GetInstanceID()));
                string fbxExportedPath = fbx.Export(preset);
                importSetting.AddField("associateFbx", fbxExportedPath);
                AddDependencies(fbxExportedPath);
            }
            return avatarJSON;
        }

        public bool GetHumanDescription(Avatar target, ref HumanDescription des)
        {
            if (target != null)
            {
                AssetImporter importer = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(target.GetInstanceID()));
                if (importer != null)
                {
                    Debug.Log("AssetImporter Type: " + importer.GetType());
                    ModelImporter modelImporter = importer as ModelImporter;
                    if (modelImporter != null)
                    {
                        des = modelImporter.humanDescription;
                        Debug.Log("## Cool stuff data by ModelImporter ##");
                        return true;
                    }
                    else
                    {
                        Debug.LogError("## Please Select Imported Model in Project View not prefab or other things ##");
                    }
                }
            }
            return false;
        }

        public JSONObject GetAvatarNodeData(GameObject gameObject, GameObject animatorGameObject, ref int id, string path = "")
        {
            bool currentNodeHasNotLegalChild = FindNotLegalChild(gameObject);
            if (
                (
                    (UnityEngine.Object)SelectParentbyType(
                        gameObject, WXUtility.ComponentType.Animator
                    ) != (UnityEngine.Object)animatorGameObject

                    ||

                    WXUtility
                        .componentsOnGameObject(gameObject)
                        .IndexOf(WXUtility.ComponentType.Animator) != -1

                ) && (UnityEngine.Object)gameObject != (UnityEngine.Object)animatorGameObject
            )
            {
                return null;
            }
            if (currentNodeHasNotLegalChild)
            {
                JSONObject nodeJSON = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject nodeProps = new JSONObject(JSONObject.Type.OBJECT);
                JSONObject translate = new JSONObject(JSONObject.Type.ARRAY);
                JSONObject rotation = new JSONObject(JSONObject.Type.ARRAY);
                JSONObject scale = new JSONObject(JSONObject.Type.ARRAY);

                Vector3 localPosition = gameObject.transform.localPosition;
                Quaternion localRotation = gameObject.transform.localRotation;
                Vector3 localScale = gameObject.transform.localScale;

                nodeProps.AddField("name", gameObject.name);
                nodeJSON.AddField("props", nodeProps);

                translate = new JSONObject(JSONObject.Type.ARRAY);
                nodeProps.AddField("translate", translate);
                translate.Add(localPosition.x * -1f);
                translate.Add(localPosition.y);
                translate.Add(localPosition.z);
                rotation = new JSONObject(JSONObject.Type.ARRAY);
                nodeProps.AddField("rotation", rotation);
                rotation.Add(localRotation.x * -1f);
                rotation.Add(localRotation.y);
                rotation.Add(localRotation.z);
                rotation.Add(localRotation.w * -1f);
                scale = new JSONObject(JSONObject.Type.ARRAY);
                nodeProps.AddField("scale", scale);
                scale.Add(localScale.x);
                scale.Add(localScale.y);
                scale.Add(localScale.z);

                id = id + 1;
                if (id > -1)
                {
                    if (path.Length > 0)
                    {
                        path = path + "/" + gameObject.name;
                    }
                    else
                    {
                        path = gameObject.name;
                    }
                }
                JSONObject nodeChildrenArray = new JSONObject(JSONObject.Type.ARRAY);
                if (gameObject.transform.childCount > 0)
                {
                    for (int i = 0; i < gameObject.transform.childCount; i++)
                    {
                        JSONObject child = GetAvatarNodeData(gameObject.transform.GetChild(i).gameObject, animatorGameObject, ref id, path);
                        if (child != null)
                        {
                            nodeChildrenArray.Add(child);
                        }
                    }
                }
                nodeJSON.AddField("child", nodeChildrenArray);

                return nodeJSON;
            }
            return null;
        }

        public GameObject SelectParentbyType(GameObject gameObject, WXUtility.ComponentType type)
        {
            if ((UnityEngine.Object)gameObject.transform.parent == (UnityEngine.Object)null)
            {
                return null;
            }
            GameObject gameObject2 = gameObject.transform.parent.gameObject;
            if (WXUtility.componentsOnGameObject(gameObject2).IndexOf(type) != -1)
            {
                return gameObject2;
            }
            return SelectParentbyType(gameObject2, type);
        }

        public JSONObject GetAvatarRootNodeJSON(GameObject gameObject, GameObject animatorGameObject, ref int id, ref bool succ, string path = "")
        {
            string avatarPath = Path.GetFullPath(Directory.GetParent(Application.dataPath) + "/" + AssetDatabase.GetAssetPath(avatar.GetInstanceID()));
            if (Path.GetExtension(avatarPath).ToLower() == ".fbx")
            {
                string toolDir = WXConfig.GetModelToolPath();

                if (toolDir != null)
                {
                    string result = WXUtility.ExecProcess(
                            toolDir,
                            "\"" + avatarPath + "\"",
                            out succ
                        );
                    if (succ)
                    {
                        return JSONObject.Create(result);
                    }
                }
            }
            else
            {
                EditorUtility.DisplayDialog("Error", "导出的模型格式不支持", "确定");
            }
            succ = false;
            JSONObject rootNode = GetAvatarNodeData(gameObject, animatorGameObject, ref id, path);
            return rootNode;
        }



        public static bool hasNodeData(GameObject gameObject)
        {
            return FindNotLegalChild(gameObject);
        }
        public static bool FindNotLegalChild(GameObject gameObject)
        {
            if (WXUtility.componentsOnGameObject(gameObject).Count <= 1)
            {
                return true;
            }
            for (int i = 0; i < gameObject.transform.childCount; i++)
            {
                GameObject childObject = gameObject.transform.GetChild(i).gameObject;

                if (FindNotLegalChild(childObject))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
