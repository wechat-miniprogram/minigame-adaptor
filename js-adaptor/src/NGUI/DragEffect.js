Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDragObject.DragEffect", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Momentum: 1,
                MomentumAndSpring: 2
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UIScrollView.DragEffect", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Momentum: 1,
                MomentumAndSpring: 2
            }
        }
    });
});
