Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIViewport", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            sourceCamera: null,
            topLeft: null,
            bottomRight: null,
            fullSize: 0
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
