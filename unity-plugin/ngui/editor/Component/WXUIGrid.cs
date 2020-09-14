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

	public class WXUIGrid : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "UIGrid";
		}
		private UIGrid uiGrid;
		public WXUIGrid(UIGrid _uiGrid, GameObject gameObject, WXEntity entity) : base(_uiGrid, gameObject, entity)
        {
			this.uiGrid = _uiGrid;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UIGrid");

			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

			//var a = JsonUtility.ToJson(uiGrid, true);
			//Debug.Log("========================");
			//Debug.Log(a);
			//Debug.Log("------------");
			//Debug.Log(uiGrid.pivot);

			UIGrid.Arrangement arrangement = uiGrid.arrangement;
			subJSON.AddField("arrangement", (int)arrangement);

			float cellWidth = uiGrid.cellWidth;
			subJSON.AddField("cellWidth", (float)cellWidth);

			float cellHeight = uiGrid.cellHeight;
			subJSON.AddField("cellHeight", (float)cellHeight);

			int columns = uiGrid.maxPerLine; // 命名兼容UITable，每行|列最多个数，0为自动
			subJSON.AddField("columns", (int)columns);

			int paddingX = 0; // 命名兼容UITable
			subJSON.AddField("paddingX", (int)paddingX);

			int paddingY = 0; // 命名兼容UITable
			subJSON.AddField("paddingY", (int)paddingY);

			bool autoSize = false; // Grid指定大小，不需要自动撑大，此处为兼容UITable
			subJSON.AddField("autoSize", autoSize);


			json.AddField("data", subJSON);

			return json;
		}
	}
}