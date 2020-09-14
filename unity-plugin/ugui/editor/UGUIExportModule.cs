using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;

namespace WeChat
{
    // example inherit class
    [InitializeOnLoad]
    public class UGUIExportModule : ExportPluginModule
    {
        static UGUIExportModule()
        {
            ExportPluginModule.registerExportPluginModule("ugui", new UGUIExportModule());
        }

        public UGUIExportModule() : base("ugui", "0.7.0")
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