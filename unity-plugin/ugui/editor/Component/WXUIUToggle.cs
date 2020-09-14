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

    public class WXUIUToggle : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UIToggle";
        }

        private Toggle toggle;
        public WXUIUToggle(Toggle toggle, GameObject gameObject, WXEntity entity) : base(toggle, gameObject, entity)
        {
            this.toggle = toggle;
        }

        public string getStateSprite(WXHierarchyContext context, Sprite uiSprite)
        {

            string uuid = WXUGUISpriteFrame.getSprite(uiSprite, context.preset);
            context.AddResource(uuid);
            return uuid;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {

            entity.components.Add(context.AddComponent(new WXUGUITouchInputComponent(gameObject, entity), null));

            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());


            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

            Image targetImage = toggle.graphic.GetComponent<Image>();
            if (targetImage != null)
            {
                var addComp = new WXUIUSprite(targetImage, gameObject, entity);
                subJSON.AddField("target", context.AddComponent(
                    addComp,
                    targetImage
                ));
            }


            if (toggle.group)
            {
                var addComp = new WXUIUToggleGroup(toggle.group, gameObject, entity);
                subJSON.AddField("toggleGroup", context.AddComponent(
                    addComp,
                    toggle.group
                ));
            }

            subJSON.AddField("isChecked", toggle.isOn);

            subJSON.AddField("active", toggle.IsActive());
            json.AddField("data", subJSON);

            return json;
        }
    }
}
