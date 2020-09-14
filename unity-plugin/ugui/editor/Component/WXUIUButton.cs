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

    public class WXUIUButton : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UIButton";
        }

        private Button button;
        public WXUIUButton(Button button, GameObject gameObject, WXEntity entity) : base(button, gameObject, entity)
        {
            this.button = button;
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


            JSONObject colorPressed = new JSONObject(JSONObject.Type.ARRAY);
            var pressedColor = button.colors.pressedColor;
            if (pressedColor != null)
            {
                colorPressed.Add(255f * pressedColor.r);
                colorPressed.Add(255f * pressedColor.g);
                colorPressed.Add(255f * pressedColor.b);
                colorPressed.Add(255f * pressedColor.a);
                subJSON.AddField("pressedColor", colorPressed);
            }


            JSONObject colorDisabled = new JSONObject(JSONObject.Type.ARRAY);
            var disabledColor = button.colors.disabledColor;
            if (disabledColor != null)
            {
                colorDisabled.Add(255f * disabledColor.r);
                colorDisabled.Add(255f * disabledColor.g);
                colorDisabled.Add(255f * disabledColor.b);
                colorDisabled.Add(255f * disabledColor.a);
                subJSON.AddField("disabledColor", colorDisabled);
            }



            JSONObject colorNormal = new JSONObject(JSONObject.Type.ARRAY);
            var normalColor = button.colors.normalColor;
            if (normalColor != null)
            {
                colorNormal.Add(255f * normalColor.r);
                colorNormal.Add(255f * normalColor.g);
                colorNormal.Add(255f * normalColor.b);
                colorNormal.Add(255f * normalColor.a);
                subJSON.AddField("normalColor", colorNormal);
            }


            SpriteState state = button.spriteState;

            if (state.pressedSprite != null)
            {

                string pressedSpriteKey = this.getStateSprite(context, state.pressedSprite);
                if (pressedSpriteKey != null)
                {
                    subJSON.AddField("pressedSprite", pressedSpriteKey);
                }
                else
                {
                    subJSON.AddField("pressedSprite", new JSONObject(JSONObject.Type.NULL));
                }

            }

            if (state.disabledSprite != null)
            {

                string disabledSpriteKey = this.getStateSprite(context, state.disabledSprite);
                if (disabledSpriteKey != null)
                {
                    subJSON.AddField("disabledSprite", disabledSpriteKey);
                }
                else
                {
                    subJSON.AddField("disabledSprite", new JSONObject(JSONObject.Type.NULL));
                }

            }

            Image targetImage = button.targetGraphic.GetComponent<Image>();
            if (targetImage != null)
            {
                string normalSpriteKey = this.getStateSprite(context, targetImage.sprite);
                if (normalSpriteKey != null)
                {
                    subJSON.AddField("normalSprite", normalSpriteKey);
                }
                else
                {
                    subJSON.AddField("normalSprite", new JSONObject(JSONObject.Type.NULL));
                }
            }




            subJSON.AddField("active", button.IsActive());
            json.AddField("data", subJSON);

            return json;
        }
    }
}
