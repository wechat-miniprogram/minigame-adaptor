using UnityEngine;
using UnityEditor;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using DotNet.Globbing;
using TheObject.Net.Utilities;


namespace WeChat{
    public static class ProjectExportUtil {

        // [MenuItem("test/Test Project Export Config Util")]
        // public static void TestProjectExportConfigUtil() {
        //     var project = ConfigManager.configEntry.projectExportConfig;
        //     Debug.Log(GetProjectSources(project));
        //     Debug.Log(GetProjectExcludes(project));
        //     Debug.Log(GetProjectLibs(project));

        //     var plugin = ConfigManager.configEntry.unityPluginConfig;
        //     // Debug.Log(GetBridgeExcludes(project, plugin));
        //     var path = Path.Combine(Path.GetFullPath("."), "1.txt");
        //     Debug.Log(path);
        //     wxFileUtil.WriteData(new FileStream(path, FileMode.Create, FileAccess.Write), GetBridgeExcludes(project, plugin).FilesListToLine());

        //     // Debug.Log("Exclude: " + GetExclude(plugins[0]));
        //     // var exc1 = GetExcludes(plugins);
        //     // var exc2 = GetExcludes(ConfigManager.configEntry.unityPluginConfig);
        //     // Debug.Log("Excludes1: " + exc1);
        //     // Debug.Log("Excludes2: " + exc2);
        //     // Debug.Log(exc1 == exc2);

        //     // Debug.Log("Source: " + GetSource(plugins[0]));
        //     // var src1 = GetExcludes(plugins);
        //     // var src2 = GetExcludes(ConfigManager.configEntry.unityPluginConfig);
        //     // Debug.Log("Excludes1: " + exc1);
        //     // Debug.Log("Excludes2: " + exc2);
        //     // Debug.Log(src1 == src2);

        //     // Debug.Log("Lib: " + GetLib(plugins[0]));
        //     // var lib1 = GetLibs(plugins);
        //     // var lib2 = GetLibs(ConfigManager.configEntry.unityPluginConfig);
        //     // Debug.Log("Excludes1: " + lib2);
        //     // Debug.Log("Excludes2: " + lib2);
        //     // Debug.Log(lib1 == lib2);
        // }

        // public static List<string> GetProjectFinalSources(ProjectExportConfig projectConfig, UnityPluginConfig pluginConfig) {
        //     var src = GetProjectSources(projectConfig);
        //     var exc = GetBridgeExcludes(projectConfig, pluginConfig);

        //     var pluginRoots = PathUtil.GetFiles(
        //         pluginConfig.unityPlugins
        //         .Select(p => {
        //             var path = p.pluginPath.pluginRoot.PathAtAssets() + "/**";
        //             return path;
        //             })
        //         );

        //     return src.Except(exc).Except(pluginRoots).ToList();
        // }

        public static List<string> GetProjectSources(ProjectExportConfig projectConfig) {
            return GetProjectFilesFromConfig(projectConfig.project.sources, "/*.cs");
        }

        //
        public static List<string> GetProjectSourcesWithoutExcludes(ProjectExportConfig projectConfig)
        {
            List<string> sources = GetProjectSources(projectConfig);
            List<string> excludes = GetProjectExcludes(projectConfig);
            List<string> result = new List<string>();
            foreach (var source in sources) {
                bool isExclude = false;
                foreach (var exclude in excludes) {
                    if (exclude.Equals(source)) {
                        isExclude = true;
                        break;
                    }
                }
                if (!isExclude) {
                    result.Add(source);
                }
            }
            return result;
        }

        public static List<string> GetProjectExcludes(ProjectExportConfig projectConfig) {
            return GetProjectFilesFromConfig(projectConfig.project.excludes);
        }

        public static List<string> GetProjectLibs(ProjectExportConfig projectConfig, List<string> excludesGlob) {
            List<string> sources = GetProjectFilesFromConfig(projectConfig.project.libs, "/*.dll");

            var ignoreCase = ConfigManager.configEntry.projectExportConfig.globIgnoreCase;
            var excludes = PathUtil.GetFiles(excludesGlob, ignoreCase).ToList();
            
            List<string> result = new List<string>();
            foreach (var source in sources) {
                bool isExclude = false;
                foreach (var exclude in excludes) {
                    if (exclude.Equals(source)) {
                        isExclude = true;
                        break;
                    }
                }
                if (!isExclude) {
                    result.Add(source);
                }
            }
            return result;
            
        }

        public static List<string> GetBridgeExcludes(ProjectExportConfig projectConfig, UnityPluginConfig pluginConfig) {
            var projectExcludes = GetProjectExcludes(projectConfig);
            // Debug.Log(projectExcludes.Join(";"));

            var pluginsExcludes = new List<string>();
            var pluginsRoot = new List<UnityEngine.Object>();
            var pluginsStubCs = new List<string>();
            pluginConfig.unityPlugins.ForEach(p => {
                // 忽略插件生成的stub.cs
                if (p.stubPath.stubCSPath != null && File.Exists(p.stubPath.stubCSPath)) {
                    pluginsStubCs.Add(p.stubPath.stubCSPath.PathToAssets());
                }
                // 忽略插件生成的ref.cs
                if (p.stubPath.stubRefCSPath != null && File.Exists(p.stubPath.stubRefCSPath)) {
                    pluginsStubCs.Add(p.stubPath.stubRefCSPath.PathToAssets());
                }
                //  忽略插件源码
                if(p.enable) {
                    pluginsRoot.Add(p.pluginPath.pluginRoot);
                }
            });

            // unity stub
            var unityStub = UnityPluginUtil.GetUnityEngineStub();
            pluginsStubCs.Add(unityStub.stubPath.stubCSPath.PathToAssets());

            var pluginsFiles = UnityPluginUtil.GetPluginFilesFromConfig(pluginsRoot);
            if (pluginsFiles != null) {
                pluginsExcludes.AddRange(pluginsFiles);
                // Debug.Log(pluginsExcludes.Join(";"));
            }
            pluginsExcludes.AddRange(pluginsStubCs);
            // Debug.Log(pluginsStubCs.Join(";"));


            projectExcludes.AddRange(pluginsExcludes);

            return projectExcludes;
        }



        private static List<string> GetProjectFilesFromConfig(List<ProjectExportConfig.ProjectConfigs.FolderOrGlobPath> locationList, string extra = "") {
            // var info = new List<string>();

            var globs = new List<string>();

            locationList.ForEach(i => {
                if (i.pathType == ProjectExportConfig.ProjectConfigs.FolderOrGlobPath.PathType.Folder) {
                    if (i.folder == null) return;

                    // info.Add(i.folder.PathAtAssets());
                    globs.Add(i.folder.PathAtAssets() + "/**" + extra);
                } else {
                    if (i.glob == null || i.glob.Length == 0) return;

                    globs.Add(i.glob);
                }
            });
            
            var ignoreCase = ConfigManager.configEntry.projectExportConfig.globIgnoreCase;
            var res = PathUtil.GetFiles(globs, ignoreCase).ToList();
            // info.AddRange(PathProc.GetFiles(globs));

            // return info.Join(";");

            return res;
        }
    }

}


