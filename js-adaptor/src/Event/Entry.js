Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.EventTrigger.Entry", {
        $kind: "nested class",
        fields: {
            eventID: 0,
            callback: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});

 
