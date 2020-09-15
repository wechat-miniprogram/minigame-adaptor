Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIScrollView.ShowCondition", {
        $kind: "nested enum",
        statics: {
            fields: {
                Always: 0,
                OnlyIfNeeded: 1,
                WhenDragging: 2
            }
        }
    });
});
