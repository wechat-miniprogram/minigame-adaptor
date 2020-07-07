Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.BaseRaycaster", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
        props: {
            eventCamera: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            renderOrderPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            sortOrderPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            Raycast: function (eventData, resultAppendList) {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});


