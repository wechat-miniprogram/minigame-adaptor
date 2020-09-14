using System.Collections;
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
    public class WXUIWidget : WXNGUIComponent
    {
        public override string getTypeName()
        {
            return "UIWidget";
        }

        private UIWidget uiWidget;
        public WXUIWidget(UIWidget _uiWidget, GameObject gameObject, WXEntity entity): base(_uiWidget, gameObject, entity)
        {
            this.uiWidget = _uiWidget;
        }

        static public void changeTransform(UIWidget uiWidget, WXTransform2DComponent transform)
        {

            UIWidget.Pivot contentPivot = uiWidget.pivot;
            transform.anchor[0] = (
                contentPivot == UIWidget.Pivot.Left ||
                contentPivot == UIWidget.Pivot.TopLeft ||
                contentPivot == UIWidget.Pivot.BottomLeft
            ) ? 0.0f : ((
                contentPivot == UIWidget.Pivot.Center ||
                contentPivot == UIWidget.Pivot.Top ||
                contentPivot == UIWidget.Pivot.Bottom) ? 0.5f : 1.0f);

            transform.anchor[1] = (
                contentPivot == UIWidget.Pivot.Bottom ||
                contentPivot == UIWidget.Pivot.BottomLeft ||
                contentPivot == UIWidget.Pivot.BottomRight
            ) ? 0.0f : ((
                contentPivot == UIWidget.Pivot.Left ||
                contentPivot == UIWidget.Pivot.Center ||
                contentPivot == UIWidget.Pivot.Right) ? 0.5f : 1.0f);

        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "UIWidget");
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

            data.AddField("execute", (int)uiWidget.updateAnchors);

            data.AddField("leftAnchor", (float)uiWidget.leftAnchor.relative);
            if (uiWidget.leftAnchor.target != null)
            {
                data.AddField("leftAnchorTarget",
                    context.AddComponentInProperty(
                        new WXTransform2DComponent(uiWidget.leftAnchor.target),
                        uiWidget.leftAnchor.target
                    )
                );
            }
            data.AddField("leftOffset", (int)uiWidget.leftAnchor.absolute);

            data.AddField("rightAnchor", (float)uiWidget.rightAnchor.relative);
            if (uiWidget.rightAnchor.target != null)
            {
                data.AddField("rightAnchorTarget",
                    context.AddComponentInProperty(
                        new WXTransform2DComponent(uiWidget.rightAnchor.target),
                        uiWidget.rightAnchor.target
                    )
                );
            }
            data.AddField("rightOffset", (int)uiWidget.rightAnchor.absolute);

            data.AddField("bottomAnchor", (float)uiWidget.bottomAnchor.relative);
            if (uiWidget.bottomAnchor.target != null)
            {
                data.AddField("bottomAnchorTarget",
                    context.AddComponentInProperty(
                        new WXTransform2DComponent(uiWidget.bottomAnchor.target),
                        uiWidget.bottomAnchor.target
                    )
                );
            }
            data.AddField("bottomOffset", (int)uiWidget.bottomAnchor.absolute);

            data.AddField("topAnchor", (float)uiWidget.topAnchor.relative);
            if (uiWidget.topAnchor.target != null)
            {
                data.AddField("topAnchorTarget",
                    context.AddComponentInProperty(
                        new WXTransform2DComponent(uiWidget.topAnchor.target),
                        uiWidget.topAnchor.target
                    )
                );
            }
            data.AddField("topOffset", (int)uiWidget.topAnchor.absolute);

            json.AddField("data", data);
            return json;


            //JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

            /* if (uiWidget.rawPivot.ToString() == "Left")
            {
                transform.anchor[0] = 0;

            } else if (uiWidget.rawPivot.ToString() == "Right")
            {
                transform.anchor[0] = 1;
            } else if (uiWidget.rawPivot.ToString() == "Center")
            {
                // transform.anchor[0] = 0.5;
            }

            if (uiWidget.pivot.ToString() == "Top")
            {
                transform.anchor[1] = 0;
            }
            else if (uiWidget.pivot.ToString() == "Bottom")
            {
                transform.anchor[1] = 1;
            }
            else if (uiWidget.pivot.ToString() == "Center")
            {
                // transform.anchor[1] = 0.5;
            }*/

            //json.AddField("data", data);

            //if (uiWidget.isAnchored == true)
            //{
            //    Debug.Log(uiWidget.name);
            //    if (uiWidget.parent == uiWidget.topAnchor.target)
            //    {
            //        data.AddField("topMargin", uiWidget.topAnchor.absolute);
            //    }
            //    if (uiWidget.parent == uiWidget.leftAnchor.target)
            //    {
            //        data.AddField("leftMargin", uiWidget.leftAnchor.absolute);
            //    }
            //    if (uiWidget.parent == uiWidget.rightAnchor.target)
            //    {
            //        data.AddField("rightMargin", uiWidget.rightAnchor.absolute);
            //    }
            //    if (uiWidget.parent == uiWidget.bottomAnchor.target)
            //    {
            //        data.AddField("bottomMargin", uiWidget.bottomAnchor.absolute);
            //    }
            //}

            //if(uiWidget.name == "GemFull")
            //{
            //    Debug.Log(uiWidget);
            //}
        }
    }

}
