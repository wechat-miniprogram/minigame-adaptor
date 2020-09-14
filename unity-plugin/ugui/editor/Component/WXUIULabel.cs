using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor.Animations;
using System.IO;
using System.Text;
using UnityEngine.UI;

namespace WeChat
{

    public class WXUIULabel : WXUGUIComponent
    {

        public override string getTypeName()
        {
            return "UILabel";
        }

        private Text uiLabel;
        public WXUIULabel(Text _uiLabel, GameObject gameObject, WXEntity entity) : base(_uiLabel, gameObject, entity)
        {
            this.uiLabel = _uiLabel;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {


            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());


            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
            string str = uiLabel.text;
            subJSON.AddField("text", str);

			subJSON.AddField("fontSize", uiLabel.fontSize);


			JSONObject color = new JSONObject(JSONObject.Type.ARRAY);
            color.Add(255f * uiLabel.color.r);
            color.Add(255f * uiLabel.color.g);
            color.Add(255f * uiLabel.color.b);
            color.Add(255f * uiLabel.color.a);
            subJSON.AddField("fontColor", color);


            int instanceID = 0;
            string fontFamily = "";
            if (uiLabel.font)
            {
                // NGUI font
                instanceID = uiLabel.font.material.GetInstanceID();
                string path = AssetDatabase.GetAssetPath(instanceID); // 相对路径
                if (path.IndexOf("Library") != 0)
                {
                    // Debug.Log(fontFamily);
                    WXUGUIFont fontConverter = new WXUGUIFont(path);
                    fontFamily = fontConverter.Export(context.preset);
                    context.AddResource(fontFamily);
                }
                else
                {
                    string name = this.uiLabel.gameObject.name;
                    Debug.LogWarning("UI Label:" + name + " use system font!!");
                }
            }


            if (fontFamily != "")
            {
                subJSON.AddField("font", fontFamily);
            }


            int alignment = 0;
            if(uiLabel.alignment == TextAnchor.LowerLeft || uiLabel.alignment == TextAnchor.MiddleLeft || uiLabel.alignment == TextAnchor.UpperLeft)
            {
                alignment = 1;
            }
            else if (uiLabel.alignment == TextAnchor.LowerCenter || uiLabel.alignment == TextAnchor.MiddleCenter || uiLabel.alignment == TextAnchor.UpperCenter)
            {
                alignment = 2;
            } else if (uiLabel.alignment == TextAnchor.LowerRight || uiLabel.alignment == TextAnchor.MiddleRight || uiLabel.alignment == TextAnchor.UpperRight)
            {
                alignment = 3;
            }
            subJSON.AddField("align", alignment);

            int valign = 0;
            if (uiLabel.alignment == TextAnchor.LowerLeft || uiLabel.alignment == TextAnchor.LowerCenter || uiLabel.alignment == TextAnchor.LowerRight)
            {
                valign = 3;
            }
            else if (uiLabel.alignment == TextAnchor.MiddleLeft || uiLabel.alignment == TextAnchor.MiddleCenter || uiLabel.alignment == TextAnchor.MiddleRight)
            {
                valign = 2;
            }
            else if (uiLabel.alignment == TextAnchor.UpperLeft || uiLabel.alignment == TextAnchor.UpperCenter || uiLabel.alignment == TextAnchor.UpperRight)
            {
                valign = 1;
            }
            subJSON.AddField("valign", valign);


            //switch (uiLabel.alignment.ToString())
            //{

            //}
            //if(uiLabel.)

            subJSON.AddField("active", uiLabel.IsActive());
            json.AddField("data", subJSON);

            return json;
        }
    }
}
