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

    public class WXUIUScrollRectScript : WXComponent
    {
        private ScrollRect scrollRect;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName()
        {
            return "MiniGameAdaptor.UI.ScrollRect";
        }

        public WXUIUScrollRectScript(ScrollRect scrollRect, GameObject go, WXEntity entity)
        {
            this.scrollRect = scrollRect;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);

            JSONObject onValueChangedList = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onValueChanged", onValueChangedList);

            int onChangeCount = scrollRect.onValueChanged.GetPersistentEventCount();

            for (int i = 0; i < onChangeCount; i++)
            {
                var __onChange = new JSONObject(JSONObject.Type.OBJECT);

                var target = scrollRect.onValueChanged.GetPersistentTarget(i);
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


                __onChange.AddField("method", scrollRect.onValueChanged.GetPersistentMethodName(i));

                onValueChangedList.Add(__onChange);
            }


            JSONObject scriptList = WXUIUCommonScript.AddInteractionScript(go, entity, context, false);

            data.AddField("scriptList", scriptList);


            data.AddField("ref", context.AddComponent(new WXUIUScrollRect(scrollRect, go, entity), scrollRect));

            return json;
        }
    }
}