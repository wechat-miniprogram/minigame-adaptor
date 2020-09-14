using UnityEngine;
using System;
using System.Collections.Generic;

namespace WeChat {

    // [CreateAssetMenu(fileName="ConfigEntry", menuName="WeChat/Configs/ConfigEntry", order=99)]
    public class ConfigEntry: WXScriptableObject {
        public GlobalConfig globalConfig;

        public ProjectExportConfig projectExportConfig;

        public ExportDirectoryList exportDirectoryListConfig;

        public UnityPluginConfig unityPluginConfig;
    }
}