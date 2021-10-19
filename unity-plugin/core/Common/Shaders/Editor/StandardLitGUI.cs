//#if UNITY_EDITOR
using System;
using UnityEditor;
using UnityEngine;
namespace WeChat {
    class StandardLitGUI : ShaderGUI {

        public override void AssignNewShaderToMaterial (Material material, Shader oldShader, Shader newShader) {
            material.shader = newShader;
            material.EnableKeyword ("EnableFog");
        }
        public enum RenderMode {
            /**��Ⱦ״̬_��͸����*/
            Opaque = 0,
            /**��Ⱦ״̬_͸�����ԡ�*/
            Cutout = 1,
            /**��Ⱦ״̬_͸����ϡ�*/
            Transparent = 2,
            /**��Ⱦ״̬_�Զ��塣*/
            Custom = 3
        }

        public enum SrcBlendMode {
            //Blend factor is (0, 0, 0, 0).
            Zero = 0,
            //Blend factor is (1, 1, 1, 1).
            One = 1,
            //Blend factor is (Rd, Gd, Bd, Ad).
            DstColor = 2,
            //Blend factor is (Rs, Gs, Bs, As).
            SrcColor = 3,
            //Blend factor is (1 - Rd, 1 - Gd, 1 - Bd, 1 - Ad).
            OneMinusDstColor = 4,
            //Blend factor is (As, As, As, As).
            SrcAlpha = 5,
            //Blend factor is (1 - Rs, 1 - Gs, 1 - Bs, 1 - As).
            OneMinusSrcColor = 6,
            //Blend factor is (Ad, Ad, Ad, Ad).
            DstAlpha = 7,
            //Blend factor is (1 - Ad, 1 - Ad, 1 - Ad, 1 - Ad).
            OneMinusDstAlpha = 8,
            //Blend factor is (f, f, f, 1); where f = min(As, 1 - Ad).
            SrcAlphaSaturate = 9,
            //Blend factor is (1 - As, 1 - As, 1 - As, 1 - As).
            OneMinusSrcAlpha = 10
        }

        public enum DstBlendMode {
            //Blend factor is (0, 0, 0, 0).
            Zero = 0,
            //Blend factor is (1, 1, 1, 1).
            One = 1,
            //Blend factor is (Rd, Gd, Bd, Ad).
            DstColor = 2,
            //Blend factor is (Rs, Gs, Bs, As).
            SrcColor = 3,
            //Blend factor is (1 - Rd, 1 - Gd, 1 - Bd, 1 - Ad).
            OneMinusDstColor = 4,
            //Blend factor is (As, As, As, As).
            SrcAlpha = 5,
            //Blend factor is (1 - Rs, 1 - Gs, 1 - Bs, 1 - As).
            OneMinusSrcColor = 6,
            //Blend factor is (Ad, Ad, Ad, Ad).
            DstAlpha = 7,
            //Blend factor is (1 - Ad, 1 - Ad, 1 - Ad, 1 - Ad).
            OneMinusDstAlpha = 8,
            //Blend factor is (f, f, f, 1); where f = min(As, 1 - Ad).
            SrcAlphaSaturate = 9,
            //Blend factor is (1 - As, 1 - As, 1 - As, 1 - As).
            OneMinusSrcAlpha = 10
        }

        public enum CullMode {
            CULL_NONE = 0,
            CULL_FRONT = 1,
            CULL_BACK = 2,
        }

        public enum DepthWrite {
            OFF = 0,
            ON = 1
        }

        public enum DepthTest {
            OFF = 0,
            Never = 1,
            LESS = 2,
            EQUAL = 3,
            LEQUAL = 4,
            GREATER = 5,
            NOTEQUAL = 6,
            GEQUAL = 7,
            ALWAYS = 8
        }

        public enum LightingMode {
            ON = 0,
            OFF = 1,
        }

        public enum WorkflowMode {
            Specular = 0,
            Metallic
        }

