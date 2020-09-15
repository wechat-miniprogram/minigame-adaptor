Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIScrollView.Movement", {
        $kind: "nested enum",
        statics: {
            fields: {
                Horizontal: 0,
                Vertical: 1,
                Unrestricted: 2,
                Custom: 3
            }
        }
    });
});
