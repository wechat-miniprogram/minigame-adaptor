Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.AxisEventData", {
        inherits: [MiniGameAdaptor.EventSystems.BaseEventData],
        props: {
            moveDir: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            moveVector: {
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
                MiniGameAdaptor.EventSystems.BaseEventData.ctor.call(this, eventSystem);
                throw new System.Exception("not impl");
            }
        }
    });
});
