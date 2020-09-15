Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI2DSpriteAnimation", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            frameIndex: 0,
            framerate: 0,
            ignoreTimeScale: false,
            loop: false,
            frames: null
        },
        props: {
            framesPerSecond: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
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
            Pause: function () {
                throw new System.Exception("not impl");
            },
            Play: function () {
                throw new System.Exception("not impl");
            },
            ResetToBeginning: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
