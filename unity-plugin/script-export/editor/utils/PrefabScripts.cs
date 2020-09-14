using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.IO;
using System;
using System.Reflection;

namespace WeChat {
    public class PrefabScripts {

        private static readonly string rootPath = "Resources";

        // [MenuItem("WeChat/Utility/Search Prefab Scripts")]
        public static void SearchPrefabScripts() {
            var directories = Directory.EnumerateDirectories(Application.dataPath, "Resources", SearchOption.AllDirectories);
            JSONObject result = JSONObject.Create(JSONObject.Type.OBJECT);

            foreach (var dir in directories) {
                var files = Directory.EnumerateFiles(dir, "*.prefab", SearchOption.AllDirectories);

                
                foreach(var file in files) {
                    var cutIndex = Path.GetFullPath(file).IndexOf(rootPath) + rootPath.Length + 1;
                    string path = Path.GetFullPath(file).Substring(cutIndex);
                    path = path.Substring(0, path.Length - 7);
                    Debug.Log(path);

                    var go = Resources.Load(path) as GameObject;
                    if (go == null) continue;

                    var scripts = JSONObject.Create(JSONObject.Type.ARRAY);
                    result.AddField(path.Replace("\\", "/"), scripts);
                    IteratePrefab(go, ref scripts, new HashSet<MonoScript>());

                    // Debug.Log(result.ToString());
                }
            
            }

            var outputFileDirectoryPath = Path.Combine(Application.dataPath, "Output~");
            if (!Directory.Exists(outputFileDirectoryPath)) {
                Directory.CreateDirectory(outputFileDirectoryPath);
            }

            var outputFilePath = Path.Combine(outputFileDirectoryPath, "output.json");
            if (File.Exists(outputFilePath)) {
                File.Delete(outputFilePath);
            }
            File.WriteAllText(outputFilePath, result.ToString());
            Debug.Log("Write into: " + outputFilePath);
        }

        private static void IteratePrefab(GameObject go, ref JSONObject json, HashSet<MonoScript> scriptSet) {
            if (go != null && go.transform.childCount != 0) {
                for (int i = 0; i < go.transform.childCount; i++) {
                    IteratePrefab(go.transform.GetChild(i).gameObject, ref json, scriptSet);
                }
            }

            foreach (var script in go.GetComponents<MonoBehaviour>()) {
                if (script == null) continue;

                var monoScript = MonoScript.FromMonoBehaviour(script);
                if (scriptSet.Contains(monoScript)) continue;
                scriptSet.Add(monoScript);

                var scriptPath = AssetDatabase.GetAssetPath(monoScript.GetInstanceID());
                json.Add(scriptPath);

                //try
                //{
                //    var gos = GetMonoBehaviourFieldPrefab(script);
                //    if (gos.Count != 0)
                //    {
                //        foreach (var _go in gos)
                //        {
                //            IteratePrefab(_go, ref json);
                //        }
                //    }
                //}
                //catch (UnassignedReferenceException e)
                //{
                //    Debug.LogWarning("unassign gameObject " + e.Data);
                //}

            }   
        }

        //private static HashSet<GameObject> GetMonoBehaviourFieldPrefab(MonoBehaviour behaviour)
        //{
        //    HashSet<GameObject> gos = new HashSet<GameObject>();

        //    Type myObjectType = behaviour.GetType();
        //    FieldInfo[] fields = myObjectType.GetFields(BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Public);

        //    foreach (FieldInfo field in fields)
        //    {
        //        Debug.Log(field);
        //        if (field.FieldType != typeof(GameObject) || (!field.IsDefined(typeof(SerializeField)) && !field.IsPublic))
        //        {
        //            continue;
        //        }

        //        gos.Add(field.GetValue(behaviour) as GameObject);
        //    }

        //    return gos;
        //}

    }

}
