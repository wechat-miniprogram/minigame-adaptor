Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Scrollbar.Direction", {
        $kind: "nested enum",
        statics: {
            fields: {
                LeftToRight: 0,
                RightToLeft: 1,
                BottomToTop: 2,
                TopToBottom: 3
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UI.Slider.Direction", {
        $kind: "nested enum",
        statics: {
            fields: {
                LeftToRight: 0,
                RightToLeft: 1,
                BottomToTop: 2,
                TopToBottom: 3
            }
        }
    });
});

 
