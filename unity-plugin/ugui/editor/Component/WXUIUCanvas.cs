using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;
using UnityEngine.UI;

namespace WeChat
{

    public class WXUIUCanvas : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UICanvas";
        }

        private Canvas uiCanvas;
        public WXUIUCanvas(Canvas _uiCanvas, GameObject gameObject, WXEntity entity) : base(_uiCanvas, gameObject, entity)
        {
            this.uiCanvas = _uiCanvas;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "UICanvas");

            Debug.LogWarning("--------------- UI Canvas ---------------");

            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
     
            subJSON.AddField("active", true);
            json.AddField("data", subJSON);

            return json;
        }
    }
}
