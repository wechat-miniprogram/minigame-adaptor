using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;

namespace WeChat
{

    public class WXTrailRenderer : WXComponent
    {
        private TrailRenderer renderer;

        public override string getTypeName()
        {
            return "TrailRenderer";
        }

        public WXTrailRenderer(TrailRenderer renderer)
        {
            this.renderer = renderer;
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject data = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("type", "TrailRenderer");
            json.AddField("data", data);

            JSONObject materialArray = new JSONObject(JSONObject.Type.ARRAY);
            Material[] materials = renderer.sharedMaterials;
            foreach (Material material in materials)
            {
                WXMaterial materialConverter = new WXMaterial(material, renderer);
                string materialPath = materialConverter.Export(context.preset);
                materialArray.Add(materialPath);
                context.AddResource(materialPath);
            }
            data.AddField("materials", materialArray);

            ShadowCastingMode mode = renderer.shadowCastingMode;
            StaticEditorFlags shadowFlags = GameObjectUtility.GetStaticEditorFlags(renderer.gameObject);
            if (mode == ShadowCastingMode.Off || (shadowFlags & StaticEditorFlags.LightmapStatic) != 0)
            {
                data.AddField("castShadow", false);
            }
            else
            {
                data.AddField("castShadow", true);
            }

            bool receiveShadow = renderer.receiveShadows;
            data.AddField("receiveShadow", receiveShadow);

            int alignmentNum = 0;
#if UNITY_2017_1_OR_NEWER
            LineAlignment alignment = renderer.alignment;
            switch (alignment)
            {
                case LineAlignment.View:
                    alignmentNum = 0;
                    break;
    #if UNITY_2018_2_OR_NEWER
                case LineAlignment.TransformZ:
                    alignmentNum = 1;
                    break;
    #else
                case LineAlignment.Local:
                    alignmentNum = 1;
                    break;
    #endif
            }
            data.AddField("alignment", alignmentNum);
#endif

            Color startColor = renderer.startColor;
            data.AddField("startColor", parseColor(startColor));

            Color endColor = renderer.endColor;
            data.AddField("endColor", parseColor(endColor));

            float startWidth = renderer.startWidth;
            data.AddField("startWidth", startWidth);

            float endWidth = renderer.endWidth;
            data.AddField("endWidth", endWidth);

            float time = renderer.time;
            data.AddField("time", time);

            LineTextureMode textureMode = renderer.textureMode;
            int textureModeNum = 0;
            switch (textureMode)
            {
                case LineTextureMode.Stretch:
                    textureModeNum = 0;
                    break;
                case LineTextureMode.Tile:
                    textureModeNum = 1;
                    break;
            }
            data.AddField("textureMode", textureModeNum);

            data.AddField("numCapVertices", renderer.numCapVertices);
            data.AddField("numCornerVertices", renderer.numCornerVertices);
            data.AddField("minVertexDistance", renderer.minVertexDistance);

            data.AddField("gColor", GetGradientColor(renderer.colorGradient));

            data.AddField("widthCurve", GetCurveData(renderer.widthCurve));
            data.AddField("widthMultiplier", renderer.widthMultiplier);

            return json;
        }

        private JSONObject parseColor(Color color)
        {
            JSONObject jSONObject = new JSONObject(JSONObject.Type.ARRAY);
            jSONObject.Add(color.r);
            jSONObject.Add(color.g);
            jSONObject.Add(color.b);
            jSONObject.Add(color.a);
            return jSONObject;
        }

        private JSONObject GetGradientColor(Gradient gcolor)
        {
            JSONObject res = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject alphaKey = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject colorKey = new JSONObject(JSONObject.Type.ARRAY);
            res.AddField("alpha", alphaKey);
            res.AddField("color", colorKey);
            GradientMode gradientMode = gcolor.mode;
            if (gradientMode == GradientMode.Blend)
            {
                res.AddField("mode", 1);
            }
            if (gradientMode == GradientMode.Fixed)
            {
                res.AddField("mode", 2);
            }
            GradientAlphaKey[] alphaKeys = gcolor.alphaKeys;
            for (var i = 0; i < alphaKeys.Length; i++)
            {
                GradientAlphaKey alphaKeyframe = alphaKeys[i];
                alphaKey.Add(alphaKeyframe.time);
                alphaKey.Add(alphaKeyframe.alpha * 255);
            }
            GradientColorKey[] colorKeys = gcolor.colorKeys;
            for (var i = 0; i < colorKeys.Length; i++)
            {
                GradientColorKey colorKeyframe = colorKeys[i];
                colorKey.Add(colorKeyframe.time);
                colorKey.Add(colorKeyframe.color.r * 255);
                colorKey.Add(colorKeyframe.color.g * 255);
                colorKey.Add(colorKeyframe.color.b * 255);
                colorKey.Add(colorKeyframe.color.a * 255);
            }
            return res;
        }

        private JSONObject GetCurveData(AnimationCurve animationCurve)
        {
            JSONObject HermiteCurve = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject HermiteCurveX = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject HermiteCurveY = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject HermiteCurveIn = new JSONObject(JSONObject.Type.ARRAY);
            JSONObject HermiteCurveOut = new JSONObject(JSONObject.Type.ARRAY);

            HermiteCurve.AddField("x", HermiteCurveX);
            HermiteCurve.AddField("y", HermiteCurveY);
            HermiteCurve.AddField("in", HermiteCurveIn);
            HermiteCurve.AddField("out", HermiteCurveOut);

            Keyframe[] keyframes = animationCurve.keys;
            for (var i = 0; i < keyframes.Length; i++)
            {
                var keyframe = keyframes[i];
                HermiteCurveX.Add(keyframe.time);
                HermiteCurveY.Add(keyframe.value);
                HermiteCurveIn.Add(keyframe.inTangent);
                HermiteCurveOut.Add(keyframe.outTangent);
            }
            return HermiteCurve;
        }
    }
}