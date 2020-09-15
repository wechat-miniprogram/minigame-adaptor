Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIBasicSprite", {
        inherits: [MiniGameAdaptor.UIWidget],
        statics: {
            fields: {
                mTempPos: null,
                mTempUVs: null
            }
        },
        fields: {
            mType: 0,
            mFillDirection: 0,
            mFillAmount: 0,
            mInvert: false,
            mFlip: 0,
            mApplyGradient: false,
            mGradientTop: null,
            mGradientBottom: null,
            centerType: 0,
            leftType: 0,
            rightType: 0,
            bottomType: 0,
            topType: 0
        },
        props: {
            drawingColor: {
                get: function () {
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
            fillDirection: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            flip: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            hasBorder: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            invert: {
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
            type: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.mGradientTop = new MiniGameAdaptor.Color();
                this.mGradientBottom = new MiniGameAdaptor.Color();
            }
        },
        methods: {
            Fill: function (verts, uvs, cols, outer, inner) {
                throw new System.Exception("not impl");
            }
        }
    });
});
