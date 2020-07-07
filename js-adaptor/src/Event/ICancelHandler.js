Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.ICancelHandler", {
        inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
        $kind: "interface"
    });
});
