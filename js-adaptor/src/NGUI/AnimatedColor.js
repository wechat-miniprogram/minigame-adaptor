Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AnimatedColor", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            color: null
        },
        ctors: {
            init: function () {
                this.color = new MiniGameAdaptor.Color();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
