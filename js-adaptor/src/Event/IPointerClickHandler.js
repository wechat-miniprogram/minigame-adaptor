Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.IPointerClickHandler", {
        inherits: [MiniGameAdaptor.EventSystems.IEventSystemHandler],
        $kind: "interface"
    });
});
