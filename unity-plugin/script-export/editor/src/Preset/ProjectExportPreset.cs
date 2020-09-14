// using System.Collections.Generic;
// using UnityEditor;
// using UnityEngine;
// using UnityEngine.SceneManagement;
// using System;
// using System.IO;
// using WeChat;

// namespace WeChat
// {
//     [InitializeOnLoad]
//     public class ProjectExportPreset : ExportPreset
//     {
//         static ProjectExportPreset()
//         {
//             BeefBall.registerExportPreset("project", new ProjectExportPreset("project"));
//             BeefBall.onExportOptionsGUIHandler.Add(new OnExportOptionsGUIHandler(OnGUI));
//         }

//         public ProjectExportPreset(string type) : base(type)
//         {
//         }

//         private static void OnGUI(ExportPreset preset)
//         {
//             if (preset.presetKey != "project") return;
//         }

//         public override string GetChineseName()
//         {
//             return "全工程导出";
//         }

//         protected override void DoExport()
//         {
//             // ProjectExportWindow.Init();
//             // WXGuideWindow.GuideWindowInit();
//             return;

//             // code
//             BridgeExport.RemoveTempCodeDir();
//             BeefBall.presetMap["script"].Export();

//             // all prefabs
//             UnityEngine.Object obj = AssetDatabase.LoadAssetAtPath<UnityEngine.Object>("Assets");
//             if (obj != null) {
//                 EditorUtility.FocusProjectWindow();
//                 Selection.activeObject = obj;
//                 BeefBall.presetMap["prefabfolder"].Export();
//             }

//             // active scene
//             BeefBall.presetMap["scene"].Export();
//         }

//         public override bool WillPresetShow()
//         {
//             return true;
//         }

//     }
// }