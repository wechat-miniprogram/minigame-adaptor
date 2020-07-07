Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.ScrollRect.MovementType", {
        $kind: "nested enum",
        statics: {
            fields: {
                Unrestricted: 0,
                Elastic: 1,
                Clamped: 2
            }
        }
    });
});

 
