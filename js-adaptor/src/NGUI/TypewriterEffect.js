Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TypewriterEffect", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            }
        },
        fields: {
            charsPerSecond: 0,
            fadeInTime: 0,
            delayOnPeriod: 0,
            delayOnNewLine: 0,
            scrollView: null,
            keepFullDimensions: false,
            onFinished: null
        },
        props: {
            isActive: {
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
            Finish: function () {
                throw new System.Exception("not impl");
            },
            ResetToBeginning: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
