using UnityEngine;
using UnityEditor;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System;
using TheObject.Net.Utilities;
using System.Xml;
using System.Xml.Linq;

namespace WeChat{

    [InitializeOnLoad]
    public static class UnityPluginUtil {

        private static List<XDocument> csprojs;

        static void InitXML() {
            csprojs = new List<XDocument>();
            var path = Application.dataPath.Replace("Assets", "");
            // Debug.Log(path);
            var files = Directory.GetFiles(path, "*.csproj", SearchOption.TopDirectoryOnly);
            // Debug.Log(files.Length);
            foreach(var f in files) {
                // Debug.Log(f);
                var csproj = XDocument.Load(f);
                csprojs.Add(csproj);
            }
        }

        static List<string> ReadXML(XDocument document) {
            var lst = new List<string>();
            foreach (XNode node in document.DescendantNodes()) {
                if (node is XElement) {
                    XElement element = (XElement)node;
                    if (element.Name.LocalName == "Reference") {
                        lst.Add(element.Value);
                    }
                }
            }
            return lst;
        }

        private static void Search() {
            
        }
        public static void InitAllPlugins() {

        }

        // [MenuItem("test/Test Plugin Config Util")]
        public static void TestPluginConfigUtil() {
            var plugins = ConfigManager.configEntry.unityPluginConfig.unityPlugins;
            Debug.Log("Exclude: " + GetExclude(plugins[0]).FilesListToLine());
            var exc1 = GetExcludes(plugins).FilesListToLine();
            var exc2 = GetExcludes(ConfigManager.configEntry.unityPluginConfig).FilesListToLine();
            Debug.Log("Excludes1: " + exc1);
            Debug.Log("Excludes2: " + exc2);
            Debug.Log(exc1 == exc2);

            Debug.Log("Source: " + GetSource(plugins[0]).FilesListToLine());
            var src1 = GetSources(plugins).FilesListToLine();;
            var src2 = GetSources(ConfigManager.configEntry.unityPluginConfig).FilesListToLine();
            Debug.Log("Sources1: " + exc1);
            Debug.Log("Sources2: " + exc2);
            Debug.Log(src1 == src2);

            Debug.Log("Lib: " + GetLib(plugins[0]).FilesListToLine());
            var lib1 = GetLibs(plugins).FilesListToLine();
            var lib2 = GetLibs(ConfigManager.configEntry.unityPluginConfig).FilesListToLine();
            Debug.Log("Libs1: " + lib2);
            Debug.Log("Libs2: " + lib2);
            Debug.Log(lib1 == lib2);
        }

        public static List<string> GetExclude(UnityPlugin plugin) {
            if (!plugin.enable) return new List<string>();

            if (plugin.pluginState == UnityPlugin.PluginState.stub && plugin.stubConfig.generateJSTemplate) {
                return new List<string>();
            }
            
            return GetPluginFilesFromConfig(plugin.pluginPath.excludes);
        }


        public static List<string> GetExcludes(UnityPluginConfig pluginConfig) {
            var excludes = new List<string>();

            pluginConfig.unityPlugins.ForEach(p => {
                var e = GetExclude(p);

                if (e != null) {
                    excludes.AddRange(e);
                }
            });

            return excludes;
        }

        public static List<string> GetExcludes(IEnumerable<UnityPlugin> plugins) {
            var excludes = new List<string>();

            plugins.ToList().ForEach(p => {
                var e = GetExclude(p);

                if (e != null) {
                    excludes.AddRange(e);
                }
            });

            return excludes;
        }

        public static List<string>  GetSource(UnityPlugin plugin) {
            if (!plugin.enable) return new List<string>();
            
            return GetPluginFilesFromConfig(plugin.pluginPath.sources, "/*.cs");
        }

        public static List<string> GetSources(UnityPluginConfig pluginConfig) {
            var sources = new List<string>();

            pluginConfig.unityPlugins.ForEach(p => {
                if (!p.enable) return;

                sources.AddRange(GetSource(p));
            });

            return sources;
        }

        public static List<string> GetSources(IEnumerable<UnityPlugin> plugins) {
            var sources = new List<string>();

            plugins.ToList().ForEach(p => {
                sources.AddRange(GetSource(p));
            });

            return sources;
        }


        public static List<string> GetRefSource(UnityPlugin plugin) {
            if (!plugin.enable) return new List<string>();

            return GetPluginFilesFromConfig(plugin.pluginPath.libs, "/*.cs");
        }



        public static List<string> GetLib(UnityPlugin plugin) {
            if (!plugin.enable) return new List<string>();

            return GetPluginFilesFromConfig(plugin.pluginPath.libs, "/*.dll");
        }

        public static List<string> GetLib(UnityPlugin plugin, bool unity, bool system) {
            var lib = GetLib(plugin);
            if (lib == null) {
                lib = new List<string>();
            }

            if (unity) {
                lib.AddRange(GetUnityEngineLibs());
            }

            // if (system) {
            //     lib.AddRange(GetSystemLibs());
            // }

            return lib;
        }


        public static List<string> GetLibs(UnityPluginConfig pluginConfig) {
            var libs = new List<string>();

            pluginConfig.unityPlugins.ForEach(p => {
                libs.AddRange(GetLib(p));
            });

            return libs;
        }

        public static List<string> GetLibs(IEnumerable<UnityPlugin> plugins) {
            var libs = new List<string>();

            plugins.ToList().ForEach(p => {
                libs.AddRange(GetLib(p));
            });

            return libs;
        }

