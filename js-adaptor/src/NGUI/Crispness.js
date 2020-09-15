Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UILabel.Crispness", {
        $kind: "nested enum",
        statics: {
            fields: {
                Never: 0,
                OnDesktop: 1,
                Always: 2
            }
        }
    });
});
