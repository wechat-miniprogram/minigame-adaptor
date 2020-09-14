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

    public class WXUIUInputField : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UITextInput";
        }

        private InputField input;
        public WXUIUInputField(InputField input, GameObject gameObject, WXEntity entity) : base(input, gameObject, entity)
        {
            this.input = input;

        }


        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
 //           entity.components.Add(context.AddComponent(new WXUIUMask(null, gameObject, entity), null));
            entity.components.Add(context.AddComponent(new WXUGUIKeyboardInputComponent(input, gameObject, entity), null));
            entity.components.Add(context.AddComponent(new WXUGUITouchInputComponent(gameObject, entity), null));
            entity.components.Add(context.AddComponent(new WXUIUGraphic(0), null));
            

            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());

            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

            subJSON.AddField("text", input.text);
            subJSON.AddField("editable", !input.readOnly);

            Text textComponent = input.textComponent;
            if (textComponent != null)
            {
                subJSON.AddField("label", context.AddComponentInProperty(new WXUIULabel(textComponent, gameObject, entity), textComponent));
            }


            Text placeHolder = (Text)input.placeholder;
            Debug.Log(input.placeholder);
            if(placeHolder != null)
            {
                subJSON.AddField("prompt", placeHolder.text);
                JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
                color.Add(255f * placeHolder.color.r);
                color.Add(255f * placeHolder.color.g);
                color.Add(255f * placeHolder.color.b);
                color.Add(255f * placeHolder.color.a);
                subJSON.AddField("promptColor", color);
                subJSON.AddField("fontSize", placeHolder.fontSize);
            }

            subJSON.AddField("maxChar", input.characterLimit == 0 ? -1 : input.characterLimit);
            
            subJSON.AddField("multiline", input.multiLine);


            subJSON.AddField("active", input.IsActive());
            json.AddField("data", subJSON);

            return json;
        }
    }
}
