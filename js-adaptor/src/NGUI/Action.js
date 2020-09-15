Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIKeyBinding.Action", {
        $kind: "nested enum",
        statics: {
            fields: {
                PressAndClick: 0,
                Select: 1,
                All: 2
            }
        }
    });
});
