using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using System;
using System.Reflection;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleToAttribute("ScriptExport")]
namespace WeChat
{

  class WXAudioClip : WXRawResource
  {
    public static Dictionary<AudioClipLoadType, int> LoadTypeMap = new Dictionary<AudioClipLoadType, int>
    {
      {AudioClipLoadType.DecompressOnLoad,1 },
      {AudioClipLoadType.CompressedInMemory,0 },
      {AudioClipLoadType.Streaming,2 },
    };
    public static Dictionary<AudioCompressionFormat, int> CompressionFormatMap = new Dictionary<AudioCompressionFormat, int>
    {
      {AudioCompressionFormat.PCM,0 },
      {AudioCompressionFormat.Vorbis,1 },
      {AudioCompressionFormat.ADPCM,2 },
      {AudioCompressionFormat.MP3,3 },
      {AudioCompressionFormat.VAG,4 },
      {AudioCompressionFormat.HEVAG,5 },
      {AudioCompressionFormat.XMA,6 },
      {AudioCompressionFormat.AAC,7 },
      {AudioCompressionFormat.GCADPCM,8 },
      {AudioCompressionFormat.ATRAC9,9 },
    };
    public static Dictionary<AudioSampleRateSetting, int> SampleRateSettingMap = new Dictionary<AudioSampleRateSetting, int>
    {
      {AudioSampleRateSetting.PreserveSampleRate,0 },
      {AudioSampleRateSetting.OptimizeSampleRate,1 },
      {AudioSampleRateSetting.OverrideSampleRate,2 },
    };
    
    private AudioClip audioClip;
    private GameObject gameObject;

    protected override string GetResourceType()
    {
      return "audioclip";
    }

    public override string GetHash()
    {
      return WXUtility.GetMD5FromAssetPath(unityAssetPath) + WXUtility.GetMD5FromString(audioClip.name); ;
    }

    public WXAudioClip(AudioClip _audioClip, GameObject _gameObject) : base(AssetDatabase.GetAssetPath(_audioClip.GetInstanceID()))
    {
      audioClip = _audioClip;
      gameObject = _gameObject;
      if (unityAssetPath == null || unityAssetPath == "")
      {
        ErrorUtil.ExportErrorReporter.create()
        .setResource(this)
        .setGameObject(_gameObject)
        .error(ErrorUtil.ErrorCode.AudioClip_PathError, "audioClip文件的unity路径为空");
      }
    }

    public override string GetExportPath()
    {
      return unityAssetPath + "." + GetResourceType();
    }

    protected override JSONObject ExportResource(ExportPreset preset)
    {
      
      JSONObject audioClipJSON = base.ExportResource(preset);
      JSONObject dataJSON = audioClipJSON.GetField("data");
      JSONObject editorInfoJSON = audioClipJSON.GetField("editorInfo");
      if (dataJSON == null) {
        dataJSON = new JSONObject(JSONObject.Type.OBJECT);
        audioClipJSON.AddField("data", dataJSON);
      }
      if (editorInfoJSON == null) {
        editorInfoJSON = new JSONObject(JSONObject.Type.OBJECT);
        audioClipJSON.AddField("editorInfo", editorInfoJSON);
      }
      editorInfoJSON.AddField("name", audioClip.name);
      dataJSON.AddField("length", audioClip.length);
      dataJSON.AddField("preloadAudioData", true);

      AssetImporter importer = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(audioClip.GetInstanceID()));
      AudioImporter audioImporter = importer as AudioImporter;
      int loadType;
      LoadTypeMap.TryGetValue(audioImporter.defaultSampleSettings.loadType, out loadType);
      audioClipJSON.AddField("loadType", loadType);

      /*
      AssetImporter importer = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(audioClip.GetInstanceID()));
      AudioImporter audioImporter = importer as AudioImporter;
      PropertyInfo inspectorModeInfo = typeof(UnityEditor.SerializedObject).GetProperty ("inspectorMode", BindingFlags.NonPublic | BindingFlags.Instance);
      UnityEditor.SerializedObject serializedObject = new UnityEditor.SerializedObject (audioImporter);
      inspectorModeInfo.SetValue(serializedObject, UnityEditor.InspectorMode.Debug, null);
      UnityEditor.SerializedProperty normalize = serializedObject.FindProperty ("m_Normalize");
      audioClipJSON.AddField("normalize", normalize.boolValue);
      audioClipJSON.AddField("ambisonic", audioImporter.ambisonic);
      audioClipJSON.AddField("conversionMode", audioImporter.defaultSampleSettings.conversionMode);
      audioClipJSON.AddField("quality", audioImporter.defaultSampleSettings.quality);
      audioClipJSON.AddField("sampleRateOverride", audioImporter.defaultSampleSettings.sampleRateOverride);

      int compressionFormat;
      CompressionFormatMap.TryGetValue(audioImporter.defaultSampleSettings.compressionFormat, out compressionFormat);
      audioClipJSON.AddField("compressionFormat", compressionFormat);
      
      int sampleRateSetting;
      SampleRateSettingMap.TryGetValue(audioImporter.defaultSampleSettings.sampleRateSetting, out sampleRateSetting);
      audioClipJSON.AddField("sampleRateSetting", sampleRateSetting);

      int loadType;
      LoadTypeMap.TryGetValue(audioImporter.defaultSampleSettings.loadType, out loadType);
      audioClipJSON.AddField("loadType", loadType);

      audioClipJSON.AddField("forceToMono", audioImporter.forceToMono);
      audioClipJSON.AddField("loadInBackground", audioImporter.loadInBackground);
      audioClipJSON.AddField("preloadAudioData", audioImporter.preloadAudioData);
      audioClipJSON.AddField("threeD", audioImporter.threeD);
      */
      return audioClipJSON;
    }
  }
}
