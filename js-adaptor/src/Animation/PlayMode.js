Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.PlayMode", {
        $kind: "enum",
        statics: {
            fields: {
                StopSameLayer: 0,
                StopAll: 4
            }
        }
    });
});

 
