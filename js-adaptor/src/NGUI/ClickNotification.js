Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICamera.ClickNotification", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Always: 1,
                BasedOnDelta: 2
            }
        }
    });
});
