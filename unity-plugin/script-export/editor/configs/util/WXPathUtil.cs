using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEditor;
using TheObject.Net.Utilities;
using DotNet.Globbing;
using System.Text.RegularExpressions;

namespace WeChat {

    [InitializeOnLoad]
    internal static class PathUtil {

        // public static readonly string BASE_OUTPUT      = CombinePathAndCreateIfNotExist(Application.dataPath, "__wx_bridge_output");

        // public static readonly string BRIDGE_DLL_CACHE = CombinePathAndCreateIfNotExist(BASE_OUTPUT, "bridge", "dll_cache~");
        // public static readonly string PLUGIN_DLL_CACHE = CombinePathAndCreateIfNotExist(BASE_OUTPUT, "plugins", "dll_cache~");
        // public static readonly string PLUGIN_CS_CACHE  = CombinePathAndCreateIfNotExist(BASE_OUTPUT, "plugins", "cs_cache~");
        // public static readonly string PLUGIN_JS_CACHE  = CombinePathAndCreateIfNotExist(BASE_OUTPUT, "plugins", "js_cache~");


        // public static string CombinePathAndCreateIfNotExist(params string[] paths) {
        //     var p = Path.Combine(paths);

        //     if(!Directory.Exists(p)) {
        //         Directory.CreateDirectory(p);
        //     }

        //     return p;
        // }

        public enum PluginOutputType {
            CS,
            JS,
            DLL
        }

        private static DirectoryStructure build;

        private static readonly string jsDist = "JavaScriptDist";
        private static readonly string csDist = "CSharpDist";
        private static readonly string dllDist = "DLLDist";

        static PathUtil() {
            build = DirectoryBuilder.RegisterDirectory("build", new DirectoryStructure("Build~"));
        }

        public static string GetPluginOutputPath(UnityPlugin plugin, PluginOutputType outputType, string outputFile = null) {
            if (plugin == null) return "";

            string pathToPluginName = plugin.pluginName;

            switch(plugin.pluginState) {
                case UnityPlugin.PluginState.convert:
                    pathToPluginName = Path.Combine("Convert", plugin.pluginName);
                    break;
                case UnityPlugin.PluginState.stub:
                    pathToPluginName = Path.Combine("Stub", plugin.pluginName);
                    break;
            }

            switch(outputType) {
                case PluginOutputType.CS:
                    if (outputFile == null) outputFile = ".cs";
                    return build["Plugins"].GetFilePath(Path.Combine(pathToPluginName, csDist, plugin.pluginName + outputFile));

                case PluginOutputType.JS:
                    return build["Plugins"].GetFilePath(Path.Combine(pathToPluginName, jsDist));

                case PluginOutputType.DLL:
                    if (outputFile == null) outputFile = ".dll";
                    return build["Plugins"].GetFilePath(Path.Combine(pathToPluginName, dllDist, plugin.pluginName + outputFile));
            }

            return "";
        }



        private static char Slash = Path.DirectorySeparatorChar;
        private static List<string> _allFilesInProject;

        [Serializable]
        public class UnityPath {
            public UnityPath(string relativeToProjectRoot) {
                this.ToProjectRoot = relativeToProjectRoot;
            }

            public static UnityPath DUMMY = new UnityPath("");
            public string ToProjectRoot;
            public string ToAssetsRoot {
                get {
                    var local = ToProjectRoot;
                    if (!local.StartsWith("Assets" + Path.DirectorySeparatorChar)) {
                        throw new Exception("UnityPath illegal. Not start with to 'Assets/' [" + ToProjectRoot + "]");
                    }
                    return local.Substring("Assets/".Length, local.Length);
                }
            }

            public static UnityPath operator +(UnityPath a, string b) {
                return new UnityPath(Path.Combine(a.ToProjectRoot, b));
            }
        }

        public static List<string> GetFiles(IEnumerable<string> rawGlobs, bool ignoreCase = false, List<string> allFilesInProject = null) {
            var result = new List<string>();
            var globs = rawGlobs.Select(it => Compile(it).ToProjectRoot).ToList();
            if (allFilesInProject == null) {
                allFilesInProject = AllFilesInProject();
            }

            globs.ForEach(it => {
                var matches = Match(it, ignoreCase, allFilesInProject);
                matches.ForEach(file => {
                    if (!result.Contains(file)) {
                        result.Add(file);
                    }
                });
            });
            return result;
        }

        private static List<string> Match(string glob, bool ignoreCase, List<string> files) {
            var options = new GlobOptions();
            options.Evaluation.CaseInsensitive = ignoreCase;
            var matcher = Glob.Parse(glob, options);
            return files.Where(it => matcher.IsMatch(it)).ToList();
        }

        private static List<string> AllFilesInProject() {
            if (_allFilesInProject != null) {
                return _allFilesInProject;
            }

            var files = Directory.GetFiles(".", "*", SearchOption.AllDirectories);

            _allFilesInProject = files.Select(it => {
                var starts = "." + Path.DirectorySeparatorChar;
                if (it.StartsWith(starts)) {
                    return it.Substring(starts.Length, it.Length - starts.Length);
                }
                return it;
            }).ToList();
            return _allFilesInProject;
        }

        public static UnityPath Compile(string glob) {
            if (glob == null) {
                throw new Exception("Path can not be null");
            }

            return new UnityPath(EscapePathSeparator(glob));
        }

        public static string EscapePathSeparator(string input) {
            return new PathEscape(input, Slash).ConvertPath();
        }

        internal class PathEscape {
            //private Regex PathSchemaRegex = new Regex(@"(?<=(^\w+:)|^)[\\/]{2,}");
            //private Regex PathNonSchemaRegex = new Regex(@"(?<!((^\w+:)|^)[\\/]*)[\\/]+");
            private Regex PathRegex = new Regex(@"(?<schema>(?<=(^\w+:)|^)[\\/]{2,})|[\\/]+");

            public string Separator {
                get; private set;
            }

            public string DoubleSeparator {
                get; private set;
            }

            public string Path {
                get; private set;
            }

            public PathEscape(string path, char separator) {
                Path = path;
                Separator = separator.ToString();
                DoubleSeparator = new string(separator, 2);
            }

            private string ReplaceSlashEvaluator(Match m) {
                if (m.Groups["schema"].Success) {
                    return DoubleSeparator;
                }
                return Separator;
            }

            public string ConvertPath() {
                return PathRegex.Replace(Path, ReplaceSlashEvaluator);
            }
        }
    }
}