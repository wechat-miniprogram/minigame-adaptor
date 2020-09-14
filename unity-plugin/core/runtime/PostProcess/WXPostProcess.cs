/**
 * @File 后处理component，加在相机物体上使用
 * @Author shanexyzhou
 * @Date 2020.1.6
 */

using UnityEngine;

namespace WeChat
{
    [ExecuteInEditMode, ImageEffectAllowedInSceneView]
    [AddComponentMenu("WeChat/Post Process", 0)]
    public class WXPostProcess : MonoBehaviour
    {
        public WXPostProcessProfile profile;

        void OnRenderImage(RenderTexture source, RenderTexture destination)
        {
            if (profile == null)
            {
                Graphics.Blit(source, destination);
                return;
            }
            profile.OnRender(source, destination);
        }
    }
}

