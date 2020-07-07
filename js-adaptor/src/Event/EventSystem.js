Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.EventSystem", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
        statics: {
            props: {
                current: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
            }
        },
        props: {
            alreadySelecting: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            currentInputModule: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            currentSelectedGameObject: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            firstSelectedGameObject: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isFocused: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pixelDragThreshold: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sendNavigationEvents: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            IsPointerOverGameObject: function () {
                throw new System.Exception("not impl");
            },
            IsPointerOverGameObject$1: function (pointerId) {
                throw new System.Exception("not impl");
            },
            SetSelectedGameObject: function (selected) {
                throw new System.Exception("not impl");
            },
            SetSelectedGameObject$1: function (selected, pointer) {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            },
            UpdateModules: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
