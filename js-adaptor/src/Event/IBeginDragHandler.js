Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.IBeginDragHandler", {
        inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
        $kind: "interface"
    });
});