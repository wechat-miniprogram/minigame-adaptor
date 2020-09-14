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

    public class WXUILabelScript : WXComponent
    {
        private UILabel uiLabel;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName() {
            return "MiniGameAdaptor.UILabel";
        }

        public WXUILabelScript(UILabel label, GameObject go, WXEntity entity)
        {
            this.uiLabel = label;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);
            data.AddField("active", true);

            data.AddField("ref", context.AddComponent(new WXUILabel(uiLabel, go, entity), uiLabel));

            return json;
        }
    }
}
