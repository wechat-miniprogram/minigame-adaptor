/**
 * @File 后处理profile，作为asset独立存在，多个后处理component可以引用同一个profile
 * @Author shanexyzhou
 * @Date 2020.1.6
 */

using System;
using System.Collections.Generic;
using UnityEngine;

namespace WeChat { 
    public class WXPostProcessProfile : ScriptableObject
    {
        public List<WXPostProcessEffectSetting> settings = new List<WXPostProcessEffectSetting>();

        RenderTexture[] mid = new RenderTexture[2];

        [NonSerialized]
        public bool isDirty = true;

        public void OnRender(RenderTexture source, RenderTexture destination)
        {
#if UNITY_2017_1_OR_NEWER
            mid[0] = RenderTexture.GetTemporary(source.descriptor);
            mid[1] = RenderTexture.GetTemporary(source.descriptor);
#else
            mid[0] = RenderTexture.GetTemporary(source.width, source.height, source.depth, source.format,
                RenderTextureReadWrite.Default, source.antiAliasing);
            mid[1] = RenderTexture.GetTemporary(source.width, source.height, source.depth, source.format,
                RenderTextureReadWrite.Default, source.antiAliasing);
#endif
            int flip = 1;
            Graphics.Blit(source, mid[0]);
            foreach (var setting in settings)
            {
                if (!setting.active) continue;
                setting.OnRender(mid[1 - flip], mid[flip]);
                flip = 1 - flip;
            }
            Graphics.Blit(mid[1 - flip], destination);
            RenderTexture.ReleaseTemporary(mid[0]);
            RenderTexture.ReleaseTemporary(mid[1]);
        }
    }

}