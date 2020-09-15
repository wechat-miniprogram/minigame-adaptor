Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIAnchor", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            uiCamera: null,
            container: null,
            side: 0,
            runOnlyOnce: false,
            relativeOffset: null,
            pixelOffset: null
        },
        ctors: {
            init: function () {
                this.relativeOffset = new MiniGameAdaptor.Vector2();
                this.pixelOffset = new MiniGameAdaptor.Vector2();
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
