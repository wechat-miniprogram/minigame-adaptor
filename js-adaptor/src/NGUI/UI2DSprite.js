Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI2DSprite", {
        inherits: [UIBasicSprite],
        fields: {
            nextSprite: null
        },
        props: {
            border: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            drawingDimensions: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            fixedAspect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
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
            shader: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sprite2D: {
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
                UIBasicSprite.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            MakePixelPerfect: function () {
                throw new System.Exception("not impl");
            },
            OnFill: function (verts, uvs, cols) {
                throw new System.Exception("not impl");
            },
            OnUpdate: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
