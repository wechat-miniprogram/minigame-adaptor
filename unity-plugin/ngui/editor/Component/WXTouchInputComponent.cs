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

	public class WXTouchInputComponent : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "TouchInputComponent";
		}

		private UIButton uiButton;
		private float[] hitArea = null;
		public WXTouchInputComponent(BoxCollider boxCollider, GameObject _gameObj, WXEntity entity) : base(boxCollider, _gameObj, entity)
		{
            if (boxCollider != null)
            {
                float[] hitArea = { boxCollider.center.x - boxCollider.size.x / 2.0f, boxCollider.center.y - boxCollider.size.y / 2.0f, boxCollider.size.x, boxCollider.size.y };
                this.hitArea = hitArea;
            }
        }

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{

			// Debug.Log("WXBeefBallTouchInputComponent:");
			// var output = JsonUtility.ToJson(gameObj, true);
			// Debug.Log(output);


			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "TouchInputComponent");
			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
			subJSON.AddField("touchThrough", false);
			if (hitArea != null)
			{
				JSONObject hitJSON = new JSONObject(JSONObject.Type.ARRAY);
				for (int i = 0; i < hitArea.Length; i++)
				{
					hitJSON.Add(hitArea[i]);
				}
				subJSON.AddField("hitArea", hitJSON);
				subJSON.AddField("useAchor", true);
			}
			json.AddField("data", subJSON);

			if (gameObject.transform.parent)
			{
				var isScrollitem = isScrollChild(gameObject.transform.parent.gameObject);
				subJSON.AddField("touchThrough", isScrollitem);
			}
			else
			{
				subJSON.AddField("touchThrough", false);
			}


			return json;
		}

		private bool isScrollChild(GameObject go)
		{
			if (go.transform.parent == null)
			{
				return false;
			}

			var isScrollView = go.GetComponent(typeof(UIScrollView)) as UIScrollView;
			if (isScrollView)
			{
				return true;
			}
			else
			{
				return isScrollChild(go.transform.parent.gameObject);
			}
		}

	}
}
