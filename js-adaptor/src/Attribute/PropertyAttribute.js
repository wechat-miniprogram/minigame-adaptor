Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.PropertyAttribute", {
        inherits: [System.Attribute],
        props: {
            order: {
                get: function () {
                    // throw new System.Exception("not impl");
                },
                set: function (value) {
                    // throw new System.Exception("not impl");
                }
            }
        }
    });
});

 
