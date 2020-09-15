Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIGrid.Arrangement", {
        $kind: "nested enum",
        statics: {
            fields: {
                Horizontal: 0,
                Vertical: 1,
                CellSnap: 2
            }
        }
    });
});
