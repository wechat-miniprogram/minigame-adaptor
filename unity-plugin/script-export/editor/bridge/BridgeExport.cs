using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;

using Bridge.Contract;
using Bridge.Translator;

using UnityEngine;
using UnityEditor;

using TheObject.Net.Utilities;


namespace WeChat {

    [InitializeOnLoad]
    public class BridgeExport {

        public static bool isProcessing = false;

        private static DirectoryStructure references;
        private static DirectoryStructure build;
        private static DirectoryStructure configs;

        public static string TMP_BINDING_CACHE {
            get; private set;
        }

        public static string TMP_CODE_PATH {
            get; private set;
        }

        public static string PROJECT_CODE_PATH {
            get; private set;
        }

        static BridgeExport() {
            references = DirectoryBuilder.RegisterDirectory("references", new DirectoryStructure("References~"));
            build = DirectoryBuilder.RegisterDirectory("build", new DirectoryStructure("Build~"));
            configs = DirectoryBuilder.RegisterDirectory("configs", new DirectoryStructure("Configs"));

            TMP_BINDING_CACHE = build["BindingsCache"].FullPath;
            TMP_CODE_PATH = build["Temp"].FullPath;
            PROJECT_CODE_PATH = build["Project"].FullPath;
        }



        // [MenuItem("WeChat/Export/Export Code")]
        public static void ExportCodeMenu()
        {
            EditorUtility.DisplayProgressBar("Exporting", "...", 0.0f);
            try
            {
                ExportPreCheck();
                ExportCode();
            } catch (Exception e) {
                Debug.LogException(e);
            } finally {
                EditorUtility.DisplayProgressBar("Exporting", "finish.", 1.0f);
                ClearProgressBar();
            }
        }

        // [MenuItem("WeChat/Export/Export Plugin")]
        public static void ExportPluginMenu(UnityPlugin single = null)
        {
            EditorUtility.DisplayProgressBar("Exporting", "...", 0.0f);
            try
            {
                ExportPreCheck();
                ExportPlugins(single);
            } catch (Exception e) {
                Debug.LogException(e);
            } finally {
                EditorUtility.DisplayProgressBar("Exporting", "finish.", 1.0f);
                ClearProgressBar();
            }
        }
        
        [MenuItem("微信小游戏/调试/清除进度条 #%K")]
        public static void ClearProgressBar()
        {
            BridgeExport.isProcessing = false;
            EditorUtility.ClearProgressBar();
        }

        [MenuItem("微信小游戏/清除缓存/代码缓存/清除临时缓存")]
        public static void RemoveTempCodeDir()
        {
            DirectoryUtil.DeleteDirectory(build["Temp"].FullPath);
            DirectoryUtil.DeleteDirectory(build["Output"].FullPath);
        }

        [MenuItem("微信小游戏/清除缓存/代码缓存/清除工程代码缓存")]
        public static void RemoveProjectCodeDir()
        {
            DirectoryUtil.DeleteDirectory(build["Project"].FullPath);
        }

        [MenuItem("微信小游戏/清除缓存/代码缓存/清除所有插件代码缓存")]
        public static void RemovePluginsCodeDir()
        {
            var plugins = ConfigManager.configEntry.unityPluginConfig.unityPlugins;
            foreach(var p in plugins) {
                if (p.pluginState == UnityPlugin.PluginState.convert) {
                    if (p.convertedPath.convertedJSPath != null && Directory.Exists(p.convertedPath.convertedJSPath)) {
                        Directory.Delete(p.convertedPath.convertedJSPath, true);
                    }
                } else {
                    if (p.stubPath.stubJSPath != null && Directory.Exists(p.stubPath.stubJSPath)) {
                        Directory.Delete(p.stubPath.stubJSPath, true);
                    }
                }
            }
        }

        [MenuItem("微信小游戏/清除缓存/代码缓存/清除binding文件缓存")]
        public static void RemoveBindingCache() {
            DirectoryUtil.DeleteDirectory(build["BindingsCache"].FullPath);
        }

        [MenuItem("微信小游戏/清除缓存/代码缓存/清除所有代码缓存")]
        public static void RemoveBridgeOutputDir() {
            RemoveBindingCache();
            RemovePluginsCodeDir();
            RemoveProjectCodeDir();
            RemoveTempCodeDir();
        }

