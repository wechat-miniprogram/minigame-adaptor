Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.ToggleGroup", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
        props: {
            allowSwitchOff: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            ActiveToggles: function () {
                throw new System.Exception("not impl");
            },
            AnyTogglesOn: function () {
                throw new System.Exception("not impl");
            },
            NotifyToggleOn: function (toggle) {
                throw new System.Exception("not impl");
            },
            RegisterToggle: function (toggle) {
                throw new System.Exception("not impl");
            },
            SetAllTogglesOff: function () {
                throw new System.Exception("not impl");
            },
            UnregisterToggle: function (toggle) {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
