using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Security.Cryptography;
using System.Reflection;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("Core")]
namespace WeChat
{
    internal class SmartDict<T>
    {
        public Dictionary<T, KeyValuePair<int, JSONObject>> dict = new Dictionary<T, KeyValuePair<int, JSONObject>>();
        public KeyValuePair<int, JSONObject> AddObject(T obj, out bool exist)
        {
            if (dict.ContainsKey(obj))
            {
                KeyValuePair<int, JSONObject> result = new KeyValuePair<int, JSONObject>();
                dict.TryGetValue(obj, out result);
                exist = true;
                return result;
            }
            else
            {
                int id = dict.Count;
                KeyValuePair<int, JSONObject> pair = new KeyValuePair<int, JSONObject>(id, new JSONObject(JSONObject.Type.OBJECT));
                dict.Add(obj, pair);
                exist = false;
                return pair;
            }
        }

        public JSONObject ToJSON()
        {
            JSONObject json = new JSONObject(JSONObject.Type.ARRAY);
            if (dict.Count > 0)
            {
                var sorted = from entry in dict orderby entry.Value.Key ascending select entry;
                foreach (KeyValuePair<T, KeyValuePair<int, JSONObject>> pair in sorted)
                {
                    json.Add(pair.Value.Value);
                }
            }
            return json;
        }
    }

    public class WXUtility
    {
        public static JSONObject ConvertListToJSONArray(List<string> list)
        {
            JSONObject jsonArray = new JSONObject(JSONObject.Type.ARRAY);
            if (list == null) 
            {
                return jsonArray;
            }

            if (list != null)
            {
                foreach (string item in list)
                {
                    jsonArray.Add(item);
                }
            }

            return jsonArray;
        }

        public static List<string> ConvertJSONArrayToList(JSONObject json)
        {
            if (!json.IsArray)
            {
                throw new Exception("不应该尝试把一个不是array的JSON转换为数组");
            }

            List<string> result = new List<string>();

            for (int i = 0; i < json.Count; i++)
            {
                result.Add(json.list[i].GetRawString());
            }

            return result;
        }

        private static string hashMap = "0123456789abcdefghijklmnopqrstuvwxyz";
        public static string GetMD5FromHierarchyResourceAssetPath(string assetPath)
        {

            string[] deps = AssetDatabase.GetDependencies(assetPath);

            List<char> result = new List<char>();

            foreach (string dep in deps)
            {
                string depHash = GetMD5FromAssetPath(dep);
                
                for (int j = 0; j < result.Count || j < depHash.Length; j++)
                {
                    if (j < result.Count && j < depHash.Length) {
                        result[j] = (char)(result[j] ^ depHash[j]);
                    }
                    else if (j < depHash.Length) {
                        result.Add(depHash[j]);
                    }
                }
            }

            for (int i = 0; i < result.Count; i++)
            {
                result[i] = hashMap[result[i] % 36];
            }

            return new string(result.ToArray());

        }

        public static string GetMD5FromAssetPath(string assetPath)
        {
            if (assetPath == "")
            {
                return "Untitled";
            }
            if (
                assetPath.StartsWith("Library/unity default resources")
                || assetPath.StartsWith("Resources/unity_builtin_extra")
            )
            {
                return UnityEngine.Random.value.ToString();
            }
            if (!File.Exists(assetPath))
            {
                throw new Exception("尝试获取非法目录" + assetPath + "的MD5值！");
            }

            return GetMD5FromString(
                assetPath +
                File.GetLastWriteTime(assetPath).Ticks +
                AssetDatabase.GetAssetDependencyHash(assetPath).ToString()
            );
        }

