using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;
using System.Runtime.CompilerServices;


[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{
  class WXAudioSource : WXComponent
  {
    public static Dictionary<AudioRolloffMode, string> AudioRolloffModeMap = new Dictionary<AudioRolloffMode, string>
    {
      {AudioRolloffMode.Logarithmic,"exponential" },
      {AudioRolloffMode.Linear,"linear" },
      {AudioRolloffMode.Custom,"linear" }
    };
    private AudioSource audioSource;
    private GameObject gameObject;

    public override string getTypeName()
    {
      return "AudioSource";
    }

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

    public WXAudioSource(AudioSource audioSource, GameObject gameObject)
    {
      this.gameObject = gameObject;
      this.audioSource = audioSource;
    }

    protected override JSONObject ToJSON(WXHierarchyContext context)
    {
      JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject effectNodeData = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject pannerNodeData = new JSONObject(JSONObject.Type.OBJECT);
      data.AddField("effectNodeData", effectNodeData);
      data.AddField("pannerNodeData", pannerNodeData);
      json.AddField("type", getTypeName());
      json.AddField("data", data);
      
      if ((UnityEngine.Object)audioSource.clip != (UnityEngine.Object)null)
      {
        WXAudioClip converter = new WXAudioClip(audioSource.clip, gameObject);
        string audioClipPath = converter.Export(context.preset);
        if (audioClipPath != null && audioClipPath != "")
        {
          data.AddField("clip", audioClipPath);
          effectNodeData.AddField("clip", audioClipPath);
          context.AddResource(audioClipPath);
        }
      } else {
        data.AddField("clip", JSONObject.nullJO);
        effectNodeData.AddField("clip", JSONObject.nullJO);
      }
      string outputAudioMixerGroup = "";
      if ((UnityEngine.Object)audioSource.outputAudioMixerGroup != (UnityEngine.Object)null) {
        EditorUtility.DisplayDialog("Error", "暂不支持导出Audio Mixer Group", "确定");
      }
      if (string.IsNullOrEmpty(outputAudioMixerGroup)) {
        data.AddField("output", JSONObject.nullJO);
      } else {
        data.AddField("output", outputAudioMixerGroup);
      }
      // audiosource本身的字段
      data.AddField("audioPriority", (uint)audioSource.priority);
      data.AddField("playOnAwake", audioSource.playOnAwake);
      data.AddField("bypassEffects", audioSource.bypassEffects);
      data.AddField("bypassListenerEffects", audioSource.bypassListenerEffects);
      data.AddField("bypassReverbZones", audioSource.bypassReverbZones);
      data.AddField("reverbZoneMix", (float)audioSource.reverbZoneMix);

      // audiosourceNode字段
      effectNodeData.AddField("id", this._genId());
      effectNodeData.AddField("mute", audioSource.mute);
      effectNodeData.AddField("loop", audioSource.loop);
      effectNodeData.AddField("volume", (float)audioSource.volume);
      effectNodeData.AddField("pitch", (float)audioSource.pitch);
      effectNodeData.AddField("__typeName", "AudioSourceNode");

      // pannerNode字段
      pannerNodeData.AddField("id", this._genId());
      pannerNodeData.AddField("stereoPan", (float)audioSource.panStereo);
      pannerNodeData.AddField("spatialBlend", (float)audioSource.spatialBlend);
      string rolloffMode;
      AudioRolloffModeMap.TryGetValue(audioSource.rolloffMode, out rolloffMode);
      pannerNodeData.AddField("distanceModel", rolloffMode);
      pannerNodeData.AddField("maxDistance", audioSource.maxDistance);
      pannerNodeData.AddField("minDistance", audioSource.minDistance);
      effectNodeData.AddField("__typeName", "AudioPannerNode");

      return json;
    }
  }
}