Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIInput.InputType", {
        $kind: "nested enum",
        statics: {
            fields: {
                Standard: 0,
                AutoCorrect: 1,
                Password: 2
            }
        }
    });
});
