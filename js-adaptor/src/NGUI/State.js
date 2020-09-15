Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIButtonColor.State", {
        $kind: "nested enum",
        statics: {
            fields: {
                Normal: 0,
                Hover: 1,
                Pressed: 2,
                Disabled: 3
            }
        }
    });
});
