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

	public class WXUGUITouchInputComponent : WXUGUIComponent
	{

		public override string getTypeName()
		{
			return "TouchInputComponent";
		}

		public WXUGUITouchInputComponent( GameObject _gameObj, WXEntity entity) : base(null, _gameObj, entity)
		{

        }

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{




			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "TouchInputComponent");
			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
			subJSON.AddField("touchThrough", false);

			json.AddField("data", subJSON);



			return json;
		}


	}
}
