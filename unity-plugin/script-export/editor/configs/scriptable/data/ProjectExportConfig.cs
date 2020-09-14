using UnityEngine;
using UnityEditor;
using System;
using System.Collections.Generic;

namespace WeChat {

    // [CreateAssetMenu(fileName="ProjectExportConfig", menuName="WeChat/Configs/WXProjectExportConfig", order=98)]
    public class ProjectExportConfig: WXScriptableObject {

        [Serializable]
        public class ProjectConfigs {

            [Serializable]
            public class FolderOrGlobPath {
                public enum PathType {
                    Glob,
                    Folder
                }

                public PathType pathType;
                public string glob;
                public UnityEngine.Object folder;

                public FolderOrGlobPath(string glob = "", UnityEngine.Object folder = null) {
                    this.glob = glob;
                    this.folder = folder;
                }
            }

            public List<FolderOrGlobPath> sources = new List<FolderOrGlobPath>() {
                new FolderOrGlobPath("Assets/**/*.cs")
            };
            public List<FolderOrGlobPath> excludes = new List<FolderOrGlobPath>() {
                new FolderOrGlobPath("[Ll]ibrary/**"),
                new FolderOrGlobPath("**/[Ee]ditor/**"),
                new FolderOrGlobPath("**/[Ee]xample/**"),
                new FolderOrGlobPath("**/[Ee]xamples/**"),
                new FolderOrGlobPath("**/UnityTool/core/**"),
                new FolderOrGlobPath("**/unity-plugin/core/**")
            };
            public List<FolderOrGlobPath> libs = new List<FolderOrGlobPath>() {
                new FolderOrGlobPath("Assets/**.dll"),
                new FolderOrGlobPath("Library/**.dll")
            };
        }
        public ProjectConfigs project;
        public List<string> defineMacros = new List<string>() {
            "UNITY_WAGAME",
            "UNITY_WAGAME_RES",
            "UNITY_2018_1_OR_NEWER",
            "UNITY_2018_4_OR_NEWER"
        };
        public bool globIgnoreCase = false;

    }
}