// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using Bridge.Translator;
// using Microsoft.CodeAnalysis.Emit;
// using UnityEngine;

// namespace WeChat
// {
//     public class ReferenceBuilder
//     {

//         private static DirectoryStructure references;
//         private static DirectoryStructure build;

//         // Some file in editor, should be compiled by Bridge, but not emit
//         public static void Build(ProjectExportConfig projectConfig, UnityPluginConfig pluginConfig)
//         {
//             if (references == null) {
//                 references = DirectoryBuilder.GetDirectory("references");
//             }       
//             if (build == null) {
//                 build = DirectoryBuilder.GetDirectory("build");
//             }
            
//             // var outputPath = Path.Combine(options.Folder, options.ReferencesPath, "WxReference.dll");
//             var outputPath = build["Output"].GetFilePath("WxReference.dll");
//             // var bridgePath = Path.Combine(options.Folder, options.BridgeLocation);
//             var bridgePath = references["Bridge"]["Bridge.dll"];
//             var csFiles = GetReferenceFiles(pluginConfig);
            
//             Debug.Log(outputPath);
//             Debug.Log(bridgePath);
//             Debug.Log(csFiles.FilesListToLine());
//             var os = File.Create(outputPath);
//             EmitResult result;
//             try {
//                 result = DLLProc.BuildDLL("WxReference", os,
//                     csFiles, constants: projectConfig.defineMacros, references: new[] { bridgePath }, abortIfError: true);
//             } finally {
//                 os.Close();
//             }
//             if (result == null || !result.Success)
//             {
//                 throw new Exception("Create WxReference.dll failed.");
//             }
//         }

        
//         // private static List<string> GetReferenceFiles(Config config)
//         // {
//         //     var referenceSourceToGenerate = config.plugins.Where(it => it.enable && !it.generateJsTemplate)
//         //         .SelectMany(it => Directory.GetFiles(it.stubDir.ToProjectRoot, "*.cs", SearchOption.AllDirectories));

//         //     var result = referenceSourceToGenerate.ToList();
//         //     return result;
//         // }

//         private static List<string> GetReferenceFiles(UnityPluginConfig config)
//         {
//             var referenceSourceToGenerate = config.unityPlugins
//                 // .Append(UnityPluginUtil.GetUnityEngineStub())
//                 .Where(plugin => {
//                     return plugin.enable && plugin.pluginState == UnityPlugin.PluginState.stub;
//                 })
//                 .Select(plugin => {
//                     return plugin.stubPath.stubCSPath;
//                 });

//             var result = referenceSourceToGenerate.ToList();
//             return result;
//         }
//     }
// }