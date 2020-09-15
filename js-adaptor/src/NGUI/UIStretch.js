Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIStretch", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            uiCamera: null,
            container: null,
            style: 0,
            runOnlyOnce: false,
            relativeSize: null,
            initialSize: null,
            borderPadding: null
        },
        ctors: {
            init: function () {
                this.relativeSize = new MiniGameAdaptor.Vector2();
                this.initialSize = new MiniGameAdaptor.Vector2();
                this.borderPadding = new MiniGameAdaptor.Vector2();
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
