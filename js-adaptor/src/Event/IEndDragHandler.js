Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.IEndDragHandler", {
        inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
        $kind: "interface"
    });
});
