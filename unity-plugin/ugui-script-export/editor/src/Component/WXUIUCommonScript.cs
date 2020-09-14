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

using UnityEngine.EventSystems;
using System.Text.RegularExpressions;

namespace WeChat
{

    public class WXUIUCommonScript
    {
        
        public static int AddComponent(GameObject go, WXEntity obj, WXHierarchyContext context)
        {
            int id  = -999;
            Text text = go.GetComponent<Text>();
            if (text != null)
            {
                id = context.AddComponent(new WXUIULabelScript(text, go, obj),text);
            }

            Image image = go.GetComponent<Image>();
            if (image != null)
            {
                id = context.AddComponent(new WXUIUSpriteScript(image, go, obj),image);
            }

            Button button = go.GetComponent<Button>();
            if (button != null)
            {
                id = context.AddComponent(new WXUIUButtonScript(button, go, obj),button);
            }

            Slider slider = go.GetComponent<Slider>();
            if (slider != null)
            {
                id = context.AddComponent(new WXUIUSliderScript(slider, go, obj),slider);
            }

            Toggle toggle = go.GetComponent<Toggle>();
            if (toggle != null)
            {
                id = context.AddComponent(new WXUIUToggleScript(toggle, go, obj),toggle);
            }

            ToggleGroup toggleGroup = go.GetComponent<ToggleGroup>();
            if (toggleGroup != null)
            {
                id = context.AddComponent(new WXUIUToggleGroupScript(toggleGroup, go, obj),toggleGroup);
            }

            ScrollRect scrollRect = go.GetComponent<ScrollRect>();
            if (scrollRect != null)
            {
                id = context.AddComponent(new WXUIUScrollRectScript(scrollRect, go, obj), scrollRect);
            }

            InputField input = go.GetComponent<InputField>();
            if (input != null)
            {
                id = context.AddComponent(new WXUIUInputFieldScript(input, go, obj), input);
            }

            return id;
        }

        public static JSONObject AddInteractionScript(GameObject gameObject, WXEntity entity, WXHierarchyContext context,bool needTouchInputComponent)
        {

            //判断是否可以点击

            bool isClickable = false;

            JSONObject scriptList = new JSONObject(JSONObject.Type.ARRAY);

            var bes = gameObject.GetComponents<MonoBehaviour>();

            for (var i = 0; i < bes.Length; i++)
            {
                var type = bes[i].GetType();
                if (Regex.Match(type.ToString(), @"^UnityEngine\.UI\b").Length == 0)
                {
                    
                    if (
                        typeof(IPointerClickHandler).IsAssignableFrom(type)
                        || typeof(IPointerDownHandler).IsAssignableFrom(type)
                        || typeof(IPointerUpHandler).IsAssignableFrom(type)
                    )
                    {
                        isClickable = true;
                    }

                    var scripts = new JSONObject(JSONObject.Type.OBJECT);
                    scripts.AddField("target", context.AddComponent(new WXEngineMonoBehaviour(bes[i]), bes[i]));
                    scriptList.Add(scripts);
                }

            }

            if (isClickable && needTouchInputComponent)
            {
                entity.components.Add(context.AddComponent(new WXUGUITouchInputComponent(gameObject, entity), null));
            }

            return scriptList;

        }

        
    }
}