        public enum SmoothnessMapChannel {
            SpecularMetallicAlpha,
            AlbedoAlpha,
        }
        MaterialProperty workflowMode;

        MaterialProperty fog = null;
        MaterialProperty albedoMap = null;
        MaterialProperty albedoColor = null;
        MaterialProperty emissionMap = null;
        MaterialProperty emissionColorForRendering = null;
        MaterialProperty normalMap = null;
        MaterialProperty metallic = null;
        MaterialProperty metallicGlossMap;
        MaterialProperty specColor;
        MaterialProperty specGlossMap;
        MaterialProperty smoothness;
        MaterialProperty smoothnessScale;
        MaterialProperty smoothnessMapChannel;
        MaterialProperty occlusionMap = null;
        MaterialProperty clearCoat = null;
        MaterialProperty clearCoatRoughness = null;
        MaterialProperty cullMode = null;
        MaterialProperty renderMode = null;
        MaterialProperty alphaTest = null;
        MaterialProperty alphaCutoff = null;
        MaterialProperty alphaBlend = null;
        MaterialProperty srcBlendMode = null;
        MaterialProperty dstBlendMode = null;
        MaterialProperty depthWrite = null;
        MaterialProperty depthTest = null;
        MaterialEditor m_MaterialEditor;

        bool m_FirstTimeApply = true;
        bool m_ClearCoatMode = false;

        public void FindProperties (MaterialProperty[] props) {

            workflowMode = FindProperty ("_WorkflowMode", props);
            fog = FindProperty ("_Fog", props);
            albedoMap = FindProperty ("_MainTex", props);
            albedoColor = FindProperty ("_Color", props);
            emissionMap = FindProperty ("_EmissionMap", props);
            emissionColorForRendering = FindProperty ("_EmissionColor", props);
            normalMap = FindProperty ("_NormalMap", props);
            metallicGlossMap = FindProperty ("_MetallicGlossMap", props);
            metallic = FindProperty ("_Metallic", props, false);
            specGlossMap = FindProperty ("_SpecGlossMap", props);
            specColor = FindProperty ("_Specular", props);
            smoothness = FindProperty ("_Glossiness", props);
            smoothnessScale = FindProperty ("_GlossMapScale", props, false);
            smoothnessMapChannel = FindProperty ("_SmoothnessTextureChannel", props, false);

            occlusionMap = FindProperty ("_OcclusionMap", props);

            try {
                clearCoat = FindProperty ("_ClearCoat", props, false);
                clearCoatRoughness = FindProperty ("_ClearCoatRoughness", props, false);
                m_ClearCoatMode = true;
            } catch (System.Exception) {
                m_ClearCoatMode = false;
            }

            renderMode = FindProperty ("_Mode", props);
            cullMode = FindProperty ("_Cull", props);

            alphaTest = FindProperty ("_AlphaTest", props, false);
            alphaCutoff = FindProperty ("_Cutoff", props, false);

            alphaBlend = FindProperty ("_AlphaBlend", props, false);
            srcBlendMode = FindProperty ("_SrcBlend", props);
            dstBlendMode = FindProperty ("_DstBlend", props);

            depthWrite = FindProperty ("_ZWrite", props);
            depthTest = FindProperty ("_ZTest", props);
        }

        public override void OnGUI (MaterialEditor materialEditor, MaterialProperty[] props) {
            // render the default gui
            FindProperties (props);
            m_MaterialEditor = materialEditor;
            Material material = m_MaterialEditor.target as Material;

            if (m_FirstTimeApply) {
                onChangeRender (material, (RenderMode) material.GetFloat ("_Mode"));
                m_FirstTimeApply = false;
            }
            ShaderPropertiesGUI (material);
        }

