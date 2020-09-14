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

  public class WXLight : WXComponent
  {

    public override string getTypeName()
    {
      return "Light";
    }

    private Light light;
    public WXLight(Light _light)
    {
      this.light = _light;
    }

    protected override JSONObject ToJSON(WXHierarchyContext context)
    {
      JSONObject json = new JSONObject(JSONObject.Type.OBJECT);


      if ((UnityEngine.Object)light != (UnityEngine.Object)null)
        {


            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject jSONObject = new JSONObject(JSONObject.Type.ARRAY);
            Color color = light.color;
            jSONObject.Add(color.r);
            jSONObject.Add(color.g);
            jSONObject.Add(color.b);
            data.AddField("color", jSONObject);
            data.AddField("intensity", light.intensity);
            if (light.type == LightType.Directional) {
                json.AddField("type", "DirectionalLight");
                data.AddField("shadowBias", light.shadowBias);
                data.AddField("shadowNormalBias", light.shadowNormalBias);
                data.AddField("shadowStrength", light.shadowStrength);
                data.AddField("shadowNearPlane", light.shadowNearPlane);
                data.AddField("shadowNearPlane", light.shadowNearPlane);
                // cookie�ݲ�֧��
                // data.AddField("cookieSize", light.cookieSize);
                // data.AddField("cookie", light.cookie);
            } else if (light.type == LightType.Point) {
                json.AddField("type", "PointLight");
                data.AddField("range", light.range);
            } else if (light.type == LightType.Spot) {
                json.AddField("type", "SpotLight");
                data.AddField("range", light.range);
                data.AddField("spotAngle", light.spotAngle);
            }


            json.AddField("data", data);
        }

        return json;
    }
  }
}