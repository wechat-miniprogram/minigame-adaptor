Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TrackedReference", {
        statics: {
            methods: {
                op_Equality: function (x, y) {
                    return x === y;
                },
                op_Implicit: function (exists) {
                    throw new System.Exception("not impl");
                },
                op_Inequality: function (x, y) {
                    return x !== y;
                }
            }
        },
        methods: {
            equals: function (o) {
                throw new System.Exception("not impl");
            },
            getHashCode: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
