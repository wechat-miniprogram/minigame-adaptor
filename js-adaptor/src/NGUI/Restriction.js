Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDragDropItem.Restriction", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Horizontal: 1,
                Vertical: 2,
                PressAndHold: 3
            }
        }
    });
});
