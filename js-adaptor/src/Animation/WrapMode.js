Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.WrapMode", {
        $kind: "enum",
        statics: {
            fields: {
                Default: 0,
                Once: 1,
                Loop: 2,
                PingPong: 4,
                ClampForever: 8
            }
        }
    });
});