        public void ShaderPropertiesGUI (Material material) {
            // Use default labelWidth
            EditorGUIUtility.labelWidth = 0f;

            // // Detect any changes to the material
            EditorGUI.BeginChangeCheck (); {
                //WorkFlow
                DoPopup (Styles.workflowModeText, workflowMode, Styles.workflowNames);

                //RenderMode
                DoPopup (Styles.renderModeText, renderMode, Styles.renderModeNames);

                //FogMode
                DoPopup (Styles.fogModeText, fog, Styles.lightingNames);

                //Primary props
                GUILayout.Label (Styles.PrimaryText, EditorStyles.boldLabel);

                DoAlbedoArea ();

                DoMetallicSpecularArea ();

                DoNormalArea ();

                m_MaterialEditor.TexturePropertySingleLine (Styles.occlusionText, occlusionMap, null);

                DoEmissionArea ();

                if (m_ClearCoatMode && clearCoat != null && clearCoatRoughness != null) {
                    m_MaterialEditor.ShaderProperty (clearCoat, Styles.clearCoatText);
                    m_MaterialEditor.ShaderProperty (clearCoatRoughness, Styles.clearCoatRoughnessText);
                }

                //ScaleAndOffset
                m_MaterialEditor.TextureScaleOffsetProperty (albedoMap);

                GUILayout.Box ("", GUILayout.Height (1), GUILayout.ExpandWidth (true));

                DoRenderStates (material);

                if (EditorGUI.EndChangeCheck ()) {
                    SetMaterialKeywords (material);
                    onChangeRender (material, (RenderMode) material.GetFloat ("_Mode"));
                }

            }

            m_MaterialEditor.RenderQueueField ();
        }

