Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIRoot.Scaling", {
        $kind: "nested enum",
        statics: {
            fields: {
                Flexible: 0,
                Constrained: 1,
                ConstrainedOnMobiles: 2
            }
        }
    });
});
