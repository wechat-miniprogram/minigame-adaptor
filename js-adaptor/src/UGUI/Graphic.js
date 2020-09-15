Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Graphic", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour, MiniGameAdaptor.UI.ICanvasElement],
        statics: {
            methods: {
                Deserialize: function (data, comp, context, builtContext) {
                    
                    let rect = new MiniGameAdaptor.RectTransform();
                    rect._transform = comp.transform;
                    comp._rectTransform = rect;

                    return comp;
                },
                // formatRectTransForm: function (comp) {
                //     let rect = new MiniGameAdaptor.RectTransform();
                //     rect._transform = comp.transform;
                //     comp._rectTransform = rect;
                // }
            },
            props: {
                defaultGraphicMaterial: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            }
        },
        fields: {
            _grphic: null,
            _rectTransform: null,
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
                    return this.ref.color;
                    // throw new System.Exception("not impl");
                },
                set: function (value) {
                    if (this.name == "Text") {
                        this.ref.fontColor.r = value.r;
                        this.ref.fontColor.g = value.g;
                        this.ref.fontColor.b = value.b;
                        this.ref.fontColor.a = value.a * 255;
                    } else if (this.name = "Image") {
                        this.ref.color.r = value.r;
                        this.ref.color.g = value.g;
                        this.ref.color.b = value.b;
                        this.ref.color.a = value.a * 255;
                    }

                    // throw new System.Exception("not impl");
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
                    return this._rectTransform;
                    // throw new System.Exception("not impl");
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
engine.decorators.serialize('MiniGameAdaptor.UI.Graphic')(MiniGameAdaptor.UI.Graphic);
Object.defineProperty(MiniGameAdaptor.UI.Graphic.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UI.Graphic.prototype.__properties }
})

