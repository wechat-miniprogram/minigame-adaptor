using UnityEditor;
using UnityEngine;

namespace WeChat
{
    public static class UnityVersion
    {

        public static bool UNITY_2019_4_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2019.4");
            }
        }
        public static bool UNITY_2019_3_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2019.3") || UnityVersion.UNITY_2019_4_OR_NEWER;
            }
        }
        public static bool UNITY_2019_2_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2019.2") || UnityVersion.UNITY_2019_3_OR_NEWER;
            }
        }
        public static bool UNITY_2019_1_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2019.1") || UnityVersion.UNITY_2019_2_OR_NEWER;
            }
        }
        public static bool UNITY_2018_4_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2018.4") || UnityVersion.UNITY_2019_1_OR_NEWER;
            }
        }
        public static bool UNITY_2018_3_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2018.3") || UnityVersion.UNITY_2018_4_OR_NEWER;
            }
        }
        public static bool UNITY_2018_2_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2018.2") || UnityVersion.UNITY_2018_3_OR_NEWER;
            }
        }

        public static bool UNITY_2018_1_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2018.1") || UnityVersion.UNITY_2018_2_OR_NEWER;
            }
        }

        public static bool UNITY_2017_4_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2017.4") || UnityVersion.UNITY_2018_1_OR_NEWER;
            }
        }

        public static bool UNITY_2017_1_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("2017.1") || UnityVersion.UNITY_2017_4_OR_NEWER;
            }
        }

         public static bool UNITY_5_6_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("5.6") || UnityVersion.UNITY_2017_1_OR_NEWER;
            }

        }

        public static bool UNITY_5_5_OR_NEWER
        {
            get
            {
                return Application.unityVersion.StartsWith("5.5") || UnityVersion.UNITY_5_6_OR_NEWER;
            }

        }
    }
}