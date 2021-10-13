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

	public class WXUISprite : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "UISprite";
		}

		private UISprite uiSprite;
		public WXUISprite(UISprite _uiSprite, GameObject gameObject, WXEntity entity): base(_uiSprite, gameObject, entity)
		{
			this.uiSprite = _uiSprite;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			if (uiSprite != null)
			{
				//if (uiSprite.isAnchored)
				//{
				//    JSONObject anchorJson = new JSONObject(JSONObject.Type.OBJECT);
				//    anchorJson.AddField("type", "UIWidget");
				//    JSONObject anchorSubJSON = new JSONObject(JSONObject.Type.OBJECT);
				//    anchorSubJSON.AddField("leftMargin", uiSprite.leftAnchor.absolute);
				//    anchorSubJSON.AddField("rightMargin", uiSprite.rightAnchor.absolute);
				//    anchorSubJSON.AddField("topMargin", uiSprite.topAnchor.absolute);
				//    anchorSubJSON.AddField("bottomMargin", uiSprite.bottomAnchor.absolute);
				//    anchorJson.AddField("data", anchorSubJSON);

				//}

				JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
				json.AddField("type", "UISprite");

				JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

				JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
				color.Add(255f * uiSprite.color.r);
				color.Add(255f * uiSprite.color.g);
				color.Add(255f * uiSprite.color.b);
				color.Add(255f * uiSprite.color.a);
				subJSON.AddField("color", color);
				subJSON.AddField("colorBlendType", 0);

				//if (uiSprite.name == "PageBagChecked")
				//{
				//    Debug.Log("++==++==++");

				//    Debug.Log(uiSprite.isAnchored);
				//    Debug.Log(uiSprite.bottomAnchor.absolute);
				//    Debug.Log(uiSprite.bottomAnchor.target.name);
				//}

				UI2DSprite.Type type = uiSprite.type;
				subJSON.AddField("type", (int)type);

				UI2DSprite.Flip flipType = uiSprite.flip;
				subJSON.AddField("flip", (int)flipType);
				subJSON.AddField("fillCenter", uiSprite.centerType == UI2DSprite.AdvancedType.Sliced);
				subJSON.AddField("fillDir", (int)uiSprite.fillDirection);
				subJSON.AddField("fillAmount", uiSprite.fillAmount);
				subJSON.AddField("invertFill", uiSprite.invert);

				if (uiSprite.atlas != null)
				{
					string uuid = WXSpriteFrame.getSprite(uiSprite.atlas, uiSprite.spriteName, context.preset);
					if (uuid == null)
					{
						Debug.LogWarning("获取sprite失败: " + uiSprite.spriteName);
					}
					else
					{
						context.AddResource(uuid);
					}

					if (uuid != null)
					{
						subJSON.AddField("spriteFrame", uuid);
					}
					else
					{
						JSONObject nullJSON = new JSONObject(JSONObject.Type.NULL);
						subJSON.AddField("spriteFrame", nullJSON);
					}

				}
				else
				{
					JSONObject nullJSON = new JSONObject(JSONObject.Type.NULL);
					subJSON.AddField("spriteFrame", nullJSON);
				}

				subJSON.AddField("active", uiSprite.enabled);
				json.AddField("data", subJSON);

				return json;
			}
			else
			{
				JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
				json.AddField("type", "UISprite");

				JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

				JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
				color.Add(255f);
				color.Add(255f);
				color.Add(255f);
				color.Add(255f);
				subJSON.AddField("color", color);
				subJSON.AddField("colorBlendType", 0);
				subJSON.AddField("type", (int)UI2DSprite.Type.Simple);
				subJSON.AddField("flip", (int)UI2DSprite.Flip.Nothing);
				subJSON.AddField("fillCenter", false);
				subJSON.AddField("fillDir", (int)UI2DSprite.FillDirection.Horizontal);
				subJSON.AddField("fillAmount", 0);
				subJSON.AddField("invertFill", false);

				JSONObject nullJSON = new JSONObject(JSONObject.Type.NULL);
				subJSON.AddField("spriteFrame", nullJSON);

				subJSON.AddField("active", true);
				json.AddField("data", subJSON);

				return json;
			}

		}

		private Texture2D DuplicateTexture(Texture2D source)
		{
			RenderTexture renderTex = RenderTexture.GetTemporary(
						source.width,
						source.height,
						0,
						RenderTextureFormat.Default,
						RenderTextureReadWrite.Linear);

			Graphics.Blit(source, renderTex);
			RenderTexture previous = RenderTexture.active;
			RenderTexture.active = renderTex;
			Texture2D readableText = new Texture2D(source.width, source.height);
			readableText.ReadPixels(new Rect(0, 0, renderTex.width, renderTex.height), 0, 0);
			readableText.Apply();
			RenderTexture.active = previous;
			RenderTexture.ReleaseTemporary(renderTex);
			return readableText;
		}
	}
}
