Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.SerializeField", {
        inherits: [System.Attribute],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);
            }
        }
    });
});

 
