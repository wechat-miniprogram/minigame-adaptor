Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICamera.Touch", {
        $kind: "nested class",
        fields: {
            fingerId: 0,
            phase: 0,
            position: null,
            tapCount: 0
        },
        ctors: {
            init: function () {
                this.position = new MiniGameAdaptor.Vector2();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});
