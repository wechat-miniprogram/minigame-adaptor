Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.SpriteState", {
        inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.UI.SpriteState)]; },
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.UI.SpriteState(); }
            }
        },
        props: {
            disabledSprite: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            highlightedSprite: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pressedSprite: {
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
            System$IEquatable$1$MiniGameAdaptor$UI$SpriteState$equalsT: function (other) {
                throw new System.Exception("Exception");
            },
            $clone: function (to) { return this; }
        }
    });
});

 
