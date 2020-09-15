Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICenterOnChild", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            springStrength: 0,
            nextPageThreshold: 0,
            onFinished: null,
            onCenter: null
        },
        props: {
            centeredObject: {
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
            CenterOn: function (target) {
                throw new System.Exception("not impl");
            },
            Recenter: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