        private static void ProcessBridge(BridgeOptions bridgeOptions, Bridge.Translator.Logging.Logger logger, Action<TranslatorProcessor> UserPreProcess = null,
                                                                                                                Action<TranslatorProcessor> UserPostProcess = null) {

            var processor = new TranslatorProcessor(bridgeOptions, logger);

            try {
                
                processor.PreProcess();
                UserPreProcess?.Invoke(processor);

                processor.Process();

                processor.PostProcess();
                UserPostProcess?.Invoke(processor);
            }
            catch (EmitterException ex)
            {
                var errMsg = string.Format("Bridge.NET Compiler error: {1} ({2}, {3}) {0}", ex.ToString(), ex.FileName, ex.StartLine, ex.StartColumn);
                logger.Error(errMsg);
                Debug.LogError(errMsg);
            }
            catch (Exception ex)
            {
                var ee = processor.Translator != null ? processor.Translator.CreateExceptionFromLastNode() : null;

                if (ee != null)
                {
                    var errMsg = string.Format("Bridge.NET Compiler error: {1} ({2}, {3}) {0}", ee.ToString(), ee.FileName, ee.StartLine, ee.StartColumn);
                    logger.Error(errMsg);
                    Debug.LogError(errMsg);
                }
                else
                {
                    var errMsg = string.Format("Bridge.NET Compiler error: {0}", ex.ToString());
                    logger.Error(errMsg);
                    Debug.LogError(errMsg);
                }
            }
            finally {
                ClearProgressBar();
            }
        }

        private static List<string> GetDepDlls(UnityPluginConfig pluginConfig) {
            var dlls = new List<string>();

            pluginConfig.unityPlugins
                .Append(UnityPluginUtil.GetUnityEngineStub())
                .Where(p => p.enable).ToList()
                .ForEach(plugin => {
                if (plugin.pluginState == UnityPlugin.PluginState.convert) {
                    if (plugin.convertedPath.convertedDLLPath != null && File.Exists(plugin.convertedPath.convertedDLLPath)) {
                        dlls.Add(plugin.convertedPath.convertedDLLPath);
                    }
                } else {
                    if (plugin.stubPath.stubDLLPath != null && File.Exists(plugin.stubPath.stubDLLPath)) {
                        dlls.Add(plugin.stubPath.stubDLLPath);                        
                    }
                }
            });

            return dlls;
        }

        private static List<string> GetDepDlls(UnityPlugin plugin) {
            var dlls = new List<string>();

            if (plugin != null) {
                if (plugin.pluginState == UnityPlugin.PluginState.convert) {
                    if (plugin.convertedPath.convertedDLLPath != null && File.Exists(plugin.convertedPath.convertedDLLPath)) {
                        dlls.Add(plugin.convertedPath.convertedDLLPath);
                    }
                } else {
                    if (plugin.stubPath.stubDLLPath != null && File.Exists(plugin.stubPath.stubDLLPath)) {
                        dlls.Add(plugin.stubPath.stubDLLPath);                        
                    }
                    if (plugin.stubPath.stubRefDLLPath != null && File.Exists(plugin.stubPath.stubRefDLLPath)) {
                        dlls.Add(plugin.stubPath.stubRefDLLPath);                        
                    }
                }
            }

            var unityDllpath = UnityPluginUtil.GetUnityEngineStub().stubPath.stubDLLPath;
            if (File.Exists(unityDllpath)) {
                dlls.Add(unityDllpath);                
            }

            return dlls;
        }

        private static void ExportPreCheck() {
            // Unity Stub
            var dllPath = Path.Combine(DirectoryStructure.TopRoot, "Build~", "Plugins", "Stub", "UnityEngine", "DLLDist", "UnityEngine-stub.dll");
            var dll = new FileInfo(dllPath);       

            var csPath = Path.Combine(DirectoryStructure.TopRoot, "Build~", "Plugins", "Stub", "UnityEngine", "CSDist", "UnityEngine.cs");
            var cs = new FileInfo(csPath);

            if (!cs.Exists || cs.Length <= 0 || !dll.Exists || dll.Length <= 0) {
                GenerateStubProc.GeneUnityStub();
            }

            // bridge
            var bridgePath = Path.Combine(DirectoryStructure.TopRoot, "References~", "Bridge", "Bridge.dll");
            var bridge = new FileInfo(bridgePath);
            if (!bridge.Exists || bridge.Length <= 0) {
                ConfigManager.Init();
            }
            
        }

