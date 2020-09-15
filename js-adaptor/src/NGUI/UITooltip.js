Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UITooltip", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                mInstance: null
            },
            props: {
                isVisible: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                Hide: function () {
                    throw new System.Exception("not impl");
                },
                Show: function (text) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            uiCamera: null,
            text: null,
            tooltipRoot: null,
            background: null,
            appearSpeed: 0,
            scalingTransitions: false,
            mTooltip: null,
            mTrans: null,
            mTarget: 0,
            mCurrent: 0,
            mPos: null,
            mSize: null,
            mWidgets: null
        },
        ctors: {
            init: function () {
                this.mPos = new MiniGameAdaptor.Vector3();
                this.mSize = new MiniGameAdaptor.Vector3();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            SetAlpha: function (val) {
                throw new System.Exception("not impl");
            },
            SetText: function (tooltipText) {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            Update: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
