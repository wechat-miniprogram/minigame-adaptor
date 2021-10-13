using System;
using UnityEngine;
using UnityEditor;

namespace WeChat
{
    [InitializeOnLoad]
    class WXEngineRegisterPhysics
    {
        static WXEngineRegisterPhysics()
        {
            WXHierarchyContext.registerComponentConverter("060", Iterate3DComponent);
        }

        private static void Iterate3DComponent(GameObject go, WXEntity obj, WXHierarchyContext context, ExportPreset preset)
        {
             BoxCollider boxCollider = go.GetComponent<BoxCollider>();
            if (boxCollider != null)
            {
                obj.components.Add(context.AddComponent(new WXBoxCollider(boxCollider.center, boxCollider.size, boxCollider.isTrigger, boxCollider.sharedMaterial), boxCollider));
            }

            CapsuleCollider capsuleCollider = go.GetComponent<CapsuleCollider>();
            if (capsuleCollider != null)
            {
                obj.components.Add(context.AddComponent(
                    new WXCapsuleCollider(capsuleCollider.isTrigger, capsuleCollider.sharedMaterial, capsuleCollider.center, capsuleCollider.radius, capsuleCollider.height, capsuleCollider.direction),
                    capsuleCollider));
            }

            MeshCollider meshCollider = go.GetComponent<MeshCollider>();
            if (meshCollider != null)
            {
                obj.components.Add(context.AddComponent(
                    new WXMeshCollider(meshCollider.convex, meshCollider.isTrigger, 
                    #if UNITY_2017_1_OR_NEWER
                    (int)meshCollider.cookingOptions,
                    #endif
                    meshCollider.sharedMaterial, meshCollider.sharedMesh),
                   meshCollider));
            }

            Rigidbody rigidbody = go.GetComponent<Rigidbody>();
            if (rigidbody != null)
            {
                obj.components.Add(context.AddComponent(new WXRigidbody(rigidbody), rigidbody));
            }

            SphereCollider sphereCollider = go.GetComponent<SphereCollider>();
            if (sphereCollider != null)
            {
                obj.components.Add(context.AddComponent(new WXSphereCollider(sphereCollider.isTrigger, sphereCollider.sharedMaterial, sphereCollider.center, sphereCollider.radius), sphereCollider));
            }

            CharacterController characterController = go.GetComponent<CharacterController>();
            
            if (characterController != null) {
                obj.components.Add(context.AddComponent(new WXCharactorController(characterController.slopeLimit, characterController.stepOffset, characterController.skinWidth, characterController.minMoveDistance, characterController.center, characterController.radius, characterController.height)));
            }
      
        }   

    }
}
