using System;
using UnityEngine;

namespace WeChat
{
  class WXAudioDistortionFilter : WXComponent
  {
    private AudioDistortionFilter audioDistortionFilter;
    private GameObject gameObject;

    private string _genId() 
    {
      System.Random rd = new System.Random();
      string str = "";
      for (int i = 1; i < 29; i++)
      {
        str += rd.Next(0, 10);
      }
      return str;
    }
    public override string getTypeName()
    {
      return "AudioDistortion";
    }

    public WXAudioDistortionFilter(AudioDistortionFilter audioDistortionFilter, GameObject gameObject)
    {
      this.gameObject = gameObject;
      this.audioDistortionFilter = audioDistortionFilter;
    }

    protected override JSONObject ToJSON(WXHierarchyContext context)
    {
      JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject effectNodeData = new JSONObject(JSONObject.Type.OBJECT);
      json.AddField("type", getTypeName());
      json.AddField("data", data);
      data.AddField("effectNodeData", effectNodeData);
      effectNodeData.AddField("id", this._genId());
      effectNodeData.AddField("__typeName", "AudioDistortionNode");
      effectNodeData.AddField("level", audioDistortionFilter.distortionLevel);

      return json;
    }
  }
}