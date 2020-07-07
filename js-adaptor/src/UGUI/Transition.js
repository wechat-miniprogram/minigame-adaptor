Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Selectable.Transition", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                ColorTint: 1,
                SpriteSwap: 2,
                Animation: 3
            }
        }
    });
});


