Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.EventTriggerType", {
        $kind: "enum",
        statics: {
            fields: {
                PointerEnter: 0,
                PointerExit: 1,
                PointerDown: 2,
                PointerUp: 3,
                PointerClick: 4,
                Drag: 5,
                Drop: 6,
                Scroll: 7,
                UpdateSelected: 8,
                Select: 9,
                Deselect: 10,
                Move: 11,
                InitializePotentialDrag: 12,
                BeginDrag: 13,
                EndDrag: 14,
                Submit: 15,
                Cancel: 16
            }
        }
    });
});