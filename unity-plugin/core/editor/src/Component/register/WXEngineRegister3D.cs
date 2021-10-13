using System;
using UnityEngine;
using UnityEditor;
using UnityEngine.Playables;

namespace WeChat
{
    [InitializeOnLoad]
    class WXEngineRegister3D
    {
        static WXEngineRegister3D()
        {
            WXHierarchyContext.registerComponentConverter("050", Iterate3DComponent);
        }

        private static void Iterate3DComponent(GameObject go, WXEntity obj, WXHierarchyContext context, ExportPreset preset)
        {
            // 导UI的时候报bug，先注释掉
            
            MonoBehaviour[] scripts = go.GetComponents<MonoBehaviour>();
            foreach (MonoBehaviour script in scripts)        
            {
                if (script == null) continue;
                string __uuid = "";
                Type type = script.GetType();
                // 从public property中获取tsPath属性
                foreach (System.Reflection.FieldInfo fieldInfo in type.GetFields())
                {
                    if (fieldInfo.Name == "__beefballSerialize" && (string)fieldInfo.GetValue(script) != "")
                    {
                        __uuid = (string)fieldInfo.GetValue(script);
                    }
                }
                // 从attribute中获取的tsPath属性
                // foreach (System.Object attributes in type.GetCustomAttributes(false))
                // {
                //     BeefballSerialize bs = (BeefballSerialize)attributes;
                //     if (bs != null)
                //     {
                //         __uuid = bs.__beefballSerialize;
                //     }
                // }
                // __uuid是导出标签，只有找到__uuid属性，才加入到components列表
                if (__uuid != "" && __uuid != null) obj.components.Add(context.AddComponent(new WXScript(script, go, __uuid), script));
            }

            ParticleSystem particle = go.GetComponent<ParticleSystem>();
            if (particle != null)
            {
                //Debug.Log("addComponentParticleSystem");
                obj.components.Add(context.AddComponent(new WXParticleSystem(particle, go), particle));
            }

            MeshRenderer meshRenderer = go.GetComponent(typeof(MeshRenderer)) as MeshRenderer;
            if ((UnityEngine.Object)meshRenderer != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXMeshRenderer(meshRenderer), meshRenderer));
            }

            LineRenderer lineRenderer = go.GetComponent(typeof(LineRenderer)) as LineRenderer;
            if ((UnityEngine.Object)lineRenderer != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXLineRenderer(lineRenderer), lineRenderer));
            }

            TrailRenderer trailRenderer = go.GetComponent(typeof(TrailRenderer)) as TrailRenderer;
            if ((UnityEngine.Object)trailRenderer != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXTrailRenderer(trailRenderer), trailRenderer));
            }

            SkinnedMeshRenderer skinnedMeshRenderer = go.GetComponent(typeof(SkinnedMeshRenderer)) as SkinnedMeshRenderer;
            if ((UnityEngine.Object)skinnedMeshRenderer != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXSkinnedMeshRenderer(skinnedMeshRenderer), skinnedMeshRenderer));
            }

            LODGroup lodGroup = go.GetComponent(typeof(LODGroup)) as LODGroup;
            if ((UnityEngine.Object)lodGroup != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXLODGroup(lodGroup), lodGroup));
            }

            Animator animator = go.GetComponent(typeof(Animator)) as Animator;
            if ((UnityEngine.Object)animator != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXAnimator(animator, go), animator));
            }

            Animation animation = go.GetComponent(typeof(Animation)) as Animation;
            if ((UnityEngine.Object)animation != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXAnimation(animation, go), animation));
            }

            PlayableDirector playableDirector = go.GetComponent(typeof(PlayableDirector)) as PlayableDirector;
            if ((UnityEngine.Object)playableDirector != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXPlayableDirector(playableDirector, go), playableDirector));
            }
            
            // 导出所有音频相关的component. 可能会有重复的component，且音频的component顺序要保持不变
            Component[] compList = go.GetComponents(typeof(Component));
            foreach (Component tmpComp in compList)
            {   
                if (tmpComp.GetType() == typeof(AudioListener))
                {
                    obj.components.Add(context.AddComponent(new WXAudioListener((tmpComp as AudioListener), go), (tmpComp as AudioListener)));
                }

                if (tmpComp.GetType() == typeof(AudioHighPassFilter))
                {
                    obj.components.Add(context.AddComponent(new WXAudioHighPassFilter((tmpComp as AudioHighPassFilter), go), (tmpComp as AudioHighPassFilter)));
                }

                if (tmpComp.GetType() == typeof(AudioLowPassFilter))
                {
                    obj.components.Add(context.AddComponent(new WXAudioLowPassFilter((tmpComp as AudioLowPassFilter), go), (tmpComp as AudioLowPassFilter)));
                }
                
                if (tmpComp.GetType() == typeof(AudioDistortionFilter))
                {
                    obj.components.Add(context.AddComponent(new WXAudioDistortionFilter((tmpComp as AudioDistortionFilter), go), (tmpComp as AudioDistortionFilter)));
                }
                
                if (tmpComp.GetType() == typeof(AudioEchoFilter))
                {
                    obj.components.Add(context.AddComponent(new WXAudioEchoFilter((tmpComp as AudioEchoFilter), go), (tmpComp as AudioEchoFilter)));
                }
                
                if (tmpComp.GetType() == typeof(AudioSource))
                {
                    obj.components.Add(context.AddComponent(new WXAudioSource((tmpComp as AudioSource), go), (tmpComp as AudioSource)));
                }
            }            

            // DirectionalLight,
            // PointLight,
            // SpotLight,

            Light light = go.GetComponent(typeof(Light)) as Light;
            if ((UnityEngine.Object)light != (UnityEngine.Object)null)
            {
                // baked的灯光不导出
                bool isBaked = false;
#if UNITY_5_6_OR_NEWER
                isBaked = light.lightmapBakeType == LightmapBakeType.Baked;
#else
                isBaked = light.lightmappingMode == LightmappingMode.Baked;
#endif
                if (!isBaked) {
                    obj.components.Add(context.AddComponent(new WXLight(light), light));
                }
            }

            Camera camera = go.GetComponent(typeof(Camera)) as Camera;
            if (camera != null)
            {
                obj.components.Add(context.AddComponent(new WXCamera(camera), camera));
            }

            WXPostProcess postProcess = go.GetComponent<WXPostProcess>();
            if (postProcess != null)
            {
                obj.components.Add(context.AddComponent(new WXEnginePostProcess(postProcess), postProcess));
            }

            // obj.active = go.activeSelf;
            if (!preset.presetKey.Contains("ngui"))
            {
                obj.components.Add(context.AddComponent(new WXTransform3DComponent(go.transform), go.transform));
            }


            WXRawResourceCollection collection = go.GetComponent<WXRawResourceCollection>();
            if ((UnityEngine.Object)collection != (UnityEngine.Object)null)
            {
                obj.components.Add(context.AddComponent(new WXEngineRawResourceCollection(collection), collection));
            }
        }   

    }
}
