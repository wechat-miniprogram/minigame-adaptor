Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIToggledComponents", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            activate: null,
            deactivate: null
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
            Toggle: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
