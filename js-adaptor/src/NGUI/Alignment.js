Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.NGUIText.Alignment", {
        $kind: "nested enum",
        statics: {
            fields: {
                Automatic: 0,
                Left: 1,
                Center: 2,
                Right: 3,
                Justified: 4
            }
        }
    });
});
