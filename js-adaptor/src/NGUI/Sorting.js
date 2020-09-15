Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIGrid.Sorting", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Alphabetic: 1,
                Horizontal: 2,
                Vertical: 3,
                Custom: 4
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UITable.Sorting", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Alphabetic: 1,
                Horizontal: 2,
                Vertical: 3,
                Custom: 4
            }
        }
    });
});
