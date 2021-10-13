using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using UnityEditor;
using UnityEngine;
using UnityEngine.Playables;
using UnityEngine.Timeline;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{

  class WXPlayableDirector : WXComponent
  {
    public static Dictionary<DirectorUpdateMode, int> UpdateMode = new Dictionary<DirectorUpdateMode, int>
    {
        {DirectorUpdateMode.DSPClock,0 },
        {DirectorUpdateMode.GameTime,1 },
        {DirectorUpdateMode.UnscaledGameTime,2 },
        {DirectorUpdateMode.Manual,3 }
    };
    public static Dictionary<DirectorWrapMode, int> WrapMode = new Dictionary<DirectorWrapMode, int>
    {
        {DirectorWrapMode.Hold,0 },
        {DirectorWrapMode.Loop,1 },
        {DirectorWrapMode.None,2 }
    };

    private PlayableDirector playableDirector;
    private GameObject gameObject;
    private bool curNodeHasLegalChild = false;
    private JSONObject dependencies = new JSONObject(JSONObject.Type.ARRAY);

    public override string getTypeName()
    {
      return "PlayableDirector";
    }

    public WXPlayableDirector(PlayableDirector playableDirector, GameObject gameObject)
    {
      this.gameObject = gameObject;
      this.playableDirector = playableDirector;
    }

    protected override JSONObject ToJSON(WXHierarchyContext context)
    {
      JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject bindingsArr = new JSONObject (JSONObject.Type.OBJECT);
      json.AddField("type", getTypeName());
      json.AddField("data", data);
      int timeUpdateMode;
      UpdateMode.TryGetValue(playableDirector.timeUpdateMode, out timeUpdateMode);
      data.AddField("timeUpdateMode", timeUpdateMode);
      data.AddField("playOnAwake", playableDirector.playOnAwake); // 貌似unity怎么搞playOnAwake都是false
      int wrapMode;
      WrapMode.TryGetValue(playableDirector.extrapolationMode, out wrapMode);
      data.AddField("wrapMode", wrapMode);
      data.AddField("initialTime", (float)playableDirector.initialTime);
      data.AddField("duration", (float)playableDirector.duration);
      data.AddField("sceneBindings", bindingsArr);

      TimelineAsset timelineAsset = (TimelineAsset)playableDirector.playableAsset;
      if ((UnityEngine.Object)timelineAsset != (UnityEngine.Object)null && timelineAsset.outputTrackCount > 0) // 有output
      {
        WXTimelineAssets converter = new WXTimelineAssets(timelineAsset, gameObject);
        string timelineAssetPath = converter.Export(context.preset);
        if (timelineAssetPath != null && timelineAssetPath != "")
        {
          data.AddField("playableAsset", timelineAssetPath);
          context.AddResource(timelineAssetPath);
          string playableAssetPath = AssetDatabase.GetAssetPath(timelineAsset); // timeline资源路径
          IEnumerator<PlayableBinding> outputsEnumerator = timelineAsset.outputs.GetEnumerator();
          List<TrackAsset> outputTracks = timelineAsset.GetOutputTracks().ToList();;
          int num = 0;
          while(outputsEnumerator.MoveNext()) // 遍历bindings
          {
            JSONObject bindingData = new JSONObject (JSONObject.Type.OBJECT);
            PlayableBinding binding = (PlayableBinding)outputsEnumerator.Current;
            var sourceObject = playableDirector.GetGenericBinding(binding.sourceObject); // 获取binding里sourceobject对应的entity
            string componentId = "";
            string localId = WXTimelineAssets.GetTrackLocalIdByInstanceID(playableAssetPath, outputTracks[num].GetInstanceID());
            if ((UnityEngine.Object)sourceObject != (UnityEngine.Object)null) {
              if (binding.sourceObject.GetType() == typeof(ActivationTrack)) { // active track绑定的是entity
                Transform transform = (sourceObject as GameObject).GetComponent(typeof(Transform)) as Transform;
                componentId = context.AddComponentInProperty(
                  new WXTransform3DComponent(transform),
                  transform
                );
              } else if (binding.sourceObject.GetType() == typeof(AudioTrack)) { // audio track 绑定AudioSource
                componentId = context.AddComponentInProperty(
                  new WXAudioSource((AudioSource)sourceObject, (GameObject)(sourceObject as AudioSource).gameObject),
                  (AudioSource)sourceObject
                );
              } else if (binding.sourceObject.GetType() == typeof(AnimationTrack)) { // animation track 绑定Animator
                Animator animator;
                if (sourceObject.GetType() == typeof(Animator)) {
                  animator = sourceObject as Animator;
                  componentId = context.AddComponentInProperty(
                    new WXAnimator(animator, (sourceObject as Animator).gameObject),
                    animator
                  );
                } else {
                  animator = (sourceObject as GameObject).GetComponent<Animator>();
                  componentId = context.AddComponentInProperty(
                    new WXAnimator(animator, (GameObject)sourceObject),
                    animator
                  );
                }
                
              } else {
                EditorUtility.DisplayDialog("Error", "导出的Playable Director Bingdings格式不支持", "确定");
                componentId = "";
              }
            } else {
              componentId = "";
            }
            if (string.IsNullOrEmpty(componentId)) {
              bindingsArr.AddField(localId, JSONObject.nullJO);
            } else {
              bindingsArr.AddField(localId, componentId);
            }
            
            num++;
          }
        }
      } else {
        data.AddField("playableAsset", JSONObject.nullJO);
      }
      return json;
    }
  }
}
