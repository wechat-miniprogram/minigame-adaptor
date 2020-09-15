Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventDelegate.Parameter", {
        $kind: "nested class",
        fields: {
            obj: null,
            field: null,
            expectedType: null,
            cached: false,
            propInfo: null,
            fieldInfo: null
        },
        props: {
            type: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            value: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            },
            $ctor1: function (val) {
                this.$initialize();
                throw new System.Exception("not impl");
            },
            $ctor2: function (obj, field) {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});
