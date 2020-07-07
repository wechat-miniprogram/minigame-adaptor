Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TouchType", {
        $kind: "enum",
        statics: {
            fields: {
                Direct: 0,
                Indirect: 1,
                Stylus: 2
            }
        }
    });
});

 