        private static void ExportCode()
        {
            // clear temp/cache
            RemoveProjectCodeDir();
            RemoveTempCodeDir();


            var logger = new Bridge.Translator.Logging.Logger("project_export_logger", true, 
                LoggerLevel.None, false, new MyLoggerWriter(), new Bridge.Translator.Logging.FileLoggerWriter());
            
            // var config = Config.Get();
            var projectConfig = ConfigManager.configEntry.projectExportConfig;
            var pluginConfig = ConfigManager.configEntry.unityPluginConfig;

            var bridgeOptions = new BridgeOptions();
            ConfigureBridgeOptionsForProject(ref bridgeOptions, projectConfig, pluginConfig);


            // ReferenceBuilder.Build(projectConfig, pluginConfig);
            ProcessBridge(bridgeOptions, logger,

                // Pre Process
                (processor) => {
                    // add plugin outside
                    logger.Info("Add Plugin...");
                    processor.Translator.Plugins.AddPlugin(new BridgePlugin());
                    logger.Info("Add Plugin...[done]");

                    // remove all dll2
                    var distDir = references["Bridge"].FullPath;
                    Directory.EnumerateFiles(distDir, "*.dll2", SearchOption.AllDirectories)
                        .ToList()
                        .ForEach(f => {
                            File.Delete(f);
                        });


                    // copy all plugins dlls into references path
                    var dlls = GetDepDlls(pluginConfig);

                    dlls.ForEach(dll => {
                        var fileName = Path.GetFileNameWithoutExtension(dll);
                        // Debug.Log(fileName);
                        File.Copy(dll, Path.Combine(distDir, fileName + ".dll2"), true);
                    });

                },

                // Post Process
                (processor) => {
                    // caching binding scripts
                    var dir = build["Temp"]["bindings"];
                    var bindingScripts = Directory.EnumerateFiles(dir, "*.js", SearchOption.AllDirectories);
                    var cacheDir = build["BindingsCache"].FullPath;
                    if (!Directory.Exists(cacheDir)) {
                        Directory.CreateDirectory(cacheDir);
                    }
                    foreach(var bs in bindingScripts) {
                        var fileName = Path.GetFileName(bs);
                        File.Copy(bs, Path.Combine(cacheDir, fileName), true);
                    }

                    // move Temp/ files to Project/
                    var tmpPath = build["Temp"].FullPath;
                    var projDir = build["Project"].FullPath;
                    DirectoryUtil.CopyDirectory(tmpPath, projDir);
                    DirectoryUtil.DeleteDirectory(tmpPath);

                    Debug.Log("Project code convertion finish.");
                }
            );
        }
        private static void ConfigureBridgeOptionsForProject(ref BridgeOptions bridgeOptions, ProjectExportConfig projectConfig, UnityPluginConfig pluginConfig) {
            bridgeOptions.ProjectProperties = new ProjectProperties();

            bridgeOptions.BridgeLocation = references["Bridge"]["Bridge.dll"];
            bridgeOptions.Lib = build["Output"]["minigame-adaptor-project.dll"];
            bridgeOptions.ReferencesPath = references["Bridge"].FullPath;
            bridgeOptions.ProjectProperties.Configuration = configs["Text"]["bridge.json"].PathToAssets();

            bridgeOptions.Folder = Path.GetFullPath(".");
            bridgeOptions.Sources = ProjectExportUtil.GetProjectSources(projectConfig).FilesListToLine();
            bridgeOptions.ExcludeSubFolders = ProjectExportUtil.GetBridgeExcludes(projectConfig, pluginConfig).FilesListToLine();

            bridgeOptions.Rebuild = true;
            bridgeOptions.Recursive = true;
            bridgeOptions.Name = "minigame-adaptor-project";
            bridgeOptions.OutputLocation = bridgeOptions.Folder;
            bridgeOptions.DefaultFileName = Path.GetFileNameWithoutExtension(bridgeOptions.Lib);
            bridgeOptions.ProjectProperties.AssemblyName = bridgeOptions.DefaultFileName;
            bridgeOptions.ProjectProperties.DefineConstants = projectConfig.defineMacros.Join(";");
        }

