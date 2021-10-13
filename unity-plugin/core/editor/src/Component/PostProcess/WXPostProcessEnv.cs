using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Reflection;

namespace WeChat {
    [InitializeOnLoad]
    public static class WXPostProcessEnv
    {
        public static Dictionary<System.Type, System.Type> PostProcessTypeMap = new Dictionary<System.Type, System.Type>();
        static WXPostProcessEnv()
        {
            Add(typeof(WXPostProcessEffectBloom));
        }


        private static void Add(System.Type t)
        {
            var attr = wxAttributeUtil.GetAttribute<WXPostProcessEditorAttribute>(t);
            if (attr == null)
            {
                PostProcessTypeMap.Add(t, typeof(WXPostProcessBaseEditor));
            }
            else
            {
                PostProcessTypeMap.Add(t, attr.settingsType);
            }
        }
    }
}
