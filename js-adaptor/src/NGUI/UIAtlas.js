Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIAtlas", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            methods: {
                CheckIfRelated: function (a, b) {
                    throw new System.Exception("not impl");
                }
            }
        },
        props: {
            pixelSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            premultipliedAlpha: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            replacement: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spriteList: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spriteMaterial: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            texture: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            GetListOfSprites: function () {
                throw new System.Exception("not impl");
            },
            GetListOfSprites$1: function (match) {
                throw new System.Exception("not impl");
            },
            GetRandomSprite: function (startsWith) {
                throw new System.Exception("not impl");
            },
            GetSprite: function (name) {
                throw new System.Exception("not impl");
            },
            MarkAsChanged: function () {
                throw new System.Exception("not impl");
            },
            MarkSpriteListAsChanged: function () {
                throw new System.Exception("not impl");
            },
            SortAlphabetically: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
