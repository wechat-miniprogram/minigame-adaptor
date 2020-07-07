Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.MoveDirection", {
        $kind: "enum",
        statics: {
            fields: {
                Left: 0,
                Up: 1,
                Right: 2,
                Down: 3,
                None: 4
            }
        }
    });
});

 
