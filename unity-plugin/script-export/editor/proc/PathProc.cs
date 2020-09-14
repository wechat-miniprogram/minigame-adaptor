// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using System.Text.RegularExpressions;
// using DotNet.Globbing;
// using Microsoft.Ajax.Utilities;
// using UnityEditor;
// using UnityEngine;

// namespace WeChat {
//     public static class PathProc {

//         [Serializable]
//         public class UnityPath {
//             public UnityPath(string relativeToProjectRoot) {
//                 this.ToProjectRoot = relativeToProjectRoot;
//             }

//             public static UnityPath DUMMY = new UnityPath("");
//             public string ToProjectRoot;
//             public string ToAssetsRoot {
//                 get {
//                     var local = ToProjectRoot;
//                     if (!local.StartsWith("Assets" + Path.DirectorySeparatorChar)) {
//                         throw new Exception("UnityPath illegal. Not start with to 'Assets/' [" + ToProjectRoot + "]");
//                     }
//                     return local.Substring("Assets/".Length, local.Length);
//                 }
//             }

//             public static UnityPath operator +(UnityPath a, string b) {
//                 return new UnityPath(Path.Combine(a.ToProjectRoot, b));
//             }
//         }

//         // wagame-unity-tool 相对工程根路径的相对路径
//         public static UnityPath ToolPath;
        
//         // wagame-unity-tool/editor/bridge 相对工程根路径的相对路径
//         public static UnityPath BridgePath;
        
//         // wagame-unity-tool/editor 相对工程根路径的相对路径
//         public static UnityPath EditorPath;

//         // wagame-unity-tool/sdk 相对工程根路径的相对路径
//         public static UnityPath SDKPath;

//         // wagame-unity-tool/plugins 相对工程根路径的相对路径
//         public static UnityPath PluginsPath;

//         public static UnityPath ConfigPath;

//         public static UnityPath BuildPath;

//         public static UnityPath OutputPath;

//         public static char Slash = Path.DirectorySeparatorChar;


//         private static List<string> _allFilesInProject;
 
//         public static void Reset() {
//             _allFilesInProject = null;
//         }

//         static PathProc() {
//             // ToolPath = new UnityPath(GetToolPath());
//             // SDKPath = ToolPath + "sdk";
//             // PluginsPath = ToolPath + "plugins";
//             // EditorPath = ToolPath + "editor";
//             // BridgePath = EditorPath + "bridge";
//             // ConfigPath = ToolPath + "config.json";
//             // BuildPath = ToolPath + "build~";
//             // OutputPath = ToolPath + "output~";
//             // createIfNotExists(BuildPath);
//         }

//         public static IEnumerable<string> ToProjectRoot(this IEnumerable<UnityPath> path) {
//             return path.Select(it => it.ToProjectRoot);
//         }
//         public static IEnumerable<string> ToAssetsRoot(this IEnumerable<UnityPath> path) {
//             return path.Select(it => it.ToAssetsRoot);
//         }

//         private static void createIfNotExists(UnityPath path) {
//             var info = new DirectoryInfo(path.ToProjectRoot);
//             if (!info.Exists) {
//                 info.Create();
//             }
//         }

//         public static IEnumerable<string> GetFiles(IEnumerable<string> globDest, IEnumerable<string> globExcludes, bool ignoreCase = false) {
//             var files = AllFilesInProject().ToList();
//             var destinations = GetFiles(globDest, ignoreCase, files).ToList();
//             var excludes = GetFiles(globExcludes, ignoreCase, files).ToList();
//             return destinations.Where(dest => !excludes.Contains(dest));
//         }

//         public static IEnumerable<string> GetFiles(IEnumerable<string> rawGlobs, bool ignoreCase = false, IEnumerable<string> allFilesInProject = null) {
//             var result = new List<string>();
//             var globs = rawGlobs.Select(it => Compile(it).ToProjectRoot);
//             if (allFilesInProject == null) {
//                 allFilesInProject = AllFilesInProject();
//             }