        private static void ConfigureBridgeOptionsForConvertPlugin(ref BridgeOptions bridgeOptions, UnityPlugin config) {
            bridgeOptions.ProjectProperties = new ProjectProperties();

            bridgeOptions.BridgeLocation = references["Bridge"]["Bridge.dll"];
            bridgeOptions.Lib = build["Output"][config.pluginName + ".dll"];
            bridgeOptions.ReferencesPath = references["Bridge"].FullPath;
            bridgeOptions.ProjectProperties.Configuration = configs["Text"]["bridge.json"].PathToAssets();

            bridgeOptions.Folder = Path.GetFullPath(".");
            bridgeOptions.Sources = UnityPluginUtil.GetSource(config).FilesListToLine();
            bridgeOptions.ExcludeSubFolders = UnityPluginUtil.GetExclude(config).FilesListToLine();

            bridgeOptions.Rebuild = true;
            bridgeOptions.Recursive = true;
            bridgeOptions.Name = config.pluginName;
            bridgeOptions.OutputLocation = bridgeOptions.Folder;
            bridgeOptions.DefaultFileName = Path.GetFileNameWithoutExtension(bridgeOptions.Lib);
            bridgeOptions.ProjectProperties.AssemblyName = bridgeOptions.DefaultFileName;
            bridgeOptions.ProjectProperties.DefineConstants = config.defineMacros.Join(";");
        }


        private static void ConfigureBridgeOptionsForStubPlugin(ref BridgeOptions bridgeOptions, UnityPlugin config) {
            bridgeOptions.ProjectProperties = new ProjectProperties();

            bridgeOptions.BridgeLocation = references["Bridge"]["Bridge.dll"];
            bridgeOptions.Lib = build["Output"][config.pluginName + "-stub.dll"];
            bridgeOptions.ReferencesPath = references["Bridge"].FullPath;
            bridgeOptions.ProjectProperties.Configuration = configs["Text"]["bridge.json"].PathToAssets();

            bridgeOptions.Folder = Path.GetFullPath(".");
            
            var src = config.stubPath.stubCSPath.PathToAssets() + ";" + config.stubPath.stubRefCSPath.PathToAssets();
            bridgeOptions.Sources = src;
            bridgeOptions.ExcludeSubFolders = "";

            bridgeOptions.Rebuild = true;
            bridgeOptions.Recursive = true;
            bridgeOptions.Name = config.pluginName;
            bridgeOptions.OutputLocation = bridgeOptions.Folder;
            bridgeOptions.DefaultFileName = Path.GetFileNameWithoutExtension(bridgeOptions.Lib);
            bridgeOptions.ProjectProperties.AssemblyName = bridgeOptions.DefaultFileName;
            bridgeOptions.ProjectProperties.DefineConstants = config.defineMacros.Join(";");
        }

