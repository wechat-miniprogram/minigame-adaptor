using System;
using UnityEngine;

namespace WeChat
{
  class WXAudioLowPassFilter : WXComponent
  {
    private AudioLowPassFilter audioLowPassFilter;
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
      return "AudioLowPassFilter";
    }

    public WXAudioLowPassFilter(AudioLowPassFilter audioLowPassFilter, GameObject gameObject)
    {
      this.gameObject = gameObject;
      this.audioLowPassFilter = audioLowPassFilter;
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
      effectNodeData.AddField("frequency", audioLowPassFilter.cutoffFrequency);
      effectNodeData.AddField("Q", audioLowPassFilter.lowpassResonanceQ);
      effectNodeData.AddField("__typeName", "AudioLowPassFilterNode");

      return json;
    }
  }
}