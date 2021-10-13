using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;
using System.Security.Cryptography;
using System.Text;

namespace WeChat
{

    class WXAnimationClip : WXResource
    {
        protected override string GetResourceType()
        {
            return "animationclip";
        }

        public static byte[] GetHash(string inputString)
        {
            HashAlgorithm algorithm = SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }

        public struct AniNodeFrameData
        {
            public ushort startTimeIndex;

            // public List<float> inWeights;

            public List<float> inTangentNumbers;

            // public List<float> outWeights;

            public List<float> outTangentNumbers;

            public List<float> valueNumbers;

            // public List<WeightedMode> weightModes;
        }

        public struct AniNodeData
        {
            public string typeName;

            public byte type;

            public ushort pathLength;

            public List<ushort> pathIndex;

            public ushort conpomentTypeIndex;

            public ushort propertyNameLength;

            public List<ushort> propertyNameIndex;

            public ushort keyFrameCount;

            public List<AniNodeFrameData> aniNodeFrameDatas;
        }

        public struct CustomAnimationCurve
        {
            public Keyframe[] keys;
        }

        public struct AniEvent
        {
            public int frameId;
            public string functionName;
            public int intParameter;
            public float floatParameter;
            public string stringParameter;
        }

        public struct CustomAnimationClipCurveData
        {
            public CustomAnimationCurve curve;

            public string path;

            public string propertyName;

            public Type type;
        }

        public static Dictionary<string, string> UnityTypeMap = new Dictionary<string, string>
    {
        { "UnityEngine.GameObject", "Entity" },
        { "UnityEngine.Transform", "Transform" },
        { "UnityEngine.MeshRenderer", "MeshRenderer" },
        { "UnityEngine.SkinnedMeshRenderer",  "SkinnedMeshRenderer" },
        { "UnityEngine.ParticleSystemRenderer", "ParticleRenderer" },
        { "UnityEngine.TrailRenderer", "TrailRenderer" }
    };

        public static Dictionary<string, string> UnityPropertyMap = new Dictionary<string, string>
    {
        { "m_IsActive", "active"},
        { "m_LocalPosition", "localPosition"},
        {"m_LocalRotation", "localRotation" },
        {"m_LocalScale", "localScale" },
        { "localEulerAnglesRaw", "localRotationEuler"},
        { "material", "material"},
        { "m_Enabled", "enable"}
    };
        public static Dictionary<string, byte> UnityPropertyBitSizeMap = new Dictionary<string, byte>
    {
        { "m_LocalPosition", (byte)12 },
        { "m_LocalRotation",  (byte)16 },
        { "m_LocalScale", (byte)12 },
        { "localEulerAnglesRaw", (byte)12 }
    };
        public static Dictionary<string, int> UnityPropertySizeMap = new Dictionary<string, int> {
        { "m_LocalPosition", 3},
        { "m_LocalRotation", 4},
        { "m_LocalScale", 3},
        { "localEulerAnglesRaw", 3}
    };
        public static Dictionary<string, List<string>> UnityPropertyNameListMap = new Dictionary<string, List<string>> {
        { "m_LocalPosition", new List<string>{"x", "y", "z"} },
        { "m_LocalRotation", new List<string>{"x", "y", "z", "w"} },
        { "m_LocalScale", new List<string>{"x", "y", "z"} },
        { "localEulerAnglesRaw", new List<string>{"x", "y", "z"} },
    };

        public static Dictionary<string, WXAnimationClip> Instances = new Dictionary<string, WXAnimationClip>();

        public WXAnimationClip(AnimationClip _animationClip) : base(AssetDatabase.GetAssetPath(_animationClip.GetInstanceID()))
        {
            animationClip = _animationClip;
            //gameObject = _gameObject;
            string animationClipName = wxFileUtil.cleanIllegalChar(_animationClip.name, true);
            string relativePath = wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + "-" + animationClipName;
            _fileName = relativePath;

            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                .setResource(this)
                .error(ErrorUtil.ErrorCode.AnimationClip_PathError, "animationClip文件的unity路径为空");
            }
        }

        private AnimationClip animationClip = null;
        //private GameObject gameObject = null;

        public override string GetExportPath()
        {
            return _fileName + ".animationclip";
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(AssetDatabase.GetAssetPath(animationClip.GetInstanceID())) + WXUtility.GetMD5FromString(animationClip.name);
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            return GenerateResourceData();
        }

        public JSONObject GenerateResourceData()
        {
            _UpdateClip();
            JSONObject meta = JSONObject.Create("{\"keyframeData\": {}}");
            JSONObject keyframeData = meta.GetField("keyframeData");
            JSONObject metadata = new JSONObject(JSONObject.Type.OBJECT);
            meta.AddField("data", metadata);

            // byte[] content = _writeFile(ref metadata, ref keyframeData);
            _writeFile(ref metadata, ref keyframeData);

            JSONObject editorInfo = new JSONObject(JSONObject.Type.OBJECT);
            editorInfo.AddField("assetVersion", 2);
            meta.AddField("editorInfo", editorInfo);
            // meta.GetField("file").AddField(
            //     "src",
            //     AddFile(new WXEngineAnimationClipFile(AssetDatabase.GetAssetPath(animationClip.GetInstanceID()), animationClip.name, content))
            // );

            return meta;
        }

        private class WXEngineAnimationClipFile : WXEngineBinaryFile
        {
            private byte[] content;
            private string animationClipName;
            public WXEngineAnimationClipFile(string unityAssetPath, string animationClipName, byte[] content) : base(unityAssetPath)
            {
                this.content = content;
                this.animationClipName = animationClipName;
            }

            public override string GetExportPath()
            {
                return wxFileUtil.cleanIllegalChar(unityAssetPath.Split('.')[0], false) + "-" + animationClipName + ".animationclip.bin";
            }

            protected override byte[] GetContent()
            {
                return content;
            }
        }

