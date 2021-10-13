using System;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace WeChat
{

    // example inherit class
    [InitializeOnLoad]
    public class CoreExportModule : ExportPluginModule
    {
        static CoreExportModule()
        {
            ExportPluginModule.registerExportPluginModule("core", new CoreExportModule());
        }

        // 0.7.0为导出插件版本。该字符串会在构建流程里被修改，请勿改动
        public CoreExportModule() : base("core", "0.7.0") { }

        public override void OnModuleInstall()
        {
            InitCommonResource();
            ExportPluginModule.registerExportPluginModule("core", this);
        }

        public override void OnModuleInit()
        {
            InitCommonResource();
            ExportPluginModule.registerExportPluginModule("core", this);
        }

        public override void OnModuleVersionChange()
        {
            InitCommonResource(true);
        }

        /**
         * 下载基础资源如shader等。
         * @param forceDownload 是否要强制下载。供版本切换的时候使用
         */
        public static void InitCommonResource(bool forceDownload = false)
        {

            var dir = Path.Combine(Application.dataPath, "__wx__tmp__common_download~");
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            string commonPath = Path.Combine(DirectoryStructure.TopRoot, "Common");
            if (!Directory.Exists(commonPath))
            {
                Directory.CreateDirectory(commonPath);
            }

            // Init shaders
            //if (InstallShadersToCommon ()) 
            {
                string shadersPath = Path.Combine(DirectoryStructure.TopRoot, "Common/Shaders");
                
                if (!Directory.Exists(shadersPath) || forceDownload)
                {
                    if (!Directory.Exists(shadersPath))
                    {
                        Directory.CreateDirectory(shadersPath);
                    }
                    CoreExportModule.InitCoreResource(dir, "Shaders", shadersPath);
                }
            }

            // Init Tools
            string toolsPath = Path.Combine(DirectoryStructure.TopRoot, "Common/Tools");
            
            if (!Directory.Exists(toolsPath) || forceDownload)
            {
                if (!Directory.Exists(toolsPath))
                {
                    Directory.CreateDirectory(toolsPath);
                }
                CoreExportModule.InitCoreResource(dir, "Tools", toolsPath);
            }

            wxFileUtil.DeleteDirectory(dir);
        }
        private static void InitCoreResource(string cacheDir, string packageName, string destPath)
        {
            // 源码版本不下载资源
            if (PluginHub.distribution == "Debug")
            {
                return;
            }
            string path = Path.Combine(cacheDir, packageName);
            var url = WXConfig.moduleCDNPrefix + PluginHub.frameworkVersion + "/" + packageName + ".zip";
            ProjectCreator.downloadAndUnpackWebURL(cacheDir, url);
            wxFileUtil.CopyDirectory(path, destPath);

            AssetDatabase.Refresh();
            wxFileUtil.DeleteDirectory(path);
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

    }
}