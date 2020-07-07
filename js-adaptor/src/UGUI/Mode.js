Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Navigation.Mode", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Horizontal: 1,
                Vertical: 2,
                Automatic: 3,
                Explicit: 4
            }
        }
    });
});

 
