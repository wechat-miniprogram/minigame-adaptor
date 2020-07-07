Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.FilterMode", {
        $kind: "enum",
        statics: {
            fields: {
                Point: 0,
                Bilinear: 1,
                Trilinear: 2
            }
        }
    });
});

 
