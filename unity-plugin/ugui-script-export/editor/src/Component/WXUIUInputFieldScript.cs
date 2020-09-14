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

    public class WXUIUInputFieldScript : WXComponent
    {
        private InputField input;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName()
        {
            return "MiniGameAdaptor.UI.InputField";
        }

        public WXUIUInputFieldScript(InputField input, GameObject go, WXEntity entity)
        {
            this.input = input;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {

            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);
            data.AddField("active", true);

            JSONObject scriptList = WXUIUCommonScript.AddInteractionScript(go, entity, context, false);

            data.AddField("scriptList", scriptList);

            Image targetGraphic = (Image)input.targetGraphic;

            if (targetGraphic != null)
            {
                data.AddField("targetGraphic", context.AddComponent(new WXUIUSpriteScript(targetGraphic, go, entity), targetGraphic));

            }


            JSONObject onValueChangedList = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onValueChanged", onValueChangedList);

            int onChangeCount = input.onValueChanged.GetPersistentEventCount();

            for (int i = 0; i < onChangeCount; i++)
            {
                var __onChange = new JSONObject(JSONObject.Type.OBJECT);

                var target = input.onValueChanged.GetPersistentTarget(i);
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


                __onChange.AddField("method", input.onValueChanged.GetPersistentMethodName(i));

                onValueChangedList.Add(__onChange);
            }

            JSONObject onEditEndList = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onEditEnd", onEditEndList);

            int onEidtEndCount = input.onEndEdit.GetPersistentEventCount();

            for (int i = 0; i < onEidtEndCount; i++)
            {
                var __onEnd = new JSONObject(JSONObject.Type.OBJECT);

                var target = input.onEndEdit.GetPersistentTarget(i);
                var targetType = target.GetType().ToString();
                __onEnd.AddField("targetType", targetType);
                if (targetType == "UnityEngine.GameObject")
                {
                    GameObject _go = (GameObject)target;
                    __onEnd.AddField("target", WXUIUCommonScript.AddComponent(_go, entity, context));

                }
                else
                { //todo 其他类型的到时候再考虑
                    MonoBehaviour _target = (MonoBehaviour)target;
                    __onEnd.AddField("target", context.AddComponent(new WXEngineMonoBehaviour(_target), _target));
                }


                __onEnd.AddField("method", input.onEndEdit.GetPersistentMethodName(i));

                onEditEndList.Add(__onEnd);
            }

            Text placeHolder = (Text)input.placeholder;
            if (placeHolder != null)
            {
                JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
                color.Add(255f * placeHolder.color.r);
                color.Add(255f * placeHolder.color.g);
                color.Add(255f * placeHolder.color.b);
                color.Add(255f * placeHolder.color.a);
                data.AddField("promptColor", color);
                input.placeholder.gameObject.SetActive(false);
            }


            data.AddField("ref", context.AddComponent(new WXUIUInputField(input, go, entity), input));

            return json;
        }
    }
}