//             globs.ForEach(it => {
//                 var matches = Match(it, ignoreCase, allFilesInProject);
//                 matches.ForEach(file => {
//                     if (!result.Contains(file)) {
//                         result.Add(file);
//                     }
//                 });
//             });
//             return result;
//         }

//         private static IEnumerable<string> Match(string glob, bool ignoreCase, IEnumerable<string> files) {
//             var options = new GlobOptions();
//             options.Evaluation.CaseInsensitive = ignoreCase;
//             var matcher = Glob.Parse(glob, options);
//             return files.Where(it => matcher.IsMatch(it)).ToList();
//         }

//         private static IEnumerable<string> AllFilesInProject() {
//             if (_allFilesInProject != null) {
//                 return _allFilesInProject;
//             }

//             var files = Directory.GetFiles(".", "*", SearchOption.AllDirectories);

//             _allFilesInProject = files.Select(it => {
//                 var starts = "." + Path.DirectorySeparatorChar;
//                 if (it.StartsWith(starts)) {
//                     return it.Substring(starts.Length, it.Length - starts.Length);
//                 }
//                 return it;
//             }).ToList();
//             return _allFilesInProject;
//         }

//         /**
//          * Compile User Input Paths in Config.json;
//          * @param glob is a pattern like "Assets/**.cs"
//          *
//          * there is also some a macros
//          * ${PLUGIN_PATH}
//          * ${SDK_PATH}
//          * ${TOOL_PATH}
//          */
//         public static UnityPath Compile(string glob) {
//             if (glob == null) {
//                 throw new Exception("Path can not be null");
//             }
//             // glob = glob.Replace("${PLUGIN_PATH}", PluginsPath.ToProjectRoot);
//             // glob = glob.Replace("${SDK_PATH}", SDKPath.ToProjectRoot);
//             // glob = glob.Replace("${TOOL_PATH}", ToolPath.ToProjectRoot);
//             // glob = glob.Replace("${BUILD_PATH}", BuildPath.ToProjectRoot);
//             // glob = glob.Replace("${OUTPUT_PATH}", OutputPath.ToProjectRoot);
//             return new UnityPath(EscapePathSeparator(glob));
//         }

//         public static string EscapePathSeparator(string input) {
//             return new PathEscape(input, Slash).ConvertPath();
//         }

//         // wagame unity tool 相对 Assets 的路径
//         private static string GetToolPath() {
//             var guiDs = AssetDatabase.FindAssets("l:WAGameUnityTool");
//             var root = "";
//             foreach (var t in guiDs) root = AssetDatabase.GUIDToAssetPath(t);
//             var toolPath = Path.GetDirectoryName(root);
//             return toolPath;
//         }

//     }

//     internal class PathEscape
//     {
//         //private Regex PathSchemaRegex = new Regex(@"(?<=(^\w+:)|^)[\\/]{2,}");
//         //private Regex PathNonSchemaRegex = new Regex(@"(?<!((^\w+:)|^)[\\/]*)[\\/]+");
//         private Regex PathRegex = new Regex(@"(?<schema>(?<=(^\w+:)|^)[\\/]{2,})|[\\/]+");

//         public string Separator
//         {
//             get; private set;
//         }

//         public string DoubleSeparator
//         {
//             get; private set;
//         }

//         public string Path
//         {
//             get; private set;
//         }

//         public PathEscape(string path, char separator)
//         {
//             Path = path;
//             Separator = separator.ToString();
//             DoubleSeparator = new string(separator, 2);
//         }

//         private string ReplaceSlashEvaluator(Match m)
//         {
//             if (m.Groups["schema"].Success)
//             {
//                 return DoubleSeparator;
//             }
//             return Separator;
//         }

//         public string ConvertPath()
//         {
//             //path = PathSchemaRegex.Replace(path, directorySeparator.ToString());
//             //path = PathNonSchemaRegex.Replace(path, directorySeparator.ToString());

//             return PathRegex.Replace(Path, ReplaceSlashEvaluator);
//         }
//     }
// }