using System;
using UnityEditor;
using UnityEngine;

namespace WeChat
{
    // example inherit class
    [InitializeOnLoad]
    public class NGUIExportModule : ExportPluginModule
    {
        static NGUIExportModule()
        {
            ExportPluginModule.registerExportPluginModule("ngui", new NGUIExportModule());
        }

        // 0.7.0为导出插件版本。该字符串会在构建流程里被修改，请勿改动
        public NGUIExportModule() : base("ngui", "0.7.0")
        {

        }

        public override void OnModuleInstall()
        {
            Debug.Log(this.ToString() + " install callback");
        }

        //public override void OnModuleUninstall()
        //{
        //    Debug.Log(this.ToString() + " uninstall callback");
        //}

        public override void OnModuleInit()
        {
            Debug.Log(this.ToString() + " init callback");
        }


        public override void OnModuleVersionChange()
        {
            Debug.Log(this.ToString() + " version change callback");
        }

    }
}