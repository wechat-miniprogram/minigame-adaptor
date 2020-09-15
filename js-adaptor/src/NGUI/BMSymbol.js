Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.BMSymbol", {
        fields: {
            sequence: null,
            spriteName: null
        },
        props: {
            advance: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            height: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            length: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            offsetX: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            offsetY: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            uvRect: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            width: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            MarkAsChanged: function () {
                throw new System.Exception("not impl");
            },
            Validate: function (atlas) {
                throw new System.Exception("not impl");
            }
        }
    });
});
