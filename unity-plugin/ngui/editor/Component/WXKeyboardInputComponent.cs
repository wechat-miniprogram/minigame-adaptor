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

	public class WXKeyboardInputComponent : WXNGUIComponent
    {

		public override string getTypeName()
		{
			return "KeyboardInputComponent";
		}

		private UIInput uiInput;
		public WXKeyboardInputComponent(UIInput _uiInput, GameObject gameObject, WXEntity entity): base(_uiInput, gameObject, entity)
		{
			this.uiInput = _uiInput;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "KeyboardInputComponent");
			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
			subJSON.AddField("active", this.uiInput.enabled);
			json.AddField("data", subJSON);
			return json;
		}
	}
}
