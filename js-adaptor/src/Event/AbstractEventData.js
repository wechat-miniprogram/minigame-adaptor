Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.AbstractEventData", {
        props: {
            used: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            Reset: function () {
                throw new System.Exception("not impl");
            },
            Use: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
