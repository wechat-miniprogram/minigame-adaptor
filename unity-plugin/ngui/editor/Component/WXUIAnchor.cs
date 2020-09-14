using System.Collections;
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

	public class WXUIAnchor : WXNGUIComponent
	{
		public override string getTypeName()
		{
			return "UIAnchor";
		}

		private UIAnchor uiAnchor;
		public WXUIAnchor(UIAnchor _uiAnchor, GameObject _gameObj, WXEntity entity): base(_uiAnchor, _gameObj, entity)
		{
			this.uiAnchor = _uiAnchor;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			var a = JsonUtility.ToJson(uiAnchor, true);

			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UIAnchor");


			JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
			data.AddField("side", uiAnchor.side.ToString());

			JSONObject pixelOffset = new JSONObject(JSONObject.Type.ARRAY);
			pixelOffset.Add(uiAnchor.pixelOffset.x);
			pixelOffset.Add(uiAnchor.pixelOffset.y);
			data.AddField("pixelOffset", pixelOffset);

			JSONObject relativeOffset = new JSONObject(JSONObject.Type.ARRAY);
			relativeOffset.Add(uiAnchor.relativeOffset.x);
			relativeOffset.Add(uiAnchor.relativeOffset.y);
			data.AddField("relativeOffset", relativeOffset);

			json.AddField("data", data);

			return json;
		}
	}


}