        private static void ExportPlugins(UnityPlugin single = null) {


            var logger = new Bridge.Translator.Logging.Logger("plugins_export_logger", true, 
                LoggerLevel.None, false, new MyLoggerWriter(), new Bridge.Translator.Logging.FileLoggerWriter());
            
            
            var plugins = ConfigManager.configEntry.unityPluginConfig.unityPlugins;

            // 处理只转换一个插件的情况
            if (single != null) {
                // if (single.pluginState == UnityPlugin.PluginState.stub) {
                //     single.stubConfig.generateJSTemplate = true;
                // }
                plugins = new List<UnityPlugin>() { single };
            }

            plugins
                .Where(p => p.enable)
                .ToList()
                .ForEach(plugin => {
                    // clear temp
                    RemoveTempCodeDir();

                    var bridgeOptions = new BridgeOptions();
                    if (plugin.pluginState == UnityPlugin.PluginState.convert) {

                        plugin.convertedPath = new UnityPlugin.ConvertedPath(plugin);
                        ConfigureBridgeOptionsForConvertPlugin(ref bridgeOptions, plugin);

                        ProcessBridge(bridgeOptions, logger,
                            // Pre Process
                            (processor) => {
                                // add plugin outside
                                logger.Info("Add Plugin...");
                                if (single != null) {
                                    processor.Translator.Plugins.AddPlugin(new BridgePlugin(single.pluginName));
                                } else {
                                    processor.Translator.Plugins.AddPlugin(new BridgePlugin());
                                }
                                logger.Info("Add Plugin...[done]");

                                // clean js output
                                DirectoryUtil.DeleteDirectory(plugin.convertedPath.convertedJSPath);

                                {
                                    // remove all dll2
                                    var distDir = references["Bridge"].FullPath;
                                    Directory.EnumerateFiles(distDir, "*.dll2", SearchOption.AllDirectories)
                                        .ToList()
                                        .ForEach(f => {
                                            File.Delete(f);
                                        });
                                }

                                {
                                    // copy all plugins dlls into references path
                                    var dlls = GetDepDlls(plugin);
                                    var distDir = references["Bridge"].FullPath;
                                    dlls.ForEach(dll => {
                                        var fileName = Path.GetFileNameWithoutExtension(dll);
                                        File.Copy(dll, Path.Combine(distDir, fileName + ".dll2"), true);
                                    });
                                }

                            },
                            
                            // Post Process
                            (processor) => {
                                // caching binding scripts
                                var dir = build["Temp"]["bindings"];
                                var bindingScripts = Directory.EnumerateFiles(dir, "*.js", SearchOption.AllDirectories);
                                var cacheDir = build["BindingsCache"].FullPath;
                                if (!Directory.Exists(cacheDir)) {
                                    Directory.CreateDirectory(cacheDir);
                                }
                                foreach(var bs in bindingScripts) {
                                    var fileName = Path.GetFileName(bs);
                                    File.Copy(bs, Path.Combine(cacheDir, fileName), true);
                                }

                                // move files to plugin js output
                                var tmpPath = build["Temp"].FullPath;
                                var projDir = plugin.convertedPath.convertedJSPath;
                                DirectoryUtil.CopyDirectory(tmpPath, projDir);
                                DirectoryUtil.DeleteDirectory(tmpPath);

                                // move dll to plugin dll output
                                var projDllSrc = build["Output"][plugin.pluginName + ".dll"];
                                var projDllDist = plugin.convertedPath.convertedDLLPath;
                                File.Copy(projDllSrc, projDllDist, true);

                                Debug.Log("<" + plugin.pluginName + "> convertion finish.");
                            }
                        );
                    } else if (plugin.pluginState == UnityPlugin.PluginState.stub) {
                        // generate cs stub
                        if (plugin.stubConfig.generateStub) {
                            plugin.stubPath = new UnityPlugin.StubPath(plugin);
                            GenerateStubProc.GeneratePluginStub(plugin);
                            Debug.Log("Generate Stub <" + plugin.pluginName + ">");

                            // 自动生成桩代码只需要一次
                            plugin.stubConfig.generateStub = false;
                        }
 

                        // generate js stub template
                        if (plugin.stubConfig.generateJSTemplate) {
                            ConfigureBridgeOptionsForStubPlugin(ref bridgeOptions, plugin);
                            ProcessBridge(bridgeOptions, logger,
                                // Pre Process
                                (processor) => {
                                    // add plugin outside
                                    if (single != null) {
                                        processor.Translator.Plugins.AddPlugin(new BridgePlugin(single.pluginName + "-stub"));
                                    } else {
                                        processor.Translator.Plugins.AddPlugin(new BridgePlugin());
                                    }

                                    // clean js output
                                    DirectoryUtil.DeleteDirectory(plugin.stubPath.stubJSPath);

                                    {
                                        // remove all dll2
                                        var distDir = references["Bridge"].FullPath;
                                        Directory.EnumerateFiles(distDir, "*.dll2", SearchOption.AllDirectories)
                                            .ToList()
                                            .ForEach(f => {
                                                File.Delete(f);
                                            });
                                    }

                                    {
                                        // copy unity stub dll
                                        var dll = UnityPluginUtil.GetUnityEngineStub().stubPath.stubDLLPath;
                                        var fileName = Path.GetFileNameWithoutExtension(dll);
                                        var distDir = references["Bridge"].FullPath;
                                        File.Copy(dll, Path.Combine(distDir, fileName + ".dll2"), true);
                                    }
                                },
                                
                                // Post Process
                                (processor) => {
                                    // caching binding scripts
                                    var dir = build["Temp"]["bindings"];
                                    var bindingScripts = Directory.EnumerateFiles(dir, "*.js", SearchOption.AllDirectories);
                                    var cacheDir = build["BindingsCache"].FullPath;
                                    if (!Directory.Exists(cacheDir)) {
                                        Directory.CreateDirectory(cacheDir);
                                    }
                                    foreach(var bs in bindingScripts) {
                                        var fileName = Path.GetFileName(bs);
                                        File.Copy(bs, Path.Combine(cacheDir, fileName), true);
                                    }

                                    if (single != null) {
                                        single.stubConfig.generateJSTemplate = false;
                                    }
                                    // move files to plugin js output
                                    var tmpPath = build["Temp"].FullPath;
                                    var stubJSDir = plugin.stubPath.stubJSPath;
                                    DirectoryUtil.CopyDirectory(tmpPath, stubJSDir);
                                    DirectoryUtil.DeleteDirectory(tmpPath);
                                    Debug.Log("<" + plugin.pluginName + "> stub template convertion finish.");
                                }
                            );
                        }

                    }

                EditorUtility.DisplayProgressBar("Exporting", "...", 0.0f);
            });
        }
        

