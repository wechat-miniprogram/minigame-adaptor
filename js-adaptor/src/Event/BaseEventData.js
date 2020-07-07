Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.BaseEventData", {
        inherits: [MiniGameAdaptor.EventSystems.AbstractEventData],
        props: {
            currentInputModule: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            selectedObject: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (eventSystem) {
                this.$initialize();
                MiniGameAdaptor.EventSystems.AbstractEventData.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
