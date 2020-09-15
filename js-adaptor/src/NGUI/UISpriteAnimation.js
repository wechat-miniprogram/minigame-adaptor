Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UISpriteAnimation", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            frameIndex: 0,
            mFPS: 0,
            mPrefix: null,
            mLoop: false,
            mSnap: false,
            mSprite: null,
            mDelta: 0,
            mActive: false,
            mSpriteNames: null
        },
        props: {
            frames: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
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
            },
            loop: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            namePrefix: {
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
            RebuildSpriteList: function () {
                throw new System.Exception("not impl");
            },
            ResetToBeginning: function () {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            Update: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
