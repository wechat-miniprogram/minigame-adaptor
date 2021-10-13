using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

namespace WeChat {

    public class WXMeshCollider : WXComponent {
        private bool convex;
        private bool isTrigger;
        private int cookingOptions;
        private PhysicMaterial material;
        private Mesh sharedMesh;

        public override string getTypeName () {
            return "MeshCollider";
        }

        public WXMeshCollider (bool convex, bool isTrigger,
         #if UNITY_2017_1_OR_NEWER
         int cookingOptions, 
         #endif
         PhysicMaterial material, Mesh mesh) {
            this.convex = convex;
            this.isTrigger = isTrigger;
            #if UNITY_2017_1_OR_NEWER
            this.cookingOptions = cookingOptions;
            #endif
            this.material = material;
            this.sharedMesh = mesh;
        }

        protected override JSONObject ToJSON (WXHierarchyContext context) {
            JSONObject json = new JSONObject (JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject (JSONObject.Type.OBJECT);
            json.AddField ("type", getTypeName ());
            json.AddField ("data", data);
            data.AddField ("active", true);

            // if (this.collider != null)
            {
                data.AddField ("convex", this.convex);
                data.AddField ("isTrigger", this.isTrigger);
                 #if UNITY_2017_1_OR_NEWER
                data.AddField ("cookingOptions", (int) this.cookingOptions);
                #endif
                if (material != null) {
                    WXPhysicsMaterial materialConverter = new WXPhysicsMaterial (material);
                    string materialPath = materialConverter.Export (context.preset);
                    if (materialPath != null && materialPath != "") {
                        data.AddField ("material", materialPath);
                        context.AddResource (materialPath);
                    }
                }

                Mesh mesh = this.sharedMesh;
                if (mesh != null) {
                    WXMesh meshConverter = new WXMesh (mesh);
                    string meshPath = meshConverter.Export (context.preset);
                    data.AddField ("mesh", meshPath);
                    context.AddResource (meshPath);
                }
            }

            return json;
        }
    }
}