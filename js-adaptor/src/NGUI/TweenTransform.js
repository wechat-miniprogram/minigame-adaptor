Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TweenTransform", {
        inherits: [UITweener],
        statics: {
            methods: {
                Begin: function (go, duration, to) {
                    throw new System.Exception("not impl");
                },
                Begin$1: function (go, duration, from, to) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            from: null,
            to: null,
            parentWhenFinished: false
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
            }
        }
    });
});
