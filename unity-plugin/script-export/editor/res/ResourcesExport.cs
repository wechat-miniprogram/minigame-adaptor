using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using UnityEditor;
using System;

namespace WeChat {
    public class ResourcesExport
    {
        public static List<string> dirs = new List<string>();
        public static string[] supportedTypes = {"TextAsset", "AudioClip", "GameObject"};
        public static HashSet<string> setExclude = new HashSet<string>(new string[]{".cs", ".cginc", ".js"});
        // [MenuItem("WeChat/Export/Resources")]
        // [MenuItem("微信小游戏/调试/裸资源导出")] // TODO: 
        public static void ExportResourcesMenu(){
            // Object []res = Resources.FindObjectsOfTypeAll(typeof(TextAsset));
            // for(int i=0;i<res.Length;i++){
            //     string path = AssetDatabase.GetAssetPath(res[i]);
            //     if(path.Contains("Assets/") && path.Contains("Resources/")){
            //     Debug.Log(path);
            //     }
            // }

            string choosedPath = EditorUtility.SaveFolderPanel("选择资源导出目录", "WXExport", "");
            if(choosedPath.Length <= 0){
                Debug.LogError("请选择目录");
                return;
            }
            
            ExportResources(choosedPath);
        }
        
        public static void ExportResources(string choosedPath) {

            string savePath = Path.Combine(choosedPath, "Assets/");

            updateRecourcesDir();

            int totalCount = 0;
            string []arr_dir = dirs.ToArray();
            
            JSONObject jsonConfig = new JSONObject(JSONObject.Type.ARRAY);
            
            if(arr_dir.Length > 0){
                for(int index=0; index<supportedTypes.Length;index++){
                    string filter = "t:"+supportedTypes[index];
                    string[] guids = AssetDatabase.FindAssets (filter, arr_dir);
                    Debug.Log(guids.Length);
                    if(guids.Length == 0) continue;

                    JSONObject category = new JSONObject(JSONObject.Type.OBJECT);
                    JSONObject data = new JSONObject(JSONObject.Type.ARRAY);
                    category.AddField("type", supportedTypes[index]);
                    category.AddField("files", data);

                    HashSet<string> setFiles = new HashSet<string>();
                    for(int i=0;i<guids.Length;i++){
                        string path = AssetDatabase.GUIDToAssetPath (guids[i]);
                        if (path.StartsWith("Assets"))
                        {
                            path = path.Substring(6);
                        }
                        string absolutePath = Path.Combine(Application.dataPath, path);
                        // #if UNITY_EDITOR_WIN
                        // string absolutePath = Application.dataPath + "\\" + path;
                        // #else
                        // string absolutePath = Application.dataPath + "/" + path;
                        // #endif

                        // string filename = System.IO.Path.GetFileName(absolutePath);
                        string copyToPath = Path.Combine(savePath, path);
                        
                        // #if UNITY_EDITOR_WIN
                        // string copyToPath = savePath + "\\" + path;
                        // #else
                        // string copyToPath = savePath + "/" + path;
                        // #endif

                        string extension = System.IO.Path.GetExtension(path);
                        if(setExclude.Contains(extension)){
                            continue;
                        }

                        if(supportedTypes[index] != "GameObject"){
                            wxFileUtil.CopyFile(absolutePath, copyToPath);
                        }
                        
                        JSONObject fileInfo = new JSONObject(JSONObject.Type.OBJECT);
                        // fileInfo.AddField("key", Path.GetFileNameWithoutExtension(filename));
                        string key = ResourcesExport.getResourcePath(path);
                        if(setFiles.Contains(key)){
                            continue;
                        }
                        else{
                            setFiles.Add(key);
                        }
                        fileInfo.AddField("key", key);
                        fileInfo.AddField("name", "Assets" + path);
                        data.Add(fileInfo);
                        totalCount++;
                    }
                    jsonConfig.Add(category);
                }
            }
            wxFileUtil.SaveJsonFile(jsonConfig, Path.Combine(savePath, "Resources.json"));
            Debug.Log("导出成功，总共导出文件个数："+totalCount);
        }

        private static string getResourcePath(string fullpath){
            int pos = fullpath.LastIndexOf("Resources")+10;//POS必然不为-1
            string relativepath = fullpath.Substring(pos);
            int pos2 = relativepath.LastIndexOf(".");
            string result = relativepath.Substring(0, pos2);
            return result;
        }

        private static void updateRecourcesDir(){
            dirs.Clear();
            findResourcesDirctory(Application.dataPath);
        }

        private static void findResourcesDirctory(string path)
        {
            try
            {
                string[] directories = Directory.GetDirectories(path);
                foreach (string dir in directories)
                {
                    DirectoryInfo dirInfo = new DirectoryInfo(dir);
                    string subPath = Path.Combine(path, dirInfo.Name);
                    if(dirInfo.Name.Equals("Resources")){
                        int pos = Application.dataPath.Length - 6;
                        string subdir = subPath.Substring(pos);
                        if(!dirs.Contains(subdir)){
                            dirs.Add(subdir);
                        }
                    }
                    findResourcesDirctory(subPath);   //递归
                }
            }
            catch (IOException ex)
            {
                string Error = ex.ToString();
            }
        }
    }

}
