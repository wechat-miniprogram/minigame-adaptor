Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Navigation", {
        inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.UI.Navigation)]; },
        $kind: "struct",
        statics: {
            props: {
                defaultNavigation: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.UI.Navigation(); }
            }
        },
        props: {
            mode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            selectOnDown: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            selectOnLeft: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            selectOnRight: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            selectOnUp: {
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
            Equals: function (other) {
                throw new System.Exception("not impl");
            },
            System$IEquatable$1$MiniGameAdaptor$UI$Navigation$equalsT: function (other) {
                throw new System.Exception("Exception");
            },
            $clone: function (to) { return this; }
        }
    });
});

 
