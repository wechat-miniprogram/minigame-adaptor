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

    public class WXCamera : WXComponent
    {
        private Camera camera;

        public enum CameraProjectionType
        {
            Perspective = 0,
            Orthographic = 1
        }

        public override string getTypeName()
        {
            return "Camera";
        }

        public WXCamera(Camera camera)
        {
            this.camera = camera;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", getTypeName());
            json.AddField("data", data);
            if (camera != null)
            {
                data.AddField("cullingMask", camera.cullingMask);
                data.AddField("depth", camera.depth);
                if (camera.orthographic) // 正交
                {
                    data.AddField("projectionType", 1);
                    data.AddField("orthographicSize", camera.orthographicSize);
                }
                else // 透视
                {
                    data.AddField("projectionType", 0);
                    data.AddField("fieldOfView", camera.fieldOfView);
                }
                data.AddField("aspect", camera.aspect);
                data.AddField("nearClipPlane", camera.nearClipPlane);
                data.AddField("farClipPlane", camera.farClipPlane);
                RenderTexture targetTexture = camera.targetTexture;
                if (targetTexture != null)
                {
                    Debug.LogError("WX Tool targetTexture didn`t null ,now don`t support");
                }
            }

            return json;
        }
    }
}
