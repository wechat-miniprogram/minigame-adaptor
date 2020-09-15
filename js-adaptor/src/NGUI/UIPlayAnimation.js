Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPlayAnimation", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            }
        },
        fields: {
            target: null,
            animator: null,
            clipName: null,
            trigger: 0,
            playDirection: 0,
            resetOnPlay: false,
            clearSelection: false,
            ifDisabledOnPlay: 0,
            disableWhenFinished: 0,
            onFinished: null
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
            Play: function (forward) {
                throw new System.Exception("not impl");
            },
            Play$1: function (forward, onlyIfDifferent) {
                throw new System.Exception("not impl");
            },
            PlayForward: function () {
                throw new System.Exception("not impl");
            },
            PlayReverse: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
