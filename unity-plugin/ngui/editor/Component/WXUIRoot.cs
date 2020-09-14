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

    public class WXBBUIRoot : WXNGUIComponent
    {

        public override string getTypeName()
        {
            return "UICanvas";
        }

        private UIRoot uiRoot;
        public WXBBUIRoot(UIRoot _uiRoot, GameObject gameObject, WXEntity entity) : base(_uiRoot, gameObject, entity)
        {
            this.uiRoot = _uiRoot;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", this.getTypeName());
            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("data", subJSON);
            return json;
        }
    }
}
