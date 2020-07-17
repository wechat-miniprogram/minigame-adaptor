using jsb;

/// <summary>
/// System Using
/// </summary>
using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// UnityEngine Using
/// </summary>
using UnityEngine;
using UnityEngine.AI;
using UnityEngine.UI;
using UnityEngine.Profiling;
using UnityEngine.Serialization;
using UnityEngine.EventSystems;
using UnityEngine.Networking;
using UnityEngine.Events;

#if UNITY_2018_3_OR_NEWER
using UnityEngine.TextCore;
using UnityEngine.TextCore.LowLevel;
#endif

using Object = UnityEngine.Object;
using Random = UnityEngine.Random;
using EventTrigger = UnityEngine.EventSystems.EventTrigger;
using SceneManager = UnityEngine.SceneManagement.SceneManager;

/// <summary>
/// UnityEditor Using
/// </summary>
using UnityEditor;


namespace WeChat
{
    /// <summary>
    /// UnityStubBuilder将WhiteList中的类型进行反射，并生成对应的桩代码
    /// </summary>
    public class UnityStubBuilder
    {
        /// <summary>
        /// 反射类型白名单
        /// </summary>
        /// <value>Type</value>
        private static readonly Type[] WhiteList =
        {
            // Pure
            typeof(Random),
            typeof(Vector2),
            typeof(Vector3),
            typeof(Mathf),
            typeof(Quaternion),
            typeof(Color),

            // Physics
            typeof(Physics2D),
            typeof(Rigidbody2D),
            typeof(Collision2D),
            typeof(RaycastHit2D),
            typeof(Collider2D),
            typeof(BoxCollider2D),
            typeof(CircleCollider2D),
            typeof(PolygonCollider2D),
            typeof(Physics),
            typeof(Collider),
            typeof(SphereCollider),
            typeof(BoxCollider),
            typeof(MeshCollider),
            typeof(CapsuleCollider),
            typeof(Rigidbody),
            typeof(Collision),

            // UGUI
            typeof(GridLayoutGroup),
            typeof(Text),
            typeof(GUIElement),
            typeof(GUIText),
            typeof(GUITexture),
            typeof(ScrollRect),
            typeof(Toggle),
            typeof(Slider),
            typeof(Outline),
            typeof(Button),

            // Component
            typeof(AudioClip),
            typeof(AudioSource),
            typeof(ParticleSystem),
            typeof(Animator),
            typeof(Camera),
            typeof(Animation),
            typeof(AudioListener),
            typeof(MonoBehaviour),
            typeof(Behaviour),
            typeof(Component),

            // Render
            typeof(Renderer),
            typeof(ParticleSystemRenderer),
            typeof(SpriteRenderer),
            typeof(LineRenderer),
            typeof(MeshRenderer),
            typeof(TrailRenderer),
            typeof(Material),
            typeof(MeshFilter),

            // Event
            typeof(Event),
            typeof(EventTrigger),
            typeof(ExecuteEvents),
            typeof(UnityEvent),
            typeof(UnityEvent<>),
            typeof(UnityEvent<,>),
            typeof(UnityEvent<,,>),
            typeof(UnityEvent<,,,>),


            // System
            typeof(Hashtable),
            typeof(DateTime),

            typeof(Debug),
            typeof(Input),
            typeof(GameObject),
            typeof(Transform),
            typeof(RectTransform),

            typeof(Object),

            typeof(WWW),
            typeof(Application),
            typeof(Time),
            typeof(Resources),
            typeof(TextAsset),
            typeof(WaitForSeconds),
            typeof(LayerMask),
            typeof(TextMesh),
            typeof(Sprite),
            typeof(Light),
            typeof(NavMeshAgent),
            typeof(Rect),
            typeof(Screen),
            typeof(RaycastHit),
            typeof(AnimatorStateInfo),
            typeof(NavMeshPath),
            typeof(Button.ButtonClickedEvent),
            typeof(SleepTimeout),
            typeof(PlayerPrefs),
            typeof(Ping),
            typeof(WaitForEndOfFrame),
            typeof(Event),
            typeof(UnityException),
            typeof(Texture2D),
            typeof(SceneManager),
            typeof(CharacterInfo),
            typeof(GUILayout),
            typeof(EventType),
            typeof(TextEditor),
            typeof(JsonUtility),

            // attributes
            typeof(TooltipAttribute),
            typeof(HeaderAttribute),
            typeof(HideInInspector),
            typeof(RequireComponent),
            typeof(AddComponentMenu),
            typeof(ExecuteInEditMode),
            typeof(ContextMenu),
            typeof(MultilineAttribute),
            typeof(SerializeField),
            typeof(RangeAttribute),

            typeof(ShaderVariantCollection),
            typeof(BlendWeights),
            typeof(InputField),
            typeof(AddComponentMenu),
            typeof(ContextMenu),
            typeof(ExecuteInEditMode),
            typeof(MeshFilter),
            typeof(QualitySettings),
            typeof(SystemInfo),
            typeof(RenderSettings),
            typeof(Gizmos),
            typeof(LightmapData),
            typeof(LightmapSettings),
            typeof(GUIUtility),
            typeof(GUILayout),
            typeof(AudioListener),
            typeof(ColorSpace),
            typeof(MissingReferenceException),
            typeof(TextEditor),
            typeof(Graphics),
            typeof(FogMode),
            typeof(GUIContent),
            typeof(ColorUtility),
			typeof(ImageEffectOpaque),
            typeof(ImageConversion),

            typeof(AndroidJavaClass),
            typeof(RuntimeInitializeOnLoadMethodAttribute),
            typeof(AudioSettings),
            typeof(GL),
            typeof(ImageEffectTransformsToLDR),
            typeof(RawImage),
            typeof(CanvasGroup),
            typeof(LayoutElement),
            typeof(AndroidJNI),
            typeof(AndroidJNIHelper),
            typeof(CanvasScaler),
            typeof(jvalue),
            typeof(RectTransformUtility),

            typeof(Profiler),
            typeof(DisallowMultipleComponent),
            typeof(TextAreaAttribute),
            typeof(WaitForSecondsRealtime),
            typeof(SpaceAttribute),
            typeof(Mask),
            typeof(CanvasUpdateRegistry),
            typeof(LayoutRebuilder),
            typeof(UISystemProfilerApi),
            typeof(RectMask2D),
            typeof(GraphicRegistry),
            typeof(GraphicRaycaster),

            // UnityEditor
            typeof(EditorWindow),

#if UNITY_2018_3_OR_NEWER
            typeof(GlyphRenderMode),
            typeof(Glyph)
#endif
        };


        /// <summary>
        /// DO NOT MODIFY THIS METHOD
        /// THIS METHOD IS USED FOR GENERATE CALLBACK INVOCATION
        /// </summary>
        /// <param name="output">OUTPUT PATH</param>
        public static void Build(string output)
        {
            var options = new StubOptions
            {
                stubName = "MiniGameAdaptor",
                outputPath = output,
                whiteList = WhiteList
            };
            StubBuilder.Build(options);
        }

        /// <summary>
        /// DO NOT MODIFY THIS METHOD
        /// THIS METHOD IS USED FOR GENERATE CALLBACK INVOCATION
        /// </summary>
        [InitializeOnLoadMethod]
        private static void Register() {
            GenerateStubHelper.Register(Build);
        }
    }
}