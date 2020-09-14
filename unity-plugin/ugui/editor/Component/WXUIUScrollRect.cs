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

    public class WXUIUScrollRect : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UIScrollView";
        }

        private ScrollRect scrollRect;
        public WXUIUScrollRect(ScrollRect scrollRect, GameObject gameObject, WXEntity entity) : base(scrollRect, gameObject, entity)
        {
            this.scrollRect = scrollRect;
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
            entity.components.Add(context.AddComponent(new WXUIUGraphic(0), null));

            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());


            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

            subJSON.AddField("movement", scrollRect.horizontal ? 0 : 1); //引擎只支持一个方向的滚动


            subJSON.AddField("autoFix", true);

            subJSON.AddField("active", scrollRect.IsActive());
            json.AddField("data", subJSON);

            return json;
        }
    }
}
