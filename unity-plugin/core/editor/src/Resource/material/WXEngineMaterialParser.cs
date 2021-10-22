using System;
using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;


namespace WeChat
{
    [InitializeOnLoad]
    public abstract class WXMaterialParser
    {
        static WXMaterialParser()
        {
            WXMaterial.registerParser("WXBBShader/Line", new WXLineParser());
            WXMaterial.registerParser("WXBBShader/Trail", new WXTrailParser());
            WXMaterial.registerParser("WXBBShader/BlinnPhong", new WXBlinnPhongNewParser());
            WXMaterial.registerParser("WXBBShader/Effect", new WXEffectParser());
            WXMaterial.registerParser("WXBBShader/ShurikenParticle", new WXShurikenParticleParser());
            WXMaterial.registerParser("WXBBShader/StandardLit", new WXStandardLitParser());
			WXMaterial.registerParser("WXBBShader/Skybox", new WXSkyBoxParser());
        }

        public enum EnumGfxBlendFactor
        {
            ZERO = 1,
            ONE = 2,
            SRC_COLOR = 3,
            ONE_MINUS_SRC_COLOR = 4,
            SRC_ALPHA = 5,
            ONE_MINUS_SRC_ALPHA = 6,
            DST_COLOR = 7,
            ONE_MINUS_DST_COLOR = 8,
            DST_ALPHA = 9,
            ONE_MINUS_DST_ALPHA = 10,
            SRC_ALPHA_SATURATED = 11,
            BLEND_COLOR = 12,
            ONE_MINUS_BLEND_COLOR = 13,
            BLEND_ALPHA = 14,
            ONE_MINUS_BLEND_ALPHA = 15,

        }

        public enum EnumGfxBlendOp
        {
            ADD = 1,
            SUBTRACT = 2,
            REVERSE_SUBTRACT = 3,
        }

        public enum EnumGfxCompareFunc
        {
            NEVER = 1,
            LESS = 2,
            EQUAL = 3,
            LESS_EQUAL = 4,
            GREATER = 5,
            NOT_EQUAL = 6,
            GREATER_EQUAL = 7,
            ALWAYS = 8,
        }

        public enum EnumGfxCullMode
        {
            NONE = 1,
            FRONT = 2,
            BACK = 3,
        }

        public delegate string DependenciesAdder(WXResource resource);
        protected DependenciesAdder dependenciesAdder;
        private JSONObject m_textures;
        private JSONObject m_shaderParams;
        private JSONObject m_renderStates;
        private JSONObject m_shaderDefinations;
        protected JSONObject m_mainJson;
        protected Material m_material;


        public JSONObject parse(WXMaterial wxbb_material, DependenciesAdder AddDependencies)
        {
            dependenciesAdder = AddDependencies;
            m_material = wxbb_material.GetMaterial();
            m_mainJson = new JSONObject(JSONObject.Type.OBJECT);
            m_textures = new JSONObject(JSONObject.Type.OBJECT);
            m_shaderParams = new JSONObject(JSONObject.Type.OBJECT);
            m_renderStates = new JSONObject(JSONObject.Type.OBJECT);
            m_shaderDefinations = new JSONObject(JSONObject.Type.OBJECT);
            m_mainJson.AddField("effect", "@system/blinnPhong3d");
            m_mainJson.AddField("textures", m_textures);
            m_mainJson.AddField("shaderParams", m_shaderParams);
            m_mainJson.AddField("renderStates", m_renderStates);
            m_mainJson.AddField("renderQueue", m_material.renderQueue);
            m_mainJson.AddField("shaderDefinations", m_shaderDefinations);
            // m_material = wxbb_material.material;
            onParse(wxbb_material);
            return m_mainJson;
        }
        abstract public void onParse(WXMaterial wxbb_material);

        /*
            Effect name
         */
        virtual protected void SetEffect(string effect)
        {
            m_mainJson.SetField("effect", "__mgePrefix__" + effect);
        }

        /*
            Shader textures
         */
        protected void AddTexture(string key, string shaderPropertyKey)
        {
            string picturePath = "white";
            if (m_material.HasProperty(shaderPropertyKey))
            {
                Texture tex = m_material.GetTexture(shaderPropertyKey);
                if (tex != null)
                {
                    if (tex is Texture2D)
                    {
                        picturePath = dependenciesAdder(new WXTexture((Texture2D)tex));
                    }
                    else if (tex is Cubemap)
                    {
                        picturePath = dependenciesAdder(new WXTextureCube((Cubemap)tex));
                    }
                }
            }
            m_textures.AddField(key, picturePath);
        }

        /*
            Shader defination, allow bool, int, float
         */
        protected void AddShaderDefination(string key, bool isOn)
        {
            m_shaderDefinations.AddField(key, isOn);
        }
        protected void AddShaderDefination(string key, int val)
        {
            m_shaderDefinations.AddField(key, val);
        }
        protected void AddShaderDefination(string key, float val)
        {
            m_shaderDefinations.AddField(key, val);
        }

