using UnityEngine;
using UnityEngine.UI;
using System;


namespace WeChat
{
    public class WXUGUITransform2DComponent : WXComponent
    {
        public override string getTypeName()
        {
            return "Transform2D";
        }

        float transformPositionX = 0;
        float transformPositionY = 0;
        float transformScaleX = 1;
        float transformScaleY = 1;
        float transformRotation = 0;

        public float[] size = { 0, 0 };

        public float[] anchor = { 0.5F, 0.5F };

        // 根据unity transform生成transform
        public WXUGUITransform2DComponent(Transform transform)
        {

			
				transformPositionX = transform.localPosition.x;
            	transformPositionY = transform.localPosition.y;

				transformScaleX = transform.localScale.x;
            	transformScaleY = transform.localScale.y;

            transformRotation = -Mathf.Deg2Rad * transform.localRotation.eulerAngles.z;
			
			_gameObject = transform.gameObject;

            RectTransform t = transform.transform as RectTransform;
            size[0] = t.rect.width;
            size[1] = t.rect.height;

        }

        private GameObject _gameObject;
        // 使用全是0的transform
        //public WXTransform2DComponent(GameObject gameObject)
        //{
        //    _gameObject = gameObject;
        //}

        public void setPosition(float x, float y)
        {
            this.transformPositionX = x;
            this.transformPositionY = y;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);

            
            Text uiLabel = _gameObject.GetComponent(typeof(Text)) as Text;
            if ((UnityEngine.Object)uiLabel != (UnityEngine.Object)null)
            {
                var t = uiLabel.transform as RectTransform;
                anchor[0] = t.pivot.x;
                anchor[1] = t.pivot.y;
                size[0] = t.rect.width;
                size[1] = t.rect.height;
                
            }

            Image image = _gameObject.GetComponent(typeof(Image)) as Image;
            if ((UnityEngine.Object)image != (UnityEngine.Object)null)
            {
                var t = image.transform as RectTransform;
                anchor[0] = t.pivot.x;
                anchor[1] = t.pivot.y;
                size[0] = t.rect.width;
                size[1] = t.rect.height;

            }

            Slider slider = _gameObject.GetComponent(typeof(Slider)) as Slider;
            if ((UnityEngine.Object)slider != (UnityEngine.Object)null)
            {
                var t = slider.transform as RectTransform;
                anchor[0] = t.pivot.x;
                anchor[1] = t.pivot.y;
                size[0] = t.rect.width;
                size[1] = t.rect.height;
            }




            // canvas的渲染模式不同，固定的位置不同
            Canvas canvas = _gameObject.GetComponent(typeof(Canvas)) as Canvas;
            if (canvas != null && canvas.renderMode!=RenderMode.WorldSpace)
            {
                transformPositionX = 0;
                transformPositionY = 0;
            }

            // 位置信息
            JSONObject position = new JSONObject(JSONObject.Type.ARRAY);
            position.Add(transformPositionX);
            position.Add(transformPositionY);

            // 缩放信息
            JSONObject scale = new JSONObject(JSONObject.Type.ARRAY);
            scale.Add(transformScaleX);
            scale.Add(transformScaleY);

            JSONObject sizeArray = new JSONObject(JSONObject.Type.ARRAY);
            //Debug.Log(size[0] + ":" + size[1]);
            sizeArray.Add(size[0]);
            sizeArray.Add(size[1]);

            JSONObject anchorArray = new JSONObject(JSONObject.Type.ARRAY);
            anchorArray.Add(anchor[0]);
            anchorArray.Add(anchor[1]); 

            json.AddField("type", this.getTypeName());
            JSONObject subJSON = new JSONObject(JSONObject.Type.OBJECT);
            subJSON.AddField("position", position);
            subJSON.AddField("rotation", transformRotation);
            subJSON.AddField("scale", scale);
            subJSON.AddField("size", sizeArray);
            subJSON.AddField("anchor", anchorArray);
            json.AddField("data", subJSON);

            return json;
        }
    }
}