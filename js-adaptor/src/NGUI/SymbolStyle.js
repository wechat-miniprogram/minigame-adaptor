Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.NGUIText.SymbolStyle", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Normal: 1,
                Colored: 2,
                NoOutline: 3
            }
        }
    });
});
