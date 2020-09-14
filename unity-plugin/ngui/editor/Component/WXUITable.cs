using System;
using System.Reflection;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;

namespace WeChat
{

	public class WXUITable : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "UIGrid";
		}
		private UITable uiTable;
		public WXUITable(UITable _uiTable, GameObject gameObject, WXEntity entity) : base(_uiTable, gameObject, entity)
        {
			this.uiTable = _uiTable;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UIGrid");

			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

			// var a = JsonUtility.ToJson(uiTable, true);
			// Debug.Log("++++++++++++++++++");
			// Debug.Log(a);

			int arrangement = 1; // 仅用于兼容Grid参数，水平
			subJSON.AddField("arrangement", (int)arrangement);

			float cellWidth = 0; // 仅用于兼容Grid参数，Table会自动获取子元素高度撑大自身
			subJSON.AddField("cellWidth", (float)cellWidth);

			float cellHeight = 0; // 仅用于兼容Grid参数，Table会自动获取子元素高度撑大自身
			subJSON.AddField("cellHeight", (float)cellHeight);

			int columns = uiTable.columns;
			subJSON.AddField("columns", (int)columns);

			var cellAlignmentValue = WXUtility.TryGetContainField(uiTable, "cellAlignment");
			// Debug.Log(cellAlignmentValue);
			if (cellAlignmentValue != null)
			{
				UIWidget.Pivot cellPivot = (UIWidget.Pivot)cellAlignmentValue;
				float cellAlignmentX = (
					cellPivot == UIWidget.Pivot.Left ||
					cellPivot == UIWidget.Pivot.TopLeft ||
					cellPivot == UIWidget.Pivot.BottomLeft
				) ? 0.0f : ((
					cellPivot == UIWidget.Pivot.Center ||
					cellPivot == UIWidget.Pivot.Top ||
					cellPivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);

				float cellAlignmentY = (
					cellPivot == UIWidget.Pivot.Bottom ||
					cellPivot == UIWidget.Pivot.BottomLeft ||
					cellPivot == UIWidget.Pivot.BottomRight
				) ? 0.0f : ((
					cellPivot == UIWidget.Pivot.Left ||
					cellPivot == UIWidget.Pivot.Center ||
					cellPivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);
				subJSON.AddField("cellAlignmentX", cellAlignmentX);
				subJSON.AddField("cellAlignmentY", cellAlignmentY);
			}

			bool autoSize = true; // 表格则自动由子元素撑大本身单元格大小
			subJSON.AddField("autoSize", (bool)autoSize);

			int paddingX = (int)uiTable.padding.x; // 横向间距大小
			subJSON.AddField("paddingX", (int)paddingX);

			int paddingY = (int)uiTable.padding.y; // 纵向间距大小
			subJSON.AddField("paddingY", (int)paddingY);

			int columnLimit = uiTable.columns; // 每行|列最多个数，0为自动
			subJSON.AddField("columnLimit", (int)columnLimit);

			json.AddField("data", subJSON);

			return json;
		}
	}
}
