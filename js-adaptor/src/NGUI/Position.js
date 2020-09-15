Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPopupList.Position", {
        $kind: "nested enum",
        statics: {
            fields: {
                Auto: 0,
                Above: 1,
                Below: 2
            }
        }
    });
});
