Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RectTransform", {
        inherits: [MiniGameAdaptor.Transform],
        statics: {
            events: {
                reapplyDrivenProperties: null
            },
            fields: {
                _transform: null
            }
        },
        props: {
            anchoredPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            anchoredPosition3D: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            anchorMax: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            anchorMin: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            offsetMax: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            offsetMin: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pivot: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rect: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            sizeDelta: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Transform.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            ForceUpdateRectTransforms: function () {
                throw new System.Exception("not impl");
            },
            GetLocalCorners: function (fourCornersArray) {
                throw new System.Exception("not impl");
            },
            GetWorldCorners: function (fourCornersArray) {
                throw new System.Exception("not impl");
            },
            SetInsetAndSizeFromParentEdge: function (edge, inset, size) {
                throw new System.Exception("not impl");
            },
            SetSizeWithCurrentAnchors: function (axis, size) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.RectTransform')(MiniGameAdaptor.RectTransform);
Object.defineProperty(MiniGameAdaptor.RectTransform.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.RectTransform.prototype.__properties }
})
 
