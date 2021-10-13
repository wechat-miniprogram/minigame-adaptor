using System;
using System.Collections.Generic;
using UnityEngine;

namespace WeChat
{
    /**
     * 表示导出插件一个子模块的抽象类
     * 
     */
    public abstract class ExportPluginModule
    {
        // 核心模块
        public static ExportPluginModule coreModule;
        // ngui模块
        public static ExportPluginModule nguiModule;

 
        public static void registerExportPluginModule(string name, ExportPluginModule pluginModule)
        {
            if (name == "core")
            {
                coreModule = pluginModule;
            }
            if (name == "ngui")
            {
                nguiModule = pluginModule;
            }
        }

        public string ModuleName
        {
            get; set;
        }

        public string ModuleVersion
        {
            get; set;
        }

        // 首次安装回调，只应执行一次
        public virtual void OnModuleInstall()
        {

        }

        // 现在没有卸载了，先删掉
        //public virtual void OnModuleUninstall()
        //{

        //}

        // 初始化回调
        // 每次重新编译后都会走到
        public virtual void OnModuleInit()
        {

        }

        // 要清资源
        public virtual void OnModuleVersionChange()
        {

        }


        public ExportPluginModule(string moduleName = "module", string moduleVersion = "1.0.0")
        {
            this.ModuleName = moduleName;
            this.ModuleVersion = moduleVersion;
            // Debug.Log(moduleName);
            BeefBall.onInitializeCheckers.Add(OnModuleInit);
            OnModuleInstall();
        }

        public override string ToString()
        {
            return "[WXEngineModule]: <" + this.ModuleName + "> (" + this.ModuleVersion + ")";
        }

    }
}
