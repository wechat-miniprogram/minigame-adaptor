Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UILabel.Overflow", {
        $kind: "nested enum",
        statics: {
            fields: {
                ShrinkContent: 0,
                ClampContent: 1,
                ResizeFreely: 2,
                ResizeHeight: 3
            }
        }
    });
});
