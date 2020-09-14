using UnityEngine;

namespace WeChat
{

    public abstract class WXUGUIComponent : WXComponent
    {
        protected GameObject gameObject;
        protected WXEntity entity;
        public WXUGUIComponent(Component nativeComponent, GameObject gameObject, WXEntity entity) {
            this.gameObject = gameObject;
            this.entity = entity;
        }
    }
}