Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.BaseInputModule", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
        props: {
            input: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            inputOverride: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            ActivateModule: function () {
                throw new System.Exception("not impl");
            },
            DeactivateModule: function () {
                throw new System.Exception("not impl");
            },
            IsModuleSupported: function () {
                throw new System.Exception("not impl");
            },
            IsPointerOverGameObject: function (pointerId) {
                throw new System.Exception("not impl");
            },
            Process: function () {
                throw new System.Exception("not impl");
            },
            ShouldActivateModule: function () {
                throw new System.Exception("not impl");
            },
            UpdateModule: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
