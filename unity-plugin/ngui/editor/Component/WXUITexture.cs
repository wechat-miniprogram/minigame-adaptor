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

	public class WXUITexture : WXNGUIComponent
	{

		public override string getTypeName()
		{
			return "UISprite";
		}

		private UITexture uiTexture;
        public WXUITexture(UITexture _uiTexture, GameObject gameObject, WXEntity entity): base(_uiTexture, gameObject, entity)
		{
			this.uiTexture = _uiTexture;
		}

		protected override JSONObject ToJSON(WXHierarchyContext context)
		{
			JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
			json.AddField("type", "UISprite");

			JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);

			JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
			color.Add(255f * uiTexture.color.r);
			color.Add(255f * uiTexture.color.g);
			color.Add(255f * uiTexture.color.b);
			color.Add(255f * uiTexture.color.a);
			subJSON.AddField("color", color);
			subJSON.AddField("colorBlendType", 0);

			UI2DSprite.Type type = uiTexture.type;
			subJSON.AddField("type", (int)type);

			UI2DSprite.Flip flipType = uiTexture.flip;
			subJSON.AddField("flip", (int)flipType);
			subJSON.AddField("fillCenter", uiTexture.centerType == UI2DSprite.AdvancedType.Sliced);
			subJSON.AddField("fillDir", (int)uiTexture.fillDirection);
			subJSON.AddField("fillAmount", uiTexture.fillAmount);
			subJSON.AddField("invertFill", uiTexture.invert);

			string texturePath = "";
			if (uiTexture.mainTexture != null)
			{
				Texture2D texture2D = (Texture2D)uiTexture.mainTexture;
				if (texture2D != null)
				{
					string path = AssetDatabase.GetAssetPath(texture2D.GetInstanceID());

                    texturePath = new WXTexture(texture2D).Export(context.preset);// MaterialUtil.SaveTextureFile(texture2D);
					context.AddResource(texturePath);

                    UISpriteData data = new UISpriteData();
                    data.width = uiTexture.mainTexture.width;
                    data.height = uiTexture.mainTexture.height;

                    WXSpriteFrame spriteFrame = new WXSpriteFrame(data, texturePath, path);
                    string key = spriteFrame.Export(context.preset);

                    subJSON.AddField("spriteFrame", key);
                    context.AddResource(key);
				}

			}
			else
			{
				JSONObject nullJSON = new JSONObject(JSONObject.Type.NULL);
				subJSON.AddField("spriteFrame", nullJSON);
			}

			subJSON.AddField("active", uiTexture.enabled);

			json.AddField("data", subJSON);

			return json;
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
