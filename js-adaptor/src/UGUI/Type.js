Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Image.Type", {
        $kind: "nested enum",
        statics: {
            fields: {
                Simple: 0,
                Sliced: 1,
                Tiled: 2,
                Filled: 3
            }
        }
    });
});

 
