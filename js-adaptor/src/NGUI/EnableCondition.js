Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AnimationOrTween.EnableCondition", {
        $kind: "enum",
        statics: {
            fields: {
                DoNothing: 0,
                EnableThenPlay: 1,
                IgnoreDisabledState: 2
            }
        }
    });
});