        public static string GetMD5FromString(string anyString)
        {

            MD5CryptoServiceProvider md = new MD5CryptoServiceProvider();
            byte[] data = Encoding.GetEncoding("utf-8").GetBytes(anyString);
            byte[] ms5Bytes = md.ComputeHash(data);
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < ms5Bytes.Length; i++)
            {
                sBuilder.Append(ms5Bytes[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }

        public static object TryGetContainField(object instance, string FieldName)
        {
            if (instance != null && !string.IsNullOrEmpty(FieldName))
            {

                FieldInfo _findedFieldInfo = instance.GetType().GetField(FieldName);
                if (_findedFieldInfo != null)
                {
                    return _findedFieldInfo.GetValue(instance);
                }
            }
            return null;
        }

        public static string GetFileNameFromPath(string prefabPath)
        {
            int lastDot = prefabPath.LastIndexOf('.');
            int lastBar = prefabPath.LastIndexOf('/');
            string exportName = "";

            if (lastDot > 0)
            {
                exportName = prefabPath.Substring(lastBar + 1, (lastDot == 0 ? prefabPath.Length : lastDot) - lastBar - 1);
            }
            return exportName;
        }

        static public UnityEngine.Object GetPrefabSource(UnityEngine.Object gameObject)
        {

#if UNITY_2018_4_OR_NEWER
            UnityEngine.Object prefab = PrefabUtility.GetCorrespondingObjectFromSource(gameObject);
#else
            UnityEngine.Object prefab = PrefabUtility.GetPrefabParent(gameObject);
#endif
            return prefab;
        }

        public static long GetFileIdInInspector(UnityEngine.Object gameObjectOrComp) {
            long fileId = 0;
            PropertyInfo inspectorModeInfo = 
            typeof(UnityEditor.SerializedObject).GetProperty ("inspectorMode",
            BindingFlags.NonPublic | BindingFlags.Instance);

            SerializedObject serializedObject = new SerializedObject(gameObjectOrComp);
            inspectorModeInfo.SetValue(serializedObject, UnityEditor.InspectorMode.Debug, null);

            SerializedProperty localIdProp = serializedObject.FindProperty("m_LocalIdentfierInFile");
            if (localIdProp!= null) {
                long localId = localIdProp.longValue;
                fileId = localId;
            } else {
                Debug.LogError("can't get this object fileId");
            }
            return fileId;
        }

        // 为了保证每一个场景中每一个节点都有local fileId （因为prefab中的节点可能没有），给每个节点加一个子节点、保存，然后删除这个子节点、保存
        public static void TraverseSceneTreeToSave(GameObject go, Scene gameScene) {
            GameObject tempGO = new GameObject("tempGO");
            tempGO.transform.SetParent(go.transform);
            EditorSceneManager.SaveScene(gameScene, gameScene.path);
            UnityEngine.Object.DestroyImmediate(tempGO);
            EditorSceneManager.SaveScene(gameScene, gameScene.path);
            
            foreach (Transform child in go.transform) {
                TraverseSceneTreeToSave(child.gameObject, gameScene);
            }
        }

        public static void SaveSingleGameObject(GameObject go, Scene gameScene) {
            GameObject tempGO = new GameObject("tempGO");
            tempGO.transform.SetParent(go.transform);
            EditorSceneManager.SaveScene(gameScene, gameScene.path);
            UnityEngine.Object.DestroyImmediate(tempGO);
            EditorSceneManager.SaveScene(gameScene, gameScene.path);
        }

        public static long GenerateLongByString(string input) {
            string hex = GetMD5FromString(input);
            string subHex = hex.Substring(0,10);
            long value = Convert.ToInt64(subHex, 16);
            return value;
        }

        public static void CallLocalScript(string fileName, string cmd, int timeout = 1000 * 100)
        {
            using (System.Diagnostics.Process p = new System.Diagnostics.Process())
            {
                p.StartInfo.FileName = fileName;
                p.StartInfo.Arguments = cmd;
                p.StartInfo.RedirectStandardError = true;
                p.StartInfo.RedirectStandardOutput = true;
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.CreateNoWindow = false;

                StringBuilder output = new StringBuilder();
                StringBuilder error = new StringBuilder();

                using (AutoResetEvent outputWaitHandle = new AutoResetEvent(false))
                using (AutoResetEvent errorWaitHandle = new AutoResetEvent(false))
                {
                    p.OutputDataReceived += (sender, e) =>
                    {
                        if (e.Data == null)
                        {
                            outputWaitHandle.Set();
                        }
                        else
                        {
                            output.AppendLine(e.Data);
                        }
                    };
                    p.ErrorDataReceived += (sender, e) =>
                    {
                        if (e.Data == null)
                        {
                            errorWaitHandle.Set();
                        }
                        else
                        {
                            error.AppendLine(e.Data);
                        }
                    };


                    p.Start();

                    p.BeginOutputReadLine();
                    p.BeginErrorReadLine();

                    if (p.WaitForExit(timeout) &&
                        outputWaitHandle.WaitOne(timeout) &&
                        errorWaitHandle.WaitOne(timeout))
                    {
                        // Process completed. Check process.ExitCode here.

                        if (p.ExitCode != 0)
                        {
                            throw new Exception(string.Format("Call {0} Script {1} Error! error={2}", fileName, cmd, error.ToString()));
                        }

                    }
                    else
                    {
                        // Timed out.

                        throw new Exception(string.Format("Call {0} Script {1} TimeOut!", fileName, cmd));
                    }
                }
            }
        }

        public static string ExecProcess(string toolPath, string arguments, out bool succ)
        {
            try
            {
                if (!File.Exists(toolPath))
                {
                    EditorUtility.DisplayDialog("Error", "未在以下路径找到解析可执行文件：\"" + toolPath + "\"。", "确定");
                    succ = false;
                    return null;
                }
                System.Diagnostics.ProcessStartInfo procStartInfo = new System.Diagnostics.ProcessStartInfo
                {
                    FileName = toolPath,
                    Arguments = arguments,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                };
                System.Diagnostics.Process proc = new System.Diagnostics.Process
                {
                    StartInfo = procStartInfo
                };
                proc.Start();
                string result = proc.StandardOutput.ReadToEnd();
                proc.WaitForExit();
                if (proc.ExitCode == 0)
                {
                    succ = true;
                    return result;
                }
                succ = false;
                return null;
            }
            catch (Exception e)
            {
                EditorUtility.DisplayDialog("Error", "运行可执行文件：\"" + toolPath + "\"错误：" + e.Message + "。", "确定");
                succ = false;
                return null;
            }
        }



        public enum ComponentType
        {
            Transform,
            Camera,
            DirectionalLight,
            PointLight,
            SpotLight,
            MeshFilter,
            MeshRenderer,
            SkinnedMeshRenderer,
            Animator,
            Animation,
            ParticleSystem,
            TrailRenderer,
            LineRenderer
        }
        public static List<ComponentType> componentsOnGameObject(GameObject gameObject)
        {
            List<ComponentType> list = new List<ComponentType>();
            Camera component = gameObject.GetComponent<Camera>();
            Light component2 = gameObject.GetComponent<Light>();
            MeshFilter component3 = gameObject.GetComponent<MeshFilter>();
            MeshRenderer component4 = gameObject.GetComponent<MeshRenderer>();
            SkinnedMeshRenderer component5 = gameObject.GetComponent<SkinnedMeshRenderer>();
            Animation component6 = gameObject.GetComponent<Animation>();
            Animator component7 = gameObject.GetComponent<Animator>();
            ParticleSystem component8 = gameObject.GetComponent<ParticleSystem>();
           
            BoxCollider component10 = gameObject.GetComponent<BoxCollider>();
            SphereCollider component11 = gameObject.GetComponent<SphereCollider>();
            CapsuleCollider component12 = gameObject.GetComponent<CapsuleCollider>();
            MeshCollider component13 = gameObject.GetComponent<MeshCollider>();
           
            TrailRenderer component15 = gameObject.GetComponent<TrailRenderer>();
            LineRenderer component16 = gameObject.GetComponent<LineRenderer>();
            list.Add(ComponentType.Transform);
            if ((UnityEngine.Object)component16 != (UnityEngine.Object)null)
            {
                list.Add(ComponentType.LineRenderer);
            }
            if ((UnityEngine.Object)component15 != (UnityEngine.Object)null)
            {
                list.Add(ComponentType.TrailRenderer);
            }
           
            if ((UnityEngine.Object)component6 != (UnityEngine.Object)null)
            {
                list.Add(ComponentType.Animation);
            }
            if ((UnityEngine.Object)component7 != (UnityEngine.Object)null)
            {
                list.Add(ComponentType.Animator);
            }
            if ((UnityEngine.Object)component != (UnityEngine.Object)null)
            {
                list.Add(ComponentType.Camera);
            }
            if ((UnityEngine.Object)component2 != (UnityEngine.Object)null)
            {
                if (component2.type == LightType.Directional)
                {
                    list.Add(ComponentType.DirectionalLight);
                }
                else if (component2.type == LightType.Point)
                {
                    list.Add(ComponentType.PointLight);
                }
                else if (component2.type == LightType.Spot)
                {
                    list.Add(ComponentType.SpotLight);
                }
            }
            if ((UnityEngine.Object)component3 != (UnityEngine.Object)null)
            {
                if ((UnityEngine.Object)component == (UnityEngine.Object)null)
                {
                    list.Add(ComponentType.MeshFilter);
                    if ((UnityEngine.Object)component4 == (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " need a MeshRenderer ComponentType !");
                    }
                }
                else if ((UnityEngine.Object)component != (UnityEngine.Object)null)
                {
                    Debug.LogWarning("WXExport : " + gameObject.name + " Camera and MeshFilter can't exist at the same time !");
                }
            }
            if ((UnityEngine.Object)component4 != (UnityEngine.Object)null)
            {
                if ((UnityEngine.Object)component == (UnityEngine.Object)null)
                {
                    list.Add(ComponentType.MeshRenderer);
                    if ((UnityEngine.Object)component3 == (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " need a meshFilter ComponentType !");
                    }
                }
                else if ((UnityEngine.Object)component != (UnityEngine.Object)null)
                {
                    Debug.LogWarning("WXExport : " + gameObject.name + " Camera and MeshRenderer can't exist at the same time !");
                }
            }
            if ((UnityEngine.Object)component5 != (UnityEngine.Object)null)
            {
                if ((UnityEngine.Object)component == (UnityEngine.Object)null && (UnityEngine.Object)component3 == (UnityEngine.Object)null && (UnityEngine.Object)component4 == (UnityEngine.Object)null)
                {
                    list.Add(ComponentType.SkinnedMeshRenderer);
                }
                else
                {
                    if ((UnityEngine.Object)component != (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " Camera and SkinnedMeshRenderer can't exist at the same time !");
                    }
                    if ((UnityEngine.Object)component3 != (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " MeshFilter and SkinnedMeshRenderer can't exist at the same time !");
                    }
                    if ((UnityEngine.Object)component4 != (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " MeshRenderer and SkinnedMeshRenderer can't exist at the same time !");
                    }
                }
            }
            if ((UnityEngine.Object)component8 != (UnityEngine.Object)null)
            {
                if ((UnityEngine.Object)component == (UnityEngine.Object)null && (UnityEngine.Object)component3 == (UnityEngine.Object)null && (UnityEngine.Object)component4 == (UnityEngine.Object)null && (UnityEngine.Object)component5 == (UnityEngine.Object)null)
                {
                    list.Add(ComponentType.ParticleSystem);
                }
                else
                {
                    if ((UnityEngine.Object)component != (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " Camera and ParticleSystem can't exist at the same time !");
                    }
                    if ((UnityEngine.Object)component3 != (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " MeshFilter and ParticleSystem can't exist at the same time !");
                    }
                    if ((UnityEngine.Object)component4 != (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " MeshRenderer and ParticleSystem can't exist at the same time !");
                    }
                    if ((UnityEngine.Object)component5 != (UnityEngine.Object)null)
                    {
                        Debug.LogWarning("WXExport : " + gameObject.name + " SkinnedMeshRenderer and ParticleSystem can't exist at the same time !");
                    }
                }
            }
            return list;
        }
    }
}