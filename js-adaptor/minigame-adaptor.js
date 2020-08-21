/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Coroutine_YieldInstruction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _Coroutine_YieldInstruction__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Coroutine_YieldInstruction__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Coroutine_CustomYieldInstruction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _Coroutine_CustomYieldInstruction__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Coroutine_CustomYieldInstruction__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Coroutine_Coroutine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _Coroutine_Coroutine__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Coroutine_Coroutine__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Coroutine_CoroutineManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _Coroutine_CoroutineManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Coroutine_CoroutineManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Coroutine_WaitForSeconds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _Coroutine_WaitForSeconds__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Coroutine_WaitForSeconds__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Coroutine_WaitForEndOfFrame__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _Coroutine_WaitForEndOfFrame__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Coroutine_WaitForEndOfFrame__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _Extend_UnityDeserializeHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _Extend_UnityComponentWrapper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10);
/* harmony import */ var _Extend_UnityPrefabManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11);
/* harmony import */ var _Extend_ListFactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12);
/* harmony import */ var _Base_BaseClass__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13);
/* harmony import */ var _Base_BaseClass__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_Base_BaseClass__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _Base_Time__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);
/* harmony import */ var _Base_LayerMask__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(15);
/* harmony import */ var _Base_LayerMask__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_Base_LayerMask__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _Debug_Debug__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(16);
/* harmony import */ var _Math_Mathf__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(17);
/* harmony import */ var _Math_Mathf__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_Math_Mathf__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _Math_Matrix3x3__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(18);
/* harmony import */ var _Math_Matrix3x3__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_Math_Matrix3x3__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _Math_Vector3__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(19);
/* harmony import */ var _Math_Vector3__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_Math_Vector3__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _Math_Vector2__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(20);
/* harmony import */ var _Math_Vector2__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_Math_Vector2__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _Math_Vector4__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(21);
/* harmony import */ var _Math_Vector4__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_Math_Vector4__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _Math_Matrix4x4__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(22);
/* harmony import */ var _Math_Matrix4x4__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_Math_Matrix4x4__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _Math_Quaternion__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(23);
/* harmony import */ var _Math_Quaternion__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_Math_Quaternion__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _Math_Color__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(24);
/* harmony import */ var _Math_Color__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_Math_Color__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _Math_Random__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(25);
/* harmony import */ var _Math_Random__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_Math_Random__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _CoreModule_Object__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(26);
/* harmony import */ var _CoreModule_Object__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_CoreModule_Object__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _CoreModule_GameObject__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(27);
/* harmony import */ var _CoreModule_GameObject__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_CoreModule_GameObject__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _CoreModule_Component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(28);
/* harmony import */ var _CoreModule_Component__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_CoreModule_Component__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _CoreModule_Transform__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(29);
/* harmony import */ var _CoreModule_Behaviour__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(31);
/* harmony import */ var _CoreModule_Behaviour__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_CoreModule_Behaviour__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _CoreModule_MonoBehaviour__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(32);
/* harmony import */ var _CoreModule_MonoBehaviour__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_CoreModule_MonoBehaviour__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _Audio_AudioBehaviour__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(33);
/* harmony import */ var _Audio_AudioBehaviour__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_Audio_AudioBehaviour__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _Audio_AudioSource__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(34);
/* harmony import */ var _Audio_AudioSource__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_Audio_AudioSource__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _Audio_AudioClip__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(35);
/* harmony import */ var _Audio_AudioClip__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_Audio_AudioClip__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _Input_KeyCode__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(36);
/* harmony import */ var _Input_KeyCode__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_Input_KeyCode__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _Input_Input__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(37);
/* harmony import */ var _Input_Touch__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(38);
/* harmony import */ var _Input_Touch__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_Input_Touch__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var _Input_TouchPhase__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(39);
/* harmony import */ var _Input_TouchPhase__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(_Input_TouchPhase__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var _Input_TouchType__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(40);
/* harmony import */ var _Input_TouchType__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_Input_TouchType__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var _Geometry_Plane__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(41);
/* harmony import */ var _Geometry_Plane__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(_Geometry_Plane__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _SDK_SceneManager__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(42);
/* harmony import */ var _SDK_Resources__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(43);
/* harmony import */ var _Physics_ContactPoint__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(45);
/* harmony import */ var _Physics_ContactPoint__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(_Physics_ContactPoint__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var _Physics_Collision__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(46);
/* harmony import */ var _Physics_Rigidbody__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(47);
/* harmony import */ var _Physics_PhysicMaterial__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(48);
/* harmony import */ var _Physics_Collider__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(49);
/* harmony import */ var _Physics_MeshCollider__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(50);
/* harmony import */ var _Physics_BoxCollider__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(52);
/* harmony import */ var _Physics_SphereCollider__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(53);
/* harmony import */ var _Physics_CapsuleCollider__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(54);
/* harmony import */ var _Physics_RaycastHit__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(55);
/* harmony import */ var _Physics_RaycastHit__WEBPACK_IMPORTED_MODULE_51___default = /*#__PURE__*/__webpack_require__.n(_Physics_RaycastHit__WEBPACK_IMPORTED_MODULE_51__);
/* harmony import */ var _Physics_Physics__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(56);
/* harmony import */ var _Event_ISerializationCallbackReceiver__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(57);
/* harmony import */ var _Event_ISerializationCallbackReceiver__WEBPACK_IMPORTED_MODULE_53___default = /*#__PURE__*/__webpack_require__.n(_Event_ISerializationCallbackReceiver__WEBPACK_IMPORTED_MODULE_53__);
/* harmony import */ var _Event_UnityEventCallState__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(58);
/* harmony import */ var _Event_UnityEventCallState__WEBPACK_IMPORTED_MODULE_54___default = /*#__PURE__*/__webpack_require__.n(_Event_UnityEventCallState__WEBPACK_IMPORTED_MODULE_54__);
/* harmony import */ var _Event_UnityEventBase__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(59);
/* harmony import */ var _Event_UnityEventBase__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(_Event_UnityEventBase__WEBPACK_IMPORTED_MODULE_55__);
/* harmony import */ var _Event_UnityEvent__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(60);
/* harmony import */ var _Event_UnityEvent__WEBPACK_IMPORTED_MODULE_56___default = /*#__PURE__*/__webpack_require__.n(_Event_UnityEvent__WEBPACK_IMPORTED_MODULE_56__);
/* harmony import */ var _Event_UnityEvent$1__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(61);
/* harmony import */ var _Event_UnityEvent$1__WEBPACK_IMPORTED_MODULE_57___default = /*#__PURE__*/__webpack_require__.n(_Event_UnityEvent$1__WEBPACK_IMPORTED_MODULE_57__);
/* harmony import */ var _Event_AbstractEventData__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(62);
/* harmony import */ var _Event_AbstractEventData__WEBPACK_IMPORTED_MODULE_58___default = /*#__PURE__*/__webpack_require__.n(_Event_AbstractEventData__WEBPACK_IMPORTED_MODULE_58__);
/* harmony import */ var _Event_BaseEventData__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(63);
/* harmony import */ var _Event_BaseEventData__WEBPACK_IMPORTED_MODULE_59___default = /*#__PURE__*/__webpack_require__.n(_Event_BaseEventData__WEBPACK_IMPORTED_MODULE_59__);
/* harmony import */ var _Event_PointerEventData__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(64);
/* harmony import */ var _Event_PointerEventData__WEBPACK_IMPORTED_MODULE_60___default = /*#__PURE__*/__webpack_require__.n(_Event_PointerEventData__WEBPACK_IMPORTED_MODULE_60__);
/* harmony import */ var _Event_AxisEventData__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(65);
/* harmony import */ var _Event_AxisEventData__WEBPACK_IMPORTED_MODULE_61___default = /*#__PURE__*/__webpack_require__.n(_Event_AxisEventData__WEBPACK_IMPORTED_MODULE_61__);
/* harmony import */ var _Event_UIBehaviour__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(66);
/* harmony import */ var _Event_UIBehaviour__WEBPACK_IMPORTED_MODULE_62___default = /*#__PURE__*/__webpack_require__.n(_Event_UIBehaviour__WEBPACK_IMPORTED_MODULE_62__);
/* harmony import */ var _Event_BaseInput__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(67);
/* harmony import */ var _Event_BaseInput__WEBPACK_IMPORTED_MODULE_63___default = /*#__PURE__*/__webpack_require__.n(_Event_BaseInput__WEBPACK_IMPORTED_MODULE_63__);
/* harmony import */ var _Event_EventSystem__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(68);
/* harmony import */ var _Event_EventSystem__WEBPACK_IMPORTED_MODULE_64___default = /*#__PURE__*/__webpack_require__.n(_Event_EventSystem__WEBPACK_IMPORTED_MODULE_64__);
/* harmony import */ var _Event_ExecuteEvents__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(69);
/* harmony import */ var _Event_ExecuteEvents__WEBPACK_IMPORTED_MODULE_65___default = /*#__PURE__*/__webpack_require__.n(_Event_ExecuteEvents__WEBPACK_IMPORTED_MODULE_65__);
/* harmony import */ var _Event_IEventSystemHandler__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(70);
/* harmony import */ var _Event_IEventSystemHandler__WEBPACK_IMPORTED_MODULE_66___default = /*#__PURE__*/__webpack_require__.n(_Event_IEventSystemHandler__WEBPACK_IMPORTED_MODULE_66__);
/* harmony import */ var _Event_IBeginDragHandler__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(71);
/* harmony import */ var _Event_IBeginDragHandler__WEBPACK_IMPORTED_MODULE_67___default = /*#__PURE__*/__webpack_require__.n(_Event_IBeginDragHandler__WEBPACK_IMPORTED_MODULE_67__);
/* harmony import */ var _Event_IDragHandler__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(72);
/* harmony import */ var _Event_IDragHandler__WEBPACK_IMPORTED_MODULE_68___default = /*#__PURE__*/__webpack_require__.n(_Event_IDragHandler__WEBPACK_IMPORTED_MODULE_68__);
/* harmony import */ var _Event_IDropHandler__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(73);
/* harmony import */ var _Event_IDropHandler__WEBPACK_IMPORTED_MODULE_69___default = /*#__PURE__*/__webpack_require__.n(_Event_IDropHandler__WEBPACK_IMPORTED_MODULE_69__);
/* harmony import */ var _Event_IEndDragHandler__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(74);
/* harmony import */ var _Event_IEndDragHandler__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(_Event_IEndDragHandler__WEBPACK_IMPORTED_MODULE_70__);
/* harmony import */ var _Event_ICancelHandler__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(75);
/* harmony import */ var _Event_ICancelHandler__WEBPACK_IMPORTED_MODULE_71___default = /*#__PURE__*/__webpack_require__.n(_Event_ICancelHandler__WEBPACK_IMPORTED_MODULE_71__);
/* harmony import */ var _Event_IInitializePotentialDragHandler__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(76);
/* harmony import */ var _Event_IInitializePotentialDragHandler__WEBPACK_IMPORTED_MODULE_72___default = /*#__PURE__*/__webpack_require__.n(_Event_IInitializePotentialDragHandler__WEBPACK_IMPORTED_MODULE_72__);
/* harmony import */ var _Event_IDeselectHandler__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(77);
/* harmony import */ var _Event_IDeselectHandler__WEBPACK_IMPORTED_MODULE_73___default = /*#__PURE__*/__webpack_require__.n(_Event_IDeselectHandler__WEBPACK_IMPORTED_MODULE_73__);
/* harmony import */ var _Event_IMoveHandler__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(78);
/* harmony import */ var _Event_IMoveHandler__WEBPACK_IMPORTED_MODULE_74___default = /*#__PURE__*/__webpack_require__.n(_Event_IMoveHandler__WEBPACK_IMPORTED_MODULE_74__);
/* harmony import */ var _Event_IPointerClickHandler__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(79);
/* harmony import */ var _Event_IPointerClickHandler__WEBPACK_IMPORTED_MODULE_75___default = /*#__PURE__*/__webpack_require__.n(_Event_IPointerClickHandler__WEBPACK_IMPORTED_MODULE_75__);
/* harmony import */ var _Event_IPointerDownHandler__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(80);
/* harmony import */ var _Event_IPointerDownHandler__WEBPACK_IMPORTED_MODULE_76___default = /*#__PURE__*/__webpack_require__.n(_Event_IPointerDownHandler__WEBPACK_IMPORTED_MODULE_76__);
/* harmony import */ var _Event_IPointerEnterHandler__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(81);
/* harmony import */ var _Event_IPointerEnterHandler__WEBPACK_IMPORTED_MODULE_77___default = /*#__PURE__*/__webpack_require__.n(_Event_IPointerEnterHandler__WEBPACK_IMPORTED_MODULE_77__);
/* harmony import */ var _Event_IPointerExitHandler__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(82);
/* harmony import */ var _Event_IPointerExitHandler__WEBPACK_IMPORTED_MODULE_78___default = /*#__PURE__*/__webpack_require__.n(_Event_IPointerExitHandler__WEBPACK_IMPORTED_MODULE_78__);
/* harmony import */ var _Event_IPointerUpHandler__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(83);
/* harmony import */ var _Event_IPointerUpHandler__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(_Event_IPointerUpHandler__WEBPACK_IMPORTED_MODULE_79__);
/* harmony import */ var _Event_IScrollHandler__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(84);
/* harmony import */ var _Event_IScrollHandler__WEBPACK_IMPORTED_MODULE_80___default = /*#__PURE__*/__webpack_require__.n(_Event_IScrollHandler__WEBPACK_IMPORTED_MODULE_80__);
/* harmony import */ var _Event_ISubmitHandler__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(85);
/* harmony import */ var _Event_ISubmitHandler__WEBPACK_IMPORTED_MODULE_81___default = /*#__PURE__*/__webpack_require__.n(_Event_ISubmitHandler__WEBPACK_IMPORTED_MODULE_81__);
/* harmony import */ var _Event_ISelectHandler__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(86);
/* harmony import */ var _Event_ISelectHandler__WEBPACK_IMPORTED_MODULE_82___default = /*#__PURE__*/__webpack_require__.n(_Event_ISelectHandler__WEBPACK_IMPORTED_MODULE_82__);
/* harmony import */ var _Event_IUpdateSelectedHandler__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(87);
/* harmony import */ var _Event_IUpdateSelectedHandler__WEBPACK_IMPORTED_MODULE_83___default = /*#__PURE__*/__webpack_require__.n(_Event_IUpdateSelectedHandler__WEBPACK_IMPORTED_MODULE_83__);
/* harmony import */ var _Event_EventTrigger__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(88);
/* harmony import */ var _Event_EventTrigger__WEBPACK_IMPORTED_MODULE_84___default = /*#__PURE__*/__webpack_require__.n(_Event_EventTrigger__WEBPACK_IMPORTED_MODULE_84__);
/* harmony import */ var _Event_Entry__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(89);
/* harmony import */ var _Event_Entry__WEBPACK_IMPORTED_MODULE_85___default = /*#__PURE__*/__webpack_require__.n(_Event_Entry__WEBPACK_IMPORTED_MODULE_85__);
/* harmony import */ var _Event_MoveDirection__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(90);
/* harmony import */ var _Event_MoveDirection__WEBPACK_IMPORTED_MODULE_86___default = /*#__PURE__*/__webpack_require__.n(_Event_MoveDirection__WEBPACK_IMPORTED_MODULE_86__);
/* harmony import */ var _Event_RaycastResult__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(91);
/* harmony import */ var _Event_RaycastResult__WEBPACK_IMPORTED_MODULE_87___default = /*#__PURE__*/__webpack_require__.n(_Event_RaycastResult__WEBPACK_IMPORTED_MODULE_87__);
/* harmony import */ var _Event_TriggerEvent__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(92);
/* harmony import */ var _Event_TriggerEvent__WEBPACK_IMPORTED_MODULE_88___default = /*#__PURE__*/__webpack_require__.n(_Event_TriggerEvent__WEBPACK_IMPORTED_MODULE_88__);
/* harmony import */ var _Event_BaseRaycaster__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(93);
/* harmony import */ var _Event_BaseRaycaster__WEBPACK_IMPORTED_MODULE_89___default = /*#__PURE__*/__webpack_require__.n(_Event_BaseRaycaster__WEBPACK_IMPORTED_MODULE_89__);
/* harmony import */ var _Graphics_RenderTextureFormat__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(94);
/* harmony import */ var _Graphics_RenderTextureFormat__WEBPACK_IMPORTED_MODULE_90___default = /*#__PURE__*/__webpack_require__.n(_Graphics_RenderTextureFormat__WEBPACK_IMPORTED_MODULE_90__);
/* harmony import */ var _Graphics_Texture__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(95);
/* harmony import */ var _Graphics_Texture__WEBPACK_IMPORTED_MODULE_91___default = /*#__PURE__*/__webpack_require__.n(_Graphics_Texture__WEBPACK_IMPORTED_MODULE_91__);
/* harmony import */ var _Graphics_Texture2D__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(96);
/* harmony import */ var _Graphics_Texture2D__WEBPACK_IMPORTED_MODULE_92___default = /*#__PURE__*/__webpack_require__.n(_Graphics_Texture2D__WEBPACK_IMPORTED_MODULE_92__);
/* harmony import */ var _Graphics_RenderTexture__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(97);
/* harmony import */ var _Graphics_RenderTexture__WEBPACK_IMPORTED_MODULE_93___default = /*#__PURE__*/__webpack_require__.n(_Graphics_RenderTexture__WEBPACK_IMPORTED_MODULE_93__);
/* harmony import */ var _System_IO_File__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(98);
/* harmony import */ var _System_IO_File__WEBPACK_IMPORTED_MODULE_94___default = /*#__PURE__*/__webpack_require__.n(_System_IO_File__WEBPACK_IMPORTED_MODULE_94__);
/* harmony import */ var _System_IO_FileInfo__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(99);
/* harmony import */ var _System_IO_FileInfo__WEBPACK_IMPORTED_MODULE_95___default = /*#__PURE__*/__webpack_require__.n(_System_IO_FileInfo__WEBPACK_IMPORTED_MODULE_95__);
/* harmony import */ var _System_IO_FileStream__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(100);
/* harmony import */ var _System_IO_FileStream__WEBPACK_IMPORTED_MODULE_96___default = /*#__PURE__*/__webpack_require__.n(_System_IO_FileStream__WEBPACK_IMPORTED_MODULE_96__);
/* harmony import */ var _System_SystemInfo_SystemInfo__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(101);
/* harmony import */ var _Camera_Camera__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(103);
/* harmony import */ var _Camera_Camera__WEBPACK_IMPORTED_MODULE_98___default = /*#__PURE__*/__webpack_require__.n(_Camera_Camera__WEBPACK_IMPORTED_MODULE_98__);
/* harmony import */ var _Particle_ParticleSystem__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(104);
/* harmony import */ var _Particle_ParticleSystem__WEBPACK_IMPORTED_MODULE_99___default = /*#__PURE__*/__webpack_require__.n(_Particle_ParticleSystem__WEBPACK_IMPORTED_MODULE_99__);
/* harmony import */ var _Network_WWW__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(105);
/* harmony import */ var _Network_WWW__WEBPACK_IMPORTED_MODULE_100___default = /*#__PURE__*/__webpack_require__.n(_Network_WWW__WEBPACK_IMPORTED_MODULE_100__);
/* harmony import */ var _Network_WWWForm__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(106);
/* harmony import */ var _Network_WWWForm__WEBPACK_IMPORTED_MODULE_101___default = /*#__PURE__*/__webpack_require__.n(_Network_WWWForm__WEBPACK_IMPORTED_MODULE_101__);
/* harmony import */ var _Network_NetworkReachability__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(107);
/* harmony import */ var _Network_NetworkReachability__WEBPACK_IMPORTED_MODULE_102___default = /*#__PURE__*/__webpack_require__.n(_Network_NetworkReachability__WEBPACK_IMPORTED_MODULE_102__);
/* harmony import */ var _Light_Light__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(108);
/* harmony import */ var _Light_Light__WEBPACK_IMPORTED_MODULE_103___default = /*#__PURE__*/__webpack_require__.n(_Light_Light__WEBPACK_IMPORTED_MODULE_103__);
/* harmony import */ var _PlayerPrefs_PlayerPrefs__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(109);
/* harmony import */ var _PlayerPrefs_PlayerPrefs__WEBPACK_IMPORTED_MODULE_104___default = /*#__PURE__*/__webpack_require__.n(_PlayerPrefs_PlayerPrefs__WEBPACK_IMPORTED_MODULE_104__);
/* harmony import */ var _Application_Application__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(110);
/* harmony import */ var _Application_Application__WEBPACK_IMPORTED_MODULE_105___default = /*#__PURE__*/__webpack_require__.n(_Application_Application__WEBPACK_IMPORTED_MODULE_105__);
/* harmony import */ var _Screen_Screen__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(111);
/* harmony import */ var _ColorUtility_ColorUtility__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(112);
/* harmony import */ var _ColorUtility_ColorUtility__WEBPACK_IMPORTED_MODULE_107___default = /*#__PURE__*/__webpack_require__.n(_ColorUtility_ColorUtility__WEBPACK_IMPORTED_MODULE_107__);
/* harmony import */ var _TextAsset_TextAsset__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(113);
/* harmony import */ var _TextAsset_TextAsset__WEBPACK_IMPORTED_MODULE_108___default = /*#__PURE__*/__webpack_require__.n(_TextAsset_TextAsset__WEBPACK_IMPORTED_MODULE_108__);
/* harmony import */ var _Rect_Rect__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(114);
/* harmony import */ var _Rect_Rect__WEBPACK_IMPORTED_MODULE_109___default = /*#__PURE__*/__webpack_require__.n(_Rect_Rect__WEBPACK_IMPORTED_MODULE_109__);
/* harmony import */ var _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(115);
/* harmony import */ var _Bounds_Bounds__WEBPACK_IMPORTED_MODULE_110___default = /*#__PURE__*/__webpack_require__.n(_Bounds_Bounds__WEBPACK_IMPORTED_MODULE_110__);
/* harmony import */ var _Render_FogMod__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(116);
/* harmony import */ var _Render_FogMod__WEBPACK_IMPORTED_MODULE_111___default = /*#__PURE__*/__webpack_require__.n(_Render_FogMod__WEBPACK_IMPORTED_MODULE_111__);
/* harmony import */ var _Render_RenderSettings__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(117);
/* harmony import */ var _Render_RenderSettings__WEBPACK_IMPORTED_MODULE_112___default = /*#__PURE__*/__webpack_require__.n(_Render_RenderSettings__WEBPACK_IMPORTED_MODULE_112__);
/* harmony import */ var _Render_Shader__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(118);
/* harmony import */ var _Render_Shader__WEBPACK_IMPORTED_MODULE_113___default = /*#__PURE__*/__webpack_require__.n(_Render_Shader__WEBPACK_IMPORTED_MODULE_113__);
/* harmony import */ var _Render_Material__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(119);
/* harmony import */ var _Render_Material__WEBPACK_IMPORTED_MODULE_114___default = /*#__PURE__*/__webpack_require__.n(_Render_Material__WEBPACK_IMPORTED_MODULE_114__);
/* harmony import */ var _Render_Renderer__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(120);
/* harmony import */ var _Render_Renderer__WEBPACK_IMPORTED_MODULE_115___default = /*#__PURE__*/__webpack_require__.n(_Render_Renderer__WEBPACK_IMPORTED_MODULE_115__);
/* harmony import */ var _Render_LineRenderer__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(121);
/* harmony import */ var _Render_LineRenderer__WEBPACK_IMPORTED_MODULE_116___default = /*#__PURE__*/__webpack_require__.n(_Render_LineRenderer__WEBPACK_IMPORTED_MODULE_116__);
/* harmony import */ var _Render_MeshRenderer__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(122);
/* harmony import */ var _Render_MeshRenderer__WEBPACK_IMPORTED_MODULE_117___default = /*#__PURE__*/__webpack_require__.n(_Render_MeshRenderer__WEBPACK_IMPORTED_MODULE_117__);
/* harmony import */ var _Render_SkinnedMeshRenderer__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(123);
/* harmony import */ var _Render_SkinnedMeshRenderer__WEBPACK_IMPORTED_MODULE_118___default = /*#__PURE__*/__webpack_require__.n(_Render_SkinnedMeshRenderer__WEBPACK_IMPORTED_MODULE_118__);
/* harmony import */ var _Mesh_Mesh__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(124);
/* harmony import */ var _Mesh_MeshFilter__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(125);
/* harmony import */ var _Mesh_MeshFilter__WEBPACK_IMPORTED_MODULE_120___default = /*#__PURE__*/__webpack_require__.n(_Mesh_MeshFilter__WEBPACK_IMPORTED_MODULE_120__);
/* harmony import */ var _Render_ShaderVariantCollection__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(126);
/* harmony import */ var _Render_ShaderVariantCollection__WEBPACK_IMPORTED_MODULE_121___default = /*#__PURE__*/__webpack_require__.n(_Render_ShaderVariantCollection__WEBPACK_IMPORTED_MODULE_121__);
/* harmony import */ var _Render_ShaderVariant__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(127);
/* harmony import */ var _Render_ShaderVariant__WEBPACK_IMPORTED_MODULE_122___default = /*#__PURE__*/__webpack_require__.n(_Render_ShaderVariant__WEBPACK_IMPORTED_MODULE_122__);
/* harmony import */ var _Render_LightmapData__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(128);
/* harmony import */ var _Render_LightmapData__WEBPACK_IMPORTED_MODULE_123___default = /*#__PURE__*/__webpack_require__.n(_Render_LightmapData__WEBPACK_IMPORTED_MODULE_123__);
/* harmony import */ var _Render_LightmapSettings__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(129);
/* harmony import */ var _Render_LightmapSettings__WEBPACK_IMPORTED_MODULE_124___default = /*#__PURE__*/__webpack_require__.n(_Render_LightmapSettings__WEBPACK_IMPORTED_MODULE_124__);
/* harmony import */ var _Render_AnisotropicFiltering__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(130);
/* harmony import */ var _Render_AnisotropicFiltering__WEBPACK_IMPORTED_MODULE_125___default = /*#__PURE__*/__webpack_require__.n(_Render_AnisotropicFiltering__WEBPACK_IMPORTED_MODULE_125__);
/* harmony import */ var _Render_FilterMode__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(131);
/* harmony import */ var _Render_FilterMode__WEBPACK_IMPORTED_MODULE_126___default = /*#__PURE__*/__webpack_require__.n(_Render_FilterMode__WEBPACK_IMPORTED_MODULE_126__);
/* harmony import */ var _Animation_PlayMode__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(132);
/* harmony import */ var _Animation_PlayMode__WEBPACK_IMPORTED_MODULE_127___default = /*#__PURE__*/__webpack_require__.n(_Animation_PlayMode__WEBPACK_IMPORTED_MODULE_127__);
/* harmony import */ var _Animation_Motion__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(133);
/* harmony import */ var _Animation_Motion__WEBPACK_IMPORTED_MODULE_128___default = /*#__PURE__*/__webpack_require__.n(_Animation_Motion__WEBPACK_IMPORTED_MODULE_128__);
/* harmony import */ var _Animation_AnimationClip__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(134);
/* harmony import */ var _Animation_AnimationClip__WEBPACK_IMPORTED_MODULE_129___default = /*#__PURE__*/__webpack_require__.n(_Animation_AnimationClip__WEBPACK_IMPORTED_MODULE_129__);
/* harmony import */ var _Animation_Animator__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(135);
/* harmony import */ var _Animation_Animator__WEBPACK_IMPORTED_MODULE_130___default = /*#__PURE__*/__webpack_require__.n(_Animation_Animator__WEBPACK_IMPORTED_MODULE_130__);
/* harmony import */ var _Animation_WrapMode__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(136);
/* harmony import */ var _Animation_WrapMode__WEBPACK_IMPORTED_MODULE_131___default = /*#__PURE__*/__webpack_require__.n(_Animation_WrapMode__WEBPACK_IMPORTED_MODULE_131__);
/* harmony import */ var _Animation_TrackedReference__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(137);
/* harmony import */ var _Animation_TrackedReference__WEBPACK_IMPORTED_MODULE_132___default = /*#__PURE__*/__webpack_require__.n(_Animation_TrackedReference__WEBPACK_IMPORTED_MODULE_132__);
/* harmony import */ var _Animation_AnimationState__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(138);
/* harmony import */ var _Animation_AnimationState__WEBPACK_IMPORTED_MODULE_133___default = /*#__PURE__*/__webpack_require__.n(_Animation_AnimationState__WEBPACK_IMPORTED_MODULE_133__);
/* harmony import */ var _Animation_Animation_Enumerator__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(139);
/* harmony import */ var _Animation_Animation_Enumerator__WEBPACK_IMPORTED_MODULE_134___default = /*#__PURE__*/__webpack_require__.n(_Animation_Animation_Enumerator__WEBPACK_IMPORTED_MODULE_134__);
/* harmony import */ var _Animation_Animation__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(140);
/* harmony import */ var _Animation_Animation__WEBPACK_IMPORTED_MODULE_135___default = /*#__PURE__*/__webpack_require__.n(_Animation_Animation__WEBPACK_IMPORTED_MODULE_135__);
/* harmony import */ var _Animation_BlendWeights__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(141);
/* harmony import */ var _Animation_BlendWeights__WEBPACK_IMPORTED_MODULE_136___default = /*#__PURE__*/__webpack_require__.n(_Animation_BlendWeights__WEBPACK_IMPORTED_MODULE_136__);
/* harmony import */ var _Exception_index__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(142);
/* harmony import */ var _Attribute_PropertyAttribute__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(144);
/* harmony import */ var _Attribute_PropertyAttribute__WEBPACK_IMPORTED_MODULE_138___default = /*#__PURE__*/__webpack_require__.n(_Attribute_PropertyAttribute__WEBPACK_IMPORTED_MODULE_138__);
/* harmony import */ var _Attribute_HeaderAttribute__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(145);
/* harmony import */ var _Attribute_HeaderAttribute__WEBPACK_IMPORTED_MODULE_139___default = /*#__PURE__*/__webpack_require__.n(_Attribute_HeaderAttribute__WEBPACK_IMPORTED_MODULE_139__);
/* harmony import */ var _Attribute_SerializeField__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(146);
/* harmony import */ var _Attribute_SerializeField__WEBPACK_IMPORTED_MODULE_140___default = /*#__PURE__*/__webpack_require__.n(_Attribute_SerializeField__WEBPACK_IMPORTED_MODULE_140__);
/* harmony import */ var _Attribute_TooltipAttribute__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(147);
/* harmony import */ var _Attribute_TooltipAttribute__WEBPACK_IMPORTED_MODULE_141___default = /*#__PURE__*/__webpack_require__.n(_Attribute_TooltipAttribute__WEBPACK_IMPORTED_MODULE_141__);
/* harmony import */ var _Attribute_HideInInspector__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(148);
/* harmony import */ var _Attribute_HideInInspector__WEBPACK_IMPORTED_MODULE_142___default = /*#__PURE__*/__webpack_require__.n(_Attribute_HideInInspector__WEBPACK_IMPORTED_MODULE_142__);
/* harmony import */ var _Attribute_ExecuteInEditMode__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(149);
/* harmony import */ var _Attribute_ExecuteInEditMode__WEBPACK_IMPORTED_MODULE_143___default = /*#__PURE__*/__webpack_require__.n(_Attribute_ExecuteInEditMode__WEBPACK_IMPORTED_MODULE_143__);
/* harmony import */ var _Attribute_AddComponentMenu__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(150);
/* harmony import */ var _Attribute_AddComponentMenu__WEBPACK_IMPORTED_MODULE_144___default = /*#__PURE__*/__webpack_require__.n(_Attribute_AddComponentMenu__WEBPACK_IMPORTED_MODULE_144__);
/* harmony import */ var _Attribute_ContextMenu__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(151);
/* harmony import */ var _Attribute_ContextMenu__WEBPACK_IMPORTED_MODULE_145___default = /*#__PURE__*/__webpack_require__.n(_Attribute_ContextMenu__WEBPACK_IMPORTED_MODULE_145__);
/* harmony import */ var _Attribute_PreserveAttribute__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(152);
/* harmony import */ var _Attribute_PreserveAttribute__WEBPACK_IMPORTED_MODULE_146___default = /*#__PURE__*/__webpack_require__.n(_Attribute_PreserveAttribute__WEBPACK_IMPORTED_MODULE_146__);
/* harmony import */ var _Attribute_RequireComponent__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(153);
/* harmony import */ var _Attribute_RequireComponent__WEBPACK_IMPORTED_MODULE_147___default = /*#__PURE__*/__webpack_require__.n(_Attribute_RequireComponent__WEBPACK_IMPORTED_MODULE_147__);
/* harmony import */ var _Attribute_ImageEffectOpaque__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(154);
/* harmony import */ var _Attribute_ImageEffectOpaque__WEBPACK_IMPORTED_MODULE_148___default = /*#__PURE__*/__webpack_require__.n(_Attribute_ImageEffectOpaque__WEBPACK_IMPORTED_MODULE_148__);
/* harmony import */ var _Attribute_ImageEffectTransformsToLDR__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(155);
/* harmony import */ var _Attribute_ImageEffectTransformsToLDR__WEBPACK_IMPORTED_MODULE_149___default = /*#__PURE__*/__webpack_require__.n(_Attribute_ImageEffectTransformsToLDR__WEBPACK_IMPORTED_MODULE_149__);
/* harmony import */ var _Attribute_DisallowMultipleComponent__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(156);
/* harmony import */ var _Attribute_DisallowMultipleComponent__WEBPACK_IMPORTED_MODULE_150___default = /*#__PURE__*/__webpack_require__.n(_Attribute_DisallowMultipleComponent__WEBPACK_IMPORTED_MODULE_150__);
/* harmony import */ var _Attribute_RangeAttribute__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(157);
/* harmony import */ var _Attribute_RangeAttribute__WEBPACK_IMPORTED_MODULE_151___default = /*#__PURE__*/__webpack_require__.n(_Attribute_RangeAttribute__WEBPACK_IMPORTED_MODULE_151__);
/* harmony import */ var _Attribute_RuntimeInitializeOnLoadMethodAttribute__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(158);
/* harmony import */ var _Attribute_RuntimeInitializeOnLoadMethodAttribute__WEBPACK_IMPORTED_MODULE_152___default = /*#__PURE__*/__webpack_require__.n(_Attribute_RuntimeInitializeOnLoadMethodAttribute__WEBPACK_IMPORTED_MODULE_152__);
/* harmony import */ var _Attribute_SpaceAttribute__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(159);
/* harmony import */ var _Attribute_SpaceAttribute__WEBPACK_IMPORTED_MODULE_153___default = /*#__PURE__*/__webpack_require__.n(_Attribute_SpaceAttribute__WEBPACK_IMPORTED_MODULE_153__);
/* harmony import */ var _Attribute_MultilineAttribute__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(160);
/* harmony import */ var _Attribute_MultilineAttribute__WEBPACK_IMPORTED_MODULE_154___default = /*#__PURE__*/__webpack_require__.n(_Attribute_MultilineAttribute__WEBPACK_IMPORTED_MODULE_154__);
/* harmony import */ var _Attribute_TextAreaAttribute__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(161);
/* harmony import */ var _Attribute_TextAreaAttribute__WEBPACK_IMPORTED_MODULE_155___default = /*#__PURE__*/__webpack_require__.n(_Attribute_TextAreaAttribute__WEBPACK_IMPORTED_MODULE_155__);
/* harmony import */ var _UGUI_ICanvasElement__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(162);
/* harmony import */ var _UGUI_ICanvasElement__WEBPACK_IMPORTED_MODULE_156___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ICanvasElement__WEBPACK_IMPORTED_MODULE_156__);
/* harmony import */ var _UGUI_ICanvasRaycastFilter__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(163);
/* harmony import */ var _UGUI_ICanvasRaycastFilter__WEBPACK_IMPORTED_MODULE_157___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ICanvasRaycastFilter__WEBPACK_IMPORTED_MODULE_157__);
/* harmony import */ var _UGUI_Axis__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(164);
/* harmony import */ var _UGUI_Axis__WEBPACK_IMPORTED_MODULE_158___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Axis__WEBPACK_IMPORTED_MODULE_158__);
/* harmony import */ var _UGUI_AnimationTriggers__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(165);
/* harmony import */ var _UGUI_AnimationTriggers__WEBPACK_IMPORTED_MODULE_159___default = /*#__PURE__*/__webpack_require__.n(_UGUI_AnimationTriggers__WEBPACK_IMPORTED_MODULE_159__);
/* harmony import */ var _UGUI_IMeshModifier__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(166);
/* harmony import */ var _UGUI_IMeshModifier__WEBPACK_IMPORTED_MODULE_160___default = /*#__PURE__*/__webpack_require__.n(_UGUI_IMeshModifier__WEBPACK_IMPORTED_MODULE_160__);
/* harmony import */ var _UGUI_CanvasUpdate__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(167);
/* harmony import */ var _UGUI_CanvasUpdate__WEBPACK_IMPORTED_MODULE_161___default = /*#__PURE__*/__webpack_require__.n(_UGUI_CanvasUpdate__WEBPACK_IMPORTED_MODULE_161__);
/* harmony import */ var _UGUI_ColorBlock__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(168);
/* harmony import */ var _UGUI_ColorBlock__WEBPACK_IMPORTED_MODULE_162___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ColorBlock__WEBPACK_IMPORTED_MODULE_162__);
/* harmony import */ var _UGUI_ILayoutElement__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(169);
/* harmony import */ var _UGUI_ILayoutElement__WEBPACK_IMPORTED_MODULE_163___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ILayoutElement__WEBPACK_IMPORTED_MODULE_163__);
/* harmony import */ var _UGUI_Constraint__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(170);
/* harmony import */ var _UGUI_Constraint__WEBPACK_IMPORTED_MODULE_164___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Constraint__WEBPACK_IMPORTED_MODULE_164__);
/* harmony import */ var _UGUI_Corner__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(171);
/* harmony import */ var _UGUI_Corner__WEBPACK_IMPORTED_MODULE_165___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Corner__WEBPACK_IMPORTED_MODULE_165__);
/* harmony import */ var _UGUI_IClippable__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(172);
/* harmony import */ var _UGUI_IClippable__WEBPACK_IMPORTED_MODULE_166___default = /*#__PURE__*/__webpack_require__.n(_UGUI_IClippable__WEBPACK_IMPORTED_MODULE_166__);
/* harmony import */ var _UGUI_IMaterialModifier__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(173);
/* harmony import */ var _UGUI_IMaterialModifier__WEBPACK_IMPORTED_MODULE_167___default = /*#__PURE__*/__webpack_require__.n(_UGUI_IMaterialModifier__WEBPACK_IMPORTED_MODULE_167__);
/* harmony import */ var _UGUI_IMaskable__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(174);
/* harmony import */ var _UGUI_IMaskable__WEBPACK_IMPORTED_MODULE_168___default = /*#__PURE__*/__webpack_require__.n(_UGUI_IMaskable__WEBPACK_IMPORTED_MODULE_168__);
/* harmony import */ var _UGUI_Type__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(175);
/* harmony import */ var _UGUI_Type__WEBPACK_IMPORTED_MODULE_169___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Type__WEBPACK_IMPORTED_MODULE_169__);
/* harmony import */ var _UGUI_Navigation__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(176);
/* harmony import */ var _UGUI_Navigation__WEBPACK_IMPORTED_MODULE_170___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Navigation__WEBPACK_IMPORTED_MODULE_170__);
/* harmony import */ var _UGUI_Mode__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(177);
/* harmony import */ var _UGUI_Mode__WEBPACK_IMPORTED_MODULE_171___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Mode__WEBPACK_IMPORTED_MODULE_171__);
/* harmony import */ var _UGUI_Direction__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(178);
/* harmony import */ var _UGUI_Direction__WEBPACK_IMPORTED_MODULE_172___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Direction__WEBPACK_IMPORTED_MODULE_172__);
/* harmony import */ var _UGUI_MovementType__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(179);
/* harmony import */ var _UGUI_MovementType__WEBPACK_IMPORTED_MODULE_173___default = /*#__PURE__*/__webpack_require__.n(_UGUI_MovementType__WEBPACK_IMPORTED_MODULE_173__);
/* harmony import */ var _UGUI_ScrollbarVisibility__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(180);
/* harmony import */ var _UGUI_ScrollbarVisibility__WEBPACK_IMPORTED_MODULE_174___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ScrollbarVisibility__WEBPACK_IMPORTED_MODULE_174__);
/* harmony import */ var _UGUI_Transition__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(181);
/* harmony import */ var _UGUI_Transition__WEBPACK_IMPORTED_MODULE_175___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Transition__WEBPACK_IMPORTED_MODULE_175__);
/* harmony import */ var _UGUI_SpriteState__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(182);
/* harmony import */ var _UGUI_SpriteState__WEBPACK_IMPORTED_MODULE_176___default = /*#__PURE__*/__webpack_require__.n(_UGUI_SpriteState__WEBPACK_IMPORTED_MODULE_176__);
/* harmony import */ var _UGUI_ToggleTransition__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(183);
/* harmony import */ var _UGUI_ToggleTransition__WEBPACK_IMPORTED_MODULE_177___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ToggleTransition__WEBPACK_IMPORTED_MODULE_177__);
/* harmony import */ var _UGUI_VertexHelper__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__(184);
/* harmony import */ var _UGUI_VertexHelper__WEBPACK_IMPORTED_MODULE_178___default = /*#__PURE__*/__webpack_require__.n(_UGUI_VertexHelper__WEBPACK_IMPORTED_MODULE_178__);
/* harmony import */ var _UGUI_UICharInfo__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__(185);
/* harmony import */ var _UGUI_UICharInfo__WEBPACK_IMPORTED_MODULE_179___default = /*#__PURE__*/__webpack_require__.n(_UGUI_UICharInfo__WEBPACK_IMPORTED_MODULE_179__);
/* harmony import */ var _UGUI_UILineInfo__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__(186);
/* harmony import */ var _UGUI_UILineInfo__WEBPACK_IMPORTED_MODULE_180___default = /*#__PURE__*/__webpack_require__.n(_UGUI_UILineInfo__WEBPACK_IMPORTED_MODULE_180__);
/* harmony import */ var _UGUI_UIVertex__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__(187);
/* harmony import */ var _UGUI_UIVertex__WEBPACK_IMPORTED_MODULE_181___default = /*#__PURE__*/__webpack_require__.n(_UGUI_UIVertex__WEBPACK_IMPORTED_MODULE_181__);
/* harmony import */ var _UGUI_ILayoutController__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__(188);
/* harmony import */ var _UGUI_ILayoutController__WEBPACK_IMPORTED_MODULE_182___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ILayoutController__WEBPACK_IMPORTED_MODULE_182__);
/* harmony import */ var _UGUI_ILayoutGroup__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__(189);
/* harmony import */ var _UGUI_ILayoutGroup__WEBPACK_IMPORTED_MODULE_183___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ILayoutGroup__WEBPACK_IMPORTED_MODULE_183__);
/* harmony import */ var _UGUI_ButtonClickedEvent__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__(190);
/* harmony import */ var _UGUI_ButtonClickedEvent__WEBPACK_IMPORTED_MODULE_184___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ButtonClickedEvent__WEBPACK_IMPORTED_MODULE_184__);
/* harmony import */ var _UGUI_CullStateChangedEvent__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__(191);
/* harmony import */ var _UGUI_CullStateChangedEvent__WEBPACK_IMPORTED_MODULE_185___default = /*#__PURE__*/__webpack_require__.n(_UGUI_CullStateChangedEvent__WEBPACK_IMPORTED_MODULE_185__);
/* harmony import */ var _UGUI_ScrollEvent__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__(192);
/* harmony import */ var _UGUI_ScrollEvent__WEBPACK_IMPORTED_MODULE_186___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ScrollEvent__WEBPACK_IMPORTED_MODULE_186__);
/* harmony import */ var _UGUI_SliderEvent__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__(193);
/* harmony import */ var _UGUI_SliderEvent__WEBPACK_IMPORTED_MODULE_187___default = /*#__PURE__*/__webpack_require__.n(_UGUI_SliderEvent__WEBPACK_IMPORTED_MODULE_187__);
/* harmony import */ var _UGUI_ToggleEvent__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__(194);
/* harmony import */ var _UGUI_ToggleEvent__WEBPACK_IMPORTED_MODULE_188___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ToggleEvent__WEBPACK_IMPORTED_MODULE_188__);
/* harmony import */ var _UGUI_ScrollRectEvent__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__(195);
/* harmony import */ var _UGUI_ScrollRectEvent__WEBPACK_IMPORTED_MODULE_189___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ScrollRectEvent__WEBPACK_IMPORTED_MODULE_189__);
/* harmony import */ var _UGUI_BaseMeshEffect__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__(196);
/* harmony import */ var _UGUI_BaseMeshEffect__WEBPACK_IMPORTED_MODULE_190___default = /*#__PURE__*/__webpack_require__.n(_UGUI_BaseMeshEffect__WEBPACK_IMPORTED_MODULE_190__);
/* harmony import */ var _UGUI_Selectable__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__(197);
/* harmony import */ var _UGUI_Selectable__WEBPACK_IMPORTED_MODULE_191___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Selectable__WEBPACK_IMPORTED_MODULE_191__);
/* harmony import */ var _UGUI_Graphic__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__(198);
/* harmony import */ var _UGUI_Graphic__WEBPACK_IMPORTED_MODULE_192___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Graphic__WEBPACK_IMPORTED_MODULE_192__);
/* harmony import */ var _UGUI_LayoutGroup__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__(199);
/* harmony import */ var _UGUI_LayoutGroup__WEBPACK_IMPORTED_MODULE_193___default = /*#__PURE__*/__webpack_require__.n(_UGUI_LayoutGroup__WEBPACK_IMPORTED_MODULE_193__);
/* harmony import */ var _UGUI_ScrollRect__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__(200);
/* harmony import */ var _UGUI_ScrollRect__WEBPACK_IMPORTED_MODULE_194___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ScrollRect__WEBPACK_IMPORTED_MODULE_194__);
/* harmony import */ var _UGUI_ToggleGroup__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__(201);
/* harmony import */ var _UGUI_ToggleGroup__WEBPACK_IMPORTED_MODULE_195___default = /*#__PURE__*/__webpack_require__.n(_UGUI_ToggleGroup__WEBPACK_IMPORTED_MODULE_195__);
/* harmony import */ var _UGUI_Button__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__(202);
/* harmony import */ var _UGUI_Button__WEBPACK_IMPORTED_MODULE_196___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Button__WEBPACK_IMPORTED_MODULE_196__);
/* harmony import */ var _UGUI_GridLayoutGroup__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__(203);
/* harmony import */ var _UGUI_GridLayoutGroup__WEBPACK_IMPORTED_MODULE_197___default = /*#__PURE__*/__webpack_require__.n(_UGUI_GridLayoutGroup__WEBPACK_IMPORTED_MODULE_197__);
/* harmony import */ var _UGUI_MaskableGraphic__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__(204);
/* harmony import */ var _UGUI_MaskableGraphic__WEBPACK_IMPORTED_MODULE_198___default = /*#__PURE__*/__webpack_require__.n(_UGUI_MaskableGraphic__WEBPACK_IMPORTED_MODULE_198__);
/* harmony import */ var _UGUI_Shadow__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__(205);
/* harmony import */ var _UGUI_Shadow__WEBPACK_IMPORTED_MODULE_199___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Shadow__WEBPACK_IMPORTED_MODULE_199__);
/* harmony import */ var _UGUI_Scrollbar__WEBPACK_IMPORTED_MODULE_200__ = __webpack_require__(206);
/* harmony import */ var _UGUI_Scrollbar__WEBPACK_IMPORTED_MODULE_200___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Scrollbar__WEBPACK_IMPORTED_MODULE_200__);
/* harmony import */ var _UGUI_Slider_js__WEBPACK_IMPORTED_MODULE_201__ = __webpack_require__(207);
/* harmony import */ var _UGUI_Slider_js__WEBPACK_IMPORTED_MODULE_201___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Slider_js__WEBPACK_IMPORTED_MODULE_201__);
/* harmony import */ var _UGUI_Toggle_js__WEBPACK_IMPORTED_MODULE_202__ = __webpack_require__(208);
/* harmony import */ var _UGUI_Toggle_js__WEBPACK_IMPORTED_MODULE_202___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Toggle_js__WEBPACK_IMPORTED_MODULE_202__);
/* harmony import */ var _UGUI_Image_js__WEBPACK_IMPORTED_MODULE_203__ = __webpack_require__(209);
/* harmony import */ var _UGUI_Image_js__WEBPACK_IMPORTED_MODULE_203___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Image_js__WEBPACK_IMPORTED_MODULE_203__);
/* harmony import */ var _UGUI_Outline_js__WEBPACK_IMPORTED_MODULE_204__ = __webpack_require__(210);
/* harmony import */ var _UGUI_Outline_js__WEBPACK_IMPORTED_MODULE_204___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Outline_js__WEBPACK_IMPORTED_MODULE_204__);
/* harmony import */ var _UGUI_Text_js__WEBPACK_IMPORTED_MODULE_205__ = __webpack_require__(211);
/* harmony import */ var _UGUI_Text_js__WEBPACK_IMPORTED_MODULE_205___default = /*#__PURE__*/__webpack_require__.n(_UGUI_Text_js__WEBPACK_IMPORTED_MODULE_205__);
/* harmony import */ var _Debug_WADebugger__WEBPACK_IMPORTED_MODULE_206__ = __webpack_require__(212);
// 安装所有Adaptor模块
 // Coroutine






 // Extended Helper Class





 // Base



 // Debug

 // Math









 // CoreMudule






 // Audio



 //





 // Geometry

 // SDK


 // Physics











 // Event





































 // Graphics




 // System






 // Network











 // Render
















 // Animation










 // Expection

 // Attribute


















 // UGUI





















































/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 顶级命名空间赋值为对象字面量
var MiniGameAdaptor = {
  engineToAdaptorMap: {
    weakMap: new WeakMap(),
    get: function get(entity) {
      if (entity && !this.weakMap.has(entity)) {
        this.set(entity, new MiniGameAdaptor.GameObject.$ctor3(entity));
      }

      return this.weakMap.get(entity);
    },
    has: function has(entity) {
      return this.weakMap.has(entity);
    },
    set: function set(entity, value) {
      this.weakMap.set(entity, value);
    }
  }
}; // 解析字符命名空间并自动生成嵌套命名空间的快捷方法

function register(path) {
  var moduleObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MiniGameAdaptor;
  var parts = path.split("."),
      pl;
  pl = parts.length;

  for (var i = 0; i < pl; i++) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = moduleObj;
    }

    parent = parent[parts[i]];
  }

  moduleObj.$$name = "MiniGameAdaptor." + path;
  return parent;
}

MiniGameAdaptor.register = register;
/*let Mathf = {};
MiniGameAdaptor.register('Mathf', Mathf);
MiniGameAdaptor.register('Mathf.Vector2', {});
MiniGameAdaptor.register('Ver', {}, MiniGameAdaptor.Mathf.Vector2);
console.log(MiniGameAdaptor);*/

window.MiniGameAdaptor = MiniGameAdaptor; // prefab hack

Object.defineProperty(engine.Prefab.prototype, 'gameObject', {
  get: function get() {
    return this;
  }
});
Object.defineProperty(engine.Prefab.prototype, 'transform', {
  get: function get() {
    return this;
  }
});
Object.defineProperty(engine.Prefab.prototype, 'name', {
  get: function get() {
    return this.data.meta.name;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (MiniGameAdaptor);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.YieldInstruction", {
    inherits: [System.Collections.IEnumerator],
    props: {
      Current: {
        get: function get() {
          return null;
        }
      }
    },
    alias: ["Current", "System$Collections$IEnumerator$Current", "moveNext", "System$Collections$IEnumerator$moveNext", "reset", "System$Collections$IEnumerator$reset"],
    methods: {
      moveNext: function moveNext() {
        return this.keepWaiting;
      },
      reset: function reset() {}
    }
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.CustomYieldInstruction", {
    inherits: [MiniGameAdaptor.YieldInstruction]
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Coroutine", {
    inherits: [MiniGameAdaptor.YieldInstruction],
    fields: {
      routine: null,
      waitForCoroutine: null,
      finished: false,
      __past: null
    },
    props: {
      keepWaiting: {
        get: function get() {
          return this.finished;
        }
      }
    },
    ctors: {
      ctor: function ctor(routine) {
        this.$initialize();
        MiniGameAdaptor.YieldInstruction.ctor.call(this);
        this.routine = routine;
      }
    }
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.CoroutineManager", {
    statics: {
      fields: {
        instance: null
      },
      props: {
        Instance: {
          get: function get() {
            if (!MiniGameAdaptor.CoroutineManager.instance) {
              MiniGameAdaptor.CoroutineManager.instance = new MiniGameAdaptor.CoroutineManager();
            }

            return MiniGameAdaptor.CoroutineManager.instance;
          }
        }
      },
      ctors: {
        init: function init() {
          this.instance = new MiniGameAdaptor.CoroutineManager();
        }
      },
      methods: {}
    },
    fields: {
      coroutines: null
    },
    ctors: {
      init: function init() {
        this.coroutines = new (System.Collections.Generic.List$1(MiniGameAdaptor.Coroutine).ctor)();
      },
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      StartCoroutine: function StartCoroutine(routine) {
        var coroutine = new MiniGameAdaptor.Coroutine(routine);
        this.coroutines.add(coroutine);
        return coroutine;
      },
      StopCoroutine: function StopCoroutine(routine) {
        this.coroutines.remove(routine);
      },
      StopAllCoroutines: function StopAllCoroutines() {
        this.coroutines.clear();
      },
      Update: function Update() {
        var $t;
        $t = Bridge.getEnumerator(System.Linq.Enumerable.from(this.coroutines, MiniGameAdaptor.Coroutine).reverse());

        try {
          while ($t.moveNext()) {
            var coroutine = $t.Current;

            if (Bridge.is(coroutine.routine.System$Collections$IEnumerator$Current, MiniGameAdaptor.YieldInstruction)) {
              coroutine.waitForCoroutine = Bridge.as(coroutine.routine.System$Collections$IEnumerator$Current, MiniGameAdaptor.YieldInstruction);
            }

            if (coroutine.waitForCoroutine != null && !coroutine.waitForCoroutine.keepWaiting) {
              coroutine.waitForCoroutine = null;
            }

            if (coroutine.waitForCoroutine != null) {
              continue;
            } // update coroutine
            // 执行 yield return 内的协程


            if (coroutine.routine.routine && coroutine.routine.routine.System$Collections$IEnumerator$moveNext()) {
              coroutine.finished = false;
              var c = coroutine.routine.routine.System$Collections$IEnumerator$Current;

              if (c && c instanceof MiniGameAdaptor.YieldInstruction) {
                var innerCoroutine = new MiniGameAdaptor.Coroutine(c);
                innerCoroutine.__past = coroutine; // 在IEnumerator里修改元素

                this.coroutines = this.coroutines.ConvertAll(MiniGameAdaptor.Coroutine, function (e) {
                  if (e === coroutine) {
                    e = innerCoroutine;
                  }

                  return e;
                });
              }
            } else if (coroutine.routine.System$Collections$IEnumerator$moveNext()) {
              coroutine.finished = false;
              var c = coroutine.routine.System$Collections$IEnumerator$Current;

              if (c && c instanceof MiniGameAdaptor.YieldInstruction) {
                // yield return StartCoroutine(Foo()) 的情况，需要将Foo其从coroutines数组中移除，并优先执行Foo协程
                // 待Foo协程执行完毕后，再继续执行yield return StartCoroutine(Foo()) 后面的语句
                // 因此在Foo协程上，用__past指向当前协程，并用Foo协程替换coroutines数组中的当前协程
                this.coroutines.remove(c);
                var innerCoroutine = new MiniGameAdaptor.Coroutine(c);
                innerCoroutine.__past = coroutine; // 在IEnumerator里修改元素

                this.coroutines = this.coroutines.ConvertAll(MiniGameAdaptor.Coroutine, function (e) {
                  if (e.routine.current === c) {
                    e = innerCoroutine;
                  }

                  return e;
                });
              }
            } // 执行完当前协程
            else {
                if (coroutine && coroutine.__past) {
                  // 如果当前协程执行完毕，需要返回到上一层调用处继续执行未完成的协程
                  // 此处将当前协程里指向上一层协程的__past，还原回coroutines中
                  this.coroutines = this.coroutines.ConvertAll(MiniGameAdaptor.Coroutine, function (e) {
                    if (e === coroutine) {
                      e = coroutine.__past;
                    }

                    return e;
                  });
                } // 执行完的协程移出数组


                this.coroutines.remove(coroutine);
                coroutine.finished = true;
              }
          }
        } finally {
          if (Bridge.is($t, System.IDisposable)) {
            $t.System$IDisposable$Dispose();
          }
        }
      }
    }
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.WaitForSeconds", {
    inherits: [MiniGameAdaptor.YieldInstruction],
    fields: {
      endTime: 0
    },
    props: {
      keepWaiting: {
        get: function get() {
          if (MiniGameAdaptor.Time.time <= this.endTime) {
            return true;
          }

          return false;
        }
      }
    },
    ctors: {
      ctor: function ctor(seconds) {
        this.$initialize();
        MiniGameAdaptor.YieldInstruction.ctor.call(this); // this.endTime = Date.now() + seconds * 1000;

        this.endTime = MiniGameAdaptor.Time.time + seconds;
      }
    }
  });
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.WaitForEndOfFrame", {
    inherits: [MiniGameAdaptor.YieldInstruction],
    fields: {
      first: true
    },
    props: {
      keepWaiting: {
        get: function get() {
          if (this.first) {
            this.first = false;
            return true;
          }

          return false;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.YieldInstruction.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onRootMonoBehaviourUpdate", function() { return onRootMonoBehaviourUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offRootMonoBehaviourUpdate", function() { return offRootMonoBehaviourUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onRootMonoBehaviourStart", function() { return onRootMonoBehaviourStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offRootMonoBehaviourStart", function() { return offRootMonoBehaviourStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSceneLoad", function() { return onSceneLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offSceneLoad", function() { return offSceneLoad; });
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var globalUpdateCallback = new Set();

function onRootMonoBehaviourUpdate(callback) {
  globalUpdateCallback.add(callback);
}

function offRootMonoBehaviourUpdate(callback) {
  globalUpdateCallback["delete"](callback);
} // onStart callback


var globalStartCallback = new Set();

function onRootMonoBehaviourStart(callback) {
  globalStartCallback.add(callback);
}

function offRootMonoBehaviourStart(callback) {
  globalStartCallback["delete"](callback);
} // 场景切换事件


var globalSceneLoadCallBack = new Set();

function onSceneLoad(callback) {
  globalStartCallback.add(callback);
}

function offSceneLoad(callback) {
  globalStartCallback["delete"](callback);
}

function invokeSceneLoadCallBack() {
  globalSceneLoadCallBack.forEach(function (callback) {
    callback();
  });
} // 具体模块实现


var RootMonoBehaviour = /*#__PURE__*/function (_engine$Script) {
  _inherits(RootMonoBehaviour, _engine$Script);

  function RootMonoBehaviour() {
    _classCallCheck(this, RootMonoBehaviour);

    return _possibleConstructorReturn(this, _getPrototypeOf(RootMonoBehaviour).call(this));
  }

  _createClass(RootMonoBehaviour, [{
    key: "onAwake",
    value: function onAwake() {}
  }, {
    key: "onEnable",
    value: function onEnable() {}
  }, {
    key: "onStart",
    value: function onStart() {
      globalStartCallback.forEach(function (callback) {
        callback();
      });
    }
  }, {
    key: "onFixedUpdate",
    value: function onFixedUpdate() {}
  }, {
    key: "onUpdate",
    value: function onUpdate(dt) {
      _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].CoroutineManager.Instance.Update();
      globalUpdateCallback.forEach(function (callback) {
        callback(dt);
      });
    }
  }, {
    key: "onLateUpdate",
    value: function onLateUpdate() {}
  }, {
    key: "onDisable",
    value: function onDisable() {}
  }, {
    key: "onDestroy",
    value: function onDestroy() {}
  }]);

  return RootMonoBehaviour;
}(engine.Script);

_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('RootMonoBehaviour', RootMonoBehaviour); // var originPlayScene = game.playScene;

setTimeout(function () {
  var root = game.activeScene.root;
  root.addComponent(_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].RootMonoBehaviour);
  invokeSceneLoadCallBack();
}, 0);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var UnityDeserializeHelper = /*#__PURE__*/function () {
  function UnityDeserializeHelper() {
    _classCallCheck(this, UnityDeserializeHelper);
  }

  _createClass(UnityDeserializeHelper, null, [{
    key: "Deserialize",
    value: function Deserialize(info, comp, context, builtContext) {
      var type = info.type;
      var data = info.data;

      if (!type) {
        throw new Error("Deserialize type is ".concat(type));
      }

      if (type === 'number' || type === 'string' || type === 'boolean') {
        return data;
      }

      if (type === 'UnityPrefabWrapper') {
        var t = data.type;
        var p = data.path;
        return _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].UnityPrefabManager.loadedPrefabsMap.tryGetSync(p);
      }

      if (data.type === 'UnityPrefabWrapper') {
        var _p = data.value.path;
        return _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].UnityPrefabManager.loadedPrefabsMap.tryGetSync(_p);
      }

      if (typeof data === 'number' || data.value && typeof data.value === 'number') {
        // 特殊处理GameObject的反序列化
        if (type === 'MiniGameAdaptor.GameObject') {
          // let transform = MiniGameAdaptor.UnityDeserializeHelper.Deserialize({type: 'Transform3D', data: data.value});
          var transform = builtContext.components.data[data.value];
          return _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].engineToAdaptorMap.get(transform.entity);
        }

        return builtContext.components.data[data];
      }

      return engine.SerializeHelper.Deserialize({
        type: type,
        data: data
      }, null, context, builtContext);
    }
  }]);

  return UnityDeserializeHelper;
}();

_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('UnityDeserializeHelper', UnityDeserializeHelper);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function UnityComponentWrapper(_type) {
  var ComponentWrapper = /*#__PURE__*/function () {
    function ComponentWrapper() {
      _classCallCheck(this, ComponentWrapper);
    }

    _createClass(ComponentWrapper, null, [{
      key: "Deserialize",
      value: function Deserialize(data, comp, context, builtContext) {
        if (typeof data === 'number') {
          var c;

          if (c = builtContext.components.data[data]) {
            return c;
          }
        }

        var type = data.type;
        var item = data.value; // 特殊处理GameObject的反序列化

        if (type === 'MiniGameAdaptor.GameObject') {
          var transform = _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].UnityDeserializeHelper.Deserialize({
            type: 'Transform3D',
            data: item
          }, comp, context, builtContext);
          return _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].engineToAdaptorMap.get(transform.entity);
        }

        return _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].UnityDeserializeHelper.Deserialize({
          type: type,
          data: item
        }, comp, context, builtContext);
      }
    }]);

    return ComponentWrapper;
  }();

  var __type = 'ComponentWrapper';
  if (_type) __type += '_' + _type;
  engine.decorators.serialize(__type)(ComponentWrapper);
  return __type;
} // 将对象挂在到MiniGameAdaptor


_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('UnityComponentWrapper', UnityComponentWrapper);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var UnityPrefabManager = {
  loadedPrefabsMap: {
    __prefabsMap: new Map(),
    get: function get(path) {
      if (!this.__prefabsMap.has(path)) throw new Error(path + " not exists, try load it first");
      return this.__prefabsMap.get(path);
    },
    has: function has(path) {
      return this.__prefabsMap.has(path);
    },
    tryGetSync: function tryGetSync(path) {
      var prefab = null;

      if (!this.__prefabsMap.has(path)) {
        try {
          prefab = engine.loader.getAsset(path);

          this.__prefabsMap.set(path, prefab);
        } catch (e) {} finally {
          return prefab;
        }
      }

      return this.__prefabsMap.get(path);
    },
    tryGetAsync: function tryGetAsync(path, callback) {
      var _this = this;

      if (!this.__prefabsMap.has(path)) {
        // to avoid load the same prefab twice
        this.__prefabsMap.set(path, null);

        engine.loader.load(path).promise.then(function (prefab) {
          _this.__prefabsMap.set(path, prefab);

          callback(prefab);
        });
      } else {
        callback(this.__prefabsMap.get(path));
      }
    },
    addAsync: function addAsync(path, callback) {
      var _this2 = this;

      if (!this.__prefabsMap.has(path)) {
        this.__prefabsMap.set(path);

        engine.loader.load(path).promise.then(function (prefab) {
          _this2.__prefabsMap.set(path, prefab);

          if (callback) callback(prefab);
        });
      } else {
        if (callback) callback(this.__prefabsMap.get(path));
      }
    },
    addRangeAsync: function addRangeAsync(paths, callback) {
      var _this3 = this;

      if (!Array.isArray(paths)) throw new Error("invalid array");
      var prefabs = [];
      paths.forEach(function (path) {
        var p = path;

        _this3.addAsync(p, function (prefab) {
          prefabs.push(prefab);
        });
      });
      var promise = new Promise(function (resolve, reject) {
        if (prefabs.length === paths.length) {
          resolve(prefabs);
        } else {
          reject("reject");
        }
      });
      promise.then(function (value) {
        callback(value);
      });
    }
  }
}; // 将对象挂在到MiniGameAdaptor

_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('UnityPrefabManager', UnityPrefabManager);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function ListFactory(listInfo) {
  var type = listInfo.type;
  var isArray = listInfo.isArray;
  var item_is_obj = false;

  if (type == 'number') {
    type = System.Int32;
  } else {
    item_is_obj = true;
  }

  var TypedList = /*#__PURE__*/function () {
    function TypedList() {
      _classCallCheck(this, TypedList);
    }

    _createClass(TypedList, null, [{
      key: "Deserialize",
      value: function Deserialize(listData, comp, context, builtContext) {
        if (Array.isArray(listData) == false || listData.length == 0) {
          if (isArray) return System.Array.init([], type);
          return new (System.Collections.Generic.List$1(type).ctor)();
        }

        if (item_is_obj) {
          var newData = [];

          for (var i = 0; i < listData.length; i++) {
            var item = listData[i];
            var newItem = _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].UnityDeserializeHelper.Deserialize({
              type: type,
              data: item
            }, comp, context, builtContext);
            newData.push(newItem);
          }

          if (isArray) return System.Array.init(newData, type);
          return new (System.Collections.Generic.List$1(type).$ctor1)(newData);
        } else {
          if (isArray) return System.Array.init(listData, type);
          return new (System.Collections.Generic.List$1(type).$ctor1)(listData);
        }
      }
    }]);

    return TypedList;
  }();

  engine.decorators.serialize('List_' + type)(TypedList);
  return 'List_' + type;
} // 将对象挂在到MiniGameAdaptor


_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('ListFactory', ListFactory);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * @compiler Bridge.NET 17.9.0
 */
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.LogOption", {
    $kind: "enum",
    statics: {
      fields: {
        None: 0,
        NoStacktrace: 1
      }
    }
  });
  Bridge.define("MiniGameAdaptor.LogType", {
    $kind: "enum",
    statics: {
      fields: {
        Error: 0,
        Assert: 1,
        Warning: 2,
        Log: 3,
        Exception: 4
      }
    }
  });
  Bridge.define("MiniGameAdaptor.PrimitiveType", {
    $kind: "enum",
    statics: {
      fields: {
        Sphere: 0,
        Capsule: 1,
        Cylinder: 2,
        Cube: 3,
        Plane: 4,
        Quad: 5
      }
    }
  });
  Bridge.define("MiniGameAdaptor.RuntimePlatform", {
    $kind: "enum",
    statics: {
      fields: {
        OSXEditor: 0,
        OSXPlayer: 1,
        WindowsPlayer: 2,
        OSXWebPlayer: 3,
        OSXDashboardPlayer: 4,
        WindowsWebPlayer: 5,
        WindowsEditor: 7,
        IPhonePlayer: 8,
        XBOX360: 10,
        PS3: 9,
        Android: 11,
        NaCl: 12,
        FlashPlayer: 15,
        LinuxPlayer: 13,
        LinuxEditor: 16,
        WebGLPlayer: 17,
        MetroPlayerX86: 18,
        WSAPlayerX86: 18,
        MetroPlayerX64: 19,
        WSAPlayerX64: 19,
        MetroPlayerARM: 20,
        WSAPlayerARM: 20,
        WP8Player: 21,
        BB10Player: 22,
        BlackBerryPlayer: 22,
        TizenPlayer: 23,
        PSP2: 24,
        PS4: 25,
        PSM: 26,
        XboxOne: 27,
        SamsungTVPlayer: 28,
        WiiU: 30,
        tvOS: 31,
        Switch: 32,
        Lumin: 33,
        Stadia: 34,
        WechatDevtools: 101
      }
    }
  });
  Bridge.define("MiniGameAdaptor.SendMessageOptions", {
    $kind: "enum",
    statics: {
      fields: {
        RequireReceiver: 0,
        DontRequireReceiver: 1
      }
    }
  });
  Bridge.define("MiniGameAdaptor.Space", {
    $kind: "enum",
    statics: {
      fields: {
        World: 0,
        Self: 1
      }
    }
  });
  Bridge.define("MiniGameAdaptor.SystemLanguage", {
    $kind: "enum",
    statics: {
      fields: {
        Afrikaans: 0,
        Arabic: 1,
        Basque: 2,
        Belarusian: 3,
        Bulgarian: 4,
        Catalan: 5,
        Chinese: 6,
        Czech: 7,
        Danish: 8,
        Dutch: 9,
        English: 10,
        Estonian: 11,
        Faroese: 12,
        Finnish: 13,
        French: 14,
        German: 15,
        Greek: 16,
        Hebrew: 17,
        Hugarian: 18,
        Icelandic: 19,
        Indonesian: 20,
        Italian: 21,
        Japanese: 22,
        Korean: 23,
        Latvian: 24,
        Lithuanian: 25,
        Norwegian: 26,
        Polish: 27,
        Portuguese: 28,
        Romanian: 29,
        Russian: 30,
        SerboCroatian: 31,
        Slovak: 32,
        Slovenian: 33,
        Spanish: 34,
        Swedish: 35,
        Thai: 36,
        Turkish: 37,
        Ukrainian: 38,
        Vietnamese: 39,
        ChineseSimplified: 40,
        ChineseTraditional: 41,
        Unknown: 42,
        Hungarian: 18
      }
    }
  });
  Bridge.define("MiniGameAdaptor.ThreadPriority", {
    $kind: "enum",
    statics: {
      fields: {
        Low: 0,
        BelowNormal: 1,
        Normal: 2,
        High: 4
      }
    }
  });
  Bridge.define("MiniGameAdaptor.SleepTimeout", {
    $kind: "enum",
    statics: {
      fields: {
        NeverSleep: -1,
        SystemSetting: -2
      }
    }
  });
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var _fixedDeltaTime = 0.04;
var _deltaTime = 0.02;
var _time = 0;
var _frameCount = 0;
var lastLevelLoadTime = _time;
var smoothDeltaTimer = {
  recordArray: [],
  recordMaxCount: 5,
  recordOldestIndex: 0,
  getSmoothDeltaTime: function getSmoothDeltaTime() {
    var result = 0;
    this.recordArray.forEach(function (dt) {
      result += dt;
    });
    return result / this.recordArray.length;
  }
};
Object(_Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_1__["onRootMonoBehaviourUpdate"])(function (dt) {
  // dt = 0.0167;
  _deltaTime = dt;
  _time += dt;
  _frameCount++; // console.log(_time);

  if (smoothDeltaTimer.recordArray.length < smoothDeltaTimer.recordMaxCount) {
    smoothDeltaTimer.recordArray.push(dt);
  } else {
    smoothDeltaTimer.recordArray[smoothDeltaTimer.recordOldestIndex] = dt;
    smoothDeltaTimer.recordOldestIndex = (smoothDeltaTimer.recordOldestIndex + 1) % smoothDeltaTimer.recordMaxCount;
  }
});
Object(_Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_1__["onSceneLoad"])(function () {
  lastLevelLoadTime = _time;
});

var Time = /*#__PURE__*/function () {
  function Time() {
    _classCallCheck(this, Time);
  }

  _createClass(Time, null, [{
    key: "time",
    get: function get() {
      return _time;
    }
  }, {
    key: "deltaTime",
    get: function get() {
      return _deltaTime;
    }
  }, {
    key: "fixedDeltaTime",
    get: function get() {
      return _fixedDeltaTime;
    },
    set: function set(v) {
      _fixedDeltaTime = v;
    }
  }, {
    key: "frameCount",
    get: function get() {
      return _frameCount;
    }
  }, {
    key: "realtimeSinceStartup",
    get: function get() {
      return _time;
    }
  }, {
    key: "unscaledDeltaTime",
    get: function get() {
      return _deltaTime;
    } // 这是以秒计算到最后的关卡已经加载完的时间。

  }, {
    key: "timeSinceLevelLoad",
    get: function get() {
      return _time - lastLevelLoadTime;
    }
  }, {
    key: "smoothDeltaTime",
    get: function get() {
      return smoothDeltaTimer.getSmoothDeltaTime();
    }
  }]);

  return Time;
}(); // 将对象挂在到MiniGameAdaptor


_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('Time', Time);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.LayerMask", {
    $kind: "struct",
    statics: {
      methods: {
        GetMask: function GetMask(layerNames) {
          if (layerNames === void 0) {
            layerNames = [];
          }

          return new MiniGameAdaptor.LayerMask();
        },
        LayerToName: function LayerToName(layer) {
          return "Default";
        },
        NameToLayer: function NameToLayer(layerName) {
          return 0;
        },
        op_Implicit: function op_Implicit(mask) {
          // throw new System.Exception("not impl");
          return mask._mask;
        },
        op_Implicit$1: function op_Implicit$1(intVal) {
          // throw new System.Exception("not impl");
          return new MiniGameAdaptor.LayerMask.$ctor1(intVal);
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.LayerMask();
        }
      }
    },
    fields: {
      _mask: 0
    },
    props: {
      value: {
        get: function get() {
          return this._mask;
        },
        set: function set(value) {
          this._mask = value;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      },
      $ctor1: function $ctor1(intVal) {
        this.$initialize();
        this._mask = intVal;
      }
    },
    methods: {
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.LayerMask')(MiniGameAdaptor.LayerMask);
Object.defineProperty(MiniGameAdaptor.LayerMask.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.LayerMask.prototype.__properties)
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // 具体模块实现

var Debug = /*#__PURE__*/function () {
  function Debug() {
    _classCallCheck(this, Debug);
  }

  _createClass(Debug, null, [{
    key: "Assert",
    value: function Assert() {
      var _console;

      (_console = console).assert.apply(_console, arguments);
    }
  }, {
    key: "Log",
    value: function Log() {
      var _console2;

      (_console2 = console).log.apply(_console2, arguments);
    }
  }, {
    key: "LogError",
    value: function LogError() {
      var _console3;

      (_console3 = console).error.apply(_console3, arguments);
    }
  }, {
    key: "LogError$1",
    value: function LogError$1() {
      var _console4;

      (_console4 = console).error.apply(_console4, arguments);
    }
  }, {
    key: "LogWarning",
    value: function LogWarning() {
      var _console5;

      (_console5 = console).warn.apply(_console5, arguments);
    }
  }, {
    key: "LogFormat",
    value: function LogFormat() {
      if (arguments.length == 2) {
        var _System$String;

        Debug.Log((_System$String = System.String).format.apply(_System$String, arguments));
      } else if (arguments.length == 3) {
        Debug.Log(System.String.format(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]));
      } else if (arguments.length == 5) {
        var logType = arguments.length <= 0 ? undefined : arguments[0];
        var logMethod = 'Log';

        switch (logType) {
          case _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].LogType.Log:
            logMethod = 'Log';
            break;

          case _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].LogType.Error:
            logMethod = 'LogError';
            break;

          case _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].LogType.Assert:
            logMethod = 'Log';
            break;

          case _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].LogType.Warning:
            logMethod = 'LogWarning';
            break;

          case nityEngine.LogType.Exception:
            logMethod = 'LogError';
            break;
        }

        Debug[logMethod](System.String.format(arguments.length <= 3 ? undefined : arguments[3], arguments.length <= 4 ? undefined : arguments[4]));
      } else {
        throw new System.Exception("LogFormat arguments length");
      }
    }
  }, {
    key: "Break",
    value: function Break() {
      debugger;
    } // 是否是调试模式

  }, {
    key: "isDebugBuild",
    get: function get() {
      return __wxConfig.platform === "devtools";
    }
  }]);

  return Debug;
}(); // 将对象挂在到MiniGameAdaptor


_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('Debug', Debug);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var GAMMA_TO_LINEAR = 2.2;
var LINEAR_TO_GAMMA = 0.45454545;
var RANDOM_SEED = 0.8694896071683615; // =====================================================================================
// Ported from Stefan Gustavson's java implementation
// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
// Read Stefan's excellent paper for details on how this code works.
//
// Sean McCullough banksean@gmail.com
// credits https://gist.github.com/banksean/304522#file-perlin-noise-simplex-js-L156

/**
 * You can pass in a random number generator object if you like.
 * It is assumed to have a random() method.
 */

function SimplexNoise(seed) {
  var i;
  if (!seed) seed = Math.random();
  this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
  this.p = [];

  for (i = 0; i < 256; i++) {
    this.p[i] = Math.floor(seed * 256);
  } // To remove the need for index wrapping, double the permutation table length


  this.perm = [];

  for (i = 0; i < 512; i++) {
    this.perm[i] = this.p[i & 255];
  }
}

SimplexNoise.prototype.dot = function (g, x, y) {
  return g[0] * x + g[1] * y;
};

SimplexNoise.prototype.noise = function (xin, yin) {
  var n0,
      n1,
      n2,
      // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in
  F2 = 0.5 * (Math.sqrt(3.0) - 1.0),
      s = (xin + yin) * F2,
      // Hairy factor for 2D
  i = Math.floor(xin + s),
      j = Math.floor(yin + s),
      G2 = (3.0 - Math.sqrt(3.0)) / 6.0,
      t = (i + j) * G2,
      X0 = i - t,
      // Unskew the cell origin back to (x,y) space
  Y0 = j - t,
      x0 = xin - X0,
      // The x,y distances from the cell origin
  y0 = yin - Y0,
      // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
  i1,
      j1,
      // Offsets for second (middle) corner of simplex in (i,j) coords
  x1,
      x2,
      y1,
      y2,
      ii,
      jj,
      gi0,
      gi1,
      gi2,
      t0,
      t1,
      t2;

  if (x0 > y0) {
    // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1 = 1;
    j1 = 0;
  } else {
    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1 = 0;
    j1 = 1;
  } // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6


  x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords

  y1 = y0 - j1 + G2;
  x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords

  y2 = y0 - 1.0 + 2.0 * G2; // Work out the hashed gradient indices of the three simplex corners

  ii = i & 255;
  jj = j & 255;
  gi0 = this.perm[ii + this.perm[jj]] % 12;
  gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
  gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12; // Calculate the contribution from the three corners

  t0 = 0.5 - x0 * x0 - y0 * y0;

  if (t0 < 0) {
    n0 = 0.0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0); // (x,y) of grad3 used for 2D gradient
  }

  t1 = 0.5 - x1 * x1 - y1 * y1;

  if (t1 < 0) {
    n1 = 0.0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
  }

  t2 = 0.5 - x2 * x2 - y2 * y2;

  if (t2 < 0) {
    n2 = 0.0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
  } // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].


  return 70.0 * (n0 + n1 + n2);
};

Bridge.define("MiniGameAdaptor.Mathf", {
  $kind: "struct",
  statics: {
    fields: {
      PI: 0,
      Infinity: 0,
      NegativeInfinity: 0,
      Deg2Rad: 0,
      Rad2Deg: 0,
      Epsilon: 0
    },
    ctors: {
      init: function init() {
        this.PI = Math.PI;
        this.Deg2Rad = Math.PI * 2 / 360;
        this.Rad2Deg = 1 / this.Deg2Rad;
        this.Infinity = Number.POSITIVE_INFINITY;
        this.NegativeInfinity = Number.NEGATIVE_INFINITY;
        this.Epsilon = 1e-5;
      }
    },
    methods: {
      Abs: function Abs(value) {
        return Math.abs(value);
      },
      Abs$1: function Abs$1(f) {
        return Math.abs(f);
      },
      Acos: function Acos(f) {
        return Math.acos(f);
      },
      Approximately: function Approximately(a, b) {
        // If a or b is zero, compare that the other is less or equal to epsilon.
        // If neither a or b are 0, then find an epsilon that is good for
        // comparing numbers at the maximum magnitude of a and b.
        // Floating points have about 7 significant digits, so
        // 1.000001f can be represented while 1.0000001f is rounded to zero,
        // thus we could use an epsilon of 0.000001f for comparing values close to 1.
        // We multiply this epsilon by the biggest magnitude of a and b.
        return MiniGameAdaptor.Mathf.Abs$1(b - a) < MiniGameAdaptor.Mathf.Max$2(1E-06 * MiniGameAdaptor.Mathf.Max$2(MiniGameAdaptor.Mathf.Abs$1(a), MiniGameAdaptor.Mathf.Abs$1(b)), MiniGameAdaptor.Mathf.Epsilon * 8);
      },
      Asin: function Asin(f) {
        return Math.asin(f);
      },
      Atan: function Atan(f) {
        return Math.atan(f);
      },
      Atan2: function Atan2(y, x) {
        return Math.atan2(y, x);
      },
      Ceil: function Ceil(f) {
        return Math.ceil(f);
      },
      CeilToInt: function CeilToInt(f) {
        return Bridge.Int.clip32(Math.ceil(f));
      },
      Clamp: function Clamp(value, min, max) {
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        }

        return value;
      },
      Clamp$1: function Clamp$1(value, min, max) {
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        }

        return value;
      },
      Clamp01: function Clamp01(value) {
        if (value < 0.0) {
          return 0.0;
        } else {
          if (value > 1.0) {
            return 1.0;
          } else {
            return value;
          }
        }
      },
      ClosestPowerOfTwo: function ClosestPowerOfTwo(value) {
        var nextPowerOfTwo = MiniGameAdaptor.Mathf.nextPowerOfTwo(value); // if value is between nextPowerOfTwo and pre-pre nextPowerOfTwo

        if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
          // prev power of two
          return nextPowerOfTwo >> 1;
        }

        return nextPowerOfTwo;
      },
      // TODO: test
      // https://github.com/Unity-Technologies/FPSSample/blob/master/Packages/com.unity.render-pipelines.high-definition/Runtime/Lighting/LightUtils.cs
      CorrelatedColorTemperatureToRGB: function CorrelatedColorTemperatureToRGB(temperature) {
        var r, g, b; // Temperature must fall between 1000 and 40000 degrees
        // The fitting require to divide kelvin by 1000 (allow more precision)

        var kelvin = MiniGameAdaptor.Mathf.Clamp(temperature, 1000.0, 40000.0) / 1000.0;
        var kelvin2 = kelvin * kelvin; // Using 6570 as a pivot is an approximation, pivot point for red is around 6580 and for blue and green around 6560.
        // Calculate each color in turn (Note, clamp is not really necessary as all value belongs to [0..1] but can help for extremum).
        // Red

        r = kelvin < 6.570 ? 1.0 : Mathf.Clamp((1.35651 + 0.216422 * kelvin + 0.000633715 * kelvin2) / (-3.24223 + 0.918711 * kelvin), 0.0, 1.0); // Green

        g = kelvin < 6.570 ? Mathf.Clamp((-399.809 + 414.271 * kelvin + 111.543 * kelvin2) / (2779.24 + 164.143 * kelvin + 84.7356 * kelvin2), 0.0, 1.0) : Mathf.Clamp((1370.38 + 734.616 * kelvin + 0.689955 * kelvin2) / (-4625.69 + 1699.87 * kelvin), 0.0, 1.0); //Blue

        b = kelvin > 6.570 ? 1.0 : Mathf.Clamp((348.963 - 523.53 * kelvin + 183.62 * kelvin2) / (2848.82 - 214.52 * kelvin + 78.8614 * kelvin2), 0.0, 1.0);
        return new Color(r, g, b, 1.0);
      },
      Cos: function Cos(f) {
        return Math.cos(f);
      },
      DeltaAngle: function DeltaAngle(current, target) {
        var delta = MiniGameAdaptor.Mathf.Repeat(target - current, 360.0);

        if (delta > 180.0) {
          delta -= 360.0;
        }

        return delta;
      },
      Exp: function Exp(power) {
        return Math.exp(power);
      },
      // TODO
      FloatToHalf: function FloatToHalf(val) {
        throw new System.Exception("not impl");
      },
      Floor: function Floor(f) {
        return Math.floor(f);
      },
      FloorToInt: function FloorToInt(f) {
        return Bridge.Int.clip32(Math.floor(f));
      },
      Gamma: function Gamma(value, absmax, gamma) {
        var negative = false;

        if (value < 0.0) {
          negative = true;
        }

        var absval = MiniGameAdaptor.Mathf.Abs$1(value);

        if (absval > absmax) {
          return negative ? -absval : absval;
        }

        var result = MiniGameAdaptor.Mathf.Pow(absval / absmax, gamma) * absmax;
        return negative ? -result : result;
      },
      GammaToLinearSpace: function GammaToLinearSpace(value) {
        // return Math.pow(value, GAMMA_TO_LINEAR);
        if (value <= 0.04045) return value / 12.92;else if (value < 1.0) return Math.pow((value + 0.055) / 1.055, 2.4);else return Math.pow(value, 2.4);
      },
      // TODO
      HalfToFloat: function HalfToFloat(val) {
        throw new System.Exception("not impl");
      },
      InverseLerp: function InverseLerp(a, b, value) {
        if (a !== b) {
          return MiniGameAdaptor.Mathf.Clamp01((value - a) / (b - a));
        } else {
          return 0.0;
        }
      },
      IsPowerOfTwo: function IsPowerOfTwo(value) {
        value = toInt(value);
        return (value & value - 1) === 0;
      },
      Lerp: function Lerp(a, b, t) {
        return a + (b - a) * MiniGameAdaptor.Mathf.Clamp01(t);
      },
      LerpAngle: function LerpAngle(a, b, t) {
        var delta = MiniGameAdaptor.Mathf.Repeat(b - a, 360);

        if (delta > 180) {
          delta -= 360;
        }

        return a + delta * MiniGameAdaptor.Mathf.Clamp01(t);
      },
      LerpUnclamped: function LerpUnclamped(a, b, t) {
        return a + (b - a) * t;
      },
      LinearToGammaSpace: function LinearToGammaSpace(value) {
        // return Math.pow(value, LINEAR_TO_GAMMA);
        if (value <= 0.0) return 0.0;else if (value <= 0.0031308) return 12.92 * value;else if (value <= 1.0) return 1.055 * Math.pow(value, 0.41666) - 0.055;else return Math.pow(value, 0.41666);
      },
      Log: function Log(f) {
        return Bridge.Math.log(f);
      },
      Log$1: function Log$1(f, p) {
        return Bridge.Math.logWithBase(f, p);
      },
      Log10: function Log10(f) {
        return Bridge.Math.logWithBase(f, 10.0);
      },
      Max: function Max(a, b) {
        return a > b ? a : b;
      },
      Max$1: function Max$1(values) {
        if (values === void 0) {
          values = [];
        }

        var len = values.length;

        if (len === 0) {
          return 0;
        }

        var m = values[System.Array.index(0, values)];

        for (var i = 1; i < len; i = i + 1 | 0) {
          if (values[System.Array.index(i, values)] > m) {
            m = values[System.Array.index(i, values)];
          }
        }

        return m;
      },
      Max$2: function Max$2(a, b) {
        return a > b ? a : b;
      },
      Max$3: function Max$3(values) {
        if (values === void 0) {
          values = [];
        }

        var len = values.length;

        if (len === 0) {
          return 0;
        }

        var m = values[System.Array.index(0, values)];

        for (var i = 1; i < len; i = i + 1 | 0) {
          if (values[System.Array.index(i, values)] > m) {
            m = values[System.Array.index(i, values)];
          }
        }

        return m;
      },
      Min: function Min(a, b) {
        return a < b ? a : b;
      },
      Min$1: function Min$1(values) {
        if (values === void 0) {
          values = [];
        }

        var len = values.length;

        if (len === 0) {
          return 0;
        }

        var m = values[System.Array.index(0, values)];

        for (var i = 1; i < len; i = i + 1 | 0) {
          if (values[System.Array.index(i, values)] < m) {
            m = values[System.Array.index(i, values)];
          }
        }

        return m;
      },
      Min$2: function Min$2(a, b) {
        return a > b ? a : b;
      },
      Min$3: function Min$3(values) {
        if (values === void 0) {
          values = [];
        }

        var len = values.length;

        if (len === 0) {
          return 0;
        }

        var m = values[System.Array.index(0, values)];

        for (var i = 1; i < len; i = i + 1 | 0) {
          if (values[System.Array.index(i, values)] > m) {
            m = values[System.Array.index(i, values)];
          }
        }

        return m;
      },
      MoveTowards: function MoveTowards(current, target, maxDelta) {
        if (MiniGameAdaptor.Mathf.Abs$1(target - current) <= maxDelta) {
          return target;
        }

        return current + MiniGameAdaptor.Mathf.Sign(target - current) * maxDelta;
      },
      MoveTowardsAngle: function MoveTowardsAngle(current, target, maxDelta) {
        var deltaAngle = MiniGameAdaptor.Mathf.DeltaAngle(current, target);

        if (-maxDelta < deltaAngle && deltaAngle < maxDelta) {
          return target;
        }

        target = current + deltaAngle;
        return MiniGameAdaptor.Mathf.MoveTowards(current, target, maxDelta);
      },
      NextPowerOfTwo: function NextPowerOfTwo(value) {
        value = toInt(value);
        if (value < 0) return 0;
        --value;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value += 1;
        return value;
      },
      PerlinNoise: function PerlinNoise(x, y) {
        return new SimplexNoise(RANDOM_SEED).noise(x, y);
      },
      PingPong: function PingPong(t, length) {
        t = MiniGameAdaptor.Mathf.Repeat(t, length * 2.0);
        return length - MiniGameAdaptor.Mathf.Abs$1(t - length);
      },
      Pow: function Pow(f, p) {
        return Math.pow(f, p);
      },
      Repeat: function Repeat(t, length) {
        return MiniGameAdaptor.Mathf.Clamp$1(t - MiniGameAdaptor.Mathf.Floor(t / length) * length, 0.0, length);
      },
      Round: function Round(f) {
        return Bridge.Math.round(f, 0, 6);
      },
      RoundToInt: function RoundToInt(f) {
        return Bridge.Int.clip32(Bridge.Math.round(f, 0, 6));
      },
      Sign: function Sign(f) {
        return f >= 0.0 ? 1.0 : -1.0;
      },
      Sin: function Sin(f) {
        return Math.sin(f);
      },
      SmoothDamp: function SmoothDamp(current, target, currentVelocity, smoothTime) {
        var maxSpeed = Infinity;
        var deltaTime = MiniGameAdaptor.Time.deltaTime;
        smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);
        var num = 2.0 / smoothTime;
        var num2 = num * deltaTime;
        var num3 = 1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
        var num4 = current - target;
        var num5 = target;
        var num6 = maxSpeed * smoothTime;
        num4 = MiniGameAdaptor.Mathf.Clamp(num4, -num6, num6);
        target = current - num4;
        var num7 = (currentVelocity.v + num * num4) * deltaTime;
        currentVelocity.v = (currentVelocity.v - num * num7) * num3;
        var num8 = target + (num4 + num7) * num3;

        if (num5 - current > 0.0 === num8 > num5) {
          num8 = num5;
          currentVelocity.v = (num8 - num5) / deltaTime;
        }

        return num8;
      },
      SmoothDamp$1: function SmoothDamp$1(current, target, currentVelocity, smoothTime, maxSpeed) {
        var deltaTime = MiniGameAdaptor.Time.deltaTime;
        smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);
        var num = 2.0 / smoothTime;
        var num2 = num * deltaTime;
        var num3 = 1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
        var num4 = current - target;
        var num5 = target;
        var num6 = maxSpeed * smoothTime;
        num4 = MiniGameAdaptor.Mathf.Clamp(num4, -num6, num6);
        target = current - num4;
        var num7 = (currentVelocity.v + num * num4) * deltaTime;
        currentVelocity.v = (currentVelocity.v - num * num7) * num3;
        var num8 = target + (num4 + num7) * num3;

        if (num5 - current > 0.0 === num8 > num5) {
          num8 = num5;
          currentVelocity.v = (num8 - num5) / deltaTime;
        }

        return num8;
      },
      SmoothDamp$2: function SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);
        var num = 2.0 / smoothTime;
        var num2 = num * deltaTime;
        var num3 = 1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
        var num4 = current - target;
        var num5 = target;
        var num6 = maxSpeed * smoothTime;
        num4 = MiniGameAdaptor.Mathf.Clamp(num4, -num6, num6);
        target = current - num4;
        var num7 = (currentVelocity.v + num * num4) * deltaTime;
        currentVelocity.v = (currentVelocity.v - num * num7) * num3;
        var num8 = target + (num4 + num7) * num3;

        if (num5 - current > 0.0 === num8 > num5) {
          num8 = num5;
          currentVelocity.v = (num8 - num5) / deltaTime;
        }

        return num8;
      },
      SmoothDampAngle: function SmoothDampAngle(current, target, currentVelocity, smoothTime) {
        var maxSpeed = Infinity;
        var deltaTime = MiniGameAdaptor.Time.deltaTime;
        target = current + MiniGameAdaptor.Mathf.DeltaAngle(current, target);
        return MiniGameAdaptor.Mathf.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
      },
      SmoothDampAngle$1: function SmoothDampAngle$1(current, target, currentVelocity, smoothTime, maxSpeed) {
        var deltaTime = MiniGameAdaptor.Time.deltaTime;
        target = current + MiniGameAdaptor.Mathf.DeltaAngle(current, target);
        return MiniGameAdaptor.Mathf.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
      },
      SmoothDampAngle$2: function SmoothDampAngle$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        target = current + MiniGameAdaptor.Mathf.DeltaAngle(current, target);
        return MiniGameAdaptor.Mathf.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
      },
      SmoothStep: function SmoothStep(from, to, t) {
        t = MiniGameAdaptor.Mathf.Clamp01(t);
        t = -2.0 * t * t * t + 3.0 * t * t;
        return to * t + from * (1.0 - t);
      },
      Sqrt: function Sqrt(f) {
        return Math.sqrt(f);
      },
      Tan: function Tan(f) {
        return Math.tan(f);
      },
      getDefaultValue: function getDefaultValue() {
        return new MiniGameAdaptor.Mathf();
      }
    }
  },
  methods: {
    $clone: function $clone(to) {
      return this;
    }
  }
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function M(row, col) {
  return row * 3 + col;
} // radians angle 


function GetRotationMatNormalVector(inVec, angle) {
  var s, c;
  var vx, vy, vz, xx, yy, zz, xy, yz, zx, xs, ys, zs, omc;
  s = Math.sin(angle);
  c = Math.cos(angle);
  vx = inVec.x;
  vy = inVec.y;
  vz = inVec.z;
  xx = vx * vx;
  yy = vy * vy;
  zz = vz * vz;
  xy = vx * vy;
  yz = vy * vz;
  zx = vz * vx;
  xs = vx * s;
  ys = vy * s;
  zs = vz * s; // one minus c

  omc = 1.0 - c;
  var res = [omc * xx + c, omc * xy + zs, omc * zx - ys, omc * xy - zs, omc * yy + c, omc * yz + xs, omc * zx + ys, omc * yz - xs, omc * zz + c];
  return res;
} // not unity class


var Matrix3x3 = /*#__PURE__*/function () {
  function Matrix3x3(e11, e12, e13, e21, e22, e23, e31, e32, e33) {
    _classCallCheck(this, Matrix3x3);

    // this.e11 = e11 ?? 0;
    // this.e12 = e12 ?? 0;
    // this.e13 = e13 ?? 0;
    // this.e21 = e21 ?? 0;
    // this.e22 = e22 ?? 0;
    // this.e23 = e23 ?? 0;
    // this.e31 = e31 ?? 0;
    // this.e32 = e32 ?? 0;
    // this.e33 = e33 ?? 0;
    this._data = [e11 !== null && e11 !== void 0 ? e11 : 0, e12 !== null && e12 !== void 0 ? e12 : 0, e13 !== null && e13 !== void 0 ? e13 : 0, e21 !== null && e21 !== void 0 ? e21 : 0, e22 !== null && e22 !== void 0 ? e22 : 0, e23 !== null && e23 !== void 0 ? e23 : 0, e31 !== null && e31 !== void 0 ? e31 : 0, e32 !== null && e32 !== void 0 ? e32 : 0, e33 !== null && e33 !== void 0 ? e33 : 0];
  }

  _createClass(Matrix3x3, [{
    key: "SetAxisAngle",
    value: function SetAxisAngle(axis, angle) {
      this._data = GetRotationMatNormalVector(axis, angle);
      return this;
    }
  }, {
    key: "MultiplyVec3",
    value: function MultiplyVec3(vec) {
      var res = new MiniGameAdaptor.Vector3();
      res.x = this._data[0] * vec.x + this._data[3] * vec.y + this._data[6] * vec.z;
      res.y = this._data[1] * vec.x + this._data[4] * vec.y + this._data[7] * vec.z;
      res.z = this._data[2] * vec.x + this._data[5] * vec.y + this._data[8] * vec.z;
      return res;
    }
  }]);

  return Matrix3x3;
}(); // MiniGameAdaptor.register('Matrix3x3', Matrix3x3);


window.__minigamePrivate.Matrix3x3 = Matrix3x3;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Vector3", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.Vector3)];
    },
    $kind: "struct",
    statics: {
      fields: {
        kEpsilon: 0,
        kEpsilonNormalSqrt: 0,
        zeroVector: null,
        oneVector: null,
        upVector: null,
        downVector: null,
        leftVector: null,
        rightVector: null,
        forwardVector: null,
        backVector: null,
        positiveInfinityVector: null,
        negativeInfinityVector: null
      },
      props: {
        zero: {
          get: function get() {
            return MiniGameAdaptor.Vector3.zeroVector.$clone();
          }
        },
        one: {
          get: function get() {
            return MiniGameAdaptor.Vector3.oneVector.$clone();
          }
        },
        forward: {
          get: function get() {
            return MiniGameAdaptor.Vector3.forwardVector.$clone();
          }
        },
        back: {
          get: function get() {
            return MiniGameAdaptor.Vector3.backVector.$clone();
          }
        },
        up: {
          get: function get() {
            return MiniGameAdaptor.Vector3.upVector.$clone();
          }
        },
        down: {
          get: function get() {
            return MiniGameAdaptor.Vector3.downVector.$clone();
          }
        },
        left: {
          get: function get() {
            return MiniGameAdaptor.Vector3.leftVector.$clone();
          }
        },
        right: {
          get: function get() {
            return MiniGameAdaptor.Vector3.rightVector.$clone();
          }
        },
        positiveInfinity: {
          get: function get() {
            return MiniGameAdaptor.Vector3.positiveInfinityVector.$clone();
          }
        },
        negativeInfinity: {
          get: function get() {
            return MiniGameAdaptor.Vector3.negativeInfinityVector.$clone();
          }
        }
      },
      ctors: {
        init: function init() {
          this.kEpsilon = 1E-05;
          this.kEpsilonNormalSqrt = 1E-10;
          this.zeroVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 0.0, 0.0);
          this.oneVector = new MiniGameAdaptor.Vector3.$ctor2(1.0, 1.0, 1.0);
          this.upVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 1.0, 0.0);
          this.downVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, -1.0, 0.0); // 坐标系问题x颠倒 @eugenejiang
          // ?? 在adaptor内的运算应该保持和unity的左手坐标系一致，最后再做后处理Flip到引擎右手坐标系
          // 所以这里改回去

          this.leftVector = new MiniGameAdaptor.Vector3.$ctor2(-1.0, 0.0, 0.0);
          this.rightVector = new MiniGameAdaptor.Vector3.$ctor2(1.0, 0.0, 0.0);
          this.forwardVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 0.0, 1.0);
          this.backVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 0.0, -1.0);
          this.positiveInfinityVector = new MiniGameAdaptor.Vector3.$ctor2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
          this.negativeInfinityVector = new MiniGameAdaptor.Vector3.$ctor2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
      },
      methods: {
        Deserialize: function Deserialize(data, comp) {
          comp.x = data[0];
          comp.y = data[1];
          comp.z = data[2];
          return comp;
        },
        Angle: function Angle(from, to) {
          var denominator = Math.sqrt(from.sqrMagnitude * to.sqrMagnitude);
          if (denominator < MiniGameAdaptor.Vector3.kEpsilonNormalSqrt) return 0.0;
          var dot = MiniGameAdaptor.Mathf.Clamp(MiniGameAdaptor.Vector3.Dot(from, to) / denominator, -1.0, 1.0);
          return Math.acos(dot) * MiniGameAdaptor.Mathf.Rad2Deg;
        },
        ClampMagnitude: function ClampMagnitude(vector, maxLength) {
          var sqrmag = vector.sqrMagnitude;

          if (sqrmag > maxLength * maxLength) {
            var mag = Math.sqrt(sqrmag);
            var normalized_x = vector.x / mag;
            var normalized_y = vector.y / mag;
            var normalized_z = vector.z / mag;
            return new MiniGameAdaptor.Vector3.$ctor2(normalized_x * maxLength, normalized_y * maxLength, normalized_z * maxLength);
          }

          return vector;
        },
        Cross: function Cross(lhs, rhs) {
          // return new MiniGameAdaptor.Vector3.$ctor3(lhs.ref.cross(rhs.ref));
          return new MiniGameAdaptor.Vector3.$ctor2(lhs.y * rhs.z - lhs.z * rhs.y, lhs.z * rhs.x - lhs.x * rhs.z, lhs.x * rhs.y - lhs.y * rhs.x);
        },
        Distance: function Distance(a, b) {
          // return a.ref.distanceTo(b.ref);
          var diff_x = a.x - b.x;
          var diff_y = a.y - b.y;
          var diff_z = a.z - b.z;
          return Math.sqrt(diff_x * diff_x + diff_y * diff_y + diff_z * diff_z);
        },
        Dot: function Dot(lhs, rhs) {
          // return lhs.ref.dot(rhs.ref);
          return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
        },
        Lerp: function Lerp(a, b, t) {
          // if (t > 1.0) t = 1.0;
          // if (t < 0.0) t = 0.0;
          // return new MiniGameAdaptor.Vector3.$ctor3(a.ref.lerp(b.ref, t));
          t = MiniGameAdaptor.Mathf.Clamp01(t);
          return new MiniGameAdaptor.Vector3.$ctor2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        },
        LerpUnclamped: function LerpUnclamped(a, b, t) {
          return new MiniGameAdaptor.Vector3.$ctor2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        },
        Magnitude: function Magnitude(vector) {
          return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
        },
        Max: function Max(lhs, rhs) {
          return new MiniGameAdaptor.Vector3.$ctor2(lhs.x > rhs.x ? lhs.x : rhs.x, lhs.y > rhs.y ? lhs.y : rhs.y, lhs.z > rhs.z ? lhs.z : rhs.z);
        },
        Min: function Min(lhs, rhs) {
          return new MiniGameAdaptor.Vector3.$ctor2(lhs.x < rhs.x ? lhs.x : rhs.x, lhs.y < rhs.y ? lhs.y : rhs.y, lhs.z < rhs.z ? lhs.z : rhs.z);
        },
        MoveTowards: function MoveTowards(current, target, maxDistanceDelta) {
          var toVector_x = target.x - current.x;
          var toVector_y = target.y - current.y;
          var toVector_z = target.z - current.z;
          var sqdist = toVector_x * toVector_x + toVector_y * toVector_y + toVector_z * toVector_z;
          if (sqdist == 0 || maxDistanceDelta >= 0 && sqdist <= maxDistanceDelta * maxDistanceDelta) return target;
          var dist = Math.sqrt(sqdist);
          return new MiniGameAdaptor.Vector3.$ctor2(current.x + toVector_x / dist * maxDistanceDelta, current.y + toVector_y / dist * maxDistanceDelta, current.z + toVector_z / dist * maxDistanceDelta);
        },
        Normalize: function Normalize(value) {
          var mag = MiniGameAdaptor.Vector3.Magnitude(value);

          if (mag > MiniGameAdaptor.Vector3.kEpsilon) {
            return MiniGameAdaptor.Vector3.op_Division(value, mag);
          } else {
            return MiniGameAdaptor.Vector3.zero.$clone();
          }
        },
        OrthoNormalize: function OrthoNormalize(normal, tangent) {
          normal.v = MiniGameAdaptor.Vector3.Normalize(normal);
          tangent.v = MiniGameAdaptor.Vector3.ProjectOnPlane(tangent, normal);
          tangent.v = MiniGameAdaptor.Vector3.Normalize(tangent);
        },
        // https://github.com/gsage/engine/blob/master/Vendor/gmath/src/Vector3.hpp
        OrthoNormalize$1: function OrthoNormalize$1(normal, tangent, binormal) {
          MiniGameAdaptor.Vector3.OrthoNormaliz(normal, tangent);
          binormal.v = MiniGameAdaptor.Vector3.ProjectOnPlane(binormal, tangent);
          binormal.v = MiniGameAdaptor.Vector3.ProjectOnPlane(binormal, normal);
          binormal.v = MiniGameAdaptor.Vector3.Normalize(binormal);
        },
        Project: function Project(vector, onNormal) {
          var sqrMag = MiniGameAdaptor.Vector3.Dot(onNormal, onNormal);

          if (sqrMag < MiniGameAdaptor.Mathf.Epsilon) {
            return MiniGameAdaptor.Vector3.zero;
          } else {
            var dot = MiniGameAdaptor.Vector3.Dot(vector, onNormal);
            return new MiniGameAdaptor.Vector3.$ctor2(onNormal.x * dot / sqrMag, onNormal.y * dot / sqrMag, onNormal.z * dot / sqrMag);
          }
        },
        ProjectOnPlane: function ProjectOnPlane(vector, planeNormal) {
          var sqrMag = MiniGameAdaptor.Vector3.Dot(planeNormal, planeNormal);

          if (sqrMag < MiniGameAdaptor.Mathf.Epsilon) {
            return vector;
          } else {
            var dot = MiniGameAdaptor.Vector3.Dot(vector, planeNormal);
            return new MiniGameAdaptor.Vector3.$ctor2(vector.x - planeNormal.x * dot / sqrMag, vector.y - planeNormal.y * dot / sqrMag, vector.z - planeNormal.z * dot / sqrMag);
          }
        },
        Reflect: function Reflect(inDirection, inNormal) {
          var factor = -2.0 * MiniGameAdaptor.Vector3.Dot(inNormal, inDirection);
          return new MiniGameAdaptor.Vector3.$ctor2(factor * inNormal.x + inDirection.x, factor * inNormal.y + inDirection.y, factor * inNormal.z + inDirection.z);
        },
        // https://github.com/gsage/engine/blob/master/Vendor/gmath/src/Vector3.hpp
        RotateTowards: function RotateTowards(current, target, maxRadiansDelta, maxMagnitudeDelta) {
          var magCur = MiniGameAdaptor.Vector3.Magnitude(current);
          var magTar = MiniGameAdaptor.Vector3.Magnitude(target);
          var newMag = magCur + maxMagnitudeDelta * ((magTar > magCur) - (magCur > magTar));
          newMag = Math.min(newMag, Math.max(magCur, magTar));
          newMag = Math.max(newMag, Math.min(magCur, magTar));
          var totalAngle = MiniGameAdaptor.Vector3.Angle(current, target) - maxRadiansDelta;

          if (totalAngle <= 0) {
            return MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.Normalize(target), newMag);
          } else if (totalAngle >= M_PI) {
            return MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.Normalize(MiniGameAdaptor.Vector3.op_UnaryNegation(target)), newMag);
          }

          var axis = MiniGameAdaptor.Vector3.Cross(current, target);
          var magAxis = MiniGameAdaptor.Vector3.Magnitude(axis);

          if (magAxis == 0) {
            axis = MiniGameAdaptor.Vector3.Normalize(MiniGameAdaptor.Vector3.Cross(current, MiniGameAdaptor.Vector3.op_Addition(current, new MiniGameAdaptor.Vector3.$ctor2(3.95, 5.32, -4.24))));
          } else {
            axis = MiniGameAdaptor.Vector3.op_Division(axis, magAxis);
          }

          current = MiniGameAdaptor.Vector3.Normalize(current);
          var newVector = MiniGameAdaptor.Vector3.op_Multiply$1(current, Math.cos(maxRadiansDelta)) + MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.Cross(axis, current), Math.sin(maxRadiansDelta));
          return MiniGameAdaptor.Vector3.op_Multiply$1(newVector, newMag);
        },
        Scale: function Scale(a, b) {
          // return new MiniGameAdaptor.Vector3.$ctor3(a.ref.scaleXYZ(b.x, b.y, b.z));
          return new MiniGameAdaptor.Vector3.$ctor2(a.x * b.x, a.y * b.y, a.z * b.z);
        },
        SignedAngle: function SignedAngle(from, to, axis) {
          var unsignedAngle = MiniGameAdaptor.Vector3.Angle(from, to);
          var cross_x = from.y * to.z - from.z * to.y;
          var cross_y = from.z * to.x - from.x * to.z;
          var cross_z = from.x * to.y - from.y * to.x;
          var sign = MiniGameAdaptor.Mathf.Sign(axis.x * cross_x + axis.y * cross_y + axis.z * cross_z);
          return unsignedAngle * sign;
        },
        Slerp: function Slerp(lhs, rhs, t) {
          return MiniGameAdaptor.Vector3.SlerpUnclamped(lhs, rhs, MiniGameAdaptor.Mathf.Clamp01(t));
        },
        SlerpUnclamped: function SlerpUnclamped(lhs, rhs, t) {
          var lhsMag = MiniGameAdaptor.Vector3.Magnitude(lhs);
          var rhsMag = MiniGameAdaptor.Vector3.Magnitude(rhs);

          if (lhsMag < MiniGameAdaptor.Vector3.kEpsilon || rhsMag < MiniGameAdaptor.Vector3.kEpsilon) {
            return MiniGameAdaptor.Vector3.Lerp(lhs, rhs, t);
          }

          var lerpedMagnitude = MiniGameAdaptor.Mathf.Lerp(lhsMag, rhsMag, t);
          var dot = MiniGameAdaptor.Vector3.Dot(lhs, rhs) / (lhsMag * rhsMag); // almost same

          if (dot > 1.0 - MiniGameAdaptor.Vector3.kEpsilon) {
            return MiniGameAdaptor.Vector3.Lerp(lhs, rhs, t);
          } // almost opposite
          else if (dot < MiniGameAdaptor.Vector3.kEpsilon - 1) {
              var lhsNorm = MiniGameAdaptor.Vector3.op_Division(lhs, lhsMag);
              var axis = MiniGameAdaptor.Vector3.OrthoNormalVectorFast(lhsNorm);
              var m = new window.__minigamePrivate.Matrix3x3();
              m.SetAxisAngle(axis, Math.PI * t);
              var slerped = m.MultiplyVec3(lhsNorm);
              slerped = MiniGameAdaptor.Vector3.op_Multiply$1(slerped, lerpedMagnitude);
              return slerped;
            } else {
              var _axis = MiniGameAdaptor.Vector3.Cross(lhs, rhs);

              var _lhsNorm = MiniGameAdaptor.Vector3.op_Division(lhs, lhsMag);

              _axis = MiniGameAdaptor.Vector3.Normalize(_axis);
              var angle = Math.acos(dot) * t;

              var _m = new window.__minigamePrivate.Matrix3x3();

              _m.SetAxisAngle(_axis, angle);

              var _slerped = _m.MultiplyVec3(_lhsNorm);

              _slerped = MiniGameAdaptor.Vector3.op_Multiply$1(_slerped, lerpedMagnitude);
              return _slerped;
            }
        },
        SmoothDamp: function SmoothDamp(current, target, currentVelocity, smoothTime) {
          var deltaTime = MiniGameAdaptor.Time.deltaTime;
          var maxSpeed = MiniGameAdaptor.Mathf.Infinity;
          return MiniGameAdaptor.Vector3.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
        },
        SmoothDamp$1: function SmoothDamp$1(current, target, currentVelocity, smoothTime, maxSpeed) {
          var deltaTime = MiniGameAdaptor.Time.deltaTime;
          return MiniGameAdaptor.Vector3.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
        },
        SmoothDamp$2: function SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
          var output_x = 0;
          var output_y = 0;
          var output_z = 0; // Based on Game Programming Gems 4 Chapter 1.10

          smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);
          var omega = 2 / smoothTime;
          var x = omega * deltaTime;
          var exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
          var change_x = current.x - target.x;
          var change_y = current.y - target.y;
          var change_z = current.z - target.z;
          var originalTo = target; // Clamp maximum speed

          var maxChange = maxSpeed * smoothTime;
          var maxChangeSq = maxChange * maxChange;
          var sqrmag = change_x * change_x + change_y * change_y + change_z * change_z;

          if (sqrmag > maxChangeSq) {
            var mag = Math.sqrt(sqrmag);
            change_x = change_x / mag * maxChange;
            change_y = change_y / mag * maxChange;
            change_z = change_z / mag * maxChange;
          }

          target.x = current.x - change_x;
          target.y = current.y - change_y;
          target.z = current.z - change_z;
          var temp_x = (currentVelocity.v.x + omega * change_x) * deltaTime;
          var temp_y = (currentVelocity.v.y + omega * change_y) * deltaTime;
          var temp_z = (currentVelocity.v.z + omega * change_z) * deltaTime;
          currentVelocity.v.x = (currentVelocity.v.x - omega * temp_x) * exp;
          currentVelocity.v.y = (currentVelocity.v.y - omega * temp_y) * exp;
          currentVelocity.v.z = (currentVelocity.v.z - omega * temp_z) * exp;
          output_x = target.x + (change_x + temp_x) * exp;
          output_y = target.y + (change_y + temp_y) * exp;
          output_z = target.z + (change_z + temp_z) * exp;
          var origMinusCurrent_x = originalTo.x - current.x;
          var origMinusCurrent_y = originalTo.y - current.y;
          var origMinusCurrent_z = originalTo.z - current.z;
          var outMinusOrig_x = output_x - originalTo.x;
          var outMinusOrig_y = output_y - originalTo.y;
          var outMinusOrig_z = output_z - originalTo.z;

          if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y + origMinusCurrent_z * outMinusOrig_z > 0) {
            output_x = originalTo.x;
            output_y = originalTo.y;
            output_z = originalTo.z;
            currentVelocity.v.x = (output_x - originalTo.x) / deltaTime;
            currentVelocity.v.y = (output_y - originalTo.y) / deltaTime;
            currentVelocity.v.z = (output_z - originalTo.z) / deltaTime;
          }

          return new MiniGameAdaptor.Vector3.$ctor2(output_x, output_y, output_z);
        },
        SqrMagnitude: function SqrMagnitude(vector) {
          return vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
        },
        op_Addition: function op_Addition(a, b) {
          return new MiniGameAdaptor.Vector3.$ctor2(a.x + b.x, a.y + b.y, a.z + b.z);
        },
        op_Division: function op_Division(a, d) {
          // is that right? or throw DivideByZeroException?
          if (d === 0) {
            return new MiniGameAdaptor.Vector3();
          }

          return new MiniGameAdaptor.Vector3.$ctor2(a.x / d, a.y / d, a.z / d);
        },
        op_Equality: function op_Equality(lhs, rhs) {
          var diff_x = lhs.x - rhs.x;
          var diff_y = lhs.y - rhs.y;
          var diff_z = lhs.z - rhs.z;
          var sqrmag = diff_x * diff_x + diff_y * diff_y + diff_z * diff_z;
          return sqrmag < MiniGameAdaptor.Vector3.kEpsilon * MiniGameAdaptor.Vector3.kEpsilon;
        },
        op_Inequality: function op_Inequality(lhs, rhs) {
          return !MiniGameAdaptor.Vector3.op_Equality(lhs, rhs);
        },
        op_Multiply: function op_Multiply(d, a) {
          return new MiniGameAdaptor.Vector3.$ctor2(a.x * d, a.y * d, a.z * d);
        },
        op_Multiply$1: function op_Multiply$1(a, d) {
          return new MiniGameAdaptor.Vector3.$ctor2(a.x * d, a.y * d, a.z * d);
        },
        op_Subtraction: function op_Subtraction(a, b) {
          return new MiniGameAdaptor.Vector3.$ctor2(a.x - b.x, a.y - b.y, a.z - b.z);
        },
        op_UnaryNegation: function op_UnaryNegation(a) {
          return new MiniGameAdaptor.Vector3.$ctor2(-a.x, -a.y, -a.z);
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.Vector3();
        }
      }
    },
    fields: {
      ref: null // _x: 0,
      // _y: 0,
      // _z: 0

    },
    props: {
      magnitude: {
        get: function get() {
          // return this.ref.length();
          return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
      },
      normalized: {
        get: function get() {
          // return new MiniGameAdaptor.Vector3.$ctor3(this.ref.normalize());
          var n = this.$clone();
          n.Normalize();
          return n;
        }
      },
      sqrMagnitude: {
        get: function get() {
          // return this.magnitude * this.magnitude;
          return this.x * this.x + this.y * this.y + this.z * this.z;
        }
      },
      x: {
        get: function get() {
          return this.ref.x; // return this._x;
        },
        set: function set(value) {
          // this._x = value;
          this.ref.x = value;
        }
      },
      y: {
        get: function get() {
          return this.ref.y; // return this._y;
        },
        set: function set(value) {
          // this._y = value;
          this.ref.y = value;
        }
      },
      z: {
        get: function get() {
          return this.ref.z; // return this._z;
        },
        set: function set(value) {
          // this._z = value;
          this.ref.z = value;
        }
      }
    },
    ctors: {
      $ctor1: function $ctor1(x, y) {
        this.$initialize();
        this.ref = new engine.Vector3();
        this.x = x;
        this.y = y;
        this.z = 0;
      },
      $ctor2: function $ctor2(x, y, z) {
        this.$initialize();
        this.ref = new engine.Vector3();
        this.x = x;
        this.y = y;
        this.z = z;
      },
      $ctor3: function $ctor3(ref) {
        this.$initialize();
        this.ref = ref;
      },
      $ctor4: function $ctor4(ref) {
        this.$initialize();
        this.ref = new engine.Vector3();
        this.x = ref.x;
        this.y = ref.y;
        this.z = ref.z;
      },
      ctor: function ctor() {
        this.$initialize();
        this.ref = new engine.Vector3();
        this.x = this.y = this.z = 0;
      }
    },
    methods: {
      getItem: function getItem(index) {
        switch (index) {
          case 0:
            return this.x;

          case 1:
            return this.y;

          case 2:
            return this.z;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector3 index!");
        }
      },
      setItem: function setItem(index, value) {
        switch (index) {
          case 0:
            this.x = value;
            break;

          case 1:
            this.y = value;
            break;

          case 2:
            this.z = value;
            break;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector3 index!");
        }
      },
      equals: function equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Vector3)) {
          return false;
        }

        return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Vector3));
      },
      equalsT: function equalsT(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
      },
      Equals: function Equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Vector3)) {
          return false;
        } // return this.ref.equal(other.ref);


        return this.equalsT(other);
      },
      System$IEquatable$1$MiniGameAdaptor$Vector3$equalsT: function System$IEquatable$1$MiniGameAdaptor$Vector3$equalsT(other) {
        throw new System.Exception("Exception");
      },
      getHashCode: function getHashCode() {
        return System.Single.getHashCode(this.x) ^ System.Single.getHashCode(this.y) << 2 ^ System.Single.getHashCode(this.z) >> 2;
      },
      Normalize: function Normalize() {
        var mag = MiniGameAdaptor.Vector3.Magnitude(this);

        if (mag > MiniGameAdaptor.Vector3.kEpsilon) {
          MiniGameAdaptor.Vector3.op_Division(this, mag).$clone(this);
        } else {
          MiniGameAdaptor.Vector3.zero.$clone().$clone(this);
        }
      },
      Scale: function Scale(scale) {
        this.x *= scale.x;
        this.y *= scale.y;
        this.z *= scale.z;
      },
      Set: function Set(newX, newY, newZ) {
        this.x = newX;
        this.y = newY;
        this.z = newZ;
      },
      toString: function toString() {
        return System.String.format("({0:F1}, {1:F1}, {2:F1})", this.x, this.y, this.z);
      },
      ToString: function ToString(format) {
        return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ", " + this.z.toFixed(format) + ")";
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.Vector3();
        s.x = this.x;
        s.y = this.y;
        s.z = this.z;
        return s;
      },
      _Deg2Rad: function _Deg2Rad() {
        this.x *= MiniGameAdaptor.Mathf.Deg2Rad;
        this.y *= MiniGameAdaptor.Mathf.Deg2Rad;
        this.z *= MiniGameAdaptor.Mathf.Deg2Rad;
        return this;
      },
      _Rad2Deg: function _Rad2Deg() {
        this.x *= MiniGameAdaptor.Mathf.Rad2Deg;
        this.y *= MiniGameAdaptor.Mathf.Rad2Deg;
        this.z *= MiniGameAdaptor.Mathf.Rad2Deg;
        return this;
      },
      _FlipX: function _FlipX() {
        this.x *= -1;
        return this;
      },
      _FlipY: function _FlipY() {
        this.y *= -1;
        return this;
      },
      _FlipZ: function _FlipZ() {
        this.z *= -1;
        return this;
      },
      _FlipXYZ: function _FlipXYZ() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Vector3')(MiniGameAdaptor.Vector3);
Object.defineProperty(MiniGameAdaptor.Vector3.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Vector3.prototype.__properties)
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Vector2", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.Vector2)];
    },
    $kind: "struct",
    statics: {
      fields: {
        kEpsilon: 0,
        kEpsilonNormalSqrt: 0,
        zeroVector: null,
        oneVector: null,
        upVector: null,
        downVector: null,
        leftVector: null,
        rightVector: null,
        positiveInfinityVector: null,
        negativeInfinityVector: null
      },
      props: {
        zero: {
          get: function get() {
            return MiniGameAdaptor.Vector2.zeroVector.$clone();
          }
        },
        one: {
          get: function get() {
            return MiniGameAdaptor.Vector2.oneVector.$clone();
          }
        },
        up: {
          get: function get() {
            return MiniGameAdaptor.Vector2.upVector.$clone();
          }
        },
        down: {
          get: function get() {
            return MiniGameAdaptor.Vector2.downVector.$clone();
          }
        },
        left: {
          get: function get() {
            return MiniGameAdaptor.Vector2.leftVector.$clone();
          }
        },
        right: {
          get: function get() {
            return MiniGameAdaptor.Vector2.rightVector.$clone();
          }
        },
        positiveInfinity: {
          get: function get() {
            return MiniGameAdaptor.Vector2.positiveInfinityVector.$clone();
          }
        },
        negativeInfinity: {
          get: function get() {
            return MiniGameAdaptor.Vector2.negativeInfinityVector.$clone();
          }
        }
      },
      ctors: {
        init: function init() {
          this.kEpsilon = 1E-05;
          this.kEpsilonNormalSqrt = 1E-15;
          this.zeroVector = new MiniGameAdaptor.Vector2.$ctor1(0.0, 0.0);
          this.oneVector = new MiniGameAdaptor.Vector2.$ctor1(1.0, 1.0);
          this.upVector = new MiniGameAdaptor.Vector2.$ctor1(0.0, 1.0);
          this.downVector = new MiniGameAdaptor.Vector2.$ctor1(0.0, -1.0);
          this.leftVector = new MiniGameAdaptor.Vector2.$ctor1(-1.0, 0.0);
          this.rightVector = new MiniGameAdaptor.Vector2.$ctor1(1.0, 0.0);
          this.positiveInfinityVector = new MiniGameAdaptor.Vector2.$ctor1(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
          this.negativeInfinityVector = new MiniGameAdaptor.Vector2.$ctor1(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
      },
      methods: {
        Deserialize: function Deserialize(data, comp) {
          comp.x = data[0];
          comp.y = data[1];
          return comp;
        },
        Angle: function Angle(from, to) {
          var denominator = Math.sqrt(from.sqrMagnitude * to.sqrMagnitude);
          if (denominator < MiniGameAdaptor.Vector2.kEpsilonNormalSqrt) return 0;
          var dot = MiniGameAdaptor.Mathf.Clamp(MiniGameAdaptor.Vector2.Dot(from, to) / denominator, -1, 1);
          return Math.acos(dot) * MiniGameAdaptor.Mathf.Rad2Deg;
        },
        ClampMagnitude: function ClampMagnitude(vector, maxLength) {
          var sqrMagnitude = vector.sqrMagnitude;

          if (sqrMagnitude > maxLength * maxLength) {
            var mag = Math.sqrt(sqrMagnitude);
            var normalized_x = vector.x / mag;
            var normalized_y = vector.y / mag;
            return new MiniGameAdaptor.Vector2.$ctor1(normalized_x * maxLength, normalized_y * maxLength);
          }

          return vector;
        },
        Distance: function Distance(a, b) {
          var diff_x = a.x - b.x;
          var diff_y = a.y - b.y;
          return Math.sqrt(diff_x * diff_x + diff_y * diff_y);
        },
        Dot: function Dot(lhs, rhs) {
          return lhs.ref.dot(rhs.ref);
        },
        Lerp: function Lerp(a, b, t) {
          if (t > 1.0) t = 1.0;
          if (t < 0.0) t = 0.0;
          return new MiniGameAdaptor.Vector2.$ctor2(a.ref.lerp(b.ref, t));
        },
        LerpUnclamped: function LerpUnclamped(a, b, t) {
          return new MiniGameAdaptor.Vector2.$ctor2(a.ref.lerp(b.ref, t));
        },
        Max: function Max(lhs, rhs) {
          return new MiniGameAdaptor.Vector2.$ctor1(lhs.x > rhs.x ? lhs.x : rhs.x, lhs.y > rhs.y ? lhs.y : rhs.y);
        },
        Min: function Min(lhs, rhs) {
          return new MiniGameAdaptor.Vector2.$ctor1(lhs.x < rhs.x ? lhs.x : rhs.x, lhs.y < rhs.y ? lhs.y : rhs.y);
        },
        MoveTowards: function MoveTowards(current, target, maxDistanceDelta) {
          var toVector_x = target.x - current.x;
          var toVector_y = target.y - current.y;
          var sqDist = toVector_x * toVector_x + toVector_y * toVector_y;
          if (sqDist == 0 || maxDistanceDelta >= 0 && sqDist <= maxDistanceDelta * maxDistanceDelta) return target;
          var dist = Math.sqrt(sqDist);
          return new MiniGameAdaptor.Vector2.$ctor1(current.x + toVector_x / dist * maxDistanceDelta, current.y + toVector_y / dist * maxDistanceDelta);
        },
        Perpendicular: function Perpendicular(inDirection) {
          return new MiniGameAdaptor.Vector2.$ctor1(-inDirection.y, inDirection.x);
        },
        Reflect: function Reflect(inDirection, inNormal) {
          var factor = -2 * MiniGameAdaptor.Vector2.Dot(inNormal, inDirection);
          return new MiniGameAdaptor.Vector2.$ctor1(factor * inNormal.x + inDirection.x, factor * inNormal.y + inDirection.y);
        },
        Scale: function Scale(a, b) {
          return new MiniGameAdaptor.Vector2.$ctor1(a.x * b.x, a.y * b.y);
        },
        SignedAngle: function SignedAngle(from, to) {
          var unsigned_angle = MiniGameAdaptor.Vector2.Angle(from, to);
          var sign = MiniGameAdaptor.Mathf.Sign(from.x * to.y - from.y * to.x);
          return unsigned_angle * sign;
        },
        SmoothDamp: function SmoothDamp(current, target, currentVelocity, smoothTime) {
          var deltaTime = MiniGameAdaptor.Time.deltaTime;
          var maxSpeed = MiniGameAdaptor.Mathf.Infinity;
          return MiniGameAdaptor.Vector2.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
        },
        SmoothDamp$1: function SmoothDamp$1(current, target, currentVelocity, smoothTime, maxSpeed) {
          var deltaTime = MiniGameAdaptor.Time.deltaTime;
          return MiniGameAdaptor.Vector2.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
        },
        SmoothDamp$2: function SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
          smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);
          var omega = 2 / smoothTime;
          var x = omega * deltaTime;
          var exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
          var change_x = current.x - target.x;
          var change_y = current.y - target.y;
          var originalTo = target;
          var maxChange = maxSpeed * smoothTime;
          var maxChangeSq = maxChange * maxChange;
          var sqDist = change_x * change_x + change_y * change_y;

          if (sqDist > maxChangeSq) {
            var mag = Math.sqrt(sqDist);
            change_x = change_x / mag * maxChange;
            change_y = change_y / mag * maxChange;
          }

          target.x = current.x - change_x;
          target.y = current.y - change_y;
          var temp_x = (currentVelocity.x + omega * change_x) * deltaTime;
          var temp_y = (currentVelocity.y + omega * change_y) * deltaTime;
          currentVelocity.x = (currentVelocity.x - omega * temp_x) * exp;
          currentVelocity.y = (currentVelocity.y - omega * temp_y) * exp;
          var output_x = target.x + (change_x + temp_x) * exp;
          var output_y = target.y + (change_y + temp_y) * exp;
          var origMinusCurrent_x = originalTo.x - current.x;
          var origMinusCurrent_y = originalTo.y - current.y;
          var outMinusOrig_x = output_x - originalTo.x;
          var outMinusOrig_y = output_y - originalTo.y;

          if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y > 0) {
            output_x = originalTo.x;
            output_y = originalTo.y;
            currentVelocity.x = (output_x - originalTo.x) / deltaTime;
            currentVelocity.y = (output_y - originalTo.y) / deltaTime;
          }

          return new MiniGameAdaptor.Vector2.$ctor1(output_x, output_y);
        },
        SqrMagnitude: function SqrMagnitude(a) {
          return a.x * a.x + a.y * a.y;
        },
        op_Addition: function op_Addition(a, b) {
          return new MiniGameAdaptor.Vector2.$ctor1(a.x + b.x, a.y + b.y);
        },
        op_Division: function op_Division(a, d) {
          return new MiniGameAdaptor.Vector2.$ctor1(a.x / d, a.y / d);
        },
        op_Division$1: function op_Division$1(a, b) {
          return new MiniGameAdaptor.Vector2.$ctor1(a.x / b.x, a.y / b.y);
        },
        op_Equality: function op_Equality(lhs, rhs) {
          var diff_x = lhs.x - rhs.x;
          var diff_y = lhs.y - rhs.y;
          return diff_x * diff_x + diff_y * diff_y < MiniGameAdaptor.Vector2.kEpsilon * MiniGameAdaptor.Vector2.kEpsilon;
        },
        op_Implicit: function op_Implicit(v) {
          return new MiniGameAdaptor.Vector2.$ctor1(v.x, v.y);
        },
        op_Implicit$1: function op_Implicit$1(v) {
          return new MiniGameAdaptor.Vector3.$ctor1(v.x, v.y);
        },
        op_Inequality: function op_Inequality(lhs, rhs) {
          return !MiniGameAdaptor.Vector2.op_Equality(lhs, rhs);
        },
        op_Multiply: function op_Multiply(d, a) {
          return new MiniGameAdaptor.Vector2.$ctor1(d * a.x, d * a.y);
        },
        op_Multiply$1: function op_Multiply$1(a, d) {
          return new MiniGameAdaptor.Vector2.$ctor1(d * a.x, d * a.y);
        },
        op_Multiply$2: function op_Multiply$2(a, b) {
          return new MiniGameAdaptor.Vector2.$ctor1(a.x * b.x, a.y * b.y);
        },
        op_Subtraction: function op_Subtraction(a, b) {
          return new MiniGameAdaptor.Vector2.$ctor1(a.x - b.x, a.y - b.y);
        },
        op_UnaryNegation: function op_UnaryNegation(a) {
          return new MiniGameAdaptor.Vector2.$ctor1(-a.x, -a.y);
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.Vector2();
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      magnitude: {
        get: function get() {
          return this.ref.length();
        }
      },
      normalized: {
        get: function get() {
          return new MiniGameAdaptor.Vector2.$ctor2(this.ref.normalize());
        }
      },
      sqrMagnitude: {
        get: function get() {
          return this.magnitude * this.magnitude;
        }
      },
      x: {
        get: function get() {
          return this.ref.x;
        },
        set: function set(value) {
          this.ref.x = value;
        }
      },
      y: {
        get: function get() {
          return this.ref.y;
        },
        set: function set(value) {
          this.ref.y = value;
        }
      }
    },
    ctors: {
      $ctor2: function $ctor2(ref) {
        this.$initialize();
        this.ref = ref;
      },
      $ctor1: function $ctor1(x, y) {
        this.$initialize();
        this.ref = new engine.Vector2();
        this.x = x;
        this.y = y;
      },
      ctor: function ctor() {
        this.$initialize();
        this.ref = new engine.Vector2();
        this.x = 0;
        this.y = 0;
      }
    },
    methods: {
      getItem: function getItem(index) {
        switch (index) {
          case 0:
            return this.x;

          case 1:
            return this.y;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector2 index!");
        }
      },
      setItem: function setItem(index, value) {
        switch (index) {
          case 0:
            this.x = value;
            break;

          case 1:
            this.y = value;
            break;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector2 index!");
        }
      },
      equals: function equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Vector2)) {
          return false;
        }

        return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Vector2));
      },
      equalsT: function equalsT(other) {
        return this.x === other.x && this.y === other.y;
      },
      Equals: function Equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Vector2)) {
          return false;
        }

        return this.ref.equal(other.ref);
      },
      System$IEquatable$1$MiniGameAdaptor$Vector2$equalsT: function System$IEquatable$1$MiniGameAdaptor$Vector2$equalsT(other) {
        throw new System.Exception("Exception");
      },
      getHashCode: function getHashCode() {
        return System.Single.getHashCode(this.x) ^ System.Single.getHashCode(this.y) << 2;
      },
      Normalize: function Normalize() {
        var mag = this.magnitude;

        if (mag > MiniGameAdaptor.Vector2.kEpsilon) {
          MiniGameAdaptor.Vector2.op_Division(this, mag).$clone(this);
        } else {
          MiniGameAdaptor.Vector2.zero.$clone().$clone(this);
        }
      },
      Scale: function Scale(scale) {
        this.x *= scale.x;
        this.y *= scale.y;
      },
      Set: function Set(newX, newY) {
        this.x = newX;
        this.y = newY;
      },
      SqrMagnitude: function SqrMagnitude() {
        return this.x * this.x + this.y * this.y;
      },
      toString: function toString() {
        return System.String.format("({0:F1}, {1:F1})", this.x, this.y);
      },
      ToString: function ToString(format) {
        return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ")";
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.Vector2();
        s.x = this.x;
        s.y = this.y;
        return s;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Vector2')(MiniGameAdaptor.Vector2);
Object.defineProperty(MiniGameAdaptor.Vector2.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Vector2.prototype.__properties)
});

/***/ }),
/* 21 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Vector4", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.Vector4)];
    },
    $kind: "struct",
    statics: {
      fields: {
        kEpsilon: 0,
        zeroVector: null,
        oneVector: null,
        positiveInfinityVector: null,
        negativeInfinityVector: null
      },
      props: {
        zero: {
          get: function get() {
            return MiniGameAdaptor.Vector4.zeroVector.$clone();
          }
        },
        one: {
          get: function get() {
            return MiniGameAdaptor.Vector4.oneVector.$clone();
          }
        },
        positiveInfinity: {
          get: function get() {
            return MiniGameAdaptor.Vector4.positiveInfinityVector.$clone();
          }
        },
        negativeInfinity: {
          get: function get() {
            return MiniGameAdaptor.Vector4.negativeInfinityVector.$clone();
          }
        }
      },
      ctors: {
        init: function init() {
          this.kEpsilon = 1E-05;
          this.zeroVector = new MiniGameAdaptor.Vector4.$ctor3(0.0, 0.0, 0.0, 0.0);
          this.oneVector = new MiniGameAdaptor.Vector4.$ctor3(1.0, 1.0, 1.0, 1.0);
          this.positiveInfinityVector = new MiniGameAdaptor.Vector4.$ctor3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
          this.negativeInfinityVector = new MiniGameAdaptor.Vector4.$ctor3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
      },
      methods: {
        Deserialize: function Deserialize(data, comp) {
          comp.x = data[0];
          comp.y = data[1];
          comp.z = data[2];
          comp.w = data[3];
          return comp;
        },
        Distance: function Distance(a, b) {
          return MiniGameAdaptor.Vector4.Magnitude(MiniGameAdaptor.Vector4.op_Subtraction(a, b));
        },
        Dot: function Dot(a, b) {
          return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
        },
        Lerp: function Lerp(a, b, t) {
          if (t > 1.0) t = 1.0;
          if (t < 0.0) t = 0.0;
          return new MiniGameAdaptor.Vector4.$ctor4(a.ref.lerp(b.ref, t));
        },
        LerpUnclamped: function LerpUnclamped(a, b, t) {
          return new MiniGameAdaptor.Vector4.$ctor4(a.ref.lerp(b.ref, t));
        },
        Magnitude: function Magnitude(a) {
          return Math.sqrt(MiniGameAdaptor.Vector4.Dot(a, a));
        },
        Max: function Max(lhs, rhs) {
          return new Vector4.$ctor3(lhs.x > rhs.x ? lhs.x : rhs.x, lhs.y > rhs.y ? lhs.y : rhs.y, lhs.z > rhs.z ? lhs.z : rhs.z, lhs.w > rhs.w ? lhs.w : rhs.w);
        },
        Min: function Min(lhs, rhs) {
          return new Vector4.$ctor3(lhs.x < rhs.x ? lhs.x : rhs.x, lhs.y < rhs.y ? lhs.y : rhs.y, lhs.z < rhs.z ? lhs.z : rhs.z, lhs.w < rhs.w ? lhs.w : rhs.w);
        },
        MoveTowards: function MoveTowards(current, target, maxDistanceDelta) {
          var toVector_x = target.x - current.x;
          var toVector_y = target.y - current.y;
          var toVector_z = target.z - current.z;
          var toVector_w = target.w - current.w;
          var sqdist = toVector_x * toVector_x + toVector_y * toVector_y + toVector_z * toVector_z + toVector_w * toVector_w;
          if (sqdist == 0 || maxDistanceDelta >= 0 && sqdist <= maxDistanceDelta * maxDistanceDelta) return target;
          var dist = Math.sqrt(sqdist);
          return new MiniGameAdaptor.Vector4.$ctor3(current.x + toVector_x / dist * maxDistanceDelta, current.y + toVector_y / dist * maxDistanceDelta, current.z + toVector_z / dist * maxDistanceDelta, current.w + toVector_w / dist * maxDistanceDelta);
        },
        Normalize: function Normalize(a) {
          var mag = MiniGameAdaptor.Vector4.Magnitude(a);

          if (mag > MiniGameAdaptor.Vector4.kEpsilon) {
            return MiniGameAdaptor.Vector4.op_Division(a, mag);
          } else {
            return MiniGameAdaptor.Vector4.zero.$clone();
          }
        },
        Project: function Project(a, b) {
          return b * (MiniGameAdaptor.Vector4.Dot(a, b) / MiniGameAdaptor.Vector4.Dot(b, b));
        },
        Scale: function Scale(a, b) {
          return new MiniGameAdaptor.Vector4.$ctor3(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
        },
        SqrMagnitude: function SqrMagnitude(a) {
          return MiniGameAdaptor.Vector4.Dot(a, a);
        },
        op_Addition: function op_Addition(a, b) {
          return new MiniGameAdaptor.Vector4.$ctor3(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
        },
        op_Division: function op_Division(a, d) {
          return new MiniGameAdaptor.Vector4.$ctor3(a.x / d, a.y / d, a.z / d, a.w / d);
        },
        op_Equality: function op_Equality(lhs, rhs) {
          var diffx = lhs.x - rhs.x;
          var diffy = lhs.y - rhs.y;
          var diffz = lhs.z - rhs.z;
          var diffw = lhs.w - rhs.w;
          var sqrmag = diffx * diffx + diffy * diffy + diffz * diffz + diffw * diffw;
          return sqrmag < MiniGameAdaptor.Vector4.kEpsilon * MiniGameAdaptor.Vector4.kEpsilon;
        },
        op_Implicit: function op_Implicit(v) {
          return new MiniGameAdaptor.Vector4.$ctor3(v.x, v.y, v.z, 0);
        },
        op_Implicit$1: function op_Implicit$1(v) {
          return new MiniGameAdaptor.Vector3.$ctor2(v.x, v.y, v.z);
        },
        op_Implicit$2: function op_Implicit$2(v) {
          return new MiniGameAdaptor.Vector4.$ctor3(v.x, v.y, 0, 0);
        },
        op_Implicit$3: function op_Implicit$3(v) {
          return new MiniGameAdaptor.Vector2.$ctor1(v.x, v.y);
        },
        op_Inequality: function op_Inequality(lhs, rhs) {
          return !MiniGameAdaptor.Vector4.op_Equality(lhs, rhs);
        },
        op_Multiply: function op_Multiply(d, a) {
          return new MiniGameAdaptor.Vector4.$ctor3(a.x * d, a.y * d, a.z * d, a.w * d);
        },
        op_Multiply$1: function op_Multiply$1(a, d) {
          return new MiniGameAdaptor.Vector4.$ctor3(a.x * d, a.y * d, a.z * d, a.w * d);
        },
        op_Subtraction: function op_Subtraction(a, b) {
          return new MiniGameAdaptor.Vector4.$ctor3(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
        },
        op_UnaryNegation: function op_UnaryNegation(a) {
          return new MiniGameAdaptor.Vector4.$ctor3(-a.x, -a.y, -a.z, -a.w);
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.Vector4();
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      magnitude: {
        get: function get() {
          return Math.sqrt(MiniGameAdaptor.Vector4.Dot(this, this));
        }
      },
      normalized: {
        get: function get() {
          return MiniGameAdaptor.Vector4.Normalize(this);
        }
      },
      sqrMagnitude: {
        get: function get() {
          return MiniGameAdaptor.Vector4.Dot(this, this);
        }
      },
      x: {
        get: function get() {
          return this.ref.x;
        },
        set: function set(value) {
          this.ref.x = value;
        }
      },
      y: {
        get: function get() {
          return this.ref.y;
        },
        set: function set(value) {
          this.ref.y = value;
        }
      },
      z: {
        get: function get() {
          return this.ref.z;
        },
        set: function set(value) {
          this.ref.z = value;
        }
      },
      w: {
        get: function get() {
          return this.ref.w;
        },
        set: function set(value) {
          this.ref.w = value;
        }
      }
    },
    ctors: {
      $ctor1: function $ctor1(x, y) {
        this.$initialize();
        this.ref = new engine.Vector4();
        this.x = x;
        this.y = y;
        this.z = 0;
        this.w = 0;
      },
      $ctor2: function $ctor2(x, y, z) {
        this.$initialize();
        this.ref = new engine.Vector4();
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 0;
      },
      $ctor3: function $ctor3(x, y, z, w) {
        this.$initialize();
        this.ref = new engine.Vector4();
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      },
      $ctor4: function $ctor4(ref) {
        this.$initialize();
        this.ref = ref;
      },
      $ctor5: function $ctor5(array) {
        this.$initialize();
        this.ref = new engine.Vector4();
        this.x = array[0];
        this.y = array[1];
        this.z = array[2];
        this.w = array[3];
      },
      ctor: function ctor() {
        this.$initialize();
        this.ref = new engine.Vector4();
        this.x = this.y = this.z = this.w = 0;
      }
    },
    methods: {
      getItem: function getItem(index) {
        switch (index) {
          case 0:
            return this.x;

          case 1:
            return this.y;

          case 2:
            return this.z;

          case 3:
            return this.w;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector4 index!");
        }
      },
      setItem: function setItem(index, value) {
        switch (index) {
          case 0:
            this.x = value;
            break;

          case 1:
            this.y = value;
            break;

          case 2:
            this.z = value;
            break;

          case 3:
            this.w = value;
            break;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector4 index!");
        }
      },
      equals: function equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Vector4)) {
          return false;
        }

        return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Vector4));
      },
      equalsT: function equalsT(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
      },
      Equals: function Equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Vector4)) {
          return false;
        }

        return this.ref.equal(other.ref);
      },
      System$IEquatable$1$MiniGameAdaptor$Vector4$equalsT: function System$IEquatable$1$MiniGameAdaptor$Vector4$equalsT(other) {
        throw new System.Exception("Exception");
      },
      getHashCode: function getHashCode() {
        return System.Single.getHashCode(this.x) ^ System.Single.getHashCode(this.y) << 2 ^ System.Single.getHashCode(this.z) >> 2 ^ System.Single.getHashCode(this.w) >> 2;
      },
      Normalize: function Normalize() {
        var mag = MiniGameAdaptor.Vector4.Magnitude(this);

        if (mag > MiniGameAdaptor.Vector4.kEpsilon) {
          MiniGameAdaptor.Vector4.op_Division(this, mag).$clone(this);
        } else {
          MiniGameAdaptor.Vector4.zero.$clone().$clone(this);
        }
      },
      Scale: function Scale(scale) {
        this.x *= scale.x;
        this.y *= scale.y;
        this.z *= scale.z;
        this.w *= scale.w;
      },
      Set: function Set(newX, newY, newZ, newW) {
        this.x = newX;
        this.y = newY;
        this.z = newZ;
        this.w = newW;
      },
      SqrMagnitude: function SqrMagnitude() {
        return MiniGameAdaptor.Vector4.Dot(this, this);
      },
      toString: function toString() {
        return System.String.format("({0:F1}, {1:F1}, {2:F1}, {3:F1})", this.x, this.y, this.z, this.w);
      },
      ToString: function ToString(format) {
        return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ", " + this.z.toFixed(format) + ", " + this.w.toFixed(format) + ")";
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.Vector4();
        s.x = this.x;
        s.y = this.y;
        s.z = this.z;
        s.w = this.w;
        return s;
      },
      _FlipX: function _FlipX() {
        this.x *= -1;
        return this;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Vector4')(MiniGameAdaptor.Vector4);
Object.defineProperty(MiniGameAdaptor.Vector4.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Vector4.prototype.__properties)
});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ToInvariantString(formate, val) {
  return value.toFixed(format);
}

Bridge.define("MiniGameAdaptor.Matrix4x4", {
  inherits: function inherits() {
    return [System.IEquatable$1(MiniGameAdaptor.Matrix4x4)];
  },
  $kind: "struct",
  statics: {
    props: {
      identity: {
        get: function get() {
          return identityMatrix;
        }
      },
      zero: {
        get: function get() {
          return zeroMatrix;
        }
      }
    },
    methods: {
      Deserialize: function Deserialize(data, comp) {
        comp.m00 = data[0];
        comp.m01 = data[1];
        comp.m02 = data[2];
        comp.m03 = data[3];
        comp.m10 = data[4];
        comp.m11 = data[5];
        comp.m12 = data[6];
        comp.m13 = data[7];
        comp.m20 = data[8];
        comp.m21 = data[9];
        comp.m22 = data[10];
        comp.m23 = data[11];
        comp.m30 = data[12];
        comp.m31 = data[13];
        comp.m32 = data[14];
        comp.m33 = data[15];
        return comp;
      },
      Determinant: function Determinant(m) {
        return m.determinant;
      },
      // TODO
      Frustum: function Frustum(left, right, bottom, top, zNear, zFar) {
        throw new System.Exception("not impl");
      },
      Frustum$1: function Frustum$1(fp) {
        throw new System.Exception("not impl");
      },
      Inverse: function Inverse(m) {
        return m.inverse;
      },
      LookAt: function LookAt(from, to, up) {
        var m = engine.Matrix4.lookAt(from, to, up);
        return new MiniGameAdaptor.Matrix4x4.$ctor2(m._raw);
      },
      Ortho: function Ortho(left, right, bottom, top, zNear, zFar) {
        var m = engine.Matrix4.orthographic(left, right, bottom, top, zNear, zFar);
        return new MiniGameAdaptor.Matrix4x4.$ctor2(m._raw);
      },
      Perspective: function Perspective(fov, aspect, zNear, zFar) {
        var m = engine.Matrix4.perspective(fov, aspect, zNear, zFar);
        return new MiniGameAdaptor.Matrix4x4.$ctor2(m._raw);
      },
      Rotate: function Rotate(q) {
        var x = q.x * 2.0;
        var y = q.y * 2.0;
        var z = q.z * 2.0;
        var xx = q.x * x;
        var yy = q.y * y;
        var zz = q.z * z;
        var xy = q.x * y;
        var xz = q.x * z;
        var yz = q.y * z;
        var wx = q.w * x;
        var wy = q.w * y;
        var wz = q.w * z; // Calculate 3x3 matrix from orthonormal basis

        var m = new MiniGameAdaptor.Matrix4x4();
        m.m00 = 1.0 - (yy + zz);
        m.m10 = xy + wz;
        m.m20 = xz - wy;
        m.m30 = 0.0;
        m.m01 = xy - wz;
        m.m11 = 1.0 - (xx + zz);
        m.m21 = yz + wx;
        m.m31 = 0.0;
        m.m02 = xz + wy;
        m.m12 = yz - wx;
        m.m22 = 1.0 - (xx + yy);
        m.m32 = 0.0;
        m.m03 = 0.0;
        m.m13 = 0.0;
        m.m23 = 0.0;
        m.m33 = 1.0;
        return m;
      },
      Scale: function Scale(vector) {
        var m = new MiniGameAdaptor.Matrix4x4();
        m.m00 = vector.x;
        m.m01 = 0;
        m.m02 = 0;
        m.m03 = 0;
        m.m10 = 0;
        m.m11 = vector.y;
        m.m12 = 0;
        m.m13 = 0;
        m.m20 = 0;
        m.m21 = 0;
        m.m22 = vector.z;
        m.m23 = 0;
        m.m30 = 0;
        m.m31 = 0;
        m.m32 = 0;
        m.m33 = 1;
        return m;
      },
      Translate: function Translate(vector) {
        var m = new MiniGameAdaptor.Matrix4x4();
        m.m00 = 1;
        m.m01 = 0;
        m.m02 = 0;
        m.m03 = vector.x;
        m.m10 = 0;
        m.m11 = 1;
        m.m12 = 0;
        m.m13 = vector.y;
        m.m20 = 0;
        m.m21 = 0;
        m.m22 = 1;
        m.m23 = vector.z;
        m.m30 = 0;
        m.m31 = 0;
        m.m32 = 0;
        m.m33 = 1;
        return m;
      },
      Transpose: function Transpose(m) {
        return new this.transpose();
      },
      TRS: function TRS(pos, q, s) {
        var res = new MiniGameAdaptor.Matrix4x4();
        var scaleX = scale.x;
        var scaleY = scale.y;
        var scaleZ = scale.z;
        var x2 = rotation.x * rotation.x;
        var xy = rotation.x * rotation.y;
        var xz = rotation.x * rotation.z;
        var xw = rotation.x * rotation.w;
        var y2 = rotation.y * rotation.y;
        var yz = rotation.y * rotation.z;
        var yw = rotation.y * rotation.w;
        var z2 = rotation.z * rotation.z;
        var zw = rotation.z * rotation.w;
        var w2 = rotation.w * rotation.w;
        var m00 = x2 - y2 - z2 + w2;
        var m01 = 2.0 * (xy - zw);
        var m02 = 2.0 * (xz + yw);
        var m10 = 2.0 * (xy + zw);
        var m11 = -x2 + y2 - z2 + w2;
        var m12 = 2.0 * (yz - xw);
        var m20 = 2.0 * (xz - yw);
        var m21 = 2.0 * (yz + xw);
        var m22 = -x2 - y2 + z2 + w2;
        res.setItem(0, m00 * scaleX);
        res.setItem(1, m10 * scaleX);
        res.setItem(2, m20 * scaleX);
        res.setItem(3, 0.0);
        res.setItem(4, m01 * scaleY);
        res.setItem(5, m11 * scaleY);
        res.setItem(6, m21 * scaleY0);
        res.setItem(7, 0.0);
        res.setItem(8, m02 * scaleZ);
        res.setItem(9, m12 * scaleZ);
        res.setItem(10, m22 * scaleZ);
        res.setItem(11, 0.0);
        res.setItem(12, translation.x);
        res.setItem(13, translation.y);
        res.setItem(14, translation.z);
        res.setItem(15, 1.0);
        return res;
      },
      op_Equality: function op_Equality(lhs, rhs) {
        return lhs.equals(rhs);
      },
      op_Inequality: function op_Inequality(lhs, rhs) {
        return !lhs.equals(rhs);
      },
      op_Multiply: function op_Multiply(lhs, rhs) {
        var res = new MiniGameAdaptor.Matrix4x4();
        res.m00 = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10 + lhs.m02 * rhs.m20 + lhs.m03 * rhs.m30;
        res.m01 = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11 + lhs.m02 * rhs.m21 + lhs.m03 * rhs.m31;
        res.m02 = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02 * rhs.m22 + lhs.m03 * rhs.m32;
        res.m03 = lhs.m00 * rhs.m03 + lhs.m01 * rhs.m13 + lhs.m02 * rhs.m23 + lhs.m03 * rhs.m33;
        res.m10 = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10 + lhs.m12 * rhs.m20 + lhs.m13 * rhs.m30;
        res.m11 = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11 + lhs.m12 * rhs.m21 + lhs.m13 * rhs.m31;
        res.m12 = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12 * rhs.m22 + lhs.m13 * rhs.m32;
        res.m13 = lhs.m10 * rhs.m03 + lhs.m11 * rhs.m13 + lhs.m12 * rhs.m23 + lhs.m13 * rhs.m33;
        res.m20 = lhs.m20 * rhs.m00 + lhs.m21 * rhs.m10 + lhs.m22 * rhs.m20 + lhs.m23 * rhs.m30;
        res.m21 = lhs.m20 * rhs.m01 + lhs.m21 * rhs.m11 + lhs.m22 * rhs.m21 + lhs.m23 * rhs.m31;
        res.m22 = lhs.m20 * rhs.m02 + lhs.m21 * rhs.m12 + lhs.m22 * rhs.m22 + lhs.m23 * rhs.m32;
        res.m23 = lhs.m20 * rhs.m03 + lhs.m21 * rhs.m13 + lhs.m22 * rhs.m23 + lhs.m23 * rhs.m33;
        res.m30 = lhs.m30 * rhs.m00 + lhs.m31 * rhs.m10 + lhs.m32 * rhs.m20 + lhs.m33 * rhs.m30;
        res.m31 = lhs.m30 * rhs.m01 + lhs.m31 * rhs.m11 + lhs.m32 * rhs.m21 + lhs.m33 * rhs.m31;
        res.m32 = lhs.m30 * rhs.m02 + lhs.m31 * rhs.m12 + lhs.m32 * rhs.m22 + lhs.m33 * rhs.m32;
        res.m33 = lhs.m30 * rhs.m03 + lhs.m31 * rhs.m13 + lhs.m32 * rhs.m23 + lhs.m33 * rhs.m33;
        return res;
      },
      op_Multiply$1: function op_Multiply$1(lhs, vector) {
        var res = new MiniGameAdaptor.Vector4();
        res.x = lhs.m00 * vector.x + lhs.m01 * vector.y + lhs.m02 * vector.z + lhs.m03 * vector.w;
        res.y = lhs.m10 * vector.x + lhs.m11 * vector.y + lhs.m12 * vector.z + lhs.m13 * vector.w;
        res.z = lhs.m20 * vector.x + lhs.m21 * vector.y + lhs.m22 * vector.z + lhs.m23 * vector.w;
        res.w = lhs.m30 * vector.x + lhs.m31 * vector.y + lhs.m32 * vector.z + lhs.m33 * vector.w;
        return res;
      },
      getDefaultValue: function getDefaultValue() {
        return new MiniGameAdaptor.Matrix4x4();
      }
    }
  },
  fields: {
    ref: null
  },
  props: {
    m00: {
      get: function get() {
        return this.ref._raw[0];
      },
      set: function set(value) {
        this.ref._raw[0] = value;
      }
    },
    m10: {
      get: function get() {
        return this.ref._raw[1];
      },
      set: function set(value) {
        this.ref._raw[0] = value;
      }
    },
    m20: {
      get: function get() {
        return this.ref._raw[2];
      },
      set: function set(value) {
        this.ref._raw[2] = value;
      }
    },
    m30: {
      get: function get() {
        return this.ref._raw[3];
      },
      set: function set(value) {
        this.ref._raw[3] = value;
      }
    },
    m01: {
      get: function get() {
        return this.ref._raw[4];
      },
      set: function set(value) {
        this.ref._raw[4] = value;
      }
    },
    m11: {
      get: function get() {
        return this.ref._raw[5];
      },
      set: function set(value) {
        this.ref._raw[5] = value;
      }
    },
    m21: {
      get: function get() {
        return this.ref._raw[6];
      },
      set: function set(value) {
        this.ref._raw[6] = value;
      }
    },
    m31: {
      get: function get() {
        return this.ref._raw[7];
      },
      set: function set(value) {
        this.ref._raw[7] = value;
      }
    },
    m02: {
      get: function get() {
        return this.ref._raw[8];
      },
      set: function set(value) {
        this.ref._raw[8] = value;
      }
    },
    m12: {
      get: function get() {
        return this.ref._raw[9];
      },
      set: function set(value) {
        this.ref._raw[9] = value;
      }
    },
    m22: {
      get: function get() {
        return this.ref._raw[10];
      },
      set: function set(value) {
        this.ref._raw[10] = value;
      }
    },
    m32: {
      get: function get() {
        return this.ref._raw[11];
      },
      set: function set(value) {
        this.ref._raw[11] = value;
      }
    },
    m03: {
      get: function get() {
        return this.ref._raw[12];
      },
      set: function set(value) {
        this.ref._raw[12] = value;
      }
    },
    m13: {
      get: function get() {
        return this.ref._raw[13];
      },
      set: function set(value) {
        this.ref._raw[13] = value;
      }
    },
    m23: {
      get: function get() {
        return this.ref._raw[14];
      },
      set: function set(value) {
        this.ref._raw[14] = value;
      }
    },
    m33: {
      get: function get() {
        return this.ref._raw[15];
      },
      set: function set(value) {
        this.ref._raw[15] = value;
      }
    },
    decomposeProjection: {
      get: function get() {
        throw new System.Exception("not impl");
      }
    },
    determinant: {
      get: function get() {
        var te = this.ref._raw;
        var n11 = te[0],
            n12 = te[4],
            n13 = te[8],
            n14 = te[12];
        var n21 = te[1],
            n22 = te[5],
            n23 = te[9],
            n24 = te[13];
        var n31 = te[2],
            n32 = te[6],
            n33 = te[10],
            n34 = te[14];
        var n41 = te[3],
            n42 = te[7],
            n43 = te[11],
            n44 = te[15];
        return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
      }
    },
    inverse: {
      get: function get() {
        var m = this.ref.inverse();
        return new MiniGameAdaptor.Matrix4x4.$ctor3(m);
      }
    },
    isIdentity: {
      get: function get() {
        return this.equals(identityMatrix);
      }
    },
    // TODO
    lossyScale: {
      get: function get() {
        throw new System.Exception("not impl");
      }
    },
    rotation: {
      get: function get() {
        throw new System.Exception("not impl");
      }
    },
    transpose: {
      get: function get() {
        var te = this.ref._raw.slice();

        var tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return new MiniGameAdaptor.Matrix4x4.$ctor2(te);
      }
    }
  },
  ctors: {
    $ctor1: function $ctor1(column0, column1, column2, column3) {
      this.$initialize();
      this.ref = new engine.Matrix4();
      this.m00 = column0.x;
      this.m01 = column1.x;
      this.m02 = column2.x;
      this.m03 = column3.x;
      this.m10 = column0.y;
      this.m11 = column1.y;
      this.m12 = column2.y;
      this.m13 = column3.y;
      this.m20 = column0.z;
      this.m21 = column1.z;
      this.m22 = column2.z;
      this.m23 = column3.z;
      this.m30 = column0.w;
      this.m31 = column1.w;
      this.m32 = column2.w;
      this.m33 = column3.w;
    },
    $ctor2: function $ctor2(array) {
      this.$initialize();
      this.ref = new engine.Matrix4();
      this.m00 = array[0];
      this.m01 = array[4];
      this.m02 = array[8];
      this.m03 = array[12];
      this.m10 = array[1];
      this.m11 = array[5];
      this.m12 = array[9];
      this.m13 = array[13];
      this.m20 = array[2];
      this.m21 = array[6];
      this.m22 = array[10];
      this.m23 = array[14];
      this.m30 = array[3];
      this.m31 = array[7];
      this.m32 = array[11];
      this.m33 = array[15];
    },
    $ctor3: function $ctor3(ref) {
      this.$initialize();
      this.ref = ref;
    },
    ctor: function ctor() {
      this.$initialize();
      this.ref = new engine.Matrix4();
      this.m00 = 0;
      this.m01 = 0;
      this.m02 = 0;
      this.m03 = 0;
      this.m10 = 0;
      this.m11 = 0;
      this.m12 = 0;
      this.m13 = 0;
      this.m20 = 0;
      this.m21 = 0;
      this.m22 = 0;
      this.m23 = 0;
      this.m30 = 0;
      this.m31 = 0;
      this.m32 = 0;
      this.m33 = 0;
    }
  },
  methods: {
    getItem: function getItem(index) {
      return this.ref._raw[index];
    },
    setItem: function setItem(index, value) {
      switch (index) {
        case 0:
          this.m00 = value;
          break;

        case 1:
          this.m10 = value;
          break;

        case 2:
          this.m20 = value;
          break;

        case 3:
          this.m30 = value;
          break;

        case 4:
          this.m01 = value;
          break;

        case 5:
          this.m11 = value;
          break;

        case 6:
          this.m21 = value;
          break;

        case 7:
          this.m31 = value;
          break;

        case 8:
          this.m02 = value;
          break;

        case 9:
          this.m12 = value;
          break;

        case 10:
          this.m22 = value;
          break;

        case 11:
          this.m32 = value;
          break;

        case 12:
          this.m03 = value;
          break;

        case 13:
          this.m13 = value;
          break;

        case 14:
          this.m23 = value;
          break;

        case 15:
          this.m33 = value;
          break;

        default:
          throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix index!");
      }
    },
    getItem$1: function getItem$1(row, column) {
      if (row < 0 || row > 3) throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix row");
      if (column < 0 || column > 3) throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix column");
      return this["m".concat(column).concat(row)];
    },
    setItem$1: function setItem$1(row, column, value) {
      if (row < 0 || row > 3) throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix row");
      if (column < 0 || column > 3) throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix column");
      this["m".concat(column).concat(row)] = value;
    },
    equals: function equals(other) {
      return this.Equals(other);
    },
    Equals: function Equals(other) {
      var te = this.ref._raw;
      var me = other.ref._raw;

      for (var i = 0; i < 16; i++) {
        if (te[i] !== me[i]) {
          return false;
        }
      }

      return true;
    },
    System$IEquatable$1$MiniGameAdaptor$Matrix4x4$equalsT: function System$IEquatable$1$MiniGameAdaptor$Matrix4x4$equalsT(other) {
      throw new System.Exception("Exception");
    },
    GetColumn: function GetColumn(index) {
      switch (index) {
        case 0:
          return new MiniGameAdaptor.Vector4(this.m00, this.m10, this.m20, this.m30);

        case 1:
          return new MiniGameAdaptor.Vector4(this.m01, this.m11, this.m21, this.m31);

        case 2:
          return new MiniGameAdaptor.Vector4(this.m02, this.m12, this.m22, this.m32);

        case 3:
          return new MiniGameAdaptor.Vector4(this.m03, this.m13, this.m23, this.m33);

        default:
          throw new System.IndexOutOfRangeException.$ctor1("Invalid column index!");
      }
    },
    getHashCode: function getHashCode() {
      return this.GetColumn(0).GetHashCode() ^ this.GetColumn(1).GetHashCode() << 2 ^ this.GetColumn(2).GetHashCode() >> 2 ^ this.GetColumn(3).GetHashCode() >> 1;
    },
    GetRow: function GetRow(index) {
      switch (index) {
        case 0:
          return new Vector4(this.m00, this.m01, this.m02, this.m03);

        case 1:
          return new Vector4(this.m10, this.m11, this.m12, this.m13);

        case 2:
          return new Vector4(this.m20, this.m21, this.m22, this.m23);

        case 3:
          return new Vector4(this.m30, this.m31, this.m32, this.m33);

        default:
          throw new System.IndexOutOfRangeException.$ctor1("Invalid row index!");
      }
    },
    MultiplyPoint: function MultiplyPoint(point) {
      var res = new MiniGameAdaptor.Vector3();
      var w;
      res.x = this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03;
      res.y = this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13;
      res.z = this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23;
      w = this.m30 * point.x + this.m31 * point.y + this.m32 * point.z + this.m33; // divide by 0

      if (w !== 0) {
        w = 1 / w;
      }

      res.x *= w;
      res.y *= w;
      res.z *= w;
      return res;
    },
    MultiplyPoint3x4: function MultiplyPoint3x4(point) {
      var res = new MiniGameAdaptor.Vector3();
      res.x = this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03;
      res.y = this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13;
      res.z = this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23;
      return res;
    },
    MultiplyVector: function MultiplyVector(vector) {
      var res = new MiniGameAdaptor.Vector3();
      res.x = this.m00 * vector.x + this.m01 * vector.y + this.m02 * vector.z;
      res.y = this.m10 * vector.x + this.m11 * vector.y + this.m12 * vector.z;
      res.z = this.m20 * vector.x + this.m21 * vector.y + this.m22 * vector.z;
      return res;
    },
    SetColumn: function SetColumn(index, column) {
      switch (index) {
        case 0:
          this.setItem(0, column.x);
          this.setItem(4, column.y);
          this.setItem(8, column.z);
          this.setItem(12, column.w);
          break;

        case 1:
          this.setItem(1, column.x);
          this.setItem(5, column.y);
          this.setItem(9, column.z);
          this.setItem(13, column.w);
          break;

        case 2:
          this.setItem(2, column.x);
          this.setItem(6, column.y);
          this.setItem(10, column.z);
          this.setItem(14, column.w);
          break;

        case 3:
          this.setItem(3, column.x);
          this.setItem(7, column.y);
          this.setItem(11, column.z);
          this.setItem(15, column.w);
          break;

        default:
          throw new System.IndexOutOfRangeException.$ctor1("Invalid column index!");
      }
    },
    SetRow: function SetRow(index, row) {
      switch (index) {
        case 0:
          this.setItem(0, row.x);
          this.setItem(1, row.y);
          this.setItem(2, row.z);
          this.setItem(3, row.w);
          break;

        case 1:
          this.setItem(4, row.x);
          this.setItem(5, row.y);
          this.setItem(6, row.z);
          this.setItem(7, row.w);
          break;

        case 2:
          this.setItem(8, row.x);
          this.setItem(9, row.y);
          this.setItem(10, row.z);
          this.setItem(11, row.w);
          break;

        case 3:
          this.setItem(12, row.x);
          this.setItem(13, row.y);
          this.setItem(14, row.z);
          this.setItem(15, row.w);
          break;

        default:
          throw new System.IndexOutOfRangeException.$ctor1("Invalid row index!");
      }
    },
    SetTRS: function SetTRS(translation, rotation, scale) {
      var scaleX = scale.x;
      var scaleY = scale.y;
      var scaleZ = scale.z;
      var x2 = rotation.x * rotation.x;
      var xy = rotation.x * rotation.y;
      var xz = rotation.x * rotation.z;
      var xw = rotation.x * rotation.w;
      var y2 = rotation.y * rotation.y;
      var yz = rotation.y * rotation.z;
      var yw = rotation.y * rotation.w;
      var z2 = rotation.z * rotation.z;
      var zw = rotation.z * rotation.w;
      var w2 = rotation.w * rotation.w;
      var m00 = x2 - y2 - z2 + w2;
      var m01 = 2.0 * (xy - zw);
      var m02 = 2.0 * (xz + yw);
      var m10 = 2.0 * (xy + zw);
      var m11 = -x2 + y2 - z2 + w2;
      var m12 = 2.0 * (yz - xw);
      var m20 = 2.0 * (xz - yw);
      var m21 = 2.0 * (yz + xw);
      var m22 = -x2 - y2 + z2 + w2;
      this.setItem(0, m00 * scaleX);
      this.setItem(1, m10 * scaleX);
      this.setItem(2, m20 * scaleX);
      this.setItem(3, 0.0);
      this.setItem(4, m01 * scaleY);
      this.setItem(5, m11 * scaleY);
      this.setItem(6, m21 * scaleY0);
      this.setItem(7, 0.0);
      this.setItem(8, m02 * scaleZ);
      this.setItem(9, m12 * scaleZ);
      this.setItem(10, m22 * scaleZ);
      this.setItem(11, 0.0);
      this.setItem(12, translation.x);
      this.setItem(13, translation.y);
      this.setItem(14, translation.z);
      this.setItem(15, 1.0);
    },
    toString: function toString() {
      return System.String.format("{0:F5}\t{1:F5}\t{2:F5}\t{3:F5}\n{4:F5}\t{5:F5}\t{6:F5}\t{7:F5}\n{8:F5}\t{9:F5}\t{10:F5}\t{11:F5}\n{12:F5}\t{13:F5}\t{14:F5}\t{15:F5}\n", this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33);
    },
    ToString: function ToString(format) {
      return System.String.format("{0}\t{1}\t{2}\t{3}\n{4}\t{5}\t{6}\t{7}\n{8}\t{9}\t{10}\t{11}\n{12}\t{13}\t{14}\t{15}\n", ToInvariantString(format, this.m00), ToInvariantString(format, this.m01), ToInvariantString(format, this.m02), ToInvariantString(format, this.m03), ToInvariantString(format, this.m10), ToInvariantString(format, this.m11), ToInvariantString(format, this.m12), ToInvariantString(format, this.m13), ToInvariantString(format, this.m20), ToInvariantString(format, this.m21), ToInvariantString(format, this.m22), ToInvariantString(format, this.m23), ToInvariantString(format, this.m30), ToInvariantString(format, this.m31), ToInvariantString(format, this.m32), ToInvariantString(format, this.m33));
    },
    TransformPlane: function TransformPlane(plane) {
      var ittrans = this.inverse;
      var x = plane.normal.x,
          y = plane.normal.y,
          z = plane.normal.z,
          w = plane.distance; // note: a transpose is part of this transformation

      var a = ittrans.m00 * x + ittrans.m10 * y + ittrans.m20 * z + ittrans.m30 * w;
      var b = ittrans.m01 * x + ittrans.m11 * y + ittrans.m21 * z + ittrans.m31 * w;
      var c = ittrans.m02 * x + ittrans.m12 * y + ittrans.m22 * z + ittrans.m32 * w;
      var d = ittrans.m03 * x + ittrans.m13 * y + ittrans.m23 * z + ittrans.m33 * w;
      return new MiniGameAdaptor.Plane(new MiniGameAdaptor.Vector3(a, b, c), d);
    },
    ValidTRS: function ValidTRS() {
      throw new System.Exception("not impl");
    },
    $clone: function $clone(to) {
      var s = to || new MiniGameAdaptor.Matrix4x4();
      s.m00 = this.m00;
      s.m10 = this.m10;
      s.m20 = this.m20;
      s.m30 = this.m30;
      s.m01 = this.m01;
      s.m11 = this.m11;
      s.m21 = this.m21;
      s.m31 = this.m31;
      s.m02 = this.m02;
      s.m12 = this.m12;
      s.m22 = this.m22;
      s.m32 = this.m32;
      s.m03 = this.m03;
      s.m13 = this.m13;
      s.m23 = this.m23;
      s.m33 = this.m33;
      return s;
    }
  }
});
var identityMatrix = new MiniGameAdaptor.Matrix4x4.$ctor1(new MiniGameAdaptor.Vector4.$ctor3(1, 0, 0, 0), new MiniGameAdaptor.Vector4.$ctor3(0, 1, 0, 0), new MiniGameAdaptor.Vector4.$ctor3(0, 0, 1, 0), new MiniGameAdaptor.Vector4.$ctor3(0, 0, 0, 1));
var zeroMatrix = new MiniGameAdaptor.Matrix4x4.$ctor1(new MiniGameAdaptor.Vector4.$ctor3(0, 0, 0, 0), new MiniGameAdaptor.Vector4.$ctor3(0, 0, 0, 0), new MiniGameAdaptor.Vector4.$ctor3(0, 0, 0, 0), new MiniGameAdaptor.Vector4.$ctor3(0, 0, 0, 0));
engine.decorators.serialize('MiniGameAdaptor.Matrix4x4')(MiniGameAdaptor.Matrix4x4);
Object.defineProperty(MiniGameAdaptor.Matrix4x4.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Matrix4x4.prototype.__properties)
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Quaternion", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.Quaternion)];
    },
    $kind: "struct",
    statics: {
      fields: {
        kEpsilon: 0,
        identityQuaternion: null
      },
      props: {
        identity: {
          get: function get() {
            return MiniGameAdaptor.Quaternion.identityQuaternion.$clone();
          }
        }
      },
      ctors: {
        init: function init() {
          this.kEpsilon = 1E-06;
          this.identityQuaternion = new MiniGameAdaptor.Quaternion.$ctor1(0, 0, 0, 1);
        }
      },
      methods: {
        Deserialize: function Deserialize(data, comp) {
          comp.x = data[0];
          comp.y = data[1];
          comp.z = data[2];
          comp.w = data[3];
          return comp;
        },
        Angle: function Angle(a, b) {
          var dot = MiniGameAdaptor.Quaternion.Dot(a, b);
          return MiniGameAdaptor.Quaternion.__IsEqualUsingDot(dot) ? 0 : MiniGameAdaptor.Mathf.Acos(MiniGameAdaptor.Mathf.Min(MiniGameAdaptor.Mathf.Abs(dot), 1.0)) * 2.0 * MiniGameAdaptor.Mathf.Rad2Deg;
        },
        __IsEqualUsingDot: function __IsEqualUsingDot(dot) {
          return dot > 1.0 - MiniGameAdaptor.Quaternion.kEpsilon;
        },
        AngleAxis: function AngleAxis(angle, axis) {
          if (axis.sqrMagnitude === 0) {
            return MiniGameAdaptor.Quaternion.identity;
          }

          var result = new MiniGameAdaptor.Quaternion();
          var radians = angle * MiniGameAdaptor.Mathf.Deg2Rad * 0.5;
          axis.Normalize();
          axis = MiniGameAdaptor.Vector3.op_Multiply$1(axis, Math.sin(radians));
          result.x = axis.x;
          result.y = axis.y;
          result.z = axis.z;
          result.w = Math.cos(radians);
          return MiniGameAdaptor.Quaternion.Normalize(result);
        },
        Dot: function Dot(a, b) {
          return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
        },
        Euler: function Euler(x, y, z) {
          return MiniGameAdaptor.Quaternion.Euler$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
        },
        Euler$1: function Euler$1(euler) {
          if (!euler) {
            return;
          }

          var rad = euler._Deg2Rad();

          return new MiniGameAdaptor.Quaternion.$ctor2(engine.Quaternion.fromEulerAngles(rad.ref));
        },
        // from http://stackoverflow.com/questions/11492299/quaternion-to-euler-angles-algorithm-how-to-convert-to-y-up-and-between-ha
        // __FromEulerRad: function (euler) {
        //     let yaw = euler.x;
        //     let pitch = euler.y;
        //     let roll = euler.z;
        //     let rollOver2 = roll * 0.5;
        //     let sinRollOver2 = Math.sin(rollOver2);
        //     let cosRollOver2 = Math.cos(rollOver2);
        //     let pitchOver2 = pitch * 0.5;
        //     let sinPitchOver2 = Math.sin(pitchOver2);
        //     let cosPitchOver2 = Math.cos(pitchOver2);
        //     let yawOver2 = yaw * 0.5;
        //     let sinYawOver2 = Math.sin(yawOver2);
        //     let cosYawOver2 = Math.cos(yawOver2);
        //     let result = new MiniGameAdaptor.Quaternion.$ctor1(
        //         cosYawOver2 * cosPitchOver2 * cosRollOver2 + sinYawOver2 * sinPitchOver2 * sinRollOver2,
        //         cosYawOver2 * cosPitchOver2 * sinRollOver2 - sinYawOver2 * sinPitchOver2 * cosRollOver2,
        //         cosYawOver2 * sinPitchOver2 * cosRollOver2 + sinYawOver2 * cosPitchOver2 * sinRollOver2,
        //         sinYawOver2 * cosPitchOver2 * cosRollOver2 - cosYawOver2 * sinPitchOver2 * sinRollOver2
        //     );
        //     return result;
        // },
        FromToRotation: function FromToRotation(fromDirection, toDirection) {
          return MiniGameAdaptor.Quaternion.RotateTowards(MiniGameAdaptor.Quaternion.LookRotation(fromDirection), MiniGameAdaptor.Quaternion.LookRotation(toDirection), float.MaxValue);
        },
        Inverse: function Inverse(rotation) {
          var lengthSq = rotation.x * rotation.x + rotation.y * rotation.y + rotation.z * rotation.z + rotation.w * rotation.w;

          if (lengthSq != 0.0) {
            var i = 1.0 / lengthSq;
            return new MiniGameAdaptor.Quaternion.$ctor1(rotation.x * -i, rotation.y * -i, rotation.z * -i, rotation.w * i);
          }

          return rotation;
        },
        Lerp: function Lerp(a, b, t) {
          return MiniGameAdaptor.Quaternion.Slerp(a, b, t);
        },
        LerpUnclamped: function LerpUnclamped(a, b, t) {
          return MiniGameAdaptor.Quaternion.SlerpUnclamped(a, b, t);
        },
        LookRotation: function LookRotation(forward) {
          var up = MiniGameAdaptor.Vector3.up;
          return MiniGameAdaptor.Quaternion.LookRotation$1(forward, up);
        },
        LookRotation$1: function LookRotation$1(forward, upwards) {
          forward = MiniGameAdaptor.Vector3.Normalize(forward);
          var right = MiniGameAdaptor.Vector3.Normalize(MiniGameAdaptor.Vector3.Cross(upwards, forward));
          upwards = MiniGameAdaptor.Vector3.Cross(forward, right);
          var m00 = right.x;
          var m01 = right.y;
          var m02 = right.z;
          var m10 = upwards.x;
          var m11 = upwards.y;
          var m12 = upwards.z;
          var m20 = forward.x;
          var m21 = forward.y;
          var m22 = forward.z;
          var num8 = m00 + m11 + m22;
          var quaternion = new MiniGameAdaptor.Quaternion();

          if (num8 > 0) {
            var num = Math.sqrt(num8 + 1);
            quaternion.w = num * 0.5; // divide by 0

            if (num !== 0) {
              num = 0.5 / num;
            }

            quaternion.x = (m12 - m21) * num;
            quaternion.y = (m20 - m02) * num;
            quaternion.z = (m01 - m10) * num;
            return quaternion;
          }

          if (m00 >= m11 && m00 >= m22) {
            var num7 = Math.sqrt(1 + m00 - m11 - m22);
            var num4 = 0; // divide by 0

            if (num7 !== 0) {
              num4 = 0.5 / num7;
            }

            quaternion.x = 0.5 * num7;
            quaternion.y = (m01 + m10) * num4;
            quaternion.z = (m02 + m20) * num4;
            quaternion.w = (m12 - m21) * num4;
            return quaternion;
          }

          if (m11 > m22) {
            var num6 = Math.sqrt(1 + m11 - m00 - m22);
            var num3 = 0; // divide by 0

            if (num6 !== 0) {
              num3 = 0.5 / num6;
            }

            quaternion.x = (m10 + m01) * num3;
            quaternion.y = 0.5 * num6;
            quaternion.z = (m21 + m12) * num3;
            quaternion.w = (m20 - m02) * num3;
            return quaternion;
          }

          var num5 = Math.sqrt(1 + m22 - m00 - m11);
          var num2 = 0; // divide by 0

          if (num5 !== 0) {
            num2 = 0.5 / num5;
          }

          quaternion.x = (m20 + m02) * num2;
          quaternion.y = (m21 + m12) * num2;
          quaternion.z = 0.5 * num5;
          quaternion.w = (m01 - m10) * num2;
          return quaternion;
        },
        Normalize: function Normalize(q) {
          var mag = MiniGameAdaptor.Mathf.Sqrt(MiniGameAdaptor.Quaternion.Dot(q, q));
          if (mag < MiniGameAdaptor.Mathf.Epsilon) return MiniGameAdaptor.Quaternion.identity;
          return new MiniGameAdaptor.Quaternion.$ctor4(q.x / mag, q.y / mag, q.z / mag, q.w / mag);
        },
        RotateTowards: function RotateTowards(from, to, maxDegreesDelta) {
          var angle = MiniGameAdaptor.Quaternion.Angle(from, to);
          if (angle == 0.0) return to;
          return MiniGameAdaptor.Quaternion.SlerpUnclamped(from, to, MiniGameAdaptor.Mathf.Min(1.0, maxDegreesDelta / angle));
        },
        Slerp: function Slerp(a, b, t) {
          if (t > 1.0) t = 1.0;
          if (t < 0.0) t = 0.0;
          return new MiniGameAdaptor.Quaternion.$ctor2(a.ref.slerp(b.ref, t));
        },
        SlerpUnclamped: function SlerpUnclamped(a, b, t) {
          return new MiniGameAdaptor.Quaternion.$ctor2(a.ref.slerp(b.ref, t));
        },
        __axisAngle2Quat: function __axisAngle2Quat(axis, angle) {
          var q = new MiniGameAdaptor.Quaternion();
          var halfAngle = angle * 0.5;
          var s = Math.sin(halfAngle);
          q.x = s * axis.x;
          q.y = s * axis.y;
          q.z = s * axis.z;
          q.w = Math.cos(halfAngle);
          return q;
        },
        op_Equality: function op_Equality(lhs, rhs) {
          return MiniGameAdaptor.Quaternion.__IsEqualUsingDot(MiniGameAdaptor.Quaternion.Dot(lhs, rhs));
        },
        op_Inequality: function op_Inequality(lhs, rhs) {
          return !MiniGameAdaptor.Quaternion.op_Equality(lhs, rhs);
        },
        op_Multiply: function op_Multiply(lhs, rhs) {
          return new MiniGameAdaptor.Quaternion.$ctor1(lhs.w * rhs.x + lhs.x * rhs.w + lhs.y * rhs.z - lhs.z * rhs.y, lhs.w * rhs.y + lhs.y * rhs.w + lhs.z * rhs.x - lhs.x * rhs.z, lhs.w * rhs.z + lhs.z * rhs.w + lhs.x * rhs.y - lhs.y * rhs.x, lhs.w * rhs.w - lhs.x * rhs.x - lhs.y * rhs.y - lhs.z * rhs.z);
        },
        op_Multiply$1: function op_Multiply$1(rotation, point) {
          var x = rotation.x * 2;
          var y = rotation.y * 2;
          var z = rotation.z * 2;
          var xx = rotation.x * x;
          var yy = rotation.y * y;
          var zz = rotation.z * z;
          var xy = rotation.x * y;
          var xz = rotation.x * z;
          var yz = rotation.y * z;
          var wx = rotation.w * x;
          var wy = rotation.w * y;
          var wz = rotation.w * z;
          var res = new MiniGameAdaptor.Vector3.$ctor2((1 - (yy + zz)) * point.x + (xy - wz) * point.y + (xz + wy) * point.z, (xy + wz) * point.x + (1 - (xx + zz)) * point.y + (yz - wx) * point.z, (xz - wy) * point.x + (yz + wx) * point.y + (1 - (xx + yy)) * point.z);
          return res;
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.Quaternion();
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      eulerAngles: {
        get: function get() {
          return new MiniGameAdaptor.Vector3.$ctor4(this.ref.toEulerAngles())._FlipX()._Rad2Deg();
        },
        set: function set(value) {
          this.ref = engine.Quaternion.fromEulerAngles(value._Deg2Rad()._FlipX().ref);
        }
      },
      normalized: {
        get: function get() {
          return MiniGameAdaptor.Quaternion.Normalize(this);
        }
      },
      x: {
        get: function get() {
          return this.ref.x;
        },
        set: function set(value) {
          this.ref.x = value;
        }
      },
      y: {
        get: function get() {
          return this.ref.y;
        },
        set: function set(value) {
          this.ref.y = value;
        }
      },
      z: {
        get: function get() {
          return this.ref.z;
        },
        set: function set(value) {
          this.ref.z = value;
        }
      },
      w: {
        get: function get() {
          return this.ref.w;
        },
        set: function set(value) {
          this.ref.w = value;
        }
      }
    },
    ctors: {
      $ctor1: function $ctor1(x, y, z, w) {
        this.$initialize();
        this.ref = new engine.Quaternion();
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.Normalize();
      },
      $ctor2: function $ctor2(ref) {
        this.$initialize();
        this.ref = ref;
      },
      $ctor3: function $ctor3(ref) {
        this.$initialize();
        this.ref = new engine.Quaternion();
        this.x = ref.x;
        this.y = ref.y;
        this.z = ref.z;
        this.w = ref.w;
      },
      // same as $ctor1
      // just for Normalize
      $ctor4: function $ctor4(x, y, z, w) {
        this.$initialize();
        this.ref = new engine.Quaternion();
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      },
      ctor: function ctor() {
        this.$initialize();
        this.ref = new engine.Quaternion();
        this.x = this.y = this.z = this.w = 0;
      }
    },
    methods: {
      getItem: function getItem(index) {
        switch (index) {
          case 0:
            return this.x;

          case 1:
            return this.y;

          case 2:
            return this.z;

          case 3:
            return this.w;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Quaternion index!");
        }
      },
      setItem: function setItem(index, value) {
        switch (index) {
          case 0:
            this.x = value;
            break;

          case 1:
            this.y = value;
            break;

          case 2:
            this.z = value;
            break;

          case 3:
            this.w = value;
            break;

          default:
            throw new System.IndexOutOfRangeException.$ctor1("Invalid Quaternion index!");
        }
      },
      equals: function equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Quaternion)) {
          return false;
        }

        return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Quaternion));
      },
      equalsT: function equalsT(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
      },
      Equals: function Equals(other) {
        if (!Bridge.is(other, MiniGameAdaptor.Quaternion)) {
          return false;
        }

        return this.equalsT(other);
      },
      System$IEquatable$1$MiniGameAdaptor$Quaternion$equalsT: function System$IEquatable$1$MiniGameAdaptor$Quaternion$equalsT(other) {
        throw new System.Exception("Exception");
      },
      getHashCode: function getHashCode() {
        return System.Single.getHashCode(this.x) ^ System.Single.getHashCode(this.y) << 2 ^ System.Single.getHashCode(this.z) >> 2 ^ System.Single.getHashCode(this.w) >> 2;
      },
      Normalize: function Normalize() {
        MiniGameAdaptor.Quaternion.Normalize(this).$clone(this);
      },
      Set: function Set(newX, newY, newZ, newW) {
        this.x = newX;
        this.y = newY;
        this.z = newZ;
        this.w = newW;
      },
      SetFromToRotation: function SetFromToRotation(fromDirection, toDirection) {
        MiniGameAdaptor.Quaternion.FromToRotation(fromDirection, toDirection).$clone(this);
      },
      SetLookRotation: function SetLookRotation(view) {
        MiniGameAdaptor.Quaternion.SetLookRotation$1(view, MiniGameAdaptor.Vector3.up);
      },
      SetLookRotation$1: function SetLookRotation$1(view, up) {
        MiniGameAdaptor.Quaternion.LookRotation(view, up).$clone(this);
      },
      // 这里的参数是 out 别名，不应该直接 *= 或者 =。@eugenejiang see see?
      // Reply: 确实如此 = =!! fixed
      ToAngleAxis: function ToAngleAxis(angle, axis) {
        this.__ToAxisAngleRad(axis, angle);

        angle.v *= MiniGameAdaptor.Mathf.Rad2Deg; // return angle;
      },
      __ToAxisAngleRad: function __ToAxisAngleRad(axis, angle) {
        var q = this;

        if (Math.abs(q.w) > 1.0) {
          q.Normalize();
        }

        angle.v = 2.0 * Math.acos(q.w);
        var d = Math.sqrt(1.0 - q.w * q.w);

        if (d > 0.0001) {
          axis.v = MiniGameAdaptor.Vector3.op_Division(new MiniGameAdaptor.Vector3.$ctor2(q.x, q.y, q.z), d);
        } else {
          axis.v = new MiniGameAdaptor.Vector3.$ctor2(1, 0, 0);
        }
      },
      toString: function toString() {
        return System.String.format("({0:F1}, {1:F1}, {2:F1}, {3:F1})", this.x, this.y, this.z, this.w);
      },
      ToString: function ToString(format) {
        return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ", " + this.z.toFixed(format) + ", " + this.w.toFixed(format) + ")";
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.Quaternion();
        s.x = this.x;
        s.y = this.y;
        s.z = this.z;
        s.w = this.w;
        return s;
      },
      _FlipXnW: function _FlipXnW() {
        this.x *= -1;
        this.w *= -1;
        return this;
      },
      _FlipX: function _FlipX() {
        this.x *= -1;
        return this;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Quaternion')(MiniGameAdaptor.Quaternion);
Object.defineProperty(MiniGameAdaptor.Quaternion.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Quaternion.prototype.__properties)
});

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.define("MiniGameAdaptor.Color", {
  inherits: function inherits() {
    return [System.IEquatable$1(MiniGameAdaptor.Color)];
  },
  $kind: "struct",
  statics: {
    props: {
      red: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(1.0, 0.0, 0.0, 1.0);
        }
      },
      green: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(0.0, 1.0, 0.0, 1.0);
        }
      },
      blue: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(0.0, 0.0, 1.0, 1.0);
        }
      },
      white: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(1.0, 1.0, 1.0, 1.0);
        }
      },
      black: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(0.0, 0.0, 0.0, 1.0);
        }
      },
      yellow: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(1.0, 0.921568632, 0.0156862754, 1.0);
        }
      },
      cyan: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(0.0, 1.0, 1.0, 1.0);
        }
      },
      magenta: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(1.0, 0.0, 1.0, 1.0);
        }
      },
      gray: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(0.5, 0.5, 0.5, 1.0);
        }
      },
      grey: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(0.5, 0.5, 0.5, 1.0);
        }
      },
      clear: {
        get: function get() {
          return new MiniGameAdaptor.Color.$ctor2(0.0, 0.0, 0.0, 0.0);
        }
      }
    },
    methods: {
      Deserialize: function Deserialize(data, comp) {
        comp.r = data[0];
        comp.g = data[1];
        comp.b = data[2];
        comp.a = data[3];
        return comp;
      },
      Lerp: function Lerp(a, b, t) {
        t = MiniGameAdaptor.Mathf.Clamp01(t);
        return new MiniGameAdaptor.Color.$ctor2(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t, a.a + (b.a - a.a) * t);
      },
      LerpUnclamped: function LerpUnclamped(a, b, t) {
        return new MiniGameAdaptor.Color.$ctor2(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t, a.a + (b.a - a.a) * t);
      },
      RGBToHSV: function RGBToHSV(rgbColor, H, S, V) {
        if (rgbColor.b > rgbColor.g && rgbColor.b > rgbColor.r) {
          MiniGameAdaptor.Color.RGBToHSVHelper(4.0, rgbColor.b, rgbColor.r, rgbColor.g, H, S, V);
        } else {
          if (rgbColor.g > rgbColor.r) {
            MiniGameAdaptor.Color.RGBToHSVHelper(2.0, rgbColor.g, rgbColor.b, rgbColor.r, H, S, V);
          } else {
            MiniGameAdaptor.Color.RGBToHSVHelper(0.0, rgbColor.r, rgbColor.g, rgbColor.b, H, S, V);
          }
        }
      },
      RGBToHSVHelper: function RGBToHSVHelper(offset, dominantcolor, colorone, colortwo, H, S, V) {
        V.v = dominantcolor;

        if (V.v !== 0) {
          var small = 0;

          if (colorone > colortwo) {
            small = colortwo;
          } else {
            small = colorone;
          }

          var diff = V.v - small;

          if (diff !== 0) {
            S.v = diff / V.v;
            H.v = offset + (colorone - colortwo) / diff;
          } else {
            S.v = 0;
            H.v = offset + (colorone - colortwo);
          }

          H.v /= 6;

          if (H.v < 0) {
            H.v += 1.0;
          }
        } else {
          S.v = 0;
          H.v = 0;
        }
      },
      HSVToRGB: function HSVToRGB(H, S, V) {
        return MiniGameAdaptor.Color.HSVToRGB$1(H, S, V, true);
      },
      HSVToRGB$1: function HSVToRGB$1(H, S, V, hdr) {
        var retval = MiniGameAdaptor.Color.white.$clone();

        if (S === 0) {
          retval.r = V;
          retval.g = V;
          retval.b = V;
        } else if (V === 0) {
          retval.r = 0;
          retval.g = 0;
          retval.b = 0;
        } else {
          retval.r = 0;
          retval.g = 0;
          retval.b = 0;
          var t_S, t_V, h_to_floor;
          t_S = S;
          t_V = V;
          h_to_floor = H * 6.0;
          var temp = Bridge.Int.clip32(MiniGameAdaptor.Mathf.Floor(h_to_floor));
          var t = h_to_floor - temp;
          var let_1 = t_V * (1 - t_S);
          var let_2 = t_V * (1 - t_S * t);
          var let_3 = t_V * (1 - t_S * (1 - t));

          switch (temp) {
            case 0:
              retval.r = t_V;
              retval.g = let_3;
              retval.b = let_1;
              break;

            case 1:
              retval.r = let_2;
              retval.g = t_V;
              retval.b = let_1;
              break;

            case 2:
              retval.r = let_1;
              retval.g = t_V;
              retval.b = let_3;
              break;

            case 3:
              retval.r = let_1;
              retval.g = let_2;
              retval.b = t_V;
              break;

            case 4:
              retval.r = let_3;
              retval.g = let_1;
              retval.b = t_V;
              break;

            case 5:
              retval.r = t_V;
              retval.g = let_1;
              retval.b = let_2;
              break;

            case 6:
              retval.r = t_V;
              retval.g = let_3;
              retval.b = let_1;
              break;

            case -1:
              retval.r = t_V;
              retval.g = let_1;
              retval.b = let_2;
              break;
          }

          if (!hdr) {
            retval.r = MiniGameAdaptor.Mathf.Clamp$1(retval.r, 0.0, 1.0);
            retval.g = MiniGameAdaptor.Mathf.Clamp$1(retval.g, 0.0, 1.0);
            retval.b = MiniGameAdaptor.Mathf.Clamp$1(retval.b, 0.0, 1.0);
          }
        }

        return retval.$clone();
      },
      op_Addition: function op_Addition(a, b) {
        return new MiniGameAdaptor.Color.$ctor2(a.r + b.r, a.g + b.g, a.b + b.b, a.a + b.a);
      },
      op_Subtraction: function op_Subtraction(a, b) {
        return new MiniGameAdaptor.Color.$ctor2(a.r - b.r, a.g - b.g, a.b - b.b, a.a - b.a);
      },
      op_Multiply: function op_Multiply(a, b) {
        return new MiniGameAdaptor.Color.$ctor2(a.r * b.r, a.g * b.g, a.b * b.b, a.a * b.a);
      },
      op_Multiply$1: function op_Multiply$1(a, b) {
        return new MiniGameAdaptor.Color.$ctor2(a.r * b, a.g * b, a.b * b, a.a * b);
      },
      op_Multiply$2: function op_Multiply$2(b, a) {
        return new MiniGameAdaptor.Color.$ctor2(a.r * b, a.g * b, a.b * b, a.a * b);
      },
      op_Division: function op_Division(a, b) {
        return new MiniGameAdaptor.Color.$ctor2(a.r / b, a.g / b, a.b / b, a.a / b);
      },
      op_Equality: function op_Equality(lhs, rhs) {
        return MiniGameAdaptor.Vector4.op_Equality(MiniGameAdaptor.Color.op_Implicit$1(lhs), MiniGameAdaptor.Color.op_Implicit$1(rhs));
      },
      op_Inequality: function op_Inequality(lhs, rhs) {
        return !MiniGameAdaptor.Color.op_Equality(lhs.$clone(), rhs.$clone());
      },
      op_Implicit$1: function op_Implicit$1(c) {
        return new MiniGameAdaptor.Vector4.$ctor3(c.r, c.g, c.b, c.a);
      },
      op_Implicit: function op_Implicit(v) {
        return new MiniGameAdaptor.Color.$ctor2(v.x, v.y, v.z, v.w);
      },
      getDefaultValue: function getDefaultValue() {
        return new MiniGameAdaptor.Color();
      }
    }
  },
  fields: {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  },
  props: {
    grayscale: {
      get: function get() {
        return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
      }
    },
    maxColorComponent: {
      get: function get() {
        return MiniGameAdaptor.Mathf.Max$2(MiniGameAdaptor.Mathf.Max$2(this.r, this.g), this.b);
      }
    },
    linear: {
      get: function get() {
        return new MiniGameAdaptor.Color.$ctor2(MiniGameAdaptor.Mathf.GammaToLinearSpace(r), MiniGameAdaptor.Mathf.GammaToLinearSpace(g), MiniGameAdaptor.Mathf.GammaToLinearSpace(b), a);
      }
    },
    gamma: {
      get: function get() {
        return new MiniGameAdaptor.Color.$ctor2(MiniGameAdaptor.Mathf.LinearToGammaSpace(r), MiniGameAdaptor.Mathf.LinearToGammaSpace(g), MiniGameAdaptor.Mathf.LinearToGammaSpace(b), a);
      }
    }
  },
  alias: ["equalsT", "System$IEquatable$1$Demo$MiniGameAdaptor$Color$equalsT"],
  ctors: {
    $ctor2: function $ctor2(r, g, b, a) {
      this.$initialize();
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    },
    $ctor1: function $ctor1(r, g, b) {
      this.$initialize();
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = 1.0;
    },
    ctor: function ctor() {
      this.$initialize();
    }
  },
  methods: {
    getItem: function getItem(index) {
      switch (index) {
        case 0:
          return this.r;

        case 1:
          return this.g;

        case 2:
          return this.b;

        case 3:
          return this.a;

        default:
          throw new System.IndexOutOfRangeException.$ctor1("Invalid Color index(" + index + ")!");
      }
    },
    setItem: function setItem(index, value) {
      switch (index) {
        case 0:
          this.r = value;
          break;

        case 1:
          this.g = value;
          break;

        case 2:
          this.b = value;
          break;

        case 3:
          this.a = value;
          break;

        default:
          throw new System.IndexOutOfRangeException.$ctor1("Invalid Color index(" + index + ")!");
      }
    },
    toString: function toString() {
      return System.String.format("RGBA({0:F3}, {1:F3}, {2:F3}, {3:F3})", this.r, this.g, this.b, this.a);
    },
    ToString: function ToString(format) {
      return System.String.format("RGBA({0}, {1}, {2}, {3})", System.Single.format(this.r, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat), System.Single.format(this.g, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat), System.Single.format(this.b, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat), System.Single.format(this.a, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat));
    },
    getHashCode: function getHashCode() {
      return MiniGameAdaptor.Color.op_Implicit$1(this).getHashCode();
    },
    equals: function equals(other) {
      if (!Bridge.is(other, MiniGameAdaptor.Color)) {
        return false;
      }

      return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Color));
    },
    equalsT: function equalsT(other) {
      return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
    },
    RGBMultiplied$1: function RGBMultiplied$1(multiplier) {
      return new MiniGameAdaptor.Color.$ctor2(this.r * multiplier, this.g * multiplier, this.b * multiplier, this.a);
    },
    RGBMultiplied: function RGBMultiplied(multiplier) {
      return new MiniGameAdaptor.Color.$ctor2(this.r * multiplier.r, this.g * multiplier.g, this.b * multiplier.b, this.a);
    },
    AlphaMultiplied: function AlphaMultiplied(multiplier) {
      return new MiniGameAdaptor.Color.$ctor2(this.r, this.g, this.b, this.a * multiplier);
    },
    $clone: function $clone(to) {
      var s = to || new MiniGameAdaptor.Color();
      s.r = this.r;
      s.g = this.g;
      s.b = this.b;
      s.a = this.a;
      return s;
    },
    __remap01: function __remap01() {
      this.r /= 255;
      this.g /= 255;
      this.b /= 255;
      this.a /= 255;
      return this;
    },
    __remap0255: function __remap0255() {
      this.r *= 255;
      this.g *= 255;
      this.b *= 255;
      this.a *= 255;
      return this;
    }
  }
});
engine.decorators.serialize('MiniGameAdaptor.Color')(MiniGameAdaptor.Color);
Object.defineProperty(MiniGameAdaptor.Color.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Color.prototype.__properties)
});

/***/ }),
/* 25 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Random", {
    statics: {
      props: {
        insideUnitCircle: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        insideUnitSphere: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        onUnitSphere: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        // https://projecteuclid.org/euclid.aoms/1177692644
        rotation: {
          get: function get() {
            var x, y, z, u, v, w, s;

            do {
              x = MiniGameAdaptor.Random.Range(-1, 1);
              y = MiniGameAdaptor.Random.Range(-1, 1);
              z = x * x + y * y;
            } while (z > 1);

            do {
              u = MiniGameAdaptor.Random.Range(-1, 1);
              v = MiniGameAdaptor.Random.Range(-1, 1);
              w = u * u + v * v;
            } while (w > 1);

            s = Math.sqrt((1 - z) / w);
            return new MiniGameAdaptor.Quaternion.$ctor1(x, y, s * u, s * v);
          }
        },
        rotationUniform: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        state: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        value: {
          get: function get() {
            return MiniGameAdaptor.Random.Range(0, 1);
          }
        }
      },
      methods: {
        ColorHSV: function ColorHSV() {
          return MiniGameAdaptor.Random.ColorHSV$4(0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0);
        },
        ColorHSV$1: function ColorHSV$1(hueMin, hueMax) {
          return MiniGameAdaptor.Random.ColorHSV$4(hueMin, hueMax, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0);
        },
        ColorHSV$2: function ColorHSV$2(hueMin, hueMax, saturationMin, saturationMax) {
          return MiniGameAdaptor.Random.ColorHSV$4(hueMin, hueMax, saturationMin, saturationMax, 0.0, 1.0, 1.0, 1.0);
        },
        ColorHSV$3: function ColorHSV$3(hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax) {
          return MiniGameAdaptor.Random.ColorHSV$4(hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, 1.0, 1.0);
        },
        ColorHSV$4: function ColorHSV$4(hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, alphaMin, alphaMax) {
          var h = MiniGameAdaptor.Mathf.Lerp(hueMin, hueMax, MiniGameAdaptor.Random.value);
          var s = MiniGameAdaptor.Mathf.Lerp(saturationMin, saturationMax, MiniGameAdaptor.Random.value);
          var v = MiniGameAdaptor.Mathf.Lerp(valueMin, valueMax, MiniGameAdaptor.Random.value);
          var color = MiniGameAdaptor.Color.HSVToRGB$1(h, s, v, true);
          color.a = MiniGameAdaptor.Mathf.Lerp(alphaMin, alphaMax, MiniGameAdaptor.Random.value);
          return color.$clone();
        },
        InitState: function InitState(seed) {
          throw new System.Exception("not impl");
        },
        //float [min, max]
        Range: function Range(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },
        //int [min, max)
        Range$1: function Range$1(min, max) {
          var r = Math.random(); // [0. 1)

          var d = max - min;
          r *= d;
          r += min;

          if (max - r < 0.0001) {
            return max;
          }

          if (r - min < 0.0001) {
            return min;
          }

          return r;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    }
  });
});

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var objMap = new WeakMap(); // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Object", {
    statics: {
      methods: {
        Destroy: function Destroy(obj) {
          MiniGameAdaptor.Object.Destroy$1(obj, 0);
        },
        Destroy$1: function Destroy$1(obj, t) {
          setTimeout(function () {
            if (obj instanceof MiniGameAdaptor.Component) {
              obj.entity ? obj.entity.removeComponent(obj) : obj = null;
            } else {
              obj.ref ? obj.ref.destroy() : obj = null;
            }
          }, t * 1000);
        },
        DestroyImmediate: function DestroyImmediate(obj) {
          MiniGameAdaptor.Object.Destroy$1(obj, 0);
        },
        DestroyImmediate$1: function DestroyImmediate$1(obj, allowDestroyingAssets) {
          throw new System.Exception("not impl");
        },
        DontDestroyOnLoad: function DontDestroyOnLoad(target) {
          throw new System.Exception("not impl");
        },
        FindObjectOfType: function FindObjectOfType(T) {
          throw new System.Exception("not impl");
        },
        FindObjectsOfType: function FindObjectsOfType(T) {
          throw new System.Exception("not impl");
        },
        Instantiate: function Instantiate(T, original) {
          return MiniGameAdaptor.Object.Instantiate$1(T, original, game.sceneRoot.transform._children[0]);
        },
        Instantiate$1: function Instantiate$1(T, original, parent) {
          return MiniGameAdaptor.Object.Instantiate$4(T, original, null, null, parent);
        },
        Instantiate$2: function Instantiate$2(T, original, parent, worldPositionStays) {
          return MiniGameAdaptor.Object.Instantiate$4(T, original, null, null, parent);
        },
        Instantiate$3: function Instantiate$3(T, original, position, rotation) {
          return MiniGameAdaptor.Object.Instantiate$4(T, original, position, rotation, game.sceneRoot.transform._children[0]);
        },
        Instantiate$4: function Instantiate$4(T, original, position, rotation, parent) {
          // 特殊处理对engine.Prefab进行instantiate的逻辑
          if (original instanceof engine.Prefab) {
            var _entity = original.instantiate();

            _entity.__prefab = original;

            if (!_entity.__clone) {
              _entity.name += "(Clone)";
              _entity.__clone = true;
            }

            parent.ref ? parent.ref.addChild(_entity.transform) : parent.addChild(_entity.transform);
            var go = MiniGameAdaptor.engineToAdaptorMap.get(_entity);
            if (position) go.transform.position = position;
            if (rotation) go.transform.rotation = rotation; // onInstantiated回调

            _entity.components.forEach(function (c) {
              if (c instanceof MiniGameAdaptor.Component && c["onInstantiated"]) {
                c["onInstantiated"]();
              }
            });

            if (T === MiniGameAdaptor.GameObject) {
              return go;
            } else {
              return go.GetComponent(T);
            }
          } else if (original instanceof T) {
            // 递归克隆entity及components
            var cloneEntityRecursive = function cloneEntityRecursive(_origin, _copy) {
              _origin.getAllComponents().forEach(function (component) {
                var comp = _copy.addComponent(component.constructor); // clone transform


                if (comp && comp instanceof engine.Transform3D) {
                  comp.position = engine.Vector3.createFromNumber(component.position.x, component.position.y, component.position.z);
                  comp.quaternion = engine.Quaternion.createFromNumber(component.quaternion.x, component.quaternion.y, component.quaternion.z, component.quaternion.w);
                  comp.scale = engine.Vector3.createFromNumber(component.scale.x, component.scale.y, component.scale.z);
                } // TODO:
                // 将原component上的值clone到新的component上

              });

              var _children = _origin.transform._children;
              var len = _children.length;
              if (len === 0) return;

              for (var i = 0; i < len; i++) {
                var _child = engine.Entity.createEntity3D(_children[i].entity.name);

                _copy.transform.addChild(_child.transform);

                cloneEntityRecursive(_children[i].entity, _child);
              }
            };

            if (T === MiniGameAdaptor.GameObject) {
              var origin = original.ref;

              if (origin.__prefab) {
                return MiniGameAdaptor.Object.Instantiate$4(T, origin.__prefab, position, rotation, parent);
              }

              var newRoot = engine.Entity.createEntity3D(origin.name + '(Clone)'); // let newRoot = engine.Entity.createEntity3D(origin.name);

              cloneEntityRecursive(origin, newRoot);
              parent.ref ? parent.ref.addChild(newRoot.transform) : parent.addChild(newRoot.transform); // onInstantiated回调

              entity.components.forEach(function (c) {
                if (c instanceof MiniGameAdaptor.Component && c["onInstantiated"]) {
                  c["onInstantiated"]();
                }
              });
              return MiniGameAdaptor.engineToAdaptorMap.get(newRoot);
            } else {
              var _origin2 = original.gameObject.ref;

              if (_origin2.__prefab) {
                return MiniGameAdaptor.Object.Instantiate$4(T, _origin2.__prefab, position, rotation, parent);
              }

              var _newRoot = engine.Entity.createEntity3D(_origin2.name + '(Clone)'); // let newRoot = engine.Entity.createEntity3D(origin.name);


              cloneEntityRecursive(_origin2, _newRoot);
              parent.ref ? parent.ref.addChild(_newRoot.transform) : parent.addChild(_newRoot.transform); // onInstantiated回调

              entity.components.forEach(function (c) {
                if (c instanceof MiniGameAdaptor.Component && c["onInstantiated"]) {
                  c["onInstantiated"]();
                }
              });
              return MiniGameAdaptor.engineToAdaptorMap.get(_newRoot).GetComponent(T);
            }
          }
        },
        Instantiate$5: function Instantiate$5(original) {
          throw new System.Exception("not impl");
        },
        Instantiate$6: function Instantiate$6(original, parent) {
          throw new System.Exception("not impl");
        },
        Instantiate$7: function Instantiate$7(original, parent, instantiateInWorldSpace) {
          throw new System.Exception("not impl");
        },
        Instantiate$8: function Instantiate$8(original, position, rotation) {
          throw new System.Exception("not impl");
        },
        Instantiate$9: function Instantiate$9(original, position, rotation, parent) {
          throw new System.Exception("not impl");
        },
        op_Equality: function op_Equality(x, y) {
          return x == y;
        },
        op_Implicit: function op_Implicit(exists) {
          return !!exists;
        },
        op_Inequality: function op_Inequality(x, y) {
          return x != y;
        }
      }
    },
    props: {
      hideFlags: {
        get: function get() {
          return this.__hideFlags;
        },
        set: function set(value) {
          this.__hideFlags = value;
        }
      },
      name: {
        get: function get() {
          return this.__name;
        },
        set: function set(value) {
          this.__name = value;
        }
      }
    },
    ctors: {
      ctor: function ctor(name) {
        this.$initialize();
        var _private = {};
        _private.uuid = uuidv4();
        objMap.set(this, _private);
        this.__hideFlags = 'None';
        this.__name = name ? name : '';
      }
    },
    methods: {
      equals: function equals(other) {
        return !!this === other;
      },
      getHashCode: function getHashCode() {
        return objMap.get(this).uuid;
      },
      GetInstanceID: function GetInstanceID() {
        return objMap.get(this).uuid;
      },
      toString: function toString() {
        return this.name;
      }
    }
  });
});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  function BroadcastMessage(result, ref, methodName, parameter) {
    ref.getAllComponents().forEach(function (item) {
      if (item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName]) {
        result.flag = true;

        if (parameter) {
          item[methodName](parameter);
        } else {
          item[methodName]();
        }
      }
    });
  }

  var hasBroadcastMessageReceiver = false;
  Bridge.define("MiniGameAdaptor.GameObject", {
    inherits: [MiniGameAdaptor.Object],
    fields: {
      ref: null,
      _transform: null,
      _layer: 0
    },
    statics: {
      methods: {
        CreatePrimitive: function CreatePrimitive(type) {
          throw new System.Exception("not impl");
        },
        Find: function Find(name) {
          var root = game.activeScene.root.transform;
          var result = null;
          root.travelChild(function (child) {
            if (child.entity.name === name) {
              result = MiniGameAdaptor.engineToAdaptorMap.get(child.entity);
              return;
            }
          });
          return result;
        },
        FindGameObjectsWithTag: function FindGameObjectsWithTag(tag) {
          throw new System.Exception("not impl");
        },
        FindGameObjectWithTag: function FindGameObjectWithTag(tag) {
          throw new System.Exception("not impl");
        },
        FindWithTag: function FindWithTag(tag) {
          throw new System.Exception("not impl");
        }
      }
    },
    props: {
      activeInHierarchy: {
        get: function get() {
          return this.ref.activeInHierarchy;
        }
      },
      activeSelf: {
        get: function get() {
          return this.ref.active;
        }
      },
      gameObject: {
        // TODO
        get: function get() {
          return this;
        }
      },
      isStatic: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      layer: {
        get: function get() {
          return this._layer;
        },
        set: function set(value) {
          this._layer = value;
        }
      },
      scene: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      tag: {
        get: function get() {
          return this.__tag;
        },
        set: function set(value) {
          this.__tag === value;
        }
      },
      transform: {
        get: function get() {
          return this._transform;
        }
      },
      name: {
        get: function get() {
          return this.ref.name;
        },
        set: function set(value) {
          this.ref.name = value;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        this.ref = engine.Entity.createEntity3D();
        MiniGameAdaptor.engineToAdaptorMap.set(this.ref, this);
        this.__tag = 'Untagged';
        this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
      },
      $ctor1: function $ctor1(name) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        this.ref = engine.Entity.createEntity3D(name);
        MiniGameAdaptor.engineToAdaptorMap.set(this.ref, this);
        this.__tag = 'Untagged';
        this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
      },
      $ctor2: function $ctor2(name, components) {
        if (components === void 0) {
          components = [];
        }

        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        this.ref = engine.Entity.createEntity3D(name);
        MiniGameAdaptor.engineToAdaptorMap.set(this.ref, this);
        this.__tag = 'Untagged';
        this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
      },
      $ctor3: function $ctor3(ref) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        this.ref = ref;
        this.__tag = 'Untagged';

        var __transform = this.ref.getComponent(MiniGameAdaptor.Transform);

        if (__transform) {
          this._transform = __transform;
        } else {
          this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
        }
      }
    },
    methods: {
      AddComponent: function AddComponent(T) {
        return this.ref.addComponent(T);
      },
      AddComponent$1: function AddComponent$1(componentType) {
        return this.ref.addComponent(componentType);
      },
      // alls the method named methodName on every MonoBehaviour in this game object or any of its children.
      _BroadcastMessage: function _BroadcastMessage(entity, methodName, parameter) {
        var _this = this;

        entity.getAllComponents().forEach(function (item) {
          if (item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName]) {
            hasBroadcastMessageReceiver = true;

            if (parameter) {
              item[methodName](parameter);
            } else {
              item[methodName]();
            }
          }
        });
        entity.transform.children.forEach(function (child) {
          child.entity.active && _this._BroadcastMessage(child.entity, methodName, parameter);
        });
      },
      BroadcastMessage: function BroadcastMessage(methodName) {
        hasBroadcastMessageReceiver = false;

        this._BroadcastMessage(this.ref, methodName);

        if (!hasBroadcastMessageReceiver) {
          console.error("BroadcastMessage ".concat(methodName, " has no receiver!"));
        }
      },
      BroadcastMessage$1: function BroadcastMessage$1(methodName, parameter) {
        hasBroadcastMessageReceiver = false;

        this._BroadcastMessage(this.ref, methodName, parameter);

        if (!hasBroadcastMessageReceiver) {
          console.error("BroadcastMessage ".concat(methodName, " has no receiver!"));
        }
      },
      BroadcastMessage$2: function BroadcastMessage$2(methodName, parameter, options) {
        hasBroadcastMessageReceiver = false;

        this._BroadcastMessage(this.ref, methodName, parameter);

        if (!hasBroadcastMessageReceiver && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver) {
          console.error("BroadcastMessage ".concat(methodName, " has no receiver!"));
        }
      },
      BroadcastMessage$3: function BroadcastMessage$3(methodName, options) {
        hasBroadcastMessageReceiver = false;

        this._BroadcastMessage(this.ref, methodName);

        if (!hasBroadcastMessageReceiver && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver) {
          console.error("BroadcastMessage ".concat(methodName, " has no receiver!"));
        }
      },
      CompareTag: function CompareTag(tag) {
        throw new System.Exception("not impl");
      },
      GetComponent: function GetComponent(T) {
        return this.ref.getComponent(T);
      },
      GetComponent$1: function GetComponent$1(type) {
        return this.ref.getComponent(type);
      },
      // dfs
      _GetComponentInChildrenRecursively: function _GetComponentInChildrenRecursively(children, T, includeInactive) {
        if (!children) return null;

        for (var i = 0; i < children.length; i++) {
          if (!includeInactive && !children[i].entity.active) {
            continue;
          }

          if (children[i]._children) {
            var _comp = this._GetComponentInChildrenRecursively(children[i]._children, T, includeInactive);

            if (_comp) return _comp;
          }

          var comp = children[i].entity.getComponent(T);
          if (comp) return comp;
        }
      },
      // Returns the component of Type type in the GameObject or any of its children using depth first search.
      GetComponentInChildren: function GetComponentInChildren(T) {
        return this.GetComponentInChildren$1(T, false);
      },
      GetComponentInChildren$1: function GetComponentInChildren$1(T, includeInactive) {
        var selfComp = this.ref.getComponent(T);

        if (selfComp) {
          return selfComp;
        }

        return this._GetComponentInChildrenRecursively(this.ref.transform._children, T, includeInactive);
      },
      _GetComponentInParentRecursively: function _GetComponentInParentRecursively(transform, T) {
        if (!transform) return null;
        var c = transform.entity.getComponent(T);
        if (c) return c;
        return this._GetComponentInParentRecursively(transform.parent, T);
      },
      GetComponentInParent: function GetComponentInParent(T) {
        return this._GetComponentInParentRecursively(this.ref.transform, T);
      },
      GetComponents: function GetComponents(T) {
        return this.ref.getComponents(T);
      },
      GetComponentsInChildren: function GetComponentsInChildren(T) {
        return this.GetComponentsInChildren$1(T, false);
      },
      GetComponentsInChildren$1: function GetComponentsInChildren$1(T, includeInactive) {
        var comps = [];
        this.ref.transform.travelChild(function (child) {
          if (!includeInactive && !child.entity.active) return;
          var comp = child.entity.getComponent(T);
          if (comp) comps.push(comp);
        });
        return comps;
      },
      GetComponentsInChildren$3: function GetComponentsInChildren$3(T, lst) {
        var comps = this.GetComponentsInChildren$1(T, true);
        lst.AddRange(comps);
        return comps;
      },
      GetComponentsInParent: function GetComponentsInParent(T) {
        return this.GetComponentsInParent$1(T, false);
      },
      GetComponentsInParent$1: function GetComponentsInParent$1(T, includeInactive) {
        var comps = [];
        var selfComp = this.ref.getComponent(T);

        if (selfComp) {
          comps.push(selfComp);
        }

        var transform = this.ref.transform;

        while (transform && transform.entity.name !== game.activeScene.root.name) {
          if (!includeInactive && !transform.entity.active) return comps;
          var comp = transform.entity.getComponent(T);
          if (comp) comps.push(comp);
          transform = transform.parent;
        }

        return comps;
      },
      SendMessage: function SendMessage(methodName) {
        var flag = false;
        this.ref.getAllComponents().forEach(function (item) {
          if (item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName]) {
            flag = true;
            item[methodName]();
          }
        });

        if (!flag) {
          console.error("SendMessage ".concat(methodName, " has no receiver!"));
        }
      },
      SendMessage$1: function SendMessage$1(methodName, value) {
        var flag = false;
        this.ref.getAllComponents().forEach(function (item) {
          if (item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName]) {
            flag = true;
            item[methodName](value);
          }
        });

        if (!flag) {
          console.error("SendMessage ".concat(methodName, " has no receiver!"));
        }
      },
      SendMessage$2: function SendMessage$2(methodName, value, options) {
        var flag = false;
        this.ref.getAllComponents().forEach(function (item) {
          if (item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName]) {
            flag = true;
            item[methodName](value);
          }
        });

        if (!flag && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver) {
          console.error("SendMessage ".concat(methodName, " has no receiver!"));
        }
      },
      SendMessage$3: function SendMessage$3(methodName, options) {
        var flag = false;
        this.ref.getAllComponents().forEach(function (item) {
          if (item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName]) {
            flag = true;
            item[methodName]();
          }
        });

        if (!flag && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver) {
          console.error("SendMessage ".concat(methodName, " has no receiver!"));
        }
      },
      SendMessageUpwards: function SendMessageUpwards(methodName) {
        throw new System.Exception("not impl");
      },
      SendMessageUpwards$1: function SendMessageUpwards$1(methodName, value) {
        throw new System.Exception("not impl");
      },
      SendMessageUpwards$2: function SendMessageUpwards$2(methodName, value, options) {
        throw new System.Exception("not impl");
      },
      SendMessageUpwards$3: function SendMessageUpwards$3(methodName, options) {
        throw new System.Exception("not impl");
      },
      SetActive: function SetActive(value) {
        // console.log(this.ref.name + ' active: ' + value);
        this.ref.active = value;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.GameObject')(MiniGameAdaptor.GameObject);
Object.defineProperty(MiniGameAdaptor.GameObject.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.GameObject.prototype.__properties)
});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Component", {
    inherits: [engine.Script],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          if (data.ref !== null && data.ref !== undefined && typeof data.ref === 'number') {
            comp.ref = builtContext.components.data[data.ref];
          } else if (typeof data === 'number') {
            comp.ref = builtContext.components.data[data];
          }

          return comp;
        }
      }
    },
    props: {
      gameObject: {
        get: function get() {
          return MiniGameAdaptor.engineToAdaptorMap.get(this.entity ? this.entity : this.ref.entity);
        }
      },
      tag: {
        get: function get() {
          return this.gameObject.tag;
        },
        set: function set(value) {
          this.gameObject.tag = value;
        }
      },
      transform: {
        get: function get() {
          return this.gameObject.transform;
        }
      },
      name: {
        get: function get() {
          return this.entity ? this.entity.name : this.ref.entity.name;
        },
        set: function set(value) {
          this.entity ? this.entity.name = value : this.ref.entity.name = value;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize(); // MiniGameAdaptor.Object.ctor.call(this);

        engine.Script.call(this);
      }
    },
    methods: {
      BroadcastMessage: function BroadcastMessage(methodName) {
        this.gameObject.BroadcastMessage(methodName);
      },
      BroadcastMessage$1: function BroadcastMessage$1(methodName, parameter) {
        this.gameObject.BroadcastMessage$1(methodName, parameter);
      },
      BroadcastMessage$2: function BroadcastMessage$2(methodName, parameter, options) {
        this.gameObject.BroadcastMessage$2(methodName, parameter, options);
      },
      BroadcastMessage$3: function BroadcastMessage$3(methodName, options) {
        this.gameObject.BroadcastMessage$3(methodName, options);
      },
      CompareTag: function CompareTag(tag) {
        return this.tag === tag;
      },
      GetComponent: function GetComponent(T) {
        return this.gameObject.GetComponent(T);
      },
      GetComponent$1: function GetComponent$1(type) {
        return this.gameObject.GetComponent$1(T);
      },
      GetComponentInChildren: function GetComponentInChildren(T) {
        return this.gameObject.GetComponentInChildren(T);
      },
      GetComponentInChildren$1: function GetComponentInChildren$1(T, includeInactive) {
        return this.gameObject.GetComponentInChildren$1(T, includeInactive);
      },
      GetComponentInParent: function GetComponentInParent(T) {
        return this.gameObject.GetComponentInParent(T);
      },
      GetComponents: function GetComponents(T) {
        return this.gameObject.GetComponents(T);
      },
      GetComponentsInChildren: function GetComponentsInChildren(T) {
        return this.gameObject.GetComponentsInChildren(T);
      },
      GetComponentsInChildren$1: function GetComponentsInChildren$1(T, includeInactive) {
        return this.gameObject.GetComponentsInChildren$1(T, includeInactive);
      },
      GetComponentsInParent: function GetComponentsInParent(T) {
        return this.gameObject.GetComponentsInParent(T);
      },
      GetComponentsInParent$1: function GetComponentsInParent$1(T, includeInactive) {
        return this.gameObject.GetComponentsInParent$1(T, includeInactive);
      },
      SendMessage: function SendMessage(methodName) {
        this.gameObject.SendMessage(methodName);
      },
      SendMessage$1: function SendMessage$1(methodName, value) {
        this.gameObject.SendMessage$1(methodName, value);
      },
      SendMessage$2: function SendMessage$2(methodName, value, options) {
        this.gameObject.SendMessage$2(methodName, value, options);
      },
      SendMessage$3: function SendMessage$3(methodName, options) {
        this.gameObject.SendMessage$3(methodName, options);
      },
      SendMessageUpwards: function SendMessageUpwards(methodName) {
        throw new System.Exception("not impl");
      },
      SendMessageUpwards$1: function SendMessageUpwards$1(methodName, value) {
        throw new System.Exception("not impl");
      },
      SendMessageUpwards$2: function SendMessageUpwards$2(methodName, value, options) {
        throw new System.Exception("not impl");
      },
      SendMessageUpwards$3: function SendMessageUpwards$3(methodName, options) {
        throw new System.Exception("not impl");
      } // prefab实例化完成后的回调
      // 直接在子类中定义，此处仅作注解，避免浪费性能
      // onInstantiated: function () {
      // }

    }
  });
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Transform", {
    inherits: [MiniGameAdaptor.Component, System.Collections.IEnumerable],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        }
      }
    },
    fields: {
      ref: null,
      _localPosition: null,
      _worldPosition: null,
      _localScale: null,
      _localEuler: null,
      _worldEuler: null,
      _localRotation: null,
      _worldRotation: null,
      _hasChanged: true
    },
    ctors: {
      ctor: function ctor(transform) {
        if (transform instanceof engine.Transform3D) {
          this.ref = transform;
        } else if (transform instanceof engine.Entity) {
          this.ref = transform.transform;
        }

        MiniGameAdaptor.Component.ctor.call(this); // if (this.ref) {
        //     this._localPosition = new MiniGameAdaptor.Vector3.$ctor3(transform.position);
        //     this._worldPosition = new MiniGameAdaptor.Vector3.$ctor3(transform.worldPosition);
        //     this._localScale = new MiniGameAdaptor.Vector3.$ctor3(transform.scale);
        //     this._worldScale = new MiniGameAdaptor.Vector3.$ctor3(transform.worldScale);
        //     this._localEuler = new MiniGameAdaptor.Vector3.$ctor3(transform.euler);
        //     this._worldEuler = new MiniGameAdaptor.Vector3.$ctor3(transform.worldEuler);
        //     this._localRotation = new MiniGameAdaptor.Quaternion.$ctor2(transform.quaternion);
        //     this._worldRotation = new MiniGameAdaptor.Quaternion.$ctor2(transform.worldQuaternion);
        // }
      }
    },
    props: {
      childCount: {
        get: function get() {
          return this.ref.childrenCount;
        }
      },
      eulerAngles: {
        get: function get() {
          // this.ref.worldEuler 好像有问题
          return new MiniGameAdaptor.Vector3.$ctor4(this.ref.euler)._Rad2Deg()._FlipX();
        },
        set: function set(value) {
          if (!value) {
            return;
          }

          this.rotation = MiniGameAdaptor.Quaternion.Euler$1(value);

          if (!this.hasChanged) {
            this.hasChanged = true;
          }
        }
      },
      forward: {
        get: function get() {
          return this.TransformDirection$1(MiniGameAdaptor.Vector3.forward); // return MiniGameAdaptor.Quaternion.op_Multiply$1(this.rotation, MiniGameAdaptor.Vector3.forward).normalized;
          // return new MiniGameAdaptor.Vector3.$ctor4(this.ref.forward)._FlipX();
        },
        set: function set(value) {
          this.rotation = MiniGameAdaptor.Quaternion.LookRotation(value);
        }
      },
      right: {
        get: function get() {
          return MiniGameAdaptor.Quaternion.op_Multiply$1(this.rotation, MiniGameAdaptor.Vector3.right).normalized; // return this.TransformDirection$1(MiniGameAdaptor.Vector3.right);
          // return new MiniGameAdaptor.Vector3.$ctor4(this.ref.right)._FlipX();
        },
        set: function set(value) {
          this.rotation = MiniGameAdaptor.Quaternion.FromToRotation(MiniGameAdaptor.Vector3.right, value);
        }
      },
      up: {
        get: function get() {
          return this.TransformDirection$1(MiniGameAdaptor.Vector3.up); // return MiniGameAdaptor.Quaternion.op_Multiply$1(this.rotation, MiniGameAdaptor.Vector3.up).normalized;
          // return new MiniGameAdaptor.Vector3.$ctor4(this.ref.up)._FlipX();
        },
        set: function set(value) {
          this.rotation = MiniGameAdaptor.Quaternion.FromToRotation(MiniGameAdaptor.Vector3.up, value);
        }
      },
      hasChanged: {
        get: function get() {
          return this._hasChanged;
        },
        set: function set(value) {
          this._hasChanged = value;
        }
      },
      hierarchyCapacity: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      hierarchyCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      localEulerAngles: {
        get: function get() {
          return new MiniGameAdaptor.Vector3.$ctor4(this.ref.euler)._FlipX()._Rad2Deg();
        },
        set: function set(value) {
          if (!value) {
            return;
          }

          value = value.$clone()._Deg2Rad()._FlipX();
          this.ref.euler = value.ref;

          if (!this.hasChanged) {
            this.hasChanged = true;
          } // 有物理刚体的情况同步旋转到物理引擎


          if (this.gameObject.nativeRigidBody) {
            _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncRotation(this.gameObject.ref, this.gameObject.nativeRigidBody);
          }
        }
      },
      localPosition: {
        get: function get() {
          return new MiniGameAdaptor.Vector3.$ctor4(this.ref.position)._FlipX();
        },
        set: function set(value) {
          // if (this.ref && this.ref.entity.name == "_Prefabs/Base/TRGameCamera") {
          //     console.log(this.ref.entity.name + " ==> " + value);
          //     if (Number.isNaN(value.x)) {
          //         console.log('!!!');
          //     }
          // }
          this.ref.position = value.$clone()._FlipX().ref;

          if (!this.hasChanged) {
            this.hasChanged = true;
          } // 如果gameObject存在物理刚体，需要将位置同步过去


          if (this.gameObject.nativeRigidBody) {
            _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncPosition(this.gameObject.ref, this.gameObject.nativeRigidBody);
          }
        }
      },
      localRotation: {
        get: function get() {
          return new MiniGameAdaptor.Quaternion.$ctor3(this.ref.quaternion)._FlipXnW();
        },
        set: function set(value) {
          this.ref.quaternion = value.$clone()._FlipXnW().ref;

          if (!this.hasChanged) {
            this.hasChanged = true;
          } // 有物理刚体的情况同步旋转到物理引擎


          if (this.gameObject.nativeRigidBody) {
            _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncRotation(this.gameObject.ref, this.gameObject.nativeRigidBody);
          }
        }
      },
      localScale: {
        get: function get() {
          if (!this._localScale) {
            this._localScale = new MiniGameAdaptor.Vector3.$ctor3(this.ref.scale);
          }

          return this._localScale;
        },
        set: function set(value) {
          this.ref.scale = value.ref;

          if (!this.hasChanged) {
            this.hasChanged = true;
          } // TODO for physx

        }
      },
      localToWorldMatrix: {
        get: function get() {
          return new MiniGameAdaptor.Matrix4x4.$ctor3(this.ref.worldMatrix);
        },
        set: function set() {
          console.error("localToWorldMatrix readonly");
        }
      },
      lossyScale: {
        get: function get() {
          if (!this._worldScale) {
            this._worldScale = new MiniGameAdaptor.Vector3.$ctor3(this.ref.worldScale);
          }

          return this._worldScale;
        },
        set: function set() {
          console.error("lossyScale readonly");
        }
      },
      parent: {
        get: function get() {
          return MiniGameAdaptor.engineToAdaptorMap.get(this.ref.parent.entity).transform;
        },
        set: function set(value) {
          this.SetParent(value); // 如果gameObject存在物理刚体，需要将位置同步过去

          if (this.gameObject.nativeRigidBody) {
            _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncPosition(this.gameObject.ref, this.gameObject.nativeRigidBody);
            _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncRotation(this.gameObject.ref, this.gameObject.nativeRigidBody);
          }
        }
      },
      position: {
        get: function get() {
          return new MiniGameAdaptor.Vector3.$ctor4(this.ref.worldPosition)._FlipX();
        },
        set: function set(value) {
          var m;

          if (this.ref.parent) {
            m = this.ref.parent.worldMatrix.inverse();
          } else {
            m = this.ref.worldMatrix.inverse();
          }

          var local = m.transformPoint(value._FlipX().ref);
          this.ref.position = local;

          if (!this.hasChanged) {
            this.hasChanged = true;
          } // 如果gameObject存在物理刚体，需要将位置同步过去


          if (this.gameObject.nativeRigidBody) {
            _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncPosition(this.gameObject.ref, this.gameObject.nativeRigidBody);
          }
        }
      },
      root: {
        get: function get() {
          var r = game.sceneRoot.transform._children[0];
          var p = this.parent;
          var old = this;

          while (p.ref !== r) {
            old = p;
            p = p.parent;
          }

          return old;
        }
      },
      rotation: {
        get: function get() {
          return new MiniGameAdaptor.Quaternion.$ctor3(this.ref.worldQuaternion)._FlipXnW();
        },
        set: function set(value) {
          if (!value) {
            return;
          }

          var local = this._worldQuaternionToLocal(value);

          this.ref.quaternion = local._FlipXnW().ref;

          if (!this.hasChanged) {
            this.hasChanged = true;
          } // 如果gameObject存在物理刚体，需要将位置同步过去


          if (this.gameObject.nativeRigidBody) {
            _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncRotation(this.gameObject.ref, this.gameObject.nativeRigidBody);
          }
        }
      },
      worldToLocalMatrix: {
        get: function get() {
          return this.localToWorldMatrix.inverse;
        },
        set: function set() {
          console.error("worldToLocalMatrix readonly");
        }
      }
    },
    methods: {
      // copied instance of worldSpaceRotation
      _worldQuaternionToLocal: function _worldQuaternionToLocal(worldSpaceRotation) {
        if (!worldSpaceRotation) {
          throw new Error("_worldQuaternionToLocal parameter is nil.");
        }

        var parent = this.parent;

        if (!parent) {
          return worldSpaceRotation.$clone();
        }

        var inverse = MiniGameAdaptor.Quaternion.Inverse(parent.rotation);
        return MiniGameAdaptor.Quaternion.op_Multiply(inverse, worldSpaceRotation);
      },
      DetachChildren: function DetachChildren() {
        var root = game.sceneRoot.transform._children[0];

        for (var index = 0; index < this.ref.childrenCount; index++) {
          var t = MiniGameAdaptor.engineToAdaptorMap.get(this.ref._children[index].entity).transform;
          t.SetParent(root);
        }
      },
      Find: function Find(n) {
        var result = this.ref.findChildByName(n);

        if (result) {
          return MiniGameAdaptor.engineToAdaptorMap.get(result.entity).transform;
        }

        return null;
      },
      GetChild: function GetChild(index) {
        var go = MiniGameAdaptor.engineToAdaptorMap.get(this.ref._children[index].entity);

        if (go) {
          return go.transform;
        }

        return null;
      },
      GetEnumerator: function GetEnumerator() {
        throw new System.Exception("not impl");
      },
      System$Collections$IEnumerable$GetEnumerator: function System$Collections$IEnumerable$GetEnumerator() {
        throw new System.Exception("Exception");
      },
      GetSiblingIndex: function GetSiblingIndex() {
        return this.ref.getSiblingIndex();
      },
      InverseTransformDirection: function InverseTransformDirection(x, y, z) {
        return this.InverseTransformDirection$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
      },
      InverseTransformDirection$1: function InverseTransformDirection$1(direction) {
        // let m = this.worldToLocalMatrix;
        // let dir = m.MultiplyVector(direction);
        // var scale = dir.magnitude / direction.magnitude;
        // return MiniGameAdaptor.Vector3.op_Division(dir, scale);
        var m = this.ref.worldMatrix.inverse();
        return new MiniGameAdaptor.Vector3.$ctor4(m.transformDirection(direction._FlipX().ref))._FlipX();
      },
      InverseTransformPoint: function InverseTransformPoint(x, y, z) {
        return this.InverseTransformPoint$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
      },
      InverseTransformPoint$1: function InverseTransformPoint$1(position) {
        // let m = this.worldToLocalMatrix;
        // return m.MultiplyPoint(position);
        var m = this.ref.worldMatrix.inverse();
        return new MiniGameAdaptor.Vector3.$ctor4(m.transformPoint(position._FlipX().ref))._FlipX();
      },
      InverseTransformVector: function InverseTransformVector(x, y, z) {
        return this.InverseTransformVector$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
      },
      InverseTransformVector$1: function InverseTransformVector$1(vector) {
        // let m = this.worldToLocalMatrix;
        // return m.MultiplyVector(vector);
        var m = this.ref.worldMatrix.inverse();
        return new MiniGameAdaptor.Vector3.$ctor4(m.transformVector(vector._FlipX().ref))._FlipX();
      },
      IsChildOf: function IsChildOf(parent) {
        var _this = this;

        var result = false;

        parent.ref._children.forEach(function (child) {
          if (_this.ref === child) {
            result = true;
            return;
          }
        });

        return result;
      },
      LookAt: function LookAt(target) {
        this.LookAt$1(target, MiniGameAdaptor.Vector3.up);
      },
      LookAt$1: function LookAt$1(target, worldUp) {
        if (target) {
          this.LookAt$3(target.position, worldUp);
        }
      },
      LookAt$2: function LookAt$2(worldPosition) {
        this.rotation = MiniGameAdaptor.Quaternion.LookRotation(MiniGameAdaptor.Vector3.op_Subtraction(worldPosition, this.position), MiniGameAdaptor.Vector3.up);
      },
      LookAt$3: function LookAt$3(worldPosition, worldUp) {
        this.rotation = MiniGameAdaptor.Quaternion.LookRotation(MiniGameAdaptor.Vector3.op_Subtraction(worldPosition, this.position), worldUp);
      },
      Rotate: function Rotate(xAngle, yAngle, zAngle) {
        this.Rotate$1(xAngle, yAngle, zAngle, MiniGameAdaptor.Space.Self);
      },
      Rotate$1: function Rotate$1(xAngle, yAngle, zAngle, relativeTo) {
        this.Rotate$5(new MiniGameAdaptor.Vector3.$ctor2(xAngle, yAngle, zAngle), relativeTo);
      },
      Rotate$2: function Rotate$2(eulers) {
        this.Rotate$5(eulers, MiniGameAdaptor.Space.Self);
      },
      Rotate$3: function Rotate$3(axis, angle) {
        this.Rotate$4(axis, angle, MiniGameAdaptor.Space.Self);
      },
      Rotate$4: function Rotate$4(axis, angle, relativeTo) {
        if (relativeTo === MiniGameAdaptor.Space.Self) {
          this.__RotateAround$1(this.TransformDirection$1(axis), angle * MiniGameAdaptor.Mathf.Deg2Rad);
        } else {
          this.__RotateAround$1(axis, angle * MiniGameAdaptor.Mathf.Deg2Rad);
        }
      },
      Rotate$5: function Rotate$5(eulers, relativeTo) {
        var rhs = MiniGameAdaptor.Quaternion.Euler$1(eulers);

        if (relativeTo === MiniGameAdaptor.Space.Self) {
          this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, rhs);
        } else {
          // rotation = rotation * (Quaternion.Inverse(rotation) * eulerRot * rotation);
          this.rotation = MiniGameAdaptor.Quaternion.op_Multiply(this.rotation, MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(this.rotation), rhs), this.rotation)); // this.rotation = MiniGameAdaptor.Quaternion.op_Multiply(this.rotation, MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(this.rotation), rhs), this.rotation));
          // var tmp = MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(this.rotation), rhs), this.rotation);
          // if(!this.parent) {
          //     this.localRotation = tmp;
          // } else {
          //     this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.parent.localRotation, this.localRotation);
          // }
          // this.ref.rotate(eulers.ref, true, true);
        }
      },
      RotateAround: function RotateAround(point, axis, angle) {
        // MiniGameAdaptor.Debug.Log("A: " + point.ToString(10) + " " + axis.ToString(10) + " " + angle);
        var pos = this.position; // let pos = this.localPosition;

        var rot = MiniGameAdaptor.Quaternion.AngleAxis(angle, axis); // let pos = this.localPosition;

        var dir = MiniGameAdaptor.Vector3.op_Subtraction(pos, point);
        dir = MiniGameAdaptor.Quaternion.op_Multiply$1(rot, dir); // MiniGameAdaptor.Debug.Log("B: " + pos.ToString(10) + " " + rot.ToString(10) + " " + dir.ToString(10));

        this.position = MiniGameAdaptor.Vector3.op_Addition(point, dir); // MiniGameAdaptor.Debug.Log("C: " + this.position.ToString(10));
        // this.localPosition = MiniGameAdaptor.Vector3.op_Addition(point, dir);

        this.__RotateAround(rot);
      },
      __RotateAround$1: function __RotateAround$1(axis, angle) {
        var local = this.InverseTransformDirection$1(axis);

        var q = MiniGameAdaptor.Quaternion.__axisAngle2Quat(local, angle);

        this.localRotation = MiniGameAdaptor.Quaternion.Normalize(MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, q));
      },
      __RotateAround: function __RotateAround(rot) {
        var myRot = this.rotation; // let myRot = this.localRotation;
        // MiniGameAdaptor.Debug.Log("D: " + this.rotation.ToString(10));
        // Quaternion.Inverse(myRot) * rot * myRot

        var a = MiniGameAdaptor.Quaternion.Inverse(myRot);
        var b = MiniGameAdaptor.Quaternion.op_Multiply(a, rot);
        var res = MiniGameAdaptor.Quaternion.op_Multiply(b, myRot); // console.log("res: " + a.ToString(10) + " " + b.ToString(10) + " " + c.ToString(10));
        // let res = MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.op_Multiply(MiniGameAdaptor.Quaternion.Inverse(myRot), rot), myRot);
        // MiniGameAdaptor.Debug.Log("E: " + res.ToString(10));

        this.rotation = MiniGameAdaptor.Quaternion.op_Multiply(this.rotation, res); // this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, res);
        // MiniGameAdaptor.Debug.Log("F: " + this.rotation.ToString(10));
        // this.localRotation = MiniGameAdaptor.Quaternion.op_Multiply(this.localRotation, res);
      },
      SetAsFirstSibling: function SetAsFirstSibling() {
        this.SetSiblingIndex(0);
      },
      SetAsLastSibling: function SetAsLastSibling() {
        this.SetSiblingIndex(this.ref.parent._children.length - 1);
      },
      SetParent: function SetParent(p) {
        this.SetParent$1(p, true);
      },
      SetParent$1: function SetParent$1(parent, worldPositionStays) {
        // set one's parent to null means set its parent to the root
        if (parent === null) {
          this.ref.parent.removeChild(this.ref);

          game.sceneRoot.transform._children[0].addChild(this.ref);

          return;
        }

        if (!worldPositionStays) {
          this.position.x += parent.position.x;
          this.position.y += parent.position.y;
          this.position.z += parent.position.z;
        }

        this.ref.parent.removeChild(this.ref);
        parent.ref.addChild(this.ref);
      },
      SetPositionAndRotation: function SetPositionAndRotation(position, rotation) {
        // this.localPosition = position;
        // this.worldPosition = position;
        // this.rotation = rotation;
        // this.localRotation = rotation;
        this.position = position;
        this.rotation = rotation;
      },
      SetSiblingIndex: function SetSiblingIndex(index) {
        this.ref.setSiblingIndex(index);
      },
      TransformDirection: function TransformDirection(x, y, z) {
        return this.TransformDirection$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
      },
      TransformDirection$1: function TransformDirection$1(direction) {
        // let m = this.localToWorldMatrix;
        // let dir = m.MultiplyVector(direction);
        // var scale = direction.magnitude !== 0 ? dir.magnitude / direction.magnitude : 0;
        // return MiniGameAdaptor.Vector3.op_Division(dir, scale);
        var m = this.ref.worldMatrix;
        return new MiniGameAdaptor.Vector3.$ctor4(m.transformDirection(direction._FlipX().ref))._FlipX();
      },
      TransformPoint: function TransformPoint(x, y, z) {
        return this.TransformPoint$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
      },
      TransformPoint$1: function TransformPoint$1(position) {
        // let m = this.localToWorldMatrix;
        var m = this.ref.worldMatrix;
        return new MiniGameAdaptor.Vector3.$ctor4(m.transformPoint(position._FlipX().ref))._FlipX(); // return m.MultiplyPoint(position);
      },
      TransformVector: function TransformVector(x, y, z) {
        return this.TransformVector$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
      },
      TransformVector$1: function TransformVector$1(vector) {
        // let m = this.localToWorldMatrix;
        var m = this.ref.worldMatrix;
        return new MiniGameAdaptor.Vector3.$ctor4(m.transformVector(vector._FlipX().ref))._FlipX(); // return m.MultiplyVector(vector);
      },
      Translate: function Translate(x, y, z) {
        this.Translate$1(x, y, z, MiniGameAdaptor.Space.Self);
      },
      Translate$1: function Translate$1(x, y, z, relativeTo) {
        this.Translate$4(new MiniGameAdaptor.Vector3.$ctor2(x, y, z), relativeTo);
      },
      Translate$2: function Translate$2(x, y, z, relativeTo) {
        this.Translate$5(new MiniGameAdaptor.Vector3.$ctor2(x, y, z), relativeTo);
      },
      Translate$3: function Translate$3(translation) {
        this.Translate$4(translation, MiniGameAdaptor.Space.Self);
      },
      // typeof(relativeTo) == MiniGameAdaptor.Space
      Translate$4: function Translate$4(translation, relativeTo) {
        if (relativeTo === MiniGameAdaptor.Space.World) {
          this.position = MiniGameAdaptor.Vector3.op_Addition(this.position, translation);
        } else {
          this.position = MiniGameAdaptor.Vector3.op_Addition(this.position, this.TransformDirection$1(translation)); // this.localPosition = MiniGameAdaptor.Vector3.op_Addition(this.localPosition, translation);
        }
      },
      // typeof(relativeTo) == MiniGameAdaptor.Transform
      Translate$5: function Translate$5(translation, relativeTo) {
        // relativeTo is null means relativeTo World
        if (!relativeTo) {
          this.position = MiniGameAdaptor.Vector3.op_Addition(this.position, translation);
        } else {
          this.position = MiniGameAdaptor.Vector3.op_Addition(relativeTo.position, relativeTo.TransformDirection$1(translation)); // this.localPosition = MiniGameAdaptor.Vector3.op_Addition(this.localPosition, translation);
        }
      },
      $clone: function $clone(to) {
        throw new Error("Transform should not be cloned!"); // var s = to || new MiniGameAdaptor.Transform();
        // s.x = this.x;
        // s.y = this.y;
        // s.z = this.z;
        // return s;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Transform')(MiniGameAdaptor.Transform);
Object.defineProperty(MiniGameAdaptor.Transform.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Transform.prototype.__properties)
}); // MiniGameAdaptor.Transform.prototype.__properties.ref = { type: "Transform3D" };

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Phys3D", function() { return Phys3D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "physx", function() { return physx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindEventForCollider", function() { return bindEventForCollider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nativeColliderToAdaptorColliderMap", function() { return nativeColliderToAdaptorColliderMap; });
/* harmony import */ var _Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Phys3D;


try {
  if (typeof NativeGlobal !== 'undefined' && NativeGlobal.Phys3D) {
    Phys3D = NativeGlobal.Phys3D;
  } else if (__global && __global.require && __global.require('physicsEngine')) {
    Phys3D = __global.require('physicsEngine').Phys3D;
  }

  console.log('Phys3D', Phys3D);
} catch (e) {
  console.log('load Phys3D error', e);
}

var Physx = /*#__PURE__*/function () {
  function Physx() {
    _classCallCheck(this, Physx);

    try {
      if (!Phys3D) {
        console.error('当前环境不支持原生物理引擎，某些组件表现可能不符合预期');
        return;
      }

      if (window.physicsConfig) {
        console.log('当前已开启pvd调试模式：', window.physicsConfig);
      }

      this.Phys3dInstance = new Phys3D.PhysSystem(window.physicsConfig);
      console.log('Phys3dInstance', this.Phys3dInstance);
    } catch (e) {
      console.log(e);
    }

    this.rigidbodies = [];
    this.requestId = null;
    this.loopFunc = this.loop.bind(this);
    this.vec = new engine.Vector3();
  }

  _createClass(Physx, [{
    key: "addBody",
    value: function addBody(body) {
      this.rigidbodies.push(body);
    }
  }, {
    key: "addStaticBodyForCollider",
    value: function addStaticBodyForCollider(comp) {
      var entity = comp.entity;
      var pos = entity.transform.worldPosition;
      comp.rigidBody = new Phys3D.StaticRigidbody(physx.Phys3dInstance);
      comp.rigidBody.position = new Phys3D.RawVec3f(pos.x, pos.y, pos.z);
      comp.rigidBody.__sourceComp = comp;
      comp.nativeCollider.attachedRigidbody = comp.rigidBody;
      comp.gameObject.nativeRigidBody = comp.rigidBody; // 静态刚体不需要关心位置和旋转反向同步问题，所以不需要添加到遍历数组

      /*physx.addBody(comp.rigidBody)*/

      var quaternion = entity.transform.worldQuaternion;
      var RawQuaternion = new Phys3D.RawQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
      comp.rigidBody.rotation = RawQuaternion;
    }
    /**
     * 不管是刚体初始化还是后续通过API手动改变刚体的旋转，都需要将旋转结果同步到物理引擎
     */

  }, {
    key: "syncRotation",
    value: function syncRotation(entity, body) {
      var quaternion = entity.transform.worldQuaternion;
      body.rotation = new Phys3D.RawQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
    /**
     * 不管是刚体初始化还是后续通过API手动改变刚体的旋转，都需要将位置同步到物理引擎
     */

  }, {
    key: "syncPosition",
    value: function syncPosition(entity, body) {
      var pos = entity.transform.worldPosition;
      body.position = new Phys3D.RawVec3f(pos.x, pos.y, pos.z);
    }
  }, {
    key: "setEntityPosition",
    value: function setEntityPosition(entity, pos) {
      var tran = entity.transform;
      var m;

      if (tran.parent) {
        m = tran.parent.worldMatrix.inverse();
      } else {
        m = tran.worldMatrix.inverse();
      }

      this.vec.x = pos.x;
      this.vec.y = pos.y;
      this.vec.z = pos.z;
      m.transformPoint(this.vec, tran.position);
    }
  }, {
    key: "simulate",
    value: function simulate(dt) {
      var start = new Date();
      this.Phys3dInstance.Simulate(dt);
      var sim = new Date() - start;

      if (sim > 4) {
        console.warn('simulate update cost  for a long time: ', sim);
      }

      start = new Date();
      var len = this.rigidbodies.length;

      for (var i = 0; i < this.rigidbodies.length; i++) {
        var body = this.rigidbodies[i];
        var comp = body.__sourceComp;
        var entity = comp.entity;
        var pos = body.position;
        var rotation = body.rotation;

        if (entity) {
          // 如果实体销毁了，去除刚体引用，随GC自动释放
          if (entity.isDestroyed) {
            console.log('entity isDestroyed');
            this.rigidbodies.splice(i, 1);
            i--;
          } else {
            /**
             * 物理引擎的适配要特别注意坐标系的换算
             * 微信引擎和physx都是右手坐标系，而adaptor(Unity)是左手坐标系
             * 如果需要从adaptor向physx设置坐标，有两种情况:
             * 一种是直接取entity的坐标，因为坐标系一致，直接透传
             * 一种是取adaptor的坐标，坐标系要取反，即x取反，如果是旋转的情况，x/w都要取反(从physx到adaptor同理）
             *
             * 为了可维护性，约定采取第一种方式，entity和physx进行交互，避免不必要的坐标换算
             * 需要特别注意的是，adaptor的每个成员方法就不可避免要进行一个坐标换算再透传给physx了，比如：
             *
             * const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
             * this.nativeRigidBody.AddForce(RawVec3f, MiniGameAdaptor.ForceMode.Force)
             */
            this.setEntityPosition(entity, pos);
            var q = new engine.Quaternion();
            q.x = rotation.x;
            q.y = rotation.y;
            q.z = rotation.z;
            q.w = rotation.w;
            entity.transform.quaternion = q;
          }
        }
      }

      var render = new Date() - start;

      if (len > 30) {
        console.log('render update cost', render, 'rigidbody count', len, 'simulate cost', sim);
      }
      /*if (render > 2 ) {
          console.log('render update cost', render)
      }*/

    }
  }, {
    key: "loop",
    value: function loop(dt) {
      if (this.rigidbodies && this.rigidbodies.length && MiniGameAdaptor.Physics.autoSimulation) {
        this.simulate(dt);
      }
    }
  }]);

  return Physx;
}();

var physx = new Physx();
var count = 0; // 跟随引擎的update执行Simulate逻辑

Object(_Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_0__["onRootMonoBehaviourUpdate"])(function (dt) {
  physx.loop(dt);
});
var nativeColliderToAdaptorColliderMap = new WeakMap();

function bindEventForCollider(nativeCollider, gameObject) {
  nativeCollider.userData = gameObject;

  nativeCollider.onCollisionEnter = function (other) {
    var collision = new MiniGameAdaptor.Collision.$ctor1(other);
    gameObject.BroadcastMessage$2('OnCollisionEnter', other, MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collision);
  };

  nativeCollider.onCollisionExit = function (other) {
    var collision = new MiniGameAdaptor.Collision.$ctor1(other);
    gameObject.BroadcastMessage$3('OnCollisionExit', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collision);
  };

  nativeCollider.onCollisionStay = function (other) {
    var collision = new MiniGameAdaptor.Collision.$ctor1(other);
    gameObject.BroadcastMessage$3('OnCollisionStay', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collision);
  };

  nativeCollider.onTriggerExit = function (other) {
    var collider = nativeColliderToAdaptorColliderMap(other);
    gameObject.BroadcastMessage$3('onTriggerExit', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collider);
  };

  nativeCollider.onTriggerEnter = function (other) {
    var collider = nativeColliderToAdaptorColliderMap(other);
    gameObject.BroadcastMessage$3('onTriggerEnter', MiniGameAdaptor.SendMessageOptions.DontRequireReceiver, collider);
  };
}



/***/ }),
/* 31 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Behaviour", {
    inherits: [MiniGameAdaptor.Component],
    props: {
      enabled: {
        get: function get() {
          return this._active;
        },
        set: function set(value) {
          this._active = value;
        }
      },
      isActiveAndEnabled: {
        get: function get() {
          // ?
          return this._active; // throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Component.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 32 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.MonoBehaviour", {
    inherits: [MiniGameAdaptor.Behaviour],
    statics: {
      methods: {
        print: function print(message) {
          console.log(message.toString());
        }
      }
    },
    fields: {
      __fixedTimer: 0
    },
    props: {
      runInEditMode: {
        get: function get() {
          return false;
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useGUILayout: {
        get: function get() {
          return false;
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      enabled: {
        get: function get() {
          return this.active;
        },
        set: function set(value) {
          this.active = value;
        }
      },
      isActiveAndEnabled: {
        get: function get() {
          return this.active;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Behaviour.ctor.call(this);
        this.timers = {};
      }
    },
    methods: {
      CancelInvoke: function CancelInvoke() {
        for (var name in this.timers) {
          if (this.timers.hasOwnProperty(name)) {
            var id = this.timers[name];
            clearTimeout(id);
            clearInterval(id);
          }
        }

        this.timers = {};
      },
      CancelInvoke$1: function CancelInvoke$1(methodName) {
        if (this.timers.hasOwnProperty(methodName)) {
          var id = this.timers[methodName];
          clearTimeout(id);
          clearInterval(id);
          delete this.timers[methodName];
        }
      },
      Invoke: function Invoke(methodName, time) {
        if (this[methodName]) {
          var _this = this;

          var id = setTimeout(function () {
            _this[methodName]();
          }, time * 1000);
          this.timers[methodName] = id;
        }
      },
      InvokeRepeating: function InvokeRepeating(methodName, time, repeatRate) {
        var _this2 = this;

        if (this[methodName]) {
          var _this = this;

          setTimeout(function () {
            var id = setInterval(function () {
              _this[methodName]();
            }, repeatRate * 1000);
            _this2.timers[methodName] = id;
          }, time * 1000);
        }
      },
      IsInvoking: function IsInvoking() {
        return Object.keys(this.timers).length > 0;
      },
      IsInvoking$1: function IsInvoking$1(methodName) {
        return this.timers.hasOwnProperty(methodName);
      },
      StartCoroutine: function StartCoroutine(routine) {
        return MiniGameAdaptor.CoroutineManager.Instance.StartCoroutine(routine);
      },
      StartCoroutine$1: function StartCoroutine$1(methodName) {
        return MiniGameAdaptor.CoroutineManager.Instance.StartCoroutine(this[methodName]());
      },
      StartCoroutine$2: function StartCoroutine$2(methodName, value) {
        throw new System.Exception("not impl");
      },
      StopAllCoroutines: function StopAllCoroutines() {
        return MiniGameAdaptor.CoroutineManager.Instance.StopAllCoroutines();
      },
      StopCoroutine: function StopCoroutine(routine) {
        return MiniGameAdaptor.CoroutineManager.Instance.StopCoroutine(routine);
      },
      StopCoroutine$1: function StopCoroutine$1(methodName) {
        return MiniGameAdaptor.CoroutineManager.Instance.StopCoroutine(this[methodName]());
      },
      StopCoroutine$2: function StopCoroutine$2(routine) {
        return MiniGameAdaptor.CoroutineManager.Instance.StopCoroutine(routine);
      },

      /* 调用子实例的实例函数*/
      _BridgeInvokeInstanceMethodIfHas: function _BridgeInvokeInstanceMethodIfHas(methodName) {
        try {
          if (!methodName) {
            return;
          }

          if (!this._BridgeInvokeNameMap) {
            this._BridgeInvokeNameMap = {};
          }

          var method = this._BridgeInvokeNameMap[methodName];

          if (method === undefined) {
            method = Bridge.Reflection.getMembers(Bridge.getType(this), 8, 52 | 256, methodName);

            if (!method) {
              method = null;

              if (this[methodName]) {
                console.error("_BridgeInvokeInstanceMethodIfHas, error", Bridge.getType(this));
              }
            }

            this._BridgeInvokeNameMap[methodName] = method;
          }

          if (method) {
            // searched, found it
            return Bridge.Reflection.midel(method, this, null)(null);
          }
        } catch (e) {
          var name = this.entity ? this.entity.name : "";
          var type = this.$$fullname ? this.$$fullname : "";
          console.error("[" + methodName + " Error]   " + name + "   " + type);
          throw e;
        }
      },
      // simple iteration trying to invoke overload method
      // cuz reflection costs much more time
      _OverloadMethodInvoke: function _OverloadMethodInvoke(methodName) {
        if (this[methodName]) {
          this[methodName]();
          return;
        } // bridge overload


        for (var i = 0; i < 5; i++) {
          var overloadName = methodName + "$" + i;

          if (this[overloadName]) {
            this[overloadName]();
            return;
          }
        }
      },
      onAwake: function onAwake() {
        // if (this.Awake) this.Awake();
        // this._BridgeInvokeInstanceMethodIfHas("Awake");
        this._OverloadMethodInvoke("Awake");
      },
      onEnable: function onEnable() {
        // if (this.OnEnable) this.OnEnable();
        // this._BridgeInvokeInstanceMethodIfHas("OnEnable");
        this._OverloadMethodInvoke("OnEnable");
      },
      onStart: function onStart() {
        // if (this.Start) this.Start();
        // this._BridgeInvokeInstanceMethodIfHas("Start");
        this._OverloadMethodInvoke("Start");
      },
      onFixedUpdate: function onFixedUpdate() {// engine doesn't have FixedUpdate callback
        // if (this.FixedUpdate) this.FixedUpdate();
        // this._BridgeInvokeInstanceMethodIfHas("FixedUpdate");
      },
      onUpdate: function onUpdate(dt) {
        // this._BridgeInvokeInstanceMethodIfHas("Update");
        this._OverloadMethodInvoke("Update"); // mock FixedUpdate, but not precise


        this.__fixedTimer += dt;

        if (this.__fixedTimer >= MiniGameAdaptor.Time.fixedDeltaTime) {
          this.__fixedTimer = 0; // this._BridgeInvokeInstanceMethodIfHas("FixedUpdate");

          this._OverloadMethodInvoke("FixedUpdate");
        }
      },
      onLateUpdate: function onLateUpdate() {
        // this._BridgeInvokeInstanceMethodIfHas("LateUpdate");
        this._OverloadMethodInvoke("LateUpdate");
      },
      onDisable: function onDisable() {
        // this._BridgeInvokeInstanceMethodIfHas("OnDisable");
        this._OverloadMethodInvoke("OnDisable");
      },
      onDestroy: function onDestroy() {
        // this._BridgeInvokeInstanceMethodIfHas("OnDestroy");
        this._OverloadMethodInvoke("OnDestroy");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.MonoBehaviour')(MiniGameAdaptor.MonoBehaviour);
Object.defineProperty(MiniGameAdaptor.MonoBehaviour.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.MonoBehaviour.prototype.__properties)
});

/***/ }),
/* 33 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.AudioBehaviour", {
    inherits: [MiniGameAdaptor.Behaviour],
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Behaviour.ctor.call(this); // throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.AudioSource", {
    inherits: [MiniGameAdaptor.AudioBehaviour],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          // return comp;
          if (!data || !data._clip) {
            return comp;
          }

          if (typeof data === 'number') {
            data = builtContext.components.data[data];
          }

          var path = engine.loader.getAsset(data._clip).value;
          comp._clip = new MiniGameAdaptor.AudioClip();
          comp._clip.src = path; // comp._clip.src = 'http://file.52lishi.com/file/yinxiao/ly-17-06-21-33.mp3';
          // comp._clip.src = 'https://www.sx95113.com/upload/file/c72c221f-9372-4a99-8c86-b49083c9c429.mp3';

          comp._playOnAwake = data._playOnAwake;
          comp._loop = data._loop;
          comp._mute = data._mute;
          comp._volume = data._volume;
          comp.initAudio();
          return comp;
        },
        PlayClipAtPoint: function PlayClipAtPoint(clip, position) {
          throw new System.Exception("not impl");
        },
        PlayClipAtPoint$1: function PlayClipAtPoint$1(clip, position, volume) {
          throw new System.Exception("not impl");
        }
      }
    },
    fields: {
      _clip: null,
      _mute: false,
      _playOnAwake: false,
      _loop: false,
      _volume: 1,
      _playing: false
    },
    props: {
      bypassEffects: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      bypassListenerEffects: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      bypassReverbZones: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      clip: {
        get: function get() {
          return this._clip;
        },
        set: function set(value) {
          this._clip = value;
          this._audioContext.src = value ? value.src : null;
        }
      },
      dopplerLevel: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      ignoreListenerPause: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      ignoreListenerVolume: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isPlaying: {
        get: function get() {
          return this._playing; // throw new System.Exception("not impl");
        }
      },
      isVirtual: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      loop: {
        get: function get() {
          return this._loop;
        },
        set: function set(value) {
          if (this._loop == value) {
            return;
          }

          this._loop = value;
          this._audioContext.loop = value;
        }
      },
      maxDistance: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      minDistance: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      mute: {
        get: function get() {
          return this._mute;
        },
        set: function set(value) {
          if (value === this._mute) {
            return;
          }

          this._mute = value;

          if (value) {
            this._audioContext.volume = this._volume;
          } else {
            this._audioContext.volume = 0;
          }
        }
      },
      outputAudioMixerGroup: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      panStereo: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pitch: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      playOnAwake: {
        get: function get() {
          return this._playOnAwake; // throw new System.Exception("not impl");
        },
        set: function set(value) {
          this._playOnAwake = value; // throw new System.Exception("not impl");
        }
      },
      // priority: {
      //     get: function () {
      //         throw new System.Exception("not impl");
      //     },
      //     set: function (value) {
      //         throw new System.Exception("not impl");
      //     }
      // },
      reverbZoneMix: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rolloffMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      spatialBlend: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      spatialize: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      spatializePostEffects: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      spread: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      time: {
        get: function get() {
          if (MiniGameAdaptor.closeAudio) {
            return 0;
          } else {
            return this._audioContext.currentTime;
          }
        },
        set: function set(value) {
          if (MiniGameAdaptor.closeAudio) {} else {
            this._audioContext.seek(value);
          }
        }
      },
      timeSamples: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      velocityUpdateMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      volume: {
        get: function get() {
          return this._volume;
        },
        set: function set(value) {
          if (this._volume != value) {
            this._volume = value;

            if (!this._mute) {
              this._audioContext.volume = value;
            }
          }
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.AudioBehaviour.ctor.call(this);

        if (MiniGameAdaptor.closeAudio) {
          this._audioContext = {};
        } else {
          this._audioContext = wx.createInnerAudioContext();
        }
      }
    },
    methods: {
      initAudio: function initAudio() {
        var _this = this;

        if (MiniGameAdaptor.closeAudio) {
          this._audioContext = {};
          return;
        } // console.log("AudioSource createInnerAudioContext src:" + this._clip.src);


        this._audioContext = wx.createInnerAudioContext();

        this._audioContext.onPlay(function () {
          // console.log('AudioSource onPlay')
          // console.log('AudioSource onPlay duration:' + this._audioContext.duration)
          _this._clip.length = _this._audioContext.duration;
          _this._playing = true;
        });

        this._audioContext.onError(function (res) {
          // console.log('AudioSource onError errCode:' + res.errCode + ',errMsg:' + res.errMsg)
          _this._playing = false;
        });

        this._audioContext.onCanplay(function () {
          // console.log('AudioSource onCanplay')
          // console.log('AudioSource onCanplay duration:' + this._audioContext.duration)
          _this._clip.length = _this._audioContext.duration;
        });

        this._audioContext.onEnded(function () {
          // console.log('AudioSource onEnded')
          // console.log('AudioSource onEnded duration:' + this._audioContext.duration)
          _this._clip.length = _this._audioContext.duration;
          _this._playing = false;
        });

        this._audioContext.onPause(function () {
          // console.log('AudioSource onPause')
          // console.log('AudioSource onPause duration:' + this._audioContext.duration)
          _this._clip.length = _this._audioContext.duration;
          _this._playing = false;
        });

        this._audioContext.onStop(function () {
          // console.log('AudioSource onStop')
          _this._playing = false;
        }); // this._audioContext.src = this._clip.src
        //file:///类型的数据ide 播放不出,还会导致 url 类型的也播放失败


        this._audioContext.src = this._clip.src;
        this._audioContext.loop = this._loop;

        if (this._mute) {
          this._audioContext.volume = 0;
        } else if (typeof this._volume === 'number') {
          this._audioContext.volume = this._volume;
        }

        if (this._playOnAwake) {
          this._audioContext.play();
        }
      },
      GetAmbisonicDecoderFloat: function GetAmbisonicDecoderFloat(index, value) {
        throw new System.Exception("not impl");
      },
      GetCustomCurve: function GetCustomCurve(type) {
        throw new System.Exception("not impl");
      },
      GetOutputData: function GetOutputData(samples, channel) {
        throw new System.Exception("not impl");
      },
      GetSpatializerFloat: function GetSpatializerFloat(index, value) {
        throw new System.Exception("not impl");
      },
      GetSpectrumData: function GetSpectrumData(samples, channel, $window) {
        throw new System.Exception("not impl");
      },
      Pause: function Pause() {
        if (MiniGameAdaptor.closeAudio) {
          return;
        } // console.log("AudioSource pause");


        this._audioContext.pause();
      },
      Play: function Play() {
        if (MiniGameAdaptor.closeAudio) {
          return;
        } // console.log("AudioSource play");


        this._audioContext.play();
      },
      Play$1: function Play$1(delay) {
        throw new System.Exception("not impl");
      },
      PlayDelayed: function PlayDelayed(delay) {
        throw new System.Exception("not impl");
      },
      PlayOneShot: function PlayOneShot(clip) {
        if (MiniGameAdaptor.closeAudio) {
          return;
        }

        this._audioContextOneShot = wx.createInnerAudioContext();

        this._audioContextOneShot.onPlay(function () {// console.log('AudioSourceOneShot onPlay')
        });

        this._audioContextOneShot.onError(function (res) {// console.log('AudioSourceOneShot onError errCode:' + res.errCode + ',errMsg:' + res.errMsg)
        });

        this._audioContextOneShot.onCanplay(function () {// console.log('AudioSourceOneShot onCanplay')
        });

        this._audioContextOneShot.onEnded(function () {// console.log('AudioSourceOneShot onEnded')
        });

        this._audioContextOneShot.onPause(function () {// console.log('AudioSourceOneShot onPause')
        });

        this._audioContextOneShot.onStop(function () {// console.log('AudioSourceOneShot onStop')
        }); //src 如果未Deserialize,这里会挂,需要外部保证参数有效
        // console.log("AudioSourceOneShot PlayOneShot src:" + clip.src);


        this._audioContextOneShot.src = clip.src;
        this._audioContextOneShot.loop = false;

        this._audioContextOneShot.play();
      },
      PlayOneShot$1: function PlayOneShot$1(clip, volumeScale) {
        if (MiniGameAdaptor.closeAudio) {
          return;
        }

        this._audioContextOneShotVolume = wx.createInnerAudioContext();

        this._audioContextOneShotVolume.onPlay(function () {// console.log('AudioSourceOneShotVolume onPlay')
        });

        this._audioContextOneShotVolume.onError(function (res) {// console.log('AudioSourceOneShotVolume onError errCode:' + res.errCode + ',errMsg:' + res.errMsg)
        });

        this._audioContextOneShotVolume.onCanplay(function () {// console.log('AudioSourceOneShotVolume onCanplay')
        });

        this._audioContextOneShotVolume.onEnded(function () {// console.log('AudioSourceOneShotVolume onEnded')
        });

        this._audioContextOneShotVolume.onPause(function () {// console.log('AudioSourceOneShotVolume onPause')
        });

        this._audioContextOneShotVolume.onStop(function () {// console.log('AudioSourceOneShotVolume onStop')
        }); //src 如果未Deserialize,这里会挂,需要外部保证参数有效
        // console.log("AudioSourceOneShotVolume PlayOneShot src:" + clip.src + ',volumeScale:'+ volumeScale);


        this._audioContextOneShotVolume.src = clip.src; // this._audioContextOneShotVolume.src = 'http://file.52lishi.com/file/yinxiao/ly-17-06-21-33.mp3'

        this._audioContextOneShotVolume.loop = false;
        this._audioContextOneShotVolume.volume = volumeScale;

        this._audioContextOneShotVolume.play();
      },
      PlayScheduled: function PlayScheduled(time) {
        throw new System.Exception("not impl");
      },
      SetAmbisonicDecoderFloat: function SetAmbisonicDecoderFloat(index, value) {
        throw new System.Exception("not impl");
      },
      SetCustomCurve: function SetCustomCurve(type, curve) {
        throw new System.Exception("not impl");
      },
      SetScheduledEndTime: function SetScheduledEndTime(time) {
        throw new System.Exception("not impl");
      },
      SetScheduledStartTime: function SetScheduledStartTime(time) {
        throw new System.Exception("not impl");
      },
      SetSpatializerFloat: function SetSpatializerFloat(index, value) {
        throw new System.Exception("not impl");
      },
      Stop: function Stop() {
        if (MiniGameAdaptor.closeAudio) {
          return;
        } // console.log("AudioSource stop");


        this._audioContext.stop();
      },
      UnPause: function UnPause() {
        if (MiniGameAdaptor.closeAudio) {
          return;
        } // console.log("AudioSource UnPause");


        this._audioContext.play();
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.AudioSource')(MiniGameAdaptor.AudioSource);
Object.defineProperty(MiniGameAdaptor.AudioSource.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.AudioSource.prototype.__properties)
});
MiniGameAdaptor.AudioSource.prototype.__properties._clip = {
  type: "string"
};
MiniGameAdaptor.AudioSource.prototype.__properties._mute = {
  type: "boolean"
};
MiniGameAdaptor.AudioSource.prototype.__properties._playOnAwake = {
  type: "boolean"
};
MiniGameAdaptor.AudioSource.prototype.__properties._loop = {
  type: "boolean"
};
MiniGameAdaptor.AudioSource.prototype.__properties._volume = {
  type: "number"
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.AudioClip", {
    inherits: [MiniGameAdaptor.Object],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp) {
          console.log("AudioClip Deserialize");
          comp._src = data._src; // comp._src = 'http://file.52lishi.com/file/yinxiao/ly-17-06-21-33.mp3';

          return comp;
        },
        Create: function Create(name, lengthSamples, channels, frequency, stream) {
          this._frequency = frequency;
          this._channels = channels;
        },
        Create$1: function Create$1(name, lengthSamples, channels, frequency, stream, pcmreadercallback) {
          throw new System.Exception("not impl");
        },
        Create$2: function Create$2(name, lengthSamples, channels, frequency, stream, pcmreadercallback, pcmsetpositioncallback) {
          throw new System.Exception("not impl");
        }
      }
    },
    fields: {
      _src: "",
      _length: 0,
      _frequency: 0.0,
      _channels: 0
    },
    props: {
      src: {
        get: function get() {
          return this._src;
        },
        set: function set(value) {
          this._src = value;
        }
      },
      ambisonic: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      channels: {
        get: function get() {
          return this._frequency;
        }
      },
      frequency: {
        get: function get() {
          return this._channels;
        }
      },
      length: {
        get: function get() {
          return this._length;
        },
        set: function set(value) {
          this._length = value;
        }
      },
      loadInBackground: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      loadState: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      loadType: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preloadAudioData: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      samples: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      GetData: function GetData(data, offsetSamples) {
        throw new System.Exception("not impl");
      },
      LoadAudioData: function LoadAudioData() {
        throw new System.Exception("not impl");
      },
      SetData: function SetData(data, offsetSamples) {
        throw new System.Exception("not impl");
      },
      UnloadAudioData: function UnloadAudioData() {
        throw new System.Exception("not impl");
      },
      SetSrc: function SetSrc(src) {
        this._src = src;
      }
    }
  });
});

/***/ }),
/* 36 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.KeyCode", {
    $kind: "enum",
    statics: {
      fields: {
        None: 0,
        Backspace: 8,
        Delete: 127,
        Tab: 9,
        Clear: 12,
        Return: 13,
        Pause: 19,
        Escape: 27,
        Space: 32,
        Keypad0: 256,
        Keypad1: 257,
        Keypad2: 258,
        Keypad3: 259,
        Keypad4: 260,
        Keypad5: 261,
        Keypad6: 262,
        Keypad7: 263,
        Keypad8: 264,
        Keypad9: 265,
        KeypadPeriod: 266,
        KeypadDivide: 267,
        KeypadMultiply: 268,
        KeypadMinus: 269,
        KeypadPlus: 270,
        KeypadEnter: 271,
        KeypadEquals: 272,
        UpArrow: 273,
        DownArrow: 274,
        RightArrow: 275,
        LeftArrow: 276,
        Insert: 277,
        Home: 278,
        End: 279,
        PageUp: 280,
        PageDown: 281,
        F1: 282,
        F2: 283,
        F3: 284,
        F4: 285,
        F5: 286,
        F6: 287,
        F7: 288,
        F8: 289,
        F9: 290,
        F10: 291,
        F11: 292,
        F12: 293,
        F13: 294,
        F14: 295,
        F15: 296,
        Alpha0: 48,
        Alpha1: 49,
        Alpha2: 50,
        Alpha3: 51,
        Alpha4: 52,
        Alpha5: 53,
        Alpha6: 54,
        Alpha7: 55,
        Alpha8: 56,
        Alpha9: 57,
        Exclaim: 33,
        DoubleQuote: 34,
        Hash: 35,
        Dollar: 36,
        Percent: 37,
        Ampersand: 38,
        Quote: 39,
        LeftParen: 40,
        RightParen: 41,
        Asterisk: 42,
        Plus: 43,
        Comma: 44,
        Minus: 45,
        Period: 46,
        Slash: 47,
        Colon: 58,
        Semicolon: 59,
        Less: 60,
        Equals: 61,
        Greater: 62,
        Question: 63,
        At: 64,
        LeftBracket: 91,
        Backslash: 92,
        RightBracket: 93,
        Caret: 94,
        Underscore: 95,
        BackQuote: 96,
        A: 97,
        B: 98,
        C: 99,
        D: 100,
        E: 101,
        F: 102,
        G: 103,
        H: 104,
        I: 105,
        J: 106,
        K: 107,
        L: 108,
        M: 109,
        N: 110,
        O: 111,
        P: 112,
        Q: 113,
        R: 114,
        S: 115,
        T: 116,
        U: 117,
        V: 118,
        W: 119,
        X: 120,
        Y: 121,
        Z: 122,
        LeftCurlyBracket: 123,
        Pipe: 124,
        RightCurlyBracket: 125,
        Tilde: 126,
        Numlock: 300,
        CapsLock: 301,
        ScrollLock: 302,
        RightShift: 303,
        LeftShift: 304,
        RightControl: 305,
        LeftControl: 306,
        RightAlt: 307,
        LeftAlt: 308,
        LeftCommand: 310,
        LeftApple: 310,
        LeftWindows: 311,
        RightCommand: 309,
        RightApple: 309,
        RightWindows: 312,
        AltGr: 313,
        Help: 315,
        Print: 316,
        SysReq: 317,
        Break: 318,
        Menu: 319,
        Mouse0: 323,
        Mouse1: 324,
        Mouse2: 325,
        Mouse3: 326,
        Mouse4: 327,
        Mouse5: 328,
        Mouse6: 329,
        JoystickButton0: 330,
        JoystickButton1: 331,
        JoystickButton2: 332,
        JoystickButton3: 333,
        JoystickButton4: 334,
        JoystickButton5: 335,
        JoystickButton6: 336,
        JoystickButton7: 337,
        JoystickButton8: 338,
        JoystickButton9: 339,
        JoystickButton10: 340,
        JoystickButton11: 341,
        JoystickButton12: 342,
        JoystickButton13: 343,
        JoystickButton14: 344,
        JoystickButton15: 345,
        JoystickButton16: 346,
        JoystickButton17: 347,
        JoystickButton18: 348,
        JoystickButton19: 349,
        Joystick1Button0: 350,
        Joystick1Button1: 351,
        Joystick1Button2: 352,
        Joystick1Button3: 353,
        Joystick1Button4: 354,
        Joystick1Button5: 355,
        Joystick1Button6: 356,
        Joystick1Button7: 357,
        Joystick1Button8: 358,
        Joystick1Button9: 359,
        Joystick1Button10: 360,
        Joystick1Button11: 361,
        Joystick1Button12: 362,
        Joystick1Button13: 363,
        Joystick1Button14: 364,
        Joystick1Button15: 365,
        Joystick1Button16: 366,
        Joystick1Button17: 367,
        Joystick1Button18: 368,
        Joystick1Button19: 369,
        Joystick2Button0: 370,
        Joystick2Button1: 371,
        Joystick2Button2: 372,
        Joystick2Button3: 373,
        Joystick2Button4: 374,
        Joystick2Button5: 375,
        Joystick2Button6: 376,
        Joystick2Button7: 377,
        Joystick2Button8: 378,
        Joystick2Button9: 379,
        Joystick2Button10: 380,
        Joystick2Button11: 381,
        Joystick2Button12: 382,
        Joystick2Button13: 383,
        Joystick2Button14: 384,
        Joystick2Button15: 385,
        Joystick2Button16: 386,
        Joystick2Button17: 387,
        Joystick2Button18: 388,
        Joystick2Button19: 389,
        Joystick3Button0: 390,
        Joystick3Button1: 391,
        Joystick3Button2: 392,
        Joystick3Button3: 393,
        Joystick3Button4: 394,
        Joystick3Button5: 395,
        Joystick3Button6: 396,
        Joystick3Button7: 397,
        Joystick3Button8: 398,
        Joystick3Button9: 399,
        Joystick3Button10: 400,
        Joystick3Button11: 401,
        Joystick3Button12: 402,
        Joystick3Button13: 403,
        Joystick3Button14: 404,
        Joystick3Button15: 405,
        Joystick3Button16: 406,
        Joystick3Button17: 407,
        Joystick3Button18: 408,
        Joystick3Button19: 409,
        Joystick4Button0: 410,
        Joystick4Button1: 411,
        Joystick4Button2: 412,
        Joystick4Button3: 413,
        Joystick4Button4: 414,
        Joystick4Button5: 415,
        Joystick4Button6: 416,
        Joystick4Button7: 417,
        Joystick4Button8: 418,
        Joystick4Button9: 419,
        Joystick4Button10: 420,
        Joystick4Button11: 421,
        Joystick4Button12: 422,
        Joystick4Button13: 423,
        Joystick4Button14: 424,
        Joystick4Button15: 425,
        Joystick4Button16: 426,
        Joystick4Button17: 427,
        Joystick4Button18: 428,
        Joystick4Button19: 429,
        Joystick5Button0: 430,
        Joystick5Button1: 431,
        Joystick5Button2: 432,
        Joystick5Button3: 433,
        Joystick5Button4: 434,
        Joystick5Button5: 435,
        Joystick5Button6: 436,
        Joystick5Button7: 437,
        Joystick5Button8: 438,
        Joystick5Button9: 439,
        Joystick5Button10: 440,
        Joystick5Button11: 441,
        Joystick5Button12: 442,
        Joystick5Button13: 443,
        Joystick5Button14: 444,
        Joystick5Button15: 445,
        Joystick5Button16: 446,
        Joystick5Button17: 447,
        Joystick5Button18: 448,
        Joystick5Button19: 449,
        Joystick6Button0: 450,
        Joystick6Button1: 451,
        Joystick6Button2: 452,
        Joystick6Button3: 453,
        Joystick6Button4: 454,
        Joystick6Button5: 455,
        Joystick6Button6: 456,
        Joystick6Button7: 457,
        Joystick6Button8: 458,
        Joystick6Button9: 459,
        Joystick6Button10: 460,
        Joystick6Button11: 461,
        Joystick6Button12: 462,
        Joystick6Button13: 463,
        Joystick6Button14: 464,
        Joystick6Button15: 465,
        Joystick6Button16: 466,
        Joystick6Button17: 467,
        Joystick6Button18: 468,
        Joystick6Button19: 469,
        Joystick7Button0: 470,
        Joystick7Button1: 471,
        Joystick7Button2: 472,
        Joystick7Button3: 473,
        Joystick7Button4: 474,
        Joystick7Button5: 475,
        Joystick7Button6: 476,
        Joystick7Button7: 477,
        Joystick7Button8: 478,
        Joystick7Button9: 479,
        Joystick7Button10: 480,
        Joystick7Button11: 481,
        Joystick7Button12: 482,
        Joystick7Button13: 483,
        Joystick7Button14: 484,
        Joystick7Button15: 485,
        Joystick7Button16: 486,
        Joystick7Button17: 487,
        Joystick7Button18: 488,
        Joystick7Button19: 489,
        Joystick8Button0: 490,
        Joystick8Button1: 491,
        Joystick8Button2: 492,
        Joystick8Button3: 493,
        Joystick8Button4: 494,
        Joystick8Button5: 495,
        Joystick8Button6: 496,
        Joystick8Button7: 497,
        Joystick8Button8: 498,
        Joystick8Button9: 499,
        Joystick8Button10: 500,
        Joystick8Button11: 501,
        Joystick8Button12: 502,
        Joystick8Button13: 503,
        Joystick8Button14: 504,
        Joystick8Button15: 505,
        Joystick8Button16: 506,
        Joystick8Button17: 507,
        Joystick8Button18: 508,
        Joystick8Button19: 509
      }
    }
  });
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeMouseButtonUpState", function() { return consumeMouseButtonUpState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consumeMouseButtonDownState", function() { return consumeMouseButtonDownState; });
/* harmony import */ var _Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

var mousePosition;
var _mouseButtonDownState = false;
var mouseButtonDownState = false;
var _mouseButtonUpState = false;
var mouseButtonUpState = false;
var mouseButtonIsHeldDown = false;
var validButtons = [0, 1, 2];
var mAacceleration = new MiniGameAdaptor.Vector3.$ctor2(0, 0, 0);
var mTouchCount = 0;
var mTouchEnd = true;
var mTouches = new Array(); // 消费当前的 mouseButtonDownState 和 mouseButtonUpState，需要在所有组件 Update 之前调用这两个函数

function consumeMouseButtonDownState() {
  mouseButtonDownState = _mouseButtonDownState;
  _mouseButtonDownState = false;
}

function consumeMouseButtonUpState() {
  mouseButtonUpState = _mouseButtonUpState;
  _mouseButtonUpState = false;
} //用标记延迟修改mTouchCount,防止最后一次 End/Cancel 受不到.


function consumeTouchCountState() {
  if (mTouchEnd) {
    mTouchCount = 0;
  }
}

Object(_Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_0__["onRootMonoBehaviourUpdate"])(consumeMouseButtonDownState);
Object(_Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_0__["onRootMonoBehaviourUpdate"])(consumeMouseButtonUpState);
Object(_Extend_RootMonoBehaviour__WEBPACK_IMPORTED_MODULE_0__["onRootMonoBehaviourUpdate"])(consumeTouchCountState);
wx.onTouchStart(function (e) {
  _mouseButtonDownState = true;
  updateMousePosition(e.touches);
  updateTouches(e.touches, e.changedTouches, MiniGameAdaptor.TouchPhase.Began);
});
wx.onTouchMove(function (e) {
  updateMousePosition(e.touches);
  updateTouches(e.touches, e.changedTouches, MiniGameAdaptor.TouchPhase.Moved);
});
wx.onTouchCancel(function (e) {
  updateMousePosition(e.touches);
  updateTouches(e.touches, e.changedTouches, MiniGameAdaptor.TouchPhase.Canceled);
});
wx.onTouchEnd(function (e) {
  _mouseButtonUpState = true;
  updateMousePosition(e.touches);
  updateTouches(e.touches, e.changedTouches, MiniGameAdaptor.TouchPhase.Ended);
});

var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    screenHeight = _wx$getSystemInfoSync.screenHeight; // 更新 mousePosition 的坐标，所有 touch 事件发生时都要更新一次，取所有手指的平均值
// 参考 https://answers.unity.com/questions/180987/inputmouseposition-equivalent-to-first-finger-touc.html


function updateMousePosition(touches) {
  if (!mousePosition) {
    mousePosition = new MiniGameAdaptor.Vector3.$ctor1(0, 0);
  }

  if (touches.length === 0) {
    mouseButtonIsHeldDown = false;
    return;
  }

  mouseButtonIsHeldDown = true;

  var _touches$reduce = touches.reduce(function (_ref, _ref2) {
    var xSum = _ref.xSum,
        ySum = _ref.ySum;
    var clientX = _ref2.clientX,
        clientY = _ref2.clientY;
    return {
      xSum: xSum + clientX,
      ySum: ySum + clientY
    };
  }, {
    xSum: 0,
    ySum: 0
  }),
      xSum = _touches$reduce.xSum,
      ySum = _touches$reduce.ySum;

  var x = xSum / touches.length;
  var y = ySum / touches.length;
  mousePosition.x = x;
  mousePosition.y = screenHeight - y;
}

function updateTouches(touches, changedTouches, phase) {
  if (!mTouches) {
    mTouches = new Array();
  }

  var i = 0,
      j = 0;

  if (touches.length === 0) {
    if (changedTouches.length !== 0) {//changedTouches取出来的内容不是 Touch对象,还需要再确认一下原因,先简单写成如果 touches 为 0,就全部置为新的 phase
      // console.log("Input changedTouches.length:" + changedTouches.length);
      // for (i=0;i<changedTouches.length;i++){
      //     let changedtouche = changedTouches[i];
      //     console.log("Input changedTouch.fingerId:" + changedTouches[i].fingerId);
      //     console.log("Input changedTouch.fingerId:" + changedtouche.fingerId);
      //     console.log("Input changedTouch.position:" + changedTouches[i].position);
      //     console.log("Input changedTouch.position:" + changedtouche.position);
      //     console.log("Input changedTouch.phase:" + changedTouches[i].phase);
      //     console.log("Input changedTouch.phase:" + changedtouche.phase);
      //     for(j=0;j<mTouches.length;j++) {
      //         let touche = mTouches[j];
      //         console.log("Input changedTouch.fingerId:" + changedTouches[i].fingerId + ",touche.fingerId:" + touche.fingerId);
      //         if(changedTouches[i].fingerId === touche.fingerId) {
      //             let position = new MiniGameAdaptor.Vector2.$ctor1(changedTouches[i].clientX, changedTouches[i].clientY)
      //             touche.position = position;
      //             touche.phase = phase;
      //             mTouches[j] = touche;
      //             break;
      //         }
      //     }
      // }
    }

    for (i = 0; i < mTouches.length; i++) {
      mTouches[i] = new MiniGameAdaptor.Touch();
      mTouches[i].phase = phase;
    }

    mTouchEnd = true;
    mTouchCount = changedTouches.length;
  } else {
    //待优化,不用每次都 new,可以就用原先mTouches的,只去改变值就好
    for (i = 0; i < touches.length; i++) {
      var touche = new MiniGameAdaptor.Touch();
      touche.fingerId = touches[i].identifier;
      var position = new MiniGameAdaptor.Vector2.$ctor1(touches[i].clientX, screenHeight - touches[i].clientY);
      touche.position = position;
      touche.phase = phase;
      mTouches[i] = touche;
    }

    mTouchEnd = false;
    mTouchCount = touches.length;
  } // console.log("Input mTouchCount:" + mTouchCount + ",mTouchEnd:" + mTouchEnd + ",phase:" + phase);

} // 自动生成的桩代码


Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Input", {
    statics: {
      props: {
        acceleration: {
          get: function get() {
            if (!mAacceleration) {
              mAacceleration = new MiniGameAdaptor.Vector3.$ctor2(0, 0, 0);
            }

            return mAacceleration;
          }
        },
        accelerationEventCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        accelerationEvents: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        anyKey: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        anyKeyDown: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        backButtonLeavesApp: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        compass: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        compensateSensors: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        compositionCursorPos: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        compositionString: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        deviceOrientation: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        gyro: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        imeCompositionMode: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        imeIsSelected: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        inputString: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        location: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        mousePosition: {
          get: function get() {
            if (!mousePosition) {
              mousePosition = new MiniGameAdaptor.Vector3.$ctor1(0, 0);
            }

            return mousePosition;
          }
        },
        mousePresent: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        mouseScrollDelta: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        multiTouchEnabled: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        simulateMouseWithTouches: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        stylusTouchSupported: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        touchCount: {
          get: function get() {
            return mTouchCount; // throw new System.Exception("not impl");
          }
        },
        touches: {
          get: function get() {
            return mTouches; // throw new System.Exception("not impl");
          }
        },
        touchPressureSupported: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        touchSupported: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        GetAccelerationEvent: function GetAccelerationEvent(index) {
          throw new System.Exception("not impl");
        },
        GetAxis: function GetAxis(axisName) {
          throw new System.Exception("not impl");
        },
        GetAxisRaw: function GetAxisRaw(axisName) {
          throw new System.Exception("not impl");
        },
        GetButton: function GetButton(buttonName) {
          throw new System.Exception("not impl");
        },
        GetButtonDown: function GetButtonDown(buttonName) {
          throw new System.Exception("not impl");
        },
        GetButtonUp: function GetButtonUp(buttonName) {
          throw new System.Exception("not impl");
        },
        GetJoystickNames: function GetJoystickNames() {
          throw new System.Exception("not impl");
        },
        GetKey: function GetKey(name) {// dummy impl.
        },
        GetKey$1: function GetKey$1(key) {// dummy impl.
        },
        GetKeyDown: function GetKeyDown(name) {// dummy impl.
        },
        GetKeyDown$1: function GetKeyDown$1(key) {// dummy impl.
        },
        GetKeyUp: function GetKeyUp(name) {// dummy impl.
        },
        GetKeyUp$1: function GetKeyUp$1(key) {// dummy impl.
        },
        GetMouseButton: function GetMouseButton(button) {
          if (validButtons.indexOf(button) > -1) {
            return mouseButtonIsHeldDown;
          }

          throw new System.Exception("invalid button: ".concat(button));
        },
        GetMouseButtonDown: function GetMouseButtonDown(button) {
          if (validButtons.indexOf(button) > -1) {
            return mouseButtonDownState;
          }

          throw new System.Exception("invalid button: ".concat(button));
        },
        GetMouseButtonUp: function GetMouseButtonUp(button) {
          if (validButtons.indexOf(button) > -1) {
            return mouseButtonUpState;
          }

          throw new System.Exception("invalid button: ".concat(button));
        },
        GetTouch: function GetTouch(index) {
          return mTouches.length >= index ? mTouches[index] : null; // throw new System.Exception("not impl");
        },
        ResetInputAxes: function ResetInputAxes() {
          throw new System.Exception("not impl");
        },
        StartAccelerometer: function StartAccelerometer(interval) {
          console.log('Input StartAccelerometer interval: ' + interval);
          wx.startAccelerometer({
            interval: interval,
            success: function success(res) {
              console.log('Input StartAccelerometer success');
              wx.onAccelerometerChange(function (res) {
                if (mAacceleration) {
                  mAacceleration.x = res.x;
                  mAacceleration.y = res.y;
                  mAacceleration.z = res.z;
                }
              });
            }
          });
        },
        StopAccelerometer: function StopAccelerometer() {
          wx.stopAccelerometer();
          wx.offAccelerometerChange();
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        console.log('Input ctor $initialize');
        this.$initialize();

        if (!this._acceleration) {
          console.log('Input ctor $initialize new _acceleration');
          this._acceleration = new MiniGameAdaptor.Vector3.$ctor2(0, 0, 0);
        }
      }
    }
  });
});


/***/ }),
/* 38 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Touch", {
    $kind: "struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.Touch();
        }
      }
    },
    fields: {
      _fingerId: -1,
      _position: new MiniGameAdaptor.Vector2.$ctor1(0, 0),
      _phase: -1 // _isDone: false,
      // _keepWaiting: true,
      // _url: "",
      // _statusCode:-1,
      // _responseHeaders:null,

    },
    props: {
      altitudeAngle: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      azimuthAngle: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      deltaPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      deltaTime: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fingerId: {
        get: function get() {
          return this._fingerId; // throw new System.Exception("not impl");
        },
        set: function set(value) {
          this._fingerId = value; // throw new System.Exception("not impl");
        }
      },
      maximumPossiblePressure: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      phase: {
        get: function get() {
          return this._phase; // throw new System.Exception("not impl");
        },
        set: function set(value) {
          this._phase = value; // throw new System.Exception("not impl");
        }
      },
      position: {
        get: function get() {
          return this._position; // throw new System.Exception("not impl");
        },
        set: function set(value) {
          this._position = value; // throw new System.Exception("not impl");
        }
      },
      pressure: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      radius: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      radiusVariance: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rawPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      tapCount: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      type: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 39 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.TouchPhase", {
    $kind: "enum",
    statics: {
      fields: {
        Began: 0,
        Moved: 1,
        Stationary: 2,
        Ended: 3,
        Canceled: 4
      }
    }
  });
});

/***/ }),
/* 40 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.TouchType", {
    $kind: "enum",
    statics: {
      fields: {
        Direct: 0,
        Indirect: 1,
        Stylus: 2
      }
    }
  });
});

/***/ }),
/* 41 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Plane", {
    $kind: "struct",
    statics: {
      methods: {
        Translate: function Translate(plane, translation) {
          throw new System.Exception("not impl");
        },
        getDefaultValue: function getDefaultValue() {
          return new UnityEngine.Plane();
        }
      }
    },
    props: {
      distance: {
        get: function get() {
          return 0;
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      flipped: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      normal: {
        get: function get() {
          return new MiniGameAdaptor.Vector3.$ctor2(0, 0, 0);
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      $ctor1: function $ctor1(inNormal, d) {
        this.$initialize();
      },
      $ctor2: function $ctor2(inNormal, inPoint) {
        this.$initialize();
        this.inNormal = inNormal;
        this.inPoint = inPoint;
      },
      $ctor3: function $ctor3(a, b, c) {
        this.$initialize();
      },
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      ClosestPointOnPlane: function ClosestPointOnPlane(point) {
        throw new System.Exception("not impl");
      },
      Flip: function Flip() {
        throw new System.Exception("not impl");
      },
      GetDistanceToPoint: function GetDistanceToPoint(point) {
        throw new System.Exception("not impl");
      },
      GetSide: function GetSide(point) {
        throw new System.Exception("not impl");
      },
      Raycast: function Raycast(ray, enter) {
        throw new System.Exception("not impl");
      },
      SameSide: function SameSide(inPt0, inPt1) {
        throw new System.Exception("not impl");
      },
      Set3Points: function Set3Points(a, b, c) {
        throw new System.Exception("not impl");
      },
      SetNormalAndPosition: function SetNormalAndPosition(inNormal, inPoint) {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      },
      ToString: function ToString(format) {
        throw new System.Exception("not impl");
      },
      Translate: function Translate(translation) {
        throw new System.Exception("not impl");
      },
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // 具体模块实现

var SceneManager = /*#__PURE__*/function () {
  function SceneManager() {
    _classCallCheck(this, SceneManager);
  }

  _createClass(SceneManager, null, [{
    key: "getNameByIndex",
    value: function getNameByIndex(index) {
      var name = SceneManager.index2NameMap[index];

      if (!name) {
        throw new Error('scene index to name mapping not found');
      }

      return name;
    }
  }, {
    key: "getPathByName",
    value: function getPathByName(name) {
      var path = SceneManager.name2PathMap[name];

      if (!path) {
        throw new Error('scene name to path mapping not found');
      }

      return path;
    }
  }, {
    key: "getPathByIndex",
    value: function getPathByIndex(index) {
      var name = getNameByIndex(index);
      var path = getPathByName(name);
      return path;
    }
  }, {
    key: "_loadScene",
    value: function _loadScene(name, path, callback) {
      engine.loader.load(path).promise.then(function (res) {
        engine.game.playScene(res); // game.run();

        callback && callback();
      })["catch"](function (error) {
        console.error(error);
        callback(null);
      });
    }
  }, {
    key: "LoadScene",
    value: function LoadScene(sceneData, callback) {
      var _this = this;

      if (typeof sceneData === "number") {
        var name = getNameByIndex(sceneData);
        var path = getPathByName(name);

        this._loadScene(name, path, callback);
      } else if (typeof sceneData === "string") {
        var _path = SceneManager.name2PathMap[sceneData]; // sceneData is scene name

        if (_path) {
          this._loadScene(sceneData, _path, callback);
        } // sceneData is scene path
        else {
            Object.entries(SceneManager.name2PathMap).forEach(function (kv) {
              var k = kv[0];
              var v = kv[1];

              if (v === sceneData || v.substring(0, v.length - 6) === sceneData) {
                _this._loadScene(k, v, callback);
              }
            });
          }
      }
    }
  }]);

  return SceneManager;
}();

if (window.__minigamePrivate) {
  SceneManager.index2NameMap = window.__minigamePrivate.i2n;
  SceneManager.name2PathMap = window.__minigamePrivate.n2p;
} // 将对象挂在到MiniGameAdaptor


_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('SceneManager', SceneManager);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _File_getFile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // 具体模块实现

var Resources = /*#__PURE__*/function () {
  function Resources() {
    _classCallCheck(this, Resources);
  }

  _createClass(Resources, null, [{
    key: "Load",
    value: function Load(path, callback, options) {
      path = path.toLowerCase();
      Resources.getFileInfo(path, function (fullpath, type) {
        if (type === "GameObject") {
          engine.loader.load(fullpath, options).promise.then(function (prefab) {
            callback(prefab);
          })["catch"](function (error) {
            console.error(error);
            callback(null);
          });
        } else if (type === "AudioClip") {
          var isLocal = engine.settings.baseURL === "file:///assets/";
          var url = isLocal ? "assets/" + fullpath : engine.settings.baseURL + fullpath;
          var clip = new _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].AudioClip();
          clip.SetSrc(url);
          callback(clip);
        } else if (type === "TextAsset") {
          Resources.LoadRes(fullpath, _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].TextAsset, callback);
        } else if (type == "Texture2D") {
          //TODO
          throw new System.Exception("not support file:" + path);
        } else {
          throw new System.Exception("not support file:" + path);
        }
      }); // let dir = 'Assets/Resources/';
      // if (__wxConfig.trgame) dir = 'Assets/Game/Resources/';
      // const fullpath = dir + path + '.prefab';
      // engine.loader.load(fullpath).promise.then((prefab) => {
      //     const depPrefabs = prefab.meta.config.prefabs;
      //     if (depPrefabs) {
      //         MiniGameAdaptor.UnityPrefabManager.loadedPrefabsMap.addRangeAsync(depPrefabs, (prefabs) => {
      //             callback(prefab);
      //         });
      //     } else {
      //         callback(prefab);
      //     }
      // });
    }
    /**** 加载文本类型资源, 指定了type，性能更高一些
     C#业务用法：
    WX.Resources.Load<TextAsset>("1", (result)=>{
    Debug.Log("***********" + result);
        });
    导出JS后：
    MiniGameAdaptor.Resources.LoadRes("1", MiniGameAdaptor.TextAsset, function (result) {
            MiniGameAdaptor.Debug.Log(System.String.concat("***********", result));
        });
    */

  }, {
    key: "LoadRes",
    value: function LoadRes(path, type, callback, options) {
      //********************** */
      path = path.toLowerCase();

      if (type === _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].TextAsset) {
        Resources.getFilePathByKey(path, "TextAsset", function (realPath) {
          var url = engine.settings.baseURL + realPath;
          engine.loader.loadFile(url, {
            filetype: "config"
          }).then(function (obj) {
            callback(new _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].TextAsset.$ctor1(obj, url));
          })["catch"](function (error) {
            console.error(error);
            callback(null);
          });
        });
      } else if (type === _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].AudioClip) {
        Resources.getFilePathByKey(path, "AudioClip", function (realPath) {
          var url = engine.settings.baseURL + realPath;
          var clip = new _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].AudioClip();
          clip.SetSrc(url);
          callback(clip);
        });
      } else if (type === _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].GameObject) {
        Resources.getFilePathByKey(path, "GameObject", function (realPath) {
          engine.loader.load(realPath, options).promise.then(function (prefab) {
            callback(prefab);
          })["catch"](function (error) {
            console.error(error);
            callback(null);
          });
        });
      } else {
        throw new System.Exception("not support type");
      }
    } //加载指定类型的所有文件

  }, {
    key: "LoadAll",
    value: function LoadAll(path, type, callback) {
      if (type === _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].TextAsset) {
        Resources.getFilesByType("TextAsset", function (mapRes) {
          var total_cnt = 0;
          var down_cnt = 0;
          var retObjs = new Array();

          if (mapRes) {
            mapRes.forEach(function (value, key) {
              if (path && path.length > 0 && value.indexOf(path) == -1) {} else {
                total_cnt++;
                var url = engine.settings.baseURL + value;
                engine.loader.loadFile(url, {
                  filetype: "config"
                }).then(function (obj) {
                  down_cnt++;
                  retObjs.push(obj);

                  if (down_cnt == total_cnt) {
                    callback(retObjs);
                  }
                })["catch"](function (error) {
                  console.error(error);
                });
              }
            });
          }
        });
      } else {
        throw new System.Exception("not support type");
      }
    }
  }, {
    key: "getFilePathByKey",
    value: function getFilePathByKey(key, type, callback) {
      Resources.loadResMap(function () {
        var ret = null;
        var fileMap = Resources.mapRes.get(type);

        if (fileMap) {
          var filepath = fileMap.get(key);

          if (filepath) {
            ret = filepath;
          }
        }

        callback(ret);
      });
    }
  }, {
    key: "getFilesByType",
    value: function getFilesByType(type, callback) {
      Resources.loadResMap(function () {
        var ret = null;
        var fileMap = Resources.mapRes.get(type);
        callback(fileMap);
      });
    }
  }, {
    key: "loadResMap",
    value: function loadResMap(callback) {
      if (Resources.mapCallback.length > 0) {
        Resources.mapCallback.push(callback);
        return;
      }

      if (Resources.mapRes == null) {
        Resources.mapRes = new Map();
        var url = engine.settings.baseURL + "Assets/Resources.json";
        Resources.mapCallback.push(callback);
        engine.loader.loadFile(url, {
          filetype: "config"
        }).then(function (obj) {
          var resObj = JSON.parse(obj);

          for (var i = 0; i < resObj.length; i++) {
            var category = resObj[i];
            var type = category.type;
            var files = category.files;

            if (files.length > 0) {
              Resources.resTypes.push(type);
              var thisTypeMap = new Map();

              for (var k = 0; k < files.length; k++) {
                var fileInfo = files[k];
                var key = fileInfo.key.toLowerCase();
                var value = fileInfo.name;
                thisTypeMap.set(key, value);
              }

              Resources.mapRes.set(type, thisTypeMap);
            }
          }

          for (var i = 0; i < Resources.mapCallback.length; i++) {
            var cbk = Resources.mapCallback[i];
            cbk();
          }

          Resources.mapCallback.splice(0);
        })["catch"](function (error) {
          throw new System.Exception(error);
        });
      } else {
        callback();
      }
    }
  }, {
    key: "UnloadUnusedAssets",
    value: function UnloadUnusedAssets() {}
  }, {
    key: "getFileInfo",
    value: function getFileInfo(path, callback) {
      path = path.toLowerCase();
      Resources.loadResMap(function () {
        var hasfile = false;

        for (var i = 0; i < Resources.resTypes.length; i++) {
          var type = Resources.resTypes[i];
          var fileMap = Resources.mapRes.get(type);

          if (fileMap) {
            var realpath = fileMap.get(path);

            if (realpath) {
              hasfile = true;
              callback(realpath, type);
            }
          }
        }

        if (hasfile == false) {
          callback(null);
        }
      });
    }
  }]);

  return Resources;
}();

Resources.mapRes = null;
Resources.mapCallback = new Array();
Resources.resTypes = new Array();
Resources.directoryPathSet = new Set(); // 将对象挂在到MiniGameAdaptor

_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].register('Resources', Resources);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFile", function() { return getFile; });
var filePathStoreKey = '@@FilePathMap_';

function getFilePath(path) {
  var filePathMap = {};
  return new Promise(function (resolve, reject) {
    wx.getStorage({
      key: filePathStoreKey,
      complete: function complete(res) {
        var store = res.data;

        if (store) {
          // 本地存在
          filePathMap = store;
          var filePath = filePathMap[path];

          if (filePath) {
            resolve(filePath);
          } else {
            // 本地不存在
            reject(filePathMap);
          }
        } else {
          // 本地不存在
          reject(filePathMap);
        }
      }
    });
  });
}

function downloadFile(path) {
  return new Promise(function (resolve, reject) {
    wx.downloadFile({
      url: "".concat(engine.settings.baseURL, "/").concat(path),
      success: function success(res) {
        if (res.statusCode === 200) {
          var tempFilePath = res.tempFilePath;

          if (tempFilePath) {
            // 下载成功
            wx.getFileSystemManager().saveFile({
              tempFilePath: tempFilePath,
              success: function success(res) {
                var savedFilePath = res.savedFilePath;
                resolve(savedFilePath);
              }
            });
          } else {
            // 下载失败
            reject(res);
          }
        } else {
          // 下载失败
          reject(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}

function saveFilePath(path, filePath, filePathMap) {
  filePathMap[path] = filePath;
  wx.setStorage({
    key: filePathStoreKey,
    data: filePathMap
  });
}
/**
@function getFile 获取远程资源文件保存到本地后的文件路径
@param {String} path 相对 engine.settings.baseURL 的文件路径，需要含后缀。
@param {function} callback 回调函数
*/

/**
@callback getFile 回调函数
@param {Object} res
@param {String} res.errMsg 成功或错误信息，'ok' 为成功，'fail' 为失败
@param {String} res.filePath 接口调用成功时返回资源文件存储到本地后的本地路径
@param {any} res.error 接口调用失败时的错误对象
*/

/**
```js
getFile('Assets/test.txt', (res) => {
  console.log(res.filePath)
})
```
*/


function getFile(path, callback) {
  getFilePath(path).then(function (filePath) {
    callback({
      filePath: filePath,
      errMsg: 'ok'
    });
  })["catch"](function (filePathMap) {
    // 本地不存在则下载文件
    return downloadFile(path).then(function (filePath) {
      saveFilePath(path, filePath, filePathMap);
      callback({
        filePath: filePath,
        errMsg: 'ok'
      });
    });
  })["catch"](function (err) {
    // 下载失败
    console.error(path + ' 获取失败', err);
    callback({
      errMsg: 'fail',
      error: err
    });
  });
}

/***/ }),
/* 45 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ContactPoint", {
    $kind: "struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.ContactPoint();
        }
      }
    },
    props: {
      normal: {
        get: function get() {
          return this._normal;
        }
      },
      otherCollider: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      point: {
        get: function get() {
          return this._point;
        }
      },
      separation: {
        get: function get() {
          return this.nativeData.separation;
        }
      },
      thisCollider: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(nativeData) {
        this.$initialize();
        this.nativeData = nativeData || {};
        this._point = new MiniGameAdaptor.Vector3.$ctor3(this.nativeData.point)._FlipX();
        this._normal = new MiniGameAdaptor.Vector3.$ctor3(this.nativeData.normal)._FlipX();
      }
    },
    methods: {
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Collision", {
    props: {
      collider: {
        get: function get() {
          return _Physx__WEBPACK_IMPORTED_MODULE_0__["nativeColliderToAdaptorColliderMap"].get(this._collider);
        }
      },
      contactCount: {
        get: function get() {
          return this._contactCount;
        }
      },
      contacts: {
        get: function get() {
          return this._contacts;
        }
      },
      gameObject: {
        get: function get() {
          return this._gameObject;
        }
      },
      impulse: {
        get: function get() {
          return new MiniGameAdaptor.Vector3.$ctor3(this._nativeData.impulse)._FlipX();
        }
      },
      relativeVelocity: {
        get: function get() {
          return new MiniGameAdaptor.Vector3.$ctor3(this._nativeData.relative_velocity)._FlipX();
        }
      },
      rigidbody: {
        get: function get() {
          return _Physx__WEBPACK_IMPORTED_MODULE_0__["nativeColliderToAdaptorColliderMap"].get(this._collider).attachedRigidbody || null;
        }
      },
      transform: {
        get: function get() {
          return this._gameObject.transform;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      },
      // 通过native创建一个Collision
      $ctor1: function $ctor1(nativeData) {
        this._nativeData = nativeData;
        this._collider = nativeData.collider;
        this._gameObject = this._collider.userData;
        this._contactCount = nativeData.contacts && this._nativeData.contacts.length || 0;
        this._contacts = nativeData.contacts.map(function (item) {
          return new MiniGameAdaptor.ContactPoint.ctor(item);
        });
      }
    },
    methods: {
      GetContact: function GetContact(index) {
        return this._contacts[index];
      },
      GetContacts: function GetContacts(contacts) {
        throw new System.Exception("not impl");
      },
      GetEnumerator: function GetEnumerator() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ForceMode", {
    $kind: "enum",
    statics: {
      fields: {
        Force: 0,
        Acceleration: 5,
        Impulse: 1,
        VelocityChange: 2
      }
    }
  });
});
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RigidbodyConstraints", {
    $kind: "enum",
    statics: {
      fields: {
        None: 0,
        FreezePositionX: 2,
        FreezePositionY: 4,
        FreezePositionZ: 8,
        FreezeRotationX: 16,
        FreezeRotationY: 32,
        FreezeRotationZ: 64,
        FreezePosition: 14,
        FreezeRotation: 112,
        FreezeAll: 126
      }
    }
  });
});
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Rigidbody", {
    inherits: [MiniGameAdaptor.Component],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          if (!data) {
            return comp;
          }

          comp.__deserializeData = data;
          return comp;
        }
      }
    },
    props: {
      angularDrag: {
        get: function get() {
          return this.nativeRigidBody.angularDamping;
        },
        set: function set(value) {
          this.nativeRigidBody.angularDamping = value;
        }
      },
      angularVelocity: {
        get: function get() {
          var RawVec3f = this.nativeRigidBody.angularVelocity;
          return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f);
        },
        set: function set(value) {
          this.nativeRigidBody.angularVelocity = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(value.x, value.y, value.z);
        }
      },
      centerOfMass: {
        get: function get() {
          var RawVec3f = this.nativeRigidBody.centerOfMass;
          return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f);
        },
        set: function set(value) {
          this.nativeRigidBody.centerOfMass = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(value.x, value.y, value.z);
        }
      },
      collisionDetectionMode: {
        get: function get() {
          return this.nativeRigidBody.collisionDetectionMode;
        },
        set: function set(value) {
          this.nativeRigidBody.collisionDetectionMode = value;
        }
      },
      constraints: {
        get: function get() {
          return this.nativeRigidBody.constraints;
        },
        set: function set(value) {
          this.nativeRigidBody.constraints = value;
        }
      },
      detectCollisions: {
        get: function get() {
          return this.nativeRigidBody.detectCollisions;
        },
        set: function set(value) {
          this.nativeRigidBody.detectCollisions = value;
        }
      },
      drag: {
        get: function get() {
          return this.nativeRigidBody.linearDamping;
        },
        set: function set(value) {
          this.nativeRigidBody.linearDamping = value;
        }
      },
      freezeRotation: {
        get: function get() {
          return this.nativeRigidBody.freezeRotation;
        },
        set: function set(value) {
          this.nativeRigidBody.freezeRotation = true;
        }
      },
      inertiaTensor: {
        get: function get() {
          var RawVec3f = this.nativeRigidBody.inertiaTensor;
          return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f);
        },
        set: function set(value) {
          this.nativeRigidBody.inertiaTensor = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(value.x, value.y, value.z);
        }
      },
      inertiaTensorRotation: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      interpolation: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isKinematic: {
        get: function get() {
          return this.nativeRigidBody.isKinematic;
        },
        set: function set(value) {
          this.nativeRigidBody.isKinematic = value;
        }
      },
      mass: {
        get: function get() {
          return this.nativeRigidBody.mass;
        },
        set: function set(value) {
          this.nativeRigidBody.mass = value;
        }
      },
      maxAngularVelocity: {
        get: function get() {
          return this.nativeRigidBody.maxAngularVelocity;
        },
        set: function set(value) {
          this.nativeRigidBody.maxAngularVelocity = value;
        }
      },
      maxDepenetrationVelocity: {
        get: function get() {
          return this.nativeRigidBody.maxDepenetrationVelocity;
        },
        set: function set(value) {
          this.nativeRigidBody.maxDepenetrationVelocity = value;
        }
      },
      position: {
        get: function get() {
          var RawVec3f = this.nativeRigidBody.position;
          return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f)._FlipX();
        },
        set: function set(value) {
          this.nativeRigidBody.position = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-value.x, value.y, value.z);
        }
      },
      rotation: {
        get: function get() {
          var rotation = this.nativeRigidBody.rotation;
          return new MiniGameAdaptor.Quaternion.$ctor3(rotation)._FlipXnW();
        },
        set: function set(value) {
          this.nativeRigidBody.rotation = value;
        }
      },
      sleepThreshold: {
        get: function get() {
          return this.nativeRigidBody.sleepThreshold;
        },
        set: function set(value) {
          this.nativeRigidBody.sleepThreshold = value;
        }
      },
      solverIterations: {
        get: function get() {
          return this.nativeRigidBody.sleepThreshold;
        },
        set: function set(value) {
          this.nativeRigidBody.sleepThreshold = value;
        }
      },
      solverVelocityIterations: {
        get: function get() {
          return this.nativeRigidBody.solverVelocityIterations;
        },
        set: function set(value) {
          this.nativeRigidBody.solverVelocityIterations = value;
        }
      },
      useGravity: {
        get: function get() {
          return this.nativeRigidBody.useGravity;
        },
        set: function set(value) {
          this.nativeRigidBody.useGravity = value;
        }
      },
      velocity: {
        get: function get() {
          var RawVec3f = this.nativeRigidBody.velocity;
          return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f);
        },
        set: function set(value) {
          this.nativeRigidBody.velocity = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(value.x, value.y, value.z);
        }
      },
      worldCenterOfMass: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Component.ctor.call(this);
      }
    },
    methods: {
      onStart: function onStart() {
        if (!this.__physInitReady) {
          this.onInstantiated();
        }
      },
      onInstantiated: function onInstantiated() {
        var _this = this;

        if (!_Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"]) {
          return;
        }
        /**
         * 在native中的Phys3D创建对应的刚体
         */


        var body = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].DynamicRigidbody(_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, 10);
        var data = this.__deserializeData;
        this.nativeRigidBody = body;
        this.gameObject.nativeRigidBody = body;
        this.nativeRigidBody.__sourceComp = this; // 设置native层物理刚体的实际位置

        var pos = this.entity.transform.worldPosition;
        this.nativeRigidBody.position = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(pos.x, pos.y, pos.z); // 直接调用AddComponent的情况没有反序列化数据

        if (data) {
          body.angularDamping = data.angularDrag;
          body.collisionDetectionMode = data.collisionDetectionMode;
          body.constraints = data.constraints;
          body.linearDamping = data.drag;
          body.isKinematic = data.isKinematic;
          body.mass = data.mass;
          body.useGravity = data.useGravity;
        } // 将entity的旋转同步到物理


        _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].syncRotation(this.entity, body); // TODO: 一个gameobject可能挂多个collider

        [MiniGameAdaptor.BoxCollider, MiniGameAdaptor.MeshCollider, MiniGameAdaptor.CapsuleCollider, MiniGameAdaptor.SphereCollider].forEach(function (colliderClass) {
          var collider = _this.getComponent(colliderClass);

          if (collider) {
            collider.nativeCollider.adaptorRigidBody = _this;
            collider.nativeCollider.attachedRigidbody = body;
          }
        });
        body.userData = this.entity;
        _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].addBody(this.nativeRigidBody);
        this.__physInitReady = true;
      },
      AddExplosionForce: function AddExplosionForce(explosionForce, explosionPosition, explosionRadius) {
        console.log('todo AddExplosionForce');
      },
      AddExplosionForce$1: function AddExplosionForce$1(explosionForce, explosionPosition, explosionRadius, upwardsModifier) {
        throw new System.Exception("not impl");
      },
      AddExplosionForce$2: function AddExplosionForce$2(explosionForce, explosionPosition, explosionRadius, upwardsModifier, mode) {
        throw new System.Exception("not impl");
      },
      AddForce: function AddForce(x, y, z) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-x, y, z);
        this.nativeRigidBody.AddForce(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddForce$1: function AddForce$1(x, y, z, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-value.x, value.y, value.z);
        this.nativeRigidBody.AddForce(RawVec3f, mode);
      },
      AddForce$2: function AddForce$2(force) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-force.x, force.y, force.z);
        this.nativeRigidBody.AddForce(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddForce$3: function AddForce$3(force, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-force.x, force.y, force.z);
        this.nativeRigidBody.AddForce(RawVec3f, mode);
      },
      AddForceAtPosition: function AddForceAtPosition(force, position) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-force.x, force.y, force.z);
        var posRawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(position.x, position.y, position.z);
        this.nativeRigidBody.AddForceAtPosition(RawVec3f, posRawVec3f, MiniGameAdaptor.ForceMode.force);
      },
      AddForceAtPosition$1: function AddForceAtPosition$1(force, position, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-force.x, force.y, force.z);
        var posRawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-position.x, position.y, position.z);
        this.nativeRigidBody.AddForceAtPosition(RawVec3f, posRawVec3f, mode);
      },
      AddRelativeForce: function AddRelativeForce(x, y, z) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-x, y, z);
        this.nativeRigidBody.AddRelativeForce(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddRelativeForce$1: function AddRelativeForce$1(x, y, z, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-x, y, z);
        this.nativeRigidBody.AddRelativeForce(RawVec3f, mode);
      },
      AddRelativeForce$2: function AddRelativeForce$2(force) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-force.x, force.y, force.z);
        this.nativeRigidBody.AddRelativeForce(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddRelativeForce$3: function AddRelativeForce$3(force, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-force.x, force.y, force.z);
        this.nativeRigidBody.AddRelativeForce(RawVec3f, mode);
      },
      AddRelativeTorque: function AddRelativeTorque(x, y, z) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-x, y, z);
        this.nativeRigidBody.AddRelativeTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddRelativeTorque$1: function AddRelativeTorque$1(x, y, z, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-x, y, z);
        this.nativeRigidBody.AddRelativeTorque(RawVec3f, mode);
      },
      AddRelativeTorque$2: function AddRelativeTorque$2(torque) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-torque.x, torque.y, torque.z);
        this.nativeRigidBody.AddRelativeTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddRelativeTorque$3: function AddRelativeTorque$3(torque, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-torque.x, torque.y, torque.z);
        this.nativeRigidBody.AddRelativeTorque(RawVec3f, mode);
      },
      AddTorque: function AddTorque(x, y, z) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-x, y, z);
        this.nativeRigidBody.AddTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddTorque$1: function AddTorque$1(x, y, z, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-x, y, z);
        this.nativeRigidBody.AddTorque(RawVec3f, mode);
      },
      AddTorque$2: function AddTorque$2(torque) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-torque.x, torque.y, torque.z);
        this.nativeRigidBody.AddTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force);
      },
      AddTorque$3: function AddTorque$3(torque, mode) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-torque.x, torque.y, torque.z);
        this.nativeRigidBody.AddTorque(RawVec3f, mode);
      },
      ClosestPointOnBounds: function ClosestPointOnBounds(position) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-position.x, position.y, position.z);
        var resRawVec3f = this.nativeRigidBody.ClosestPointOnBounds(RawVec3f);
        return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f);
      },
      GetPointVelocity: function GetPointVelocity(worldPoint) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-worldPoint.x, worldPoint.y, worldPoint.z);
        var resRawVec3f = this.nativeRigidBody.GetPointVelocity(RawVec3f);
        return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f);
      },
      GetRelativePointVelocity: function GetRelativePointVelocity(relativePoint) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-relativePoint.x, relativePoint.y, relativePoint.z);
        var resRawVec3f = this.nativeRigidBody.GetRelativePointVelocity(RawVec3f);
        return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f)._FlipX();
      },
      IsSleeping: function IsSleeping() {
        return this.nativeRigidBody.IsSleeping();
      },
      MovePosition: function MovePosition(position) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-position.x, position.y, position.z);
        this.nativeRigidBody.MovePosition(RawVec3f);
      },
      MoveRotation: function MoveRotation(rot) {
        var phys3DRot = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawQuaternion(rot.x, rot.y, rot.z, rot.w);
        this.nativeRigidBody.MoveRotation(phys3DRot); // throw new System.Exception("not impl");
      },
      ResetCenterOfMass: function ResetCenterOfMass() {
        this.nativeRigidBody.ResetCenterOfMass();
      },
      ResetInertiaTensor: function ResetInertiaTensor() {
        this.nativeRigidBody.ResetInertiaTensor();
      },
      SetDensity: function SetDensity(density) {
        this.nativeRigidBody.SetDensity(density);
      },
      Sleep: function Sleep() {
        this.nativeRigidBody.Sleep();
      },
      SweepTest: function SweepTest(direction, hitInfo) {
        throw new System.Exception("not impl");
      },
      SweepTest$1: function SweepTest$1(direction, hitInfo, maxDistance) {
        throw new System.Exception("not impl");
      },
      SweepTest$2: function SweepTest$2(direction, hitInfo, maxDistance, queryTriggerInteraction) {
        throw new System.Exception("not impl");
      },
      SweepTestAll: function SweepTestAll(direction) {
        throw new System.Exception("not impl");
      },
      SweepTestAll$1: function SweepTestAll$1(direction, maxDistance) {
        throw new System.Exception("not impl");
      },
      SweepTestAll$2: function SweepTestAll$2(direction, maxDistance, queryTriggerInteraction) {
        throw new System.Exception("not impl");
      },
      WakeUp: function WakeUp() {
        this.nativeRigidBody.WakeUp();
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Rigidbody')(MiniGameAdaptor.Rigidbody);
Object.defineProperty(MiniGameAdaptor.Rigidbody.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Rigidbody.prototype.__properties)
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.PhysicMaterialCombine", {
    $kind: "enum",
    statics: {
      fields: {
        Average: 0,
        Minimum: 2,
        Multiply: 1,
        Maximum: 3
      }
    }
  });
});
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.PhysicMaterial", {
    inherits: [MiniGameAdaptor.Object],
    props: {
      bounceCombine: {
        get: function get() {
          return this.nativeMaterial.bounceCombine;
        },
        set: function set(value) {
          this.nativeMaterial.bounceCombine = value;
        }
      },
      bounciness: {
        get: function get() {
          return this.nativeMaterial.bounciness;
        },
        set: function set(value) {
          this.nativeMaterial.bounciness = value;
        }
      },
      dynamicFriction: {
        get: function get() {
          return this.nativeMaterial.dynamicFriction;
        },
        set: function set(value) {
          this.nativeMaterial.dynamicFriction = value;
        }
      },
      frictionCombine: {
        get: function get() {
          return this.nativeMaterial.frictionCombine;
        },
        set: function set(value) {
          this.nativeMaterial.frictionCombine = value;
        }
      },
      staticFriction: {
        get: function get() {
          return this.nativeMaterial.staticFriction;
        },
        set: function set(value) {
          this.nativeMaterial.staticFriction = value;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        var instance = _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance; // https://docs.unity3d.com/Manual/class-PhysicMaterial.html

        this.nativeMaterial = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].Material(instance);
      },
      $ctor1: function $ctor1(name) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this); // https://docs.unity3d.com/Manual/class-PhysicMaterial.html

        this.nativeMaterial = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].Material(instance);
      }
    }
  });
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Collider", {
    inherits: [MiniGameAdaptor.Component],
    props: {
      attachedRigidbody: {
        get: function get() {
          return this.nativeCollider.adaptorRigidBody;
        }
      },
      bounds: {
        get: function get() {
          return this.nativeCollider.bounds;
        }
      },
      contactOffset: {
        get: function get() {
          return this.nativeCollider.contactOffset;
        },
        set: function set(value) {
          this.nativeCollider.contactOffset = value;
        }
      },
      enabled: {
        get: function get() {
          return this.nativeCollider.enabled;
        },
        set: function set(value) {
          this.nativeCollider.enabled = value;
        }
      },
      isTrigger: {
        get: function get() {
          return this.nativeCollider.isTrigger;
        },
        set: function set(value) {
          this.nativeRigidBody.isTrigger = value;
        }
      },
      material: {
        get: function get() {
          var material = this.nativeCollider.material;
          var res = new MiniGameAdaptor.PhysicMaterial();
          res.bounceCombine = material.bounceCombine;
          res.bounciness = material.bounciness;
          res.dynamicFriction = material.dynamicFriction;
          res.frictionCombine = material.frictionCombine;
          res.staticFriction = material.staticFriction;
          return res;
        },
        set: function set(value) {
          var instance = _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance;
          this.nativeCollider.material = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].Material(instance, value.dynamicFriction, value.staticFriction, value.bounciness, value.frictionCombine, value.bounceCombine);
        }
      },
      sharedMaterial: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Component.ctor.call(this);
      }
    },
    methods: {
      ClosestPoint: function ClosestPoint(position) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(position.x, position.y, position.z);
        var resRawVec3f = this.nativeCollider.ClosestPoint(RawVec3f);
        return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f.x, resRawVec3f.y, resRawVec3f.z);
      },
      ClosestPointOnBounds: function ClosestPointOnBounds(position) {
        var RawVec3f = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(position.x, position.y, position.z);
        var resRawVec3f = this.nativeCollider.ClosestPointOnBounds(RawVec3f);
        return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f.x, resRawVec3f.y, resRawVec3f.z);
      },
      Raycast: function Raycast(ray, hitInfo, maxDistance) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mesh_MeshHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * 创建Mesh是有性能开销的，不同的MeshCollider可能共用一个PhyMesh，这里加个weakmap做池
 */

var meshMap = new WeakMap();
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.MeshCollider", {
    inherits: [MiniGameAdaptor.Collider],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp) {
          comp.__deserializeData = data;
          return comp;
        }
      }
    },
    fields: {
      _convex: false,
      _cookingOptions: 1,
      _shareMesh: null
    },
    props: {
      convex: {
        get: function get() {
          return this.nativeCollider.convex;
        },
        set: function set(value) {
          this.nativeCollider.convex = value;
        }
      },
      cookingOptions: {
        get: function get() {
          return this.nativeCollider.cookingOptions;
        },
        set: function set(value) {
          this.nativeCollider.cookingOptions = value;
        }
      },
      sharedMesh: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Collider.ctor.call(this);
      }
    },
    methods: {
      onStart: function onStart() {
        if (!this.__physInitReady) {
          this.onInstantiated();
        }
      },
      onInstantiated: function onInstantiated() {
        this.__physInitReady = true;

        if (!_Physx__WEBPACK_IMPORTED_MODULE_1__["Phys3D"]) {
          return comp;
        }

        var data = this.__deserializeData || {};
        var comp = this;
        var meshId = data.mesh;
        var phyMesh = null; // 从资源管理器取Mesh数据，如果取不到，从运行时取

        var mesh = meshId && engine.loader.getAsset(meshId) || comp.entity.getComponent(engine.MeshRenderer).mesh; // 对齐Unity的error提示

        var rigidBody = comp.entity.getComponent(MiniGameAdaptor.Rigidbody);

        if (rigidBody && rigidBody.nativeRigidBody && !rigidBody.nativeRigidBody.isKinematic || rigidBody && rigidBody.__deserializeData && !rigidBody.__deserializeData.isKinematic) {
          console.error("Non-convex MeshCollider with non-kinematic Rigidbody is no longer supported since Unity 5.\nIf you want to use a non-convex mesh either make the Rigidbody kinematic or remove the Rigidbody component. ");
        }

        if (meshMap.get(mesh)) {
          phyMesh = meshMap.get(mesh);
        } else {
          phyMesh = new _Physx__WEBPACK_IMPORTED_MODULE_1__["Phys3D"].PhysMesh(_Physx__WEBPACK_IMPORTED_MODULE_1__["physx"].Phys3dInstance);

          var _buffer = mesh._getRawVertexBuffer();

          var _vertexLayout = mesh._vertexLayout;

          var _getPointBuffer = Object(_Mesh_MeshHelper_js__WEBPACK_IMPORTED_MODULE_0__["getPointBuffer"])(_buffer, _vertexLayout),
              newBuffer = _getPointBuffer.newBuffer,
              verticesCount = _getPointBuffer.verticesCount; // 三角形数据


          var triangles = mesh._getRawIndiceBuffer();

          phyMesh.SetVertices(newBuffer, verticesCount); // 客户端特殊处理，传第三个参数支持为支持uint16的情况

          phyMesh.SetTriangles(triangles, triangles.length / 3, true);
          meshMap.set(mesh, phyMesh);
        }

        comp.nativeCollider = new _Physx__WEBPACK_IMPORTED_MODULE_1__["Phys3D"].MeshCollider(_Physx__WEBPACK_IMPORTED_MODULE_1__["physx"].Phys3dInstance, data.convex || true, data.cookingOptions || 14, phyMesh);
        var scale = comp.transform.localScale;
        comp.nativeCollider.scale = new _Physx__WEBPACK_IMPORTED_MODULE_1__["Phys3D"].RawVec3f(scale.x, scale.y, scale.z);
        var hasRigidBody = !!comp.getComponent(MiniGameAdaptor.Rigidbody); // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞

        if (!hasRigidBody) {
          _Physx__WEBPACK_IMPORTED_MODULE_1__["physx"].addStaticBodyForCollider(comp);
        } // 为collider绑定事件


        Object(_Physx__WEBPACK_IMPORTED_MODULE_1__["bindEventForCollider"])(comp.nativeCollider, comp.gameObject);
        _Physx__WEBPACK_IMPORTED_MODULE_1__["nativeColliderToAdaptorColliderMap"].set(comp.nativeCollider, comp);
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.MeshCollider')(MiniGameAdaptor.MeshCollider);
Object.defineProperty(MiniGameAdaptor.MeshCollider.prototype, '__properties', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.MeshCollider.prototype.__properties)
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumVertexLayoutUsage", function() { return EnumVertexLayoutUsage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumVertexFormat", function() { return EnumVertexFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPointDataByUsage", function() { return getPointDataByUsage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WXMeshVertexLayout", function() { return WXMeshVertexLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEngineMesh", function() { return createEngineMesh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPointBuffer", function() { return getPointBuffer; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EnumVertexLayoutUsage = {
  CUSTOM: 0,
  POSITION: 1,
  NORMAL: 2,
  TANGENT: 3,
  UV0: 4,
  UV1: 5,
  UV2: 6,
  COLOR: 7,
  BONEINDEX: 8,
  BONEWEIGHT: 9
};
var EnumVertexFormat = {
  INVALID: 0,
  FLOAT: 1,
  FLOAT2: 2,
  FLOAT3: 3,
  FLOAT4: 4,
  BYTE4: 5,
  BYTE4N: 6,
  UBYTE4: 7,
  UBYTE4N: 8,
  SHORT2: 9,
  SHORT2N: 10,
  SHORT4: 11,
  SHORT4N: 12,
  UINT10_N2: 13
};

function getPointBuffer(buffer, vertexLayout) {
  if (!buffer) {
    console.log('buffer is not exist!');
  }

  var stride = vertexLayout.stride / 4;
  var config = vertexLayout.getConfigByUsage(EnumVertexLayoutUsage.POSITION);
  var offset = config.offset / 4;
  var verticesCount = buffer.length / stride; // 一个顶点为float x y z组成，每个属性占4个字节，总共12个字节

  var newBuffer = new Float32Array(verticesCount * 3); // 遍历自研引擎Mesh的buffer数据，将顶点信息取出，存到一个新的Uint8Array里面

  for (var i = 0; i < verticesCount; i++) {
    for (var j = 0; j < 3; j++) {
      newBuffer[i * 3 + j] = buffer[j + i * stride + offset];
    }
  }

  return {
    newBuffer: newBuffer,
    verticesCount: verticesCount
  };
}

function getPointDataByUsage(buffer, vertexLayout, usage) {
  if (!buffer) {
    console.log('buffer is not exist!');
    return [];
  }

  var stride = vertexLayout.stride / 4;
  var config = vertexLayout.getConfigByUsage(usage);
  var offset = config.offset / 4;
  var verticesCount = buffer.length / stride;
  var res = [];
  var start;

  for (var i = 0; i < verticesCount; i++) {
    start = i * stride + offset;

    if (usage === EnumVertexLayoutUsage.POSITION || usage === EnumVertexLayoutUsage.NORMAL) {
      res.push(new MiniGameAdaptor.Vector3.$ctor2(buffer[start], buffer[start + 1], buffer[start + 2])._FlipX());
    } else if (usage === EnumVertexLayoutUsage.UV0) {
      // 与导出插件相反操作
      // wxFileUtil.WriteData(fileStream, vector3.x, vector3.y * -1f + 1f);
      res.push(new MiniGameAdaptor.Vector2.$ctor1(buffer[start], (buffer[start + 1] - 1) * -1));
    } else if (usage === EnumVertexLayoutUsage.TANGENT) {
      res.push(new MiniGameAdaptor.Vector4.$ctor3(buffer[start], buffer[start + 1], buffer[start + 2], buffer[start + 3])._FlipX());
    }
  }

  return res;
}

var WXMeshVertexLayout = /*#__PURE__*/function () {
  function WXMeshVertexLayout(mesh) {
    _classCallCheck(this, WXMeshVertexLayout);

    this.POSITION = false;
    this.NORMAL = false;
    this.COLOR = false;
    this.UV = false;
    this.UV1 = false;
    this.TANGENT = false;
    this.BONE = false;
    this.layoutSize = 0;

    if (mesh.vertices != null && mesh.vertices.length != 0) {
      this.POSITION = true;
      this.layoutSize += 12;
    }

    if (mesh.normals != null && mesh.normals.length != 0) {
      this.NORMAL = true;
      this.layoutSize += 12;
    }

    if (mesh.colors != null && mesh.colors.length != 0) {
      this.COLOR = true;
      this.layoutSize += 16;
    }

    if (mesh.uv != null && mesh.uv.length != 0) {
      this.UV = true;
      this.layoutSize += 8;
    }

    if (mesh.uv2 != null && mesh.uv2.length != 0) {
      this.UV1 = true;
      this.layoutSize += 8;
    }

    if (mesh.boneWeights != null && mesh.boneWeights.length != 0) {
      this.BONE = true;
      this.layoutSize += 32;
    }

    if (mesh.tangents != null && mesh.tangents.length != 0) {
      this.TANGENT = true;
      this.layoutSize += 16;
    }
  }

  _createClass(WXMeshVertexLayout, [{
    key: "GetLayoutString",
    value: function GetLayoutString() {
      var layout = [];

      if (this.POSITION) {
        layout.push("POSITION");
      }

      if (this.NORMAL) {
        layout.push("NORMAL");
      }

      if (this.COLOR) {
        layout.push("COLOR");
      }

      if (this.UV) {
        layout.push("UV");
      }

      if (this.UV1) {
        layout.push("UV1");
      }

      if (this.BONE) {
        layout.push("BLENDWEIGHT,BLENDINDICES");
      }

      if (this.TANGENT) {
        layout.push("TANGENT");
      }

      return layout.join(',');
    }
  }]);

  return WXMeshVertexLayout;
}();

function createEngineMesh(mesh) {
  var vertexLayout = new WXMeshVertexLayout(mesh);
  var vertexStart = 0;
  var vertexLength = vertexLayout.layoutSize * mesh.vertexCount;
  var indiceStart = vertexLength;
  var indiceLength = mesh.triangles.length * 2;
  var array = new Float32Array(mesh.vertexCount * vertexLayout.layoutSize / 4);
  var start = 0;

  for (var i = 0; i < mesh.vertexCount; i++) {
    var vector = mesh.vertices[i];
    array[start++] = -vector.x;
    array[start++] = vector.y;
    array[start++] = vector.z;

    if (vertexLayout.NORMAL) {
      var vector2 = mesh.normals[i];
      array[start++] = vector2.x;
      array[start++] = vector2.y;
      array[start++] = vector2.z;
    } // 如果vertexLayout有color，写入color


    if (vertexLayout.COLOR) {
      var color = mesh.colors[i];
    } // 如果vertexLayout有uv，写入uv


    if (vertexLayout.UV) {
      var vector3 = mesh.uv[i];
      array[start++] = vector3.x;
      array[start++] = vector3.y * -1 + 1;
    } // 如果vertexLayout有uv1，写入uv1


    if (vertexLayout.UV1) {
      var vector4 = mesh.uv2[i];
      array[start++] = vector4.x;
      array[start++] = vector4.y * -1 + 1;
    } // 如果vertexLayout有tangent，写入tangent


    if (vertexLayout.TANGENT) {
      var vector5 = mesh.tangents[i];
      array[start++] = -vector5.x;
      array[start++] = vector5.y;
      array[start++] = vector5.z;
      array[start++] = vector5.w;
    }
  } // 将Float32Array转成Uint8Array


  var buffer = new ArrayBuffer(array.byteLength);
  var floatView = new Float32Array(buffer).set(array);
  var byteView = new Uint8Array(buffer);
  var indiceArray = new Uint16Array(mesh.triangles.length || 0);
  /*const indicebuffer = new ArrayBuffer(indiceArray.byteLength);
  const indicefloatView = new Uint16Array(indicebuffer).set(indiceArray);
  const indicebyteView = new Uint8Array(indicebuffer);*/

  var iStart = 0;
  mesh.triangles.forEach(function (item) {
    indiceArray[iStart++] = item;
  });
  var capsule = {
    x: 1,
    y: 1,
    z: 1,
    radius: 0.5
  };
  var metadata = {
    indiceFormat: 1,
    vertexLayout: vertexLayout.GetLayoutString(),
    vertexStart: 0,
    vertexLength: vertexLength,
    indiceStart: indiceStart,
    indiceLength: indiceLength,
    capsule: capsule,
    version: 1,
    boundBox: {
      center: [1, 1, 1],
      size: [1, 1, 1]
    },
    subMeshs: [{
      start: 0,
      length: 852
    }]
  };
  var engineVertexLayout = engine.buildInVertexLayoutFactory3D.getVertexLayout(metadata.vertexLayout);
  var engineMesh = engine.Mesh.createFromDynamicArrayBuffer(engineVertexLayout, array.buffer, indiceArray.buffer);
  mesh.engineMesh = engineMesh;
  mesh.ref = engineMesh;
  var radius = 1;

  engineMesh._setBoundBall(engine.Vector3.ZERO, 1);

  if (mesh._subMeshs && mesh._subMeshs.length) {
    mesh._subMeshs.forEach(function (item) {
      engineMesh._addSubMesh(item.length, item.offset);
    });
  }

  return engineMesh;
}



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.BoxCollider", {
    inherits: [MiniGameAdaptor.Collider],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp) {
          if (typeof data === "number") {
            return comp;
          } // 这里兼容不支持native物理引擎的情况


          if (!_Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"]) {
            return comp;
          }

          var instance = _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance;
          var entity = comp.entity;
          var pos = entity.transform.position;
          var collider = comp.nativeCollider;
          var scale = comp.transform.localScale;
          collider.center = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(data.center[0], data.center[1], data.center[2]);
          collider.isTrigger = data.isTrigger; // collider的scale要和GameObject本身的scale保持一致

          collider.size = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(data.size[0] * scale.x || 0.00001, data.size[1] * scale.y || 0.00001, data.size[2] * scale.z || 0.00001); // 设置material信息
          // TODO: share

          var materialData = data.material || {};
          collider.material = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].Material(_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, materialData.dynamicFriction, materialData.staticFriction, materialData.bounciness, materialData.frictionCombine, materialData.bounceCombine);
          var hasRigidBody = comp.getComponent(MiniGameAdaptor.Rigidbody); // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞

          if (!hasRigidBody && _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"]) {
            _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].addStaticBodyForCollider(comp);
          } // 为collider绑定事件


          Object(_Physx__WEBPACK_IMPORTED_MODULE_0__["bindEventForCollider"])(comp.nativeCollider, comp.gameObject);
          _Physx__WEBPACK_IMPORTED_MODULE_0__["nativeColliderToAdaptorColliderMap"].set(comp.nativeCollider, comp);
          return comp;
        }
      }
    },
    fields: {
      _isTrigger: false,
      _center: null,
      _size: null
    },
    props: {
      isTrigger: {
        get: function get() {
          return this.nativeCollider.isTrigger;
        },
        set: function set(value) {
          this.nativeRigidBody.isTrigger = value;
        }
      },
      center: {
        get: function get() {
          var center = this.nativeCollider.center;
          return new MiniGameAdaptor.Vector3.$ctor3(center.x, center.y, center.z);
        },
        set: function set(value) {
          this.nativeCollider.center = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(value.x, value.y, value.z);
        }
      },
      size: {
        get: function get() {
          var size = this.nativeCollider.size;
          return new MiniGameAdaptor.Vector3.$ctor3(size.x, size.y, size.z);
        },
        set: function set(value) {
          this.nativeCollider.size = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(value.x, value.y, value.z);
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Collider.ctor.call(this);

        if (_Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"]) {
          var physCenter = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(0, 0, 0);
          var physSize = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(1, 1, 1);
          this.nativeCollider = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].BoxCollider(_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, physCenter, physSize);
        }
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.BoxCollider')(MiniGameAdaptor.BoxCollider);
Object.defineProperty(MiniGameAdaptor.BoxCollider.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.BoxCollider.prototype.__properties)
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.SphereCollider", {
    inherits: [MiniGameAdaptor.Collider],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp) {
          if (typeof data === "number") {
            return comp;
          }

          var instance = _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance;
          var entity = comp.entity;
          var scale = comp.transform.localScale;
          var center = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(data.center[0], data.center[1], data.center[2]);
          comp.nativeCollider = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].SphereCollider(_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, center, data.radius);
          comp.nativeCollider.isTrigger = data.isTrigger; // 设置material信息

          var materialData = data.material || {};
          comp.nativeCollider.material = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].Material(_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, materialData.dynamicFriction, materialData.staticFriction, materialData.bounciness, materialData.frictionCombine, materialData.bounceCombine);
          comp.nativeCollider.scale = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(scale.x, scale.y, scale.z);
          comp.isTrigger = data.isTrigger;
          var hasRigidBody = comp.getComponent(MiniGameAdaptor.Rigidbody); // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞

          if (!hasRigidBody) {
            _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].addStaticBodyForCollider(comp);
          } // 为collider绑定事件


          Object(_Physx__WEBPACK_IMPORTED_MODULE_0__["bindEventForCollider"])(comp.nativeCollider, comp.gameObject);
          _Physx__WEBPACK_IMPORTED_MODULE_0__["nativeColliderToAdaptorColliderMap"].set(comp.nativeCollider, comp);
          return comp;
        }
      }
    },
    fields: {
      _isTrigger: false,
      _center: null,
      _radius: 0
    },
    props: {
      isTrigger: {
        get: function get() {
          return this.nativeCollider.isTrigger;
        },
        set: function set(value) {
          this.nativeCollider.isTrigger = value;
        }
      },
      center: {
        get: function get() {
          var RawVec3f = this.nativeCollider.center;
          return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f)._FlipX();
        },
        set: function set(value) {
          this.nativeCollider.center = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-value.x, value.y, value.z);
        }
      },
      radius: {
        get: function get() {
          return this.nativeCollider.radius;
        },
        set: function set(value) {
          this.nativeCollider.radius = value;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Collider.ctor.call(this);
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.SphereCollider')(MiniGameAdaptor.SphereCollider);
Object.defineProperty(MiniGameAdaptor.SphereCollider.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.SphereCollider.prototype.__properties)
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.CapsuleCollider", {
    inherits: [MiniGameAdaptor.Collider],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp) {
          if (typeof data === "number") {
            return comp;
          }

          console.log(data);
          var instance = _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance;
          var entity = comp.entity;
          var scale = comp.transform.localScale;
          var center = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(data.center[0], data.center[1], data.center[2]);
          comp.nativeCollider = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].CapsuleCollider(_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, center, data.height, data.radius);
          comp.nativeCollider.direction = data.direction; // 设置material信息

          var materialData = data.material || {};
          comp.nativeCollider.material = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].Material(_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, materialData.dynamicFriction, materialData.staticFriction, materialData.bounciness, materialData.frictionCombine, materialData.bounceCombine);
          comp.isTrigger = data.isTrigger;
          var hasRigidBody = comp.getComponent(MiniGameAdaptor.Rigidbody);
          comp.nativeCollider.scale = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(scale.x, scale.y, scale.z); // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞

          if (!hasRigidBody) {
            _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].addStaticBodyForCollider(comp);
          } // 为collider绑定事件


          Object(_Physx__WEBPACK_IMPORTED_MODULE_0__["bindEventForCollider"])(comp.nativeCollider, comp.gameObject);
          _Physx__WEBPACK_IMPORTED_MODULE_0__["nativeColliderToAdaptorColliderMap"].set(comp.nativeCollider, comp);
          return comp;
        }
      }
    },
    fields: {
      _isTrigger: false,
      _center: null,
      _radius: 0,
      _height: 0,
      _direction: 1
    },
    props: {
      isTrigger: {
        get: function get() {
          return this.nativeCollider.isTrigger;
        },
        set: function set(value) {
          this.nativeCollider.isTrigger = value;
        }
      },
      center: {
        get: function get() {
          var RawVec3f = this.nativeCollider.center;
          return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f)._FlipX();
        },
        set: function set(value) {
          this.nativeCollider.center = new _Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-value.x, value.y, value.z);
        }
      },
      radius: {
        get: function get() {
          return this.nativeCollider.radius;
        },
        set: function set(value) {
          this.nativeCollider.radius = value;
        }
      },
      height: {
        get: function get() {
          return this.nativeCollider.height;
        },
        set: function set(value) {
          this.nativeCollider.height = value;
        }
      },
      direction: {
        get: function get() {
          return this.nativeCollider.direction;
        },
        set: function set(value) {
          this.nativeCollider.direction = value;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Collider.ctor.call(this);
      }
    },
    methods: {}
  });
});
engine.decorators.serialize('MiniGameAdaptor.CapsuleCollider')(MiniGameAdaptor.CapsuleCollider);
Object.defineProperty(MiniGameAdaptor.CapsuleCollider.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.CapsuleCollider.prototype.__properties)
});

/***/ }),
/* 55 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RaycastHit", {
    $kind: "struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.RaycastHit();
        }
      }
    },
    props: {
      barycentricCoordinate: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      collider: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      distance: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      lightmapCoord: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      normal: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      point: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rigidbody: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      textureCoord: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      textureCoord2: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      transform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      triangleIndex: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);

var autoSimulation = true;
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Physics", {
    statics: {
      fields: {
        IgnoreRaycastLayer: 0,
        DefaultRaycastLayers: 0,
        AllLayers: 0
      },
      props: {
        autoSimulation: {
          get: function get() {
            return autoSimulation;
          },
          set: function set(value) {
            autoSimulation = value;
          }
        },
        autoSyncTransforms: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        bounceThreshold: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        defaultContactOffset: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        defaultPhysicsScene: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        defaultSolverIterations: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        defaultSolverVelocityIterations: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        gravity: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            // let instance = Physx.getInstance();
            throw new System.Exception("not impl");
          }
        },
        interCollisionDistance: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        interCollisionSettingsToggle: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        interCollisionStiffness: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        queriesHitBackfaces: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        queriesHitTriggers: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        reuseCollisionCallbacks: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        sleepThreshold: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        }
      },
      ctors: {
        init: function init() {
          this.IgnoreRaycastLayer = 4;
          this.DefaultRaycastLayers = -5;
          this.AllLayers = -1;
        }
      },
      methods: {
        BoxCast: function BoxCast(center, halfExtents, direction) {
          throw new System.Exception("not impl");
        },
        BoxCast$1: function BoxCast$1(center, halfExtents, direction, orientation) {
          throw new System.Exception("not impl");
        },
        BoxCast$2: function BoxCast$2(center, halfExtents, direction, orientation, maxDistance) {
          throw new System.Exception("not impl");
        },
        BoxCast$3: function BoxCast$3(center, halfExtents, direction, orientation, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        BoxCast$4: function BoxCast$4(center, halfExtents, direction, orientation, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        BoxCast$5: function BoxCast$5(center, halfExtents, direction, hitInfo) {
          throw new System.Exception("not impl");
        },
        BoxCast$6: function BoxCast$6(center, halfExtents, direction, hitInfo, orientation) {
          throw new System.Exception("not impl");
        },
        BoxCast$7: function BoxCast$7(center, halfExtents, direction, hitInfo, orientation, maxDistance) {
          throw new System.Exception("not impl");
        },
        BoxCast$8: function BoxCast$8(center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        BoxCast$9: function BoxCast$9(center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        BoxCastAll: function BoxCastAll(center, halfExtents, direction) {
          throw new System.Exception("not impl");
        },
        BoxCastAll$1: function BoxCastAll$1(center, halfExtents, direction, orientation) {
          throw new System.Exception("not impl");
        },
        BoxCastAll$2: function BoxCastAll$2(center, halfExtents, direction, orientation, maxDistance) {
          throw new System.Exception("not impl");
        },
        BoxCastAll$3: function BoxCastAll$3(center, halfExtents, direction, orientation, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        BoxCastAll$4: function BoxCastAll$4(center, halfExtents, direction, orientation, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        BoxCastNonAlloc: function BoxCastNonAlloc(center, halfExtents, direction, results) {
          throw new System.Exception("not impl");
        },
        BoxCastNonAlloc$1: function BoxCastNonAlloc$1(center, halfExtents, direction, results, orientation) {
          throw new System.Exception("not impl");
        },
        BoxCastNonAlloc$2: function BoxCastNonAlloc$2(center, halfExtents, direction, results, orientation, maxDistance) {
          throw new System.Exception("not impl");
        },
        BoxCastNonAlloc$3: function BoxCastNonAlloc$3(center, halfExtents, direction, results, orientation, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        BoxCastNonAlloc$4: function BoxCastNonAlloc$4(center, halfExtents, direction, results, orientation, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        CapsuleCast: function CapsuleCast(point1, point2, radius, direction) {
          throw new System.Exception("not impl");
        },
        CapsuleCast$1: function CapsuleCast$1(point1, point2, radius, direction, maxDistance) {
          throw new System.Exception("not impl");
        },
        CapsuleCast$2: function CapsuleCast$2(point1, point2, radius, direction, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        CapsuleCast$3: function CapsuleCast$3(point1, point2, radius, direction, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        CapsuleCast$4: function CapsuleCast$4(point1, point2, radius, direction, hitInfo) {
          throw new System.Exception("not impl");
        },
        CapsuleCast$5: function CapsuleCast$5(point1, point2, radius, direction, hitInfo, maxDistance) {
          throw new System.Exception("not impl");
        },
        CapsuleCast$6: function CapsuleCast$6(point1, point2, radius, direction, hitInfo, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        CapsuleCast$7: function CapsuleCast$7(point1, point2, radius, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        CapsuleCastAll: function CapsuleCastAll(point1, point2, radius, direction) {
          throw new System.Exception("not impl");
        },
        CapsuleCastAll$1: function CapsuleCastAll$1(point1, point2, radius, direction, maxDistance) {
          throw new System.Exception("not impl");
        },
        CapsuleCastAll$2: function CapsuleCastAll$2(point1, point2, radius, direction, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        CapsuleCastAll$3: function CapsuleCastAll$3(point1, point2, radius, direction, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        CapsuleCastNonAlloc: function CapsuleCastNonAlloc(point1, point2, radius, direction, results) {
          throw new System.Exception("not impl");
        },
        CapsuleCastNonAlloc$1: function CapsuleCastNonAlloc$1(point1, point2, radius, direction, results, maxDistance) {
          throw new System.Exception("not impl");
        },
        CapsuleCastNonAlloc$2: function CapsuleCastNonAlloc$2(point1, point2, radius, direction, results, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        CapsuleCastNonAlloc$3: function CapsuleCastNonAlloc$3(point1, point2, radius, direction, results, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        CheckBox: function CheckBox(center, halfExtents) {
          throw new System.Exception("not impl");
        },
        CheckBox$1: function CheckBox$1(center, halfExtents, orientation) {
          throw new System.Exception("not impl");
        },
        CheckBox$2: function CheckBox$2(center, halfExtents, orientation, layerMask) {
          throw new System.Exception("not impl");
        },
        CheckBox$3: function CheckBox$3(center, halfExtents, orientation, layermask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        CheckCapsule: function CheckCapsule(start, end, radius) {
          throw new System.Exception("not impl");
        },
        CheckCapsule$1: function CheckCapsule$1(start, end, radius, layerMask) {
          throw new System.Exception("not impl");
        },
        CheckCapsule$2: function CheckCapsule$2(start, end, radius, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        CheckSphere: function CheckSphere(position, radius) {
          throw new System.Exception("not impl");
        },
        CheckSphere$1: function CheckSphere$1(position, radius, layerMask) {
          throw new System.Exception("not impl");
        },
        CheckSphere$2: function CheckSphere$2(position, radius, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        ClosestPoint: function ClosestPoint(point, collider, position, rotation) {
          throw new System.Exception("not impl");
        },
        ComputePenetration: function ComputePenetration(colliderA, positionA, rotationA, colliderB, positionB, rotationB, direction, distance) {
          throw new System.Exception("not impl");
        },
        GetIgnoreLayerCollision: function GetIgnoreLayerCollision(layer1, layer2) {
          throw new System.Exception("not impl");
        },
        IgnoreCollision: function IgnoreCollision(collider1, collider2) {
          throw new System.Exception("not impl");
        },
        IgnoreCollision$1: function IgnoreCollision$1(collider1, collider2, ignore) {
          throw new System.Exception("not impl");
        },
        IgnoreLayerCollision: function IgnoreLayerCollision(layer1, layer2) {
          throw new System.Exception("not impl");
        },
        IgnoreLayerCollision$1: function IgnoreLayerCollision$1(layer1, layer2, ignore) {
          throw new System.Exception("not impl");
        },
        Linecast: function Linecast(start, end) {
          throw new System.Exception("not impl");
        },
        Linecast$1: function Linecast$1(start, end, layerMask) {
          throw new System.Exception("not impl");
        },
        Linecast$2: function Linecast$2(start, end, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        Linecast$3: function Linecast$3(start, end, hitInfo) {
          throw new System.Exception("not impl");
        },
        Linecast$4: function Linecast$4(start, end, hitInfo, layerMask) {
          throw new System.Exception("not impl");
        },
        Linecast$5: function Linecast$5(start, end, hitInfo, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        OverlapBox: function OverlapBox(center, halfExtents) {
          throw new System.Exception("not impl");
        },
        OverlapBox$1: function OverlapBox$1(center, halfExtents, orientation) {
          throw new System.Exception("not impl");
        },
        OverlapBox$2: function OverlapBox$2(center, halfExtents, orientation, layerMask) {
          throw new System.Exception("not impl");
        },
        OverlapBox$3: function OverlapBox$3(center, halfExtents, orientation, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        OverlapBoxNonAlloc: function OverlapBoxNonAlloc(center, halfExtents, results) {
          throw new System.Exception("not impl");
        },
        OverlapBoxNonAlloc$1: function OverlapBoxNonAlloc$1(center, halfExtents, results, orientation) {
          throw new System.Exception("not impl");
        },
        OverlapBoxNonAlloc$2: function OverlapBoxNonAlloc$2(center, halfExtents, results, orientation, mask) {
          throw new System.Exception("not impl");
        },
        OverlapBoxNonAlloc$3: function OverlapBoxNonAlloc$3(center, halfExtents, results, orientation, mask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        OverlapCapsule: function OverlapCapsule(point0, point1, radius) {
          throw new System.Exception("not impl");
        },
        OverlapCapsule$1: function OverlapCapsule$1(point0, point1, radius, layerMask) {
          throw new System.Exception("not impl");
        },
        OverlapCapsule$2: function OverlapCapsule$2(point0, point1, radius, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        OverlapCapsuleNonAlloc: function OverlapCapsuleNonAlloc(point0, point1, radius, results) {
          throw new System.Exception("not impl");
        },
        OverlapCapsuleNonAlloc$1: function OverlapCapsuleNonAlloc$1(point0, point1, radius, results, layerMask) {
          throw new System.Exception("not impl");
        },
        OverlapCapsuleNonAlloc$2: function OverlapCapsuleNonAlloc$2(point0, point1, radius, results, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        OverlapSphere: function OverlapSphere(position, radius) {
          throw new System.Exception("not impl");
        },
        OverlapSphere$1: function OverlapSphere$1(position, radius, layerMask) {
          throw new System.Exception("not impl");
        },
        OverlapSphere$2: function OverlapSphere$2(position, radius, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        OverlapSphereNonAlloc: function OverlapSphereNonAlloc(position, radius, results) {
          throw new System.Exception("not impl");
        },
        OverlapSphereNonAlloc$1: function OverlapSphereNonAlloc$1(position, radius, results, layerMask) {
          throw new System.Exception("not impl");
        },
        OverlapSphereNonAlloc$2: function OverlapSphereNonAlloc$2(position, radius, results, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        Raycast: function Raycast(ray) {
          throw new System.Exception("not impl");
        },
        Raycast$1: function Raycast$1(ray, maxDistance) {
          throw new System.Exception("not impl");
        },
        Raycast$2: function Raycast$2(ray, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        Raycast$3: function Raycast$3(ray, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        Raycast$4: function Raycast$4(ray, hitInfo) {
          throw new System.Exception("not impl");
        },
        Raycast$5: function Raycast$5(ray, hitInfo, maxDistance) {
          throw new System.Exception("not impl");
        },
        Raycast$6: function Raycast$6(ray, hitInfo, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        Raycast$7: function Raycast$7(ray, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        Raycast$8: function Raycast$8(origin, direction) {
          throw new System.Exception("not impl");
        },
        Raycast$9: function Raycast$9(origin, direction, maxDistance) {
          throw new System.Exception("not impl");
        },
        Raycast$10: function Raycast$10(origin, direction, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        Raycast$11: function Raycast$11(origin, direction, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        Raycast$12: function Raycast$12(origin, direction, hitInfo) {
          throw new System.Exception("not impl");
        },
        Raycast$13: function Raycast$13(origin, direction, hitInfo, maxDistance) {
          throw new System.Exception("not impl");
        },
        Raycast$14: function Raycast$14(origin, direction, hitInfo, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        Raycast$15: function Raycast$15(origin, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        RaycastAll: function RaycastAll(ray) {
          throw new System.Exception("not impl");
        },
        RaycastAll$1: function RaycastAll$1(ray, maxDistance) {
          throw new System.Exception("not impl");
        },
        RaycastAll$2: function RaycastAll$2(ray, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        RaycastAll$3: function RaycastAll$3(ray, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        RaycastAll$4: function RaycastAll$4(origin, direction) {
          throw new System.Exception("not impl");
        },
        RaycastAll$5: function RaycastAll$5(origin, direction, maxDistance) {
          throw new System.Exception("not impl");
        },
        RaycastAll$6: function RaycastAll$6(origin, direction, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        RaycastAll$7: function RaycastAll$7(origin, direction, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc: function RaycastNonAlloc(ray, results) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc$1: function RaycastNonAlloc$1(ray, results, maxDistance) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc$2: function RaycastNonAlloc$2(ray, results, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc$3: function RaycastNonAlloc$3(ray, results, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc$4: function RaycastNonAlloc$4(origin, direction, results) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc$5: function RaycastNonAlloc$5(origin, direction, results, maxDistance) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc$6: function RaycastNonAlloc$6(origin, direction, results, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        RaycastNonAlloc$7: function RaycastNonAlloc$7(origin, direction, results, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        RebuildBroadphaseRegions: function RebuildBroadphaseRegions(worldBounds, subdivisions) {
          throw new System.Exception("not impl");
        },
        Simulate: function Simulate(step) {
          _Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].simulate(step);
        },
        SphereCast: function SphereCast(ray, radius) {
          throw new System.Exception("not impl");
        },
        SphereCast$1: function SphereCast$1(ray, radius, maxDistance) {
          throw new System.Exception("not impl");
        },
        SphereCast$2: function SphereCast$2(ray, radius, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        SphereCast$3: function SphereCast$3(ray, radius, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        SphereCast$4: function SphereCast$4(ray, radius, hitInfo) {
          throw new System.Exception("not impl");
        },
        SphereCast$5: function SphereCast$5(ray, radius, hitInfo, maxDistance) {
          throw new System.Exception("not impl");
        },
        SphereCast$6: function SphereCast$6(ray, radius, hitInfo, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        SphereCast$7: function SphereCast$7(ray, radius, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        SphereCast$8: function SphereCast$8(origin, radius, direction, hitInfo) {
          throw new System.Exception("not impl");
        },
        SphereCast$9: function SphereCast$9(origin, radius, direction, hitInfo, maxDistance) {
          throw new System.Exception("not impl");
        },
        SphereCast$10: function SphereCast$10(origin, radius, direction, hitInfo, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        SphereCast$11: function SphereCast$11(origin, radius, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        SphereCastAll: function SphereCastAll(ray, radius) {
          throw new System.Exception("not impl");
        },
        SphereCastAll$1: function SphereCastAll$1(ray, radius, maxDistance) {
          throw new System.Exception("not impl");
        },
        SphereCastAll$2: function SphereCastAll$2(ray, radius, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        SphereCastAll$3: function SphereCastAll$3(ray, radius, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        SphereCastAll$4: function SphereCastAll$4(origin, radius, direction) {
          throw new System.Exception("not impl");
        },
        SphereCastAll$5: function SphereCastAll$5(origin, radius, direction, maxDistance) {
          throw new System.Exception("not impl");
        },
        SphereCastAll$6: function SphereCastAll$6(origin, radius, direction, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        SphereCastAll$7: function SphereCastAll$7(origin, radius, direction, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc: function SphereCastNonAlloc(ray, radius, results) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc$1: function SphereCastNonAlloc$1(ray, radius, results, maxDistance) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc$2: function SphereCastNonAlloc$2(ray, radius, results, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc$3: function SphereCastNonAlloc$3(ray, radius, results, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc$4: function SphereCastNonAlloc$4(origin, radius, direction, results) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc$5: function SphereCastNonAlloc$5(origin, radius, direction, results, maxDistance) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc$6: function SphereCastNonAlloc$6(origin, radius, direction, results, maxDistance, layerMask) {
          throw new System.Exception("not impl");
        },
        SphereCastNonAlloc$7: function SphereCastNonAlloc$7(origin, radius, direction, results, maxDistance, layerMask, queryTriggerInteraction) {
          throw new System.Exception("not impl");
        },
        SyncTransforms: function SyncTransforms() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 57 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ISerializationCallbackReceiver", {
    $kind: "interface"
  });
});

/***/ }),
/* 58 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Events.UnityEventCallState", {
    $kind: "enum",
    statics: {
      fields: {
        Off: 0,
        EditorAndRuntime: 1,
        RuntimeOnly: 2
      }
    }
  });
});

/***/ }),
/* 59 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Events.UnityEventBase", {
    inherits: [MiniGameAdaptor.ISerializationCallbackReceiver],
    statics: {
      methods: {
        GetValidMethodInfo: function GetValidMethodInfo(obj, functionName, argumentTypes) {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      GetPersistentEventCount: function GetPersistentEventCount() {
        throw new System.Exception("not impl");
      },
      GetPersistentMethodName: function GetPersistentMethodName(index) {
        throw new System.Exception("not impl");
      },
      GetPersistentTarget: function GetPersistentTarget(index) {
        throw new System.Exception("not impl");
      },
      RemoveAllListeners: function RemoveAllListeners() {
        throw new System.Exception("not impl");
      },
      SetPersistentListenerState: function SetPersistentListenerState(index, state) {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$ISerializationCallbackReceiver$OnAfterDeserialize: function MiniGameAdaptor$ISerializationCallbackReceiver$OnAfterDeserialize() {
        throw new System.Exception("Exception");
      },
      MiniGameAdaptor$ISerializationCallbackReceiver$OnBeforeSerialize: function MiniGameAdaptor$ISerializationCallbackReceiver$OnBeforeSerialize() {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 60 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Events.UnityEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEventBase],
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEventBase.ctor.call(this);
        throw new System.Exception("not impl");
      }
    },
    methods: {
      AddListener: function AddListener(call) {
        throw new System.Exception("not impl");
      },
      Invoke: function Invoke() {
        throw new System.Exception("not impl");
      },
      RemoveListener: function RemoveListener(call) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 61 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Events.UnityEvent$1", {
    inherits: [MiniGameAdaptor.Events.UnityEventBase],
    methods: {
      AddListener: function AddListener(call) {
        throw new System.Exception("not impl");
      },
      Invoke: function Invoke(arg0) {
        throw new System.Exception("not impl");
      },
      RemoveListener: function RemoveListener(call) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 62 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.AbstractEventData", {
    props: {
      used: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      Reset: function Reset() {
        throw new System.Exception("not impl");
      },
      Use: function Use() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 63 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.BaseEventData", {
    inherits: [MiniGameAdaptor.EventSystems.AbstractEventData],
    props: {
      currentInputModule: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      selectedObject: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(eventSystem) {
        this.$initialize();
        MiniGameAdaptor.EventSystems.AbstractEventData.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 64 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.PointerEventData", {
    inherits: [MiniGameAdaptor.EventSystems.BaseEventData],
    fields: {
      hovered: null
    },
    props: {
      button: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      clickCount: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      clickTime: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      delta: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      dragging: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      eligibleForClick: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      enterEventCamera: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      lastPress: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      pointerCurrentRaycast: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pointerDrag: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pointerEnter: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pointerId: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pointerPress: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pointerPressRaycast: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      position: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pressEventCamera: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      pressPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rawPointerPress: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      scrollDelta: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useDragThreshold: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(eventSystem) {
        this.$initialize();
        MiniGameAdaptor.EventSystems.BaseEventData.ctor.call(this, null);
        throw new System.Exception("not impl");
      }
    },
    methods: {
      IsPointerMoving: function IsPointerMoving() {
        throw new System.Exception("not impl");
      },
      IsScrolling: function IsScrolling() {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 65 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.AxisEventData", {
    inherits: [MiniGameAdaptor.EventSystems.BaseEventData],
    props: {
      moveDir: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      moveVector: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(eventSystem) {
        this.$initialize();
        MiniGameAdaptor.EventSystems.BaseEventData.ctor.call(this, eventSystem);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 66 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.UIBehaviour", {
    inherits: [MiniGameAdaptor.MonoBehaviour],
    methods: {
      IsActive: function IsActive() {
        throw new System.Exception("not impl");
      },
      IsDestroyed: function IsDestroyed() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 67 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.BaseInput", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
    props: {
      compositionCursorPos: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      compositionString: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      imeCompositionMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      mousePosition: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      mousePresent: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      mouseScrollDelta: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      touchCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      touchSupported: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.EventSystems.UIBehaviour.ctor.call(this);
        throw new System.Exception("not impl");
      }
    },
    methods: {
      GetAxisRaw: function GetAxisRaw(axisName) {
        throw new System.Exception("not impl");
      },
      GetButtonDown: function GetButtonDown(buttonName) {
        throw new System.Exception("not impl");
      },
      GetMouseButton: function GetMouseButton(button) {
        throw new System.Exception("not impl");
      },
      GetMouseButtonDown: function GetMouseButtonDown(button) {
        throw new System.Exception("not impl");
      },
      GetMouseButtonUp: function GetMouseButtonUp(button) {
        throw new System.Exception("not impl");
      },
      GetTouch: function GetTouch(index) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 68 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.EventSystem", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
    statics: {
      props: {
        current: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {}
    },
    props: {
      alreadySelecting: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      currentInputModule: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      currentSelectedGameObject: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      firstSelectedGameObject: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isFocused: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      pixelDragThreshold: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sendNavigationEvents: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      IsPointerOverGameObject: function IsPointerOverGameObject() {
        throw new System.Exception("not impl");
      },
      IsPointerOverGameObject$1: function IsPointerOverGameObject$1(pointerId) {
        throw new System.Exception("not impl");
      },
      SetSelectedGameObject: function SetSelectedGameObject(selected) {
        throw new System.Exception("not impl");
      },
      SetSelectedGameObject$1: function SetSelectedGameObject$1(selected, pointer) {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      },
      UpdateModules: function UpdateModules() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 69 */
/***/ (function(module, exports) {

/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.ExecuteEvents", {
    statics: {
      methods: {
        _Handle: function _Handle(type, target, func) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = target.ref._components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var component = _step.value;

              if (component.__proto__.constructor.$interfaces) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = component.__proto__.constructor.$interfaces[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var i = _step2.value;

                    if (i == type) {
                      func(component);
                    }
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        },
        Execute: function Execute(type, target, eventData, func) {
          var handled = false;

          this._Handle(type, target, function (component) {
            func(component, eventData);
            handled = true;
          });

          return handled;
        },
        CanHandleEvent: function CanHandleEvent(type, go) {
          var handled = false;

          this._Handle(type, go, function (component) {
            handled = true;
          });

          return handled;
        },
        GetEventHandler: function GetEventHandler(type, root) {
          if (!root) {
            return undefined;
          }

          if (this.CanHandleEvent(type, root)) {
            return root;
          }

          return this.GetEventHandler(type, root.transform.parent);
        },
        ExecuteHierarchy: function ExecuteHierarchy(type, root, eventData, func) {
          if (!root) {
            return undefined;
          }

          if (this.Execute(type, root, eventData, func)) {
            return root;
          }

          return this.ExecuteHierarchy(type, root.transform.parent, eventData, func);
        }
      }
    },
    fields: {},
    props: {},
    ctors: {},
    methods: {}
  });
});

/***/ }),
/* 70 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IEventSystemHandler", {
    $kind: "interface"
  });
});

/***/ }),
/* 71 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IBeginDragHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 72 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IDragHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 73 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IDropHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 74 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IEndDragHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 75 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.ICancelHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 76 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 77 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IDeselectHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 78 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IMoveHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 79 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IPointerClickHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 80 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IPointerDownHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 81 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IPointerEnterHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 82 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IPointerExitHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 83 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IPointerUpHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 84 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IScrollHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 85 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.ISubmitHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 86 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.ISelectHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 87 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.IUpdateSelectedHandler", {
    inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
    $kind: "interface"
  });
});

/***/ }),
/* 88 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.EventTrigger", {
    inherits: [MiniGameAdaptor.MonoBehaviour, MiniGameAdaptor.EventSystems.IEndDragHandler, MiniGameAdaptor.EventSystems.IDropHandler, MiniGameAdaptor.EventSystems.IScrollHandler, MiniGameAdaptor.EventSystems.IUpdateSelectedHandler, MiniGameAdaptor.EventSystems.IPointerEnterHandler, MiniGameAdaptor.EventSystems.ISelectHandler, MiniGameAdaptor.EventSystems.IPointerExitHandler, MiniGameAdaptor.EventSystems.IDeselectHandler, MiniGameAdaptor.EventSystems.IPointerDownHandler, MiniGameAdaptor.EventSystems.IMoveHandler, MiniGameAdaptor.EventSystems.IPointerUpHandler, MiniGameAdaptor.EventSystems.ISubmitHandler, MiniGameAdaptor.EventSystems.IPointerClickHandler, MiniGameAdaptor.EventSystems.ICancelHandler, MiniGameAdaptor.EventSystems.IBeginDragHandler, MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler, MiniGameAdaptor.EventSystems.IDragHandler],
    props: {
      triggers: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      OnBeginDrag: function OnBeginDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag: function MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnCancel: function OnCancel(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$ICancelHandler$OnCancel: function MiniGameAdaptor$EventSystems$ICancelHandler$OnCancel(eventData) {
        throw new System.Exception("Exception");
      },
      OnDeselect: function OnDeselect(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IDeselectHandler$OnDeselect: function MiniGameAdaptor$EventSystems$IDeselectHandler$OnDeselect(eventData) {
        throw new System.Exception("Exception");
      },
      OnDrag: function OnDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IDragHandler$OnDrag: function MiniGameAdaptor$EventSystems$IDragHandler$OnDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnDrop: function OnDrop(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IDropHandler$OnDrop: function MiniGameAdaptor$EventSystems$IDropHandler$OnDrop(eventData) {
        throw new System.Exception("Exception");
      },
      OnEndDrag: function OnEndDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IEndDragHandler$OnEndDrag: function MiniGameAdaptor$EventSystems$IEndDragHandler$OnEndDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnInitializePotentialDrag: function OnInitializePotentialDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag: function MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnMove: function OnMove(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IMoveHandler$OnMove: function MiniGameAdaptor$EventSystems$IMoveHandler$OnMove(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerClick: function OnPointerClick(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick: function MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerDown: function OnPointerDown(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown: function MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerEnter: function OnPointerEnter(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerEnterHandler$OnPointerEnter: function MiniGameAdaptor$EventSystems$IPointerEnterHandler$OnPointerEnter(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerExit: function OnPointerExit(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerExitHandler$OnPointerExit: function MiniGameAdaptor$EventSystems$IPointerExitHandler$OnPointerExit(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerUp: function OnPointerUp(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerUpHandler$OnPointerUp: function MiniGameAdaptor$EventSystems$IPointerUpHandler$OnPointerUp(eventData) {
        throw new System.Exception("Exception");
      },
      OnScroll: function OnScroll(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IScrollHandler$OnScroll: function MiniGameAdaptor$EventSystems$IScrollHandler$OnScroll(eventData) {
        throw new System.Exception("Exception");
      },
      OnSelect: function OnSelect(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$ISelectHandler$OnSelect: function MiniGameAdaptor$EventSystems$ISelectHandler$OnSelect(eventData) {
        throw new System.Exception("Exception");
      },
      OnSubmit: function OnSubmit(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit: function MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit(eventData) {
        throw new System.Exception("Exception");
      },
      OnUpdateSelected: function OnUpdateSelected(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IUpdateSelectedHandler$OnUpdateSelected: function MiniGameAdaptor$EventSystems$IUpdateSelectedHandler$OnUpdateSelected(eventData) {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 89 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.EventTrigger.Entry", {
    $kind: "nested class",
    fields: {
      eventID: 0,
      callback: null
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 90 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.MoveDirection", {
    $kind: "enum",
    statics: {
      fields: {
        Left: 0,
        Up: 1,
        Right: 2,
        Down: 3,
        None: 4
      }
    }
  });
});

/***/ }),
/* 91 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.RaycastResult", {
    $kind: "struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.EventSystems.RaycastResult();
        }
      }
    },
    fields: {
      module: null,
      distance: 0,
      index: 0,
      depth: 0,
      sortingLayer: 0,
      sortingOrder: 0,
      worldPosition: null,
      worldNormal: null,
      screenPosition: null
    },
    props: {
      gameObject: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isValid: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      init: function init() {
        this.worldPosition = new MiniGameAdaptor.Vector3();
        this.worldNormal = new MiniGameAdaptor.Vector3();
        this.screenPosition = new MiniGameAdaptor.Vector2();
      },
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      Clear: function Clear() {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      },
      getHashCode: function getHashCode() {
        var h = Bridge.addHash([4871899276, this.module, this.distance, this.index, this.depth, this.sortingLayer, this.sortingOrder, this.worldPosition, this.worldNormal, this.screenPosition]);
        return h;
      },
      equals: function equals(o) {
        if (!Bridge.is(o, MiniGameAdaptor.EventSystems.RaycastResult)) {
          return false;
        }

        return Bridge.equals(this.module, o.module) && Bridge.equals(this.distance, o.distance) && Bridge.equals(this.index, o.index) && Bridge.equals(this.depth, o.depth) && Bridge.equals(this.sortingLayer, o.sortingLayer) && Bridge.equals(this.sortingOrder, o.sortingOrder) && Bridge.equals(this.worldPosition, o.worldPosition) && Bridge.equals(this.worldNormal, o.worldNormal) && Bridge.equals(this.screenPosition, o.screenPosition);
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.EventSystems.RaycastResult();
        s.module = this.module;
        s.distance = this.distance;
        s.index = this.index;
        s.depth = this.depth;
        s.sortingLayer = this.sortingLayer;
        s.sortingOrder = this.sortingOrder;
        s.worldPosition = this.worldPosition.$clone();
        s.worldNormal = this.worldNormal.$clone();
        s.screenPosition = this.screenPosition.$clone();
        return s;
      }
    }
  });
});

/***/ }),
/* 92 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.EventTrigger.TriggerEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEvent$1],
    $kind: "nested class",
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEvent$1.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 93 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.EventSystems.BaseRaycaster", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
    props: {
      eventCamera: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      renderOrderPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      sortOrderPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      Raycast: function Raycast(eventData, resultAppendList) {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 94 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RenderTextureFormat", {
    $kind: "enum",
    statics: {
      fields: {
        ARGB32: 0,
        Depth: 1,
        ARGBHalf: 2,
        Shadowmap: 3,
        RGB565: 4,
        ARGB4444: 5,
        ARGB1555: 6,
        Default: 7,
        ARGB2101010: 8,
        DefaultHDR: 9,
        ARGB64: 10,
        ARGBFloat: 11,
        RGFloat: 12,
        RGHalf: 13,
        RFloat: 14,
        RHalf: 15,
        R8: 16,
        ARGBInt: 17,
        RGInt: 18,
        RInt: 19,
        BGRA32: 20,
        RGB111110Float: 22,
        RG32: 23,
        RGBAUShort: 24,
        RG16: 25,
        BGRA10101010_XR: 26,
        BGR101010_XR: 27,
        R16: 28
      }
    }
  });
});

/***/ }),
/* 95 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Texture", {
    inherits: [MiniGameAdaptor.Object],
    statics: {
      props: {
        anisotropicFiltering: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        currentTextureMemory: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        desiredTextureMemory: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        masterTextureLimit: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        nonStreamingTextureCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        nonStreamingTextureMemory: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        streamingMipmapUploadCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        streamingRendererCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        streamingTextureCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        streamingTextureDiscardUnusedMips: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        streamingTextureForceLoadAll: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        streamingTextureLoadingCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        streamingTexturePendingLoadCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        targetTextureMemory: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        totalTextureMemory: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        SetGlobalAnisotropicFilteringLimits: function SetGlobalAnisotropicFilteringLimits(forcedMin, globalMax) {
          throw new System.Exception("not impl");
        },
        SetStreamingTextureMaterialDebugProperties: function SetStreamingTextureMaterialDebugProperties() {
          throw new System.Exception("not impl");
        }
      }
    },
    props: {
      anisoLevel: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      dimension: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      filterMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      height: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      imageContentsHash: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isReadable: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      mipMapBias: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      texelSize: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      updateCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      width: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      wrapMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      wrapModeU: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      wrapModeV: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      wrapModeW: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      IncrementUpdateCount: function IncrementUpdateCount() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 96 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Texture2D", {
    inherits: [MiniGameAdaptor.Texture],
    fields: {
      ref: null
    },
    statics: {
      props: {
        blackTexture: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        whiteTexture: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        GenerateAtlas: function GenerateAtlas(sizes, padding, atlasSize, results) {
          throw new System.Exception("not impl");
        }
      }
    },
    props: {
      desiredMipmapLevel: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      format: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isReadable: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      loadedMipmapLevel: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      loadingMipmapLevel: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      mipmapCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      requestedMipmapLevel: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      streamingMipmaps: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      streamingMipmapsPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(width, height) {
        this.$initialize();
        this.ref = new engine.Texture2D();
        /*MiniGameAdaptor.Texture.ctor.call(this);*/
      },
      $ctor1: function $ctor1(width, height, format, flags) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
      },
      $ctor2: function $ctor2(width, height, textureFormat, mipChain) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
      },
      $ctor3: function $ctor3(width, height, textureFormat, mipChain, linear) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
      },
      $ctor4: function $ctor4(ref) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
        this.ref = ref;
      }
    },
    methods: {
      Apply: function Apply() {
        throw new System.Exception("not impl");
      },
      Apply$1: function Apply$1(updateMipmaps) {
        throw new System.Exception("not impl");
      },
      Apply$2: function Apply$2(updateMipmaps, makeNoLongerReadable) {
        throw new System.Exception("not impl");
      },
      ClearRequestedMipmapLevel: function ClearRequestedMipmapLevel() {
        throw new System.Exception("not impl");
      },
      Compress: function Compress(highQuality) {
        throw new System.Exception("not impl");
      },
      GetPixel: function GetPixel(x, y) {
        throw new System.Exception("not impl");
      },
      GetPixelBilinear: function GetPixelBilinear(x, y) {
        throw new System.Exception("not impl");
      },
      GetPixels: function GetPixels() {
        throw new System.Exception("not impl");
      },
      GetPixels$1: function GetPixels$1(miplevel) {
        throw new System.Exception("not impl");
      },
      GetPixels$2: function GetPixels$2(x, y, blockWidth, blockHeight) {
        throw new System.Exception("not impl");
      },
      GetPixels$3: function GetPixels$3(x, y, blockWidth, blockHeight, miplevel) {
        throw new System.Exception("not impl");
      },
      GetPixels32: function GetPixels32() {
        throw new System.Exception("not impl");
      },
      GetPixels32$1: function GetPixels32$1(miplevel) {
        throw new System.Exception("not impl");
      },
      GetRawTextureData: function GetRawTextureData() {
        throw new System.Exception("not impl");
      },
      GetRawTextureData$1: function GetRawTextureData$1(T) {
        throw new System.Exception("not impl");
      },
      IsRequestedMipmapLevelLoaded: function IsRequestedMipmapLevelLoaded() {
        throw new System.Exception("not impl");
      },
      LoadRawTextureData: function LoadRawTextureData(data) {
        throw new System.Exception("not impl");
      },
      LoadRawTextureData$1: function LoadRawTextureData$1(T, data) {
        throw new System.Exception("not impl");
      },
      PackTextures: function PackTextures(textures, padding) {
        throw new System.Exception("not impl");
      },
      PackTextures$1: function PackTextures$1(textures, padding, maximumAtlasSize) {
        throw new System.Exception("not impl");
      },
      PackTextures$2: function PackTextures$2(textures, padding, maximumAtlasSize, makeNoLongerReadable) {
        throw new System.Exception("not impl");
      },
      ReadPixels: function ReadPixels(source, destX, destY) {
        throw new System.Exception("not impl");
      },
      ReadPixels$1: function ReadPixels$1(source, destX, destY, recalculateMipMaps) {
        throw new System.Exception("not impl");
      },
      Resize: function Resize(width, height) {
        throw new System.Exception("not impl");
      },
      Resize$1: function Resize$1(width, height, format, hasMipMap) {
        throw new System.Exception("not impl");
      },
      SetPixel: function SetPixel(x, y, color) {
        throw new System.Exception("not impl");
      },
      SetPixels: function SetPixels(x, y, blockWidth, blockHeight, colors) {
        throw new System.Exception("not impl");
      },
      SetPixels$1: function SetPixels$1(x, y, blockWidth, blockHeight, colors, miplevel) {
        throw new System.Exception("not impl");
      },
      SetPixels$2: function SetPixels$2(colors) {
        throw new System.Exception("not impl");
      },
      SetPixels$3: function SetPixels$3(colors, miplevel) {
        throw new System.Exception("not impl");
      },
      SetPixels32: function SetPixels32(x, y, blockWidth, blockHeight, colors) {
        throw new System.Exception("not impl");
      },
      SetPixels32$1: function SetPixels32$1(x, y, blockWidth, blockHeight, colors, miplevel) {
        throw new System.Exception("not impl");
      },
      SetPixels32$2: function SetPixels32$2(colors) {
        throw new System.Exception("not impl");
      },
      SetPixels32$3: function SetPixels32$3(colors, miplevel) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 97 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RenderTexture", {
    inherits: [MiniGameAdaptor.Texture],
    statics: {
      props: {
        active: {
          get: function get() {
            // 自研引擎没有active的概念，默认active
            return true;
          },
          set: function set(value) {
            return true;
          }
        }
      },
      methods: {
        GetTemporary: function GetTemporary(width, height) {
          throw new System.Exception("not impl");
        },
        GetTemporary$1: function GetTemporary$1(width, height, depthBuffer) {
          throw new System.Exception("not impl");
        },
        GetTemporary$2: function GetTemporary$2(width, height, depthBuffer, format) {
          throw new System.Exception("not impl");
        },
        GetTemporary$3: function GetTemporary$3(width, height, depthBuffer, format, readWrite) {
          throw new System.Exception("not impl");
        },
        GetTemporary$4: function GetTemporary$4(width, height, depthBuffer, format, readWrite, antiAliasing) {
          throw new System.Exception("not impl");
        },
        GetTemporary$5: function GetTemporary$5(width, height, depthBuffer, format, readWrite, antiAliasing, memorylessMode) {
          throw new System.Exception("not impl");
        },
        GetTemporary$6: function GetTemporary$6(width, height, depthBuffer, format, readWrite, antiAliasing, memorylessMode, vrUsage) {
          throw new System.Exception("not impl");
        },
        GetTemporary$7: function GetTemporary$7(width, height, depthBuffer, format, readWrite, antiAliasing, memorylessMode, vrUsage, useDynamicScale) {
          throw new System.Exception("not impl");
        },
        GetTemporary$8: function GetTemporary$8(desc) {
          throw new System.Exception("not impl");
        },
        ReleaseTemporary: function ReleaseTemporary(temp) {
          throw new System.Exception("not impl");
        },
        SupportsStencil: function SupportsStencil(rt) {
          throw new System.Exception("not impl");
        }
      }
    },
    props: {
      antiAliasing: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      autoGenerateMips: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      bindTextureMS: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      colorBuffer: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      depth: {
        get: function get() {
          return this.ref._depthPixelFormat;
        },
        set: function set(value) {
          throw new System.Exception("can not set depth");
        }
      },
      depthBuffer: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      descriptor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      dimension: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      enableRandomWrite: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      format: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      height: {
        get: function get() {
          return this.ref.height;
        },
        set: function set(value) {
          throw new System.Exception("height can not be set");
        }
      },
      isPowerOfTwo: {
        get: function get() {
          return (this.width & this.width - 1) === 0 && (this.height & this.height - 1) === 0;
        },
        set: function set(value) {
          throw new System.Exception("can not set this property");
        }
      },
      memorylessMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sRGB: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      useDynamicScale: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useMipMap: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      volumeDepth: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      vrUsage: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      width: {
        get: function get() {
          return this.ref.width;
        },
        set: function set(value) {
          throw new System.Exception("width can not be set");
        }
      }
    },
    ctors: {
      ctor: function ctor(width, height, depth) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
        this.ref = new engine.RenderTexture(width, height);
      },
      $ctor1: function $ctor1(width, height, depth, format) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
        this.ref = new engine.RenderTexture(width, height);
      },
      $ctor2: function $ctor2(width, height, depth, format) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
        this.ref = new engine.RenderTexture(width, height);
      },
      $ctor3: function $ctor3(width, height, depth, format, readWrite) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
        this.ref = new engine.RenderTexture(width, height);
      },
      $ctor4: function $ctor4(textureToCopy) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
        this.ref = new engine.RenderTexture(width, height);
      },
      $ctor5: function $ctor5(desc) {
        this.$initialize();
        MiniGameAdaptor.Texture.ctor.call(this);
        this.ref = new engine.RenderTexture(width, height);
      }
    },
    methods: {
      ConvertToEquirect: function ConvertToEquirect(equirect, eye) {
        if (eye === void 0) {
          eye = 2;
        }

        throw new System.Exception("not impl");
      },
      Create: function Create() {
        return true;
      },
      DiscardContents: function DiscardContents() {
        throw new System.Exception("not impl");
      },
      DiscardContents$1: function DiscardContents$1(discardColor, discardDepth) {
        throw new System.Exception("not impl");
      },
      GenerateMips: function GenerateMips() {
        throw new System.Exception("not impl");
      },
      IsCreated: function IsCreated() {
        return true;
      },
      MarkRestoreExpected: function MarkRestoreExpected() {
        throw new System.Exception("not impl");
      },
      Release: function Release() {
        throw new System.Exception("not impl");
      },
      ResolveAntiAliasedSurface: function ResolveAntiAliasedSurface() {
        throw new System.Exception("not impl");
      },
      ResolveAntiAliasedSurface$1: function ResolveAntiAliasedSurface$1(target) {
        throw new System.Exception("not impl");
      },
      SetGlobalShaderProperty: function SetGlobalShaderProperty(propertyName) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 98 */
/***/ (function(module, exports) {

/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("System.IO.File", {
    statics: {
      methods: {
        Exists: function Exists(f) {
          // temp impl.
          return false;
        },
        OpenText: function OpenText(path) {
          if (path == null) {
            throw new System.ArgumentNullException.$ctor1("path");
          }

          return new System.IO.StreamReader.$ctor7(path);
        },
        OpenRead: function OpenRead(path) {
          return new System.IO.FileStream.$ctor1(path, 3);
        },
        ReadAllText: function ReadAllText(path) {
          if (path == null) {
            throw new System.ArgumentNullException.$ctor1("path");
          }

          if (path.length === 0) {
            throw new System.ArgumentException.$ctor1("Argument_EmptyPath");
          }

          return System.IO.File.InternalReadAllText(path, System.Text.Encoding.UTF8, true);
        },
        ReadAllText$1: function ReadAllText$1(path, encoding) {
          if (path == null) {
            throw new System.ArgumentNullException.$ctor1("path");
          }

          if (encoding == null) {
            throw new System.ArgumentNullException.$ctor1("encoding");
          }

          if (path.length === 0) {
            throw new System.ArgumentException.$ctor1("Argument_EmptyPath");
          }

          return System.IO.File.InternalReadAllText(path, encoding, true);
        },
        InternalReadAllText: function InternalReadAllText(path, encoding, checkHost) {
          var sr = new System.IO.StreamReader.$ctor12(path, encoding, true, System.IO.StreamReader.DefaultBufferSize, checkHost);

          try {
            return sr.ReadToEnd();
          } finally {
            if (Bridge.hasValue(sr)) {
              sr.System$IDisposable$Dispose();
            }
          }
        },
        ReadAllBytes: function ReadAllBytes(path) {
          return System.IO.File.InternalReadAllBytes(path, true);
        },
        InternalReadAllBytes: function InternalReadAllBytes(path, checkHost) {
          var bytes;
          var fs = new System.IO.FileStream.$ctor1(path, 3);

          try {
            var index = 0;
            var fileLength = fs.Length;

            if (fileLength.gt(System.Int64(2147483647))) {
              throw new System.IO.IOException.$ctor1("IO.IO_FileTooLong2GB");
            }

            var count = System.Int64.clip32(fileLength);
            bytes = System.Array.init(count, 0, System.Byte);

            while (count > 0) {
              var n = fs.Read(bytes, index, count);

              if (n === 0) {
                System.IO.__Error.EndOfFile();
              }

              index = index + n | 0;
              count = count - n | 0;
            }
          } finally {
            if (Bridge.hasValue(fs)) {
              fs.System$IDisposable$Dispose();
            }
          }

          return bytes;
        },
        ReadAllLines: function ReadAllLines(path) {
          if (path == null) {
            throw new System.ArgumentNullException.$ctor1("path");
          }

          if (path.length === 0) {
            throw new System.ArgumentException.$ctor1("Argument_EmptyPath");
          }

          return System.IO.File.InternalReadAllLines(path, System.Text.Encoding.UTF8);
        },
        ReadAllLines$1: function ReadAllLines$1(path, encoding) {
          if (path == null) {
            throw new System.ArgumentNullException.$ctor1("path");
          }

          if (encoding == null) {
            throw new System.ArgumentNullException.$ctor1("encoding");
          }

          if (path.length === 0) {
            throw new System.ArgumentException.$ctor1("Argument_EmptyPath");
          }

          return System.IO.File.InternalReadAllLines(path, encoding);
        },
        InternalReadAllLines: function InternalReadAllLines(path, encoding) {
          var line;
          var lines = new (System.Collections.Generic.List$1(System.String).ctor)();
          var sr = new System.IO.StreamReader.$ctor9(path, encoding);

          try {
            while ((line = sr.ReadLine()) != null) {
              lines.add(line);
            }
          } finally {
            if (Bridge.hasValue(sr)) {
              sr.System$IDisposable$Dispose();
            }
          }

          return lines.ToArray();
        },
        ReadLines: function ReadLines(path) {
          if (path == null) {
            throw new System.ArgumentNullException.$ctor1("path");
          }

          if (path.length === 0) {
            throw new System.ArgumentException.$ctor3("Argument_EmptyPath", "path");
          }

          return System.IO.ReadLinesIterator.CreateIterator(path, System.Text.Encoding.UTF8);
        },
        ReadLines$1: function ReadLines$1(path, encoding) {
          if (path == null) {
            throw new System.ArgumentNullException.$ctor1("path");
          }

          if (encoding == null) {
            throw new System.ArgumentNullException.$ctor1("encoding");
          }

          if (path.length === 0) {
            throw new System.ArgumentException.$ctor3("Argument_EmptyPath", "path");
          }

          return System.IO.ReadLinesIterator.CreateIterator(path, encoding);
        }
      }
    }
  });
});

/***/ }),
/* 99 */
/***/ (function(module, exports) {

/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("System.IO.FileInfo", {
    props: {
      Exists: {
        get: function get() {
          try {
            this._fs.accessSync(this._wxPath);

            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
        }
      },
      Length: {
        get: function get() {
          var stat = this._fs.statSync(this._wxPath);

          if (stat) {
            return stat.size;
          } else {
            return undefined;
          }
        }
      },
      LastWriteTimeUtc: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      FullName: {
        get: function get() {
          return this._wxPath;
        }
      }
    },
    ctors: {
      ctor: function ctor(path) {
        this.$initialize();

        if (path.startsWith('/')) {
          path = path.substring(1, path.length);
        }

        if (path.startsWith('usr')) {
          path = path.substring(3, path.length);
        }

        this._wxPath = "".concat(wx.env.USER_DATA_PATH, "/") + path;
        console.log("FileInfo Created, Path:", this._wxPath);
        this._fs = wx.getFileSystemManager();
      }
    },
    methods: {
      Create: function Create() {
        try {
          this._fs.unlinkSync(this._wxPath);
        } catch (e) {
          console.log('FileInfo Create unlink old file', e);
        }

        return new System.IO.FileStream.$ctor1(this);
      },
      Open: function Open(mode) {
        return new System.IO.FileStream.$ctor1(this);
      }
    }
  });
});

/***/ }),
/* 100 */
/***/ (function(module, exports) {

/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("System.IO.FileStream", {
    fields: {
      _buffer: [],
      _readBuffer: undefined,
      _readPos: 0,
      _length: 0
    },
    props: {
      CanRead: {
        get: function get() {
          return true;
        }
      },
      CanWrite: {
        get: function get() {
          return true;
        }
      },
      CanTimeout: {
        get: function get() {
          return false;
        }
      },
      CanSeek: {
        get: function get() {
          return false;
        }
      }
    },
    ctors: {
      $ctor1: function $ctor1(fileInfo) {
        this.$initialize();
        this._fileInfo = fileInfo;
        console.log("FileStream Created, Path:", fileInfo._wxPath);
      }
    },
    methods: {
      Write: function Write(array, offset, count) {
        this._buffer = this._buffer.concat(array.slice(offset, offset + count));
      },
      Flush: function Flush() {
        var buffer = Uint8Array.from(this._buffer).buffer;

        try {
          this._fileInfo._fs.writeFileSync(this._fileInfo._wxPath, buffer);
        } catch (e) {
          console.log('filestream write error', e);
        }
      },
      Close: function Close() {
        this.Flush();
        this._buffer = [];
        this._readBuffer = undefined;
        this._readPos = 0;
        this._length = 0;
      },
      Dispose: function Dispose() {},
      Read: function Read(array, offset, count) {
        if (!array) {
          throw new Exception('illegal array');
        }

        if (!this._readBuffer) {
          this._readBuffer = new Uint8Array(this._fileInfo._fs.readFileSync(this._fileInfo._wxPath));
        }

        var result = Array.from(this._readBuffer.slice(this._readPos, this._readPos + count));
        this._readPos = this._readPos + result.length;
        Array.prototype.splice.apply(array, [offset, result.length].concat(result));
        return result.length;
      }
    }
  });
});

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(102);

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.SystemInfo", {
    statics: {
      props: {
        deviceUniqueIdentifier: {
          get: function get() {
            return '';
          }
        },
        operatingSystem: {
          get: function get() {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getWxSystemInfo"])().system;
          }
        },
        deviceModel: {
          get: function get() {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getWxSystemInfo"])().model;
          }
        },
        systemMemorySize: {
          get: function get() {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getWxSystemInfo"])().systemMemorySize;
          }
        },
        graphicsShaderLevel: {
          get: function get() {
            // https://docs.unity3d.com/2018.4/Documentation/ScriptReference/SystemInfo-graphicsShaderLevel.html
            return 35;
          }
        },
        supportsImageEffects: {
          get: function get() {
            // temp impl.
            return false;
          }
        }
      },
      methods: {
        SupportsRenderTextureFormat: function SupportsRenderTextureFormat(format) {
          // temp impl.
          return false;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWxSystemInfo", function() { return getWxSystemInfo; });
var systemInfo = null;
function getWxSystemInfo() {
  if (!systemInfo) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

/***/ }),
/* 103 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    screenHeight = _wx$getSystemInfoSync.screenHeight,
    screenWidth = _wx$getSystemInfoSync.screenWidth;

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Camera", {
    inherits: [MiniGameAdaptor.Behaviour],
    statics: {
      fields: {
        onPreCull: null,
        onPreRender: null,
        onPostRender: null
      },
      props: {
        allCameras: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        allCamerasCount: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        current: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        main: {
          get: function get() {
            var root = MiniGameAdaptor.engineToAdaptorMap.get(game.sceneRoot.transform._children[0].entity);
            return root ? root.GetComponentInChildren(MiniGameAdaptor.Camera) : null;
          }
        }
      },
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          if (data.ref !== null && data.ref !== undefined && typeof data.ref === 'number') {
            comp.ref = builtContext.components.data[data.ref];
          } else if (typeof data === 'number') {
            comp.ref = builtContext.components.data[data];
          }

          return comp;
        },
        CalculateProjectionMatrixFromPhysicalProperties: function CalculateProjectionMatrixFromPhysicalProperties(output, focalLength, sensorSize, lensShift, nearClip, farClip, gateFitParameters) {
          if (gateFitParameters === void 0) {
            gateFitParameters = new MiniGameAdaptor.Camera.GateFitParameters();
          }

          throw new System.Exception("not impl");
        },
        FocalLengthToFOV: function FocalLengthToFOV(focalLength, sensorSize) {
          throw new System.Exception("not impl");
        },
        FOVToFocalLength: function FOVToFocalLength(fov, sensorSize) {
          throw new System.Exception("not impl");
        },
        GetAllCameras: function GetAllCameras(cameras) {
          throw new System.Exception("not impl");
        },
        SetupCurrent: function SetupCurrent(cur) {
          throw new System.Exception("not impl");
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      activeTexture: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      actualRenderingPath: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      allowDynamicResolution: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      allowHDR: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      allowMSAA: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      areVRStereoViewMatricesWithinSingleCullTolerance: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      aspect: {
        get: function get() {
          return this.ref.aspect;
        },
        set: function set(value) {
          this.res.aspect = value;
        }
      },
      backgroundColor: {
        get: function get() {
          return this.ref.clearColor;
        },
        set: function set(value) {
          this.ref.clearColor = value;
        }
      },
      cameraToWorldMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      cameraType: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      clearFlags: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      clearStencilAfterLightingPass: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      commandBufferCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      cullingMask: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      cullingMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      depth: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      depthTextureMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      eventMask: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      farClipPlane: {
        get: function get() {
          return this.ref.farClipPlane;
        },
        set: function set(value) {
          this.ref.farClipPlane = value;
        }
      },
      fieldOfView: {
        get: function get() {
          return this.ref.fieldOfView;
        },
        set: function set(value) {
          this.ref.fieldOfView = value;
        }
      },
      focalLength: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      forceIntoRenderTexture: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      gateFit: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      layerCullDistances: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      layerCullSpherical: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      lensShift: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      nearClipPlane: {
        get: function get() {
          return this.ref.nearClipPlane;
        },
        set: function set(value) {
          this.ref.nearClipPlane = value;
        }
      },
      nonJitteredProjectionMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      opaqueSortMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      orthographic: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      orthographicSize: {
        get: function get() {
          return this.ref.orthographicSize;
        },
        set: function set(value) {
          this.ref.orthographicSize = value;
        }
      },
      pixelHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      pixelRect: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pixelWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      previousViewProjectionMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      projectionMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rect: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      renderingPath: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      scaledPixelHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      scaledPixelWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      scene: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sensorSize: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      stereoActiveEye: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      stereoConvergence: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      stereoEnabled: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      stereoSeparation: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      stereoTargetEye: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      targetDisplay: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      targetTexture: {
        get: function get() {
          return this.ref.targetTexture;
        },
        set: function set(value) {
          this.ref.targetTexture = value;
        }
      },
      transparencySortAxis: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      transparencySortMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useJitteredProjectionMatrixForTransparentRendering: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useOcclusionCulling: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      usePhysicalProperties: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      velocity: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      worldToCameraMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(ref) {
        this.$initialize();
        MiniGameAdaptor.Behaviour.ctor.call(this); // this.ref = ref;
      }
    },
    methods: {
      AddCommandBuffer: function AddCommandBuffer(evt, buffer) {
        throw new System.Exception("not impl");
      },
      AddCommandBufferAsync: function AddCommandBufferAsync(evt, buffer, queueType) {
        throw new System.Exception("not impl");
      },
      CalculateFrustumCorners: function CalculateFrustumCorners(viewport, z, eye, outCorners) {
        throw new System.Exception("not impl");
      },
      CalculateObliqueMatrix: function CalculateObliqueMatrix(clipPlane) {
        throw new System.Exception("not impl");
      },
      CopyFrom: function CopyFrom(other) {
        throw new System.Exception("not impl");
      },
      CopyStereoDeviceProjectionMatrixToNonJittered: function CopyStereoDeviceProjectionMatrixToNonJittered(eye) {
        throw new System.Exception("not impl");
      },
      GetCommandBuffers: function GetCommandBuffers(evt) {
        throw new System.Exception("not impl");
      },
      GetStereoNonJitteredProjectionMatrix: function GetStereoNonJitteredProjectionMatrix(eye) {
        throw new System.Exception("not impl");
      },
      GetStereoProjectionMatrix: function GetStereoProjectionMatrix(eye) {
        throw new System.Exception("not impl");
      },
      GetStereoViewMatrix: function GetStereoViewMatrix(eye) {
        throw new System.Exception("not impl");
      },
      RemoveAllCommandBuffers: function RemoveAllCommandBuffers() {
        throw new System.Exception("not impl");
      },
      RemoveCommandBuffer: function RemoveCommandBuffer(evt, buffer) {
        throw new System.Exception("not impl");
      },
      RemoveCommandBuffers: function RemoveCommandBuffers(evt) {
        throw new System.Exception("not impl");
      },
      Render: function Render() {
        throw new System.Exception("not impl");
      },
      RenderDontRestore: function RenderDontRestore() {
        throw new System.Exception("not impl");
      },
      RenderToCubemap: function RenderToCubemap(cubemap) {
        throw new System.Exception("not impl");
      },
      RenderToCubemap$1: function RenderToCubemap$1(cubemap, faceMask) {
        throw new System.Exception("not impl");
      },
      RenderToCubemap$2: function RenderToCubemap$2(cubemap) {
        throw new System.Exception("not impl");
      },
      RenderToCubemap$3: function RenderToCubemap$3(cubemap, faceMask) {
        throw new System.Exception("not impl");
      },
      RenderToCubemap$4: function RenderToCubemap$4(cubemap, faceMask, stereoEye) {
        throw new System.Exception("not impl");
      },
      RenderWithShader: function RenderWithShader(shader, replacementTag) {
        throw new System.Exception("not impl");
      },
      Reset: function Reset() {
        throw new System.Exception("not impl");
      },
      ResetAspect: function ResetAspect() {
        throw new System.Exception("not impl");
      },
      ResetCullingMatrix: function ResetCullingMatrix() {
        throw new System.Exception("not impl");
      },
      ResetProjectionMatrix: function ResetProjectionMatrix() {
        throw new System.Exception("not impl");
      },
      ResetReplacementShader: function ResetReplacementShader() {
        throw new System.Exception("not impl");
      },
      ResetStereoProjectionMatrices: function ResetStereoProjectionMatrices() {
        throw new System.Exception("not impl");
      },
      ResetStereoViewMatrices: function ResetStereoViewMatrices() {
        throw new System.Exception("not impl");
      },
      ResetTransparencySortSettings: function ResetTransparencySortSettings() {
        throw new System.Exception("not impl");
      },
      ResetWorldToCameraMatrix: function ResetWorldToCameraMatrix() {
        throw new System.Exception("not impl");
      },
      ScreenPointToRay: function ScreenPointToRay(pos) {
        throw new System.Exception("not impl");
      },
      ScreenPointToRay$1: function ScreenPointToRay$1(pos, eye) {
        throw new System.Exception("not impl");
      },
      ScreenToViewportPoint: function ScreenToViewportPoint(position) {
        throw new System.Exception("not impl");
      },
      ScreenToWorldPoint: function ScreenToWorldPoint(position) {
        var clipX = 2 * position.x / screenWidth - 1;
        var clipY = 2 * position.y / screenHeight - 1;
        return new MiniGameAdaptor.Vector3.$ctor4(this.ref.convertClipPositionToWorld(engine.Vector3.createFromNumber(clipX, clipY, -1)))._FlipX();
      },
      ScreenToWorldPoint$1: function ScreenToWorldPoint$1(position, eye) {
        throw new System.Exception("not impl");
      },
      SetReplacementShader: function SetReplacementShader(shader, replacementTag) {
        throw new System.Exception("not impl");
      },
      SetStereoProjectionMatrix: function SetStereoProjectionMatrix(eye, matrix) {
        throw new System.Exception("not impl");
      },
      SetStereoViewMatrix: function SetStereoViewMatrix(eye, matrix) {
        throw new System.Exception("not impl");
      },
      SetTargetBuffers: function SetTargetBuffers(colorBuffer, depthBuffer) {
        throw new System.Exception("not impl");
      },
      SetTargetBuffers$1: function SetTargetBuffers$1(colorBuffer, depthBuffer) {
        throw new System.Exception("not impl");
      },
      ViewportPointToRay: function ViewportPointToRay(pos) {
        throw new System.Exception("not impl");
      },
      ViewportPointToRay$1: function ViewportPointToRay$1(pos, eye) {
        throw new System.Exception("not impl");
      },
      ViewportToScreenPoint: function ViewportToScreenPoint(position) {
        throw new System.Exception("not impl");
      },
      ViewportToWorldPoint: function ViewportToWorldPoint(position) {
        throw new System.Exception("not impl");
      },
      ViewportToWorldPoint$1: function ViewportToWorldPoint$1(position, eye) {
        throw new System.Exception("not impl");
      },
      WorldToScreenPoint: function WorldToScreenPoint(position) {
        var clipPos = this.ref.convertWorldPositionToClip(position._FlipX().ref);
        var screenX = (clipPos.x + 1) / 2 * screenWidth;
        var screenY = (clipPos.y + 1) / 2 * screenHeight;
        return new MiniGameAdaptor.Vector3.$ctor2(screenX, screenY, clipPos.z);
      },
      WorldToScreenPoint$1: function WorldToScreenPoint$1(position, eye) {
        throw new System.Exception("not impl");
      },
      WorldToViewportPoint: function WorldToViewportPoint(position) {
        throw new System.Exception("not impl");
      },
      WorldToViewportPoint$1: function WorldToViewportPoint$1(position, eye) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Camera')(MiniGameAdaptor.Camera);
Object.defineProperty(MiniGameAdaptor.Camera.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Camera.prototype.__properties)
}); // MiniGameAdaptor.Camera.prototype.__properties.ref = { type: "Camera" };

/***/ }),
/* 104 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ParticleSystem", {
    inherits: [MiniGameAdaptor.Component],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        },
        ResetPreMappedBufferMemory: function ResetPreMappedBufferMemory() {
          throw new System.Exception("not impl");
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      collision: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      colorBySpeed: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      colorOverLifetime: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      customData: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      emission: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      externalForces: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      forceOverLifetime: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      inheritVelocity: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isEmitting: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isPaused: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isPlaying: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isStopped: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      lights: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      limitVelocityOverLifetime: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      main: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      noise: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      particleCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      proceduralSimulationSupported: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      randomSeed: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rotationBySpeed: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      rotationOverLifetime: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      shape: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      sizeBySpeed: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      sizeOverLifetime: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      subEmitters: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      textureSheetAnimation: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      time: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      trails: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      trigger: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      useAutoRandomSeed: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      velocityOverLifetime: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(ref) {
        this.$initialize();
        MiniGameAdaptor.Component.ctor.call(this);

        if (ref instanceof engine.Particle) {
          this.ref = ref;
        }
      }
    },
    methods: {
      Clear: function Clear() {
        throw new System.Exception("not impl");
      },
      Clear$1: function Clear$1(withChildren) {
        throw new System.Exception("not impl");
      },
      Emit: function Emit(count) {
        throw new System.Exception("not impl");
      },
      Emit$1: function Emit$1(emitParams, count) {
        throw new System.Exception("not impl");
      },
      GetParticles: function GetParticles(particles) {
        throw new System.Exception("not impl");
      },
      GetParticles$1: function GetParticles$1(particles, size) {
        throw new System.Exception("not impl");
      },
      GetParticles$2: function GetParticles$2(particles, size, offset) {
        throw new System.Exception("not impl");
      },
      IsAlive: function IsAlive() {
        throw new System.Exception("not impl");
      },
      IsAlive$1: function IsAlive$1(withChildren) {
        throw new System.Exception("not impl");
      },
      Pause: function Pause() {
        this.ref.emitter.start = false;
      },
      Pause$1: function Pause$1(withChildren) {
        if (withChildren) {
          this.ref.entity.transform.travelChild(function (child) {
            var particleComp = null;

            if (particleComp = child.entity.getComponent(engine.Particle)) {
              particleComp.emitter.start = false;
            }
          });
        } else {
          this.ref.emitter.start = false;
        }
      },
      Play: function Play() {
        this.ref.emitter.start = true;
      },
      Play$1: function Play$1(withChildren) {
        if (withChildren) {
          this.ref.entity.transform.travelChild(function (child) {
            var particleComp = null;

            if (particleComp = child.entity.getComponent(engine.Particle)) {
              particleComp.emitter.start = true;
            }
          });
        } else {
          this.ref.emitter.start = true;
        }
      },
      SetParticles: function SetParticles(particles) {
        throw new System.Exception("not impl");
      },
      SetParticles$1: function SetParticles$1(particles, size) {
        throw new System.Exception("not impl");
      },
      SetParticles$2: function SetParticles$2(particles, size, offset) {
        throw new System.Exception("not impl");
      },
      Simulate: function Simulate(t) {
        throw new System.Exception("not impl");
      },
      Simulate$1: function Simulate$1(t, withChildren) {
        throw new System.Exception("not impl");
      },
      Simulate$2: function Simulate$2(t, withChildren, restart) {
        throw new System.Exception("not impl");
      },
      Simulate$3: function Simulate$3(t, withChildren, restart, fixedTimeStep) {
        throw new System.Exception("not impl");
      },
      Stop: function Stop() {
        this.ref.emitter.start = false;
      },
      Stop$1: function Stop$1(withChildren) {
        throw new System.Exception("not impl");
      },
      Stop$2: function Stop$2(withChildren, stopBehavior) {
        throw new System.Exception("not impl");
      },
      TriggerSubEmitter: function TriggerSubEmitter(subEmitterIndex) {
        throw new System.Exception("not impl");
      },
      TriggerSubEmitter$1: function TriggerSubEmitter$1(subEmitterIndex, particle) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.ParticleSystem')(MiniGameAdaptor.ParticleSystem);
Object.defineProperty(MiniGameAdaptor.ParticleSystem.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.ParticleSystem.prototype.__properties)
}); // MiniGameAdaptor.ParticleSystem.prototype.__properties.ref = { type: "Particle" };

/***/ }),
/* 105 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.WWW", {
    inherits: [MiniGameAdaptor.CustomYieldInstruction, System.IDisposable],
    statics: {
      methods: {
        EscapeURL: function EscapeURL(s) {
          console.log("WWW call EscapeURL s:" + s);
          var encodeuri = encodeURI(s);
          console.log("WWW call EscapeURL encodeuri:" + encodeuri); // var encodeuricom = encodeURIComponent(s);
          // console.log("WWW call EscapeURL encodeuricom:" + encodeuricom);

          return encodeuri; // throw new System.Exception("not impl");
        },
        EscapeURL$1: function EscapeURL$1(s, e) {
          throw new System.Exception("not impl");
        },
        LoadFromCacheOrDownload: function LoadFromCacheOrDownload(url, version) {
          throw new System.Exception("not impl");
        },
        LoadFromCacheOrDownload$1: function LoadFromCacheOrDownload$1(url, version, crc) {
          throw new System.Exception("not impl");
        },
        LoadFromCacheOrDownload$2: function LoadFromCacheOrDownload$2(url, cachedBundle, crc) {
          if (crc === void 0) {
            crc = 0;
          }

          throw new System.Exception("not impl");
        },
        LoadFromCacheOrDownload$3: function LoadFromCacheOrDownload$3(url, hash) {
          throw new System.Exception("not impl");
        },
        LoadFromCacheOrDownload$4: function LoadFromCacheOrDownload$4(url, hash, crc) {
          throw new System.Exception("not impl");
        },
        UnEscapeURL: function UnEscapeURL(s) {
          console.log("WWW call UnEscapeURL s:" + s);
          var decodeuri = decodeURI(s);
          console.log("WWW call UnEscapeURL decodeuri:" + decodeuri); // throw new System.Exception("not impl");
        },
        UnEscapeURL$1: function UnEscapeURL$1(s, e) {
          throw new System.Exception("not impl");
        }
      }
    },
    fields: {
      _bytes: null,
      _isDone: false,
      _keepWaiting: true,
      _url: "",
      _statusCode: -1,
      _responseHeaders: null,
      _errMsg: ""
    },
    props: {
      assetBundle: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      bytes: {
        get: function get() {
          return Array.from(new Uint8Array(this._bytes));
        }
      },
      bytesDownloaded: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      error: {
        get: function get() {
          return this._errMsg; // throw new System.Exception("not impl");
        }
      },
      isDone: {
        get: function get() {
          return this._isDone; // throw new System.Exception("not impl");
        }
      },
      keepWaiting: {
        get: function get() {
          return this._keepWaiting; // throw new System.Exception("not impl");
        }
      },
      progress: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      responseHeaders: {
        get: function get() {
          return _responseHeaders; // throw new System.Exception("not impl");
        }
      },
      text: {
        get: function get() {
          //没有参数指定返回类型,所以这里默认都返回空,引导去获取 byte
          return ""; // throw new System.Exception("not impl");
        }
      },
      texture: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      textureNonReadable: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      threadPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      uploadProgress: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      url: {
        get: function get() {
          return this._url; // throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(url) {
        this.$initialize();
        MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
        this._url = url;
        var thiz = this;
        console.log("WWW ctors url:" + this._url);
        this._requestTask = wx.request({
          url: url,
          responseType: 'arraybuffer',
          success: function success(res) {
            console.log("WWW call request success");
            console.log(res.data);
            thiz._bytes = res.data;
            thiz._isDone = true;
            thiz._keepWaiting = false;
            thiz._statusCode = res.statusCode;
          },
          fail: function fail(res) {
            console.log("WWW call request fail");
            console.log(res.data);
            thiz._isDone = true;
            thiz._keepWaiting = false;
            thiz._statusCode = res.statusCode;
            thiz._errMsg = res.errMsg;
          }
        });

        this._requestTask.onHeadersReceived(function (res) {
          console.log('WWW call request onHeadersReceived', res.header);
        });

        console.log("WWW call request"); //                 throw new System.Exception("not impl");
      },
      $ctor1: function $ctor1(url, postData) {
        this.$initialize();
        MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
        this._url = url;
        var thiz = this;
        console.log("WWW ctors url:" + this._url + ",postData:" + postData);
        this._uploadTask = wx.request({
          url: url,
          responseType: 'arraybuffer',
          method: 'POST',
          data: postData,
          success: function success(res) {
            console.log("WWW call request success");
            console.log(res.data);
            thiz._bytes = res.data;
            thiz._isDone = true;
            thiz._keepWaiting = false;
            thiz._statusCode = res.statusCode;
          },
          fail: function fail(res) {
            console.log("WWW call request fail");
            console.log(res.data);
            thiz._isDone = true;
            thiz._keepWaiting = false;
            thiz._statusCode = res.statusCode;
            thiz._errMsg = res.errMsg;
          }
        });
        console.log("WWW call request"); // throw new System.Exception("not impl");
      },
      $ctor2: function $ctor2(url, postData, headers) {
        this.$initialize();
        MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
        this._url = url;
        var thiz = this;
        console.log("WWW ctors url:" + this._url + ",postData:" + postData + ",headers:" + headers);
        this._requestTask = wx.request({
          url: url,
          responseType: 'arraybuffer',
          method: 'POST',
          data: postData,
          header: headers,
          success: function success(res) {
            console.log("WWW call request success");
            console.log(res.data);
            thiz._bytes = res.data;
            thiz._isDone = true;
            thiz._keepWaiting = false;
            thiz._statusCode = res.statusCode;
          },
          fail: function fail(res) {
            console.log("WWW call request fail");
            console.log(res.data);
            thiz._isDone = true;
            thiz._keepWaiting = false;
            thiz._statusCode = res.statusCode;
            thiz._errMsg = res.errMsg;
          }
        });
        console.log("WWW call request"); // throw new System.Exception("not impl");
      },
      $ctor3: function $ctor3(url, form) {
        //form的 header 尚不清楚如何获取,所以暂时也不支持这个方法,可以使用传参数和 header 的方法替代
        this.$initialize();
        MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
        throw new System.Exception("not impl");
      }
    },
    methods: {
      Dispose: function Dispose() {
        throw new System.Exception("not impl");
      },
      System$IDisposable$Dispose: function System$IDisposable$Dispose() {
        throw new System.Exception("Exception");
      },
      GetAudioClip: function GetAudioClip() {
        throw new System.Exception("not impl");
      },
      GetAudioClip$1: function GetAudioClip$1(threeD) {
        throw new System.Exception("not impl");
      },
      GetAudioClip$2: function GetAudioClip$2(threeD, stream) {
        throw new System.Exception("not impl");
      },
      GetAudioClip$3: function GetAudioClip$3(threeD, stream, audioType) {
        throw new System.Exception("not impl");
      },
      GetAudioClipCompressed: function GetAudioClipCompressed() {
        throw new System.Exception("not impl");
      },
      GetAudioClipCompressed$1: function GetAudioClipCompressed$1(threeD) {
        throw new System.Exception("not impl");
      },
      GetAudioClipCompressed$2: function GetAudioClipCompressed$2(threeD, audioType) {
        throw new System.Exception("not impl");
      },
      LoadImageIntoTexture: function LoadImageIntoTexture(texture) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 106 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.WWWForm", {
    fields: {
      _dictdata: {},
      _strdictdata: ""
    },
    props: {
      data: {
        get: function get() {
          this._strdictdata = JSON.stringify(this._dictdata);
          return this._strdictdata;
        }
      },
      headers: {
        get: function get() {
          //header是只读的,尚不清楚如何获取,暂不支持
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      AddBinaryData: function AddBinaryData(fieldName, contents) {
        throw new System.Exception("not impl");
      },
      AddBinaryData$1: function AddBinaryData$1(fieldName, contents, fileName) {
        throw new System.Exception("not impl");
      },
      AddBinaryData$2: function AddBinaryData$2(fieldName, contents, fileName, mimeType) {
        throw new System.Exception("not impl");
      },
      AddField: function AddField(fieldName, i) {
        this._dictdata[fieldName] = i;
      },
      AddField$1: function AddField$1(fieldName, value) {
        this._dictdata[fieldName] = value;
      },
      AddField$2: function AddField$2(fieldName, value, e) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 107 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.NetworkReachability", {
    $kind: "enum",
    statics: {
      fields: {
        NotReachable: 0,
        ReachableViaCarrierDataNetwork: 1,
        ReachableViaLocalAreaNetwork: 2
      }
    }
  });
});

/***/ }),
/* 108 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Light", {
    inherits: [MiniGameAdaptor.Behaviour],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        },
        GetLights: function GetLights(type, layer) {
          throw new System.Exception("not impl");
        }
      }
    },
    fields: {
      _color: null
    },
    props: {
      bakingOutput: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      // not support, just return the intensity right now
      bounceIntensity: {
        get: function get() {
          return this.intensity;
        },
        set: function set(value) {
          this.intensity = value;
        }
      },
      color: {
        get: function get() {
          if (!this._color) {
            this._color = new MiniGameAdaptor.Color.$ctor1(this.ref.color.r, this.ref.color.g, this.ref.color.b);
          }
        },
        set: function set(value) {
          if (!this._color) {
            this._color = new MiniGameAdaptor.Color.$ctor1(this.ref.color.r, this.ref.color.g, this.ref.color.b);
          }

          this._color.ref = value.ref;
        }
      },
      colorTemperature: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      commandBufferCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      cookie: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      cookieSize: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      cullingMask: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      flare: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      // The Intensity of a light is multiplied with the Light color.
      // The value can be between 0 and 8. This allows you to create over bright lights.
      intensity: {
        get: function get() {
          return this.ref.intensity;
        },
        set: function set(value) {
          this.ref.intensity = MiniGameAdaptor.Mathf.Clamp(value, 0, 8);
        }
      },
      layerShadowCullDistances: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      lightmapBakeType: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      lightShadowCasterMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      range: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      renderMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowAngle: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowBias: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowCustomResolution: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowNearPlane: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowNormalBias: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowRadius: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowResolution: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadows: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowStrength: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      spotAngle: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      type: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Behaviour.ctor.call(this); // this.ref = ref;
      }
    },
    methods: {
      AddCommandBuffer: function AddCommandBuffer(evt, buffer) {
        throw new System.Exception("not impl");
      },
      AddCommandBuffer$1: function AddCommandBuffer$1(evt, buffer, shadowPassMask) {
        throw new System.Exception("not impl");
      },
      AddCommandBufferAsync: function AddCommandBufferAsync(evt, buffer, queueType) {
        throw new System.Exception("not impl");
      },
      AddCommandBufferAsync$1: function AddCommandBufferAsync$1(evt, buffer, shadowPassMask, queueType) {
        throw new System.Exception("not impl");
      },
      GetCommandBuffers: function GetCommandBuffers(evt) {
        throw new System.Exception("not impl");
      },
      RemoveAllCommandBuffers: function RemoveAllCommandBuffers() {
        throw new System.Exception("not impl");
      },
      RemoveCommandBuffer: function RemoveCommandBuffer(evt, buffer) {
        throw new System.Exception("not impl");
      },
      RemoveCommandBuffers: function RemoveCommandBuffers(evt) {
        throw new System.Exception("not impl");
      },
      Reset: function Reset() {
        throw new System.Exception("not impl");
      },
      SetLightDirty: function SetLightDirty() {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Light')(MiniGameAdaptor.Light);
Object.defineProperty(MiniGameAdaptor.Light.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Light.prototype.__properties)
});

/***/ }),
/* 109 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict"; // 加上前缀，防止跟直接调用wx.setStorage传入相同的key时产生冲突

  var prefix = '@@PlayerPrefs_';
  Bridge.define("MiniGameAdaptor.PlayerPrefs", {
    statics: {
      methods: {
        DeleteAll: function DeleteAll() {
          wx.getStorageInfo({
            success: function success(res) {
              res.keys.forEach(function (key) {
                wx.removeStorage({
                  key: prefix + key
                });
              });
            }
          });
        },
        DeleteKey: function DeleteKey(key) {
          wx.removeStorage({
            key: prefix + key
          });
        },
        GetFloat: function GetFloat(key) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var val = wx.getStorageSync(prefix + key);
          return val !== '' ? val : defaultValue;
        },
        GetFloat$1: function GetFloat$1(key) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var val = wx.getStorageSync(prefix + key);
          return val !== '' ? val : defaultValue;
        },
        GetInt: function GetInt(key) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var val = wx.getStorageSync(prefix + key);
          return val !== '' ? val : defaultValue;
        },
        GetInt$1: function GetInt$1(key) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var val = wx.getStorageSync(prefix + key);
          return val !== '' ? val : defaultValue;
        },
        GetString: function GetString(key) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var val = wx.getStorageSync(prefix + key);
          return val !== '' ? val : defaultValue;
        },
        GetString$1: function GetString$1(key) {
          var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var val = wx.getStorageSync(prefix + key);
          return val !== '' ? val : defaultValue;
        },
        HasKey: function HasKey(key) {
          var storageInfo = wx.getStorageInfoSync();
          return storageInfo.keys.includes(prefix + key);
        },
        Save: function Save() {
          return void 0;
        },
        SetFloat: function SetFloat(key, value) {
          wx.setStorage({
            key: prefix + key,
            data: parseFloat(value)
          });
        },
        SetInt: function SetInt(key, value) {
          wx.setStorage({
            key: prefix + key,
            data: parseInt(value)
          });
        },
        SetString: function SetString(key, value) {
          wx.setStorage({
            key: prefix + key,
            data: '' + value
          });
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 110 */
/***/ (function(module, exports) {

var networkType = '';
var targetFrameRate = 60;
wx.getNetworkType({
  success: function success(res) {
    networkType = res.networkType;
  }
});
wx.onNetworkStatusChange(function (res) {
  networkType = res.networkType;
});
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Application", {
    statics: {
      events: {
        lowMemory: null,
        logMessageReceived: null,
        logMessageReceivedThreaded: null,
        onBeforeRender: null,
        focusChanged: null,
        wantsToQuit: null,
        quitting: null
      },
      props: {
        absoluteURL: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        backgroundLoadingPriority: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        buildGUID: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        cloudProjectId: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        companyName: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        consoleLogPath: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        dataPath: {
          get: function get() {
            return __wxConfig.platform === 'devtools' ? 'http://tmp' : 'wxfile://tmp';
          }
        },
        genuine: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        genuineCheckAvailable: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        identifier: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        installerName: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        installMode: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        internetReachability: {
          get: function get() {
            if (networkType === 'none') {
              return MiniGameAdaptor.NetworkReachability.NotReachable;
            } else if (networkType === '2g' || networkType === '3g' || networkType === '4g' || networkType === '5g' || networkType === '6g') {
              return MiniGameAdaptor.NetworkReachability.ReachableViaCarrierDataNetwork;
            } else {
              return MiniGameAdaptor.NetworkReachability.ReachableViaLocalAreaNetwork;
            }
          }
        },
        isBatchMode: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        isConsolePlatform: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        isEditor: {
          get: function get() {
            return false;
          }
        },
        isFocused: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        isMobilePlatform: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        isPlaying: {
          get: function get() {
            return true;
          }
        },
        persistentDataPath: {
          get: function get() {
            return '/usr';
          }
        },
        platform: {
          get: function get() {
            var platform = __wxConfig.platform;

            if (platform === 'android') {
              return MiniGameAdaptor.RuntimePlatform.Android;
            } else if (platform === 'ios') {
              return MiniGameAdaptor.RuntimePlatform.IPhonePlayer;
            } else if (platform === 'devtools') {
              return MiniGameAdaptor.RuntimePlatform.WechatDevtools;
            } else {
              return 'unknown';
            }
          }
        },
        productName: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        runInBackground: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        sandboxType: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        streamingAssetsPath: {
          get: function get() {
            // 随Unity打包存在的文件夹，只读。即读取小游戏代码包文件.(从根目录开始)
            return '';
          }
        },
        systemLanguage: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        targetFrameRate: {
          get: function get() {
            return targetFrameRate;
          },
          set: function set() {
            var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;
            if (fps > 60) fps = 60;
            targetFrameRate = fps;

            if (engine.FrameSystem && engine.FrameSystem.setPreferredFramesPerSecond) {
              engine.FrameSystem.setPreferredFramesPerSecond(fps);
            } else {
              wx.setPreferredFramesPerSecond(fps);
            }
          }
        },
        temporaryCachePath: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        unityVersion: {
          get: function get() {
            return '0';
          }
        },
        version: {
          get: function get() {
            return '0';
          }
        }
      },
      methods: {
        CanStreamedLevelBeLoaded: function CanStreamedLevelBeLoaded(levelIndex) {
          throw new System.Exception("not impl");
        },
        CanStreamedLevelBeLoaded$1: function CanStreamedLevelBeLoaded$1(levelName) {
          throw new System.Exception("not impl");
        },
        GetBuildTags: function GetBuildTags() {
          throw new System.Exception("not impl");
        },
        GetStackTraceLogType: function GetStackTraceLogType(logType) {
          throw new System.Exception("not impl");
        },
        HasProLicense: function HasProLicense() {
          throw new System.Exception("not impl");
        },
        HasUserAuthorization: function HasUserAuthorization(mode) {
          throw new System.Exception("not impl");
        },
        IsPlaying: function IsPlaying(obj) {
          return true;
        },
        OpenURL: function OpenURL(url) {
          throw new System.Exception("not impl");
        },
        Quit: function Quit() {
          wx.exitMiniProgram();
        },
        RequestAdvertisingIdentifierAsync: function RequestAdvertisingIdentifierAsync(delegateMethod) {
          throw new System.Exception("not impl");
        },
        RequestUserAuthorization: function RequestUserAuthorization(mode) {
          throw new System.Exception("not impl");
        },
        SetBuildTags: function SetBuildTags(buildTags) {
          throw new System.Exception("not impl");
        },
        SetStackTraceLogType: function SetStackTraceLogType(logType, stackTraceType) {
          throw new System.Exception("not impl");
        },
        Unload: function Unload() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    }
  });
});

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _System_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(102);

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Screen", {
    statics: {
      props: {
        autorotateToLandscapeLeft: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        autorotateToLandscapeRight: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        autorotateToPortrait: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        autorotateToPortraitUpsideDown: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        currentResolution: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        dpi: {
          get: function get() {
            // console.warn('小游戏不支持获取dpi')
            return 300;
          }
        },
        fullScreen: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        fullScreenMode: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        height: {
          get: function get() {
            var systemInfo = Object(_System_utils__WEBPACK_IMPORTED_MODULE_0__["getWxSystemInfo"])();
            return systemInfo.windowHeight;
          }
        },
        orientation: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        resolutions: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        safeArea: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        },
        sleepTimeout: {
          get: function get() {
            return 0;
          },
          set: function set(value) {
            return 0;
          }
        },
        width: {
          get: function get() {
            var systemInfo = Object(_System_utils__WEBPACK_IMPORTED_MODULE_0__["getWxSystemInfo"])();
            return systemInfo.windowWidth;
          }
        }
      },
      methods: {
        SetResolution: function SetResolution(width, height, fullscreen) {
          throw new System.Exception("not impl");
        },
        SetResolution$1: function SetResolution$1(width, height, fullscreen, preferredRefreshRate) {
          throw new System.Exception("not impl");
        },
        SetResolution$2: function SetResolution$2(width, height, fullscreenMode) {
          throw new System.Exception("not impl");
        },
        SetResolution$3: function SetResolution$3(width, height, fullscreenMode, preferredRefreshRate) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize(); // throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 112 */
/***/ (function(module, exports) {

function isNumber(x) {
  return typeof x === 'number' && x === x;
}

function colorToHexMap(color) {
  var map = {
    'red': '#FF0000',
    'cyan': '#00FFFF',
    'blue': '#0000FF',
    'darkblue': '#00008B',
    'lightblue': '#ADD8E6',
    'purple': '#800080',
    'yellow': '#FFFF00',
    'lime': '#00FF00',
    'fuchsia': '#FF00FF',
    'white': '#FFFFFF',
    'silver': '#C0C0C0',
    'grey': '#808080',
    'black': '#000000',
    'orange': '#FFA500',
    'brown': '#A52A2A',
    'maroon': '#800000',
    'green': '#008000',
    'olive': '#808000',
    'navy': '#000080',
    'teal': '#008080',
    'aqua': '#00FFFF',
    'magenta': '#FF00FF'
  };
  return map[color];
}

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ColorUtility", {
    statics: {
      methods: {
        ToHtmlStringRGBA: function ToHtmlStringRGBA() {
          var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = color.r,
              g = color.g,
              b = color.b,
              a = color.a;

          if (isNumber(r) && isNumber(g) && isNumber(b) && isNumber(a)) {
            r = Math.min(1, Math.max(0, r));
            g = Math.min(1, Math.max(0, g));
            b = Math.min(1, Math.max(0, b));
            a = Math.min(1, Math.max(0, a));
            var htmlStringRGBA = [r, g, b, a].reduce(function (pre, cur) {
              return pre + (cur * 255 | 1 << 8).toString(16).slice(1);
            }, '');
            return htmlStringRGBA;
          } else {
            throw new System.Exception("ToHtmlStringRGBA: params error");
          }
        },
        ToHtmlStringRGB: function ToHtmlStringRGB() {
          var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = color.r,
              g = color.g,
              b = color.b;

          if (isNumber(r) && isNumber(g) && isNumber(b)) {
            r = Math.min(1, Math.max(0, r));
            g = Math.min(1, Math.max(0, g));
            b = Math.min(1, Math.max(0, b));
            var htmlStringRGB = [r, g, b].reduce(function (pre, cur) {
              return pre + (cur * 255 | 1 << 8).toString(16).slice(1);
            }, '');
            return htmlStringRGB;
          } else {
            throw new System.Exception("ToHtmlStringRGB: params error");
          }
        },
        TryParseHtmlString: function TryParseHtmlString() {
          var htmlString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var color = arguments.length > 1 ? arguments[1] : undefined;

          if (!htmlString || !color) {
            throw new System.Exception("TryParseHtmlString: params error");
          }

          function hexToColor(hex, color) {
            var c;
            c = hex.substring(1).split('');

            if (c.length == 3) {
              c = [c[0], c[0], c[1], c[1], c[2], c[2], 'F', 'F'];
            }

            if (c.length == 4) {
              c = [c[0], c[0], c[1], c[1], c[2], c[2], c[3], c[3]];
            }

            if (c.length == 6) {
              c = [c[0], c[1], c[2], c[3], c[4], c[5], 'F', 'F'];
            }

            c = '0x' + c.join('');
            var r = c >> 24 & 255;
            var g = c >> 16 & 255;
            var b = c >> 8 & 255;
            var a = c & 255;

            if (color.setItem) {
              color.setItem(0, r);
              color.setItem(1, g);
              color.setItem(2, b);
              color.setItem(3, a);
            } else if (color.v) {
              color.v.setItem(0, r);
              color.v.setItem(1, g);
              color.v.setItem(2, b);
              color.v.setItem(3, a);
            } else {
              throw new System.Exception("TryParseHtmlString: params error");
            }
          }

          if (/^#(([A-Fa-f0-9]{3}){1,2}|([A-Fa-f0-9]{4}){1,2})$/.test(htmlString)) {
            hexToColor(htmlString, color);
            return true;
          } else if (colorToHexMap(htmlString)) {
            // 文字颜色
            hexToColor(colorToHexMap(htmlString), color);
            return true;
          } else {
            return false;
          }
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 113 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.TextAsset", {
    inherits: function inherits() {
      return [MiniGameAdaptor.Object, System.IEquatable$1(MiniGameAdaptor.TextAsset)];
    },
    $kind: "struct",
    statics: {
      ctors: {
        init: function init(args) {// console.log('MiniGameAdaptor.TextAsset init', args, this)
        }
      },
      methods: {
        Deserialize: function Deserialize(data, comp) {
          comp._path = data.path ? data.path : data.value.path;
          comp._text = data.text ? data.text : data.value.text;
          comp.name = comp._path.substring(comp._path.lastIndexOf('/') + 1, comp._path.lastIndexOf('.'));
          return comp;
        }
      }
    },
    fields: {
      _path: '',
      _text: ''
    },
    props: {
      bytes: {
        get: function get() {
          return this._text;
        }
      },
      text: {
        get: function get() {
          return this._text;
        }
      }
    },
    ctors: {
      ctor: function ctor(string) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
      },
      $ctor1: function $ctor1(string, path) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        this._text = string;
        this._path = path;
      }
    },
    methods: {
      toString: function toString() {
        return this._text;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.TextAsset')(MiniGameAdaptor.TextAsset);
Object.defineProperty(MiniGameAdaptor.TextAsset.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.TextAsset.prototype.__properties)
});
MiniGameAdaptor.TextAsset.prototype.__properties.path = {
  type: "string"
};
MiniGameAdaptor.TextAsset.prototype.__properties.text = {
  type: "string"
};

/***/ }),
/* 114 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Rect", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.Rect)];
    },
    $kind: "struct",
    statics: {
      props: {
        zero: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        MinMaxRect: function MinMaxRect(xmin, ymin, xmax, ymax) {},
        NormalizedToPoint: function NormalizedToPoint(rectangle, normalizedRectCoordinates) {
          throw new System.Exception("not impl");
        },
        PointToNormalized: function PointToNormalized(rectangle, point) {
          throw new System.Exception("not impl");
        },
        op_Equality: function op_Equality(lhs, rhs) {
          throw new System.Exception("not impl");
        },
        op_Inequality: function op_Inequality(lhs, rhs) {
          throw new System.Exception("not impl");
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.Rect();
        }
      }
    },
    fields: {
      _x: 0,
      _y: 0,
      _width: 0,
      _height: 0
    },
    props: {
      center: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      height: {
        get: function get() {
          return this._height;
        },
        set: function set(value) {
          this._height = value;
          return this._height;
        }
      },
      max: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      min: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      position: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      size: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      width: {
        get: function get() {
          return this._width;
        },
        set: function set(value) {
          this._width = value;
          return this._width;
        }
      },
      x: {
        get: function get() {
          return this._x;
        },
        set: function set(value) {
          this._x = value;
          return this._x;
        }
      },
      xMax: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      xMin: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      y: {
        get: function get() {
          return this._y;
        },
        set: function set(value) {
          this._y = value;
          return this._y;
        }
      },
      yMax: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      yMin: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      $ctor1: function $ctor1(x, y, width, height) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      $ctor2: function $ctor2(source) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      $ctor3: function $ctor3(position, size) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      ctor: function ctor(x, y, width, height) {
        this.$initialize();
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
      }
    },
    methods: {
      Contains: function Contains(point) {
        throw new System.Exception("not impl");
      },
      Contains$1: function Contains$1(point) {
        throw new System.Exception("not impl");
      },
      Contains$2: function Contains$2(point, allowInverse) {
        throw new System.Exception("not impl");
      },
      equals: function equals(other) {
        throw new System.Exception("not impl");
      },
      Equals: function Equals(other) {
        throw new System.Exception("not impl");
      },
      System$IEquatable$1$MiniGameAdaptor$Rect$equalsT: function System$IEquatable$1$MiniGameAdaptor$Rect$equalsT(other) {
        throw new System.Exception("Exception");
      },
      getHashCode: function getHashCode() {
        throw new System.Exception("not impl");
      },
      Overlaps: function Overlaps(other) {
        throw new System.Exception("not impl");
      },
      Overlaps$1: function Overlaps$1(other, allowInverse) {
        throw new System.Exception("not impl");
      },
      Set: function Set(x, y, width, height) {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      },
      ToString: function ToString(format) {
        throw new System.Exception("not impl");
      },
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 115 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Bounds", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.Bounds)];
    },
    $kind: "struct",
    statics: {
      methods: {
        op_Equality: function op_Equality(lhs, rhs) {
          throw new System.Exception("not impl");
        },
        op_Inequality: function op_Inequality(lhs, rhs) {
          throw new System.Exception("not impl");
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.Bounds();
        }
      }
    },
    fields: {
      m_Center: null,
      m_Extents: null
    },
    props: {
      center: {
        get: function get() {
          return this.m_Center;
        },
        set: function set(value) {
          this.m_Center = value;
          return this.m_Center;
        }
      },
      extents: {
        get: function get() {
          return this.m_Extents;
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      max: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      min: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      size: {
        get: function get() {
          return this.m_Size;
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      $ctor1: function $ctor1(center, size) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      ctor: function ctor(center, size) {
        this.$initialize();
        this.m_Center = center;
        this.m_Size = size;
      }
    },
    methods: {
      ClosestPoint: function ClosestPoint(point) {
        throw new System.Exception("not impl");
      },
      Contains: function Contains(point) {
        throw new System.Exception("not impl");
      },
      Encapsulate: function Encapsulate(bounds) {
        throw new System.Exception("not impl");
      },
      Encapsulate$1: function Encapsulate$1(point) {
        throw new System.Exception("not impl");
      },
      equals: function equals(other) {
        throw new System.Exception("not impl");
      },
      Equals: function Equals(other) {
        throw new System.Exception("not impl");
      },
      System$IEquatable$1$MiniGameAdaptor$Bounds$equalsT: function System$IEquatable$1$MiniGameAdaptor$Bounds$equalsT(other) {
        throw new System.Exception("Exception");
      },
      Expand: function Expand(amount) {
        throw new System.Exception("not impl");
      },
      Expand$1: function Expand$1(amount) {
        throw new System.Exception("not impl");
      },
      getHashCode: function getHashCode() {
        throw new System.Exception("not impl");
      },
      IntersectRay: function IntersectRay(ray) {
        throw new System.Exception("not impl");
      },
      IntersectRay$1: function IntersectRay$1(ray, distance) {
        throw new System.Exception("not impl");
      },
      Intersects: function Intersects(bounds) {
        throw new System.Exception("not impl");
      },
      SetMinMax: function SetMinMax(min, max) {
        throw new System.Exception("not impl");
      },
      SqrDistance: function SqrDistance(point) {
        throw new System.Exception("not impl");
      },
      toString: function toString() {
        throw new System.Exception("not impl");
      },
      ToString: function ToString(format) {
        throw new System.Exception("not impl");
      },
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 116 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.FogMode", {
    $kind: "enum",
    statics: {
      fields: {
        Linear: 1,
        Exponential: 2,
        ExponentialSquared: 3
      }
    }
  });
});

/***/ }),
/* 117 */
/***/ (function(module, exports) {

/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RenderSettings", {
    statics: {
      fields: {
        _fog: false,
        _color: undefined,
        _ambientLight: undefined,
        _fogMode: 2,
        _endDis: undefined
      },
      props: {
        fog: {
          set: function set(state) {
            this._fog = state;

            if (state) {
              if (game.activeScene.settings.fogMode === 0) {
                game.activeScene.settings.fogMode = this._fogMode + 1;
              }
            } else {
              game.activeScene.settings.fogMode = 0;
            }
          },
          get: function get() {
            return this._fog;
          }
        },
        fogMode: {
          set: function set(mode) {
            this._fogMode = mode;

            if (this._fog) {
              game.activeScene.settings.fogMode = mode + 1;
            }
          },
          get: function get() {
            return this._fogMode;
          }
        },
        fogColor: {
          set: function set(color) {
            this._color = color;
            game.activeScene.settings.fogColor.x = color.r / 255.0;
            game.activeScene.settings.fogColor.y = color.g / 255.0;
            game.activeScene.settings.fogColor.z = color.b / 255.0;
          },
          get: function get() {
            return this._color;
          }
        },
        ambientLight: {
          set: function set(color) {
            this._ambientLight = color;
            game.activeScene.settings.ambientLight.x = color.r / 255.0;
            game.activeScene.settings.ambientLight.y = color.g / 255.0;
            game.activeScene.settings.ambientLight.z = color.b / 255.0;
          },
          get: function get() {
            return this._ambientLight;
          }
        },
        fogDensity: {
          set: function set(density) {
            game.activeScene.settings.fogDensity = density;
          },
          get: function get() {
            return game.activeScene.settings.fogDensity;
          }
        },
        fogStartDistance: {
          set: function set(dis) {
            if (this._endDis != undefined) {
              game.activeScene.settings.fogRange = this._endDis - dis;
            }

            game.activeScene.settings.fogStart = dis;
          },
          get: function get() {
            return game.activeScene.settings.fogStart;
          }
        },
        fogEndDistance: {
          set: function set(dis) {
            this._endDis = dis;
            game.activeScene.settings.fogRange = dis - game.activeScene.settings.fogStart;
          },
          get: function get() {
            return this._endDis;
          }
        }
      }
    },
    fields: {},
    props: {},
    ctors: {},
    methods: {}
  });
});

/***/ }),
/* 118 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Shader", {
    inherits: [MiniGameAdaptor.Object],
    fields: {
      ref: null
    },
    statics: {
      props: {
        globalMaximumLOD: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        },
        globalRenderPipeline: {
          get: function get() {
            throw new System.Exception("not impl");
          },
          set: function set(value) {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        DisableKeyword: function DisableKeyword(keyword) {// throw new System.Exception("not impl");
        },
        EnableKeyword: function EnableKeyword(keyword) {// throw new System.Exception("not impl");
        },
        Find: function Find(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalColor: function GetGlobalColor(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalColor$1: function GetGlobalColor$1(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalFloat: function GetGlobalFloat(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalFloat$1: function GetGlobalFloat$1(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalFloatArray: function GetGlobalFloatArray(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalFloatArray$1: function GetGlobalFloatArray$1(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalFloatArray$2: function GetGlobalFloatArray$2(nameID, values) {
          throw new System.Exception("not impl");
        },
        GetGlobalFloatArray$3: function GetGlobalFloatArray$3(name, values) {
          throw new System.Exception("not impl");
        },
        GetGlobalInt: function GetGlobalInt(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalInt$1: function GetGlobalInt$1(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalMatrix: function GetGlobalMatrix(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalMatrix$1: function GetGlobalMatrix$1(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalMatrixArray: function GetGlobalMatrixArray(nameID, values) {
          throw new System.Exception("not impl");
        },
        GetGlobalMatrixArray$1: function GetGlobalMatrixArray$1(name, values) {
          throw new System.Exception("not impl");
        },
        GetGlobalMatrixArray$2: function GetGlobalMatrixArray$2(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalMatrixArray$3: function GetGlobalMatrixArray$3(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalTexture: function GetGlobalTexture(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalTexture$1: function GetGlobalTexture$1(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalVector: function GetGlobalVector(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalVector$1: function GetGlobalVector$1(name) {
          throw new System.Exception("not impl");
        },
        GetGlobalVectorArray: function GetGlobalVectorArray(nameID, values) {
          throw new System.Exception("not impl");
        },
        GetGlobalVectorArray$1: function GetGlobalVectorArray$1(name, values) {
          throw new System.Exception("not impl");
        },
        GetGlobalVectorArray$2: function GetGlobalVectorArray$2(nameID) {
          throw new System.Exception("not impl");
        },
        GetGlobalVectorArray$3: function GetGlobalVectorArray$3(name) {
          throw new System.Exception("not impl");
        },
        IsKeywordEnabled: function IsKeywordEnabled(keyword) {
          throw new System.Exception("not impl");
        },
        PropertyToID: function PropertyToID(name) {
          throw new System.Exception("not impl");
        },
        SetGlobalBuffer: function SetGlobalBuffer(nameID, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalBuffer$1: function SetGlobalBuffer$1(name, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalColor: function SetGlobalColor(nameID, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalColor$1: function SetGlobalColor$1(name, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalFloat: function SetGlobalFloat(nameID, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalFloat$1: function SetGlobalFloat$1(name, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalFloatArray: function SetGlobalFloatArray(nameID, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalFloatArray$1: function SetGlobalFloatArray$1(nameID, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalFloatArray$2: function SetGlobalFloatArray$2(name, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalFloatArray$3: function SetGlobalFloatArray$3(name, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalInt: function SetGlobalInt(nameID, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalInt$1: function SetGlobalInt$1(name, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalMatrix: function SetGlobalMatrix(nameID, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalMatrix$1: function SetGlobalMatrix$1(name, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalMatrixArray: function SetGlobalMatrixArray(nameID, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalMatrixArray$1: function SetGlobalMatrixArray$1(nameID, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalMatrixArray$2: function SetGlobalMatrixArray$2(name, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalMatrixArray$3: function SetGlobalMatrixArray$3(name, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalTexture: function SetGlobalTexture(nameID, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalTexture$1: function SetGlobalTexture$1(name, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalVector: function SetGlobalVector(nameID, value) {
          throw new System.Exception("not impl");
        },
        SetGlobalVector$1: function SetGlobalVector$1(name, value) {// throw new System.Exception("not impl");
        },
        SetGlobalVectorArray: function SetGlobalVectorArray(nameID, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalVectorArray$1: function SetGlobalVectorArray$1(nameID, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalVectorArray$2: function SetGlobalVectorArray$2(name, values) {
          throw new System.Exception("not impl");
        },
        SetGlobalVectorArray$3: function SetGlobalVectorArray$3(name, values) {
          throw new System.Exception("not impl");
        },
        WarmupAllShaders: function WarmupAllShaders() {
          throw new System.Exception("not impl");
        }
      }
    },
    props: {
      isSupported: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      maximumLOD: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      renderQueue: {
        get: function get() {
          return this.ref._defaultRenderQueue;
        }
      }
    },
    ctors: {
      ctor: function ctor(ref) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        this.ref = ref;
      }
    }
  });
});

/***/ }),
/* 119 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Material", {
    inherits: [MiniGameAdaptor.Object],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp) {
          comp.ref = engine.loader.getAsset(data.path ? data.path : data.value.path);
          return comp;
        }
      }
    },
    fields: {
      ref: null,
      _shader: null,
      _color: null,
      _textures: null
    },
    props: {
      // Unity里Color取值范围为[0, 1]  引擎为[0, 255]
      color: {
        get: function get() {
          if (!this._color) {
            var c = this.ref.getVector ? this.ref.getVector("_Color") : null;

            if (!c) {
              AdaptorDebugger.warn("Material: <" + this.ref._id + "> _Color properties not found");
              return MiniGameAdaptor.Color.white;
            }

            this._color = new MiniGameAdaptor.Color.$ctor2(c[0], c[1], c[2], c[3]).__remap01();
          }

          return this._color;
        },
        set: function set(value) {
          if (value && value instanceof MiniGameAdaptor.Color) {
            this._color = value;

            var remap = value.__remap0255();

            var vec4 = engine.Vector4.createFromNumber(remap.r, remap.g, remap.b, remap.a);

            if (!this.ref.setVector("_Color", vec4)) {
              AdaptorDebugger.warn("Material: <" + this.ref._id + "> _Color properties not found");
            }
          }
        }
      },
      doubleSidedGI: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      enableInstancing: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      globalIlluminationFlags: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      mainTexture: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      mainTextureOffset: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      mainTextureScale: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      passCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      renderQueue: {
        get: function get() {
          return this.ref.renderQueue;
        },
        set: function set(value) {
          this.ref.renderQueue = value;
        }
      },
      // ???
      shader: {
        get: function get() {
          if (!this._shader) {
            this._shader = new MiniGameAdaptor.Shader(this.ref.effect);
          }

          return this._shader;
        },
        set: function set(value) {
          this._shader = value;
        }
      },
      shaderKeywords: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(source) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
      },
      $ctor1: function $ctor1(shader) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
      },
      $ctor2: function $ctor2(ref) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
        this.ref = ref;
      }
    },
    methods: {
      CopyPropertiesFromMaterial: function CopyPropertiesFromMaterial(mat) {
        throw new System.Exception("not impl");
      },
      DisableKeyword: function DisableKeyword(keyword) {
        throw new System.Exception("not impl");
      },
      EnableKeyword: function EnableKeyword(keyword) {
        throw new System.Exception("not impl");
      },
      FindPass: function FindPass(passName) {
        throw new System.Exception("not impl");
      },
      GetColor: function GetColor(nameID) {
        throw new System.Exception("not impl");
      },
      GetColor$1: function GetColor$1(name) {
        throw new System.Exception("not impl");
      },
      GetColorArray: function GetColorArray(nameID, values) {
        throw new System.Exception("not impl");
      },
      GetColorArray$1: function GetColorArray$1(name, values) {
        throw new System.Exception("not impl");
      },
      GetColorArray$2: function GetColorArray$2(nameID) {
        throw new System.Exception("not impl");
      },
      GetColorArray$3: function GetColorArray$3(name) {
        throw new System.Exception("not impl");
      },
      GetFloat: function GetFloat(nameID) {
        throw new System.Exception("not impl");
      },
      GetFloat$1: function GetFloat$1(name) {
        return this.ref.getFloat(name);
      },
      GetFloatArray: function GetFloatArray(nameID) {
        throw new System.Exception("not impl");
      },
      GetFloatArray$1: function GetFloatArray$1(name) {
        throw new System.Exception("not impl");
      },
      GetFloatArray$2: function GetFloatArray$2(nameID, values) {
        throw new System.Exception("not impl");
      },
      GetFloatArray$3: function GetFloatArray$3(name, values) {
        throw new System.Exception("not impl");
      },
      GetInt: function GetInt(nameID) {
        throw new System.Exception("not impl");
      },
      GetInt$1: function GetInt$1(name) {
        throw new System.Exception("not impl");
      },
      GetMatrix: function GetMatrix(nameID) {
        throw new System.Exception("not impl");
      },
      GetMatrix$1: function GetMatrix$1(name) {
        throw new System.Exception("not impl");
      },
      GetMatrixArray: function GetMatrixArray(nameID, values) {
        throw new System.Exception("not impl");
      },
      GetMatrixArray$1: function GetMatrixArray$1(name, values) {
        throw new System.Exception("not impl");
      },
      GetMatrixArray$2: function GetMatrixArray$2(nameID) {
        throw new System.Exception("not impl");
      },
      GetMatrixArray$3: function GetMatrixArray$3(name) {
        throw new System.Exception("not impl");
      },
      GetPassName: function GetPassName(pass) {
        throw new System.Exception("not impl");
      },
      GetShaderPassEnabled: function GetShaderPassEnabled(passName) {
        throw new System.Exception("not impl");
      },
      GetTag: function GetTag(tag, searchFallbacks) {
        throw new System.Exception("not impl");
      },
      GetTag$1: function GetTag$1(tag, searchFallbacks, defaultValue) {
        throw new System.Exception("not impl");
      },
      GetTexture: function GetTexture(nameID) {
        throw new System.Exception("not impl");
      },
      GetTexture$1: function GetTexture$1(name) {
        if (!this._textures) {
          this._textures = [];

          this.ref._textures.forEach(function (tex) {});
        }

        return this._textures;
      },
      GetTextureOffset: function GetTextureOffset(nameID) {
        throw new System.Exception("not impl");
      },
      GetTextureOffset$1: function GetTextureOffset$1(name) {
        throw new System.Exception("not impl");
      },
      GetTexturePropertyNameIDs: function GetTexturePropertyNameIDs() {
        throw new System.Exception("not impl");
      },
      GetTexturePropertyNameIDs$1: function GetTexturePropertyNameIDs$1(outNames) {
        throw new System.Exception("not impl");
      },
      GetTexturePropertyNames: function GetTexturePropertyNames() {
        throw new System.Exception("not impl");
      },
      GetTexturePropertyNames$1: function GetTexturePropertyNames$1(outNames) {
        throw new System.Exception("not impl");
      },
      GetTextureScale: function GetTextureScale(nameID) {
        throw new System.Exception("not impl");
      },
      GetTextureScale$1: function GetTextureScale$1(name) {
        throw new System.Exception("not impl");
      },
      GetVector: function GetVector(nameID) {
        throw new System.Exception("not impl");
      },
      GetVector$1: function GetVector$1(name) {
        var vector = this.ref._uniforms.getArray(name);

        if (!vector || vector && vector.length != 4) {
          return MiniGameAdaptor.Vector4.zero;
        }

        return new MiniGameAdaptor.Vector4.$ctor5(vector);
      },
      GetVectorArray: function GetVectorArray(nameID, values) {
        throw new System.Exception("not impl");
      },
      GetVectorArray$1: function GetVectorArray$1(name, values) {
        throw new System.Exception("not impl");
      },
      GetVectorArray$2: function GetVectorArray$2(nameID) {
        throw new System.Exception("not impl");
      },
      GetVectorArray$3: function GetVectorArray$3(name) {
        throw new System.Exception("not impl");
      },
      HasProperty: function HasProperty(nameID) {
        // throw new System.Exception("not impl");
        return false;
      },
      HasProperty$1: function HasProperty$1(name) {
        // throw new System.Exception("not impl");
        return this.ref._uniforms.hasKey(name);
      },
      IsKeywordEnabled: function IsKeywordEnabled(keyword) {
        throw new System.Exception("not impl");
      },
      Lerp: function Lerp(start, end, t) {
        throw new System.Exception("not impl");
      },
      SetBuffer: function SetBuffer(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetBuffer$1: function SetBuffer$1(name, value) {
        throw new System.Exception("not impl");
      },
      SetColor: function SetColor(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetColor$1: function SetColor$1(name, value) {
        var c = this.ref._uniforms.getArray(name);

        if (!c) {
          var raw = [];

          for (var i = 0; i < 4; i++) {
            raw.push(c.getItem(i));
          }

          this.ref._uniforms.setArray(name, raw);
        }
      },
      SetColorArray: function SetColorArray(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetColorArray$1: function SetColorArray$1(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetColorArray$2: function SetColorArray$2(name, values) {
        throw new System.Exception("not impl");
      },
      SetColorArray$3: function SetColorArray$3(name, values) {
        throw new System.Exception("not impl");
      },
      SetFloat: function SetFloat(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetFloat$1: function SetFloat$1(name, value) {
        this.ref.setFloat(name, value);
      },
      SetFloatArray: function SetFloatArray(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetFloatArray$1: function SetFloatArray$1(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetFloatArray$2: function SetFloatArray$2(name, values) {
        throw new System.Exception("not impl");
      },
      SetFloatArray$3: function SetFloatArray$3(name, values) {
        throw new System.Exception("not impl");
      },
      SetInt: function SetInt(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetInt$1: function SetInt$1(name, value) {
        this.SetFloat$1(name, value);
      },
      SetMatrix: function SetMatrix(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetMatrix$1: function SetMatrix$1(name, value) {
        this.ref.setMatrix(name, value.ref);
      },
      SetMatrixArray: function SetMatrixArray(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetMatrixArray$1: function SetMatrixArray$1(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetMatrixArray$2: function SetMatrixArray$2(name, values) {
        throw new System.Exception("not impl");
      },
      SetMatrixArray$3: function SetMatrixArray$3(name, values) {
        throw new System.Exception("not impl");
      },
      SetOverrideTag: function SetOverrideTag(tag, val) {
        throw new System.Exception("not impl");
      },
      SetPass: function SetPass(pass) {
        throw new System.Exception("not impl");
      },
      SetShaderPassEnabled: function SetShaderPassEnabled(passName, enabled) {
        throw new System.Exception("not impl");
      },
      SetTexture: function SetTexture(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetTexture$1: function SetTexture$1(name, value) {
        throw new System.Exception("not impl");
      },
      SetTextureOffset: function SetTextureOffset(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetTextureOffset$1: function SetTextureOffset$1(name, value) {
        throw new System.Exception("not impl");
      },
      SetTextureScale: function SetTextureScale(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetTextureScale$1: function SetTextureScale$1(name, value) {
        throw new System.Exception("not impl");
      },
      SetVector: function SetVector(nameID, value) {
        throw new System.Exception("not impl");
      },
      SetVector$1: function SetVector$1(name, value) {
        this.ref.setVector(name, value.ref);
      },
      SetVectorArray: function SetVectorArray(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetVectorArray$1: function SetVectorArray$1(nameID, values) {
        throw new System.Exception("not impl");
      },
      SetVectorArray$2: function SetVectorArray$2(name, values) {
        throw new System.Exception("not impl");
      },
      SetVectorArray$3: function SetVectorArray$3(name, values) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Material')(MiniGameAdaptor.Material);
Object.defineProperty(MiniGameAdaptor.Material.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Material.prototype.__properties)
});

/***/ }),
/* 120 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Renderer", {
    inherits: [MiniGameAdaptor.Component],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        }
      }
    },
    fields: {
      _material: null,
      _sharedMaterial: null,
      _materials: null,
      _sharedMaterials: null,
      _lightmapScaleOffset: null
    },
    props: {
      allowOcclusionWhenDynamic: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      bounds: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      enabled: {
        get: function get() {
          return this.ref.active;
        },
        set: function set(value) {
          this.ref.active = value;
        }
      },
      isPartOfStaticBatch: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isVisible: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      lightmapIndex: {
        get: function get() {
          return this.ref.lightMapIndex;
        },
        set: function set(value) {
          this.ref.lightMapIndex = value;
        }
      },
      lightmapScaleOffset: {
        get: function get() {
          if (!this._lightmapScaleOffset) {
            this._lightmapScaleOffset = new MiniGameAdaptor.Vector4.$ctor4(this.ref.lightMapScaleOffset);
          }

          return this._lightmapScaleOffset;
        },
        set: function set(value) {
          if (!this._lightmapScaleOffset) {
            this._lightmapScaleOffset = new MiniGameAdaptor.Vector4.$ctor4(value.ref);
          }

          this.ref.lightMapScaleOffset = value.ref;
        }
      },
      lightProbeProxyVolumeOverride: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      lightProbeUsage: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      localToWorldMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      material: {
        get: function get() {
          if (!this._material) {
            this._material = new MiniGameAdaptor.Material.$ctor2(this.ref.material);
          }

          return this._material;
        },
        set: function set(value) {
          this.ref.material = value.ref;
          this._material = value;
        }
      },
      materials: {
        get: function get() {
          var _this = this;

          if (!this._materials) {
            this._materials = [];
            this.ref.materials.forEach(function (mat) {
              _this._materials.push(new MiniGameAdaptor.Material.$ctor2(mat));
            });
          }

          return this._materials;
        },
        set: function set(value) {
          var _this2 = this;

          /*this.ref.materials.clear();
          value.forEach(mat => {
              this.ref.materials.push(mat.ref);
          });*/
          this.ref.clearAllMaterials();
          value.forEach(function (mat) {
            _this2.ref.addMaterial(mat.ref);
          });
        }
      },
      motionVectorGenerationMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      probeAnchor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      realtimeLightmapIndex: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      realtimeLightmapScaleOffset: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      receiveShadows: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      reflectionProbeUsage: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rendererPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      renderingLayerMask: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      shadowCastingMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sharedMaterial: {
        get: function get() {
          return this.material;
        },
        set: function set(value) {
          this.material = value;
        }
      },
      sharedMaterials: {
        get: function get() {
          return this.materials;
        },
        set: function set(value) {
          this.materials = value;
        }
      },
      sortingLayerID: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sortingLayerName: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sortingOrder: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      worldToLocalMatrix: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(entity) {
        this.$initialize();
        MiniGameAdaptor.Component.ctor.call(this);
      }
    },
    methods: {
      GetClosestReflectionProbes: function GetClosestReflectionProbes(result) {
        throw new System.Exception("not impl");
      },
      GetMaterials: function GetMaterials(m) {
        throw new System.Exception("not impl");
      },
      GetPropertyBlock: function GetPropertyBlock(properties) {
        throw new System.Exception("not impl");
      },
      GetPropertyBlock$1: function GetPropertyBlock$1(properties, materialIndex) {
        throw new System.Exception("not impl");
      },
      GetSharedMaterials: function GetSharedMaterials(m) {
        throw new System.Exception("not impl");
      },
      HasPropertyBlock: function HasPropertyBlock() {
        throw new System.Exception("not impl");
      },
      SetPropertyBlock: function SetPropertyBlock(properties) {
        throw new System.Exception("not impl");
      },
      SetPropertyBlock$1: function SetPropertyBlock$1(properties, materialIndex) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Renderer')(MiniGameAdaptor.Renderer);
Object.defineProperty(MiniGameAdaptor.Renderer.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Renderer.prototype.__properties)
});

/***/ }),
/* 121 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.LineRenderer", {
    inherits: [MiniGameAdaptor.Renderer],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      alignment: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      colorGradient: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      endColor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      endWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      generateLightingData: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      loop: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      numCapVertices: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      numCornerVertices: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      positionCount: {
        get: function get() {
          return this.ref.posCount;
        },
        set: function set(value) {
          this.ref.posCount = value;
        }
      },
      shadowBias: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      startColor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      startWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      textureMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useWorldSpace: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      widthCurve: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      widthMultiplier: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Renderer.ctor.call(this);
      }
    },
    methods: {
      BakeMesh: function BakeMesh(mesh, useTransform) {
        if (useTransform === void 0) {
          useTransform = false;
        }

        throw new System.Exception("not impl");
      },
      BakeMesh$1: function BakeMesh$1(mesh, camera, useTransform) {
        if (useTransform === void 0) {
          useTransform = false;
        }

        throw new System.Exception("not impl");
      },
      GetPosition: function GetPosition(index) {
        throw new System.Exception("not impl");
      },
      GetPositions: function GetPositions(positions) {
        throw new System.Exception("not impl");
      },
      SetPosition: function SetPosition(index, position) {
        this.ref.setPosition(index, position.ref);
      },
      SetPositions: function SetPositions(positions) {
        throw new System.Exception("not impl");
      },
      Simplify: function Simplify(tolerance) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.LineRenderer')(MiniGameAdaptor.LineRenderer);
Object.defineProperty(MiniGameAdaptor.LineRenderer.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.LineRenderer.prototype.__properties)
});
MiniGameAdaptor.LineRenderer.prototype.__properties.ref = {
  type: "LineRenderer"
};

/***/ }),
/* 122 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.MeshRenderer", {
    inherits: [MiniGameAdaptor.Renderer],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      additionalVertexStreams: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      subMeshStartIndex: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(entity) {
        this.$initialize();
        MiniGameAdaptor.Renderer.ctor.call(this);

        if (!entity.getComponent(engine.MeshRenderer)) {
          this.ref = entity.addComponent(engine.MeshRenderer);
        }
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.MeshRenderer')(MiniGameAdaptor.MeshRenderer);
Object.defineProperty(MiniGameAdaptor.MeshRenderer.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.MeshRenderer.prototype.__properties)
});
MiniGameAdaptor.MeshRenderer.prototype.__properties.ref = {
  type: "MeshRenderer"
};

/***/ }),
/* 123 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.SkinnedMeshRenderer", {
    inherits: [MiniGameAdaptor.Renderer],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        }
      }
    },
    fields: {
      ref: null
    },
    props: {
      bones: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      forceMatrixRecalculationPerRender: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      localBounds: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      quality: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rootBone: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sharedMesh: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      skinnedMotionVectors: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      updateWhenOffscreen: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Renderer.ctor.call(this);
      }
    },
    methods: {
      BakeMesh: function BakeMesh(mesh) {
        throw new System.Exception("not impl");
      },
      GetBlendShapeWeight: function GetBlendShapeWeight(index) {
        throw new System.Exception("not impl");
      },
      SetBlendShapeWeight: function SetBlendShapeWeight(index, value) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.SkinnedMeshRenderer')(MiniGameAdaptor.SkinnedMeshRenderer);
Object.defineProperty(MiniGameAdaptor.SkinnedMeshRenderer.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.SkinnedMeshRenderer.prototype.__properties)
}); // MiniGameAdaptor.SkinnedMeshRenderer.prototype.__properties.ref = { type: "SkinnedMeshRenderer" };

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(51);



function propsChecker(mesh) {
  return mesh.vertices.length && mesh.normals.length && mesh.uv.length && mesh.tangents.length && mesh.ref._subMeshs.length && mesh.ref._subMeshs.length === mesh.subMeshCount && !mesh.engineMesh;
}

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Mesh", {
    inherits: [MiniGameAdaptor.Object],
    fields: {
      ref: null
    },
    props: {
      bindposes: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      blendShapeCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      boneWeights: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      bounds: {
        get: function get() {
          var center = new MiniGameAdaptor.Vector3.$ctor3(this.ref.boundBox.center)._FlipX();
          /*const size = new MiniGameAdaptor.Vector3.$ctor3(this.ref.boundBox.size)._FlipX();*/


          var size = new MiniGameAdaptor.Vector3.$ctor2(1, 1, 1);
          return new MiniGameAdaptor.Bounds.ctor(center, size);
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      colors: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      colors32: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      indexFormat: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isReadable: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      normals: {
        get: function get() {
          return this._normals || [];
        },
        set: function set(value) {
          this._normals = value;

          if (propsChecker(this)) {
            Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["createEngineMesh"])(this);
          }
        }
      },
      subMeshCount: {
        get: function get() {
          return this._subMeshCount || this.ref.getSubMeshCount();
        },
        set: function set(value) {
          this._subMeshCount = value;
        }
      },
      tangents: {
        get: function get() {
          return this._tangents || [];
        },
        set: function set(value) {
          this._tangents = value;

          if (propsChecker(this)) {
            Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["createEngineMesh"])(this);
          }
        }
      },
      triangles: {
        get: function get() {
          return this._triangles || [];
        },
        set: function set(value) {
          this._triangles = value;

          if (propsChecker(this)) {
            Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["createEngineMesh"])(this);
          }
        }
      },
      uv: {
        get: function get() {
          return this._uv || [];
        },
        set: function set(value) {
          this._uv = value;

          if (propsChecker(this)) {
            Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["createEngineMesh"])(this);
          }
        }
      },
      uv2: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      uv3: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      uv4: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      uv5: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      uv6: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      uv7: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      uv8: {
        get: function get() {
          return [];
        },
        set: function set(value) {
          return [];
        }
      },
      vertexBufferCount: {
        get: function get() {
          return 0;
        }
      },
      vertexCount: {
        get: function get() {
          return this._vertices.length;
        }
      },
      vertices: {
        get: function get() {
          return this._vertices || [];
        },
        set: function set(value) {
          this._vertices = value;

          if (propsChecker(this)) {
            Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["createEngineMesh"])(this);
          }
        }
      }
    },
    ctors: {
      ctor: function ctor(ref) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);

        if (ref) {
          this.ref = ref;
          this._buffer = ref._getRawVertexBuffer();
          this._vertexLayout = ref._vertexLayout; // 顶点数据

          this._vertices = Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["getPointDataByUsage"])(this._buffer, this._vertexLayout, _MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["EnumVertexLayoutUsage"].POSITION); // uv数据

          this._uv = Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["getPointDataByUsage"])(this._buffer, this._vertexLayout, _MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["EnumVertexLayoutUsage"].UV0); // normals数据

          this._normals = Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["getPointDataByUsage"])(this._buffer, this._vertexLayout, _MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["EnumVertexLayoutUsage"].NORMAL); // tangents数据

          this._tangents = Object(_MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["getPointDataByUsage"])(this._buffer, this._vertexLayout, _MeshHelper_js__WEBPACK_IMPORTED_MODULE_1__["EnumVertexLayoutUsage"].TANGENT); // 三角形数据

          this._triangles = ref._getRawIndiceBuffer();
        } else {
          // 这里先临时创建一个空的引擎Mesh实例，等Mesh数据补齐的时候会执行真正的引擎Mesh创建逻辑
          this.ref = new engine.Mesh();
        }
      }
    },
    methods: {
      AddBlendShapeFrame: function AddBlendShapeFrame(shapeName, frameWeight, deltaVertices, deltaNormals, deltaTangents) {
        throw new System.Exception("not impl");
      },
      Clear: function Clear() {
        throw new System.Exception("not impl");
      },
      Clear$1: function Clear$1(keepVertexLayout) {
        throw new System.Exception("not impl");
      },
      ClearBlendShapes: function ClearBlendShapes() {
        throw new System.Exception("not impl");
      },
      CombineMeshes: function CombineMeshes(combine) {
        throw new System.Exception("not impl");
      },
      CombineMeshes$1: function CombineMeshes$1(combine, mergeSubMeshes) {
        throw new System.Exception("not impl");
      },
      CombineMeshes$2: function CombineMeshes$2(combine, mergeSubMeshes, useMatrices) {
        throw new System.Exception("not impl");
      },
      CombineMeshes$3: function CombineMeshes$3(combine, mergeSubMeshes, useMatrices, hasLightmapData) {
        throw new System.Exception("not impl");
      },
      GetBaseVertex: function GetBaseVertex(submesh) {
        throw new System.Exception("not impl");
      },
      GetBindposes: function GetBindposes(bindposes) {
        throw new System.Exception("not impl");
      },
      GetBlendShapeFrameCount: function GetBlendShapeFrameCount(shapeIndex) {
        throw new System.Exception("not impl");
      },
      GetBlendShapeFrameVertices: function GetBlendShapeFrameVertices(shapeIndex, frameIndex, deltaVertices, deltaNormals, deltaTangents) {
        throw new System.Exception("not impl");
      },
      GetBlendShapeFrameWeight: function GetBlendShapeFrameWeight(shapeIndex, frameIndex) {
        throw new System.Exception("not impl");
      },
      GetBlendShapeIndex: function GetBlendShapeIndex(blendShapeName) {
        throw new System.Exception("not impl");
      },
      GetBlendShapeName: function GetBlendShapeName(shapeIndex) {
        throw new System.Exception("not impl");
      },
      GetBoneWeights: function GetBoneWeights(boneWeights) {
        throw new System.Exception("not impl");
      },
      GetColors: function GetColors(colors) {
        throw new System.Exception("not impl");
      },
      GetColors$1: function GetColors$1(colors) {
        throw new System.Exception("not impl");
      },
      GetIndexCount: function GetIndexCount(submesh) {
        throw new System.Exception("not impl");
      },
      GetIndexStart: function GetIndexStart(submesh) {
        throw new System.Exception("not impl");
      },
      GetIndices: function GetIndices(submesh) {
        throw new System.Exception("not impl");
      },
      GetIndices$1: function GetIndices$1(submesh, applyBaseVertex) {
        throw new System.Exception("not impl");
      },
      GetIndices$2: function GetIndices$2(indices, submesh) {
        throw new System.Exception("not impl");
      },
      GetIndices$3: function GetIndices$3(indices, submesh, applyBaseVertex) {
        throw new System.Exception("not impl");
      },
      GetNormals: function GetNormals(normals) {
        throw new System.Exception("not impl");
      },
      GetTangents: function GetTangents(tangents) {
        throw new System.Exception("not impl");
      },
      GetTopology: function GetTopology(submesh) {
        throw new System.Exception("not impl");
      },
      GetTriangles: function GetTriangles(submesh) {
        if (this.subMeshCount === 1 && submesh === 0) {
          return this._triangles;
        } else {
          throw new System.Exception("not impl");
        }
      },
      GetTriangles$1: function GetTriangles$1(submesh, applyBaseVertex) {
        throw new System.Exception("not impl");
      },
      GetTriangles$2: function GetTriangles$2(triangles, submesh) {
        throw new System.Exception("not impl");
      },
      GetTriangles$3: function GetTriangles$3(triangles, submesh, applyBaseVertex) {
        throw new System.Exception("not impl");
      },
      GetUVDistributionMetric: function GetUVDistributionMetric(uvSetIndex) {
        throw new System.Exception("not impl");
      },
      GetUVs: function GetUVs(channel, uvs) {
        throw new System.Exception("not impl");
      },
      GetUVs$1: function GetUVs$1(channel, uvs) {
        throw new System.Exception("not impl");
      },
      GetUVs$2: function GetUVs$2(channel, uvs) {
        throw new System.Exception("not impl");
      },
      GetVertices: function GetVertices(vertices) {
        throw new System.Exception("not impl");
      },
      MarkDynamic: function MarkDynamic() {
        throw new System.Exception("not impl");
      },
      RecalculateBounds: function RecalculateBounds() {
        throw new System.Exception("not impl");
      },
      RecalculateNormals: function RecalculateNormals() {
        throw new System.Exception("not impl");
      },
      RecalculateTangents: function RecalculateTangents() {
        throw new System.Exception("not impl");
      },
      SetColors: function SetColors(inColors) {
        throw new System.Exception("not impl");
      },
      SetColors$1: function SetColors$1(inColors) {
        throw new System.Exception("not impl");
      },
      SetIndices: function SetIndices(indices, topology, submesh) {
        throw new System.Exception("not impl");
      },
      SetIndices$1: function SetIndices$1(indices, topology, submesh, calculateBounds) {
        throw new System.Exception("not impl");
      },
      SetIndices$2: function SetIndices$2(indices, topology, submesh, calculateBounds, baseVertex) {
        throw new System.Exception("not impl");
      },
      SetNormals: function SetNormals(inNormals) {
        throw new System.Exception("not impl");
      },
      SetTangents: function SetTangents(inTangents) {
        throw new System.Exception("not impl");
      },
      SetTriangles: function SetTriangles(triangles, submesh) {
        throw new System.Exception("not impl");
      },
      SetTriangles$1: function SetTriangles$1(triangles, submesh, calculateBounds) {
        throw new System.Exception("not impl");
      },
      SetTriangles$2: function SetTriangles$2(triangles, submesh, calculateBounds, baseVertex) {
        throw new System.Exception("not impl");
      },
      SetTriangles$3: function SetTriangles$3(triangles, submesh) {
        throw new System.Exception("not impl");
      },
      SetTriangles$4: function SetTriangles$4(triangles, submesh, calculateBounds) {
        if (!this._subMeshs) {
          this._subMeshs = [];
        }

        var offset = submesh === 0 ? 0 : this.ref.getIndiceLength(submesh - 1);

        this.ref._addSubMesh(triangles.length, offset);

        this.triangles = (this.triangles || []).concat(triangles);

        this._subMeshs.push({
          length: triangles.length,
          offset: offset
        });
      },
      SetTriangles$5: function SetTriangles$5(triangles, submesh, calculateBounds, baseVertex) {
        throw new System.Exception("not impl");
      },
      SetUVs: function SetUVs(channel, uvs) {
        throw new System.Exception("not impl");
      },
      SetUVs$1: function SetUVs$1(channel, uvs) {
        throw new System.Exception("not impl");
      },
      SetUVs$2: function SetUVs$2(channel, uvs) {
        throw new System.Exception("not impl");
      },
      SetVertices: function SetVertices(inVertices) {
        throw new System.Exception("not impl");
      },
      UploadMeshData: function UploadMeshData(markNoLongerReadable) {
        throw new System.Exception("not impl");
      },
      test: function test(vertices, triangles) {
        var phyMesh = new _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].PhysMesh(_Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance);
        var float32 = new Float32Array(vertices.length * 3);
        var index = 0;
        vertices.forEach(function (item) {
          float32[index] = item.x;
          index++;
          float32[index] = item.y;
          index++;
          float32[index] = item.z;
          index++;
        });
        phyMesh.SetVertices(float32, vertices.length);
        var indices = new Float32Array(triangles.length);
        triangles.forEach(function (item, index) {
          indices[index] = triangles[index];
        });
        phyMesh.SetTriangles(indices, triangles.length / 3);
        var nativeCollider = new _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].MeshCollider(_Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, true, 14, phyMesh);
        /*const rigidBody = new Phys3D.StaticRigidbody(physx.Phys3dInstance);*/

        var rigidBody = new _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].DynamicRigidbody(_Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["physx"].Phys3dInstance, 10);
        rigidBody.position = new _Physics_Physx__WEBPACK_IMPORTED_MODULE_0__["Phys3D"].RawVec3f(-2, 0, 0);
        nativeCollider.attachedRigidbody = rigidBody;
      }
    }
  });
});

/***/ }),
/* 125 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.MeshFilter", {
    inherits: [MiniGameAdaptor.Component],
    fields: {
      _mesh: null,
      _sharedMesh: null
    },
    props: {
      mesh: {
        get: function get() {
          if (!this._mesh) {
            var renderer = this.GetComponent(MiniGameAdaptor.Renderer);

            if (renderer) {
              this._mesh = new MiniGameAdaptor.Mesh(renderer.ref.mesh);
            }
          }

          return this._mesh;
        },
        set: function set(value) {
          this._mesh = value;
          this.entity.getComponent(engine.MeshRenderer).mesh = value.ref;
          /*this.mesh.ref = value.ref;*/
        }
      },
      sharedMesh: {
        get: function get() {
          if (!this._sharedMesh) {
            var renderer = this.GetComponent(MiniGameAdaptor.Renderer);

            if (renderer) {
              // ?
              this._sharedMesh = new MiniGameAdaptor.Mesh(renderer.ref.mesh);
            }
          }

          return this._sharedMesh;
        },
        set: function set(value) {
          debugger;
          this.sharedMesh.ref = value.ref;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.MeshFilter')(MiniGameAdaptor.MeshFilter);
Object.defineProperty(MiniGameAdaptor.MeshFilter.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.MeshFilter.prototype.__properties)
});

/***/ }),
/* 126 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ShaderVariantCollection", {
    inherits: [MiniGameAdaptor.Object],
    props: {
      isWarmedUp: {
        get: function get() {}
      },
      shaderCount: {
        get: function get() {}
      },
      variantCount: {
        get: function get() {}
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
      }
    },
    methods: {
      Add: function Add(variant) {},
      Clear: function Clear() {},
      Contains: function Contains(variant) {},
      Remove: function Remove(variant) {},
      WarmUp: function WarmUp() {}
    }
  });
});

/***/ }),
/* 127 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ShaderVariantCollection.ShaderVariant", {
    $kind: "nested struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.ShaderVariantCollection.ShaderVariant();
        }
      }
    },
    fields: {
      shader: null,
      passType: 0,
      keywords: null
    },
    ctors: {
      $ctor1: function $ctor1(shader, passType, keywords) {
        if (keywords === void 0) {
          keywords = [];
        }

        this.$initialize();
      },
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      getHashCode: function getHashCode() {
        var h = Bridge.addHash([5169038494, this.shader, this.passType, this.keywords]);
        return h;
      },
      equals: function equals(o) {
        if (!Bridge.is(o, MiniGameAdaptor.ShaderVariantCollection.ShaderVariant)) {
          return false;
        }

        return Bridge.equals(this.shader, o.shader) && Bridge.equals(this.passType, o.passType) && Bridge.equals(this.keywords, o.keywords);
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.ShaderVariantCollection.ShaderVariant();
        s.shader = this.shader;
        s.passType = this.passType;
        s.keywords = this.keywords;
        return s;
      }
    }
  });
});

/***/ }),
/* 128 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.LightmapData", {
    inherits: [MiniGameAdaptor.Object],
    fields: {
      lightmapColor_: null,
      lightmapDir_: null,
      shadowMask_: null
    },
    props: {
      lightmapColor: {
        get: function get() {
          return this.lightmapColor_;
        }
      },
      lightmapDir: {
        get: function get() {
          return this.lightmapDir_;
        }
      },
      shadowMask: {
        get: function get() {
          return this.shadowMask_;
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Behaviour.ctor.call(this);
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.LightmapData')(MiniGameAdaptor.LightmapData);
Object.defineProperty(MiniGameAdaptor.LightmapData.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.LightmapData.prototype.__properties)
});

/***/ }),
/* 129 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.LightmapSettings", {
    inherits: [MiniGameAdaptor.Object],
    statics: {
      fields: {
        _lightmaps: []
      },
      props: {
        lightmaps: {
          get: function get() {
            return this._lightmaps;
          },
          set: function set(value) {
            this._lightmaps = value;
          }
        },
        lightmapsMode: {
          get: function get() {},
          set: function set(value) {}
        },
        lightProbes: {
          get: function get() {},
          set: function set(value) {}
        }
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.LightmapSettings')(MiniGameAdaptor.LightmapSettings);
Object.defineProperty(MiniGameAdaptor.LightmapSettings.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.LightmapSettings.prototype.__properties)
});

/***/ }),
/* 130 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.AnisotropicFiltering", {
    $kind: "enum",
    statics: {
      fields: {
        Disable: 0,
        Enable: 1,
        ForceEnable: 2
      }
    }
  });
});

/***/ }),
/* 131 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.FilterMode", {
    $kind: "enum",
    statics: {
      fields: {
        Point: 0,
        Bilinear: 1,
        Trilinear: 2
      }
    }
  });
});

/***/ }),
/* 132 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.PlayMode", {
    $kind: "enum",
    statics: {
      fields: {
        StopSameLayer: 0,
        StopAll: 4
      }
    }
  });
});

/***/ }),
/* 133 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Motion", {
    inherits: [MiniGameAdaptor.Object]
  });
});

/***/ }),
/* 134 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.AnimationClip", {
    inherits: [MiniGameAdaptor.Motion],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        }
      }
    },
    fields: {
      ref: null,
      name: ""
    },
    props: {
      empty: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      events: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      frameRate: {
        get: function get() {
          return this.ref.frameRate;
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      hasGenericRootTransform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      hasMotionCurves: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      hasMotionFloatCurves: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      hasRootCurves: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      humanMotion: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      legacy: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      length: {
        get: function get() {
          return this.ref.length;
        }
      },
      localBounds: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      wrapMode: {
        get: function get() {
          return this.ref.wrapMode;
        },
        set: function set(value) {
          this.ref.wrapMode = value;
        }
      }
    },
    ctors: {
      ctor: function ctor(ref, name) {
        this.$initialize();
        MiniGameAdaptor.Motion.ctor.call(this);

        if (ref instanceof engine.AnimationClip) {
          this.ref = ref;
          this.name = name;
        }
      }
    },
    methods: {
      AddEvent: function AddEvent(evt) {
        throw new System.Exception("not impl");
      },
      ClearCurves: function ClearCurves() {
        throw new System.Exception("not impl");
      },
      EnsureQuaternionContinuity: function EnsureQuaternionContinuity() {
        throw new System.Exception("not impl");
      },
      SampleAnimation: function SampleAnimation(go, time) {
        throw new System.Exception("not impl");
      },
      SetCurve: function SetCurve(relativePath, type, propertyName, curve) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.AnimationClip')(MiniGameAdaptor.AnimationClip);
Object.defineProperty(MiniGameAdaptor.AnimationClip.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.AnimationClip.prototype.__properties)
}); // MiniGameAdaptor.AnimationClip.prototype.__properties.ref = { type: "AnimationClip" };

/***/ }),
/* 135 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Animator", {
    inherits: [MiniGameAdaptor.Behaviour],
    statics: {
      fields: {
        hash_id: 0,
        name_map: null
      },
      ctors: {
        init: function init() {
          this.name_map = new Map();
        }
      },
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        },
        StringToHash: function StringToHash(name) {
          var exist = false;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.name_map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var val = _step.value;

              if (val[1] == name) {
                exist = true;
                return val[0];
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (exist == false) {
            this.hash_id++;
            this.name_map.set(this.hash_id, name);
            return this.hash_id;
          }
        },
        getHashName: function getHashName(id) {
          var name = this.name_map.get(id);
          return name;
        }
      }
    },
    fields: {
      // _ref: null
      ref: null
    },
    props: {
      // ref: {
      //     get: function () {
      //         if (!this._ref) {
      //             this._ref = this.entity.getComponent(engine.Animator);
      //         }
      //         return this._ref;
      //     },
      //     set: function (value) {
      //         this._ref = value;
      //     }
      // },
      angularVelocity: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      applyRootMotion: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      avatar: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      bodyPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      bodyRotation: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      cullingMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      deltaPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      deltaRotation: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      feetPivotActive: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fireEvents: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      gravityWeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      hasBoundPlayables: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      hasRootMotion: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      hasTransformHierarchy: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      humanScale: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isHuman: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isInitialized: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isMatchingTarget: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      isOptimizable: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      keepAnimatorControllerStateOnDisable: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      layerCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      layersAffectMassCenter: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      leftFeetBottomHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      logWarnings: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      parameterCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      parameters: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      pivotPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      pivotWeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      playableGraph: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      playbackTime: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      recorderMode: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      recorderStartTime: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      recorderStopTime: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rightFeetBottomHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      rootPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rootRotation: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      runtimeAnimatorController: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      speed: {
        get: function get() {
          return this.ref.speed;
        },
        set: function set(value) {
          this.ref.speed = value;
        }
      },
      stabilizeFeet: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      targetPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      targetRotation: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      updateMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      velocity: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(animator) {
        this.$initialize();
        MiniGameAdaptor.Behaviour.ctor.call(this);

        if (animator instanceof engine.Animator) {
          this.ref = animator;
        }
      }
    },
    methods: {
      ApplyBuiltinRootMotion: function ApplyBuiltinRootMotion() {
        throw new System.Exception("not impl");
      },
      CrossFade: function CrossFade(stateHashName, normalizedTransitionDuration) {
        throw new System.Exception("not impl");
      },
      CrossFade$1: function CrossFade$1(stateHashName, normalizedTransitionDuration, layer) {
        throw new System.Exception("not impl");
      },
      CrossFade$2: function CrossFade$2(stateHashName, normalizedTransitionDuration, layer, normalizedTimeOffset) {
        throw new System.Exception("not impl");
      },
      CrossFade$3: function CrossFade$3(stateHashName, normalizedTransitionDuration, layer, normalizedTimeOffset, normalizedTransitionTime) {
        throw new System.Exception("not impl");
      },
      CrossFade$4: function CrossFade$4(stateName, normalizedTransitionDuration) {
        throw new System.Exception("not impl");
      },
      CrossFade$5: function CrossFade$5(stateName, normalizedTransitionDuration, layer) {
        throw new System.Exception("not impl");
      },
      CrossFade$6: function CrossFade$6(stateName, normalizedTransitionDuration, layer, normalizedTimeOffset) {
        throw new System.Exception("not impl");
      },
      CrossFade$7: function CrossFade$7(stateName, normalizedTransitionDuration, layer, normalizedTimeOffset, normalizedTransitionTime) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime: function CrossFadeInFixedTime(stateHashName, fixedTransitionDuration) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime$1: function CrossFadeInFixedTime$1(stateHashName, fixedTransitionDuration, layer) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime$2: function CrossFadeInFixedTime$2(stateHashName, fixedTransitionDuration, layer, fixedTimeOffset) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime$3: function CrossFadeInFixedTime$3(stateHashName, fixedTransitionDuration, layer, fixedTimeOffset, normalizedTransitionTime) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime$4: function CrossFadeInFixedTime$4(stateName, fixedTransitionDuration) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime$5: function CrossFadeInFixedTime$5(stateName, fixedTransitionDuration, layer) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime$6: function CrossFadeInFixedTime$6(stateName, fixedTransitionDuration, layer, fixedTimeOffset) {
        throw new System.Exception("not impl");
      },
      CrossFadeInFixedTime$7: function CrossFadeInFixedTime$7(stateName, fixedTransitionDuration, layer, fixedTimeOffset, normalizedTransitionTime) {
        throw new System.Exception("not impl");
      },
      GetAnimatorTransitionInfo: function GetAnimatorTransitionInfo(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetBehaviour: function GetBehaviour(T) {
        throw new System.Exception("not impl");
      },
      GetBehaviours: function GetBehaviours(T) {
        throw new System.Exception("not impl");
      },
      GetBehaviours$1: function GetBehaviours$1(fullPathHash, layerIndex) {
        throw new System.Exception("not impl");
      },
      GetBoneTransform: function GetBoneTransform(humanBoneId) {
        throw new System.Exception("not impl");
      },
      GetBool: function GetBool(id) {
        throw new System.Exception("not impl");
      },
      GetBool$1: function GetBool$1(name) {
        throw new System.Exception("not impl");
      },
      GetCurrentAnimatorClipInfo: function GetCurrentAnimatorClipInfo(layerIndex, clips) {
        throw new System.Exception("not impl");
      },
      GetCurrentAnimatorClipInfo$1: function GetCurrentAnimatorClipInfo$1(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetCurrentAnimatorClipInfoCount: function GetCurrentAnimatorClipInfoCount(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetCurrentAnimatorStateInfo: function GetCurrentAnimatorStateInfo(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetFloat: function GetFloat(id) {
        throw new System.Exception("not impl");
      },
      GetFloat$1: function GetFloat$1(name) {
        throw new System.Exception("not impl");
      },
      GetIKHintPosition: function GetIKHintPosition(hint) {
        throw new System.Exception("not impl");
      },
      GetIKHintPositionWeight: function GetIKHintPositionWeight(hint) {
        throw new System.Exception("not impl");
      },
      GetIKPosition: function GetIKPosition(goal) {
        throw new System.Exception("not impl");
      },
      GetIKPositionWeight: function GetIKPositionWeight(goal) {
        throw new System.Exception("not impl");
      },
      GetIKRotation: function GetIKRotation(goal) {
        throw new System.Exception("not impl");
      },
      GetIKRotationWeight: function GetIKRotationWeight(goal) {
        throw new System.Exception("not impl");
      },
      GetInteger: function GetInteger(id) {
        throw new System.Exception("not impl");
      },
      GetInteger$1: function GetInteger$1(name) {
        throw new System.Exception("not impl");
      },
      GetLayerIndex: function GetLayerIndex(layerName) {
        var result = null;
        this.ref.layers.forEach(function (layer) {
          if (layer.name === layerName) {
            result = layer.name;
            return;
          }
        });
        return result;
      },
      GetLayerName: function GetLayerName(layerIndex) {
        return this.ref.layers.length >= layerIndex ? this.ref.layers[layerIndex] : null;
      },
      GetLayerWeight: function GetLayerWeight(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetNextAnimatorClipInfo: function GetNextAnimatorClipInfo(layerIndex, clips) {
        throw new System.Exception("not impl");
      },
      GetNextAnimatorClipInfo$1: function GetNextAnimatorClipInfo$1(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetNextAnimatorClipInfoCount: function GetNextAnimatorClipInfoCount(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetNextAnimatorStateInfo: function GetNextAnimatorStateInfo(layerIndex) {
        throw new System.Exception("not impl");
      },
      GetParameter: function GetParameter(index) {
        throw new System.Exception("not impl");
      },
      HasState: function HasState(layerIndex, stateID) {
        throw new System.Exception("not impl");
      },
      InterruptMatchTarget: function InterruptMatchTarget() {
        throw new System.Exception("not impl");
      },
      InterruptMatchTarget$1: function InterruptMatchTarget$1(completeMatch) {
        throw new System.Exception("not impl");
      },
      IsInTransition: function IsInTransition(layerIndex) {
        throw new System.Exception("not impl");
      },
      IsParameterControlledByCurve: function IsParameterControlledByCurve(id) {
        throw new System.Exception("not impl");
      },
      IsParameterControlledByCurve$1: function IsParameterControlledByCurve$1(name) {
        throw new System.Exception("not impl");
      },
      MatchTarget: function MatchTarget(matchPosition, matchRotation, targetBodyPart, weightMask, startNormalizedTime) {
        throw new System.Exception("not impl");
      },
      MatchTarget$1: function MatchTarget$1(matchPosition, matchRotation, targetBodyPart, weightMask, startNormalizedTime, targetNormalizedTime) {
        throw new System.Exception("not impl");
      },
      Play: function Play(stateNameHash) {
        throw new System.Exception("not impl");
      },
      Play$1: function Play$1(stateNameHash, layer) {
        throw new System.Exception("not impl");
      },
      Play$2: function Play$2(stateNameHash, layer, normalizedTime) {
        throw new System.Exception("not impl");
      },
      Play$3: function Play$3(stateName) {
        this.Play$4(stateName, 0);
      },
      Play$4: function Play$4(stateName, layer) {
        var layerName = this.GetLayerName(layer);

        if (layerName) {
          this.ref.play('Base Layer.' + stateName);
        } else {
          this.ref.play(layerName + '.' + stateName);
        }
      },
      Play$5: function Play$5(stateName, layer, normalizedTime) {
        throw new System.Exception("not impl");
      },
      PlayInFixedTime: function PlayInFixedTime(stateNameHash) {
        throw new System.Exception("not impl");
      },
      PlayInFixedTime$1: function PlayInFixedTime$1(stateNameHash, layer) {
        throw new System.Exception("not impl");
      },
      PlayInFixedTime$2: function PlayInFixedTime$2(stateNameHash, layer, fixedTime) {
        throw new System.Exception("not impl");
      },
      PlayInFixedTime$3: function PlayInFixedTime$3(stateName) {
        throw new System.Exception("not impl");
      },
      PlayInFixedTime$4: function PlayInFixedTime$4(stateName, layer) {
        throw new System.Exception("not impl");
      },
      PlayInFixedTime$5: function PlayInFixedTime$5(stateName, layer, fixedTime) {
        throw new System.Exception("not impl");
      },
      Rebind: function Rebind() {
        throw new System.Exception("not impl");
      },
      ResetTrigger: function ResetTrigger(id) {
        throw new System.Exception("not impl");
      },
      ResetTrigger$1: function ResetTrigger$1(name) {
        throw new System.Exception("not impl");
      },
      SetBoneLocalRotation: function SetBoneLocalRotation(humanBoneId, rotation) {
        throw new System.Exception("not impl");
      },
      SetBool: function SetBool(id, value) {
        var name = MiniGameAdaptor.Animator.getHashName(id);
        this.ref.setBool(name, value);
      },
      SetBool$1: function SetBool$1(name, value) {
        this.ref.setBool(name, value);
      },
      SetFloat: function SetFloat(id, value) {
        var name = MiniGameAdaptor.Animator.getHashName(id);
        this.ref.setFloat(name, value);
      },
      SetFloat$1: function SetFloat$1(id, value, dampTime, deltaTime) {
        var name = MiniGameAdaptor.Animator.getHashName(id);
        this.ref.setFloat(name, value);
      },
      SetFloat$2: function SetFloat$2(name, value) {
        this.ref.setFloat(name, value);
      },
      SetFloat$3: function SetFloat$3(name, value, dampTime, deltaTime) {
        this.ref.setFloat(name, value);
      },
      SetIKHintPosition: function SetIKHintPosition(hint, hintPosition) {
        throw new System.Exception("not impl");
      },
      SetIKHintPositionWeight: function SetIKHintPositionWeight(hint, value) {
        throw new System.Exception("not impl");
      },
      SetIKPosition: function SetIKPosition(goal, goalPosition) {
        throw new System.Exception("not impl");
      },
      SetIKPositionWeight: function SetIKPositionWeight(goal, value) {
        throw new System.Exception("not impl");
      },
      SetIKRotation: function SetIKRotation(goal, goalRotation) {
        throw new System.Exception("not impl");
      },
      SetIKRotationWeight: function SetIKRotationWeight(goal, value) {
        throw new System.Exception("not impl");
      },
      SetInteger: function SetInteger(id, value) {
        var name = MiniGameAdaptor.Animator.getHashName(id);
        this.ref.setInteger(name, value);
      },
      SetInteger$1: function SetInteger$1(name, value) {
        this.ref.setInteger(name, value);
      },
      SetLayerWeight: function SetLayerWeight(layerIndex, weight) {
        throw new System.Exception("not impl");
      },
      SetLookAtPosition: function SetLookAtPosition(lookAtPosition) {
        throw new System.Exception("not impl");
      },
      SetLookAtWeight: function SetLookAtWeight(weight) {
        throw new System.Exception("not impl");
      },
      SetLookAtWeight$1: function SetLookAtWeight$1(weight, bodyWeight) {
        throw new System.Exception("not impl");
      },
      SetLookAtWeight$2: function SetLookAtWeight$2(weight, bodyWeight, headWeight) {
        throw new System.Exception("not impl");
      },
      SetLookAtWeight$3: function SetLookAtWeight$3(weight, bodyWeight, headWeight, eyesWeight) {
        throw new System.Exception("not impl");
      },
      SetLookAtWeight$4: function SetLookAtWeight$4(weight, bodyWeight, headWeight, eyesWeight, clampWeight) {
        throw new System.Exception("not impl");
      },
      SetTarget: function SetTarget(targetIndex, targetNormalizedTime) {
        throw new System.Exception("not impl");
      },
      SetTrigger: function SetTrigger(id) {
        throw new System.Exception("not impl");
      },
      SetTrigger$1: function SetTrigger$1(name) {
        throw new System.Exception("not impl");
      },
      StartPlayback: function StartPlayback() {
        throw new System.Exception("not impl");
      },
      StartRecording: function StartRecording(frameCount) {
        throw new System.Exception("not impl");
      },
      StopPlayback: function StopPlayback() {
        throw new System.Exception("not impl");
      },
      StopRecording: function StopRecording() {
        throw new System.Exception("not impl");
      },
      Update: function Update(deltaTime) {
        throw new System.Exception("not impl");
      },
      WriteDefaultValues: function WriteDefaultValues() {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Animator')(MiniGameAdaptor.Animator);
Object.defineProperty(MiniGameAdaptor.Animator.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Animator.prototype.__properties)
}); // MiniGameAdaptor.Animator.prototype.__properties.ref = { type: "Animator" };

/***/ }),
/* 136 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.WrapMode", {
    $kind: "enum",
    statics: {
      fields: {
        Default: 0,
        Once: 1,
        Loop: 2,
        PingPong: 4,
        ClampForever: 8
      }
    }
  });
});

/***/ }),
/* 137 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.TrackedReference", {
    statics: {
      methods: {
        op_Equality: function op_Equality(x, y) {
          return x === y;
        },
        op_Implicit: function op_Implicit(exists) {
          throw new System.Exception("not impl");
        },
        op_Inequality: function op_Inequality(x, y) {
          return x !== y;
        }
      }
    },
    methods: {
      equals: function equals(o) {
        throw new System.Exception("not impl");
      },
      getHashCode: function getHashCode() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 138 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.AnimationState", {
    inherits: [MiniGameAdaptor.TrackedReference],
    fields: {
      _clip: null
    },
    props: {
      blendMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      clip: {
        get: function get() {
          return this._clip;
        }
      },
      enabled: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      layer: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      length: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      name: {
        get: function get() {
          return this.clip.name;
        },
        set: function set(value) {
          this.clip.name = value;
        }
      },
      normalizedSpeed: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      normalizedTime: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      speed: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      time: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      weight: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      wrapMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.TrackedReference.ctor.call(this); // throw new System.Exception("not impl");
      },
      $ctor1: function $ctor1(clip) {
        this.$initialize();
        MiniGameAdaptor.TrackedReference.ctor.call(this);
        this._clip = clip;
      }
    },
    methods: {
      AddMixingTransform: function AddMixingTransform(mix) {
        throw new System.Exception("not impl");
      },
      AddMixingTransform$1: function AddMixingTransform$1(mix, recursive) {
        throw new System.Exception("not impl");
      },
      RemoveMixingTransform: function RemoveMixingTransform(mix) {
        throw new System.Exception("not impl");
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.AnimationState')(MiniGameAdaptor.AnimationState);
Object.defineProperty(MiniGameAdaptor.AnimationState.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.AnimationState.prototype.__properties)
});

/***/ }),
/* 139 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Animation.Enumerator", function () {
    return {
      inherits: [System.Collections.IEnumerator],
      $kind: "nested struct",
      statics: {
        methods: {
          getDefaultValue: function getDefaultValue() {
            return new (MiniGameAdaptor.Animation.Enumerator())();
          }
        }
      },
      fields: {
        m_Outer: null,
        m_CurrentIndex: -1
      },
      props: {
        Current: {
          get: function get() {
            return this.m_Outer.__getStateAtIndex(this.m_CurrentIndex);
          }
        },
        System$Collections$IEnumerator$Current: {
          get: function get() {
            return this.Current;
          }
        }
      },
      alias: ["Dispose", "System$IDisposable$Dispose", "moveNext", "System$Collections$IEnumerator$moveNext", "Current", ["System$Collections$Generic$IEnumerator$1$Current$1"]],
      ctors: {
        $ctor1: function $ctor1(outer) {
          this.$initialize();
          this.m_Outer = outer;
        },
        ctor: function ctor() {
          this.$initialize();
        }
      },
      methods: {
        Dispose: function Dispose() {},
        moveNext: function moveNext() {
          var childCount = this.m_Outer.__getStateCount();

          this.m_CurrentIndex++;
          return this.m_CurrentIndex < childCount;
        },
        System$Collections$IEnumerator$reset: function System$Collections$IEnumerator$reset() {
          this.m_CurrentIndex = -1;
        },
        equals: function equals(o) {
          if (!Bridge.is(o, MiniGameAdaptor.Animation.Enumerator())) {
            return false;
          }

          return Bridge.equals(this.m_Outer, o.m_Outer) && Bridge.equals(this.m_CurrentIndex, o.m_CurrentIndex);
        },
        $clone: function $clone(to) {
          var s = to || new (MiniGameAdaptor.Animation.Enumerator())();
          s.m_Outer = this.m_Outer;
          s.m_CurrentIndex = this.m_CurrentIndex;
          return s;
        }
      }
    };
  });
});

/***/ }),
/* 140 */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Animation", {
    inherits: [MiniGameAdaptor.Behaviour, System.Collections.IEnumerable],
    statics: {
      methods: {
        Deserialize: function Deserialize(data, comp, context, builtContext) {
          return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
        }
      }
    },
    fields: {
      ref: null,
      _clip: null,
      _clips: null,
      _animationsState: []
    },
    props: {
      animatePhysics: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      name: {
        get: function get() {
          return this.ref.clip;
        }
      },
      clip: {
        get: function get() {
          this.__initClips();

          if (!this._clip) {
            this._clip = this._clips[this.ref.clip];
          }

          return this._clip;
        },
        set: function set(value) {
          var c = this.clip; // if (c) {
          //     this.ref.clip = 
          // }
        }
      },
      cullingType: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isPlaying: {
        get: function get() {
          return this.ref.isPlaying;
        }
      },
      localBounds: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      playAutomatically: {
        get: function get() {
          return this.ref.autoPlay;
        },
        set: function set(value) {
          this.ref.autoPlay = value;
        }
      },
      wrapMode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor(animation) {
        var _this = this;

        this.$initialize();
        MiniGameAdaptor.Behaviour.ctor.call(this);

        if (animation instanceof engine.Animation) {
          this.ref = animation;
          Object.entries(this.ref.clips).forEach(function (c) {
            var clip = new MiniGameAdaptor.AnimationClip(c[1], c[0]);
            _this._clips[c[0]] = clip;

            _this._animationsState.push(new MiniGameAdaptor.AnimationState.$ctor1(clip));
          });
        }
      }
    },
    methods: {
      getItem: function getItem(name) {
        // return (name && this._animationsState[name]) ? this._animationsState[name] : null;
        this.__initClips();

        return this._clips[name];
      },
      AddClip: function AddClip(clip, newName) {
        throw new System.Exception("not impl");
      },
      AddClip$1: function AddClip$1(clip, newName, firstFrame, lastFrame) {
        throw new System.Exception("not impl");
      },
      AddClip$2: function AddClip$2(clip, newName, firstFrame, lastFrame, addLoopFrame) {
        throw new System.Exception("not impl");
      },
      Blend: function Blend(animation) {
        throw new System.Exception("not impl");
      },
      Blend$1: function Blend$1(animation, targetWeight) {
        throw new System.Exception("not impl");
      },
      Blend$2: function Blend$2(animation, targetWeight, fadeLength) {
        throw new System.Exception("not impl");
      },
      CrossFade: function CrossFade(animation) {
        throw new System.Exception("not impl");
      },
      CrossFade$1: function CrossFade$1(animation, fadeLength) {
        throw new System.Exception("not impl");
      },
      CrossFade$2: function CrossFade$2(animation, fadeLength, mode) {
        throw new System.Exception("not impl");
      },
      CrossFadeQueued: function CrossFadeQueued(animation) {
        throw new System.Exception("not impl");
      },
      CrossFadeQueued$1: function CrossFadeQueued$1(animation, fadeLength) {
        throw new System.Exception("not impl");
      },
      CrossFadeQueued$2: function CrossFadeQueued$2(animation, fadeLength, queue) {
        throw new System.Exception("not impl");
      },
      CrossFadeQueued$3: function CrossFadeQueued$3(animation, fadeLength, queue, mode) {
        throw new System.Exception("not impl");
      },
      GetClip: function GetClip(name) {
        return this.getItem(name);
      },
      GetClipCount: function GetClipCount() {
        throw new System.Exception("not impl");
      },
      GetEnumerator: function GetEnumerator() {
        return new (MiniGameAdaptor.Animation.Enumerator().$ctor1)(this);
      },
      System$Collections$IEnumerable$GetEnumerator: function System$Collections$IEnumerable$GetEnumerator() {
        throw new System.Exception("Exception");
      },
      IsPlaying: function IsPlaying(name) {
        return this.ref.playingClip === name;
      },
      Play: function Play() {
        this.ref.play();
      },
      Play$1: function Play$1(animation) {
        this.ref.play(animation);
      },
      Play$2: function Play$2(animation, mode) {
        if (mode === MiniGameAdaptor.PlayMode.StopAll) {
          this.ref.stop();
        }

        this.ref.play(animation);
      },
      Play$3: function Play$3(mode) {
        if (mode === MiniGameAdaptor.PlayMode.StopAll) {
          this.ref.stop();
        }

        this.ref.play();
      },
      PlayQueued: function PlayQueued(animation) {
        // 这里先直接play
        this.ref.play(animation);
      },
      PlayQueued$1: function PlayQueued$1(animation, queue) {
        throw new System.Exception("not impl");
      },
      PlayQueued$2: function PlayQueued$2(animation, queue, mode) {
        throw new System.Exception("not impl");
      },
      RemoveClip: function RemoveClip(clipName) {
        throw new System.Exception("not impl");
      },
      RemoveClip$1: function RemoveClip$1(clip) {
        throw new System.Exception("not impl");
      },
      Rewind: function Rewind() {
        this.ref.stop();
        this.ref.play();
      },
      Rewind$1: function Rewind$1(name) {
        this.ref.stop();
        this.ref.play(name);
      },
      Sample: function Sample() {// how to impl?
        // throw new System.Exception("not impl");
      },
      Stop: function Stop() {
        this.ref.stop();
      },
      Stop$1: function Stop$1(name) {
        throw new System.Exception("not impl");
      },
      SyncLayer: function SyncLayer(layer) {
        throw new System.Exception("not impl");
      },
      __initClips: function __initClips() {
        var _this2 = this;

        if (!this._clips) {
          this._clips = {};
          Object.entries(this.ref.clips).forEach(function (c) {
            _this2._clips[c[0]] = new MiniGameAdaptor.AnimationClip(c[1], c[0]);
          });
        }
      },
      __getStateAtIndex: function __getStateAtIndex(i) {
        if (i > -1 && i < this._animationsState.length) {
          return this._animationsState[i];
        }

        return null;
      },
      __getStateCount: function __getStateCount() {
        return this._animationsState.length;
      }
    }
  });
});
engine.decorators.serialize('MiniGameAdaptor.Animation')(MiniGameAdaptor.Animation);
Object.defineProperty(MiniGameAdaptor.Animation.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: _objectSpread({}, MiniGameAdaptor.Animation.prototype.__properties)
});
MiniGameAdaptor.Animation.prototype.__properties.ref = {
  type: "Animation"
};

/***/ }),
/* 141 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.BlendWeights", {
    $kind: "enum",
    statics: {
      fields: {
        OneBone: 1,
        TwoBones: 2,
        FourBones: 4
      }
    }
  });
});

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MissingReferenceException_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(143);
/* harmony import */ var _MissingReferenceException_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MissingReferenceException_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MissingReferenceException_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MissingReferenceException_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),
/* 143 */
/***/ (function(module, exports) {

Bridge.define("MiniGameAdaptor.MissingReferenceException", {
  ctors: {
    ctor: function ctor(err) {
      console.error(err);
      this.$initialize();
    }
  }
});

/***/ }),
/* 144 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.PropertyAttribute", {
    inherits: [System.Attribute],
    props: {
      order: {
        get: function get() {// throw new System.Exception("not impl");
        },
        set: function set(value) {// throw new System.Exception("not impl");
        }
      }
    }
  });
});

/***/ }),
/* 145 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.HeaderAttribute", {
    inherits: [MiniGameAdaptor.PropertyAttribute],
    fields: {
      header: null
    },
    ctors: {
      ctor: function ctor(header) {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
        this.header = header;
      }
    }
  });
});

/***/ }),
/* 146 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.SerializeField", {
    inherits: [System.Attribute],
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 147 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.TooltipAttribute", {
    inherits: [MiniGameAdaptor.PropertyAttribute],
    fields: {
      tooltip: null
    },
    ctors: {
      ctor: function ctor(tooltip) {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
        this.tooltip = tooltip ? tooltip : "";
      }
    }
  });
});

/***/ }),
/* 148 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.HideInInspector", {
    inherits: [System.Attribute],
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 149 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ExecuteInEditMode", {
    inherits: [System.Attribute],
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 150 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.AddComponentMenu", {
    inherits: [System.Attribute],
    props: {
      componentMenu: {
        get: function get() {}
      },
      componentOrder: {
        get: function get() {}
      }
    },
    ctors: {
      ctor: function ctor(menuName) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      },
      $ctor1: function $ctor1(menuName, order) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 151 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ContextMenu", {
    inherits: [System.Attribute],
    fields: {
      menuItem: null,
      validate: false,
      priority: 0
    },
    ctors: {
      ctor: function ctor(itemName) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      },
      $ctor1: function $ctor1(itemName, isValidateFunction) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      },
      $ctor2: function $ctor2(itemName, isValidateFunction, priority) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 152 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Scripting.PreserveAttribute", {
    inherits: [System.Attribute],
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 153 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RequireComponent", {
    inherits: [System.Attribute],
    fields: {
      m_Type0: null,
      m_Type1: null,
      m_Type2: null
    },
    ctors: {
      ctor: function ctor(requiredComponent) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      },
      $ctor1: function $ctor1(requiredComponent, requiredComponent2) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      },
      $ctor2: function $ctor2(requiredComponent, requiredComponent2, requiredComponent3) {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 154 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ImageEffectOpaque", {
    inherits: [System.Attribute],
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 155 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ImageEffectTransformsToLDR", {
    inherits: [System.Attribute],
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 156 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.DisallowMultipleComponent", {
    inherits: [System.Attribute],
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        System.Attribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 157 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RangeAttribute", {
    inherits: [MiniGameAdaptor.PropertyAttribute],
    fields: {
      min: 0,
      max: 0
    },
    ctors: {
      ctor: function ctor(min, max) {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
        this.min = min;
        this.max = max;
      }
    }
  });
});

/***/ }),
/* 158 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RuntimeInitializeOnLoadMethodAttribute", {
    inherits: [MiniGameAdaptor.Scripting.PreserveAttribute],
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Scripting.PreserveAttribute.ctor.call(this);
      },
      $ctor1: function $ctor1(loadType) {
        this.$initialize();
        MiniGameAdaptor.Scripting.PreserveAttribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 159 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.SpaceAttribute", {
    inherits: [MiniGameAdaptor.PropertyAttribute],
    fields: {
      height: 0
    },
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
      },
      $ctor1: function $ctor1(height) {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
      }
    }
  });
});

/***/ }),
/* 160 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.MultilineAttribute", {
    inherits: [MiniGameAdaptor.PropertyAttribute],
    fields: {
      lines: 0
    },
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
      },
      $ctor1: function $ctor1(lines) {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
        this.lines = lines;
      }
    }
  });
});

/***/ }),
/* 161 */
/***/ (function(module, exports) {

Bridge.assembly("unity_project", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.TextAreaAttribute", {
    inherits: [MiniGameAdaptor.PropertyAttribute],
    fields: {
      minLines: 0,
      maxLines: 0
    },
    ctors: {
      get $ctorDefault() {
        return this.ctor;
      },

      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
      },
      $ctor1: function $ctor1(minLines, maxLines) {
        this.$initialize();
        MiniGameAdaptor.PropertyAttribute.ctor.call(this);
        this.minLines = minLines;
        this.maxLines = maxLines;
      }
    }
  });
});

/***/ }),
/* 162 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ICanvasElement", {
    $kind: "interface"
  });
});

/***/ }),
/* 163 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ICanvasRaycastFilter", {
    $kind: "interface"
  });
});

/***/ }),
/* 164 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RectTransform.Axis", {
    $kind: "nested enum",
    statics: {
      fields: {
        Horizontal: 0,
        Vertical: 1
      }
    }
  });
  Bridge.define("MiniGameAdaptor.UI.GridLayoutGroup.Axis", {
    $kind: "nested enum",
    statics: {
      fields: {
        Horizontal: 0,
        Vertical: 1
      }
    }
  });
});

/***/ }),
/* 165 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.AnimationTriggers", {
    props: {
      disabledTrigger: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      highlightedTrigger: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      normalTrigger: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pressedTrigger: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 166 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.IMeshModifier", {
    $kind: "interface"
  });
});

/***/ }),
/* 167 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.CanvasUpdate", {
    $kind: "enum",
    statics: {
      fields: {
        Prelayout: 0,
        Layout: 1,
        PostLayout: 2,
        PreRender: 3,
        LatePreRender: 4,
        MaxUpdateValue: 5
      }
    }
  });
});

/***/ }),
/* 168 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ColorBlock", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.UI.ColorBlock)];
    },
    $kind: "struct",
    statics: {
      props: {
        defaultColorBlock: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        op_Equality: function op_Equality(point1, point2) {
          throw new System.Exception("not impl");
        },
        op_Inequality: function op_Inequality(point1, point2) {
          throw new System.Exception("not impl");
        },
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.UI.ColorBlock();
        }
      }
    },
    props: {
      colorMultiplier: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      disabledColor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fadeDuration: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      highlightedColor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      normalColor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pressedColor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      equals: function equals(obj) {
        throw new System.Exception("not impl");
      },
      Equals: function Equals(other) {
        throw new System.Exception("not impl");
      },
      System$IEquatable$1$MiniGameAdaptor$UI$ColorBlock$equalsT: function System$IEquatable$1$MiniGameAdaptor$UI$ColorBlock$equalsT(other) {
        throw new System.Exception("Exception");
      },
      getHashCode: function getHashCode() {
        throw new System.Exception("not impl");
      },
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 169 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ILayoutElement", {
    $kind: "interface"
  });
});

/***/ }),
/* 170 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.GridLayoutGroup.Constraint", {
    $kind: "nested enum",
    statics: {
      fields: {
        Flexible: 0,
        FixedColumnCount: 1,
        FixedRowCount: 2
      }
    }
  });
});

/***/ }),
/* 171 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.GridLayoutGroup.Corner", {
    $kind: "nested enum",
    statics: {
      fields: {
        UpperLeft: 0,
        UpperRight: 1,
        LowerLeft: 2,
        LowerRight: 3
      }
    }
  });
});

/***/ }),
/* 172 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.IClippable", {
    $kind: "interface"
  });
});

/***/ }),
/* 173 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.IMaterialModifier", {
    $kind: "interface"
  });
});

/***/ }),
/* 174 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.IMaskable", {
    $kind: "interface"
  });
});

/***/ }),
/* 175 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Image.Type", {
    $kind: "nested enum",
    statics: {
      fields: {
        Simple: 0,
        Sliced: 1,
        Tiled: 2,
        Filled: 3
      }
    }
  });
});

/***/ }),
/* 176 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Navigation", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.UI.Navigation)];
    },
    $kind: "struct",
    statics: {
      props: {
        defaultNavigation: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.UI.Navigation();
        }
      }
    },
    props: {
      mode: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      selectOnDown: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      selectOnLeft: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      selectOnRight: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      selectOnUp: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      Equals: function Equals(other) {
        throw new System.Exception("not impl");
      },
      System$IEquatable$1$MiniGameAdaptor$UI$Navigation$equalsT: function System$IEquatable$1$MiniGameAdaptor$UI$Navigation$equalsT(other) {
        throw new System.Exception("Exception");
      },
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 177 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Navigation.Mode", {
    $kind: "nested enum",
    statics: {
      fields: {
        None: 0,
        Horizontal: 1,
        Vertical: 2,
        Automatic: 3,
        Explicit: 4
      }
    }
  });
});

/***/ }),
/* 178 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Scrollbar.Direction", {
    $kind: "nested enum",
    statics: {
      fields: {
        LeftToRight: 0,
        RightToLeft: 1,
        BottomToTop: 2,
        TopToBottom: 3
      }
    }
  });
  Bridge.define("MiniGameAdaptor.UI.Slider.Direction", {
    $kind: "nested enum",
    statics: {
      fields: {
        LeftToRight: 0,
        RightToLeft: 1,
        BottomToTop: 2,
        TopToBottom: 3
      }
    }
  });
});

/***/ }),
/* 179 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ScrollRect.MovementType", {
    $kind: "nested enum",
    statics: {
      fields: {
        Unrestricted: 0,
        Elastic: 1,
        Clamped: 2
      }
    }
  });
});

/***/ }),
/* 180 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ScrollRect.ScrollbarVisibility", {
    $kind: "nested enum",
    statics: {
      fields: {
        Permanent: 0,
        AutoHide: 1,
        AutoHideAndExpandViewport: 2
      }
    }
  });
});

/***/ }),
/* 181 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Selectable.Transition", {
    $kind: "nested enum",
    statics: {
      fields: {
        None: 0,
        ColorTint: 1,
        SpriteSwap: 2,
        Animation: 3
      }
    }
  });
});

/***/ }),
/* 182 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.SpriteState", {
    inherits: function inherits() {
      return [System.IEquatable$1(MiniGameAdaptor.UI.SpriteState)];
    },
    $kind: "struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.UI.SpriteState();
        }
      }
    },
    props: {
      disabledSprite: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      highlightedSprite: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pressedSprite: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      Equals: function Equals(other) {
        throw new System.Exception("not impl");
      },
      System$IEquatable$1$MiniGameAdaptor$UI$SpriteState$equalsT: function System$IEquatable$1$MiniGameAdaptor$UI$SpriteState$equalsT(other) {
        throw new System.Exception("Exception");
      },
      $clone: function $clone(to) {
        return this;
      }
    }
  });
});

/***/ }),
/* 183 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Toggle.ToggleTransition", {
    $kind: "nested enum",
    statics: {
      fields: {
        None: 0,
        Fade: 1
      }
    }
  });
});

/***/ }),
/* 184 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.VertexHelper", {
    inherits: [System.IDisposable],
    props: {
      currentIndexCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      currentVertCount: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      $ctor1: function $ctor1(m) {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    },
    methods: {
      AddTriangle: function AddTriangle(idx0, idx1, idx2) {
        throw new System.Exception("not impl");
      },
      AddUIVertexQuad: function AddUIVertexQuad(verts) {
        throw new System.Exception("not impl");
      },
      AddUIVertexStream: function AddUIVertexStream(verts, indices) {
        throw new System.Exception("not impl");
      },
      AddUIVertexTriangleStream: function AddUIVertexTriangleStream(verts) {
        throw new System.Exception("not impl");
      },
      AddVert: function AddVert(v) {
        throw new System.Exception("not impl");
      },
      AddVert$1: function AddVert$1(position, color, uv0) {
        throw new System.Exception("not impl");
      },
      AddVert$2: function AddVert$2(position, color, uv0, uv1, normal, tangent) {
        throw new System.Exception("not impl");
      },
      Clear: function Clear() {
        throw new System.Exception("not impl");
      },
      Dispose: function Dispose() {
        throw new System.Exception("not impl");
      },
      System$IDisposable$Dispose: function System$IDisposable$Dispose() {
        throw new System.Exception("Exception");
      },
      FillMesh: function FillMesh(mesh) {
        throw new System.Exception("not impl");
      },
      GetUIVertexStream: function GetUIVertexStream(stream) {
        throw new System.Exception("not impl");
      },
      PopulateUIVertex: function PopulateUIVertex(vertex, i) {
        throw new System.Exception("not impl");
      },
      SetUIVertex: function SetUIVertex(vertex, i) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 185 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UICharInfo", {
    $kind: "struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.UICharInfo();
        }
      }
    },
    fields: {
      cursorPos: null,
      charWidth: 0
    },
    ctors: {
      init: function init() {
        this.cursorPos = new MiniGameAdaptor.Vector2();
      },
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      getHashCode: function getHashCode() {
        var h = Bridge.addHash([3599575836, this.cursorPos, this.charWidth]);
        return h;
      },
      equals: function equals(o) {
        if (!Bridge.is(o, MiniGameAdaptor.UICharInfo)) {
          return false;
        }

        return Bridge.equals(this.cursorPos, o.cursorPos) && Bridge.equals(this.charWidth, o.charWidth);
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.UICharInfo();
        s.cursorPos = this.cursorPos.$clone();
        s.charWidth = this.charWidth;
        return s;
      }
    }
  });
});

/***/ }),
/* 186 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UILineInfo", {
    $kind: "struct",
    statics: {
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.UILineInfo();
        }
      }
    },
    fields: {
      startCharIdx: 0,
      height: 0,
      topY: 0,
      leading: 0
    },
    ctors: {
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      getHashCode: function getHashCode() {
        var h = Bridge.addHash([3616939561, this.startCharIdx, this.height, this.topY, this.leading]);
        return h;
      },
      equals: function equals(o) {
        if (!Bridge.is(o, MiniGameAdaptor.UILineInfo)) {
          return false;
        }

        return Bridge.equals(this.startCharIdx, o.startCharIdx) && Bridge.equals(this.height, o.height) && Bridge.equals(this.topY, o.topY) && Bridge.equals(this.leading, o.leading);
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.UILineInfo();
        s.startCharIdx = this.startCharIdx;
        s.height = this.height;
        s.topY = this.topY;
        s.leading = this.leading;
        return s;
      }
    }
  });
});

/***/ }),
/* 187 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UIVertex", {
    $kind: "struct",
    statics: {
      fields: {
        simpleVert: null
      },
      ctors: {
        init: function init() {
          this.simpleVert = new MiniGameAdaptor.UIVertex();
        }
      },
      methods: {
        getDefaultValue: function getDefaultValue() {
          return new MiniGameAdaptor.UIVertex();
        }
      }
    },
    fields: {
      position: null,
      normal: null,
      tangent: null,
      color: null,
      uv0: null,
      uv1: null,
      uv2: null,
      uv3: null
    },
    ctors: {
      init: function init() {
        this.position = new MiniGameAdaptor.Vector3();
        this.normal = new MiniGameAdaptor.Vector3();
        this.tangent = new MiniGameAdaptor.Vector4();
        this.color = new MiniGameAdaptor.Color32();
        this.uv0 = new MiniGameAdaptor.Vector2();
        this.uv1 = new MiniGameAdaptor.Vector2();
        this.uv2 = new MiniGameAdaptor.Vector2();
        this.uv3 = new MiniGameAdaptor.Vector2();
      },
      ctor: function ctor() {
        this.$initialize();
      }
    },
    methods: {
      getHashCode: function getHashCode() {
        var h = Bridge.addHash([3720068551, this.position, this.normal, this.tangent, this.color, this.uv0, this.uv1, this.uv2, this.uv3]);
        return h;
      },
      equals: function equals(o) {
        if (!Bridge.is(o, MiniGameAdaptor.UIVertex)) {
          return false;
        }

        return Bridge.equals(this.position, o.position) && Bridge.equals(this.normal, o.normal) && Bridge.equals(this.tangent, o.tangent) && Bridge.equals(this.color, o.color) && Bridge.equals(this.uv0, o.uv0) && Bridge.equals(this.uv1, o.uv1) && Bridge.equals(this.uv2, o.uv2) && Bridge.equals(this.uv3, o.uv3);
      },
      $clone: function $clone(to) {
        var s = to || new MiniGameAdaptor.UIVertex();
        s.position = this.position.$clone();
        s.normal = this.normal.$clone();
        s.tangent = this.tangent.$clone();
        s.color = this.color.$clone();
        s.uv0 = this.uv0.$clone();
        s.uv1 = this.uv1.$clone();
        s.uv2 = this.uv2.$clone();
        s.uv3 = this.uv3.$clone();
        return s;
      }
    }
  });
});

/***/ }),
/* 188 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ILayoutController", {
    $kind: "interface"
  });
});

/***/ }),
/* 189 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ILayoutGroup", {
    inherits: [MiniGameAdaptor.UI.ILayoutController],
    $kind: "interface"
  });
});

/***/ }),
/* 190 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Button.ButtonClickedEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEvent],
    $kind: "nested class",
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEvent.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 191 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.MaskableGraphic.CullStateChangedEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEvent$1],
    $kind: "nested class",
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEvent$1.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 192 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Scrollbar.ScrollEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEvent$1],
    $kind: "nested class",
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEvent$1.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 193 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Slider.SliderEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEvent$1],
    $kind: "nested class",
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEvent$1.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 194 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Toggle.ToggleEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEvent$1],
    $kind: "nested class",
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEvent$1.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 195 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ScrollRect.ScrollRectEvent", {
    inherits: [MiniGameAdaptor.Events.UnityEvent$1],
    $kind: "nested class",
    ctors: {
      ctor: function ctor() {
        this.$initialize();
        MiniGameAdaptor.Events.UnityEvent$1.ctor.call(this);
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 196 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.BaseMeshEffect", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour, MiniGameAdaptor.UI.IMeshModifier],
    methods: {
      ModifyMesh: function ModifyMesh(mesh) {
        throw new System.Exception("not impl");
      },
      ModifyMesh$1: function ModifyMesh$1(vh) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$IMeshModifier$ModifyMesh: function MiniGameAdaptor$UI$IMeshModifier$ModifyMesh(verts) {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 197 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Selectable", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour, MiniGameAdaptor.EventSystems.IPointerEnterHandler, MiniGameAdaptor.EventSystems.ISelectHandler, MiniGameAdaptor.EventSystems.IPointerExitHandler, MiniGameAdaptor.EventSystems.IDeselectHandler, MiniGameAdaptor.EventSystems.IPointerDownHandler, MiniGameAdaptor.EventSystems.IPointerUpHandler, MiniGameAdaptor.EventSystems.IMoveHandler],
    statics: {
      props: {
        allSelectables: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      }
    },
    props: {
      animationTriggers: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      animator: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      colors: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      image: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      interactable: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      navigation: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      spriteState: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      targetGraphic: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      transition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      FindSelectable: function FindSelectable(dir) {
        throw new System.Exception("not impl");
      },
      FindSelectableOnDown: function FindSelectableOnDown() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnLeft: function FindSelectableOnLeft() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnRight: function FindSelectableOnRight() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnUp: function FindSelectableOnUp() {
        throw new System.Exception("not impl");
      },
      IsInteractable: function IsInteractable() {
        throw new System.Exception("not impl");
      },
      OnDeselect: function OnDeselect(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IDeselectHandler$OnDeselect: function MiniGameAdaptor$EventSystems$IDeselectHandler$OnDeselect(eventData) {
        throw new System.Exception("Exception");
      },
      OnMove: function OnMove(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IMoveHandler$OnMove: function MiniGameAdaptor$EventSystems$IMoveHandler$OnMove(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerDown: function OnPointerDown(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown: function MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerEnter: function OnPointerEnter(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerEnterHandler$OnPointerEnter: function MiniGameAdaptor$EventSystems$IPointerEnterHandler$OnPointerEnter(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerExit: function OnPointerExit(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerExitHandler$OnPointerExit: function MiniGameAdaptor$EventSystems$IPointerExitHandler$OnPointerExit(eventData) {
        throw new System.Exception("Exception");
      },
      OnPointerUp: function OnPointerUp(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerUpHandler$OnPointerUp: function MiniGameAdaptor$EventSystems$IPointerUpHandler$OnPointerUp(eventData) {
        throw new System.Exception("Exception");
      },
      OnSelect: function OnSelect(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$ISelectHandler$OnSelect: function MiniGameAdaptor$EventSystems$ISelectHandler$OnSelect(eventData) {
        throw new System.Exception("Exception");
      },
      Select: function Select() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 198 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Graphic", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour, MiniGameAdaptor.UI.ICanvasElement],
    statics: {
      props: {
        defaultGraphicMaterial: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      }
    },
    props: {
      canvas: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      canvasRenderer: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      color: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      defaultMaterial: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      depth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      mainTexture: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      material: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      materialForRendering: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      raycastTarget: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      rectTransform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ICanvasElement$transform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      CrossFadeAlpha: function CrossFadeAlpha(alpha, duration, ignoreTimeScale) {
        throw new System.Exception("not impl");
      },
      CrossFadeColor: function CrossFadeColor(targetColor, duration, ignoreTimeScale, useAlpha) {
        throw new System.Exception("not impl");
      },
      CrossFadeColor$1: function CrossFadeColor$1(targetColor, duration, ignoreTimeScale, useAlpha, useRGB) {
        throw new System.Exception("not impl");
      },
      GetPixelAdjustedRect: function GetPixelAdjustedRect() {
        throw new System.Exception("not impl");
      },
      GraphicUpdateComplete: function GraphicUpdateComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete() {
        throw new System.Exception("Exception");
      },
      LayoutComplete: function LayoutComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function MiniGameAdaptor$UI$ICanvasElement$LayoutComplete() {
        throw new System.Exception("Exception");
      },
      OnCullingChanged: function OnCullingChanged() {
        throw new System.Exception("not impl");
      },
      OnRebuildRequested: function OnRebuildRequested() {
        throw new System.Exception("not impl");
      },
      PixelAdjustPoint: function PixelAdjustPoint(point) {
        throw new System.Exception("not impl");
      },
      Raycast: function Raycast(sp, eventCamera) {
        throw new System.Exception("not impl");
      },
      Rebuild: function Rebuild(update) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$Rebuild: function MiniGameAdaptor$UI$ICanvasElement$Rebuild(executing) {
        throw new System.Exception("Exception");
      },
      RegisterDirtyLayoutCallback: function RegisterDirtyLayoutCallback(action) {
        throw new System.Exception("not impl");
      },
      RegisterDirtyMaterialCallback: function RegisterDirtyMaterialCallback(action) {
        throw new System.Exception("not impl");
      },
      RegisterDirtyVerticesCallback: function RegisterDirtyVerticesCallback(action) {
        throw new System.Exception("not impl");
      },
      SetAllDirty: function SetAllDirty() {
        throw new System.Exception("not impl");
      },
      SetLayoutDirty: function SetLayoutDirty() {
        throw new System.Exception("not impl");
      },
      SetMaterialDirty: function SetMaterialDirty() {
        throw new System.Exception("not impl");
      },
      SetNativeSize: function SetNativeSize() {
        throw new System.Exception("not impl");
      },
      SetVerticesDirty: function SetVerticesDirty() {
        throw new System.Exception("not impl");
      },
      UnregisterDirtyLayoutCallback: function UnregisterDirtyLayoutCallback(action) {
        throw new System.Exception("not impl");
      },
      UnregisterDirtyMaterialCallback: function UnregisterDirtyMaterialCallback(action) {
        throw new System.Exception("not impl");
      },
      UnregisterDirtyVerticesCallback: function UnregisterDirtyVerticesCallback(action) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function MiniGameAdaptor$UI$ICanvasElement$IsDestroyed() {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 199 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.LayoutGroup", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour, MiniGameAdaptor.UI.ILayoutElement, MiniGameAdaptor.UI.ILayoutGroup],
    props: {
      childAlignment: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      padding: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      CalculateLayoutInputHorizontal: function CalculateLayoutInputHorizontal() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal() {
        throw new System.Exception("Exception");
      },
      CalculateLayoutInputVertical: function CalculateLayoutInputVertical() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical() {
        throw new System.Exception("Exception");
      },
      SetLayoutHorizontal: function SetLayoutHorizontal() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutController$SetLayoutHorizontal: function MiniGameAdaptor$UI$ILayoutController$SetLayoutHorizontal() {
        throw new System.Exception("Exception");
      },
      SetLayoutVertical: function SetLayoutVertical() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutController$SetLayoutVertical: function MiniGameAdaptor$UI$ILayoutController$SetLayoutVertical() {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 200 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ScrollRect", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour, MiniGameAdaptor.EventSystems.IEndDragHandler, MiniGameAdaptor.EventSystems.IScrollHandler, MiniGameAdaptor.UI.ICanvasElement, MiniGameAdaptor.UI.ILayoutElement, MiniGameAdaptor.UI.ILayoutGroup, MiniGameAdaptor.EventSystems.IBeginDragHandler, MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler, MiniGameAdaptor.EventSystems.IDragHandler],
    props: {
      content: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      decelerationRate: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      elasticity: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      horizontal: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      horizontalNormalizedPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      horizontalScrollbar: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      horizontalScrollbarSpacing: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      horizontalScrollbarVisibility: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      inertia: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      movementType: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      normalizedPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      onValueChanged: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      scrollSensitivity: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      velocity: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      vertical: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      verticalNormalizedPosition: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      verticalScrollbar: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      verticalScrollbarSpacing: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      verticalScrollbarVisibility: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      viewport: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ICanvasElement$transform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      CalculateLayoutInputHorizontal: function CalculateLayoutInputHorizontal() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal() {
        throw new System.Exception("Exception");
      },
      CalculateLayoutInputVertical: function CalculateLayoutInputVertical() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical() {
        throw new System.Exception("Exception");
      },
      GraphicUpdateComplete: function GraphicUpdateComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete() {
        throw new System.Exception("Exception");
      },
      IsActive: function IsActive() {
        throw new System.Exception("not impl");
      },
      LayoutComplete: function LayoutComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function MiniGameAdaptor$UI$ICanvasElement$LayoutComplete() {
        throw new System.Exception("Exception");
      },
      OnBeginDrag: function OnBeginDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag: function MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnDrag: function OnDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IDragHandler$OnDrag: function MiniGameAdaptor$EventSystems$IDragHandler$OnDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnEndDrag: function OnEndDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IEndDragHandler$OnEndDrag: function MiniGameAdaptor$EventSystems$IEndDragHandler$OnEndDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnInitializePotentialDrag: function OnInitializePotentialDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag: function MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnScroll: function OnScroll(data) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IScrollHandler$OnScroll: function MiniGameAdaptor$EventSystems$IScrollHandler$OnScroll(eventData) {
        throw new System.Exception("Exception");
      },
      Rebuild: function Rebuild(executing) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$Rebuild: function MiniGameAdaptor$UI$ICanvasElement$Rebuild(executing) {
        throw new System.Exception("Exception");
      },
      SetLayoutHorizontal: function SetLayoutHorizontal() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutController$SetLayoutHorizontal: function MiniGameAdaptor$UI$ILayoutController$SetLayoutHorizontal() {
        throw new System.Exception("Exception");
      },
      SetLayoutVertical: function SetLayoutVertical() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutController$SetLayoutVertical: function MiniGameAdaptor$UI$ILayoutController$SetLayoutVertical() {
        throw new System.Exception("Exception");
      },
      StopMovement: function StopMovement() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function MiniGameAdaptor$UI$ICanvasElement$IsDestroyed() {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 201 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.ToggleGroup", {
    inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
    props: {
      allowSwitchOff: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      ActiveToggles: function ActiveToggles() {
        throw new System.Exception("not impl");
      },
      AnyTogglesOn: function AnyTogglesOn() {
        throw new System.Exception("not impl");
      },
      NotifyToggleOn: function NotifyToggleOn(toggle) {
        throw new System.Exception("not impl");
      },
      RegisterToggle: function RegisterToggle(toggle) {
        throw new System.Exception("not impl");
      },
      SetAllTogglesOff: function SetAllTogglesOff() {
        throw new System.Exception("not impl");
      },
      UnregisterToggle: function UnregisterToggle(toggle) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 202 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Button", {
    inherits: [MiniGameAdaptor.UI.Selectable, MiniGameAdaptor.EventSystems.ISubmitHandler, MiniGameAdaptor.EventSystems.IPointerClickHandler],
    props: {
      onClick: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      OnPointerClick: function OnPointerClick(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick: function MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick(eventData) {
        throw new System.Exception("Exception");
      },
      OnSubmit: function OnSubmit(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit: function MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit(eventData) {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 203 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.GridLayoutGroup", {
    inherits: [MiniGameAdaptor.UI.LayoutGroup],
    props: {
      cellSize: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      constraint: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      constraintCount: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      spacing: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      startAxis: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      startCorner: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    alias: ["CalculateLayoutInputHorizontal", "MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal", "CalculateLayoutInputVertical", "MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical", "SetLayoutHorizontal", "MiniGameAdaptor$UI$ILayoutController$SetLayoutHorizontal", "SetLayoutVertical", "MiniGameAdaptor$UI$ILayoutController$SetLayoutVertical"],
    methods: {
      CalculateLayoutInputHorizontal: function CalculateLayoutInputHorizontal() {
        throw new System.Exception("not impl");
      },
      CalculateLayoutInputVertical: function CalculateLayoutInputVertical() {
        throw new System.Exception("not impl");
      },
      SetLayoutHorizontal: function SetLayoutHorizontal() {
        throw new System.Exception("not impl");
      },
      SetLayoutVertical: function SetLayoutVertical() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 204 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.MaskableGraphic", {
    inherits: [MiniGameAdaptor.UI.Graphic, MiniGameAdaptor.UI.IClippable, MiniGameAdaptor.UI.IMaskable, MiniGameAdaptor.UI.IMaterialModifier],
    props: {
      maskable: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      onCullStateChanged: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$IClippable$gameObject: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$IClippable$rectTransform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      Cull: function Cull(clipRect, validRect) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$IClippable$Cull: function MiniGameAdaptor$UI$IClippable$Cull(clipRect, validRect) {
        throw new System.Exception("Exception");
      },
      GetModifiedMaterial: function GetModifiedMaterial(baseMaterial) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$IMaterialModifier$GetModifiedMaterial: function MiniGameAdaptor$UI$IMaterialModifier$GetModifiedMaterial(baseMaterial) {
        throw new System.Exception("Exception");
      },
      RecalculateClipping: function RecalculateClipping() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$IClippable$RecalculateClipping: function MiniGameAdaptor$UI$IClippable$RecalculateClipping() {
        throw new System.Exception("Exception");
      },
      RecalculateMasking: function RecalculateMasking() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$IMaskable$RecalculateMasking: function MiniGameAdaptor$UI$IMaskable$RecalculateMasking() {
        throw new System.Exception("Exception");
      },
      SetClipRect: function SetClipRect(clipRect, validRect) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$IClippable$SetClipRect: function MiniGameAdaptor$UI$IClippable$SetClipRect(value, validRect) {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 205 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Shadow", {
    inherits: [MiniGameAdaptor.UI.BaseMeshEffect],
    props: {
      effectColor: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      effectDistance: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useGraphicAlpha: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      }
    },
    alias: ["ModifyMesh$1", "MiniGameAdaptor$UI$IMeshModifier$ModifyMesh"],
    methods: {
      ModifyMesh$1: function ModifyMesh$1(vh) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 206 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Scrollbar", {
    inherits: [MiniGameAdaptor.UI.Selectable, MiniGameAdaptor.UI.ICanvasElement, MiniGameAdaptor.EventSystems.IBeginDragHandler, MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler, MiniGameAdaptor.EventSystems.IDragHandler],
    props: {
      direction: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      handleRect: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      numberOfSteps: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      onValueChanged: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      size: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      value: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ICanvasElement$transform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    alias: ["OnMove", "MiniGameAdaptor$EventSystems$IMoveHandler$OnMove", "OnPointerDown", "MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown", "OnPointerUp", "MiniGameAdaptor$EventSystems$IPointerUpHandler$OnPointerUp"],
    methods: {
      FindSelectableOnDown: function FindSelectableOnDown() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnLeft: function FindSelectableOnLeft() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnRight: function FindSelectableOnRight() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnUp: function FindSelectableOnUp() {
        throw new System.Exception("not impl");
      },
      GraphicUpdateComplete: function GraphicUpdateComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete() {
        throw new System.Exception("Exception");
      },
      LayoutComplete: function LayoutComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function MiniGameAdaptor$UI$ICanvasElement$LayoutComplete() {
        throw new System.Exception("Exception");
      },
      OnBeginDrag: function OnBeginDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag: function MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnDrag: function OnDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IDragHandler$OnDrag: function MiniGameAdaptor$EventSystems$IDragHandler$OnDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnInitializePotentialDrag: function OnInitializePotentialDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag: function MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnMove: function OnMove(eventData) {
        throw new System.Exception("not impl");
      },
      OnPointerDown: function OnPointerDown(eventData) {
        throw new System.Exception("not impl");
      },
      OnPointerUp: function OnPointerUp(eventData) {
        throw new System.Exception("not impl");
      },
      Rebuild: function Rebuild(executing) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$Rebuild: function MiniGameAdaptor$UI$ICanvasElement$Rebuild(executing) {
        throw new System.Exception("Exception");
      },
      SetDirection: function SetDirection(direction, includeRectLayouts) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function MiniGameAdaptor$UI$ICanvasElement$IsDestroyed() {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 207 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Slider", {
    inherits: [MiniGameAdaptor.UI.Selectable, MiniGameAdaptor.UI.ICanvasElement, MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler, MiniGameAdaptor.EventSystems.IDragHandler],
    props: {
      direction: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fillRect: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      handleRect: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      maxValue: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      minValue: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      normalizedValue: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      onValueChanged: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      value: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      wholeNumbers: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ICanvasElement$transform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    alias: ["OnMove", "MiniGameAdaptor$EventSystems$IMoveHandler$OnMove", "OnPointerDown", "MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown"],
    methods: {
      FindSelectableOnDown: function FindSelectableOnDown() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnLeft: function FindSelectableOnLeft() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnRight: function FindSelectableOnRight() {
        throw new System.Exception("not impl");
      },
      FindSelectableOnUp: function FindSelectableOnUp() {
        throw new System.Exception("not impl");
      },
      GraphicUpdateComplete: function GraphicUpdateComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete() {
        throw new System.Exception("Exception");
      },
      LayoutComplete: function LayoutComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function MiniGameAdaptor$UI$ICanvasElement$LayoutComplete() {
        throw new System.Exception("Exception");
      },
      OnDrag: function OnDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IDragHandler$OnDrag: function MiniGameAdaptor$EventSystems$IDragHandler$OnDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnInitializePotentialDrag: function OnInitializePotentialDrag(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag: function MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag(eventData) {
        throw new System.Exception("Exception");
      },
      OnMove: function OnMove(eventData) {
        throw new System.Exception("not impl");
      },
      OnPointerDown: function OnPointerDown(eventData) {
        throw new System.Exception("not impl");
      },
      Rebuild: function Rebuild(executing) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$Rebuild: function MiniGameAdaptor$UI$ICanvasElement$Rebuild(executing) {
        throw new System.Exception("Exception");
      },
      SetDirection: function SetDirection(direction, includeRectLayouts) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function MiniGameAdaptor$UI$ICanvasElement$IsDestroyed() {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 208 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Toggle", {
    inherits: [MiniGameAdaptor.UI.Selectable, MiniGameAdaptor.UI.ICanvasElement, MiniGameAdaptor.EventSystems.ISubmitHandler, MiniGameAdaptor.EventSystems.IPointerClickHandler],
    fields: {
      toggleTransition: 0,
      graphic: null,
      onValueChanged: null
    },
    props: {
      group: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      isOn: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ICanvasElement$transform: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      GraphicUpdateComplete: function GraphicUpdateComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete() {
        throw new System.Exception("Exception");
      },
      LayoutComplete: function LayoutComplete() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function MiniGameAdaptor$UI$ICanvasElement$LayoutComplete() {
        throw new System.Exception("Exception");
      },
      OnPointerClick: function OnPointerClick(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick: function MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick(eventData) {
        throw new System.Exception("Exception");
      },
      OnSubmit: function OnSubmit(eventData) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit: function MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit(eventData) {
        throw new System.Exception("Exception");
      },
      Rebuild: function Rebuild(executing) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ICanvasElement$Rebuild: function MiniGameAdaptor$UI$ICanvasElement$Rebuild(executing) {
        throw new System.Exception("Exception");
      },
      MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function MiniGameAdaptor$UI$ICanvasElement$IsDestroyed() {
        throw new System.Exception("Exception");
      }
    }
  });
});

/***/ }),
/* 209 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Image", {
    inherits: [MiniGameAdaptor.UI.MaskableGraphic, MiniGameAdaptor.ISerializationCallbackReceiver, MiniGameAdaptor.UI.ILayoutElement, MiniGameAdaptor.ICanvasRaycastFilter],
    statics: {
      props: {
        defaultETC1GraphicMaterial: {
          get: function get() {
            throw new System.Exception("not impl");
          }
        }
      }
    },
    props: {
      alphaHitTestMinimumThreshold: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fillAmount: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fillCenter: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fillClockwise: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fillMethod: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fillOrigin: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      hasBorder: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      mainTexture: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      material: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      overrideSprite: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      pixelsPerUnit: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preserveAspect: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      sprite: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      type: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      useSpriteMesh: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      CalculateLayoutInputHorizontal: function CalculateLayoutInputHorizontal() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal() {
        throw new System.Exception("Exception");
      },
      CalculateLayoutInputVertical: function CalculateLayoutInputVertical() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical() {
        throw new System.Exception("Exception");
      },
      IsRaycastLocationValid: function IsRaycastLocationValid(screenPoint, eventCamera) {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$ICanvasRaycastFilter$IsRaycastLocationValid: function MiniGameAdaptor$ICanvasRaycastFilter$IsRaycastLocationValid(sp, eventCamera) {
        throw new System.Exception("Exception");
      },
      OnAfterDeserialize: function OnAfterDeserialize() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$ISerializationCallbackReceiver$OnAfterDeserialize: function MiniGameAdaptor$ISerializationCallbackReceiver$OnAfterDeserialize() {
        throw new System.Exception("Exception");
      },
      OnBeforeSerialize: function OnBeforeSerialize() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$ISerializationCallbackReceiver$OnBeforeSerialize: function MiniGameAdaptor$ISerializationCallbackReceiver$OnBeforeSerialize() {
        throw new System.Exception("Exception");
      },
      SetNativeSize: function SetNativeSize() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 210 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Outline", {
    inherits: [MiniGameAdaptor.UI.Shadow],
    alias: ["ModifyMesh$1", "MiniGameAdaptor$UI$IMeshModifier$ModifyMesh"],
    methods: {
      ModifyMesh$1: function ModifyMesh$1(vh) {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 211 */
/***/ (function(module, exports) {

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.UI.Text", {
    inherits: [MiniGameAdaptor.UI.MaskableGraphic, MiniGameAdaptor.UI.ILayoutElement],
    statics: {
      methods: {
        GetTextAnchorPivot: function GetTextAnchorPivot(anchor) {
          throw new System.Exception("not impl");
        }
      }
    },
    props: {
      alignByGeometry: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      alignment: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      cachedTextGenerator: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      cachedTextGeneratorForLayout: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      font: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fontSize: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      fontStyle: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      horizontalOverflow: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      lineSpacing: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      mainTexture: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      pixelsPerUnit: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      resizeTextForBestFit: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      resizeTextMaxSize: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      resizeTextMinSize: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      supportRichText: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      text: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      verticalOverflow: {
        get: function get() {
          throw new System.Exception("not impl");
        },
        set: function set(value) {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$flexibleWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$layoutPriority: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$minWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredHeight: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      },
      MiniGameAdaptor$UI$ILayoutElement$preferredWidth: {
        get: function get() {
          throw new System.Exception("not impl");
        }
      }
    },
    methods: {
      CalculateLayoutInputHorizontal: function CalculateLayoutInputHorizontal() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal() {
        throw new System.Exception("Exception");
      },
      CalculateLayoutInputVertical: function CalculateLayoutInputVertical() {
        throw new System.Exception("not impl");
      },
      MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical: function MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical() {
        throw new System.Exception("Exception");
      },
      FontTextureChanged: function FontTextureChanged() {
        throw new System.Exception("not impl");
      },
      GetGenerationSettings: function GetGenerationSettings(extents) {
        throw new System.Exception("not impl");
      },
      OnRebuildRequested: function OnRebuildRequested() {
        throw new System.Exception("not impl");
      }
    }
  });
});

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Extend_RootMonoBehaviour_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var WADebugger = /*#__PURE__*/function () {
  function WADebugger() {
    _classCallCheck(this, WADebugger);
  }

  _createClass(WADebugger, null, [{
    key: "log",
    value: function log(obj) {
      Logger.log(obj);
    }
  }, {
    key: "warn",
    value: function warn(obj) {
      Logger.warn(obj);
    }
  }, {
    key: "printActiveObject",
    value: function printActiveObject(root, includeChildren) {
      if (!root) {
        root = game.sceneRoot.transform.children[0];
      }

      if (includeChildren) {
        root.travelChild(function (c) {
          if (c.entity.active) {
            console.log(c.entity);
          }
        });
      } else {
        root.children.forEach(function (c) {
          if (c.entity.active) {
            console.log(c.entity);
          }
        });
      }
    }
  }, {
    key: "rotateCamera",
    value: function rotateCamera(x, y, z) {
      _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.Rotate(x, y, z);
    }
  }, {
    key: "resetCameraBirdsEye",
    value: function resetCameraBirdsEye() {
      _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.ref.euler.x = 1;
      _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.ref.position.x = -1;
      _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.ref.position.y = 100;
      _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.ref.position.z = -60;
    }
  }, {
    key: "entitiesCount",
    value: function entitiesCount() {
      var count = 0;
      game.sceneRoot.transform.travelChild(function (c) {
        count++;
      });
      console.log(count);
    }
  }, {
    key: "find",
    value: function find(name) {
      if (!name) return null;
      var e;
      game.sceneRoot.transform.travelChild(function (c) {
        if (c.entity.name === name) {
          e = c.entity;
          return;
        }
      });
      return e;
    }
  }, {
    key: "findFuzzy",
    value: function findFuzzy(name) {
      if (!name) return null;
      var e;
      game.sceneRoot.transform.travelChild(function (c) {
        if (c.entity.name.toUpperCase().indexOf(name.toUpperCase()) >= 0) {
          e = c.entity;
          return;
        }
      });
      return e;
    }
  }, {
    key: "printPositionAndEulerAngles",
    value: function printPositionAndEulerAngles(entity) {
      if (typeof entity == 'string') {
        entity = WADebugger.find(entity);
      }

      if (entity && entity instanceof engine.Entity) {
        return entity.name + ": (" + entity.transform.worldPosition.x.toFixed(2) + ", " + entity.transform.worldPosition.y.toFixed(2) + ", " + entity.transform.worldPosition.z.toFixed(2) + ")\t(" + entity.transform.worldEuler.x.toFixed(2) * _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Mathf.Rad2Deg + ", " + entity.transform.worldEuler.y.toFixed(2) * _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Mathf.Rad2Deg + ", " + entity.transform.worldEuler.z.toFixed(2) * _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Mathf.Rad2Deg + ")";
      }

      return "entity not exists";
    }
  }, {
    key: "cameraDebugControlToggle",
    value: function cameraDebugControlToggle() {
      _cameraDebugControl = !_cameraDebugControl;
    }
  }, {
    key: "cameraPosition",
    get: function get() {
      return _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.position;
    }
  }]);

  return WADebugger;
}();

var Logger = {
  warnings: new Set(),
  logs: new Set(),
  warn: function warn(obj) {
    if (!this.warnings.has(obj)) {
      this.warnings.add(obj);
      console.warn(obj);
    }
  },
  log: function log(obj) {
    if (!this.logs.has(obj)) {
      this.logs.add(obj);
      console.log(obj);
    }
  }
}; // camera debug control

var origin = new _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Vector3();
var sensitivity = 0.001;
var _cameraDebugControl = false;
var flag = false;
Object(_Extend_RootMonoBehaviour_js__WEBPACK_IMPORTED_MODULE_1__["onRootMonoBehaviourUpdate"])(function (dt) {
  if (_cameraDebugControl) {
    if (_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Input.GetMouseButtonDown(0)) {
      if (!flag) {
        flag = true;
        origin = _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Input.mousePosition.$clone();
      }
    }

    if (flag) {
      var dir = new _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Vector3.$ctor2((origin.x - _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Input.mousePosition.x) * sensitivity, (origin.y - _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Input.mousePosition.y) * sensitivity, 0.0);
      var camPos = _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.position;
      _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Camera.main.transform.position = _MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Vector3.op_Addition(camPos.$clone(), dir.$clone());
    }

    if (_MiniGameAdaptor_js__WEBPACK_IMPORTED_MODULE_0__["default"].Input.GetMouseButtonUp(0)) {
      flag = false;
    }
  }
});
window.AdaptorDebugger = WADebugger;

/***/ })
/******/ ]);