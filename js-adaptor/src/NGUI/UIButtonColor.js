Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIButtonColor", {
        inherits: [MiniGameAdaptor.UIWidgetContainer],
        statics:{
            fields: {
                State:{
                    Normal:0,
                    Hover:0,
                    Pressed:1,
                    Disabled:2,
                }
            },
        },
        fields: {
            tweenTarget: null,
            hover: null,
            pressed: null,
            disabledColor: null,
            duration: 0,
            mStartingColor: null,
            mDefaultColor: null,
            mInitDone: false,
            mWidget: null,
            mState: 0
        },
        props: {
            defaultColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            state: {
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
                this.hover = new MiniGameAdaptor.Color();
                this.pressed = new MiniGameAdaptor.Color();
                this.disabledColor = new MiniGameAdaptor.Color();
                this.mStartingColor = new MiniGameAdaptor.Color();
                this.mDefaultColor = new MiniGameAdaptor.Color();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.UIWidgetContainer.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            CacheDefaultColor: function () {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                throw new System.Exception("not impl");
            },
            OnDragOut: function () {
                throw new System.Exception("not impl");
            },
            OnDragOver: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            OnHover: function (isOver) {
                throw new System.Exception("not impl");
            },
            OnInit: function () {
                throw new System.Exception("not impl");
            },
            OnPress: function (isPressed) {
                throw new System.Exception("not impl");
            },
            ResetDefaultColor: function () {
                throw new System.Exception("not impl");
            },
            SetState: function (state, instant) {
                throw new System.Exception("not impl");
            },
            UpdateColor: function (instant) {
                throw new System.Exception("not impl");
            }
        }
    });
});
