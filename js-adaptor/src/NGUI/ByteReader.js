Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.ByteReader", {
        statics: {
            methods: {
                Open: function (path) {
                    throw new System.Exception("not impl");
                }
            }
        },
        props: {
            canRead: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (bytes) {
                this.$initialize();
                throw new System.Exception("not impl");
            },
            $ctor1: function (asset) {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            ReadCSV: function () {
                throw new System.Exception("not impl");
            },
            ReadDictionary: function () {
                throw new System.Exception("not impl");
            },
            ReadLine: function () {
                throw new System.Exception("not impl");
            },
            ReadLine$1: function (skipEmptyLines) {
                throw new System.Exception("not impl");
            }
        }
    });
});
