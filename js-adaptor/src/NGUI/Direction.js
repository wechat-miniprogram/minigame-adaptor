Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AnimationOrTween.Direction", {
        $kind: "enum",
        statics: {
            fields: {
                Reverse: -1,
                Toggle: 0,
                Forward: 1
            }
        }
    });

    Bridge.define("MiniGameAdaptor.PropertyBinding.Direction", {
        $kind: "nested enum",
        statics: {
            fields: {
                SourceUpdatesTarget: 0,
                TargetUpdatesSource: 1,
                BiDirectional: 2
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UITable.Direction", {
        $kind: "nested enum",
        statics: {
            fields: {
                Down: 0,
                Up: 1
            }
        }
    });
});
