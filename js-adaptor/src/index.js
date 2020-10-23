// 安装所有Adaptor模块
import './MiniGameAdaptor'

// Coroutine
import './Coroutine/YieldInstruction'
import './Coroutine/CustomYieldInstruction'
import './Coroutine/Coroutine'
import './Coroutine/CoroutineManager'
import './Coroutine/WaitForSeconds'
import './Coroutine/WaitForEndOfFrame'

// Extended Helper Class
import './Extend/RootMonoBehaviour'
import './Extend/UnityDeserializeHelper'
import './Extend/UnityComponentWrapper'
import './Extend/UnityPrefabManager'
import './Extend/ListFactory'

// Base
import './Base/BaseClass'
import './Base/Time'
import './Base/LayerMask'


// Debug
import './Debug/Debug'

// Math
import './Math/Mathf'
import './Math/Matrix3x3'
import './Math/Vector3'
import './Math/Vector2'
import './Math/Vector4'
import './Math/Matrix4x4'
import './Math/Quaternion'
import './Math/Color'
import './Math/Random'


// CoreMudule
import './CoreModule/Object'
import './CoreModule/GameObject'
import './CoreModule/Component'
import './CoreModule/Transform.Enumerator'
import './CoreModule/Transform'
import './CoreModule/Behaviour'
import './CoreModule/MonoBehaviour'



// Audio
import './Audio/AudioBehaviour'
import './Audio/AudioSource'
import './Audio/AudioClip'

//
import './Input/KeyCode'
import './Input/Input'
import './Input/Touch'
import './Input/TouchPhase'
import './Input/TouchType'

// Geometry
import './Geometry/Plane'

// SDK
import './SDK/SceneManager'
import './SDK/Resources'

// Physics
import './Physics/ContactPoint'
import './Physics/Collision'
import './Physics/Rigidbody'
import './Physics/PhysicMaterial'
import './Physics/Collider'
import './Physics/MeshCollider'
import './Physics/BoxCollider'
import './Physics/SphereCollider'
import './Physics/CapsuleCollider'
import './Physics/RaycastHit'
import './Physics/Physics'

// Event
import './Event/ISerializationCallbackReceiver'
import './Event/UnityEventCallState'
import './Event/UnityEventBase'
import './Event/UnityEvent'
import './Event/UnityEvent$1'
import './Event/AbstractEventData'
import './Event/BaseEventData'
import './Event/PointerEventData'
import './Event/AxisEventData'
import './Event/UIBehaviour'
import './Event/BaseInput'
import './Event/EventSystem'
import './Event/ExecuteEvents'
import './Event/IEventSystemHandler'
import './Event/IBeginDragHandler'
import './Event/IDragHandler'
import './Event/IDropHandler'
import './Event/IEndDragHandler'
import './Event/ICancelHandler'
import './Event/IInitializePotentialDragHandler'
import './Event/IDeselectHandler'
import './Event/IMoveHandler'
import './Event/IPointerClickHandler'
import './Event/IPointerDownHandler'
import './Event/IPointerEnterHandler'
import './Event/IPointerExitHandler'
import './Event/IPointerUpHandler'
import './Event/IScrollHandler'
import './Event/ISubmitHandler'
import './Event/ISelectHandler'
import './Event/IUpdateSelectedHandler'
import './Event/EventTrigger'
import './Event/Entry'
import './Event/MoveDirection'
import './Event/RaycastResult'
import './Event/TriggerEvent'
import './Event/BaseRaycaster'

// Graphics
import './Graphics/RenderTextureFormat'
import './Graphics/Texture'
import './Graphics/Texture2D'
import './Graphics/RenderTexture'

// System
import './System/IO/File'
import './System/IO/FileInfo'
import './System/IO/FileStream'
import './System/SystemInfo/SystemInfo'

import './Camera/Camera'
import './Particle/ParticleSystem'

// Network
import './Network/WWW'
import './Network/WWWForm'
import './Network/NetworkReachability'


