Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDragScrollView", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            scrollView: null
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
            OnPan: function (delta) {
                throw new System.Exception("not impl");
            }
        }
    });
});
