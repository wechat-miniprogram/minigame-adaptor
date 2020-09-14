// using System.Collections.Generic;
// using System.Linq;
// using Bridge.Contract.Constants;
// using TheObject.Net.Utilities;

// namespace WeChat {
//     public static class BridgeExtension {

//         public static string getBridgeExcludes(this Config config) {
//             var result = new List<string>();
//             result.AddRange(PathProc.GetFiles(config.project.excludes.ToProjectRoot()));
//             config.plugins.ForEach(it => {
//                 result.Add(it.sourceDir.ToProjectRoot);
//                 if (!it.generateJsTemplate) {
//                     result.Add(it.stubDir.ToProjectRoot);
//                 }
//             });
//             return result.Join(";");
//         }

//         public static string getBridgeSources(this Config config) {
//             return config.project.AllSources().Join(";");
//         }

//         public static string getBridgeDefineMacros(this Config config) {
//             return config.defineMacros.Join(";");
//         }
//     }
// }