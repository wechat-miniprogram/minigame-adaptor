// using UnityEngine;
// using UnityEditor;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using WeChat;

// namespace WeChat
// {
//     [InitializeOnLoad]
//     [DeclarePreset("resources", typeof(HierarchyExportConfig))]
//     public class ResourcesExportPreset : ExportPreset
//     {
//         static ResourcesExportPreset()
//         {
//             BeefBall.registerExportPreset("resources", new ResourcesExportPreset("resources"));
//         }

//         public ResourcesExportPreset(string type) : base(type)
//         {
//         }

//         private static void OnGUI(ExportPreset preset)
//         {
//             if (preset.presetKey != "resources") return;
//         }

//         public override string GetChineseName()
//         {
//             return "导出资源文件信息";
//         }

//         protected override void DoExport()
//         {
//             // convert
//             var tmpPath = Path.Combine(Application.dataPath.Substring(0, Application.dataPath.Length - "Assets".Length), WXBridge.TMP_RESOURCES_PATH);
//             // Debug.Log(tmpPath);
//             // return;
//             ResourcesExport.ExportResources(tmpPath);

//             var files = Directory.EnumerateFiles(tmpPath, "*.*", SearchOption.AllDirectories);

//             List<string> allRecursiveAssets = new List<string>();

//             foreach (var file in files)
//             {
//                 JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
//                 metadata.AddField("version", 1);
//                 var cutIndex = Path.GetFullPath(file).IndexOf(tmpPath) + tmpPath.Length + 1; //      +1 : '/'
//                 string path = Path.GetFullPath(file).Substring(cutIndex).Replace('\\', '/');
//                 Debug.Log(path);

//                 // .....文件类型
//                 // TODO
//                 // string content = File.ReadAllText(file);
//                 // WXExportStore.AddTextFile(path, content, WXUtility.GetMD5FromString(content));
//                 List<string> useFile = new List<string>();
//                 useFile.Add(path);
//                 WXExportStore.AddResource(path, "resources", null, useFile);
//                 allRecursiveAssets.Add(path);
//             }

//             string packagePath = Path.Combine(WXExportStore.storagePath, "WXResources.mgepackage/");
//             WXExportStore.GenerateResourcePackage(
//                 packagePath,
//                 allRecursiveAssets
//             );
//         }

//         public override bool WillPresetShow()
//         {
//             return false;
//         }

//     }
// }
