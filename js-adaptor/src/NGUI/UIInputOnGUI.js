Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIInputOnGUI", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
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
