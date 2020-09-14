using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

namespace WeChat
{

    [InitializeOnLoad]
    public static class DirectoryUtil {
        private static DirectoryStructure configs;
        static DirectoryUtil() {
            configs = DirectoryBuilder.RegisterDirectory("configs", new DirectoryStructure("Configs"));
            configs.AddReadme("## 存放配置文件");

            configs.AddSubDirectory("ScriptableObject", "## 存放ScriptableObject类型的配置文件");
            configs.AddSubDirectory("Text", "## 存放文本类型的配置文件");

            configs.BuildDirectory();
        }

        /// <summary>
        /// 创建一个ScriptableObject
        /// </summary>
        /// <param name="dst">相对于Assets/WeChatMiniGame/Configs/ScriptableObject的路径</param>
        /// <param name="overwrite">是否覆盖文件(默认为true)</param>
        /// <typeparam name="T">ScriptableObject的类型</typeparam>
        /// <returns></returns>
        public static T CreateScriptableObject<T>(string dst, bool overwrite = true) where T : ScriptableObject
        {
            if (!overwrite) {
                var __so = GetScriptableObject<T>(dst);
                if (__so != null) return __so;
            }
            if (!dst.EndsWith(".asset"))
            {
                dst += ".asset";
            }
            var time = DateTime.Now.ToFileTimeUtc();
            var so = ScriptableObject.CreateInstance<T>();
            var tmpDst = Path.Combine(Application.dataPath, time.ToString() + "__wx__tmp__so.asset");
            AssetDatabase.CreateAsset(so, tmpDst.PathToAssets()); 
            configs["ScriptableObject"][dst] = tmpDst;
            AssetDatabase.DeleteAsset(tmpDst.PathToAssets());
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();

            return GetScriptableObject<T>(dst);
        }

        /// <summary>
        /// 创建一个ScriptableObject
        /// </summary>
        /// <param name="dst">相对于Assets/WeChatMiniGame/Configs/ScriptableObject的路径</param>
        /// <param name="type">ScriptableObject的类型</param>
        /// <param name="overwrite">是否覆盖文件(默认为true)</param>
        /// <returns>ScriptableObject的类型</returns>
        public static ScriptableObject CreateScriptableObject(string dst, Type type, bool overwrite = true)
        {
            if (!overwrite) {
                var __so = GetScriptableObject(dst, type);
                if (__so != null) return __so;
            }

            if (!dst.EndsWith(".asset"))
            {
                dst += ".asset";
            }
            var time = DateTime.Now.ToFileTimeUtc();
            var so = ScriptableObject.CreateInstance(type);
            var tmpDst = Path.Combine(Application.dataPath, time.ToString() + "__wx__tmp__so.asset");
            AssetDatabase.CreateAsset(so, tmpDst.PathToAssets());
            configs["ScriptableObject"][dst] = tmpDst;
            AssetDatabase.DeleteAsset(tmpDst.PathToAssets());
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();

            return GetScriptableObject(dst, type);
        }

        /// <summary>
        /// 获取一个ScriptableObject
        /// </summary>
        /// <param name="relativePath">相对于Assets/WeChatMiniGame/Configs/ScriptableObject的路径</param>
        /// <typeparam name="T">ScriptableObject的类型</typeparam>
        /// <returns>若不存在ScriptableObject则返回null</returns>
        public static T GetScriptableObject<T>(string relativePath) where T: ScriptableObject{
            if (!relativePath.EndsWith(".asset")) {
                relativePath += ".asset";
            }
            if (!configs.HasFileAtSubDirectory("ScriptableObject", relativePath)) {
                return null;
            }
              
            var path = configs["ScriptableObject"][relativePath].PathToAssets();
            var so = AssetDatabase.LoadAssetAtPath(path, typeof(T)) as T;
            return so;
        }

