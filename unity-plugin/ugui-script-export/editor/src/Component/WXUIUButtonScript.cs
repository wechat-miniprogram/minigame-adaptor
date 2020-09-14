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

    public class WXUIUButtonScript : WXComponent
    {
        private Button button;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName()
        {
            return "MiniGameAdaptor.UI.Button";
        }

        public WXUIUButtonScript(Button button, GameObject go, WXEntity entity)
        {
            this.button = button;
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

            data.AddField("transition", (int)button.transition); // 0-3

            JSONObject onClickList = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onClickList", onClickList);

            int count = button.onClick.GetPersistentEventCount();

            for (int i = 0; i < count; i++)
            {
                var __onClick = new JSONObject(JSONObject.Type.OBJECT);

                var target = button.onClick.GetPersistentTarget(i);
                var targetType = target.GetType().ToString();
                __onClick.AddField("targetType", targetType);
                if (targetType == "UnityEngine.GameObject")
                {
                    GameObject _go = (GameObject)target;
                    __onClick.AddField("target", WXUIUCommonScript.AddComponent(_go, entity, context));

                }
                else
                { //todo 其他类型的到时候再考虑
                    MonoBehaviour _target = (MonoBehaviour)target;
                    __onClick.AddField("target", context.AddComponent(new WXEngineMonoBehaviour(_target), _target));
                }

                __onClick.AddField("method", button.onClick.GetPersistentMethodName(i));

                onClickList.Add(__onClick);
            }

            JSONObject scriptList = WXUIUCommonScript.AddInteractionScript(go, entity, context,false);

            data.AddField("scriptList", scriptList);


            var graphic = button.targetGraphic;
            if(button.targetGraphic != null)
            {
                int idf = context.AddComponent(new WXUIUGraphicScript(graphic, go, entity), graphic);
                data.AddField("graphic", idf);
                entity.components.Add(idf);

            }

            data.AddField("ref", context.AddComponent(new WXUIUButton(button, go, entity), button));

            return json;
        }
    }
}