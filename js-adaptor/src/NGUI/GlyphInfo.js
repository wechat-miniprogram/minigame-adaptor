Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.NGUIText.GlyphInfo", {
        $kind: "nested class",
        fields: {
            v0: null,
            v1: null,
            u0: null,
            u1: null,
            u2: null,
            u3: null,
            advance: 0,
            channel: 0
        },
        ctors: {
            init: function () {
                this.v0 = new MiniGameAdaptor.Vector2();
                this.v1 = new MiniGameAdaptor.Vector2();
                this.u0 = new MiniGameAdaptor.Vector2();
                this.u1 = new MiniGameAdaptor.Vector2();
                this.u2 = new MiniGameAdaptor.Vector2();
                this.u3 = new MiniGameAdaptor.Vector2();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});
