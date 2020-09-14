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

    public class WXUIToggleScript : WXComponent
    {
        private UIToggle uiToggle;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName() {
            return "MiniGameAdaptor.UIToggle";
        }

        public WXUIToggleScript(UIToggle toggle, GameObject go, WXEntity entity)
        {
            this.uiToggle = toggle;
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

            data.AddField("ref", context.AddComponent(new WXUIToggle(uiToggle, go, entity), uiToggle));

            if(uiToggle.group != null){
                data.AddField("group", (string)uiToggle.group);
            }
			

            JSONObject onChange = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onChange", onChange);


            foreach(var change in uiToggle.onChange) {
                var __onChange = new JSONObject(JSONObject.Type.OBJECT);
                __onChange.AddField("target", context.AddComponent(new WXEngineMonoBehaviour(change.target), change.target));
                __onChange.AddField("method", change.methodName);

                var _params = new JSONObject(JSONObject.Type.ARRAY);
                __onChange.AddField("params", _params);
                if (change.parameters != null) {
                    foreach(var p in change.parameters) {
                        if (p.obj != null) {
                            _params.Add(WXMonoBehaviourPropertiesHandler.InvokePropertyHandler(p.expectedType, p.obj, context));
                        }
                    }
                }

                onChange.Add(__onChange);
            }


            return json;
        }
    }
}
