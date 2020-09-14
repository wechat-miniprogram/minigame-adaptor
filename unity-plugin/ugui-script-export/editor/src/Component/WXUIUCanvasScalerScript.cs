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

    public class WXUIUCanvasScalerScript : WXComponent
    {
        private CanvasScaler canvasScaler;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName()
        {
            return "MiniGameAdaptor.UI.CanvasScaler";
        }

        public WXUIUCanvasScalerScript(CanvasScaler canvasScaler, GameObject go, WXEntity entity)
        {
            this.canvasScaler = canvasScaler;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            data.AddField("matchWidthOrHeight", canvasScaler.matchWidthOrHeight);

            data.AddField("uiScaleMode", (int)canvasScaler.uiScaleMode);

            data.AddField("screenMatchMode", (int)canvasScaler.screenMatchMode);
            

            return json;
        }
    }
}