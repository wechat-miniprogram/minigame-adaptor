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

    public class WXUIMask : WXComponent
    {

        public override string getTypeName()
        {
            return "UIMask";
        }
        public WXUIMask()
        {
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "UIMask");

            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

            json.AddField("data", subJSON);

            return json;
        }
    }
}