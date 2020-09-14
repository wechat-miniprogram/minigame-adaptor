using UnityEngine;
using UnityEditor;
using WeChat;

namespace WeChat {
    [InitializeOnLoad]
    internal class WXEngineRegisterBridge {
        static WXEngineRegisterBridge() {
            WXHierarchyContext.registerComponentConverter("090", IterateBridgeComponent);
        }

        private static void IterateBridgeComponent(GameObject go, WXEntity obj, WXHierarchyContext context, ExportPreset preset) {

            if (preset.presetKey == "ngui-prefab" || preset.presetKey == "ngui-asset" || preset.presetKey == "ngui-prefabfolder" || preset.presetKey == "ngui-rootScene") {
                WXBridge.isNGUIPreset = true;
            }
            if (preset.presetKey == "ugui-prefab" || preset.presetKey == "ugui-asset" || preset.presetKey == "ugui-prefabfolder" || preset.presetKey == "ugui-rootScene") {
                WXBridge.isUGUIPreset = true;
            }

            var monoBehaviours = go.GetComponents<MonoBehaviour>();
            foreach (var behaviour in monoBehaviours) {
                // 处理用户脚本丢失的情况
                if (behaviour == null) continue;
                // user's MonoBehaviour or not?
                if (!BridgeExport.GetDevTypesSet().Contains(behaviour.GetType())) continue;
                if (WXMonoBehaviourExportHelper.IsInBlackList(behaviour.GetType())) continue;

                obj.components.Add(context.AddComponent(new WXEngineMonoBehaviour(behaviour), behaviour));
            }

            // for a ngui-prefab, we don't need to export any other components
            if (WXBridge.isNGUIPreset) {
                return;
            }
            if (WXBridge.isUGUIPreset) {
                return;
            }

            /**
             * 下面的Component为adaptor对齐unity独有的组件
             * 需要根据对应类型新建一个对应的Component的class
            */

            // Colliders
             Collider[] colliders = go.GetComponents<Collider>();
             if (colliders != null && colliders.Length > 0 ) {
                 foreach(var collider in colliders) {
                     if (collider is BoxCollider) {
                         //obj.components.Add(context.AddComponent(new WXBoxCollider((BoxCollider)collider), collider));
                        obj.components.Add(context.AddComponent(new WXUnityComponent(collider), collider));
                      } else if (collider is SphereCollider) {
                                     //obj.components.Add(context.AddComponent(new WXSphereCollider((SphereCollider)collider), collider));
                        obj.components.Add(context.AddComponent(new WXUnityComponent(collider), collider));
                      } else if (collider is CapsuleCollider) {
                                     //obj.components.Add(context.AddComponent(new WXCapsuleCollider((CapsuleCollider)collider), collider));
                        obj.components.Add(context.AddComponent(new WXUnityComponent(collider), collider));
                      } else if (collider is MeshCollider) {
                                     //obj.components.Add(context.AddComponent(new WXMeshCollider((MeshCollider)collider), collider));
                        obj.components.Add(context.AddComponent(new WXUnityComponent(collider), collider));
                      }
                 }
             }

            // AudioSource(s)
            AudioSource[] audioSources = go.GetComponents<AudioSource>();
            if (audioSources != null && audioSources.Length > 0) {
                foreach(var audioSource in audioSources) {
                    obj.components.Add(context.AddComponent(new WXEngineAudioSource(audioSource), audioSource));
                }
            }

            Rigidbody rigidbody = go.GetComponent<Rigidbody>();
            if (rigidbody != null) {
                 //obj.components.Add(context.AddComponent(new WXRigidbody(rigidbody), rigidbody));
                obj.components.Add(context.AddComponent(new WXUnityComponent(rigidbody), rigidbody));
            }


            /**
             * 下面的Component为adaptor对齐unity，但引擎也有类似Component的组件
             * 需要在WXUnityComponent中对应做处理，增加ref对象指向对应引擎对象
            */
            
            obj.components.Add(context.AddComponent(new WXUnityComponent(go.transform), go.transform));

            // Particle System
            ParticleSystem particle = go.GetComponent<ParticleSystem>();
            if (particle != null) {
                //Debug.Log("addComponentParticleSystem");
                obj.components.Add(context.AddComponent(new WXUnityComponent(particle), particle));
            }

            // Animator
            Animator animator = go.GetComponent<Animator>();
            if (animator !=null) {
                obj.components.Add(context.AddComponent(new WXUnityComponent(animator), animator));
            }

            // Animation
            Animation animation = go.GetComponent<Animation>();
            if (animation !=null) {
                obj.components.Add(context.AddComponent(new WXUnityComponent(animation), animation));
            }

            // Renderers
            Renderer renderer = go.GetComponent<Renderer>();
            if (renderer != null) {
                if (renderer is MeshRenderer) {
                    obj.components.Add(context.AddComponent(new WXUnityComponent((MeshRenderer)renderer), renderer));
                    // 由于引擎没有MeshFilter组件，这里强制在导出MeshRenderer的时候带上一个MeshFilter
                    obj.components.Add(context.AddComponent(new WXMeshFilter(), renderer));
                } else if (renderer is LineRenderer) {
                    obj.components.Add(context.AddComponent(new WXUnityComponent((LineRenderer)renderer), renderer));
                } else if (renderer is SkinnedMeshRenderer) {
                    obj.components.Add(context.AddComponent(new WXUnityComponent((SkinnedMeshRenderer)renderer), renderer));
                    obj.components.Add(context.AddComponent(new WXMeshFilter(), renderer));
                }
            }

            // Camera
            Camera camera = go.GetComponent<Camera>();
            if (camera != null) {
                obj.components.Add(context.AddComponent(new WXUnityComponent(camera), camera));
            }

            // Light
            Light light = go.GetComponent<Light>();
            if (light != null) {
                obj.components.Add(context.AddComponent(new WXUnityComponent(light), light));
            }
        }

    }
}
