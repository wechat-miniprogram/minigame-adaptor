Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Image", {
        inherits: [MiniGameAdaptor.UI.MaskableGraphic,MiniGameAdaptor.ISerializationCallbackReceiver,MiniGameAdaptor.UI.ILayoutElement,MiniGameAdaptor.ICanvasRaycastFilter],
        statics: {
            props: {
                defaultETC1GraphicMaterial: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            }
        },
        props: {
            alphaHitTestMinimumThreshold: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fillAmount: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fillCenter: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fillClockwise: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fillMethod: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fillOrigin: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            flexibleHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            flexibleWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasBorder: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            layoutPriority: {
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
            minHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            minWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            overrideSprite: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pixelsPerUnit: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            preferredHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            preferredWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            preserveAspect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sprite: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            type: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useSpriteMesh: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$flexibleHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$flexibleWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$layoutPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$minHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$minWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$preferredHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$preferredWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            CalculateLayoutInputHorizontal: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal: function () {
                throw new System.Exception("Exception");
            },
            CalculateLayoutInputVertical: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical: function () {
                throw new System.Exception("Exception");
            },
            IsRaycastLocationValid: function (screenPoint, eventCamera) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$ICanvasRaycastFilter$IsRaycastLocationValid: function (sp, eventCamera) {
                throw new System.Exception("Exception");
            },
            OnAfterDeserialize: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$ISerializationCallbackReceiver$OnAfterDeserialize: function () {
                throw new System.Exception("Exception");
            },
            OnBeforeSerialize: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$ISerializationCallbackReceiver$OnBeforeSerialize: function () {
                throw new System.Exception("Exception");
            },
            SetNativeSize: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
