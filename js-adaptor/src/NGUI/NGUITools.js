Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.NGUITools", {
        statics: {
            fields: {
                audioSource: null,
                keys: null
            },
            props: {
                clipboard: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                fileAccess: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                screenSize: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                soundVolume: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                AddChild: function (T, parent) {
                    throw new System.Exception("not impl");
                },
                AddChild$1: function (T, parent, undo) {
                    throw new System.Exception("not impl");
                },
                AddChild$2: function (parent) {
                    throw new System.Exception("not impl");
                },
                AddChild$3: function (parent, undo) {
                    throw new System.Exception("not impl");
                },
                AddChild$4: function (parent, undo, layer) {
                    throw new System.Exception("not impl");
                },
                AddChild$5: function (parent, layer) {
                    throw new System.Exception("not impl");
                },
                AddChild$6: function (parent, prefab) {
                    throw new System.Exception("not impl");
                },
                AddChild$7: function (parent, prefab, layer) {
                    throw new System.Exception("not impl");
                },
                AddMissingComponent: function (T, go) {
                    throw new System.Exception("not impl");
                },
                AddSprite: function (go, atlas, spriteName, depth) {
                    if (depth === void 0) { depth = 2147483647; }
                    throw new System.Exception("not impl");
                },
                AddWidget: function (T, go, depth) {
                    if (depth === void 0) { depth = 2147483647; }
                    throw new System.Exception("not impl");
                },
                AddWidgetCollider: function (go) {
                    throw new System.Exception("not impl");
                },
                AddWidgetCollider$1: function (go, considerInactive) {
                    throw new System.Exception("not impl");
                },
                AdjustDepth: function (go, adjustment) {
                    throw new System.Exception("not impl");
                },
                ApplyPMA: function (c) {
                    throw new System.Exception("not impl");
                },
                BringForward: function (go) {
                    throw new System.Exception("not impl");
                },
                Broadcast: function (funcName) {
                    throw new System.Exception("not impl");
                },
                Broadcast$1: function (funcName, param) {
                    throw new System.Exception("not impl");
                },
                CalculateNextDepth: function (go) {
                    throw new System.Exception("not impl");
                },
                CalculateNextDepth$1: function (go, ignoreChildrenWithColliders) {
                    throw new System.Exception("not impl");
                },
                CalculateRaycastDepth: function (go) {
                    throw new System.Exception("not impl");
                },
                CreateUI: function (advanced3D) {
                    throw new System.Exception("not impl");
                },
                CreateUI$1: function (advanced3D, layer) {
                    throw new System.Exception("not impl");
                },
                CreateUI$2: function (trans, advanced3D, layer) {
                    throw new System.Exception("not impl");
                },
                Destroy: function (obj) {
                    throw new System.Exception("not impl");
                },
                DestroyChildren: function (t) {
                    throw new System.Exception("not impl");
                },
                DestroyImmediate: function (obj) {
                    throw new System.Exception("not impl");
                },
                Draw: function (T, id, onInit) {
                    if (onInit === void 0) { onInit = null; }
                    throw new System.Exception("not impl");
                },
                Execute: function (T, go, funcName) {
                    throw new System.Exception("not impl");
                },
                ExecuteAll: function (T, root, funcName) {
                    throw new System.Exception("not impl");
                },
                FindActive: function (T) {
                    throw new System.Exception("not impl");
                },
                FindCameraForLayer: function (layer) {
                    throw new System.Exception("not impl");
                },
                FindInParents: function (T, go) {
                    throw new System.Exception("not impl");
                },
                FindInParents$1: function (T, trans) {
                    throw new System.Exception("not impl");
                },
                FitOnScreen: function (cam, t, considerInactive, considerChildren) {
                    if (considerInactive === void 0) { considerInactive = false; }
                    if (considerChildren === void 0) { considerChildren = true; }
                    throw new System.Exception("not impl");
                },
                FitOnScreen$1: function (cam, transform, content, pos, considerInactive) {
                    if (considerInactive === void 0) { considerInactive = false; }
                    throw new System.Exception("not impl");
                },
                FitOnScreen$2: function (cam, transform, content, pos, bounds, considerInactive) {
                    if (considerInactive === void 0) { considerInactive = false; }
                    throw new System.Exception("not impl");
                },
                FitOnScreen$3: function (cam, transform, pos) {
                    throw new System.Exception("not impl");
                },
                GammaToLinearSpace: function (c) {
                    throw new System.Exception("not impl");
                },
                GetActive: function (mb) {
                    throw new System.Exception("not impl");
                },
                GetActive$1: function (go) {
                    throw new System.Exception("not impl");
                },
                GetFuncName: function (obj, method) {
                    throw new System.Exception("not impl");
                },
                GetHierarchy: function (obj) {
                    throw new System.Exception("not impl");
                },
                GetRoot: function (go) {
                    throw new System.Exception("not impl");
                },
                GetSides: function (cam) {
                    throw new System.Exception("not impl");
                },
                GetSides$1: function (cam, depth) {
                    throw new System.Exception("not impl");
                },
                GetSides$2: function (cam, depth, relativeTo) {
                    throw new System.Exception("not impl");
                },
                GetSides$3: function (cam, relativeTo) {
                    throw new System.Exception("not impl");
                },
                GetTypeName: function (obj) {
                    throw new System.Exception("not impl");
                },
                GetTypeName$1: function (T) {
                    throw new System.Exception("not impl");
                },
                GetWorldCorners: function (cam) {
                    throw new System.Exception("not impl");
                },
                GetWorldCorners$1: function (cam, depth) {
                    throw new System.Exception("not impl");
                },
                GetWorldCorners$2: function (cam, depth, relativeTo) {
                    throw new System.Exception("not impl");
                },
                GetWorldCorners$3: function (cam, relativeTo) {
                    throw new System.Exception("not impl");
                },
                ImmediatelyCreateDrawCalls: function (root) {
                    throw new System.Exception("not impl");
                },
                IsChild: function (parent, child) {
                    throw new System.Exception("not impl");
                },
                KeyToCaption: function (key) {
                    throw new System.Exception("not impl");
                },
                LinearToGammaSpace: function (c) {
                    throw new System.Exception("not impl");
                },
                Load: function (fileName) {
                    throw new System.Exception("not impl");
                },
                MakePixelPerfect: function (t) {
                    throw new System.Exception("not impl");
                },
                MarkParentAsChanged: function (go) {
                    throw new System.Exception("not impl");
                },
                NormalizeDepths: function () {
                    throw new System.Exception("not impl");
                },
                NormalizePanelDepths: function () {
                    throw new System.Exception("not impl");
                },
                NormalizeWidgetDepths: function () {
                    throw new System.Exception("not impl");
                },
                NormalizeWidgetDepths$1: function (list) {
                    throw new System.Exception("not impl");
                },
                NormalizeWidgetDepths$2: function (go) {
                    throw new System.Exception("not impl");
                },
                PlaySound: function (clip) {
                    throw new System.Exception("not impl");
                },
                PlaySound$1: function (clip, volume) {
                    throw new System.Exception("not impl");
                },
                PlaySound$2: function (clip, volume, pitch) {
                    throw new System.Exception("not impl");
                },
                PushBack: function (go) {
                    throw new System.Exception("not impl");
                },
                RandomRange: function (min, max) {
                    throw new System.Exception("not impl");
                },
                RegisterUndo: function (obj, name) {
                    throw new System.Exception("not impl");
                },
                Round: function (v) {
                    throw new System.Exception("not impl");
                },
                Save: function (fileName, bytes) {
                    throw new System.Exception("not impl");
                },
                SetActive: function (go, state) {
                    throw new System.Exception("not impl");
                },
                SetActive$1: function (go, state, compatibilityMode) {
                    throw new System.Exception("not impl");
                },
                SetActiveChildren: function (go, state) {
                    throw new System.Exception("not impl");
                },
                SetActiveSelf: function (go, state) {
                    throw new System.Exception("not impl");
                },
                SetChildLayer: function (t, layer) {
                    throw new System.Exception("not impl");
                },
                SetDirty: function (obj, undoName) {
                    if (undoName === void 0) { undoName = "last change"; }
                    throw new System.Exception("not impl");
                },
                SetLayer: function (go, layer) {
                    throw new System.Exception("not impl");
                },
                UpdateWidgetCollider: function (w) {
                    throw new System.Exception("not impl");
                },
                UpdateWidgetCollider$1: function (w, box) {
                    throw new System.Exception("not impl");
                },
                UpdateWidgetCollider$2: function (w, box) {
                    throw new System.Exception("not impl");
                },
                UpdateWidgetCollider$3: function (box, considerInactive) {
                    throw new System.Exception("not impl");
                },
                UpdateWidgetCollider$4: function (box, considerInactive) {
                    throw new System.Exception("not impl");
                },
                UpdateWidgetCollider$5: function (go) {
                    throw new System.Exception("not impl");
                },
                UpdateWidgetCollider$6: function (go, considerInactive) {
                    throw new System.Exception("not impl");
                }
            }
        }
    });
});
