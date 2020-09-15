Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIKeyNavigation.Constraint", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Vertical: 1,
                Horizontal: 2,
                Explicit: 3
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UIRoot.Constraint", {
        $kind: "nested enum",
        statics: {
            fields: {
                Fit: 0,
                Fill: 1,
                FitWidth: 2,
                FitHeight: 3
            }
        }
    });
});
