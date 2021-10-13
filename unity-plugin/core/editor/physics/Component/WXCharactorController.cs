using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

namespace WeChat
{

  public class WXCharactorController : WXComponent
  {
    private float slopeLimit;
    private float stepOffset;
    private float skinWidth;
    private float minMoveDistance;
    private Vector3 center;
    private float radius;
    private float height;


    public override string getTypeName()
    {
      return "CharacterController";
    }

    public WXCharactorController(float slopeLimit, float stepOffset, float skinWidth, float minMoveDistane, Vector3 center, float radius, float height)
    {
      this.slopeLimit = slopeLimit;
      this.stepOffset = stepOffset;
      this.skinWidth = skinWidth;
      this.minMoveDistance = minMoveDistane;
      this.center = center;
      this.radius = radius;
      this.height = height;

    }

    protected override JSONObject ToJSON(WXHierarchyContext context)
    {
      JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
      json.AddField("type", getTypeName());
      json.AddField("data", data);
      data.AddField("active", true);

      {
        data.AddField("slopeLimit", this.slopeLimit);
        data.AddField("stepOffet", this.stepOffset);
        data.AddField("skinWidth", this.skinWidth);
        data.AddField("minMoveDistane", this.minMoveDistance);

        JSONObject center = new JSONObject(JSONObject.Type.ARRAY);
        center.Add(-this.center.x);
        center.Add(this.center.y);
        center.Add(this.center.z);
        data.AddField("center", center);
        
        data.AddField("radius", this.radius);
        data.AddField("height", this.height);
      }

      return json;
    }
  }
}