        private static List<Assembly> devAssemblies;
        public static List<Assembly> GetDevAssemblies() {
            if (devAssemblies != null) return devAssemblies;
            devAssemblies = new List<Assembly>();

            // 获取开发者脚本的Assembly
            var assemblies = System.AppDomain.CurrentDomain.GetAssemblies();
            foreach (var asm in assemblies) {
                // Debug.Log(asm.ManifestModule.Name);
                if (asm.ManifestModule.Name.Equals("Assembly-CSharp.dll") || asm.ManifestModule.Name.Equals("Assembly-CSharp-firstpass.dll")) {
                    devAssemblies.Add(asm);
                }
            }
            return devAssemblies;
        }

        private static HashSet<Type> devTypesSet;
        public static HashSet<Type> GetDevTypesSet() {
            if (devTypesSet != null) return devTypesSet;

            var asms = GetDevAssemblies();
            devTypesSet = new HashSet<Type>();
            foreach(var asm in asms) {
                foreach(var t in asm.GetTypes()) {
                    devTypesSet.Add(t);
                }
            }
            return devTypesSet;
        }

    public class MyLoggerWriter : Bridge.Contract.ILogger
        {
            public bool AlwaysLogErrors { get { return true; } }

            public bool BufferedMode { get; set; }

            public LoggerLevel LoggerLevel { get; set; }

            private float progress;

            public void Flush()
            {
            }

            public void Error(string message)
            {
            }

            public void Error(string message, string file, int lineNumber, int columnNumber, int endLineNumber, int endColumnNumber)
            {
                Debug.LogError(message);
            }

            public void Warn(string message)
            {
                Debug.LogWarning(message);
            }

            public void Info(string message)
            {
                // if (progress <= 1.0f) progress += 0.001f;
                MockProgress();
                EditorUtility.DisplayProgressBar("Exporting", message, progress);
                //if (!CheckLoggerLevel(LoggerLevel.Info)) {
                //    return;
                //}
                // Debug.Log(message);
            }

            public void Trace(string message)
            {
                // if (progress <= 1.0f) progress += 0.002f;
                MockProgress();
                EditorUtility.DisplayProgressBar("Exporting", message, progress);
                //if (!CheckLoggerLevel(LoggerLevel.Trace)) {
                //    return;
                //}
                // Debug.Log(message);
            }

            private bool CheckLoggerLevel(LoggerLevel level)
            {
                return (level <= this.LoggerLevel) || (level == LoggerLevel.Error && this.AlwaysLogErrors);
            }

            private void MockProgress() {
                if (progress < 0.2f) {
                    progress += 0.0002f;
                } else if (progress >= 0.2f && progress < 0.4f) {
                    progress += 0.0005f;
                } else if (progress >= 0.4f && progress < 0.7f) {
                    progress += 0.002f;
                } else if (progress >= 0.7f && progress < 0.95f) {
                    progress += 0.005f;
                } else if (progress >= 0.95f && progress <= 1.0f) {
                    progress += 0.0001f;
                }
            }
        }

    }
}