        public static List<string> GetSystemLibs() {
            var loc = typeof(object).Assembly.Location;
            var dir = Path.GetDirectoryName(loc);
            // Debug.Log("==" + dir);
            // var index = loc.IndexOf("unityjit/");
            // var path = loc.Substring(0, index + 9);
            // Debug.Log("=== " + path);

            // var dlls = Directory.EnumerateFiles(dir, "*.dll", SearchOption.AllDirectories);
            var dlls = new List<string>();

            return dlls.ToList();
        }

        public static List<string> GetUnityEngineLibs() {
            // var location = typeof(MonoBehaviour).Assembly.Location;
            // var directory = Path.GetDirectoryName(location);
            // if (directory == null || !location.EndsWith("UnityEngine.CoreModule.dll")) {
            //     throw new Exception("UnityEngine dll not found");
            // }
            // var dlls = Directory.GetFiles(directory, "*.dll", SearchOption.AllDirectories);

            // var extension = typeof(UnityEngine.UI.Button).Assembly.Location;
            // var dir = Path.GetDirectoryName(extension);
            // var dlls2 = Directory.GetFiles(dir, "*.dll", SearchOption.AllDirectories);
        //    return dlls.Concat(dlls2).ToList();
            // var dlls = new List<string>();
            // new List<Type>() {
            //     typeof(UnityEngine.Object),
            //     typeof(UnityEditor.Editor),
            //     typeof(UnityEngine.UI.Button)
            // }.ForEach(t => {
            //     var loc = t.Assembly.Location;
            //     var dir = Path.GetDirectoryName(loc);
            //     var dll = Directory.GetFiles(dir, "*.dll", SearchOption.AllDirectories);
            //     dlls.AddRange(dll);
            // });
            
            // Distinct: 排重
            // Where: 由于UnityEngine.dll里和UnityEngine.CoreModule.dll里有部分重复定义，因此排除
            // dlls = dlls.Distinct().Where(t => !t.EndsWith("UnityEngine.dll") && !t.EndsWith("Standalone/UnityEngine.UI.dll")).ToList();
            // dlls.ForEach(d => Debug.Log(d));


            var dlls = new List<string>();

            foreach (var xml in csprojs) {
                dlls.AddRange(ReadXML(xml));
            }

            // Debug.Log(dlls.Count);

            // 排重+排除不存在的dll
            dlls = dlls.Distinct().Where(dll => {
                return File.Exists(dll);
            }).ToList();

            // Debug.Log(dlls.Count);
            // foreach (var d in dlls) {
            //     Debug.Log(d);
            // }
            return dlls;
        }


        private static UnityPlugin UnityEngineStub;
        public static UnityPlugin GetUnityEngineStub() {
            return UnityEngineStub;
        }


        public static List<string> GetPluginFilesFromConfig(List<UnityEngine.Object> locationList, string extension = "") {
            if (locationList == null || locationList.Count == 0) return new List<string>();
            var globs = new List<string>();

            locationList.ForEach(i => {
                // Debug.Log("!!!\n" + i.PathAtAssets() + "/**" + extension);
                globs.Add(i.PathAtAssets() + "/**" + extension);
            });
            
            var ignoreCase = ConfigManager.configEntry.projectExportConfig.globIgnoreCase;
            return PathUtil.GetFiles(globs, ignoreCase).ToList();
        }


        public static UnityPlugin CreatePlugin(UnityEngine.Object pluginRoot, string pluginName) {
            // var plugin = ScriptableObject.CreateInstance<UnityPlugin>();
            var plugin = DirectoryUtil.CreateScriptableObject<UnityPlugin>("bridge/plugins/" + pluginName);

            plugin.enable = true;
            plugin.pluginName = pluginName;
            plugin.pluginPath.pluginRoot = pluginRoot;

            // var dstPath = Path.Combine(ConfigManager.pluginsPath.PathToAssets(), "WX_UNITY_PLUGIN_" + pluginName + ".asset");
            // AssetDatabase.CreateAsset(plugin, dstPath);
        
            // AssetDatabase.SaveAssets();
            // AssetDatabase.Refresh();

            return plugin;
        }

        // public static void AttachPluginsToConfig() {
        //     var allPlugins = Resources.LoadAll<UnityPlugin>("configs/WXPlugins") as UnityPlugin[];
        //     // Debug.Log(allPlugins);
        //     if (allPlugins != null) {
        //         ConfigManager.configEntry.unityPluginConfig.unityPlugins = new List<UnityPlugin>(allPlugins);
        //     }
        // }

        // public static void RemoveAllPlugins() {
        //     var allPlugins = Resources.LoadAll<UnityPlugin>("configs/WXPlugins") as UnityPlugin[];
        //     foreach(var p in allPlugins) {
        //         AssetDatabase.DeleteAsset(p.PathAtAssets());
        //     }
        // }

        // public static void DeattachAllPlugins() {
        //     ConfigManager.configEntry.unityPluginConfig.unityPlugins.Clear();
        // }


        static UnityPluginUtil() {
            UnityEngineStub = ScriptableObject.CreateInstance<UnityPlugin>();
            UnityEngineStub.enable = true;
            UnityEngineStub.pluginName = "UnityEngine";
            UnityEngineStub.type = UnityPlugin.PluginType.Other;
            UnityEngineStub.pluginState = UnityPlugin.PluginState.stub;
            UnityEngineStub.stubConfig = new UnityPlugin.StubConfig {
                generateJSTemplate = false,
                generateStub = true
            };

            UnityEngineStub.stubPath = new UnityPlugin.StubPath(UnityEngineStub);
            InitXML();
        }
    }
}