Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RealTime", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            props: {
                deltaTime: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                time: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
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
