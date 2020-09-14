using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System;
using System.IO;

namespace WeChat
{
    public class PresetUtil
    {
        public static void writeGroup(WXResource resource, ExportPreset preset)
        {
            try
            {
                EditorUtility.DisplayProgressBar(
                    "导出资源",
                    "资源读取中...",
                    0.33f
                );
                string resourcePath = resource.Export(preset);

                EditorUtility.DisplayProgressBar(
                    "导出资源",
                    "文件写入中...",
                    0.66f
                );

                string packageName = WXUtility.GetFileNameFromPath(resourcePath);
                if (packageName == "")
                {
                    packageName = "Untitled";
                }

                 ExportStore.GenerateResourcePackage(
                    packageName,
                    resourcePath
                );
            }
            catch (Exception e)
            {
                Debug.LogError(e.Message);
                Debug.LogError(e.StackTrace);
            }
            finally
            {
                EditorUtility.ClearProgressBar();
            }
        }
    }

}
