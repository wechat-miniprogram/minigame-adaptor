Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UITweener.Method", {
        $kind: "nested enum",
        statics: {
            fields: {
                Linear: 0,
                EaseIn: 1,
                EaseOut: 2,
                EaseInOut: 3,
                BounceIn: 4,
                BounceOut: 5
            }
        }
    });
});
