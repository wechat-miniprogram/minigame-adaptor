Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDrawCall.Clipping", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                TextureMask: 1,
                SoftClip: 3,
                ConstrainButDontClip: 4
            }
        }
    });
});
