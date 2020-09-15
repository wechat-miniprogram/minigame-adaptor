Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDrawCall.ShadowMode", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Receive: 1,
                CastAndReceive: 2
            }
        }
    });
});
