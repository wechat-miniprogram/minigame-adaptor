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

        MaterialProperty fog = null;

        MaterialProperty albedoTexture = null;
        MaterialProperty albedoColor = null;

        MaterialProperty emissiveTexture = null;
        MaterialProperty emissiverColor = null;

        MaterialProperty normalTexture = null;
        MaterialProperty metallicTexture = null;
        MaterialProperty smoothnessScale = null;
        MaterialProperty metallic = null;
        MaterialProperty occlusionTexture = null;
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
            fog = FindProperty ("_Fog", props);

            albedoTexture = FindProperty ("_MainTex", props);
            albedoColor = FindProperty ("_Color", props);

            emissiveTexture = FindProperty ("_EmissionMap", props);
            emissiverColor = FindProperty ("_EmissionColor", props);

            normalTexture = FindProperty ("_NormalMap", props);

            metallicTexture = FindProperty ("_MetallicGlossMap", props);

            smoothnessScale = FindProperty ("_GlossMapScale", props, false);

            metallic = FindProperty ("_Metallic", props, false);

            occlusionTexture = FindProperty ("_OcclusionMap", props);
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
            Material material = materialEditor.target as Material;

            if (m_FirstTimeApply) {
                onChangeRender (material, (RenderMode) material.GetFloat ("_Mode"));
                m_FirstTimeApply = false;
            }

            ShaderPropertiesGUI (material);
            Debug.Log("133231");
        }

        public void ShaderPropertiesGUI (Material material) {
            // Use default labelWidth
            EditorGUIUtility.labelWidth = 0f;

            // Detect any changes to the material
            EditorGUI.BeginChangeCheck (); {
                //renderMode
                GUILayout.BeginHorizontal ();
                GUILayout.Label (Styles.renderModeText, GUILayout.Width (120));
                var mode = (RenderMode) renderMode.floatValue;
                mode = (RenderMode) EditorGUILayout.Popup ((int) mode, Styles.renderModeNames);
                GUILayout.EndHorizontal ();

                //fogMode
                GUILayout.BeginHorizontal ();
                GUILayout.Label (Styles.fogModeText, GUILayout.Width (120));
                var fogValue = (LightingMode) fog.floatValue;
                fogValue = (LightingMode) EditorGUILayout.Popup ((int) fogValue, Styles.lightingNames);
                GUILayout.EndHorizontal ();

                //Primary properties
                GUILayout.Label (Styles.PrimaryText, EditorStyles.boldLabel);

                //albedo
                m_MaterialEditor.TexturePropertySingleLine (Styles.albedoText, albedoTexture, albedoColor);

                //mormal
                m_MaterialEditor.TexturePropertySingleLine (Styles.normalMapText, normalTexture);

                // metallic
                bool hasGlossMap = metallicTexture.textureValue != null;
                m_MaterialEditor.TexturePropertySingleLine (Styles.metallicMapText, metallicTexture, hasGlossMap ? null : metallic);

                int indentation = 2; // align with labels of texture properties
                m_MaterialEditor.ShaderProperty (smoothnessScale, Styles.smoothnessScaleText, indentation);

                m_MaterialEditor.TexturePropertySingleLine (Styles.occlusionMapText, occlusionTexture);

                m_MaterialEditor.TexturePropertySingleLine (Styles.emissiveMapText, emissiveTexture, emissiverColor);

                if (m_ClearCoatMode && clearCoat != null && clearCoatRoughness != null) {
                    m_MaterialEditor.ShaderProperty (clearCoat, Styles.clearCoatText);
                    m_MaterialEditor.ShaderProperty (clearCoatRoughness, Styles.clearCoatRoughnessText);
                }

                //scaleAndOffset
                m_MaterialEditor.TextureScaleOffsetProperty (albedoTexture);

                GUILayout.Box ("", GUILayout.Height (1), GUILayout.ExpandWidth (true));

                //Advanced properties
                GUILayout.Label (Styles.AdvancedText, EditorStyles.boldLabel);
                //alphaTest
                m_MaterialEditor.ShaderProperty (alphaTest, Styles.alphaTestText);
                if (alphaTest.floatValue == 1) {
                    m_MaterialEditor.ShaderProperty (alphaCutoff, Styles.alphaCutoffText, MaterialEditor.kMiniTextureFieldLabelIndentLevel + 1);
                }

                //alphaBlend
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

                //depthWrite
                GUILayout.BeginHorizontal ();
                GUILayout.Label (Styles.depthWriteText, GUILayout.Width (120));
                var depthW = (DepthWrite) depthWrite.floatValue;
                depthW = (DepthWrite) EditorGUILayout.Popup ((int) depthW, Styles.depthWriteNames);
                GUILayout.EndHorizontal ();

                //depthTest
                GUILayout.BeginHorizontal ();
                GUILayout.Label (Styles.depthTestText, GUILayout.Width (120));
                var depthT = (DepthTest) depthTest.floatValue;
                depthT = (DepthTest) EditorGUILayout.Popup ((int) depthT, Styles.depthTestNames);
                GUILayout.EndHorizontal ();

                //cullMode
                GUILayout.BeginHorizontal ();
                GUILayout.Label (Styles.cullModeText, GUILayout.Width (120));
                var cull = (CullMode) cullMode.floatValue;
                cull = (CullMode) EditorGUILayout.Popup ((int) cull, Styles.cullModeNames);
                GUILayout.EndHorizontal ();

                if (EditorGUI.EndChangeCheck ()) {
                    m_MaterialEditor.RegisterPropertyChangeUndo ("Rendering Mode");

                    //renderMode
                    renderMode.floatValue = (float) mode;

                    //lightMode
                    fog.floatValue = (float) fogValue;
                    material.SetInt ("_Fog", (int) fogValue);

                    if (fog.floatValue == 0) {
                        material.EnableKeyword ("EnableFog");
                    } else {
                        material.DisableKeyword ("EnableFog");
                    }

                    //cullMode
                    cullMode.floatValue = (float) cull;
                    material.SetInt ("_Cull", (int) cull);

                    if ((RenderMode) material.GetFloat ("_Mode") == RenderMode.Custom) {
                        //alphaTest
                        if (alphaTest.floatValue == 1) {
                            material.EnableKeyword ("ENABLE_ALPHA_CUTOFF");
                            material.EnableKeyword ("_ALPHATEST_ON");
                        } else {
                            material.DisableKeyword ("ENABLE_ALPHA_CUTOFF");
                            material.DisableKeyword ("_ALPHATEST_ON");
                        }

                        //alphaBlend
                        if (alphaBlend.floatValue == 1) {
                            srcBlendMode.floatValue = (float) srcMode;
                            dstBlendMode.floatValue = (float) dstMode;
                            material.SetInt ("_SrcBlend", (int) srcMode);
                            material.SetInt ("_DstBlend", (int) dstMode);
                            material.EnableKeyword ("_ALPHABLEND_ON");
                            material.SetInt ("_AlphaBlend", 1);
                        } else {
                            material.DisableKeyword ("_ALPHABLEND_ON");
                            material.SetInt ("_AlphaBlend", 0);
                            material.SetInt ("_SrcBlend", (int) 1);
                            material.SetInt ("_DstBlend", (int) 0);
                        }

                        //depthWrite
                        depthWrite.floatValue = (float) depthW;
                        material.SetInt ("_ZWrite", (int) depthW);

                        //depthTest
                        depthTest.floatValue = (float) depthT;
                        material.SetInt ("_ZTest", (int) depthT);

                    }

                    if (normalTexture.textureValue != null) {
                        material.EnableKeyword ("USE_NORMAL_MAP");
                    } else {
                        material.DisableKeyword ("USE_NORMAL_MAP");
                    }

                    if (occlusionTexture.textureValue != null) {
                        material.EnableKeyword ("USE_AO_MAP");
                    } else {
                        material.DisableKeyword ("USE_AO_MAP");
                    }

                    if (metallicTexture.textureValue != null) {
                        material.EnableKeyword ("USE_METALLIC_MAP");
                        Debug.Log ("hi");
                    } else {
                        material.DisableKeyword ("USE_METALLIC_MAP");
                        Debug.Log ("no");
                    }

                    if (emissiveTexture.textureValue != null) {
                        material.EnableKeyword ("USE_EMISSIVE_MAP");
                    } else {
                        material.DisableKeyword ("USE_EMISSIVE_MAP");
                    }

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
            public static GUIContent occlusionMapText = new GUIContent ("Occlusion", "Occlusion");
            public static GUIContent metallicMapText = new GUIContent ("Metallic", "Metallic");
            public static GUIContent clearCoatText = new GUIContent ("ClearCoat", "ClearCoat");
            public static GUIContent clearCoatRoughnessText = new GUIContent ("ClearCoatRoughness", "ClearCoatRoughness");
            public static GUIContent fogIntensityText = new GUIContent ("Fog Intensity", "Fog Intensity");
            public static GUIContent emissiveMapText = new GUIContent ("Emissive", "Emissive");

            public static GUIContent fogModeText = new GUIContent ("Fog", "Fog");
            public static GUIContent cullModeText = new GUIContent ("Cull", "CullMode");
            public static GUIContent renderModeText = new GUIContent ("RenderMode", "RenderMode");
            public static GUIContent alphaTestText = new GUIContent ("AlphaTest", "AlphaTest");
            public static GUIContent alphaCutoffText = new GUIContent ("Alpha Cutoff", "Threshold for alpha cutoff");
            public static GUIContent alphaBlendText = new GUIContent ("AlphaBlend", "AlphaBlend");
            public static GUIContent depthWriteText = new GUIContent ("DepthWrite", "DepthWrite");
            public static GUIContent depthTestText = new GUIContent ("DepthTest", "DepthTest");
            public static GUIContent smoothnessScaleText = new GUIContent ("Smoothness", "Smoothness scale factor");

            public static string whiteSpaceString = " ";
            public static string PrimaryText = "Primary Properties";
            public static string AdvancedText = "Advanced Properties";

            public static readonly string[] srcBlendNames = Enum.GetNames (typeof (SrcBlendMode));
            public static readonly string[] dstBlendNames = Enum.GetNames (typeof (DstBlendMode));
            public static readonly string[] renderModeNames = Enum.GetNames (typeof (RenderMode));
            public static readonly string[] cullModeNames = Enum.GetNames (typeof (CullMode));
            public static readonly string[] depthWriteNames = Enum.GetNames (typeof (DepthWrite));
            public static readonly string[] depthTestNames = Enum.GetNames (typeof (DepthTest));
            public static readonly string[] lightingNames = Enum.GetNames (typeof (LightingMode));
        }
    }
}

//#endif