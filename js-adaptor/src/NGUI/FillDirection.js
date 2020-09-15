Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIBasicSprite.FillDirection", {
        $kind: "nested enum",
        statics: {
            fields: {
                Horizontal: 0,
                Vertical: 1,
                Radial90: 2,
                Radial180: 3,
                Radial360: 4
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UIProgressBar.FillDirection", {
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
