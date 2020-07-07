Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.BlendWeights", {
        $kind: "enum",
        statics: {
            fields: {
                OneBone: 1,
                TwoBones: 2,
                FourBones: 4
            }
        }
    });
});
