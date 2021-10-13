using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

namespace WeChat {

    public class WXBoxCollider : WXComponent {

        private Vector3 center;
        private Vector3 size;
        private Boolean isTrigger;
        PhysicMaterial material;

        public override string getTypeName () {
            return "BoxCollider";
        }

        public WXBoxCollider (Vector3 center, Vector3 size, bool isTrigger, PhysicMaterial material) {
            this.center = center;
            this.size = size;
            this.isTrigger = isTrigger;
            this.material = material;
        }

        protected override JSONObject ToJSON (WXHierarchyContext context) {
            JSONObject json = new JSONObject (JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject (JSONObject.Type.OBJECT);
            json.AddField ("type", getTypeName ());
            json.AddField ("data", data);
            data.AddField ("active", true);

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

            JSONObject size = new JSONObject (JSONObject.Type.ARRAY);
            size.Add (this.size.x);
            size.Add (this.size.y);
            size.Add (this.size.z);
            data.AddField ("size", size);

            return json;
        }
    }
}