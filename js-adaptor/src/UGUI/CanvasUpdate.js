Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.CanvasUpdate", {
        $kind: "enum",
        statics: {
            fields: {
                Prelayout: 0,
                Layout: 1,
                PostLayout: 2,
                PreRender: 3,
                LatePreRender: 4,
                MaxUpdateValue: 5
            }
        }
    });
});

 
