Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.FileAccess", {
        $kind: "enum",
        statics: {
            fields: {
                Read: 1,
                Write: 2,
                ReadWrite: 3
            }
        }
    });
});
