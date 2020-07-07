Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TouchPhase", {
        $kind: "enum",
        statics: {
            fields: {
                Began: 0,
                Moved: 1,
                Stationary: 2,
                Ended: 3,
                Canceled: 4
            }
        }
    });
});

 
