using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Reflection;

using UnityEditor;
using UnityEngine;

namespace WeChat
{

    public class WXUnityComponent : WXComponent
    {
        private Component comp;
        private object[] info;

        public override string getTypeName() {
            var result = comp ? comp.GetType().ToString() : "UnityRefComponent";
            return WXMonoBehaviourExportHelper.EscapeNamespace(result);
        }

        public WXUnityComponent(Component comp, params object[] info)
        {
            this.comp = comp;
            this.info = info;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            data.AddField("active", true);

            WXEngineRefComponentsHandler.Handle(comp.GetType(), context, this.comp, data, this.info);
            return json;
        }
    }

    public static class WXEngineRefComponentsHandler {
        private static Dictionary<Type, Action<WXHierarchyContext, Component, JSONObject, object[]>> refComponentsDict = new Dictionary<Type, Action<WXHierarchyContext, Component, JSONObject, object[]>>();

        static WXEngineRefComponentsHandler() {
            Register();
        }

        public static void RegisterRefComponents(Type type, Action<WXHierarchyContext, Component, JSONObject, object[]> action) {
            if (!refComponentsDict.ContainsKey(type)) {
                refComponentsDict.Add(type, action);
            }
        }

        public static void Handle(Type type, WXHierarchyContext context, Component comp, JSONObject data, object[] info = null) {
            if (refComponentsDict.ContainsKey(type)) {
                refComponentsDict[type](context, comp, data, info);
            } else {
                data.AddField("ref", -1);   // means not impl
                Debug.LogError("Unsupport Type: " + type.FullName + " in " + comp.gameObject.name);
            }
        }
        
        // Add here
        private static void Register() {
            RegisterRefComponents(typeof(Transform), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXTransform3DComponent((Transform)comp), (Transform)comp));
            });
            RegisterRefComponents(typeof(ParticleSystem), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXParticleSystem((ParticleSystem)comp, comp.gameObject), (ParticleSystem)comp));
            });
            RegisterRefComponents(typeof(MeshRenderer), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXMeshRenderer((MeshRenderer)comp), (MeshRenderer)comp));
            });
            RegisterRefComponents(typeof(LineRenderer), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXLineRenderer((LineRenderer)comp), (LineRenderer)comp));
            });
            RegisterRefComponents(typeof(Animator), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXAnimator((Animator)comp, comp.gameObject), (Animator)comp));
            });
            RegisterRefComponents(typeof(Animation), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXAnimation((Animation)comp, comp.gameObject), (Animation)comp));
            });
            RegisterRefComponents(typeof(Camera), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXCamera((Camera)comp), (Camera)comp));
            });
            RegisterRefComponents(typeof(Light), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXLight((Light)comp), (Light)comp));
            });
            RegisterRefComponents(typeof(SkinnedMeshRenderer), (context, comp, data, info) => {
                data.AddField("ref", context.AddComponentInProperty(new WXSkinnedMeshRenderer((SkinnedMeshRenderer)comp), (SkinnedMeshRenderer)comp));
            });

            // 物理相关组件
            RegisterRefComponents(typeof(Rigidbody), (context, comp, data, info) => {
              data.AddField("ref", context.AddComponent(new WXRigidbody((Rigidbody)comp), (Rigidbody)comp));
            });
            RegisterRefComponents(typeof(BoxCollider), (context, comp, data, info) => {

                BoxCollider boxCollider = comp.gameObject.GetComponent<BoxCollider>();
              data.AddField("ref", context.AddComponent(new WXBoxCollider(boxCollider.center, boxCollider.size, boxCollider.isTrigger, boxCollider.sharedMaterial), (BoxCollider)comp));
            });
            RegisterRefComponents(typeof(SphereCollider), (context, comp, data, info) => {  
               SphereCollider spherecollider = comp.gameObject.GetComponent<SphereCollider>();
              data.AddField("ref", context.AddComponent(new WXSphereCollider(spherecollider.isTrigger, spherecollider.sharedMaterial, spherecollider.center, spherecollider.radius), (SphereCollider)comp));
            });
            RegisterRefComponents(typeof(CapsuleCollider), (context, comp, data, info) => {
              CapsuleCollider capsulecollider = comp.gameObject.GetComponent<CapsuleCollider>();
              data.AddField("ref", context.AddComponent(new WXCapsuleCollider(capsulecollider.isTrigger, capsulecollider.material, capsulecollider.center, capsulecollider.radius, capsulecollider.height, capsulecollider.direction), (CapsuleCollider)comp));
            });
            RegisterRefComponents(typeof(MeshCollider), (context, comp, data, info) => {
               MeshCollider meshcollider = comp.gameObject.GetComponent<MeshCollider>();
              data.AddField("ref", context.AddComponent(new WXMeshCollider(meshcollider.convex, meshcollider.isTrigger, (int)meshcollider.cookingOptions, meshcollider.sharedMaterial, meshcollider.sharedMesh), (MeshCollider)comp));
            });
        }
    }

}
