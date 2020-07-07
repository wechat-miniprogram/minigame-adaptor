Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Button.ButtonClickedEvent", {
        inherits: [MiniGameAdaptor.Events.UnityEvent],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Events.UnityEvent.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});

 
