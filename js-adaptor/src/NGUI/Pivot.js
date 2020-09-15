Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIWidget.Pivot", {
        $kind: "nested enum",
        statics: {
            fields: {
                TopLeft: 0,
                Top: 1,
                TopRight: 2,
                Left: 3,
                Center: 4,
                Right: 5,
                BottomLeft: 6,
                Bottom: 7,
                BottomRight: 8
            }
        }
    });
});