        /// <summary>
        /// 获取一个ScriptableObject
        /// </summary>
        /// <param name="relativePath">相对于Assets/WeChatMiniGame/Configs/ScriptableObject的路径</param>
        /// <param name="type">ScriptableObject的类型</param>
        /// <returns>若不存在ScriptableObject则返回null</returns>
        public static ScriptableObject GetScriptableObject(string relativePath, Type type) {
            if (!relativePath.EndsWith(".asset")) {
                relativePath += ".asset";
            }
            if (!configs.HasFileAtSubDirectory("ScriptableObject", relativePath)) {
                return null;
            }
              
            var path = configs["ScriptableObject"][relativePath].PathToAssets();
            var so = AssetDatabase.LoadAssetAtPath(path, type) as ScriptableObject;
            return so;
        }
         
        /// <summary>
        /// 返回以 Assets/... 开头的路径
        /// </summary>
        /// <param name="fullPath">全路径</param>
        /// <returns>返回以 Assets/... 开头的路径</returns>
        public static string PathToAssets(this string fullPath)
        {
            int idxToAssets;
            if (Application.platform == RuntimePlatform.WindowsEditor) {
                idxToAssets = fullPath.IndexOf("Assets\\");
            } else {
                idxToAssets = fullPath.IndexOf("Assets/");
            }
// #if UNITY_EDITOR_WIN
            // var idxToAssets = fullPath.IndexOf("Assets\\");
// #else
            // var idxToAssets = fullPath.IndexOf("Assets/");
// #endif
            if (idxToAssets < 0)
            {
                Debug.LogError("invalid path, return itself");
                return fullPath;
            }

            return fullPath.Substring(idxToAssets);
        }

        /// <summary>
        /// 拷贝文件夹
        /// </summary>
        /// <param name="sourceDirectory">源文件夹路径</param>
        /// <param name="targetDirectory">目标文件夹路径</param>
        public static void CopyDirectory(string sourceDirectory, string targetDirectory)
        {
            DirectoryInfo diSource = new DirectoryInfo(sourceDirectory);
            DirectoryInfo diTarget = new DirectoryInfo(targetDirectory);
            CopyAll(diSource, diTarget);
        }

        private static void CopyAll(DirectoryInfo source, DirectoryInfo target, bool overwrite = true)
        {
            Directory.CreateDirectory(target.FullName);
            // Copy each file into the new directory.

            foreach (FileInfo fi in source.GetFiles())
            {
                // Debug.Log(string.Format(@"Copying {0}\{1}", target.FullName, fi.Name));
                fi.CopyTo(Path.Combine(target.FullName, fi.Name), overwrite);
            }
            // Copy each subdirectory using recursion.
            foreach (DirectoryInfo diSourceSubDir in source.GetDirectories())
            {
                DirectoryInfo nextTargetSubDir =
                    target.CreateSubdirectory(diSourceSubDir.Name);
                CopyAll(diSourceSubDir, nextTargetSubDir);
            }
        }

        /// <summary>
        /// 删除文件夹
        /// </summary>
        /// <param name="path">文件夹路径</param>
        public static void DeleteDirectory(string path) {
            if (Directory.Exists(path)) {
                DirectoryInfo dir = new DirectoryInfo(path);
                dir.Delete(true);
            } else {
                Debug.LogWarning(path + " not exist");
            }
        }


        // [MenuItem("test/so test")]
        // public static void TestA() {
        //     var so = CreateScriptableObject<ConfigEntry>("__so__test__configentry");

        //     var so2 = GetScriptableObject<ConfigEntry>("__so__test__configentry");
        //     var notExistSO = GetScriptableObject<ConfigEntry>("__so__test__notexist");
        //     var so3 = CreateScriptableObject<ConfigEntry>("__so__test__configentry", false);
        //     Debug.Log(so);          // ConfigEntry (WeChat.ConfigEntry)
        //     Debug.Log(so2);         // ConfigEntry (WeChat.ConfigEntry)
        //     Debug.Log(so == so2);   // True
        //     Debug.Log(so == so3);   // True
        //     Debug.Log(notExistSO);   // Null
        //     AssetDatabase.DeleteAsset(so.PathAtAssets());
        // }
    }
}