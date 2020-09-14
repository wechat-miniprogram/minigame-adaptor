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
    public class ExportSceneList: WXScriptableObject {
        public List<ExportSceneItem> exportScenes;

        [Serializable]
        public class ExportSceneItem
        {

            public bool enable = true;
            public bool isNGUI = false;
            public bool isUGUI = false;
            public UnityEngine.Object scene;
            public ExportSceneItem(string path)
            {
                scene = AssetDatabase.LoadAssetAtPath<UnityEngine.Object>(path.PathToAssets());
            }
        }
    }
}