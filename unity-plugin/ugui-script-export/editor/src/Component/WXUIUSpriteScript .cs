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

    public class WXUIUSpriteScript : WXComponent
    {
        private Image image;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName()
        {
            return "MiniGameAdaptor.UI.Image";
        }

        public WXUIUSpriteScript(Image image, GameObject go, WXEntity entity)
        {
            this.image = image;
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

            JSONObject scriptList = WXUIUCommonScript.AddInteractionScript(go, entity, context, true);

            data.AddField("scriptList", scriptList);

            data.AddField("ref", context.AddComponent(new WXUIUSprite(image, go, entity), image));

            return json;
        }
    }
}