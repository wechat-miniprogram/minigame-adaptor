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

    public class WXUISpriteScript : WXComponent
    {
        private UISprite sprite;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName() {
            return "MiniGameAdaptor.UISprite";
            // var result = comp ? comp.GetType().ToString() : "UITextureScript";
            // return WXMonoBehaviourExportHelper.EscapeNamespace(result);
        }

        public WXUISpriteScript(UISprite sprite, GameObject go, WXEntity entity)
        {
            this.sprite = sprite;
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

            data.AddField("ref", context.AddComponent(new WXUISprite(sprite, go, entity), sprite));
            return json;
        }
    }
}
