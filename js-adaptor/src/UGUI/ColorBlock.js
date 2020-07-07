Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.ColorBlock", {
        inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.UI.ColorBlock)]; },
        $kind: "struct",
        statics: {
            props: {
                defaultColorBlock: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                op_Equality: function (point1, point2) {
                    throw new System.Exception("not impl");
                },
                op_Inequality: function (point1, point2) {
                    throw new System.Exception("not impl");
                },
                getDefaultValue: function () { return new MiniGameAdaptor.UI.ColorBlock(); }
            }
        },
        props: {
            colorMultiplier: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            disabledColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fadeDuration: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            highlightedColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            normalColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pressedColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            equals: function (obj) {
                throw new System.Exception("not impl");
            },
            Equals: function (other) {
                throw new System.Exception("not impl");
            },
            System$IEquatable$1$MiniGameAdaptor$UI$ColorBlock$equalsT: function (other) {
                throw new System.Exception("Exception");
            },
            getHashCode: function () {
                throw new System.Exception("not impl");
            },
            $clone: function (to) { return this; }
        }
    });
});

 
