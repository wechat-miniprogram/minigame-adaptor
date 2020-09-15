Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIRect.AnchorUpdate", {
        $kind: "nested enum",
        statics: {
            fields: {
                OnEnable: 0,
                OnUpdate: 1,
                OnStart: 2
            }
        }
    });
});