        /*
            Shader params, allow color, vector2/3/4, float
         */
        protected void AddShaderParam(string key, Color color, bool withAlpha)
        {
            JSONObject arr = new JSONObject(JSONObject.Type.ARRAY);
            arr.Add(color.r);
            arr.Add(color.g);
            arr.Add(color.b);
            if (withAlpha)
            {
                arr.Add(color.a);
            }
            m_shaderParams.AddField(key, arr);
        }
        protected void AddShaderParam(String key, float[] vector)
        {
            JSONObject val = new JSONObject(JSONObject.Type.ARRAY);
            for (int i = 0; i < vector.Length; i++)
            {
                val.Add(vector[i]);
            }
            m_shaderParams.AddField(key, val);
        }
        protected void AddShaderParam(String key, float val)
        {
            JSONObject arr = new JSONObject(JSONObject.Type.ARRAY);
            arr.Add(val);
            m_shaderParams.AddField(key, arr);
        }
        protected void SetBlendOn(bool on)
        {
            m_renderStates.AddField("blendOn", on);
        }
        protected void SetBlendFactor(EnumGfxBlendFactor blendSrc, EnumGfxBlendFactor blendDst)
        {
            m_renderStates.AddField("blendSrc", (int)blendSrc);
            m_renderStates.AddField("blendDst", (int)blendDst);

        }
        protected void SetDepthWrite(bool on)
        {
            m_renderStates.AddField("depthWrite", on);
        }
        protected void SetDepthTest(EnumGfxCompareFunc comp)
        {
            m_renderStates.AddField("depthTestComp", (int)comp);
        }
        protected void SetCullMode(EnumGfxCullMode cull)
        {
            m_renderStates.AddField("cullOn", true);
            m_renderStates.AddField("cullFace", (int)cull);
        }

        /*
            Convert Unity BlendFactor To Gfx (eg. BlendSrc/BlendDst)
         */
        protected EnumGfxBlendFactor ConvertBlendFactor(int unityFactor)
        {
            switch ((UnityEngine.Rendering.BlendMode)unityFactor)
            {
                case UnityEngine.Rendering.BlendMode.Zero:
                    return EnumGfxBlendFactor.ZERO;
                case UnityEngine.Rendering.BlendMode.One:
                    return EnumGfxBlendFactor.ONE;
                case UnityEngine.Rendering.BlendMode.DstColor:
                    return EnumGfxBlendFactor.DST_COLOR;
                case UnityEngine.Rendering.BlendMode.SrcColor:
                    return EnumGfxBlendFactor.SRC_COLOR;
                case UnityEngine.Rendering.BlendMode.OneMinusDstColor:
                    return EnumGfxBlendFactor.ONE_MINUS_DST_COLOR;
                case UnityEngine.Rendering.BlendMode.SrcAlpha:
                    return EnumGfxBlendFactor.SRC_ALPHA;
                case UnityEngine.Rendering.BlendMode.OneMinusSrcColor:
                    return EnumGfxBlendFactor.ONE_MINUS_SRC_COLOR;
                case UnityEngine.Rendering.BlendMode.DstAlpha:
                    return EnumGfxBlendFactor.DST_ALPHA;
                case UnityEngine.Rendering.BlendMode.OneMinusDstAlpha:
                    return EnumGfxBlendFactor.ONE_MINUS_DST_ALPHA;
                case UnityEngine.Rendering.BlendMode.SrcAlphaSaturate:
                    return EnumGfxBlendFactor.SRC_ALPHA_SATURATED;
                case UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha:
                    return EnumGfxBlendFactor.ONE_MINUS_SRC_ALPHA;
                default:
                    // invalid
                    return EnumGfxBlendFactor.ONE;
            }
        }

        /*
            Convert Unity Compare Function To Gfx (eg. ZTest/StencilTest)
         */
       protected EnumGfxCompareFunc ConvertCompareFunc(int unityFactor)
        {
            switch ((UnityEngine.Rendering.CompareFunction)unityFactor)
            {
                // disable compare = always pass
                case UnityEngine.Rendering.CompareFunction.Disabled:
                    return EnumGfxCompareFunc.ALWAYS;
                case UnityEngine.Rendering.CompareFunction.Never:
                    return EnumGfxCompareFunc.NEVER;
                case UnityEngine.Rendering.CompareFunction.Less:
                    //LESS
                    return EnumGfxCompareFunc.LESS;
                case UnityEngine.Rendering.CompareFunction.Equal:
                    //EQUAL
                    return EnumGfxCompareFunc.EQUAL;
                case UnityEngine.Rendering.CompareFunction.LessEqual:
                    //LEQUAL
                    return EnumGfxCompareFunc.LESS_EQUAL;
                case UnityEngine.Rendering.CompareFunction.Greater:
                    //GREATER
                    return EnumGfxCompareFunc.GREATER;
                case UnityEngine.Rendering.CompareFunction.NotEqual:
                    //NOTEQUAL
                    return EnumGfxCompareFunc.NOT_EQUAL;
                case UnityEngine.Rendering.CompareFunction.GreaterEqual:
                    //GEQUAL
                    return EnumGfxCompareFunc.GREATER_EQUAL;
                case UnityEngine.Rendering.CompareFunction.Always:
                    //ALWAYS
                    return EnumGfxCompareFunc.ALWAYS;
                default:
                    // invalid
                    return EnumGfxCompareFunc.LESS_EQUAL;
            }
        }
        /*
            Convert Unity Cull Mode To Gfx (eg. BlendSrc/BlendDst)
         */
        protected EnumGfxCullMode ConvertCullMode(int unityFactor)
        {
            switch ((UnityEngine.Rendering.CullMode)unityFactor)
            {
                case UnityEngine.Rendering.CullMode.Off:
                    return EnumGfxCullMode.NONE;
                case UnityEngine.Rendering.CullMode.Front:
                    return EnumGfxCullMode.FRONT;
                case UnityEngine.Rendering.CullMode.Back:
                    return EnumGfxCullMode.BACK;
                default:
                    // invalid
                    return EnumGfxCullMode.BACK;
            }
        }
    }
}
