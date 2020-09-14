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

    public class WXUIUToggleScript : WXComponent
    {
        private Toggle toggle;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName()
        {
            return "MiniGameAdaptor.UI.Toggle";
        }

        public WXUIUToggleScript(Toggle toggle, GameObject go, WXEntity entity)
        {
            this.toggle = toggle;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);


            if (toggle.group)
            {
                var addComp = new WXUIUToggleGroup(toggle.group, go, entity);
                data.AddField("toggleGroup", context.AddComponent(
                    addComp,
                    toggle.group
                ));
            }


            JSONObject onValueChangedList = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onValueChanged", onValueChangedList);

            int onChangeCount = toggle.onValueChanged.GetPersistentEventCount();

            for (int i = 0; i < onChangeCount; i++)
            {
                var __onChange = new JSONObject(JSONObject.Type.OBJECT);
                var target = toggle.onValueChanged.GetPersistentTarget(i);
                var targetType = target.GetType().ToString();
                __onChange.AddField("targetType", targetType);
                if (targetType == "UnityEngine.GameObject")
                {
                    GameObject _go = (GameObject)target;
                    __onChange.AddField("target", WXUIUCommonScript.AddComponent(_go,entity,context));
                   
                }
                else
                { //todo 其他类型的到时候再考虑
                    MonoBehaviour _target = (MonoBehaviour)target;
                    __onChange.AddField("target", context.AddComponent(new WXEngineMonoBehaviour(_target), _target));
                }
                    
                
                __onChange.AddField("method", toggle.onValueChanged.GetPersistentMethodName(i));

                onValueChangedList.Add(__onChange);
            }

            JSONObject scriptList = WXUIUCommonScript.AddInteractionScript(go, entity, context, false);

            data.AddField("scriptList", scriptList);

            data.AddField("ref", context.AddComponent(new WXUIUToggle(toggle, go, entity), toggle));

            return json;
        }
    }
}