        private void _writeFile(ref JSONObject metadata, ref JSONObject keyframeData)
        {
            metadata.AddField("name", animationClip.name);
            // MemoryStream fileStream = new MemoryStream();

            JSONObject pathArray = new JSONObject(JSONObject.Type.ARRAY);
            metadata.AddField("paths", pathArray);
            // JSONObject propArray = new JSONObject(JSONObject.Type.ARRAY);
            // metadata.AddField("props", propArray);
            AnimationClipSettings settings = AnimationUtility.GetAnimationClipSettings(animationClip);
            metadata.AddField("wrapMode", (int)animationClip.wrapMode);
            metadata.AddField("startTime", settings.startTime);
            metadata.AddField("stopTime", settings.stopTime);
            metadata.AddField("loopTime", settings.loopTime);
            metadata.AddField("cycleOffset", settings.cycleOffset);

            JSONObject bone = new JSONObject(JSONObject.Type.OBJECT);
            keyframeData.AddField("bone", bone); // 骨骼动画keyframe信息
            JSONObject meta = new JSONObject(JSONObject.Type.OBJECT);
            keyframeData.AddField("meta", meta); // 元动画（如材质、active等）keyframe信息
            JSONObject eventList = new JSONObject(JSONObject.Type.ARRAY);
            keyframeData.AddField("eventList", eventList);

            keyframeData.AddField("frameRate", (float)FrameRate);
            float duration = (keyFrameTimes.Count == 0) ? 0f : ((float)keyFrameTimes[keyFrameTimes.Count - 1]);
            int total = (int)Math.Round(duration * FrameRate, 0);
            keyframeData.AddField("totalFrameCount", total + 1);

            JSONObject boneSampleInfoList = new JSONObject(JSONObject.Type.ARRAY);
            bone.AddField("sampleList", boneSampleInfoList);
            JSONObject boneContentList = new JSONObject(JSONObject.Type.ARRAY);
            bone.AddField("contentList", boneContentList);

            JSONObject metaSampleInfoList = new JSONObject(JSONObject.Type.ARRAY);
            meta.AddField("sampleList", metaSampleInfoList);
            JSONObject metaContentList = new JSONObject(JSONObject.Type.ARRAY);
            meta.AddField("contentList", metaContentList);

            List<string> pathList = new List<string>();
            // bool hasMeta = false;
            foreach (var info in pathInfoArray)
            {
                int index = pathList.IndexOf(info.Key);
                if (index < 0)
                {
                    pathList.Add(info.Key);
                    index = pathList.Count - 1;
                }
                for (int j = 0; j < info.Value.prop.Count; j++)
                {
                    if (!info.Value.isMeta)
                    {
                        JSONObject boneSampleInfo = new JSONObject(JSONObject.Type.OBJECT);
                        boneSampleInfo.AddField("pathIndex", index);
                        boneSampleInfo.AddField("type", info.Value.prop[j].type);
                        boneSampleInfo.AddField("keyframeCount", info.Value.prop[j].keyFrameCount);
                        boneSampleInfoList.Add(boneSampleInfo);
                        // sampleLength++;
                    }
                    else
                    {
                        JSONObject metaSampleInfo = new JSONObject(JSONObject.Type.OBJECT);
                        metaSampleInfo.AddField("pathIndex", index);
                        metaSampleInfo.AddField("type", info.Value.name);
                        metaSampleInfo.AddField("keyframeCount", info.Value.prop[j].keyFrameCount);
                        metaSampleInfoList.Add(metaSampleInfo);
                    }
                }
            }

            foreach (var info in pathInfoArray)
            {
                for (int j = 0; j < info.Value.curve.Count; j++)
                {
                    if (!info.Value.isMeta)
                    {
                        JSONObject boneContent = new JSONObject(JSONObject.Type.OBJECT);
                        boneContent.AddField("frameId", info.Value.curve[j].frameId);
                        boneContent.AddField("value", info.Value.curve[j].valueNumber);
                        boneContent.AddField("inTangent", info.Value.curve[j].inTangentNumber);
                        boneContent.AddField("outTangent", info.Value.curve[j].outTangentNumber);
                        boneContentList.Add(boneContent);
                    }
                    else
                    {
                        JSONObject metaContent = new JSONObject(JSONObject.Type.OBJECT);
                        metaContent.AddField("frameId", info.Value.curve[j].frameId);
                        metaContent.AddField("value", info.Value.curve[j].valueNumber);
                        metaContent.AddField("inTangent", info.Value.curve[j].inTangentNumber);
                        metaContent.AddField("outTangent", info.Value.curve[j].outTangentNumber);
                        metaContentList.Add(metaContent);
                    }
                }
            }

            foreach (AniEvent e in aniEvents)
            {
                JSONObject eventObj = new JSONObject(JSONObject.Type.OBJECT);
                float numberParameter = e.intParameter;
                if (numberParameter == 0)
                {
                    numberParameter = e.floatParameter;
                }
                eventObj.AddField("frameId", e.frameId);
                eventObj.AddField("functionName", e.functionName);
                eventObj.AddField("numberParameter", numberParameter);
                eventObj.AddField("stringParameter", e.stringParameter);
                eventList.Add(eventObj);
            }

            for (int i = 0; i < pathList.Count; i++)
            {
                pathArray.Add(pathList[i]);
            }

            /*
            //1.headerBuffer.length + samplesBuffer.length 4λ
            wxFileUtil.WriteData(fileStream, default(uint));
            //2.frameRate
            wxFileUtil.WriteData(fileStream, (float)FrameRate);
            //3.Math.round(duration * frameRate)
            float duration = (keyFrameTimes.Count == 0) ? 0f : ((float)keyFrameTimes[keyFrameTimes.Count - 1]);
            int total = (int)Math.Round(duration * FrameRate, 0);
            wxFileUtil.WriteData(fileStream, (uint)total);
            long samplesBufLenPos = fileStream.Position;
            //4. samplesBuffer.length writeInt32LE
            wxFileUtil.WriteData(fileStream, default(uint));
            //5. nodeid writeInt32LE
            long samplesBufStartPos = fileStream.Position;
            int sampleLength = 0;

            List<string> pathList = new List<string>();
            bool hasMeta = false;
            foreach (var info in pathInfoArray)
            {
                int index = pathList.IndexOf(info.Key);
                if (index < 0)
                {
                    pathList.Add(info.Key);
                    index = pathList.Count - 1;
                }
                for (int j = 0; j < info.Value.prop.Count; j++)
                {
                    if (!info.Value.isMeta)
                    {
                        wxFileUtil.WriteData(fileStream, (uint)index);
                        wxFileUtil.WriteData(fileStream, info.Value.prop[j].type);
                        wxFileUtil.WriteData(fileStream, info.Value.prop[j].keyFrameCount);
                        sampleLength++;
                    }
                    else
                    {
                        hasMeta = true;
                    }
                }
            }
            long samplesBufEndPos = fileStream.Position;
            // contentStart
            foreach (var info in pathInfoArray)
            {
                for (int j = 0; j < info.Value.curve.Count; j++)
                {
                    if (!info.Value.isMeta)
                    {
                        wxFileUtil.WriteData(fileStream, info.Value.curve[j].frameId);
                        wxFileUtil.WriteData(fileStream, info.Value.curve[j].valueNumber);
                        wxFileUtil.WriteData(fileStream, info.Value.curve[j].inTangentNumber);
                        wxFileUtil.WriteData(fileStream, info.Value.curve[j].outTangentNumber);
                    }
                    else
                    {
                        hasMeta = true;
                    }
                }
            }
            // contentEnd
            long contentBufEndPos = fileStream.Position;
            fileStream.Position = 0;
            //1.headerBuffer.length + samplesBuffer.length 4λ
            wxFileUtil.WriteData(fileStream, (int)samplesBufEndPos);
            fileStream.Position = samplesBufLenPos;
            // samplesBuffer.length writeInt32LE
            wxFileUtil.WriteData(fileStream, (int)sampleLength);

            if (hasMeta)
            {
                // Meta length
                fileStream.Position = contentBufEndPos;
                wxFileUtil.WriteData(fileStream, default(uint));

                sampleLength = 0;
                List<JSONObject> propList = new List<JSONObject>();

                foreach (var info in pathInfoArray)
                {
                    int index = pathList.IndexOf(info.Key);
                    if (index < 0)
                    {
                        pathList.Add(info.Key);
                        index = pathList.Count - 1;
                    }
                    for (int j = 0; j < info.Value.prop.Count; j++)
                    {
                        if (info.Value.isMeta)
                        {
                            // wxFileUtil.WriteData(fileStream, (uint)index);
                            wxFileUtil.WriteData(fileStream, info.Value.prop[j].keyFrameCount);
                            JSONObject pairArray = new JSONObject(JSONObject.Type.ARRAY);
                            pairArray.Add(index);
                            pairArray.Add(info.Value.name);
                            propList.Add(pairArray);
                            sampleLength++;
                        }
                    }
                }

                foreach (var info in pathInfoArray)
                {
                    for (int j = 0; j < info.Value.curve.Count; j++)
                    {
                        if (info.Value.isMeta)
                        {
                            wxFileUtil.WriteData(fileStream, info.Value.curve[j].frameId);
                            wxFileUtil.WriteData(fileStream, info.Value.curve[j].valueNumber);
                            wxFileUtil.WriteData(fileStream, info.Value.curve[j].inTangentNumber);
                            // wxFileUtil.WriteData(fileStream, info.Value.curve[j].inWeight);
                            wxFileUtil.WriteData(fileStream, info.Value.curve[j].outTangentNumber);
                            // wxFileUtil.WriteData(fileStream, info.Value.curve[j].outWeight);
                        }
                    }
                }

                fileStream.Position = contentBufEndPos;
                wxFileUtil.WriteData(fileStream, sampleLength);
                for (int i = 0; i < propList.Count; i++)
                {
                    propArray.Add(propList[i]);
                }
            }
            fileStream.Close();
            for (int i = 0; i < pathList.Count; i++)
            {
                pathArray.Add(pathList[i]);
            }
            metadata.AddField("pathHash", GetHashString(String.Join(",", pathList.ToArray())));

            return fileStream.ToArray();
            */
        }

