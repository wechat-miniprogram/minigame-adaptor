using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

namespace WeChat {

    public class WXCapsuleCollider : WXComponent {
        private Boolean isTrigger;
        private PhysicMaterial material;
        private Vector3 center;
        private float radius;
        private float height;
        private int direction;

        public override string getTypeName () {
            return "CapsuleCollider";
        }

        public WXCapsuleCollider (Boolean isTrigger, PhysicMaterial material, Vector3 center, float radius, float height, int dir) {
            this.isTrigger = isTrigger;
            this.material = material;
            this.center = center;
            this.radius = radius;
            this.height = height;
            this.direction = dir;
        }

        protected override JSONObject ToJSON (WXHierarchyContext context) {
            JSONObject json = new JSONObject (JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject (JSONObject.Type.OBJECT);
            json.AddField ("type", getTypeName ());
            json.AddField ("data", data);
            data.AddField ("active", true);

            {
                data.AddField ("isTrigger", this.isTrigger);
                if (material != null) {
                    WXPhysicsMaterial materialConverter = new WXPhysicsMaterial (this.material);
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
                data.AddField ("height", this.height);
                data.AddField ("direction", this.direction);
            }

            return json;
        }
    }
}
