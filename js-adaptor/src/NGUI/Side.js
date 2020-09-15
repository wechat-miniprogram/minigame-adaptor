Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIAnchor.Side", {
        $kind: "nested enum",
        statics: {
            fields: {
                BottomLeft: 0,
                Left: 1,
                TopLeft: 2,
                Top: 3,
                TopRight: 4,
                Right: 5,
                BottomRight: 6,
                Bottom: 7,
                Center: 8
            }
        }
    });
});
