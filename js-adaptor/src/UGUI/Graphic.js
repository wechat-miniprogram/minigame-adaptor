Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Graphic", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour,MiniGameAdaptor.UI.ICanvasElement],
        statics: {
            props: {
                defaultGraphicMaterial: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            }
        },
        props: {
            canvas: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            canvasRenderer: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            color: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            defaultMaterial: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            depth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            mainTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            material: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            materialForRendering: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            raycastTarget: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rectTransform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ICanvasElement$transform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            CrossFadeAlpha: function (alpha, duration, ignoreTimeScale) {
                throw new System.Exception("not impl");
            },
            CrossFadeColor: function (targetColor, duration, ignoreTimeScale, useAlpha) {
                throw new System.Exception("not impl");
            },
            CrossFadeColor$1: function (targetColor, duration, ignoreTimeScale, useAlpha, useRGB) {
                throw new System.Exception("not impl");
            },
            GetPixelAdjustedRect: function () {
                throw new System.Exception("not impl");
            },
            GraphicUpdateComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function () {
                throw new System.Exception("Exception");
            },
            LayoutComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function () {
                throw new System.Exception("Exception");
            },
            OnCullingChanged: function () {
                throw new System.Exception("not impl");
            },
            OnRebuildRequested: function () {
                throw new System.Exception("not impl");
            },
            PixelAdjustPoint: function (point) {
                throw new System.Exception("not impl");
            },
            Raycast: function (sp, eventCamera) {
                throw new System.Exception("not impl");
            },
            Rebuild: function (update) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$Rebuild: function (executing) {
                throw new System.Exception("Exception");
            },
            RegisterDirtyLayoutCallback: function (action) {
                throw new System.Exception("not impl");
            },
            RegisterDirtyMaterialCallback: function (action) {
                throw new System.Exception("not impl");
            },
            RegisterDirtyVerticesCallback: function (action) {
                throw new System.Exception("not impl");
            },
            SetAllDirty: function () {
                throw new System.Exception("not impl");
            },
            SetLayoutDirty: function () {
                throw new System.Exception("not impl");
            },
            SetMaterialDirty: function () {
                throw new System.Exception("not impl");
            },
            SetNativeSize: function () {
                throw new System.Exception("not impl");
            },
            SetVerticesDirty: function () {
                throw new System.Exception("not impl");
            },
            UnregisterDirtyLayoutCallback: function (action) {
                throw new System.Exception("not impl");
            },
            UnregisterDirtyMaterialCallback: function (action) {
                throw new System.Exception("not impl");
            },
            UnregisterDirtyVerticesCallback: function (action) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function () {
                throw new System.Exception("Exception");
            }
        }
    });
});

 
