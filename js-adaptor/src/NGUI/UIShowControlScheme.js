Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIShowControlScheme", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            target: null,
            mouse: false,
            touch: false,
            controller: false
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
