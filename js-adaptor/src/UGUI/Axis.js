Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RectTransform.Axis", {
        $kind: "nested enum",
        statics: {
            fields: {
                Horizontal: 0,
                Vertical: 1
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UI.GridLayoutGroup.Axis", {
        $kind: "nested enum",
        statics: {
            fields: {
                Horizontal: 0,
                Vertical: 1
            }
        }
    });
});

 
