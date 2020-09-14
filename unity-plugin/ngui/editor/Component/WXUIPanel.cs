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
	public class WXUIPanel : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "UIPanel";
		}

		private UIPanel uiPanel;
		public WXUIPanel(UIPanel _uiPanel, GameObject gameObject, WXEntity entity) : base(_uiPanel, gameObject, entity)
        {
			this.uiPanel = _uiPanel;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UIPanel");
			// json.AddField("alpha", uiPanel.alpha);
			// json.AddField("depth", uiPanel.depth);

			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("data", subJSON);

			return json;
		}
	}

}
