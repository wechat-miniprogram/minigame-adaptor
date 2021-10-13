using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;

namespace WeChat
{

    public class WXUIToggle : WXNGUIComponent
    {

        public override string getTypeName()
        {
            return "UIToggle";
        }

        private UIToggle uiToggle;
        public WXUIToggle(UIToggle _uiToggle, GameObject gameObject, WXEntity entity): base(_uiToggle, gameObject, entity)
        {
            this.uiToggle = _uiToggle;
        }

        public string getStateSprite(WXHierarchyContext context, UISprite uiSprite, string spriteName)
        {

            string uuid = WXSpriteFrame.getSprite(uiSprite.atlas, spriteName, context.preset);
            return uuid;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "UIToggle");


            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

            var activeSprite = uiToggle.activeSprite;
            if (uiToggle.activeSprite)
            {
                var compType = uiToggle.activeSprite.GetType();

                if (compType == typeof(UILabel))
                {
                    var addComp = new WXUILabel(uiToggle.activeSprite as UILabel, gameObject, entity);
                    subJSON.AddField("target", context.AddComponentInProperty(
                        addComp,
                        uiToggle.activeSprite
                    ));
                }
                else if (compType == typeof(UISprite))
                {
                    var addComp = new WXUISprite(uiToggle.activeSprite as UISprite, gameObject, entity);
                    subJSON.AddField("target", context.AddComponentInProperty(
                        addComp,
                        uiToggle.activeSprite
                    ));
                }
            }

            subJSON.AddField("isChecked", uiToggle.startsActive);

            object toggleIndex = TryGetContainField(uiToggle, "index");
            if (toggleIndex != null)
            {
                subJSON.AddField("index", (int)toggleIndex);
            }

            subJSON.AddField("active", uiToggle.enabled);

            json.AddField("data", subJSON);

            return json;
        }

        private object TryGetContainField(object instance, string FieldName)
        {
            if (instance != null && !string.IsNullOrEmpty(FieldName))
            {

                FieldInfo _findedFieldInfo = instance.GetType().GetField(FieldName);
                if (_findedFieldInfo != null)
                {
                    return _findedFieldInfo.GetValue(instance);
                }
            }
            return null;
        }
    }
}
