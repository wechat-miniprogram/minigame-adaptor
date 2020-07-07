Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.GridLayoutGroup.Constraint", {
        $kind: "nested enum",
        statics: {
            fields: {
                Flexible: 0,
                FixedColumnCount: 1,
                FixedRowCount: 2
            }
        }
    });
});

 
