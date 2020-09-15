Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UISprite", {
        inherits: [MiniGameAdaptor.UIBasicSprite],
        fields: {
            mSprite: null
        },
        props: {
            applyGradient: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            atlas: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            border: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            drawingDimensions: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            gradientBottom: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            gradientTop: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isValid: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            mainTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
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
            padding: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pixelSize: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            premultipliedAlpha: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            spriteName: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.UIBasicSprite.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            GetAtlasSprite: function () {
                throw new System.Exception("not impl");
            },
            MakePixelPerfect: function () {
                throw new System.Exception("not impl");
            },
            OnFill: function (verts, uvs, cols) {
                throw new System.Exception("not impl");
            },
            OnInit: function () {
                throw new System.Exception("not impl");
            },
            OnUpdate: function () {
                throw new System.Exception("not impl");
            },
            SetAtlasSprite: function (sp) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UISprite')(MiniGameAdaptor.UISprite);
Object.defineProperty(MiniGameAdaptor.UISprite.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UISprite.prototype.__properties }
})