import './Light/Light'
import './PlayerPrefs/PlayerPrefs'
import './Application/Application'
import './Screen/Screen'
import './ColorUtility/ColorUtility'
import './TextAsset/TextAsset'
import './Rect/Rect'
import './Bounds/Bounds'


// Render
import './Render/FogMod'
import './Render/RenderSettings'
import './Render/Shader'
import './Render/Material'
import './Render/Renderer'
import './Render/LineRenderer'
import './Render/MeshRenderer'
import './Render/SkinnedMeshRenderer'
import './Mesh/Mesh'
import './Mesh/MeshFilter'
import './Render/ShaderVariantCollection'
import './Render/ShaderVariant'
import './Render/LightmapData'
import './Render/LightmapSettings'
import './Render/AnisotropicFiltering'
import './Render/FilterMode'

// Animation
import './Animation/PlayMode'
import './Animation/Motion'
import './Animation/AnimationClip'
import './Animation/Animator'
import './Animation/WrapMode'
import './Animation/TrackedReference'
import './Animation/AnimationState'
import './Animation/Animation.Enumerator'
import './Animation/Animation'
import './Animation/BlendWeights'

// Expection
import './Exception/index'


// Attribute
import './Attribute/PropertyAttribute'
import './Attribute/HeaderAttribute'
import './Attribute/SerializeField'
import './Attribute/TooltipAttribute'
import './Attribute/HideInInspector'
import './Attribute/ExecuteInEditMode'
import './Attribute/AddComponentMenu'
import './Attribute/ContextMenu'
import './Attribute/PreserveAttribute'
import './Attribute/RequireComponent'
import './Attribute/ImageEffectOpaque'
import './Attribute/ImageEffectTransformsToLDR'
import './Attribute/DisallowMultipleComponent'
import './Attribute/RangeAttribute'
import './Attribute/RuntimeInitializeOnLoadMethodAttribute'
import './Attribute/SpaceAttribute'
import './Attribute/MultilineAttribute'
import './Attribute/TextAreaAttribute'

// UGUI
import './UGUI/ICanvasElement'
import './UGUI/ICanvasRaycastFilter'
import './UGUI/Axis'
import './UGUI/AnimationTriggers'
import './UGUI/IMeshModifier'
import './UGUI/CanvasUpdate'
import './UGUI/ColorBlock'
import './UGUI/ILayoutElement'
import './UGUI/Constraint'
import './UGUI/Corner'
import './UGUI/IClippable'
import './UGUI/IMaterialModifier'
import './UGUI/IMaskable'
import './UGUI/Type'
import './UGUI/Navigation'
import './UGUI/Mode'
import './UGUI/Direction'
import './UGUI/MovementType'
import './UGUI/ScrollbarVisibility'
import './UGUI/Transition'
import './UGUI/SpriteState'
import './UGUI/ToggleTransition'
import './UGUI/VertexHelper'
import './UGUI/UICharInfo'
import './UGUI/UILineInfo'
import './UGUI/UIVertex'
import './UGUI/ILayoutController'
import './UGUI/ILayoutGroup'
import './UGUI/ButtonClickedEvent'
import './UGUI/CullStateChangedEvent'
import './UGUI/ScrollEvent'
import './UGUI/SliderEvent'
import './UGUI/ToggleEvent'
import './UGUI/ScrollRectEvent'
import './UGUI/BaseMeshEffect'
import './UGUI/Selectable'
import './UGUI/Graphic'
import './UGUI/LayoutGroup'
import './UGUI/ScrollRect'
import './UGUI/ToggleGroup'
import './UGUI/Button'
import './UGUI/GridLayoutGroup'
import './UGUI/MaskableGraphic'
import './UGUI/Shadow'
import './UGUI/Scrollbar'
import './UGUI/Slider.js'
import './UGUI/Toggle.js'
import './UGUI/Image.js'
import './UGUI/Outline.js'
import './UGUI/Text.js'


import './Debug/WADebugger'

