using UnityEngine;
using System;

namespace WeChat
{

    public class WXTransform3DComponent : WXComponent
    {
        private Transform transform;
        private Boolean usingDefault = false;

        public override string getTypeName()
        {
            return "Transform3D";
        }

        public WXTransform3DComponent(Transform transform, Boolean usingDefault = false)
        {
            this.transform = transform;
            this.usingDefault = usingDefault;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);

            // 位置信息
            JSONObject position = new JSONObject(JSONObject.Type.ARRAY);
            if (usingDefault)
            {
                position.Add(0f);
                position.Add(0f);
                position.Add(0f);
            }
            else
            {
                position.Add(this.transform.localPosition.x * -1f);
                position.Add(this.transform.localPosition.y);
                position.Add(this.transform.localPosition.z);
            }

            // 旋转信息
            JSONObject rotation = new JSONObject(JSONObject.Type.ARRAY);
            if (usingDefault)
            {
                rotation.Add(0f);
                rotation.Add(0f);
                rotation.Add(0f);
                rotation.Add(1f);
            }
            else
            {
                rotation.Add(this.transform.localRotation.x * -1f);
                rotation.Add(this.transform.localRotation.y);
                rotation.Add(this.transform.localRotation.z);
                rotation.Add(this.transform.localRotation.w * -1f);
            }

            // 缩放信息
            JSONObject scale = new JSONObject(JSONObject.Type.ARRAY);
            if (usingDefault)
            {
                scale.Add(1f);
                scale.Add(1f);
                scale.Add(1f);
            }
            else
            {
                scale.Add(this.transform.localScale.x);
                scale.Add(this.transform.localScale.y);
                scale.Add(this.transform.localScale.z);
            }

            json.AddField("type", this.getTypeName());
            json.AddField("data", data);
            data.AddField("position", position);
            data.AddField("rotation", rotation);
            data.AddField("scale", scale);

            return json;
        }
    }

    // WXBeefBallComponentExporter.TypeStruct data = new WXBeefBallComponentExporter.TypeStruct();
    // data.componentType = typeof(Transform);
    // data.exporterType = typeof(WXBBTransform3DComponent);
    // WXBeefBallComponentExporter.typeMap.Add()
}
