Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UILabel.Effect", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Shadow: 1,
                Outline: 2,
                Outline8: 3
            }
        }
    });
});
