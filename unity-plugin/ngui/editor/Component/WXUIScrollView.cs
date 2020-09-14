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


	public class WXUIScrollView : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "UIScrollView";
		}
		private UIScrollView uiScrollView;
		public WXUIScrollView(UIScrollView _uiScrollView, GameObject gameObject, WXEntity entity) : base(_uiScrollView, gameObject, entity)
        {
			this.uiScrollView = _uiScrollView;
		}

		// public void init (WXBeefBallHierarchyContext context) {
		//     // 添加控制父节点
		//     WXBeefBallEntity scrollViewControllerEntity = context.CreateEntity(null);
		//     scrollViewControllerEntity.isExtraEntity = false;
		//     scrollViewControllerEntity.isNguiChild = true;

		//     WXBBTransform2DComponent transformController = new WXBBTransform2DComponent(gameObj.transform);
		//     WXBBUIScrollViewController scrollViewController = new WXBBUIScrollViewController(uiScrollView, gameObj, transformController);
		//     scrollViewControllerEntity.components.Add(context.addComponent(scrollViewController, null));
		//     WXBeefBallTouchInputComponent touchInput = new WXBeefBallTouchInputComponent(gameObj, null);
		//     scrollViewControllerEntity.components.Add(context.addComponent(touchInput, null));
		//     // 蒙版区域
		//     WXBBUIMask mask = new WXBBUIMask();
		//     WXBBUIGraphic graphic = new WXBBUIGraphic(0);
		//     scrollViewControllerEntity.components.Add(context.addComponent(mask, null));
		//     scrollViewControllerEntity.components.Add(context.addComponent(graphic, null));

		//     // 内容区域矫正
		//     UIPanel uiPanel = gameObj.GetComponent(typeof(UIPanel)) as UIPanel;
		//     if ((UnityEngine.Object)uiPanel != (UnityEngine.Object)null)
		//     {
		//         Vector4 offSet = uiPanel.clipOffset;
		//         Vector2 center = uiPanel.baseClipRegion;

		//         transform.size[0] = uiPanel.width;
		//         transform.size[1] = uiPanel.height;

		//         transform.setPosition(-((float)offSet.x + (float)center.x), -((float)offSet.y + (float)center.y));
		//     }

		//     scrollViewControllerEntity.components.Add(context.addComponent(transformController, null));
		//     // 修改父子关系
		//     scrollViewControllerEntity.parent = entity.parent;
		//     entity.parent = scrollViewControllerEntity;


		// }

		protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            entity.components.Add(context.AddComponent(new WXTouchInputComponent(null, gameObject, entity), null));
            entity.components.Add(context.AddComponent(new WXUIMask(), null));
            entity.components.Add(context.AddComponent(new WXUIGraphic(0), null));

            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UIScrollView");

			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

			UIScrollView.Movement movement = uiScrollView.movement;
			subJSON.AddField("movement", (int)movement);

			bool disableDragIfFits = uiScrollView.disableDragIfFits;
			subJSON.AddField("disableDragIfFits", (bool)disableDragIfFits);

			UIPanel uiPanel = gameObject.GetComponent(typeof(UIPanel)) as UIPanel;
			if ((UnityEngine.Object)uiPanel != (UnityEngine.Object)null)
			{

				Vector4 offSet = uiPanel.clipOffset;
				Vector2 center = uiPanel.baseClipRegion;
				subJSON.AddField("offSetX", (float)offSet.x);
				subJSON.AddField("offSetY", (float)offSet.y);
				subJSON.AddField("centerX", (float)center.x);
				subJSON.AddField("centerY", (float)center.y);
			}

			UIWidget.Pivot contentPivot = uiScrollView.contentPivot;
			float cellAlignmentX = (
				contentPivot == UIWidget.Pivot.Left ||
				contentPivot == UIWidget.Pivot.TopLeft ||
				contentPivot == UIWidget.Pivot.BottomLeft
			) ? 0.0f : ((
				contentPivot == UIWidget.Pivot.Center ||
				contentPivot == UIWidget.Pivot.Top ||
				contentPivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);

			float cellAlignmentY = (
				contentPivot == UIWidget.Pivot.Bottom ||
				contentPivot == UIWidget.Pivot.BottomLeft ||
				contentPivot == UIWidget.Pivot.BottomRight
			) ? 0.0f : ((
				contentPivot == UIWidget.Pivot.Left ||
				contentPivot == UIWidget.Pivot.Center ||
				contentPivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);
			subJSON.AddField("cellAlignmentX", cellAlignmentX);
			subJSON.AddField("cellAlignmentY", cellAlignmentY);

			subJSON.AddField("autoFix", true);

			json.AddField("data", subJSON);
			return json;
		}
	}

	// public class WXBBUIScrollViewController : WXBeefBallComponent {

	//     public override string getTypeName()
	//     {
	//         return "UIScrollViewController";
	//     }
	//     private UIScrollView uiScrollView;
	//     private GameObject gameObj;
	//     private WXBBTransform2DComponent transform;
	//     public WXBBUIScrollViewController(UIScrollView _uiScrollView, GameObject _gameObj, WXBBTransform2DComponent _transform)
	//     {
	//         this.uiScrollView = _uiScrollView;
	//         this.gameObj = _gameObj;
	//         this.transform = _transform;
	//     }
	//     protected override JSONObject ToJSON(WXBeefBallHierarchyContext context)
	//     {

	//         JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
	//         json.AddField("type", "UIScrollView");

	//         JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

	//         UIScrollView.Movement movement = uiScrollView.movement;
	//         subJSON.AddField("movement", (int)movement);

	//         bool disableDragIfFits = uiScrollView.disableDragIfFits;
	//         subJSON.AddField("disableDragIfFits", (bool)disableDragIfFits);

	//         UIPanel uiPanel = gameObj.GetComponent(typeof(UIPanel)) as UIPanel;
	//         if ((UnityEngine.Object)uiPanel != (UnityEngine.Object)null)
	//         {
	//             Vector4 offSet = uiPanel.clipOffset;
	//             Vector2 center = uiPanel.baseClipRegion;

	//             transform.size[0] = uiPanel.width;
	//             transform.size[1] = uiPanel.height;

	//             transform.setPosition(gameObj.transform.localPosition.x + (float)offSet.x + (float)center.x, gameObj.transform.localPosition.y + (float)offSet.y + (float)center.y);
	//         }


	//         json.AddField("data", subJSON);

	//         return json;
	//     }
	// }
}
