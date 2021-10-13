using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEditor;

namespace WeChat {
    [Serializable]
    //[WXPostProcessEditor(typeof(BloomEditor))]
    [WXPostProcessEffectName("Bloom")]
    public sealed class WXPostProcessEffectBloom : WXPostProcessEffectSetting
    {
        const int BoxDownPrefilterPass = 0;
        const int BoxDownPass = 1;
        const int BoxUpPass = 2;
        const int ApplyBloomPass = 3;
        const int DebugBloomPass = 4;

        [Range(0f, 5f)]
        public float intensity = 1f;

        [Range(1, 16)]
        public int iterations = 4;

        [Range(0, 10)]
        public float threshold = 1;

        [Range(0, 1)]
        public float softThreshold = 0.5f;

        [HideInInspector]
        [NonSerialized]
        public Shader bloomShader;

        public bool debug;

        [NonSerialized]
        RenderTexture[] textures = new RenderTexture[16];

        [NonSerialized]
        Material bloom;

        void OnEnable()
        {
            bloomShader = Shader.Find("WXPostProcess/Bloom");
            bloom = new Material(bloomShader);
        }

        public override void OnRender(RenderTexture source, RenderTexture destination)
        {
            

            if (bloom == null)
            {
                bloom = new Material(bloomShader);
                bloom.hideFlags = HideFlags.HideAndDontSave;
            }

            float knee = threshold * softThreshold;
            Vector4 filter;
            filter.x = threshold;
            filter.y = filter.x - knee;
            filter.z = 2f * knee;
            filter.w = 0.25f / (knee + 0.00001f);
            bloom.SetVector("_Filter", filter);
            bloom.SetFloat("_Intensity", Mathf.GammaToLinearSpace(intensity));

            //Graphics.Blit(source, destination, bloom, 0);
            //return;

            int width = source.width / 2;
            int height = source.height / 2;
            RenderTextureFormat format = source.format;

            RenderTexture currentDestination = textures[0] =
                RenderTexture.GetTemporary(width, height, 0, format);
            Graphics.Blit(source, currentDestination, bloom, BoxDownPrefilterPass);
            RenderTexture currentSource = currentDestination;

            int i = 1;
            for (; i < iterations; i++)
            {
                width /= 2;
                height /= 2;
                if (height < 2)
                {
                    break;
                }
                currentDestination = textures[i] =
                    RenderTexture.GetTemporary(width, height, 0, format);
                Graphics.Blit(currentSource, currentDestination, bloom, BoxDownPass);
                currentSource = currentDestination;
            }

            for (i -= 2; i >= 0; i--)
            {
                currentDestination = textures[i];
                textures[i] = null;
                Graphics.Blit(currentSource, currentDestination, bloom, BoxUpPass);
                RenderTexture.ReleaseTemporary(currentSource);
                currentSource = currentDestination;
            }

            if (debug)
            {
                Graphics.Blit(currentSource, destination, bloom, DebugBloomPass);
            }
            else
            {
                bloom.SetTexture("_SourceTex", source);
                Graphics.Blit(currentSource, destination, bloom, ApplyBloomPass);
            }
            RenderTexture.ReleaseTemporary(currentSource);
        }

        public override JSONObject Export()
        {
            JSONObject m_json = new JSONObject(JSONObject.Type.OBJECT);
            m_json.AddField("type", "bloom");
            JSONObject m_data = new JSONObject(JSONObject.Type.OBJECT);
            m_json.AddField("data", m_data);

            m_data.AddField("intensity", this.intensity);
            m_data.AddField("threshold", this.threshold);
            m_data.AddField("softThreshold", this.softThreshold);
            m_data.AddField("iterations", this.iterations);

            return m_json;
        }
    }
}


