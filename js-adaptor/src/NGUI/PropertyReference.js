Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.PropertyReference", {
        statics: {
            methods: {
                Convert: function (value, to) {
                    throw new System.Exception("not impl");
                },
                Convert$1: function (value, from, to) {
                    throw new System.Exception("not impl");
                },
                Convert$2: function (from, to) {
                    throw new System.Exception("not impl");
                },
                ToString: function (comp, property) {
                    throw new System.Exception("not impl");
                }
            }
        },
        props: {
            isEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isValid: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            name: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            target: {
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
            $ctor1: function (target, fieldName) {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Clear: function () {
                throw new System.Exception("not impl");
            },
            equals: function (obj) {
                throw new System.Exception("not impl");
            },
            Get: function () {
                throw new System.Exception("not impl");
            },
            getHashCode: function () {
                throw new System.Exception("not impl");
            },
            GetPropertyType: function () {
                throw new System.Exception("not impl");
            },
            Reset: function () {
                throw new System.Exception("not impl");
            },
            Set: function (value) {
                throw new System.Exception("not impl");
            },
            Set$1: function (target, methodName) {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
