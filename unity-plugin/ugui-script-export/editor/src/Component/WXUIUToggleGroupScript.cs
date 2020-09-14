using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Reflection;

using UnityEditor;
using UnityEngine;
using UnityEngine.UI;

namespace WeChat
{

    public class WXUIUToggleGroupScript : WXComponent
    {
        private ToggleGroup toggleGroup;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName()
        {
            return "MiniGameAdaptor.UI.ToggleGroup";
        }

        public WXUIUToggleGroupScript(ToggleGroup toggleGroup, GameObject go, WXEntity entity)
        {
            this.toggleGroup = toggleGroup;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);


            data.AddField("ref", context.AddComponent(new WXUIUToggleGroup(toggleGroup, go, entity), toggleGroup));

            return json;
        }
    }
}