Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIStretch.Style", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Horizontal: 1,
                Vertical: 2,
                Both: 3,
                BasedOnHeight: 4,
                FillKeepingRatio: 5,
                FitInternalKeepingRatio: 6
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UITextList.Style", {
        $kind: "nested enum",
        statics: {
            fields: {
                Text: 0,
                Chat: 1
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UITweener.Style", {
        $kind: "nested enum",
        statics: {
            fields: {
                Once: 0,
                Loop: 1,
                PingPong: 2
            }
        }
    });
});
