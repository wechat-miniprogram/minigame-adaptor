Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.BMGlyph", {
        fields: {
            index: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            offsetX: 0,
            offsetY: 0,
            advance: 0,
            channel: 0,
            kerning: null
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            GetKerning: function (previousChar) {
                throw new System.Exception("not impl");
            },
            SetKerning: function (previousChar, amount) {
                throw new System.Exception("not impl");
            },
            Trim: function (xMin, yMin, xMax, yMax) {
                throw new System.Exception("not impl");
            }
        }
    });
});
