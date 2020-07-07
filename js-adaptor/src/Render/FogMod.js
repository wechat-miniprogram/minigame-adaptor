Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.FogMode", {
        $kind: "enum",
        statics: {
            fields: {
                Linear: 1,
                Exponential: 2,
                ExponentialSquared: 3
            }
        }
    });
});
