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
    public sealed class Input {
#if UNITY_EDITOR
        public static void StartAccelerometer(int interval){}

        public static void StopAccelerometer(){}
#else
        public static extern void StartAccelerometer(int interval);

        public static extern void StopAccelerometer();
#endif
    }

#if !UNITY_EDITOR
    [External]
#endif
    public sealed class Resources {

#if UNITY_EDITOR
        public static void Load(string path, Action<object> callback) {
            UnityUtility.StartCoroutine(_Load(path, callback));
        }
        public static void Load<T>(string path, Action<object> callback) {
            UnityUtility.StartCoroutine(_Load(path, (result)=>{
                if(typeof(T) == typeof(TextAsset)){
                    TextAsset ta = (TextAsset)result;
                    callback(ta);
                }
            }));
        }
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
    public static extern void Load(string path, Action<object> callback);

   [Template("MiniGameAdaptor.Resources.LoadRes({path}, {T}, {callback})")]
   public static extern void Load<T>(string path, Action<object> callback);

   [Template("MiniGameAdaptor.Resources.LoadAll({path}, {T}, {callback})")]
    public static extern void LoadAll<T>(string path, Action<UnityEngine.Object[]> callback);
#endif

    }

#if !UNITY_EDITOR
    [External]
#endif   
    public  class SceneManager {

#if UNITY_EDITOR

       public static void LoadScene(int sceneBuildIndex, Action callback = null) {
           UnityUtility.StartCoroutine(_LoadScene(sceneBuildIndex, callback));
       }

        // scene name or path
       public static void LoadScene(string sceneName, Action callback = null) {
           UnityUtility.StartCoroutine(_LoadScene(sceneName, callback));
       }
       

       private static IEnumerator _LoadScene(int sceneBuildIndex, Action callback) {
            AsyncOperation asyncLoad = UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(sceneBuildIndex);

            while (!asyncLoad.isDone) {
                yield return null;
            }
            if (callback != null) {
                callback();
            }
            // callback?.Invoke();
       }

        private static IEnumerator _LoadScene(string sceneName, Action callback) {
            AsyncOperation asyncLoad = UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(sceneName);

            while (!asyncLoad.isDone) {
                yield return null;
            }
            if (callback != null) {
                callback();
            }
            // callback?.Invoke();
       }

#else
        public static extern void LoadScene(int sceneBuildIndex, Action callback = null);
        public static extern void LoadScene(string sceneName, Action callback = null);
#endif
   }

}

