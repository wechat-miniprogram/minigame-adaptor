Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIColorPicker", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            },
            methods: {
                Sample: function (x, y) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            value: null,
            selectionWidget: null,
            onChange: null
        },
        ctors: {
            init: function () {
                this.value = new MiniGameAdaptor.Color();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Select: function (v) {
                throw new System.Exception("not impl");
            },
            Select$1: function (c) {
                throw new System.Exception("not impl");
            }
        }
    });
});
