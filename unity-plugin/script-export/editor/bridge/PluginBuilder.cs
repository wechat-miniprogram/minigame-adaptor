// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using Bridge.Translator;
// using Microsoft.CodeAnalysis.Emit;
// using UnityEngine;

// namespace WeChat
// {
//     public class PluginBuilder
//     {
//         private static DirectoryStructure references;
//         private static DirectoryStructure build;
//         public static void Build(UnityPlugin plugin)
//         {
//             if (references == null) {
//                 references = DirectoryBuilder.GetDirectory("references");
//             }       
//             if (build == null) {
//                 build = DirectoryBuilder.GetDirectory("build");
//             }

//             var outputPath = PathUtil.GetPluginOutputPath(plugin, PathUtil.PluginOutputType.DLL);
//             var bridgePath = references["Bridge"]["Bridge.dll"];
//             var unityStubPath = 
//             var pwd = Path.GetFullPath(".");
//             var pluginDLLName = plugin.pluginName + ".dll";
//             var outputPath = PathUtil.CombinePathAndCreateIfNotExist(pwd, PathUtil.PLUGIN_DLL_CACHE, plugin.pluginName);
//             var outputDLLPath = Path.Combine(outputPath, pluginDLLName);
//             var bridgePath = Path.Combine(PathUtil.BRIDGE_DLL_CACHE, "Bridge.dll");
//             // var csFiles = GetUnityEngineStubFile();
//             var csFiles = GetUnityEngineStubFile();
//             csFiles.AddRange(UnityPluginUtil.GetSource(plugin));

//             Debug.Log(csFiles.FilesListToLine());

//             var os = File.Create(outputDLLPath);
//             EmitResult result;
//             try
//             {
//                 result = DLLProc.BuildDLL(plugin.pluginName, os,
//                     csFiles, constants: plugin.defineMacros, references: new[] { bridgePath }, abortIfError: true);
//             }
//             finally
//             {
//                 os.Close();
//             }
//             if (result == null || !result.Success)
//             {
//                 throw new Exception("Create " + pluginDLLName + " failed.");
//             }
//         }


//         // private static List<string> GetReferenceFiles(Config config)
//         // {
//         //     var referenceSourceToGenerate = config.plugins.Where(it => it.enable && !it.generateJsTemplate)
//         //         .SelectMany(it => Directory.GetFiles(it.stubDir.ToProjectRoot, "*.cs", SearchOption.AllDirectories));

//         //     var result = referenceSourceToGenerate.ToList();
//         //     return result;
//         // }

//         private static List<string> GetUnityEngineStubFile() {
//             var unityStub = UnityPluginUtil.GetUnityEngineStub();
//             var result = new List<string>() {
//                 unityStub.stubPath.stubCSPath
//             };

//             return result;
//         }
//     }
// }