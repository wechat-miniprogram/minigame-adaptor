Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Toggle", {
        inherits: [MiniGameAdaptor.UI.Selectable,MiniGameAdaptor.UI.ICanvasElement,MiniGameAdaptor.EventSystems.ISubmitHandler,MiniGameAdaptor.EventSystems.IPointerClickHandler],
        fields: {
            toggleTransition: 0,
            graphic: null,
            onValueChanged: null
        },
        props: {
            group: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isOn: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ICanvasElement$transform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            GraphicUpdateComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function () {
                throw new System.Exception("Exception");
            },
            LayoutComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function () {
                throw new System.Exception("Exception");
            },
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
            },
            Rebuild: function (executing) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$Rebuild: function (executing) {
                throw new System.Exception("Exception");
            },
            MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function () {
                throw new System.Exception("Exception");
            }
        }
    });
});

 
