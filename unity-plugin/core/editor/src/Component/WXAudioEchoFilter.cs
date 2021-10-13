using System;
using UnityEngine;

namespace WeChat
{
  class WXAudioEchoFilter : WXComponent
  {
    private AudioEchoFilter audioEchoFilter;
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
      return "AudioEcho";
    }

    public WXAudioEchoFilter(AudioEchoFilter audioEchoFilter, GameObject gameObject)
    {
      this.gameObject = gameObject;
      this.audioEchoFilter = audioEchoFilter;
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
      effectNodeData.AddField("__typeName", "AudioEchoNode");
      effectNodeData.AddField("decay", audioEchoFilter.decayRatio);
      effectNodeData.AddField("delay", audioEchoFilter.delay);
      effectNodeData.AddField("dryMix", audioEchoFilter.dryMix);
      effectNodeData.AddField("wetMix", audioEchoFilter.wetMix);

      return json;
    }
  }
}