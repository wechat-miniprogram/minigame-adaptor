Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIKeyBinding.Modifier", {
        $kind: "nested enum",
        statics: {
            fields: {
                Any: 0,
                Shift: 1,
                Control: 2,
                Alt: 3,
                None: 4
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UILabel.Modifier", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                ToUppercase: 1,
                ToLowercase: 2,
                Custom: 255
            }
        }
    });
});
