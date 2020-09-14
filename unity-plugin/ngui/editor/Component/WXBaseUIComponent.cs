
using UnityEngine;

namespace WeChat
{

    public abstract class WXNGUIComponent : WXComponent
    {
        protected GameObject gameObject;
        protected WXEntity entity;
        public WXNGUIComponent(Component nativeComponent, GameObject gameObject, WXEntity entity) {
            this.gameObject = gameObject;
            this.entity = entity;
        }
    }
}