Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICamera.ProcessEventsIn", {
        $kind: "nested enum",
        statics: {
            fields: {
                Update: 0,
                LateUpdate: 1
            }
        }
    });
});
