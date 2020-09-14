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

    public class WXUIUMask : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UIMask";
        }

        private Mask mask;
        public WXUIUMask(Mask mask, GameObject gameObject, WXEntity entity) : base(mask, gameObject, entity)
        {
            this.mask = mask;
        }


        protected override JSONObject ToJSON(WXHierarchyContext context)
        {


            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());


            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);


            subJSON.AddField("active", true);
            json.AddField("data", subJSON);

            return json;
        }
    }
}
