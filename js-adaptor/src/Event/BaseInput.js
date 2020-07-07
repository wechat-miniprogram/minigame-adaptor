Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.BaseInput", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour],
        props: {
            compositionCursorPos: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            compositionString: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            imeCompositionMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            mousePosition: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            mousePresent: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            mouseScrollDelta: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            touchCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            touchSupported: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.EventSystems.UIBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            GetAxisRaw: function (axisName) {
                throw new System.Exception("not impl");
            },
            GetButtonDown: function (buttonName) {
                throw new System.Exception("not impl");
            },
            GetMouseButton: function (button) {
                throw new System.Exception("not impl");
            },
            GetMouseButtonDown: function (button) {
                throw new System.Exception("not impl");
            },
            GetMouseButtonUp: function (button) {
                throw new System.Exception("not impl");
            },
            GetTouch: function (index) {
                throw new System.Exception("not impl");
            }
        }
    });
});
