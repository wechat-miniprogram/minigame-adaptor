using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

namespace WeChat {
    public class WXSphereCollider : WXComponent {
        private Boolean isTrigger;
        private PhysicMaterial material;
        private Vector3 center;
        private float radius;

        public override string getTypeName () {
            return "SphereCollider";
        }

        public WXSphereCollider (Boolean isTrigger, PhysicMaterial material, Vector3 center, float radius) {
            this.center = center;
            this.radius = radius;
            this.isTrigger = isTrigger;
            this.material = material;
        }

        protected override JSONObject ToJSON (WXHierarchyContext context) {
            JSONObject json = new JSONObject (JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject (JSONObject.Type.OBJECT);
            json.AddField ("type", getTypeName ());
            json.AddField ("data", data);
            data.AddField ("active", true);

            // if (this.collider != null)
            {
                data.AddField ("isTrigger", this.isTrigger);
                if (material != null) {
                    WXPhysicsMaterial materialConverter = new WXPhysicsMaterial (material);
                    string materialPath = materialConverter.Export (context.preset);
                    if (materialPath != null && materialPath != "") {
                        data.AddField ("material", materialPath);
                        context.AddResource (materialPath);
                    }
                }

                JSONObject center = new JSONObject (JSONObject.Type.ARRAY);
                center.Add (-this.center.x);
                center.Add (this.center.y);
                center.Add (this.center.z);
                data.AddField ("center", center);

                data.AddField ("radius", this.radius);
            }

            return json;
        }
    }
}