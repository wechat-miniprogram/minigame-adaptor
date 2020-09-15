Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPanel.RenderQueue", {
        $kind: "nested enum",
        statics: {
            fields: {
                Automatic: 0,
                StartAt: 1,
                Explicit: 2
            }
        }
    });
});
