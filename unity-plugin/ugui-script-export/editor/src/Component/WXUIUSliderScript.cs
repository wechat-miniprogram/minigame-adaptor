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

    public class WXUIUSliderScript : WXComponent
    {
        private Slider slider;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName() {
            return "MiniGameAdaptor.UI.Slider";
        }

        public string getStateSprite(WXHierarchyContext context, Sprite uiSprite)
        {

            string uuid = WXUGUISpriteFrame.getSprite(uiSprite, context.preset);
            context.AddResource(uuid);
            return uuid;
        }

        public WXUIUSliderScript(Slider slider, GameObject go, WXEntity entity)
        {
            this.slider = slider;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            data.AddField("interactable", (bool)slider.interactable);
            data.AddField("transition", (int)slider.transition); // 0-3

         //   RectTransform sliderRect = slider.GetComponent<RectTransform>();
         //   sliderRect.pivot = new Vector2(0, 0);


            JSONObject colorPressed = new JSONObject(JSONObject.Type.ARRAY);
            var pressedColor = slider.colors.pressedColor;
            colorPressed.Add(255f * pressedColor.r);
            colorPressed.Add(255f * pressedColor.g);
            colorPressed.Add(255f * pressedColor.b);
            colorPressed.Add(255f * pressedColor.a);
            data.AddField("pressedColor", colorPressed);

            JSONObject colorDisabled = new JSONObject(JSONObject.Type.ARRAY);
            var disabledColor = slider.colors.disabledColor;
            colorDisabled.Add(255f * disabledColor.r);
            colorDisabled.Add(255f * disabledColor.g);
            colorDisabled.Add(255f * disabledColor.b);
            colorDisabled.Add(255f * disabledColor.a);
            data.AddField("disabledColor", colorDisabled);


            JSONObject colorNormal = new JSONObject(JSONObject.Type.ARRAY);
            var normalColor = slider.colors.normalColor;
            colorNormal.Add(255f * normalColor.r);
            colorNormal.Add(255f * normalColor.g);
            colorNormal.Add(255f * normalColor.b);
            colorNormal.Add(255f * normalColor.a);
            data.AddField("normalColor", colorNormal);

            Image targetGraphic = (Image)slider.targetGraphic;

            if (targetGraphic != null)
            {
               data.AddField("targetGraphic", context.AddComponent(new WXUIUSpriteScript(targetGraphic, go, entity), targetGraphic));

            }

            SpriteState state = slider.spriteState;

            if(state.pressedSprite != null)
            {

                string pressedSpriteKey = this.getStateSprite(context, state.pressedSprite);
                if (pressedSpriteKey != null)
                {
                    data.AddField("pressedSprite", pressedSpriteKey);
                }
                else
                {
                    data.AddField("pressedSprite", new JSONObject(JSONObject.Type.NULL));
                }

            }

            if (state.disabledSprite != null)
            {

                string disabledSpriteKey = this.getStateSprite(context, state.disabledSprite);
                if (disabledSpriteKey != null)
                {
                    data.AddField("disabledSprite", disabledSpriteKey);
                }
                else
                {
                    data.AddField("disabledSprite", new JSONObject(JSONObject.Type.NULL));
                }

            }

            if (slider.fillRect != null)
            {
                data.AddField("fillRect", context.AddComponent(new WXUGUITransform2DComponent(slider.fillRect)));

                Image fillRectImage = (Image)slider.fillRect.transform.GetComponent<Image>();

                if (fillRectImage != null)
                {
                    RectTransform t = fillRectImage.transform as RectTransform;

                    if(slider.direction == Slider.Direction.LeftToRight)
                    {
                        t.pivot = new Vector2(0, 0);

                    }
                    if (slider.direction == Slider.Direction.RightToLeft)
                    {
                        t.pivot = new Vector2(1, 0);

                    }
                    if (slider.direction == Slider.Direction.TopToBottom)
                    {
                        t.pivot = new Vector2(0, 1);

                    }
                    if (slider.direction == Slider.Direction.BottomToTop)
                    {
                        t.pivot = new Vector2(0, 0);

                    }

                    data.AddField("fillRectImage", context.AddComponent(new WXUIUSpriteScript(fillRectImage, go, entity), fillRectImage));
                }

            }



            if (slider.handleRect != null)
            {
                data.AddField("handleRect", context.AddComponent(new WXUGUITransform2DComponent(slider.handleRect)));

                Image handleRectImage = (Image)slider.handleRect.transform.GetComponent<Image>();

                if (handleRectImage != null)
                {
                    data.AddField("handleRectImage", context.AddComponent(new WXUIUSpriteScript(handleRectImage, go, entity), handleRectImage));
                }

            }

            JSONObject onValueChangedList = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onValueChanged", onValueChangedList);

            int onChangeCount = slider.onValueChanged.GetPersistentEventCount();

            for(int i = 0; i < onChangeCount; i++)
            {
                var __onChange = new JSONObject(JSONObject.Type.OBJECT);

                var target = slider.onValueChanged.GetPersistentTarget(i);
                var targetType = target.GetType().ToString();
                __onChange.AddField("targetType", targetType);
                if (targetType == "UnityEngine.GameObject")
                {
                    GameObject _go = (GameObject)target;
                    __onChange.AddField("target", WXUIUCommonScript.AddComponent(_go, entity, context));

                }
                else
                { //todo 其他类型的到时候再考虑
                    MonoBehaviour _target = (MonoBehaviour)target;
                    __onChange.AddField("target", context.AddComponent(new WXEngineMonoBehaviour(_target), _target));
                }


                __onChange.AddField("method", slider.onValueChanged.GetPersistentMethodName(i));

                onValueChangedList.Add(__onChange); 
            }



            data.AddField("direction", (int)slider.direction);

            data.AddField("maxValue", slider.maxValue);

            data.AddField("minValue", slider.minValue);

            data.AddField("normalizedValue", slider.normalizedValue);

            data.AddField("wholeNumbers", slider.wholeNumbers);

            data.AddField("value", slider.value);








            data.AddField("active", slider.IsActive());

            

            return json;
        }
    }
}