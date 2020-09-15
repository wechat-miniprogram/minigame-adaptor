Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TweenColor", {
        inherits: [UITweener],
        statics: {
            methods: {
                Begin: function (go, duration, color) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            from: null,
            to: null
        },
        props: {
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
                this.from = new MiniGameAdaptor.Color();
                this.to = new MiniGameAdaptor.Color();
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
