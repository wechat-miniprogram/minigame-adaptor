Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICamera.ControlScheme", {
        $kind: "nested enum",
        statics: {
            fields: {
                Mouse: 0,
                Touch: 1,
                Controller: 2
            }
        }
    });
});
