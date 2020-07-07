Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AudioBehaviour", {
        inherits: [MiniGameAdaptor.Behaviour],
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Behaviour.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        }
    });
});
