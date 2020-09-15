Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIInput.Validation", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                Integer: 1,
                Float: 2,
                Alphanumeric: 3,
                Username: 4,
                Name: 5,
                Filename: 6
            }
        }
    });
});
