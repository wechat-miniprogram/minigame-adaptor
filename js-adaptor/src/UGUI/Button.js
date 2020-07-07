Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Button", {
        inherits: [MiniGameAdaptor.UI.Selectable,MiniGameAdaptor.EventSystems.ISubmitHandler,MiniGameAdaptor.EventSystems.IPointerClickHandler],
        props: {
            onClick: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            OnPointerClick: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnSubmit: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit: function (eventData) {
                throw new System.Exception("Exception");
            }
        }
    });
});

 
