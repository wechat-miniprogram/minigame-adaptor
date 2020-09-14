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

    public class WXUIScrollBarScript : WXComponent
    {
        private UIScrollBar uiScrollBar;
        private GameObject go;
        private WXEntity entity;

        public override string getTypeName() {
            return "MiniGameAdaptor.UIScrollBar";
        }


        public WXUIScrollBarScript(UIScrollBar sb, GameObject go, WXEntity entity)
        {
            this.uiScrollBar = sb;
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

            data.AddField("barSize",(float)uiScrollBar.barSize);
            data.AddField("value",(float)uiScrollBar.value);
            data.AddField("alpha",(float)uiScrollBar.alpha);
            data.AddField("fillDirection",(int)uiScrollBar.fillDirection);

            if(uiScrollBar.foregroundWidget!=null){
                var foregroundWidget = new WXUISprite(uiScrollBar.foregroundWidget as UISprite, go, entity);
                data.AddField("foregroundWidget", context.AddComponent(
                    foregroundWidget,
                    uiScrollBar.foregroundWidget
                ));
            }

            if(uiScrollBar.backgroundWidget!=null){
                var backgroundWidget = new WXUISprite(uiScrollBar.backgroundWidget as UISprite, go, entity);
                data.AddField("backgroundWidget", context.AddComponent(
                    backgroundWidget,
                    uiScrollBar.backgroundWidget
                ));
            }


            return json;
        }
    }
}
