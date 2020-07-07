Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.SearchOption", {
        $kind: "enum",
        statics: {
            fields: {
                TopDirectoryOnly: 0,
                AllDirectories: 1
            }
        }
    });
});
