Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIWidget.AspectRatioSource", {
        $kind: "nested enum",
        statics: {
            fields: {
                Free: 0,
                BasedOnWidth: 1,
                BasedOnHeight: 2
            }
        }
    });
});
