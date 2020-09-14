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

	public class WXUIButton : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "UIButton";
		}

		private UIButton uiButton;
		public WXUIButton(UIButton _uiButton, GameObject gameObject, WXEntity entity) : base(_uiButton, gameObject, entity)
        {
			this.uiButton = _uiButton;
		}

		public string getStateSprite(WXHierarchyContext context, UISprite uiSprite, string spriteName)
		{

			string uuid = WXSpriteFrame.getSprite(uiSprite.atlas as UIAtlas, spriteName, context.preset);
			context.AddResource(uuid);
			return uuid;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UIButton");

			/*
			JSONObject colorHover = new JSONObject(JSONObject.Type.ARRAY);
			colorHover.Add(uiButton.hover.r);
			colorHover.Add(uiButton.hover.g);
			colorHover.Add(uiButton.hover.b);
			colorHover.Add(uiButton.hover.a);
			json.AddField("colorHover", colorHover);
			*/

			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

			JSONObject colorPressed = new JSONObject(JSONObject.Type.ARRAY);
			colorPressed.Add(255f * uiButton.pressed.r);
			colorPressed.Add(255f * uiButton.pressed.g);
			colorPressed.Add(255f * uiButton.pressed.b);
			colorPressed.Add(255f * uiButton.pressed.a);
			subJSON.AddField("pressedColor", colorPressed);

			JSONObject colorDisabledColor = new JSONObject(JSONObject.Type.ARRAY);
			colorDisabledColor.Add(255f * uiButton.disabledColor.r);
			colorDisabledColor.Add(255f * uiButton.disabledColor.g);
			colorDisabledColor.Add(255f * uiButton.disabledColor.b);
			colorDisabledColor.Add(255f * uiButton.disabledColor.a);
			subJSON.AddField("disabledColor", colorDisabledColor);


			JSONObject colorNormal = new JSONObject(JSONObject.Type.ARRAY);
			
			if(uiButton.tweenTarget != null){
				var mWidget = uiButton.tweenTarget.GetComponent<UIWidget>();
				colorNormal.Add(255f * mWidget.color.r);
				colorNormal.Add(255f * mWidget.color.g);
				colorNormal.Add(255f * mWidget.color.b);
				colorNormal.Add(255f * mWidget.color.a);
				subJSON.AddField("normalColor", colorNormal);
			}


			UISprite uiSprite = uiButton.GetComponent(typeof(UISprite)) as UISprite;
			if (uiSprite != null && uiSprite.atlas != null)
			{
				Material atlasMaterial = uiSprite.atlas.spriteMaterial;
				Texture2D texture2D = (Texture2D)atlasMaterial.GetTexture("_MainTex");
				if (texture2D != null)
				{
					string path = AssetDatabase.GetAssetPath(texture2D.GetInstanceID());

					if (uiButton.normalSprite != null && uiButton.normalSprite != "")
					{
						string normalSpriteKey = this.getStateSprite(context, uiSprite, uiButton.normalSprite);
						if (normalSpriteKey != null)
						{
							subJSON.AddField("normalSprite", normalSpriteKey);
						}
						else
						{
							subJSON.AddField("normalSprite", new JSONObject(JSONObject.Type.NULL));
						}
					}
					else
					{
						subJSON.AddField("normalSprite", new JSONObject(JSONObject.Type.NULL));
					}

					if (uiButton.pressedSprite != null && uiButton.pressedSprite != "")
					{
						string pressedSpriteKey = this.getStateSprite(context, uiSprite, uiButton.pressedSprite);
						if (pressedSpriteKey != null)
						{
							subJSON.AddField("pressedSprite", pressedSpriteKey);
						}
						else
						{
							subJSON.AddField("pressedSprite", new JSONObject(JSONObject.Type.NULL));
						}
					}
					else
					{
						subJSON.AddField("pressedSprite", new JSONObject(JSONObject.Type.NULL));
					}

					if (uiButton.disabledSprite != null && uiButton.disabledSprite != "")
					{
						string disabledSpriteKey = this.getStateSprite(context, uiSprite, uiButton.disabledSprite);
						if (disabledSpriteKey != null)
						{
							subJSON.AddField("disabledSprite", disabledSpriteKey);
						}
						else
						{
							subJSON.AddField("disabledSprite", new JSONObject(JSONObject.Type.NULL));
						}
					}
					else
					{
						subJSON.AddField("disabledSprite", new JSONObject(JSONObject.Type.NULL));
					}
				}
				else
				{
					subJSON.AddField("normalSprite", new JSONObject(JSONObject.Type.NULL));
					subJSON.AddField("pressedSprite", new JSONObject(JSONObject.Type.NULL));
					subJSON.AddField("disabledSprite", new JSONObject(JSONObject.Type.NULL));
				}

			}
			else
			{
				subJSON.AddField("normalSprite", new JSONObject(JSONObject.Type.NULL));
				subJSON.AddField("pressedSprite", new JSONObject(JSONObject.Type.NULL));
				subJSON.AddField("disabledSprite", new JSONObject(JSONObject.Type.NULL));
			}

			subJSON.AddField("active", uiButton.enabled);

			json.AddField("data", subJSON);

			return json;
		}
	}
}
