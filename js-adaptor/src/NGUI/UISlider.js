Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UISlider", {
        inherits: [UIProgressBar],
        fields: {
            mInverted: false
        },
        props: {
            isColliderEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                UIProgressBar.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            OnDragBackground: function (go, delta) {
                throw new System.Exception("not impl");
            },
            OnDragForeground: function (go, delta) {
                throw new System.Exception("not impl");
            },
            OnPan: function (delta) {
                throw new System.Exception("not impl");
            },
            OnPressBackground: function (go, isPressed) {
                throw new System.Exception("not impl");
            },
            OnPressForeground: function (go, isPressed) {
                throw new System.Exception("not impl");
            },
            OnStart: function () {
                throw new System.Exception("not impl");
            },
            Upgrade: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