        public void onChangeRender (Material material, RenderMode mode) {

            switch (mode) {
                case RenderMode.Opaque:
                    material.SetInt ("_Mode", 0);
                    material.SetInt ("_AlphaTest", 0);
                    material.SetInt ("_AlphaBlend", 0);
                    material.SetInt ("_SrcBlend", (int) UnityEngine.Rendering.BlendMode.One);
                    material.SetInt ("_DstBlend", (int) UnityEngine.Rendering.BlendMode.Zero);
                    material.SetInt ("_ZWrite", 1);
                    material.SetInt ("_ZTest", 4);
                    material.DisableKeyword ("_ALPHATEST_ON");
                    material.DisableKeyword ("_ALPHABLEND_ON");
                    material.DisableKeyword ("ENABLE_ALPHA_CUTOFF");
                    material.renderQueue = (int) UnityEngine.Rendering.RenderQueue.Geometry;
                    break;
                case RenderMode.Cutout:
                    material.SetInt ("_Mode", 1);
                    material.SetInt ("_AlphaTest", 1);
                    material.SetInt ("_AlphaBlend", 0);
                    material.SetInt ("_SrcBlend", (int) UnityEngine.Rendering.BlendMode.One);
                    material.SetInt ("_DstBlend", (int) UnityEngine.Rendering.BlendMode.Zero);
                    material.SetInt ("_ZWrite", 1);
                    material.SetInt ("_ZTest", 4);
                    material.EnableKeyword ("_ALPHATEST_ON");
                    material.DisableKeyword ("_ALPHABLEND_ON");
                    material.EnableKeyword ("ENABLE_ALPHA_CUTOFF");
                    material.renderQueue = (int) UnityEngine.Rendering.RenderQueue.AlphaTest;
                    break;
                case RenderMode.Transparent:
                    material.SetInt ("_Mode", 2);
                    material.SetInt ("_AlphaTest", 0);
                    material.SetInt ("_AlphaBlend", 1);
                    material.SetInt ("_SrcBlend", (int) UnityEngine.Rendering.BlendMode.SrcAlpha);
                    material.SetInt ("_DstBlend", (int) UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                    material.SetInt ("_ZWrite", 0);
                    material.SetInt ("_ZTest", 4);
                    material.DisableKeyword ("_ALPHATEST_ON");
                    material.EnableKeyword ("_ALPHABLEND_ON");
                    material.DisableKeyword ("ENABLE_ALPHA_CUTOFF");
                    material.renderQueue = (int) UnityEngine.Rendering.RenderQueue.Transparent;
                    break;
                case RenderMode.Custom:
                    material.SetInt ("_Mode", 3);
                    break;
                default:
                    material.SetInt ("_Mode", 0);
                    material.SetInt ("_AlphaTest", 0);
                    material.SetInt ("_AlphaBlend", 0);
                    material.SetInt ("_SrcBlend", (int) UnityEngine.Rendering.BlendMode.One);
                    material.SetInt ("_DstBlend", (int) UnityEngine.Rendering.BlendMode.Zero);
                    material.SetInt ("_ZWrite", 1);
                    material.SetInt ("_ZTest", 4);
                    material.DisableKeyword ("_ALPHATEST_ON");
                    material.DisableKeyword ("_ALPHABLEND_ON");
                    material.DisableKeyword ("ENABLE_ALPHA_CUTOFF");
                    material.renderQueue = (int) UnityEngine.Rendering.RenderQueue.Geometry;
                    break;
            }
        }

        public static class Styles {
            public static GUIStyle optionsButton = "PaneOptions";
            public static GUIContent uvSetLabel = new GUIContent ("UV Set");
            public static GUIContent[] uvSetOptions = new GUIContent[] { new GUIContent ("UV channel 0"), new GUIContent ("UV channel 1") };

            public static string emptyTootip = "";
            public static GUIContent albedoText = new GUIContent ("Albedo", "Albedo (RGB) and Transparency (A)");
            public static GUIContent normalMapText = new GUIContent ("Normal", "Normal");
            public static GUIContent occlusionText = new GUIContent ("Occlusion", "Occlusion");
            public static GUIContent metallicMapText = new GUIContent ("Metallic", "Metallic");
            public static GUIContent clearCoatText = new GUIContent ("ClearCoat", "ClearCoat");
            public static GUIContent clearCoatRoughnessText = new GUIContent ("ClearCoatRoughness", "ClearCoatRoughness");
            public static GUIContent emissionText = new GUIContent ("Emissive", "Emissive");
            public static GUIContent alphaTestText = new GUIContent ("AlphaTest", "AlphaTest");
            public static GUIContent alphaCutoffText = new GUIContent ("Alpha Cutoff", "Threshold for alpha cutoff");
            public static GUIContent alphaBlendText = new GUIContent ("AlphaBlend", "AlphaBlend");
            public static string depthWriteText = "DepthWrite";
            public static string depthTestText = "DepthTest";
            public static string cullModeText = "CullMode";
            public static GUIContent smoothnessScaleText = new GUIContent ("Smoothness", "Smoothness scale factor");
            public static GUIContent specularMapText = new GUIContent ("Specular", "Specular (RGB) and Smoothness (A)");
            public static GUIContent smoothnessText = new GUIContent ("Smoothness", "Smoothness value");
            public static GUIContent smoothnessMapChannelText = new GUIContent ("Source", "Smoothness texture and channel");
            public static string whiteSpaceString = " ";
            public static string PrimaryText = "Primary Properties";
            public static string AdvancedText = "Advanced Properties";
            public static string workflowModeText = "WorkFlow";
            public static string renderModeText = "RenderMode";
            public static string fogModeText = "Fog";
            public static readonly string[] workflowNames = Enum.GetNames (typeof (WorkflowMode));
            public static readonly string[] metallicSmoothnessChannelNames = { "Metallic Alpha", "Albedo Alpha" };
            public static readonly string[] specularSmoothnessChannelNames = { "Specular Alpha", "Albedo Alpha" };

            public static readonly string[] srcBlendNames = Enum.GetNames (typeof (SrcBlendMode));
            public static readonly string[] dstBlendNames = Enum.GetNames (typeof (DstBlendMode));
            public static readonly string[] renderModeNames = Enum.GetNames (typeof (RenderMode));
            public static readonly string[] cullModeNames = Enum.GetNames (typeof (CullMode));
            public static readonly string[] depthWriteNames = Enum.GetNames (typeof (DepthWrite));
            public static readonly string[] depthTestNames = Enum.GetNames (typeof (DepthTest));
            public static readonly string[] lightingNames = Enum.GetNames (typeof (LightingMode));
        }

        protected void DoPopup (string label, MaterialProperty property, string[] options) {
            if (property == null)
                throw new ArgumentNullException ("property");

            EditorGUI.showMixedValue = property.hasMixedValue;

            var mode = property.floatValue;
            EditorGUI.BeginChangeCheck ();
            mode = EditorGUILayout.Popup (label, (int) mode, options);
            if (EditorGUI.EndChangeCheck ()) {
                m_MaterialEditor.RegisterPropertyChangeUndo (label);
                property.floatValue = (float) mode;
            }

            EditorGUI.showMixedValue = false;
        }

        // Do Material Properties
        void DoAlbedoArea () {
            m_MaterialEditor.TexturePropertySingleLine (Styles.albedoText, albedoMap, albedoColor);
        }

        void DoMetallicSpecularArea () {
            string[] metallicSpecSmoothnessChannelName;
            bool hasGlossMap = false;
            if ((WorkflowMode) workflowMode.floatValue == WorkflowMode.Metallic) {
                hasGlossMap = metallicGlossMap.textureValue != null;
                metallicSpecSmoothnessChannelName = Styles.metallicSmoothnessChannelNames;
                m_MaterialEditor.TexturePropertySingleLine (Styles.metallicMapText, metallicGlossMap, hasGlossMap ? null : metallic);
            } else {
                hasGlossMap = specGlossMap.textureValue != null;
                metallicSpecSmoothnessChannelName = Styles.specularSmoothnessChannelNames;
                m_MaterialEditor.TexturePropertySingleLine (Styles.specularMapText, specGlossMap, hasGlossMap ? null : specColor);
            }

            bool showSmoothnessScale = hasGlossMap;
            if (smoothnessMapChannel != null) {
                int smoothnessChannel = (int) smoothnessMapChannel.floatValue;
                if (smoothnessChannel == (int) SmoothnessMapChannel.AlbedoAlpha)
                    showSmoothnessScale = true;
            }

            int indentation = 2; // align with labels of texture props
            m_MaterialEditor.ShaderProperty (showSmoothnessScale ? smoothnessScale : smoothness, showSmoothnessScale ? Styles.smoothnessScaleText : Styles.smoothnessText, indentation);

            int prevIndentLevel = EditorGUI.indentLevel;
            EditorGUI.indentLevel = 3;
            if (smoothnessMapChannel != null)
                DoPopup (Styles.smoothnessMapChannelText.text, smoothnessMapChannel, metallicSpecSmoothnessChannelName);
            EditorGUI.indentLevel = prevIndentLevel;
        }

        void DoNormalArea () {
            m_MaterialEditor.TexturePropertySingleLine (Styles.normalMapText, normalMap);
        }

        void DoEmissionArea () {
            bool hadEmissionTexture = emissionMap.textureValue != null;

            // Texture and HDR color controls
            m_MaterialEditor.TexturePropertySingleLine (Styles.emissionText, emissionMap, emissionColorForRendering);

            // If texture was assigned and color was black set color to white
            float brightness = emissionColorForRendering.colorValue.maxColorComponent;
            if (emissionMap.textureValue != null && !hadEmissionTexture && brightness <= 0f) {
                emissionColorForRendering.colorValue = Color.white;
            }
        }

        void DoRenderStates (Material material) {
            //Advanced props
            GUILayout.Label (Styles.AdvancedText, EditorStyles.boldLabel);

            //AlphaTest
            m_MaterialEditor.ShaderProperty (alphaTest, Styles.alphaTestText);
            if (alphaTest.floatValue == 1) {
                m_MaterialEditor.ShaderProperty (alphaCutoff, Styles.alphaCutoffText, MaterialEditor.kMiniTextureFieldLabelIndentLevel + 1);
            }

            //AlphaBlend
            m_MaterialEditor.ShaderProperty (alphaBlend, Styles.alphaBlendText);
            var dstMode = (DstBlendMode) dstBlendMode.floatValue;
            var srcMode = (SrcBlendMode) srcBlendMode.floatValue;
            if (alphaBlend.floatValue == 1) {
                GUILayout.BeginHorizontal ();
                GUILayout.Label ("", GUILayout.Width (20));
                srcMode = (SrcBlendMode) EditorGUILayout.Popup ((int) srcMode, Styles.srcBlendNames);
                dstMode = (DstBlendMode) EditorGUILayout.Popup ((int) dstMode, Styles.dstBlendNames);
                GUILayout.EndHorizontal ();
            }
            if ((RenderMode) material.GetFloat ("_Mode") == RenderMode.Custom) {
                //alphaBlend
                if (alphaBlend.floatValue == 1) {
                    srcBlendMode.floatValue = (float) srcMode;
                    dstBlendMode.floatValue = (float) dstMode;
                    material.SetInt ("_SrcBlend", (int) srcMode);
                    material.SetInt ("_DstBlend", (int) dstMode);
                    material.SetInt ("_AlphaBlend", 1);
                } else {
                    material.SetInt ("_AlphaBlend", 0);
                    material.SetInt ("_SrcBlend", (int) 1);
                    material.SetInt ("_DstBlend", (int) 0);
                }
            }

            //DepthWrite
            DoPopup (Styles.depthWriteText, depthWrite, Styles.depthWriteNames);

            //DepthTest
            DoPopup (Styles.depthTestText, depthTest, Styles.depthTestNames);

            //CullMode
            DoPopup (Styles.cullModeText, cullMode, Styles.cullModeNames);

        }

        static void SetKeyword(Material material, string keyword, bool enableValue){
            if(enableValue){
                material.EnableKeyword(keyword);
            }else{
                material.DisableKeyword(keyword);
            }
        }
        
        void SetMaterialKeywords (Material material) {
            m_MaterialEditor.RegisterPropertyChangeUndo ("Rendering Mode");
            
            if ((RenderMode) material.GetFloat ("_Mode") == RenderMode.Custom) {
                SetKeyword(material, "ENABLE_ALPHA_CUTOFF", alphaTest.floatValue == 1);
                SetKeyword(material, "_ALPHATEST_ON", alphaTest.floatValue == 1);
                SetKeyword(material, "_ALPHABLEND_ON", alphaBlend.floatValue == 1);
            }

            //Fog
            SetKeyword(material, "EnableFog", fog.floatValue == 0);

            // workflow
            bool isSpecularWorkFlow = (WorkflowMode)material.GetFloat("_WorkflowMode") == WorkflowMode.Specular;
            
            // glossmap
            bool hasGlossMap = false;
            if (isSpecularWorkFlow)
                hasGlossMap = material.GetTexture("_SpecGlossMap");
            else
                hasGlossMap = material.GetTexture("_MetallicGlossMap");

            SetKeyword(material, "_SPECULAR_SETUP", isSpecularWorkFlow);
            SetKeyword(material, "USE_METALLICSPECGLOSSMAP", hasGlossMap);
            SetKeyword(material, "USE_SPECGLOSSMAP", hasGlossMap && isSpecularWorkFlow);
            SetKeyword(material, "USE_METALLICGLOSSMAP", hasGlossMap && !isSpecularWorkFlow);
            
            SetKeyword(material, "USE_NORMALMAP", normalMap.textureValue != null);
            SetKeyword(material, "USE_AOMAP", occlusionMap.textureValue != null);
            SetKeyword(material, "USE_EMISSIONMAP", emissionMap.textureValue != null);

            if (material.HasProperty("_SmoothnessTextureChannel"))
            {
                SetKeyword(material, "_SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A", (SmoothnessMapChannel)smoothnessMapChannel.floatValue == SmoothnessMapChannel.AlbedoAlpha);
            }
        }

    }
}

//#endif