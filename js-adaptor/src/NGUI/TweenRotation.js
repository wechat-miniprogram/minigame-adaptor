Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TweenRotation", {
        inherits: [UITweener],
        statics: {
            methods: {
                Begin: function (go, duration, rot) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            from: null,
            to: null,
            quaternionLerp: false
        },
        props: {
            cachedTransform: {
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
            init: function () {
                this.from = new MiniGameAdaptor.Vector3();
                this.to = new MiniGameAdaptor.Vector3();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                UITweener.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            OnUpdate: function (factor, isFinished) {
                throw new System.Exception("not impl");
            },
            SetEndToCurrentValue: function () {
                throw new System.Exception("not impl");
            },
            SetStartToCurrentValue: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
