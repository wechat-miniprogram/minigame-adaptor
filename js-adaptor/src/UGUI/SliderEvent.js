Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Slider.SliderEvent", {
        inherits: [MiniGameAdaptor.Events.UnityEvent$1],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Events.UnityEvent$1.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});

 
