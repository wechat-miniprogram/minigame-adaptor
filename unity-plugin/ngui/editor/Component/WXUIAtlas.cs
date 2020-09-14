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

    public class WXUIAtlas : WXNGUIComponent
    {

        public override string getTypeName()
        {
            return "UIAtlas";
        }

        private UIAtlas uiAtlas;
        public WXUIAtlas(UIAtlas _uiAtlas, GameObject gameObject, WXEntity entity): base(_uiAtlas, gameObject, entity)
        {
            this.uiAtlas = _uiAtlas;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            Texture2D texture2D = (Texture2D)(uiAtlas.spriteMaterial).GetTexture("_MainTex");
            if (texture2D != null)
            {
                string path = AssetDatabase.GetAssetPath(texture2D.GetInstanceID());
                string texturePath = new WXTexture(texture2D).Export(context.preset);
                context.AddResource(texturePath);

                for (int i = 0; i < uiAtlas.spriteList.Count; i++)
                {
                    string spriteframePath = new WXSpriteFrame(uiAtlas.spriteList[i], texturePath, path).Export(context.preset);
                    context.AddResource(spriteframePath);
                }
            }
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "UIAtlas");
            return json;
        }
    }

}
