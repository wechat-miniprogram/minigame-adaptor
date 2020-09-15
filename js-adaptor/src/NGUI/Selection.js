Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPopupList.Selection", {
        $kind: "nested enum",
        statics: {
            fields: {
                OnPress: 0,
                OnClick: 1
            }
        }
    });
});
