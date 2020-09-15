Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.NGUIDebug", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            props: {
                debugRaycast: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                Clear: function () {
                    throw new System.Exception("not impl");
                },
                CreateInstance: function () {
                    throw new System.Exception("not impl");
                },
                DrawBounds: function (b) {
                    throw new System.Exception("not impl");
                },
                Log: function (objs) {
                    if (objs === void 0) { objs = []; }
                    throw new System.Exception("not impl");
                },
                Log$1: function (s) {
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
        }
    });
});
