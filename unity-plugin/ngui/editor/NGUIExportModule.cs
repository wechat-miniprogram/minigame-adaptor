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

        public NGUIExportModule() : base("ngui", "0.7.0")
        {

        }

        public override void OnModuleInstall()
        {
            // Debug.Log(this.ToString() + " install callback");
        }

        //public override void OnModuleUninstall()
        //{
        //    Debug.Log(this.ToString() + " uninstall callback");
        //}

        public override void OnModuleInit()
        {
            // Debug.Log(this.ToString() + " init callback");
        }


        public override void OnModuleVersionChange()
        {
            Debug.Log(this.ToString() + " version change callback");
        }

    }
}