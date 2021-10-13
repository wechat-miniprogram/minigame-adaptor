using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;

namespace WeChat
{
    // example inherit class
    [InitializeOnLoad]
    public class BehaviourExportModule : ExportPluginModule
    {
        static BehaviourExportModule()
        {
            ExportPluginModule.registerExportPluginModule("behaviour", new BehaviourExportModule());
        }

        public BehaviourExportModule() : base("behaviour", "0.7.0")
        {

        }
    }
}