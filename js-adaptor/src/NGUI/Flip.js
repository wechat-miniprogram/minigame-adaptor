Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIBasicSprite.Flip", {
        $kind: "nested enum",
        statics: {
            fields: {
                Nothing: 0,
                Horizontally: 1,
                Vertically: 2,
                Both: 3
            }
        }
    });
});
