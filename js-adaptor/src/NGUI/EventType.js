Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICamera.EventType", {
        $kind: "nested enum",
        statics: {
            fields: {
                World_3D: 0,
                UI_3D: 1,
                World_2D: 2,
                UI_2D: 3
            }
        }
    });
});
