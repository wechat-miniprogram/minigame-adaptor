Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TweenFOV", {
        inherits: [UITweener],
        statics: {
            methods: {
                Begin: function (go, duration, to) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            from: 0,
            to: 0
        },
        props: {
            cachedCamera: {
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
