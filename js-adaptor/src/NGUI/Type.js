Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIBasicSprite.Type", {
        $kind: "nested enum",
        statics: {
            fields: {
                Simple: 0,
                Sliced: 1,
                Tiled: 2,
                Filled: 3,
                Advanced: 4
            }
        }
    });
});
