Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPopupList.OpenOn", {
        $kind: "nested enum",
        statics: {
            fields: {
                ClickOrTap: 0,
                RightClick: 1,
                DoubleClick: 2,
                Manual: 3
            }
        }
    });
});
