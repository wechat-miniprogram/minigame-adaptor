Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIBasicSprite.AdvancedType", {
        $kind: "nested enum",
        statics: {
            fields: {
                Invisible: 0,
                Sliced: 1,
                Tiled: 2
            }
        }
    });
});
