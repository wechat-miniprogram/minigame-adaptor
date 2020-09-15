Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDragDropContainer", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            reparentTarget: null
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
            Start: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
