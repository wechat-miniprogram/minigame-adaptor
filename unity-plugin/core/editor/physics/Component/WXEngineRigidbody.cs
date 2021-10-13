using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;

namespace WeChat
{

    public class WXRigidbody : WXComponent
    {
        private Rigidbody rigidbody;

        public override string getTypeName() {
            return "Rigidbody";
        }

        public WXRigidbody(Rigidbody rigidbody)
        {
            this.rigidbody = rigidbody;
        }
 
        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);
            data.AddField("active", true);

            if (this.rigidbody != null)
            {
                data.AddField("mass", this.rigidbody.mass);
                data.AddField("linearDamping", this.rigidbody.drag);
                data.AddField("angularDamping", this.rigidbody.angularDrag);
                data.AddField("useGravity", this.rigidbody.useGravity);
                data.AddField("isKinematic", this.rigidbody.isKinematic);
                data.AddField("interpolation", (int)this.rigidbody.interpolation);
                data.AddField("collisionDetection", (int)this.rigidbody.collisionDetectionMode);
                int constraints = (int)this.rigidbody.constraints;
                data.AddField("constraints", constraints >>1 );

            }

            return json;
        }
    }
}
