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

    public class WXUILabel : WXNGUIComponent
    {

        public override string getTypeName()
        {
            return "UILabel";
        }

        private UILabel uiLabel;
        public WXUILabel(UILabel _uiLabel, GameObject gameObject, WXEntity entity) : base(_uiLabel, gameObject, entity)
        {
            this.uiLabel = _uiLabel;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "UILabel");

            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
            string str = uiLabel.text.Replace("\r\n", "\\n").Replace("\\", "\\\\").Replace("\"", "\\\"");
            subJSON.AddField("text", str);
            subJSON.AddField("fontSize", uiLabel.fontSize);

            int instanceID = 0;
            string fontFamily = "";
            if (uiLabel.trueTypeFont)
            {
                // NGUI font
                instanceID = uiLabel.trueTypeFont.material.GetInstanceID();
                string path = AssetDatabase.GetAssetPath(instanceID); // 相对路径
                if (path.IndexOf("Library") != 0)
                {
                    // Debug.Log(fontFamily);
                    WXFont fontConverter = new WXFont(path);
                    fontFamily = fontConverter.Export(context.preset);
                    context.AddResource(fontFamily);
                }
                else
                {
                    string name = this.uiLabel.gameObject.name;
                    Debug.LogWarning("UI Label:" + name + " use system font!!");
                }
            }
            else if (uiLabel.bitmapFont as UIFont)
            {
                fontFamily = "";
                WXBitmapFont bitmapFont = new WXBitmapFont(uiLabel.bitmapFont as UIFont);
                string path = bitmapFont.Export(context.preset);
                context.AddResource(path);
                subJSON.AddField("bitmapFont", path);
            }

            if (fontFamily != "")
            {
                subJSON.AddField("font", fontFamily);
            }

            string fontStyle = uiLabel.fontStyle.ToString();
            subJSON.AddField("bold", fontStyle == "Bold" || fontStyle == "Bold And Italic");
            subJSON.AddField("italic", fontStyle == "Italic" || fontStyle == "Bold And Italic");

            int alignment = 0;
            switch (uiLabel.alignment.ToString())
            {
                case "Left":
                    alignment = 1;
                    break;
                case "Center":
                    alignment = 2;
                    break;
                case "Right":
                    alignment = 3;
                    break;
                default:
                    alignment = 0;
                    string rawPivot = uiLabel.rawPivot.ToString();
                    switch (rawPivot)
                    {
                        case "Left":
                            alignment = 1;
                            break;
                        case "Center":
                            alignment = 2;
                            break;
                        case "Right":
                            alignment = 3;
                            break;
                    }
                    break;
            }
            subJSON.AddField("align", alignment);

            // 应轩辕要求，缺省值改成 2
            int valign = 2;
            string pivot = uiLabel.pivot.ToString();
            switch (pivot)
            {
                case "Top":
                    valign = 1;
                    break;
                case "Center":
                    valign = 2;
                    break;
                case "Bottom":
                    valign = 3;
                    break;
                default:
                    valign = 2;
                    break;
            }
            subJSON.AddField("valign", valign);

            if (uiLabel.effectStyle != UILabel.Effect.None)
            {

                JSONObject c = new JSONObject(JSONObject.Type.ARRAY);
                c.Add(255f * uiLabel.effectColor.r);
                c.Add(255f * uiLabel.effectColor.g);
                c.Add(255f * uiLabel.effectColor.b);
                c.Add(255f * uiLabel.effectColor.a);
                switch (uiLabel.effectStyle)
                {
                    case UILabel.Effect.None:
                        break;
                    case UILabel.Effect.Shadow:
                        JSONObject v2 = new JSONObject(JSONObject.Type.ARRAY);
                        v2.Add(uiLabel.effectDistance.x);
                        v2.Add(uiLabel.effectDistance.y);
                        subJSON.AddField("shadowOffset", v2);
                        subJSON.AddField("shadowColor", c);
                        break;
                    case UILabel.Effect.Outline8:
                        subJSON.AddField("strokeColor", c);
                        subJSON.AddField("stroke", uiLabel.effectDistance.x);
                        break;
                    case UILabel.Effect.Outline:
                        subJSON.AddField("strokeColor", c);
                        subJSON.AddField("stroke", uiLabel.effectDistance.x);
                        break;
                    default:
                        break;
                }
            }

            subJSON.AddField("spacing", uiLabel.spacingX);

            JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
            color.Add(255f * uiLabel.color.r);
            color.Add(255f * uiLabel.color.g);
            color.Add(255f * uiLabel.color.b);
            color.Add(255f * uiLabel.color.a);
            subJSON.AddField("fontColor", color);
            subJSON.AddField("colorBlendType", 0);

            subJSON.AddField("applyGradient", uiLabel.applyGradient);

            JSONObject topColor = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject bottomColor = new JSONObject(JSONObject.Type.ARRAY);

            topColor.Add(255f * uiLabel.gradientTop.r);
            topColor.Add(255f * uiLabel.gradientTop.g);
            topColor.Add(255f * uiLabel.gradientTop.b);
            topColor.Add(255f * uiLabel.gradientTop.a);

            bottomColor.Add(255f * uiLabel.gradientBottom.r);
            bottomColor.Add(255f * uiLabel.gradientBottom.g);
            bottomColor.Add(255f * uiLabel.gradientBottom.b);
            bottomColor.Add(255f * uiLabel.gradientBottom.a);

            subJSON.AddField("gradientTop", topColor);
            subJSON.AddField("gradientBottom", bottomColor);

            subJSON.AddField("active", uiLabel.enabled);
            json.AddField("data", subJSON);

            return json;
        }
    }
}
