using UnityEngine;
using UnityEditor;
using System;
using System.Linq;
using System.Collections.Generic;
using TheObject.Net.Utilities;

namespace WeChat {
    public static class ConfigUtil {
        //public static string PathToAssets(this string s) {
        //    var idxToAssets = s.IndexOf("Assets/");
        //    if (idxToAssets < 0) {
        //        Debug.LogError("invalid path");
        //        return s;
        //    }
            
        //    return s.Substring(idxToAssets);
        //}

        public static string PathToProject(this string s) {
            var idxToProject = s.IndexOf("Assets/");
            Debug.Log(idxToProject);
            if (idxToProject < 0) {
                Debug.LogError("invalid path");
                return s;
            }
            Debug.Log(s.Substring(idxToProject + 7));
            return s.Substring(idxToProject + 7);
        }

        public static string PathAtAssets(this UnityEngine.Object asset) {
            return AssetDatabase.GetAssetPath(asset);
        }

        public static string FilesListToLine(this IEnumerable<string> files) {
            return files.Join(";").TrimStart(';').TrimEnd(';');
        }

    }
}