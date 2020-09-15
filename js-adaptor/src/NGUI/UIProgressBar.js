Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIProgressBar", {
        inherits: [UIWidgetContainer],
        statics: {
            fields: {
                current: null
            }
        },
        fields: {
            onDragFinished: null,
            thumb: null,
            mBG: null,
            mFG: null,
            mValue: 0,
            mFill: 0,
            mStarted: false,
            mTrans: null,
            mIsDirty: false,
            mCam: null,
            mOffset: 0,
            numberOfSteps: 0,
            onChange: null
        },
        props: {
            alpha: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            backgroundWidget: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            cachedCamera: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cachedTransform: {
                get: function () {
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
            foregroundWidget: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isHorizontal: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isInverted: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            value: {
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
                UIWidgetContainer.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            ForceUpdate: function () {
                throw new System.Exception("not impl");
            },
            LocalToValue: function (localPos) {
                throw new System.Exception("not impl");
            },
            OnPan: function (delta) {
                throw new System.Exception("not impl");
            },
            OnStart: function () {
                throw new System.Exception("not impl");
            },
            OnValidate: function () {
                throw new System.Exception("not impl");
            },
            ScreenToValue: function (screenPos) {
                throw new System.Exception("not impl");
            },
            Set: function (val, notify) {
                if (notify === void 0) { notify = true; }
                throw new System.Exception("not impl");
            },
            SetThumbPosition: function (worldPos) {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            Update: function () {
                throw new System.Exception("not impl");
            },
            Upgrade: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
