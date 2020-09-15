Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AnimationOrTween.DisableCondition", {
        $kind: "enum",
        statics: {
            fields: {
                DisableAfterReverse: -1,
                DoNotDisable: 0,
                DisableAfterForward: 1
            }
        }
    });
});
