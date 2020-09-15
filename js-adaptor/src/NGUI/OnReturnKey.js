Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIInput.OnReturnKey", {
        $kind: "nested enum",
        statics: {
            fields: {
                Default: 0,
                Submit: 1,
                NewLine: 2
            }
        }
    });
});
