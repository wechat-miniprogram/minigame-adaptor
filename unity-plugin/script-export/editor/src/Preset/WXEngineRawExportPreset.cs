
#define USE_RAW_MODE

using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using WeChat;


namespace WeChat
{
    [InitializeOnLoad]
    [DeclarePreset("rawres", typeof(RawResourceExportConfig))]
    public class RawExportPreset : ExportPreset
    {
        public static List<string> dirs = new List<string>();
        public static string[] supportedTypes = {"TextAsset", "AudioClip", "GameObject"};
        public static HashSet<string> setExclude = new HashSet<string>(new string[]{".cs", ".cginc", ".js"});

        static RawExportPreset()
        {
            ExportPreset.registerExportPreset("rawres", new RawExportPreset());
        }

        public RawExportPreset() : base()
        {
        }

        public override string GetChineseName()
        {
            return "导出原始资源";
        }

        protected override void DoExport()
        {
            EditorUtility.ClearProgressBar();
            BridgeExport.isProcessing = false;

            List<string> allRecursiveAssets = new List<string>();

            // string choosedPath = GetExportPath();
            // string savePath = Path.Combine(choosedPath, "Assets/");
            var savePath =  Path.Combine(ExportStore.storagePath, "Assets/");

            updateRecourcesDir();

            int totalCount = 0;
            string []arr_dir = dirs.ToArray();
            
            JSONObject jsonConfig = new JSONObject(JSONObject.Type.ARRAY);
            
            if(arr_dir.Length > 0){

                for(int index=0; index<supportedTypes.Length;index++){
                    string filter = "t:"+supportedTypes[index];
                    string[] guids = AssetDatabase.FindAssets (filter, arr_dir);
                    // Debug.Log(guids.Length);
                    if(guids.Length == 0) continue;

                    JSONObject category = new JSONObject(JSONObject.Type.OBJECT);
                    JSONObject data = new JSONObject(JSONObject.Type.ARRAY);
                    category.AddField("type", supportedTypes[index]);
                    category.AddField("files", data);

                    var t = 0;
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
                            #if USE_RAW_MODE
                            string projpath =  "Assets" + path;
                            WXRawResource rawResource = new WXRawResource(projpath);
                            string ret_path = rawResource.Export(this);
                            allRecursiveAssets.Add(ret_path);
                            #else
                            wxFileUtil.CopyFile(absolutePath, copyToPath);
                            #endif
                        }
                        
                        JSONObject fileInfo = new JSONObject(JSONObject.Type.OBJECT);
                        // fileInfo.AddField("key", Path.GetFileNameWithoutExtension(filename));
                        string key = getResourcePath(path);
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
                        EditorUtility.DisplayProgressBar("原始资源导出", "", t++ / guids.Length);
                    }
                    jsonConfig.Add(category);
                }
            }
            #if USE_RAW_MODE
            string tempConfigFile = Path.Combine(Application.dataPath, "Resources.json");
            wxFileUtil.SaveJsonFile(jsonConfig, tempConfigFile);
            string configpath = "Assets/Resources.json";
            WXRawResource rawConfig = new WXRawResource(configpath);
            string ret_cfg_path = rawConfig.Export(this);
            allRecursiveAssets.Add(ret_cfg_path);
            File.Delete(tempConfigFile);
            #endif
            // string content = jsonConfig.ToString();
            // ExportStore.AddTextFile(configpath, content, WXUtility.GetMD5FromString(content));
            // List<string> useConfig = new List<string>();
            // useConfig.Add(configpath);
            // ExportStore.AddResource(configpath, "raw", null, useConfig);
            // allRecursiveAssets.Add(configpath);
            

            ExportStore.GenerateResourcePackage(
                "WXResources",
                allRecursiveAssets
            );

            EditorUtility.ClearProgressBar();
            Debug.Log("导出成功，总共导出文件个数："+totalCount);
        }

        private string getResourcePath(string fullpath){
            int pos = fullpath.LastIndexOf("Resources")+10;//POS必然不为-1
            string relativepath = fullpath.Substring(pos);
            int pos2 = relativepath.LastIndexOf(".");
            string result = relativepath.Substring(0, pos2);
            return result;
        }

        private void updateRecourcesDir(){
            dirs.Clear();
            findResourcesDirctory(Application.dataPath);
        }

        private void findResourcesDirctory(string path)
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
        public override bool WillPresetShow()
        {
            return true;
        }

    }
}
