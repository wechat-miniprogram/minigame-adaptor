using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;

namespace WeChat
{

	public class WXUITextInput : WXNGUIComponent
	{
		public override string getTypeName()
		{
			return "UITextInput";
		}

		private UIInput uiInput;
		public WXUITextInput(UIInput _uiInput, GameObject gameObject, WXEntity entity): base(_uiInput, gameObject, entity)
		{
			this.uiInput = _uiInput;
			this.entity = entity;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UITextInput");
			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);


			if (uiInput.label)
			{
				subJSON.AddField("label", context.AddComponentInProperty(new WXUILabel(uiInput.label, gameObject, entity), uiInput.label));
			}

			WXUIMask mask = new WXUIMask();
			WXUIGraphic graphic = new WXUIGraphic(0);
			WXKeyboardInputComponent keyboardInput = new WXKeyboardInputComponent(this.uiInput, gameObject, entity);

			entity.components.Add(context.AddComponent(keyboardInput, null));
			entity.components.Add(context.AddComponent(mask, null));
			entity.components.Add(context.AddComponent(graphic, null));
 
			subJSON.AddField("maxChars", uiInput.characterLimit);

			subJSON.AddField("active", this.uiInput.enabled);
			json.AddField("data", subJSON);
			return json;
		}
	}
}
