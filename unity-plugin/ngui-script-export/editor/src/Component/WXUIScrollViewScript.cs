using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Reflection;

using UnityEditor;
using UnityEngine;

namespace WeChat
{

    public class WXUIScrollViewScript : WXComponent
    {
        private UIScrollView uiScrollView;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName() {
            return "MiniGameAdaptor.UIScrollView";
        }

        public WXUIScrollViewScript(UIScrollView sv, GameObject go, WXEntity entity)
        {
            this.uiScrollView = sv;
            this.go = go;
            this.entity = entity;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);
            data.AddField("active", true);

            UIScrollView.ShowCondition showScrollBars = uiScrollView.showScrollBars;
			data.AddField("showScrollBars", (int)showScrollBars);

            var horizontalScrollBar = (UIScrollBar)uiScrollView.horizontalScrollBar;
			if(horizontalScrollBar != null){
				data.AddField("horizontalScrollBar", context.AddComponent(new WXUIScrollBarScript(horizontalScrollBar,go,entity), horizontalScrollBar));
			}

            var verticalScrollBar = (UIScrollBar)uiScrollView.verticalScrollBar;
			if(verticalScrollBar != null){
				data.AddField("verticalScrollBar", context.AddComponent(new WXUIScrollBarScript(verticalScrollBar,go,entity), verticalScrollBar));
			}


            data.AddField("ref", context.AddComponent(new WXUIScrollView(uiScrollView, go, entity), uiScrollView));

            return json;
        }
    }
}
