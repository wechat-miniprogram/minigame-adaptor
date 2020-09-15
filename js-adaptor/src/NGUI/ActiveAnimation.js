Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.ActiveAnimation", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            },
            methods: {
                Play: function (anim, playDirection) {
                    throw new System.Exception("not impl");
                },
                Play$1: function (anim, clipName, playDirection) {
                    throw new System.Exception("not impl");
                },
                Play$2: function (anim, clipName, playDirection, enableBeforePlay, disableCondition) {
                    throw new System.Exception("not impl");
                },
                Play$3: function (anim, clipName, playDirection, enableBeforePlay, disableCondition) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            onFinished: null,
            eventReceiver: null,
            callWhenFinished: null
        },
        props: {
            isPlaying: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Finish: function () {
                throw new System.Exception("not impl");
            },
            Reset: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
