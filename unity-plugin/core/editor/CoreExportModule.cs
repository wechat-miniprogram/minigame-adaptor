using System;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace WeChat {

    // example inherit class
    [InitializeOnLoad]
    public class CoreExportModule : ExportPluginModule {
        static CoreExportModule () {
            ExportPluginModule.registerExportPluginModule ("core", new CoreExportModule ());
        }

        public CoreExportModule () : base ("core", "0.7.0") { }

        public override void OnModuleInstall () {
            InitCommonResource ();
            ExportPluginModule.registerExportPluginModule ("core", this);
        }

        public override void OnModuleInit () {
            InitCommonResource ();
            ExportPluginModule.registerExportPluginModule ("core", this);
        }

        public override void OnModuleVersionChange () { }

        public static void InitCommonResource () {

            var dir = Path.Combine (Application.dataPath, "__wx__tmp__coomon_download~");
            if (!Directory.Exists (dir)) {
                Directory.CreateDirectory (dir);
            }

            string commonPath = Path.Combine (DirectoryStructure.TopRoot, "Common");
            if (!Directory.Exists (commonPath)) {
                Directory.CreateDirectory (commonPath);
            }

            // Init shaders
            //if (InstallShadersToCommon ()) 
            {
                string shadersPath = Path.Combine (DirectoryStructure.TopRoot, "Common/Shaders");
                if (!Directory.Exists (shadersPath)) {   
                    Directory.CreateDirectory (shadersPath);
                }
                CoreExportModule.InitCoreResource (dir, "Shaders", shadersPath);
            }

            // Init Tools
            string toolsPath = Path.Combine (DirectoryStructure.TopRoot, "Common/Tools");
            if (!Directory.Exists (toolsPath)) {
                Directory.CreateDirectory (toolsPath);
            }
            CoreExportModule.InitCoreResource (dir, "Tools", toolsPath);

            wxFileUtil.DeleteDirectory (dir);
        }
        private static void InitCoreResource (string cacheDir, string packageName, string destPath) {

            string path = Path.Combine (cacheDir, packageName);
            var url = WXConfig.moduleCDNPrefix + PluginHub.frameworkVersion + "/" + packageName + ".zip";
            ProjectCreator.downloadAndUnpackWebURL (cacheDir, url);
            wxFileUtil.CopyDirectory (path, destPath);
            
            AssetDatabase.Refresh ();
            wxFileUtil.DeleteDirectory (path);
        }

        // 源码模式不下载Shader ————kumo.从DLL切到源码meta不一致
//        private static bool InstallShadersToCommon () {
//#if ENVIRONMENT_LIBRARY
//            return true;
//#else
//             // 源码模式 如果用户原先下载过DLL，手动删除shader目录
//             string shadersPath = Path.Combine (DirectoryStructure.TopRoot, "Common/Shaders");
//             if (Directory.Exists (shadersPath)) {
//                 wxFileUtil.DeleteDirectory (shadersPath);
//             }
//             return false;
// #endif       
//        }

        // 判定Common是不是已存在，为了保证Shader.meta不覆盖
        // 源码环境不下载Common. add by kumo
        public static bool IsCommonExist(){
            #if ENVIRONMENT_LIBRARY
                string commonPath = Path.Combine(DirectoryStructure.TopRoot, "Common");
                return Directory.Exists(commonPath);
            #else
                return true;
            #endif
        }
    }
}