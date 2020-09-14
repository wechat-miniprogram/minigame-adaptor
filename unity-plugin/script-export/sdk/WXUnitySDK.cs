#region using
using System;
using System.Collections;
using System.Collections.Generic;


#if UNITY_EDITOR
using UnityEngine;
using UnityEngine.SceneManagement;
#else
using Bridge;
#endif
#endregion

namespace MiniGameAdaptor {
#if UNITY_EDITOR
    public static class UnityUtility {

        #region Coroutine
        [WeAppToolAtrribute("SDK")]
        private class CoroutineHolder : MonoBehaviour { }

        private static CoroutineHolder _runner;

        private static CoroutineHolder Runner {
            get {
                if (_runner == null) {
                    _runner = new GameObject("Static Corotuine Runner").AddComponent<CoroutineHolder>();
                }
                return _runner;
            }
        }

        public static void StartCoroutine(IEnumerator corotuine) {
            Runner.StartCoroutine(corotuine);
        }

        #endregion
    }
#endif

   
#if !UNITY_EDITOR
    [External]
#endif
    /// <summary>
    /// 设备输入
    /// </summary>
    public sealed class Input {

#if UNITY_EDITOR
        /// <summary>
        /// 打开微信小游戏加速度计
        /// https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.startAccelerometer.html
        /// 
        /// 值      说明
        /// 
        /// game	适用于更新游戏的回调频率，在 20ms/次 左右	
        /// ui	    适用于更新 UI 的回调频率，在 60ms/次 左右	
        /// normal	普通的回调频率，在 200ms/次 左右
        /// </summary>
        /// <param name="interval">更新频率，默认为game</param>
        public static void StartAccelerometer(string interval = "game"){}

        public static void StopAccelerometer(){}
#else
        public static extern void StartAccelerometer(string interval = "game");

        public static extern void StopAccelerometer();
#endif
    }

#if !UNITY_EDITOR
    [External]
#endif
    /// <summary>
    /// 资源加载
    /// </summary>
    public sealed class Resources {

#if UNITY_EDITOR
        /// <summary>
        /// 异步加载prefab资源
        /// 
        /// 用例: MiniGameAdaptor.Resources.Load("path/to/prefab", "{ cacheable: true }", (prefab) => { // DO SOMETHING });
        /// </summary>
        /// <param name="path">prefab路径</param>
        /// <param name="callback">prefab加载完毕异步回调</param>
        /// <param name="options">加载参数，默认为空，此项参数只会在小游戏中生效（注意{}也需填写）。此处可填：
        /// {
        ///     
        ///     tolerateDependenciesFail?: boolean;
        /// 
        ///     preload?: boolean;
        /// 
        ///     cacheable?: boolean;
        /// 
        ///     httpRetryCount?: number;
        /// 
        ///     httpPriority?: number;
        /// 
        /// }
        /// </param>
        public static void Load(string path, Action<object> callback, string options = "") {
            UnityUtility.StartCoroutine(_Load(path, callback));
        }

        /// <summary>
        /// 异步加载资源
        /// </summary>
        /// <param name="path">资源路径</param>
        /// <param name="callback">资源加载完毕异步回调</param>
        /// <typeparam name="T">需要被加载的资源类型</typeparam>
        public static void Load<T>(string path, Action<object> callback) {
            UnityUtility.StartCoroutine(_Load(path, (result)=>{
                callback(result);
            }));
        }

        /// <summary>
        /// 异步加载路径下指定类型的所有资源
        /// </summary>
        /// <param name="path">资源路径</param>
        /// <param name="callback">所有资源加载完毕异步回调</param>
        /// <typeparam name="T">需要被加载的资源类型</typeparam>
        public static void LoadAll<T>(string path, Action<UnityEngine.Object[]> callback) {
            UnityUtility.StartCoroutine(_LoadAll(path, typeof(T), (result)=>{
                    callback(result);
            }));
        }

        private static IEnumerator _Load(string path, Action<object> callback) {
            ResourceRequest request = UnityEngine.Resources.LoadAsync(path);
            yield return request;
            if (request != null && request.isDone) {
                try {
                    callback(request.asset);
                } catch (Exception e) {
                    Debug.LogError(path + " callback caught an exception: \n" + e);
                }
            }
        }


        private static IEnumerator _LoadAll(string path, Type type, Action<UnityEngine.Object[]> callback) {
            yield return new WaitForSeconds(0.01f);
		    UnityEngine.Object []objs = UnityEngine.Resources.LoadAll(path, type);
            callback(objs);
        }
#else
    public static extern void Load(string path, Action<object> callback, string options);

   [Template("MiniGameAdaptor.Resources.LoadRes({path}, {T}, {callback})")]
   public static extern void Load<T>(string path, Action<object> callback);

   [Template("MiniGameAdaptor.Resources.LoadAll({path}, {T}, {callback})")]
    public static extern void LoadAll<T>(string path, Action<UnityEngine.Object[]> callback);
#endif

    }

#if !UNITY_EDITOR
    [External]
#endif   
    /// <summary>
    /// 场景加载
    /// </summary>
    public  class SceneManager {

#if UNITY_EDITOR

        /// <summary>
        /// 异步加载场景
        /// </summary>
        /// <param name="sceneBuildIndex">BuildSetting中场景的索引值</param>
        /// <param name="is3D">是否为3D场景，默认为true。如果是2D场景，则会在Unity中的加载方式为Addtive</param>
        /// <param name="callback">场景加载完成后的异步回调</param>
       public static void LoadScene(int sceneBuildIndex, bool is3D = true, Action callback = null) {
           UnityUtility.StartCoroutine(_LoadScene(sceneBuildIndex, is3D, callback));
       }

       /// <summary>
       /// 异步加载场景
       /// </summary>
       /// <param name="sceneName">场景名</param>
       /// <param name="isSingle">是否使用Single模式加载场景，目前不支持同类型场景的Addtive加载，只支持2D场景中加载3D场景或3D场景加载2D场景时Additive加载</param>
       /// <param name="callback">场景加载完成后的异步回调</param>
       public static void LoadScene(string sceneName, bool isSingle = true, Action callback = null) {
           UnityUtility.StartCoroutine(_LoadScene(sceneName, isSingle, callback));
       }
       

       private static IEnumerator _LoadScene(int sceneBuildIndex, bool isSingle, Action callback) {
            AsyncOperation asyncLoad = UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(sceneBuildIndex, isSingle ? UnityEngine.SceneManagement.LoadSceneMode.Single : UnityEngine.SceneManagement.LoadSceneMode.Additive);

            while (!asyncLoad.isDone) {
                yield return null;
            }
            if (callback != null) {
                callback();
            }
            // callback?.Invoke();
       }

        private static IEnumerator _LoadScene(string sceneName, bool isSingle, Action callback) {
            AsyncOperation asyncLoad = UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(sceneName, isSingle ? UnityEngine.SceneManagement.LoadSceneMode.Single : UnityEngine.SceneManagement.LoadSceneMode.Additive);

            while (!asyncLoad.isDone) {
                yield return null;
            }
            if (callback != null) {
                callback();
            }
            // callback?.Invoke();
       }

#else
        [Template("MiniGameAdaptor.SceneManager.LoadScene({sceneBuildIndex}, {callback})")]
        public static extern void LoadScene(int sceneBuildIndex, bool is3D = true, Action callback = null);
        [Template("MiniGameAdaptor.SceneManager.LoadScene({sceneName}, {callback})")]
        public static extern void LoadScene(string sceneName, bool is3D = true, Action callback = null);
#endif
   }

}

