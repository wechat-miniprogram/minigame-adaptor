using UnityEngine;
using System;
using System.Collections.Generic;
using UnityEditor;

namespace WeChat {
    /**
     * 在一键导出里，用于记录下所有要进行prefab导出的路径的ScriptableObject
     *
     */ 

    [Serializable]     
    public class ExportDirectoryList: WXScriptableObject {
        public List<ExportDirectoryItem> exportDirectories;

        [Serializable]
        public class ExportDirectoryItem
        {

            public bool enable = true;
            public bool isNGUI = false;
            public bool isUGUI = false;
            public UnityEngine.Object directory;
            public ExportDirectoryItem(string path)
            {
                directory = AssetDatabase.LoadAssetAtPath<UnityEngine.Object>(path);
                //Debug.Log(directory.PathAtAssets);
            }
        }
    }
}