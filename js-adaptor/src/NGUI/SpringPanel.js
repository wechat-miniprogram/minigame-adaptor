Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.SpringPanel", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            },
            methods: {
                Begin: function (go, pos, strength) {
                    throw new System.Exception("not impl");
                },
                Stop: function (go) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            target: null,
            strength: 0,
            onFinished: null
        },
        ctors: {
            init: function () {
                this.target = new MiniGameAdaptor.Vector3();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            AdvanceTowardsPosition: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