        private struct PropInfo
        {
            public uint type;
            public uint keyFrameCount;
        }

        private struct CurveInfo
        {
            public uint frameId;
            public float valueNumber;
            // public float inWeight;
            public float inTangentNumber;
            // public float outWeight;
            public float outTangentNumber;
            // public WeightedMode weightMode;
        }

        private struct PathInfo
        {
            public List<PropInfo> prop;
            public List<CurveInfo> curve;
            public bool isMeta;
            public string name;
        }

        private List<double> keyFrameTimes = new List<double>();

        private List<AniEvent> aniEvents = new List<AniEvent>();

        private List<KeyValuePair<string, PathInfo>> pathInfoArray = new List<KeyValuePair<string, PathInfo>>();

        private void _UpdateClip()
        {
            int frameRate = (int)animationClip.frameRate;
            FrameRate = frameRate;

            foreach (AnimationEvent e in animationClip.events)
            {
                double frameId = Math.Round(e.time * frameRate, 0);
                AniEvent aniEvent = new AniEvent
                {
                    frameId = (int)frameId,
                    functionName = e.functionName,
                    intParameter = e.intParameter,
                    floatParameter = e.floatParameter,
                    stringParameter = e.stringParameter,
                };
                aniEvents.Add(aniEvent);
            }

            //List<WXBeefBallComponent.ComponentType> list = WXBeefBallComponent.componentsOnGameObject(gameObject);
            List<string> names = new List<string> { "ANIMATIONS" };
            //string objectName = gameObject.name;
            string animationClipName = wxFileUtil.cleanIllegalChar(animationClip.name, true);
            names.Add(animationClipName);
            EditorCurveBinding[] curveBindings = AnimationUtility.GetCurveBindings(animationClip);
            AnimationClipCurveData[] curveDataArray = new AnimationClipCurveData[curveBindings.Length];
            for (int k = 0; k < curveBindings.Length; k++)
            {
                curveDataArray[k] = new AnimationClipCurveData(curveBindings[k])
                {
                    curve = AnimationUtility.GetEditorCurve(animationClip, curveBindings[k])
                };
            }
            for (int l = 0; l < curveDataArray.Length; l++)
            {
                Keyframe[] keys = curveDataArray[l].curve.keys;
                for (int m = 0; m < keys.Length; m++)
                {
                    double item = Math.Round((double)keys[m].time, 3);
                    if (keyFrameTimes.IndexOf(item) == -1)
                    {
                        keyFrameTimes.Add(item);
                    }
                }
            }
            keyFrameTimes.Sort();
            List<string> pathAndPropertyHashArray = new List<string>();
            List<CustomAnimationClipCurveData> customCurveDataArray = new List<CustomAnimationClipCurveData>();
            foreach (AnimationClipCurveData curveData in curveDataArray)
            {
                CustomAnimationCurve curve = default(CustomAnimationCurve);
                curve.keys = curveData.curve.keys;
                CustomAnimationClipCurveData customAnimationClipCurveData = default(CustomAnimationClipCurveData);
                customAnimationClipCurveData.curve = curve;
                customAnimationClipCurveData.path = curveData.path;
                customAnimationClipCurveData.propertyName = curveData.propertyName;
                customAnimationClipCurveData.type = curveData.type;
                customCurveDataArray.Add(customAnimationClipCurveData);
            }
            List<CustomAnimationClipCurveData> finalCurveDataArray = new List<CustomAnimationClipCurveData>();
            foreach (AnimationClipCurveData curveData in curveDataArray)
            {
                string path = curveData.path;
                string propertyName = curveData.propertyName;
                if (UnityTypeMap.ContainsKey(curveData.type.ToString()))
                {
                    switch (UnityTypeMap[curveData.type.ToString()])
                    {
                        case "MeshRenderer":
                        case "SkinnedMeshRenderer":
                        case "ParticleRenderer":
                        case "TrailRenderer":
                        case "Entity":
                            //case "":
                            {
                                CustomAnimationCurve renderCurve = default(CustomAnimationCurve);
                                renderCurve.keys = curveData.curve.keys;
                                CustomAnimationClipCurveData renderCurveData = default(CustomAnimationClipCurveData);
                                renderCurveData.curve = renderCurve;
                                renderCurveData.path = curveData.path;
                                renderCurveData.propertyName = curveData.propertyName;
                                renderCurveData.type = curveData.type;
                                finalCurveDataArray.Add(renderCurveData);
                                break;
                            }
                        default:
                            {
                                string lastUnityPropName = propertyName.Substring(0, propertyName.LastIndexOf('.'));
                                string pathAndPropertyHash = lastUnityPropName + "|" + path;
                                if (pathAndPropertyHashArray.IndexOf(pathAndPropertyHash) == -1)
                                {
                                    pathAndPropertyHashArray.Add(pathAndPropertyHash);
                                    List<CustomAnimationClipCurveData> expandedCustomCurveDataArray = new List<CustomAnimationClipCurveData>();
                                    for (int j = 0; j < UnityPropertyNameListMap[lastUnityPropName].Count; j++)
                                    {
                                        string subPropName = lastUnityPropName + "." + UnityPropertyNameListMap[lastUnityPropName][j];
                                        for (int k = 0; k < customCurveDataArray.Count; k++)
                                        {
                                            if (customCurveDataArray[k].propertyName == subPropName && customCurveDataArray[k].path == path)
                                            {
                                                expandedCustomCurveDataArray.Add(customCurveDataArray[k]);
                                                customCurveDataArray.RemoveAt(customCurveDataArray.IndexOf(customCurveDataArray[k]));
                                            }
                                        }
                                    }
                                    if (UnityPropertyNameListMap[lastUnityPropName].Count != expandedCustomCurveDataArray.Count)
                                    {
                                        List<CustomAnimationClipCurveData> expandedCustomCurveDataArrayCopy = new List<CustomAnimationClipCurveData>();
                                        for (int j = 0; j < UnityPropertyNameListMap[lastUnityPropName].Count; j++)
                                        {
                                            string undefinedSubPropName = lastUnityPropName + "." + UnityPropertyNameListMap[lastUnityPropName][j];
                                            bool exist = false;
                                            for (int k = 0; k < expandedCustomCurveDataArray.Count; k++)
                                            {
                                                if (expandedCustomCurveDataArray[k].propertyName == undefinedSubPropName)
                                                {
                                                    exist = true;
                                                    expandedCustomCurveDataArrayCopy.Add(expandedCustomCurveDataArray[k]);
                                                }
                                            }
                                            if (!exist)
                                            {
                                                CustomAnimationCurve curve = default(CustomAnimationCurve);
                                                curve.keys = new Keyframe[0];
                                                CustomAnimationClipCurveData data = default(CustomAnimationClipCurveData);
                                                data.path = expandedCustomCurveDataArray[0].path;
                                                data.propertyName = undefinedSubPropName;
                                                data.type = expandedCustomCurveDataArray[0].type;
                                                data.curve = curve;
                                                expandedCustomCurveDataArrayCopy.Add(data);
                                            }
                                        }
                                        expandedCustomCurveDataArray = expandedCustomCurveDataArrayCopy;
                                    }
                                    List<double> combinedKeyFrameTimes = new List<double>();
                                    for (int j = 0; j < expandedCustomCurveDataArray.Count; j++)
                                    {
                                        Keyframe[] keys = expandedCustomCurveDataArray[j].curve.keys;
                                        for (int k = 0; k < keys.Length; k++)
                                        {
                                            bool exist = false;
                                            for (int l = 0; l < combinedKeyFrameTimes.Count; l++)
                                            {
                                                if (Math.Round(combinedKeyFrameTimes[l], 3) == Math.Round((double)keys[k].time, 3))
                                                {
                                                    exist = true;
                                                }
                                            }
                                            if (!exist)
                                            {
                                                combinedKeyFrameTimes.Add((double)keys[k].time);
                                            }
                                        }
                                    }
                                    combinedKeyFrameTimes.Sort();
                                    List<Keyframe> combinedKeyFrames = new List<Keyframe>();
                                    for (int j = 0; j < combinedKeyFrameTimes.Count; j++)
                                    {
                                        Keyframe frame = default(Keyframe);
                                        frame.inTangent = float.NaN;
                                        frame.outTangent = float.NaN;
                                        frame.time = (float)combinedKeyFrameTimes[j];
                                        frame.value = float.NaN;
                                        combinedKeyFrames.Add(frame);
                                    }
                                    for (int j = 0; j < expandedCustomCurveDataArray.Count; j++)
                                    {
                                        List<Keyframe> curveKeys = expandedCustomCurveDataArray[j].curve.keys.ToList();
                                        List<Keyframe> combinedCurveKeys = new List<Keyframe>();
                                        for (int k = 0; k < combinedKeyFrameTimes.Count; k++)
                                        {
                                            bool exist = false;
                                            for (int l = 0; l < curveKeys.Count; l++)
                                            {
                                                Keyframe keyframe = curveKeys[l];
                                                if (Math.Round((double)keyframe.time, 3) == Math.Round(combinedKeyFrameTimes[k], 3))
                                                {
                                                    exist = true;
                                                    combinedCurveKeys.Add(curveKeys[l]);
                                                }
                                            }
                                            if (!exist)
                                            {
                                                combinedCurveKeys.Add(combinedKeyFrames[k]);
                                            }
                                        }
                                        for (int k = 0; k < combinedKeyFrameTimes.Count; k++)
                                        {
                                            Keyframe keyframe = combinedCurveKeys[k];
                                            if (float.IsNaN(keyframe.value))
                                            {
                                                bool hasNANBefore = false;
                                                bool hasNANAfter = false;
                                                int prevNANIndex = -1;
                                                int nextNANIndex = -1;
                                                for (int l = k - 1; l >= 0; l--)
                                                {
                                                    keyframe = combinedCurveKeys[l];
                                                    if (!float.IsNaN(keyframe.value))
                                                    {
                                                        hasNANBefore = true;
                                                        prevNANIndex = l;
                                                        break;
                                                    }
                                                }
                                                for (int l = k + 1; l < combinedKeyFrameTimes.Count; l++)
                                                {
                                                    keyframe = combinedCurveKeys[l];
                                                    if (!float.IsNaN(keyframe.value))
                                                    {
                                                        hasNANAfter = true;
                                                        nextNANIndex = l;
                                                        break;
                                                    }
                                                }
                                                if (hasNANBefore & hasNANAfter)
                                                {
                                                    keyframe = combinedCurveKeys[nextNANIndex];
                                                    float time = keyframe.time;
                                                    keyframe = combinedCurveKeys[prevNANIndex];
                                                    float num18 = time - keyframe.time;
                                                    float t = (float)((combinedKeyFrameTimes[k] - combinedKeyFrameTimes[prevNANIndex]) / (combinedKeyFrameTimes[nextNANIndex] - combinedKeyFrameTimes[prevNANIndex]));
                                                    float startX = (float)combinedKeyFrameTimes[prevNANIndex];
                                                    float endX = (float)combinedKeyFrameTimes[nextNANIndex];
                                                    keyframe = combinedCurveKeys[prevNANIndex];
                                                    float value = keyframe.value;
                                                    keyframe = combinedCurveKeys[nextNANIndex];
                                                    float value2 = keyframe.value;
                                                    keyframe = combinedCurveKeys[prevNANIndex];
                                                    float tanPoint = keyframe.outTangent * num18;
                                                    keyframe = combinedCurveKeys[nextNANIndex];
                                                    float num19 = default(float);
                                                    float value3 = MathUtil.Interpolate(startX, endX, value, value2, tanPoint, keyframe.inTangent * num18, t, out num19);
                                                    Keyframe value4 = default(Keyframe);
                                                    float num22 = value4.inTangent = (value4.outTangent = num19);
                                                    value4.value = value3;
                                                    value4.time = (float)combinedKeyFrameTimes[k];
                                                    combinedCurveKeys[k] = value4;
                                                }
                                                else if (hasNANBefore && !hasNANAfter)
                                                {
                                                    Keyframe value5 = default(Keyframe);
                                                    float num22 = value5.inTangent = (value5.outTangent = 0f);
                                                    keyframe = combinedCurveKeys[prevNANIndex];
                                                    value5.value = keyframe.value;
                                                    value5.time = (float)combinedKeyFrameTimes[k];
                                                    combinedCurveKeys[k] = value5;
                                                }
                                                else if (!hasNANBefore & hasNANAfter)
                                                {
                                                    Keyframe value6 = default(Keyframe);
                                                    float num22 = value6.inTangent = (value6.outTangent = 0f);
                                                    keyframe = combinedCurveKeys[nextNANIndex];
                                                    value6.value = keyframe.value;
                                                    value6.time = (float)combinedKeyFrameTimes[k];
                                                    combinedCurveKeys[k] = value6;
                                                }
                                                else
                                                {
                                                    //Debug.LogWarning(gameObject.name + "'s Animator " + gameObject.name + "/" + expandedCustomCurveDataArray[j].path + " " + expandedCustomCurveDataArray[j].propertyName + " keyFrame data can't be null!");
                                                    Debug.LogWarning(" keyFrame data can't be null!");
                                                }
                                            }
                                        }
                                        CustomAnimationCurve curve = default(CustomAnimationCurve);
                                        curve.keys = combinedCurveKeys.ToArray();
                                        CustomAnimationClipCurveData customCurveData = default(CustomAnimationClipCurveData);
                                        customCurveData.curve = curve;
                                        customCurveData.path = expandedCustomCurveDataArray[j].path;
                                        customCurveData.propertyName = expandedCustomCurveDataArray[j].propertyName;
                                        customCurveData.type = expandedCustomCurveDataArray[j].type;
                                        expandedCustomCurveDataArray[j] = customCurveData;
                                    }
                                    for (int j = 0; j < expandedCustomCurveDataArray.Count; j++)
                                    {
                                        finalCurveDataArray.Add(expandedCustomCurveDataArray[j]);
                                    }
                                }
                                break;
                            }
                    }
                }
            }
            List<AniNodeData> animationNodeList = new List<AniNodeData>();
            int increasement = 0;
            AniNodeData aniNodeData = default(AniNodeData);
            for (int i = 0; i < finalCurveDataArray.Count; i += increasement)
            {
                CustomAnimationClipCurveData customAnimationClipCurveData = finalCurveDataArray[i];
                List<ushort> nameIndices = new List<ushort>();
                string[] pathArray = customAnimationClipCurveData.path.Split('/');
                for (int j = 0; j < pathArray.Length; j++)
                {
                    if (names.IndexOf(pathArray[j]) == -1)
                    {
                        names.Add(pathArray[j]);
                    }
                    nameIndices.Add((ushort)names.IndexOf(pathArray[j]));
                }
                aniNodeData.pathLength = (ushort)nameIndices.Count;
                aniNodeData.pathIndex = nameIndices;
                string typeName = UnityTypeMap[customAnimationClipCurveData.type.ToString()];
                aniNodeData.typeName = typeName;
                if (names.IndexOf(typeName) == -1)
                {
                    names.Add(typeName);
                }
                aniNodeData.conpomentTypeIndex = (ushort)names.IndexOf(typeName);
                string[] propArray = customAnimationClipCurveData.propertyName.Split('.');
                List<ushort> propIndices = new List<ushort>();
                string key = propArray[0];
                string mainKey = UnityPropertyMap[key];
                if (typeName == "Transform")
                {
                    if (names.IndexOf(mainKey) == -1)
                    {
                        names.Add(mainKey);
                    }
                    propIndices.Add((ushort)names.IndexOf(mainKey));
                    aniNodeData.propertyNameLength = 1;
                    aniNodeData.propertyNameIndex = propIndices;
                }
                else if (typeName == "MeshRenderer" || typeName == "SkinnedMeshRenderer" || typeName == "ParticleRenderer" || typeName == "TrailRenderer" || typeName == "Entity")
                {
                    if (propArray.Length == 1)
                    {
                        if (names.IndexOf(mainKey) == -1)
                        {
                            names.Add(mainKey);
                        }
                        propIndices.Add((ushort)names.IndexOf(mainKey));
                        aniNodeData.propertyNameLength = 1;
                        aniNodeData.propertyNameIndex = propIndices;
                    }
                    else if (propArray.Length == 2)
                    {
                        if (names.IndexOf(mainKey) == -1)
                        {
                            names.Add(mainKey);
                        }
                        propIndices.Add((ushort)names.IndexOf(mainKey));
                        string item7 = propArray[1];
                        if (names.IndexOf(item7) == -1)
                        {
                            names.Add(item7);
                        }
                        propIndices.Add((ushort)names.IndexOf(item7));
                        aniNodeData.propertyNameLength = 2;
                        aniNodeData.propertyNameIndex = propIndices;
                    }
                    else if (propArray.Length == 3)
                    {
                        if (names.IndexOf(mainKey) == -1)
                        {
                            names.Add(mainKey);
                        }
                        propIndices.Add((ushort)names.IndexOf(mainKey));
                        string str = propArray[1];
                        str += propArray[2].ToUpper();
                        if (names.IndexOf(str) == -1)
                        {
                            names.Add(str);
                        }
                        propIndices.Add((ushort)names.IndexOf(str));
                        aniNodeData.propertyNameLength = 2;
                        aniNodeData.propertyNameIndex = propIndices;
                    }
                    else
                    {
                        aniNodeData.propertyNameLength = 0;
                        aniNodeData.propertyNameIndex = propIndices;
                        Debug.LogWarning("Animation attribute length overbounds!");
                    }
                }
                else
                {
                    aniNodeData.propertyNameLength = 0;
                    aniNodeData.propertyNameIndex = propIndices;
                    Debug.LogWarning("Animation attribute length overbounds!");
                }
                if (propArray[0] == "m_LocalPosition")
                {
                    aniNodeData.type = 1;
                }
                else if (propArray[0] == "m_LocalRotation")
                {
                    aniNodeData.type = 2;
                }
                else if (propArray[0] == "m_LocalScale")
                {
                    aniNodeData.type = 3;
                }
                else if (propArray[0] == "localEulerAnglesRaw")
                {
                    aniNodeData.type = 4;
                }
                else
                {
                    aniNodeData.type = 0;
                }
                try
                {
                    increasement = UnityPropertySizeMap[propArray[0]];
                }
                catch (Exception ex)
                {
                    ex.ToString();
                    increasement = 1;
                }
                List<AniNodeFrameData> aniNodeFrameDatas = new List<AniNodeFrameData>();
                Keyframe[] customAnimationClipCurveDataKeyFrames = customAnimationClipCurveData.curve.keys;
                for (int j = 0; j < customAnimationClipCurveDataKeyFrames.Length; j++)
                {
                    float time = customAnimationClipCurveDataKeyFrames[j].time;
                    AniNodeFrameData frameData = default(AniNodeFrameData);
                    frameData.startTimeIndex = (ushort)keyFrameTimes.IndexOf(Math.Round((double)time, 3));
                    List<float> valueNumberList = new List<float>();
                    // List<float> inWeightList = new List<float>();
                    List<float> inTangentNumberList = new List<float>();
                    // List<float> outWeightList = new List<float>();
                    List<float> outTangentNumberList = new List<float>();
                    // List<WeightedMode> weightModes = new List<WeightedMode>();
                    int propIndex = 0;
                    for (int k = i; k < i + increasement; k++)
                    {
                        Keyframe keyframe = finalCurveDataArray[k].curve.keys[j];
                        if (mainKey == "localPosition")
                        {
                            if (propIndex == 0)
                            {
                                valueNumberList.Add(keyframe.value * -1f);
                                // inWeightList.Add(keyframe.inWeight);
                                inTangentNumberList.Add(keyframe.inTangent * -1f);
                                // outWeightList.Add(keyframe.outWeight);
                                outTangentNumberList.Add(keyframe.outTangent * -1f);
                                // weightModes.Add(keyframe.weightedMode);
                            }
                            else
                            {
                                valueNumberList.Add(keyframe.value);
                                // inWeightList.Add(keyframe.inWeight);
                                inTangentNumberList.Add(keyframe.inTangent);
                                // outWeightList.Add(keyframe.outWeight);
                                outTangentNumberList.Add(keyframe.outTangent);
                                // weightModes.Add(keyframe.weightedMode);
                            }
                        }
                        else if (mainKey == "localRotation")
                        {
                            if (propIndex == 0 || propIndex == 3)
                            {
                                valueNumberList.Add(keyframe.value * -1f);
                                // inWeightList.Add(keyframe.inWeight);
                                inTangentNumberList.Add(keyframe.inTangent * -1f);
                                // outWeightList.Add(keyframe.outWeight);
                                outTangentNumberList.Add(keyframe.outTangent * -1f);
                                // weightModes.Add(keyframe.weightedMode);
                            }
                            else
                            {
                                valueNumberList.Add(keyframe.value);
                                // inWeightList.Add(keyframe.inWeight);
                                inTangentNumberList.Add(keyframe.inTangent);
                                // outWeightList.Add(keyframe.outWeight);
                                outTangentNumberList.Add(keyframe.outTangent);
                                // weightModes.Add(keyframe.weightedMode);
                            }
                        }
                        else if (mainKey == "localRotationEuler")
                        {
                            //if (list.IndexOf(WXBeefBallComponent.ComponentType.Camera) != -1)
                            //{
                            //    switch (propIndex)
                            //    {
                            //        case 0:
                            //            valueNumberList.Add((keyframe.value * -1f) / 180f * (float)Math.PI);
                            //            // inWeightList.Add(keyframe.inWeight);
                            //            inTangentNumberList.Add(keyframe.inTangent * -1f);
                            //            // outWeightList.Add(keyframe.outWeight);
                            //            outTangentNumberList.Add(keyframe.outTangent * -1f);
                            //            // weightModes.Add(keyframe.weightedMode);
                            //            break;
                            //        case 1:
                            //            valueNumberList.Add((180f - keyframe.value) / 180f * (float)Math.PI);
                            //            // inWeightList.Add(keyframe.inWeight);
                            //            inTangentNumberList.Add(keyframe.inTangent * -1f);
                            //            // outWeightList.Add(keyframe.outWeight);
                            //            outTangentNumberList.Add(keyframe.outTangent * -1f);
                            //            // weightModes.Add(keyframe.weightedMode);
                            //            break;
                            //        default:
                            //            valueNumberList.Add(keyframe.value / 180f * (float)Math.PI);
                            //            // inWeightList.Add(keyframe.inWeight);
                            //            inTangentNumberList.Add(keyframe.inTangent);
                            //            // outWeightList.Add(keyframe.outWeight);
                            //            outTangentNumberList.Add(keyframe.outTangent);
                            //            // weightModes.Add(keyframe.weightedMode);
                            //            break;
                            //    }
                            //}
                            //else
                            if (propIndex == 1 || propIndex == 2)
                            {
                                valueNumberList.Add(keyframe.value * -1f / 180f * (float)Math.PI);
                                // inWeightList.Add(keyframe.inWeight);
                                inTangentNumberList.Add(keyframe.inTangent * -1f);
                                // outWeightList.Add(keyframe.outWeight);
                                outTangentNumberList.Add(keyframe.outTangent * -1f);
                                // weightModes.Add(keyframe.weightedMode);
                            }
                            else
                            {
                                valueNumberList.Add(keyframe.value / 180f * (float)Math.PI);
                                // inWeightList.Add(keyframe.inWeight);
                                inTangentNumberList.Add(keyframe.inTangent);
                                // outWeightList.Add(keyframe.outWeight);
                                outTangentNumberList.Add(keyframe.outTangent);
                                // weightModes.Add(keyframe.weightedMode);
                            }
                            EditorUtility.DisplayDialog("错误", "微信方案不支持欧拉角动画", "这就去改成四元数");
                            throw new Exception(this.GetExportPath() + " Can't support euler animation");
                        }
                        else
                        {
                            valueNumberList.Add(keyframe.value);
                            // inWeightList.Add(keyframe.inWeight);
                            inTangentNumberList.Add(keyframe.inTangent);
                            // outWeightList.Add(keyframe.outWeight);
                            outTangentNumberList.Add(keyframe.outTangent);
                            // weightModes.Add(keyframe.weightedMode);
                        }
                        propIndex++;
                    }
                    frameData.valueNumbers = valueNumberList;
                    // frameData.inWeights = inWeightList;
                    frameData.inTangentNumbers = inTangentNumberList;
                    // frameData.outWeights = outWeightList;
                    frameData.outTangentNumbers = outTangentNumberList;
                    // frameData.weightModes = weightModes;
                    aniNodeFrameDatas.Add(frameData);
                }
                aniNodeData.keyFrameCount = (ushort)customAnimationClipCurveDataKeyFrames.Length;
                aniNodeData.aniNodeFrameDatas = aniNodeFrameDatas;
                animationNodeList.Add(aniNodeData);
            }
            List<PathInfo> pathInfoList = new List<PathInfo>();
            for (int i = 0; i < animationNodeList.Count; i++)
            {
                string propValue = "";
                aniNodeData = animationNodeList[i];
                for (int j = 0; j < aniNodeData.propertyNameLength; j++)
                {
                    int id = aniNodeData.propertyNameIndex[j];
                    if (j == 0)
                    {
                        propValue += names[id];
                    }
                    else
                    {
                        propValue += "." + names[id];
                    }
                }
                propValue = aniNodeData.typeName + "." + propValue;

                int[] selfTypeArray = new int[0];
                switch (aniNodeData.type)
                {
                    case 1:
                        selfTypeArray = new int[] { 1, 2, 3 };
                        break;
                    case 2:
                        selfTypeArray = new int[] { 7, 8, 9, 10 };
                        break;
                    case 3:
                        selfTypeArray = new int[] { 4, 5, 6 };
                        break;
                    case 4:
                        selfTypeArray = new int[] { 11, 12, 13 };
                        break;
                    default:
                        break;
                }

                List<PropInfo> props = new List<PropInfo>();
                if (selfTypeArray.Length != 0)
                {
                    for (int j = 0; j < selfTypeArray.Length; j++)
                    {
                        int type = selfTypeArray[j];
                        PropInfo data = new PropInfo { type = (uint)type, keyFrameCount = (uint)aniNodeData.keyFrameCount };
                        props.Add(data);
                    }
                    PathInfo pathInfo = new PathInfo
                    {
                        prop = props,
                        isMeta = false,
                        name = "",
                    };
                    pathInfoList.Add(pathInfo);
                }
                else
                {
                    PropInfo data = new PropInfo { type = (uint)0, keyFrameCount = (uint)aniNodeData.keyFrameCount };
                    props.Add(data);
                    PathInfo pathInfo = new PathInfo
                    {
                        prop = props,
                        isMeta = true,
                        name = propValue,
                    };
                    pathInfoList.Add(pathInfo);
                }
            }

            for (int i = 0; i < animationNodeList.Count; i++)
            {
                string nodeIdValue = "";
                aniNodeData = animationNodeList[i];
                for (int j = 0; j < aniNodeData.pathLength; j++)
                {
                    int id = aniNodeData.pathIndex[j];
                    if (j == 0)
                    {
                        nodeIdValue += names[id];
                    }
                    else
                    {
                        nodeIdValue += "/" + names[id];
                    }
                }
                nodeIdValue = "/" + nodeIdValue;

                int[] selfTypeArray = new int[0];
                switch (aniNodeData.type)
                {
                    case 1:
                        selfTypeArray = new int[] { 1, 2, 3 };
                        break;
                    case 2:
                        selfTypeArray = new int[] { 7, 8, 9, 10 };
                        break;
                    case 3:
                        selfTypeArray = new int[] { 4, 5, 6 };
                        break;
                    case 4:
                        selfTypeArray = new int[] { 11, 12, 13 };
                        break;
                    default:
                        break;
                }
                List<CurveInfo> curveData = new List<CurveInfo>();
                if (selfTypeArray.Length != 0)
                {
                    for (int j = 0; j < selfTypeArray.Length; j++)
                    {
                        int type = selfTypeArray[j];
                        for (int k = 0; k < aniNodeData.keyFrameCount; k++)
                        {
                            AniNodeFrameData aniNodeFrameData = aniNodeData.aniNodeFrameDatas[k];
                            ushort timeIndex = aniNodeFrameData.startTimeIndex;
                            double frameId = Math.Round(keyFrameTimes[timeIndex] * frameRate, 0);

                            CurveInfo data = new CurveInfo
                            {
                                // keyframe.time * frameRate Int32
                                frameId = (uint)frameId,
                                // keyframe.value[typeindex]
                                valueNumber = (float)aniNodeFrameData.valueNumbers[j],
                                // keyframe.inTangent[typeindex]
                                // inWeight = (float)aniNodeFrameData.inWeights[j],
                                inTangentNumber = (float)aniNodeFrameData.inTangentNumbers[j],
                                // keyframe.outTangent[typeindex]
                                // outWeight = (float)aniNodeFrameData.outWeights[j],
                                outTangentNumber = (float)aniNodeFrameData.outTangentNumbers[j],
                                // weightMode = aniNodeFrameData.weightModes[j],
                            };
                            curveData.Add(data);
                        }
                    }
                }
                else
                {
                    for (int k = 0; k < aniNodeData.keyFrameCount; k++)
                    {
                        AniNodeFrameData aniNodeFrameData = aniNodeData.aniNodeFrameDatas[k];
                        ushort timeIndex = aniNodeFrameData.startTimeIndex;
                        double frameId = Math.Round(keyFrameTimes[timeIndex] * frameRate, 0);

                        CurveInfo data = new CurveInfo
                        {
                            // keyframe.time * frameRate Int32
                            frameId = (uint)frameId,
                            // keyframe.value[typeindex]
                            valueNumber = (float)aniNodeFrameData.valueNumbers[0],
                            // keyframe.inTangent[typeindex]
                            // inWeight = (float)aniNodeFrameData.inWeights[0],
                            inTangentNumber = (float)aniNodeFrameData.inTangentNumbers[0],
                            // keyframe.outTangent[typeindex]
                            // outWeight = (float)aniNodeFrameData.outWeights[0],
                            outTangentNumber = (float)aniNodeFrameData.outTangentNumbers[0],
                            // weightMode = aniNodeFrameData.weightModes[0],
                        };
                        curveData.Add(data);
                    }
                }
                var info = pathInfoList[i];
                info.curve = curveData;
                pathInfoArray.Add(new KeyValuePair<string, PathInfo>(nodeIdValue, info));

            }
        }


        private string _fileName = null;

        public int FrameRate { get; private set; }

    }
}
