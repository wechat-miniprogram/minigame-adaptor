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

    public class WXUIGraphic : WXComponent
    {

        public override string getTypeName()
        {
            return "UIGraphic";
        }
        private int shape;
        public WXUIGraphic(int shape)
        {
            this.shape = shape;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "UIGraphic");

            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

            int shape = this.shape;
            subJSON.AddField("shape", (int)shape);

            json.AddField("data", subJSON);

            return json;
        }
    }
}
