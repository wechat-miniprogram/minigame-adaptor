Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIRoot", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                list: null
            },
            methods: {
                Broadcast: function (funcName) {
                    throw new System.Exception("not impl");
                },
                Broadcast$1: function (funcName, param) {
                    throw new System.Exception("not impl");
                },
                GetPixelSizeAdjustment: function (go) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            scalingStyle: 0,
            manualWidth: 0,
            manualHeight: 0,
            minimumHeight: 0,
            maximumHeight: 0,
            fitWidth: false,
            fitHeight: false,
            adjustByDPI: false,
            shrinkPortraitUI: false
        },
        props: {
            activeHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            activeScaling: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            constraint: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pixelSizeAdjustment: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Awake: function () {
                throw new System.Exception("not impl");
            },
            GetPixelSizeAdjustment: function (height) {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            UpdateScale: function (updateAnchors) {
                if (updateAnchors === void 0) { updateAnchors = true; }
                throw new System.Exception("not impl");
            }
        }
    });
});
