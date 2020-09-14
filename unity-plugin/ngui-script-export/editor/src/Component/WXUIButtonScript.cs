using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Reflection;

using UnityEditor;
using UnityEngine;

namespace WeChat
{

    public class WXUIButtonScript : WXComponent
    {
        private UIButton uiButton;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName() {
            return "MiniGameAdaptor.UIButton";
            // var result = comp ? comp.GetType().ToString() : "UITextureScript";
            // return WXMonoBehaviourExportHelper.EscapeNamespace(result);
        }

        public WXUIButtonScript(UIButton btn, GameObject go, WXEntity entity)
        {
            this.uiButton = btn;
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

            data.AddField("ref", context.AddComponent(new WXUIButton(uiButton, go, entity), uiButton));

            JSONObject onClick = new JSONObject(JSONObject.Type.ARRAY);
            data.AddField("onClick", onClick);

            JSONObject colorPressed = new JSONObject(JSONObject.Type.ARRAY);
			colorPressed.Add(255f * uiButton.pressed.r);
			colorPressed.Add(255f * uiButton.pressed.g);
			colorPressed.Add(255f * uiButton.pressed.b);
			colorPressed.Add(255f * uiButton.pressed.a);
			data.AddField("pressedColor", colorPressed);

			JSONObject colorDisabledColor = new JSONObject(JSONObject.Type.ARRAY);
			colorDisabledColor.Add(255f * uiButton.disabledColor.r);
			colorDisabledColor.Add(255f * uiButton.disabledColor.g);
			colorDisabledColor.Add(255f * uiButton.disabledColor.b);
			colorDisabledColor.Add(255f * uiButton.disabledColor.a);
			data.AddField("disabledColor", colorDisabledColor);

            if(uiButton.tweenTarget != null){
                JSONObject colorNormal = new JSONObject(JSONObject.Type.ARRAY);
				var mWidget = uiButton.tweenTarget.GetComponent<UIWidget>();
				colorNormal.Add(255f * mWidget.color.r);
				colorNormal.Add(255f * mWidget.color.g);
				colorNormal.Add(255f * mWidget.color.b);
				colorNormal.Add(255f * mWidget.color.a);
				data.AddField("normalColor", colorNormal);
			}

            // onClick
            // onClick.AddField("");
            foreach(var click in uiButton.onClick) {
                var __onClick = new JSONObject(JSONObject.Type.OBJECT);
                // var target = new JSONObject(JSONObject.Type.OBJECT);
                // target.AddField(click.target.GetType().FullName.EscapeNamespaceSimple(), context.AddComponent(new WXEngineMonoBehaviour(click.target), click.target));
                // onClick.AddField("target", WXMonoBehaviourPropertiesHandler.InvokePropertyHandler(typeof(UnityEngine.MonoBehaviour), click.target, context));
                __onClick.AddField("target", context.AddComponent(new WXEngineMonoBehaviour(click.target), click.target));
                __onClick.AddField("method", click.methodName);

                var _params = new JSONObject(JSONObject.Type.ARRAY);
                __onClick.AddField("params", _params);
                if (click.parameters != null) {
                    foreach(var p in click.parameters) {
                        if (p.obj != null) {
                            _params.Add(WXMonoBehaviourPropertiesHandler.InvokePropertyHandler(p.expectedType, p.obj, context));
                        }
                    }
                }

                onClick.Add(__onClick);
            }

            return json;
        }
    }
}
