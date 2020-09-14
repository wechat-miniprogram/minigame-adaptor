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

    public class WXUIUToggleGroup : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UIToggleGroup";
        }

        private ToggleGroup toggleGroup;
        public WXUIUToggleGroup(ToggleGroup toggleGroup, GameObject gameObject, WXEntity entity) : base(toggleGroup, gameObject, entity)
        {
            this.toggleGroup = toggleGroup;
        }


        protected override JSONObject ToJSON(WXHierarchyContext context)
        {

            entity.components.Add(context.AddComponent(new WXUGUITouchInputComponent(gameObject, entity), null));

            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());


            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);


            subJSON.AddField("allowSwitchOff", toggleGroup.allowSwitchOff);

            subJSON.AddField("active", toggleGroup.IsActive());
            json.AddField("data", subJSON);

            return json;
        }
    }
}
