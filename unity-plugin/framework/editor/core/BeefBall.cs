using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System;

namespace WeChat
{
    [InitializeOnLoad]
    public class BeefBall : ScriptableObject
    {
        static BeefBall()
        {
            onInitializeCheckers = new List<OnExportInitializeChecker>();
        }
        // 插件各处用于初始化操作的delegate
        public delegate void OnExportInitializeChecker();
        static public List<OnExportInitializeChecker> onInitializeCheckers;
        static public void DoInstallationCheck()
        {
            if (onInitializeCheckers != null && onInitializeCheckers.Count != 0)
            {
                EditorUtility.DisplayProgressBar("初始化导出", "正在初始化0/" + onInitializeCheckers.Count, 0);
                try
                {
                    for (int i = 0; i < onInitializeCheckers.Count; i++)
                    {
                        OnExportInitializeChecker checker = onInitializeCheckers[i];
                        checker();
                        EditorUtility.DisplayProgressBar(
                            "初始化导出",
                            "正在初始化" + i + "/" + onInitializeCheckers.Count,
                            (float)i / onInitializeCheckers.Count
                        );
                    }
                }
                catch (Exception e)
                {
                    Debug.LogError("导出初始化失败：" + e.Message);
                    Debug.LogError(e.StackTrace);
                }
                finally
                {
                    EditorUtility.ClearProgressBar();
                }
            }
        }

        // preset 运行完成后的回调
        public delegate void OnPresetCompletedEvent();
        static private OnPresetCompletedEvent onPresetCompletedEvents;
        static public void RegisterPresetCompleteEvent(OnPresetCompletedEvent onCompleted)
        {
            onPresetCompletedEvents += onCompleted;
        }
        static public void UnregisterPresetCompleteEvent(OnPresetCompletedEvent onCompleted)
        {
            onPresetCompletedEvents -= onCompleted;
        }
        static public void OnPresetComplete()
        {
            if (onPresetCompletedEvents != null)
            {
                onPresetCompletedEvents();
            }
        }

    }
}
