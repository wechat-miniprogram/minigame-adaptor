/**
 * @File 后处理的某一步effect，作为asset依附于某一个profile存在，在hierarchy中隐藏
 * @Author shanexyzhou
 * @Date 2020.1.6
 */

using UnityEngine;
using System;

namespace WeChat {
    [Serializable]
    public abstract class WXPostProcessEffectSetting : ScriptableObject
    {
        [HideInInspector]
        public bool active = true;

        public abstract void OnRender(RenderTexture source, RenderTexture destination);

        public abstract JSONObject Export();
    }

}

