using System;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Timeline;
using UnityEngine.Playables;
using UnityEngine.SceneManagement;
using System.Reflection;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{

  class WXTimelineAssets : WXResource
  {
    public static string GetTrackLocalIdByInstanceID(string path, int id)
    {
      return WXUtility.GetMD5FromString(path + "_" + id);
    }
    
    public static Dictionary<ClipCaps, int> ClipCapsMap = new Dictionary<ClipCaps, int>
    {
      {ClipCaps.All,~0 },
      {ClipCaps.Blending,1 << 4 },
      {ClipCaps.ClipIn,1 << 2 },
      {ClipCaps.Extrapolation,1 << 1 },
      {ClipCaps.Looping,1 << 0 },
      {ClipCaps.None,0 },
      {ClipCaps.SpeedMultiplier,1 << 3 },
    };

#if UNITY_2018_3_OR_NEWER
    public static Dictionary<TrackOffset, int> TrackOffsetMap = new Dictionary<TrackOffset, int>
    {
      {TrackOffset.ApplySceneOffsets,0 },
      {TrackOffset.ApplyTransformOffsets,1 },
      {TrackOffset.Auto,2 },
    };
#else
    public static Dictionary<string, int> TrackOffsetMap = new Dictionary<string, int>
    {
      {"ApplySceneOffsets",0 },
      {"ApplyTransformOffsets",1 },
      {"Auto",2 },
    };
#endif


#if UNITY_2019_1_OR_NEWER
    public static Dictionary<TimelineClip.BlendCurveMode, int> TimelineClipBlendInCurveMap = new Dictionary<TimelineClip.BlendCurveMode, int>
    {
      {TimelineClip.BlendCurveMode.Auto,0 },
      {TimelineClip.BlendCurveMode.Manual,1 },
    };
    public static Dictionary<AnimationPlayableAsset.LoopMode, int> LoopModeMap = new Dictionary<AnimationPlayableAsset.LoopMode, int>
    {
      {AnimationPlayableAsset.LoopMode.UseSourceAsset,0 },
      {AnimationPlayableAsset.LoopMode.Off,1 },
      {AnimationPlayableAsset.LoopMode.On,2 },
    };
#else
    public static Dictionary<string, int> TimelineClipBlendInCurveMap = new Dictionary<string, int>
    {
      {"Auto",0 },
      {"Manual",1 },
    };
    public static Dictionary<string, int> LoopModeMap = new Dictionary<string, int>
    {
      {"UseSourceAsset",0 },
      {"Off",1 },
      {"On",2 },
    };
#endif
    public static Dictionary<TimelineClip.ClipExtrapolation, int> ClipExtrapolationMap = new Dictionary<TimelineClip.ClipExtrapolation, int>
    {
      {TimelineClip.ClipExtrapolation.None,0 },
      {TimelineClip.ClipExtrapolation.Hold,1 },
      {TimelineClip.ClipExtrapolation.Loop,2 },
      {TimelineClip.ClipExtrapolation.PingPong,3 },
      {TimelineClip.ClipExtrapolation.Continue,4 },
    };

    public static Dictionary<ActivationTrack.PostPlaybackState, int> PostPlaybackStateMap = new Dictionary<ActivationTrack.PostPlaybackState, int>
    {
      {ActivationTrack.PostPlaybackState.Active,0 },
      {ActivationTrack.PostPlaybackState.Inactive,1 },
      {ActivationTrack.PostPlaybackState.LeaveAsIs,2 },
      {ActivationTrack.PostPlaybackState.Revert,3 },
    };
    public static Dictionary<TimelineAsset.DurationMode, int> DurationModeMap = new Dictionary<TimelineAsset.DurationMode, int>
    {
      {TimelineAsset.DurationMode.BasedOnClips,0 },
      {TimelineAsset.DurationMode.FixedLength,1 },
    };
    public static Dictionary<string, int> PlaybaleTrackTypeMap = new Dictionary<string, int>
    {
      {"ActivationTrack",0 },
      {"AnimationTrack",1 },
      {"AudioTrack",2 },
      {"ControlTrack",3 },
      {"CustomTrack",4 },
      {"GroupTrack",5 },
    };
    public static Dictionary<string, int> PlaybaleClipTypeMap = new Dictionary<string, int>
    {
      {"Activation",0 },
      {"Animation",1 },
      {"Audio",2 },
      {"Control",3 },
      {"Custom",4 },
    };

    private TimelineAsset timelineAsset;
    private GameObject gameObject;

    protected override string GetResourceType()
    {
      return "playable";
    }

    public override string GetHash()
    {
      return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(timelineAsset.name); ;
    }

    public WXTimelineAssets(TimelineAsset _timelineAsset, GameObject _gameObject) : base(AssetDatabase.GetAssetPath(_timelineAsset.GetInstanceID()))
    {
      timelineAsset = _timelineAsset;
      gameObject = _gameObject;
      if (unityAssetPath == null || unityAssetPath == "")
      {
        ErrorUtil.ExportErrorReporter.create()
        .setResource(this)
        .setGameObject(_gameObject)
        .error(ErrorUtil.ErrorCode.Timeline_PathError, "timeline文件的unity路径为空");
      }
    }

    // 导出后资源文件路径
    public override string GetExportPath()
    {
      int index = unityAssetPath.LastIndexOf('.');
      string filename = index == -1 ? unityAssetPath : unityAssetPath.Substring(0, index);
      return wxFileUtil.cleanIllegalChar(filename, false) + "." + GetResourceType();
    }

    // 导出资源
    protected override JSONObject ExportResource(ExportPreset preset)
    {
      JSONObject timelineJSON = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject root = new JSONObject(JSONObject.Type.OBJECT);
      JSONObject rootTrackIndexArr = new JSONObject (JSONObject.Type.ARRAY);
      JSONObject trackListArr = new JSONObject (JSONObject.Type.ARRAY);
      JSONObject clipListArr = new JSONObject(JSONObject.Type.ARRAY);
      timelineJSON.AddField("root", root);
      timelineJSON.AddField("trackList", trackListArr);
      timelineJSON.AddField("clipList", clipListArr);
      
      
      root.AddField("name", timelineAsset.name);
      root.AddField("fixedDuration", (float)timelineAsset.fixedDuration);
      int durationMode;
      DurationModeMap.TryGetValue(timelineAsset.durationMode, out durationMode);
      root.AddField("durationMode", durationMode);
      root.AddField("frameRate", timelineAsset.editorSettings.fps);
      root.AddField("tracks", rootTrackIndexArr);
      ExportRootTrack(rootTrackIndexArr, trackListArr, clipListArr); // 导出rootTrack

      return timelineJSON;
    }

    // 导出rootTrack
    private void ExportRootTrack(JSONObject rootTrackIndexArr, JSONObject trackListArr, JSONObject clipListArr) {
      IEnumerable<TrackAsset> trackAssetList = timelineAsset.GetRootTracks();
      List<int> indexList = ExportTrackList(trackAssetList, trackListArr, clipListArr);
      foreach (int index in indexList)
      {
        rootTrackIndexArr.Add(index);
      }
    }


    private List<int> ExportTrackList(IEnumerable<TrackAsset> trackAssetList, JSONObject trackListArr, JSONObject clipListArr) {
      List<int> indexList = new List<int>();
      int num = 0;
      foreach (var trackAsset in trackAssetList)
      {
        int trackIndex = -1;
        if (trackAsset.GetType() == typeof(GroupTrack)) // GroupTrack
        {
          trackIndex = ExportGroupTrack((GroupTrack)trackAsset, trackListArr, clipListArr);
        }
        else if (trackAsset.GetType() == typeof(ActivationTrack))
        { // ActivationTrack
          trackIndex = ExportActivationTrack((ActivationTrack)trackAsset, trackListArr, clipListArr);
        }
        else if (trackAsset.GetType() == typeof(AnimationTrack))
        { // AnimationTrack
          trackIndex = ExportAnimationTrack((AnimationTrack)trackAsset, trackListArr, clipListArr);
        }
        else if (trackAsset.GetType() == typeof(AudioTrack))
        { // AudioTrack
          trackIndex = ExportAudioTrack((AudioTrack)trackAsset, trackListArr, clipListArr);
        }
        if (trackIndex >= 0) {
          indexList.Add(trackIndex);
        }
        num++;
      }
      return indexList;
    }


    // 生成track公共信息
    private JSONObject GenerateBaseTrack(TrackAsset trackAsset, int type) {
      JSONObject trackJSON = new JSONObject(JSONObject.Type.OBJECT);
      trackJSON.AddField("name", trackAsset.name);
      trackJSON.AddField("type", type);
      
      // 兼容2017没有locked
      UnityEditor.SerializedObject serializedObject = new UnityEditor.SerializedObject(trackAsset);
      bool locked = serializedObject.FindProperty("m_Locked").boolValue;
      trackJSON.AddField("locked", locked);

      trackJSON.AddField("muted", trackAsset.muted);
      trackJSON.AddField("children", new JSONObject(JSONObject.Type.ARRAY));
      trackJSON.AddField("clips", new JSONObject(JSONObject.Type.ARRAY));
      trackJSON.AddField("infinityClip", JSONObject.nullJO);
      trackJSON.AddField("trackLocalId", GetTrackLocalIdByInstanceID(unityAssetPath, trackAsset.GetInstanceID()));
      return trackJSON;
    }

    // 导出track
    private int ExportTrack(JSONObject trackJSON, JSONObject trackListArr)
    {
      int index = trackListArr.Count;
      trackListArr.Add(trackJSON);
      return index;
    }

    // 生成timelineClip公共信息
    private JSONObject GenerateBaseTimelineClip(TimelineClip timelineClip, int type)
    {
      JSONObject clipJSON = new JSONObject(JSONObject.Type.OBJECT);
      clipJSON.AddField("name", timelineClip.displayName);
      clipJSON.AddField("start", (float)timelineClip.start);
      clipJSON.AddField("duration", (float)timelineClip.duration);
      clipJSON.AddField("blendInDuration", timelineClip.blendInDuration > 0 ? (float)(timelineClip.blendInDuration) : 0);
      clipJSON.AddField("blendOutDuration", timelineClip.blendOutDuration > 0 ? (float)(timelineClip.blendOutDuration) : 0);
      clipJSON.AddField("clipIn", (float)timelineClip.clipIn);
      clipJSON.AddField("timeScale", (float)timelineClip.timeScale);

      JSONObject mixInCurve = new JSONObject(JSONObject.Type.ARRAY);
      foreach (Keyframe item in timelineClip.mixInCurve.keys)
      { 

        JSONObject itemJSON = new JSONObject(JSONObject.Type.OBJECT);
        itemJSON.AddField("time", item.time);
        itemJSON.AddField("value", item.value);
        itemJSON.AddField("inTangent", item.inTangent);
        itemJSON.AddField("outTangent", item.outTangent);
        mixInCurve.Add(itemJSON);
      }
      clipJSON.AddField("mixInCurve", mixInCurve);

      JSONObject mixOutCurve = new JSONObject(JSONObject.Type.ARRAY);
      foreach (Keyframe item in timelineClip.mixOutCurve.keys)
      { 
        JSONObject itemJSON = new JSONObject(JSONObject.Type.OBJECT);
        itemJSON.AddField("time", item.time);
        itemJSON.AddField("value", item.value);
        itemJSON.AddField("inTangent", item.inTangent);
        itemJSON.AddField("outTangent", item.outTangent);
        mixOutCurve.Add(itemJSON);
      }
      clipJSON.AddField("mixOutCurve", mixOutCurve);
#if UNITY_2019_1_OR_NEWER
      clipJSON.AddField("mixInCurveMode", TimelineClipBlendInCurveMap[timelineClip.blendInCurveMode]);
      clipJSON.AddField("mixOutCurveMode", TimelineClipBlendInCurveMap[timelineClip.blendOutCurveMode]);
#else
      clipJSON.AddField("mixInCurveMode", TimelineClipBlendInCurveMap["Auto"]);
      clipJSON.AddField("mixOutCurveMode", TimelineClipBlendInCurveMap["Auto"]);
#endif
      clipJSON.AddField("postExtrapolationMode", ClipExtrapolationMap[timelineClip.postExtrapolationMode]);
      clipJSON.AddField("preExtrapolationMode", ClipExtrapolationMap[timelineClip.preExtrapolationMode]);
      clipJSON.AddField("postExtrapolationTime", 0);
      clipJSON.AddField("preExtrapolationTime", 0);
      clipJSON.AddField("type", type);
      return clipJSON;
    }

    // 导出timelineClip
    private int ExportTimelineClip(JSONObject clipJSON, JSONObject clipListArr)
    {
      int index = clipListArr.Count;
      clipListArr.Add(clipJSON);
      return index;
    }

    // 导出ExportGroupTrack
    private int ExportGroupTrack(GroupTrack groupTrack, JSONObject trackListArr, JSONObject clipListArr)
    {
      JSONObject trackJSON = GenerateBaseTrack(groupTrack, PlaybaleTrackTypeMap["GroupTrack"]);
      JSONObject childrenJSON = trackJSON.GetField("children");
      IEnumerable<TrackAsset> trackAssetList = groupTrack.GetChildTracks();
      List<int> indexList = ExportTrackList(trackAssetList, trackListArr, clipListArr);
      foreach (int index in indexList)
      {
        childrenJSON.Add(index);
      }
      return ExportTrack(trackJSON, trackListArr);
    }

    // 导出ActivationTrack
    private int ExportActivationTrack(ActivationTrack activationTrack, JSONObject trackListArr, JSONObject clipListArr) {
      JSONObject trackJSON = GenerateBaseTrack(activationTrack, PlaybaleTrackTypeMap["ActivationTrack"]);
      trackJSON.AddField("postPlaybackState", PostPlaybackStateMap[activationTrack.postPlaybackState]);
      JSONObject clipsIndexArr = trackJSON.GetField("clips");
      IEnumerable<TimelineClip> timelineClipList = activationTrack.GetClips();
      int num = 0;
      foreach (TimelineClip timelineClip in timelineClipList)
      {
        JSONObject clipJSON = GenerateBaseTimelineClip(timelineClip, PlaybaleClipTypeMap["Activation"]);
        clipsIndexArr.Add(ExportTimelineClip(clipJSON, clipListArr));
      }
      return ExportTrack(trackJSON, trackListArr);
    }

    // 导出AnimationTrack
    private int ExportAnimationTrack(AnimationTrack animationTrack, JSONObject trackListArr, JSONObject clipListArr)
    {
      JSONObject trackJSON = GenerateBaseTrack(animationTrack, PlaybaleTrackTypeMap["AnimationTrack"]);
      trackJSON.AddField("applyAvatarMask", animationTrack.applyAvatarMask);
      JSONObject infiniteClipOffsetPositionArr = new JSONObject(JSONObject.Type.ARRAY);
      JSONObject infiniteClipOffsetRotationArr = new JSONObject(JSONObject.Type.ARRAY);
      trackJSON.AddField("infiniteClipOffsetPosition", infiniteClipOffsetPositionArr);
      trackJSON.AddField("infiniteClipOffsetRotation", infiniteClipOffsetRotationArr);
#if UNITY_2018_3_OR_NEWER
      trackJSON.AddField("trackOffset", TrackOffsetMap[animationTrack.trackOffset]);
#else
      if (animationTrack.applyOffsets) {
        trackJSON.AddField("trackOffset", TrackOffsetMap["ApplyTransformOffsets"]);
      } else {
        trackJSON.AddField("trackOffset", TrackOffsetMap["Auto"]);
      }
#endif
#if UNITY_2019_1_OR_NEWER
      infiniteClipOffsetPositionArr.Add(-animationTrack.infiniteClipOffsetPosition.x);
      infiniteClipOffsetPositionArr.Add(animationTrack.infiniteClipOffsetPosition.y);
      infiniteClipOffsetPositionArr.Add(animationTrack.infiniteClipOffsetPosition.z);
      infiniteClipOffsetRotationArr.Add(-animationTrack.infiniteClipOffsetRotation.x);
      infiniteClipOffsetRotationArr.Add(animationTrack.infiniteClipOffsetRotation.y);
      infiniteClipOffsetRotationArr.Add(animationTrack.infiniteClipOffsetRotation.z);
      infiniteClipOffsetRotationArr.Add(-animationTrack.infiniteClipOffsetRotation.w);
#else
      infiniteClipOffsetPositionArr.Add(-animationTrack.openClipOffsetPosition.x);
      infiniteClipOffsetPositionArr.Add(animationTrack.openClipOffsetPosition.y);
      infiniteClipOffsetPositionArr.Add(animationTrack.openClipOffsetPosition.z);
      infiniteClipOffsetRotationArr.Add(-animationTrack.openClipOffsetRotation.x);
      infiniteClipOffsetRotationArr.Add(animationTrack.openClipOffsetRotation.y);
      infiniteClipOffsetRotationArr.Add(animationTrack.openClipOffsetRotation.z);
      infiniteClipOffsetRotationArr.Add(-animationTrack.openClipOffsetRotation.w);
#endif
      if (animationTrack.avatarMask != null)
      {
        WXAvatarMask mask = new WXAvatarMask(animationTrack.avatarMask);
        string uid = AddDependencies(mask);
        trackJSON.AddField("avatarMask", uid);
      }
      else
      {
        trackJSON.AddField("avatarMask", new JSONObject(JSONObject.Type.NULL));
      }

      JSONObject positionArr = new JSONObject(JSONObject.Type.ARRAY);
      positionArr.Add(-animationTrack.position.x);
      positionArr.Add(animationTrack.position.y);
      positionArr.Add(animationTrack.position.z);
      trackJSON.AddField("position", positionArr);

      JSONObject rotationArr = new JSONObject(JSONObject.Type.ARRAY);
      rotationArr.Add(-animationTrack.rotation.x);
      rotationArr.Add(animationTrack.rotation.y);
      rotationArr.Add(animationTrack.rotation.z);
      rotationArr.Add(-animationTrack.rotation.w);
      trackJSON.AddField("rotation", rotationArr);
      
      JSONObject matchTargetFieldsJSON = new JSONObject(JSONObject.Type.OBJECT);
      trackJSON.AddField("matchTargetFields", matchTargetFieldsJSON);
      matchTargetFieldsJSON.AddField("PositionX", (animationTrack.matchTargetFields & MatchTargetFields.PositionX)==MatchTargetFields.PositionX);
      matchTargetFieldsJSON.AddField("PositionY", (animationTrack.matchTargetFields & MatchTargetFields.PositionY)==MatchTargetFields.PositionY);
      matchTargetFieldsJSON.AddField("PositionZ", (animationTrack.matchTargetFields & MatchTargetFields.PositionZ)==MatchTargetFields.PositionZ);
      matchTargetFieldsJSON.AddField("RotationX", (animationTrack.matchTargetFields & MatchTargetFields.RotationX)==MatchTargetFields.RotationX);
      matchTargetFieldsJSON.AddField("RotationY", (animationTrack.matchTargetFields & MatchTargetFields.RotationY)==MatchTargetFields.RotationY);
      matchTargetFieldsJSON.AddField("RotationZ", (animationTrack.matchTargetFields & MatchTargetFields.RotationZ)==MatchTargetFields.RotationZ);
      
      UnityEditor.SerializedObject serializedObject = new UnityEditor.SerializedObject(animationTrack);
      UnityEditor.SerializedProperty serializedClip = serializedObject.FindProperty("m_Clips");
      
      JSONObject clipsIndexArr = trackJSON.GetField("clips");
      if (animationTrack.inClipMode) { // 普通clip
        // 貌似有时候序列化的m_Clips顺序跟 timelineClipList 的顺序对不上，但是很难复现。没有找到顺序可以必定对上的方法，先这样吧
        IEnumerable<TimelineClip> timelineClipList = animationTrack.GetClips();
        int num = 0;
        foreach (TimelineClip timelineClip in timelineClipList)
        {
          JSONObject clipJSON = GenerateBaseTimelineClip(timelineClip, PlaybaleClipTypeMap["Animation"]);
          JSONObject clipData = new JSONObject(JSONObject.Type.OBJECT);
          float m_PostExtrapolationTime = (float)serializedClip.FindPropertyRelative("Array.data["+num+"].m_PostExtrapolationTime").doubleValue;
          float m_PreExtrapolationTime = (float)serializedClip.FindPropertyRelative("Array.data["+num+"].m_PreExtrapolationTime").doubleValue;
          clipJSON.SetField("postExtrapolationTime", m_PostExtrapolationTime);
          clipJSON.SetField("preExtrapolationTime", m_PreExtrapolationTime);
          clipJSON.AddField("data", clipData);

          bool m_Recordable = serializedClip.FindPropertyRelative("Array.data["+num+"].m_Recordable").boolValue;
          clipData.AddField("recordable", m_Recordable);

          string clipPath = ExportAnimationClip(timelineClip.animationClip);
          if (string.IsNullOrEmpty(clipPath)) {
            clipData.AddField("clip", JSONObject.nullJO);
          } else {
            clipData.AddField("clip", clipPath);
          }
          

          AnimationPlayableAsset asset = (AnimationPlayableAsset)timelineClip.asset;
          // clipData.AddField("clipCaps", ClipCapsMap.ContainsKey(timelineClip.clipCaps) ? ClipCapsMap[timelineClip.clipCaps] : ClipCapsMap[ClipCaps.None]);
          // clipData.AddField("duration", (float)asset.duration);
#if UNITY_2018_3_OR_NEWER
          // 2018_3才开始支持
          clipData.AddField("applyFootIK", asset.applyFootIK);
#else
          clipData.AddField("applyFootIK", false);
#endif

#if UNITY_2019_1_OR_NEWER
          // 2019_1才开始支持
          clipData.AddField("loop", LoopModeMap[asset.loop]);
#else
          clipData.AddField("loop", LoopModeMap["UseSourceAsset"]);
#endif

          clipData.AddField("useTrackMatchFields", asset.useTrackMatchFields);
          
          JSONObject clipMatchTargetFieldsJSON = new JSONObject(JSONObject.Type.OBJECT);
          clipData.AddField("matchTargetFields", clipMatchTargetFieldsJSON);
          clipMatchTargetFieldsJSON.AddField("PositionX", (asset.matchTargetFields & MatchTargetFields.PositionX)==MatchTargetFields.PositionX);
          clipMatchTargetFieldsJSON.AddField("PositionY", (asset.matchTargetFields & MatchTargetFields.PositionY)==MatchTargetFields.PositionY);
          clipMatchTargetFieldsJSON.AddField("PositionZ", (asset.matchTargetFields & MatchTargetFields.PositionZ)==MatchTargetFields.PositionZ);
          clipMatchTargetFieldsJSON.AddField("RotationX", (asset.matchTargetFields & MatchTargetFields.RotationX)==MatchTargetFields.RotationX);
          clipMatchTargetFieldsJSON.AddField("RotationY", (asset.matchTargetFields & MatchTargetFields.RotationY)==MatchTargetFields.RotationY);
          clipMatchTargetFieldsJSON.AddField("RotationZ", (asset.matchTargetFields & MatchTargetFields.RotationZ)==MatchTargetFields.RotationZ);

          JSONObject clipPositionArr = new JSONObject(JSONObject.Type.ARRAY);
          clipPositionArr.Add(-asset.position.x);
          clipPositionArr.Add(asset.position.y);
          clipPositionArr.Add(asset.position.z);
          clipData.AddField("position", clipPositionArr);

          JSONObject clipRotationArr = new JSONObject(JSONObject.Type.ARRAY);
          clipRotationArr.Add(-asset.rotation.x);
          clipRotationArr.Add(asset.rotation.y);
          clipRotationArr.Add(asset.rotation.z);
          clipRotationArr.Add(-asset.rotation.w);
          clipData.AddField("rotation", clipRotationArr);
          
          clipsIndexArr.Add(ExportTimelineClip(clipJSON, clipListArr));
          num++;
        }
      } else { // infiniteClip
#if UNITY_2019_1_OR_NEWER
          // 2019_1才开始支持
          AnimationClip infiniteClip = animationTrack.infiniteClip;
#else
          // 序列化取出私有变量
          UnityEditor.SerializedObject trackSerializedObject = new UnityEditor.SerializedObject(animationTrack);
          UnityEditor.SerializedProperty animClipSerialize = trackSerializedObject.FindProperty("m_AnimClip");
          AnimationClip infiniteClip = animClipSerialize.objectReferenceValue as AnimationClip;
#endif
          string infinityClipPath = ExportAnimationClip(infiniteClip);
          if (string.IsNullOrEmpty(infinityClipPath)) {
            trackJSON.SetField("infinityClip", JSONObject.nullJO);
          } else {
            trackJSON.SetField("infinityClip", infinityClipPath);
          }
          
      }
      // 导出子track
      JSONObject childrenJSON = trackJSON.GetField("children");
      IEnumerable<TrackAsset> childTrackAssetList = animationTrack.GetChildTracks();
      List<int> indexList = ExportTrackList(childTrackAssetList, trackListArr, clipListArr);
      foreach (int index in indexList)
      {
        childrenJSON.Add(index);
      }
      return ExportTrack(trackJSON, trackListArr);
    }

    // 导出ExportAudioTrack
    private int ExportAudioTrack(AudioTrack audioTrack, JSONObject trackListArr, JSONObject clipListArr)
    {
      JSONObject trackJSON = GenerateBaseTrack(audioTrack, PlaybaleTrackTypeMap["AudioTrack"]);
#if UNITY_2019_1_OR_NEWER
      UnityEditor.SerializedObject serializedObject = new UnityEditor.SerializedObject (audioTrack);
      UnityEditor.SerializedProperty propertiesserializedObject = serializedObject.FindProperty ("m_TrackProperties");
      float volume = propertiesserializedObject.FindPropertyRelative("volume").floatValue;
      float stereoPan = propertiesserializedObject.FindPropertyRelative("stereoPan").floatValue;
      float spatialBlend = propertiesserializedObject.FindPropertyRelative("spatialBlend").floatValue;
      trackJSON.AddField("volume", volume);
      trackJSON.AddField("stereoPan", stereoPan);
      trackJSON.AddField("spatialBlend", spatialBlend);
#else
      trackJSON.AddField("volume", 1);
      trackJSON.AddField("stereoPan", 0);
      trackJSON.AddField("spatialBlend", 0);
#endif

      JSONObject clipsIndexArr = trackJSON.GetField("clips");
      IEnumerable<TimelineClip> timelineClipList = audioTrack.GetClips();
      int num = 0;
      foreach (TimelineClip timelineClip in timelineClipList)
      {
        JSONObject clipJSON = GenerateBaseTimelineClip(timelineClip, PlaybaleClipTypeMap["Audio"]);
        JSONObject clipData = new JSONObject(JSONObject.Type.OBJECT);
        clipJSON.AddField("data", clipData);

        AudioPlayableAsset asset = (AudioPlayableAsset)timelineClip.asset;
        if ((UnityEngine.Object)asset.clip != (UnityEngine.Object)null)
        {
          WXAudioClip converter = new WXAudioClip(asset.clip, gameObject);
          string clipPath = AddDependencies(converter);
          clipData.AddField("clip", clipPath);
        } else {
          clipData.AddField("clip", JSONObject.nullJO);
        }
        // clipData.AddField("clipCaps", ClipCapsMap.ContainsKey(timelineClip.clipCaps) ? ClipCapsMap[timelineClip.clipCaps] : ClipCapsMap[ClipCaps.None]);
        // clipData.AddField("duration", (float)asset.duration);

        // 兼容2017没有loop
        UnityEditor.SerializedObject assetSerializedObject = new UnityEditor.SerializedObject(asset);
        bool loop = assetSerializedObject.FindProperty("m_Loop").boolValue;
        clipData.AddField("loop", loop);

#if UNITY_2019_1_OR_NEWER
        UnityEditor.SerializedProperty clipProperties = assetSerializedObject.FindProperty("m_ClipProperties");
        float clipVolume = clipProperties.FindPropertyRelative("volume").floatValue;
        clipData.AddField("volume", clipVolume);
#else
        clipData.AddField("volume", 1);
#endif

        clipsIndexArr.Add(ExportTimelineClip(clipJSON, clipListArr));
        num++;
      }
      return ExportTrack(trackJSON, trackListArr);
    }

    // 导出InfiniteClip或者recordable的animationClip
    private string ExportAnimationClip(AnimationClip animationClip) {
      string clipPath = "";
      if (animationClip != null) {
        WXAnimationClip clip = new WXAnimationClip(animationClip);
        clipPath = AddDependencies(clip);
      }
      return clipPath;
    }
  }
}
