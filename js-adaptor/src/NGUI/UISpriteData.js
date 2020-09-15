Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UISpriteData", {
        fields: {
            name: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            borderLeft: 0,
            borderRight: 0,
            borderTop: 0,
            borderBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0
        },
        props: {
            hasBorder: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasPadding: {
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
            CopyBorderFrom: function (sd) {
                throw new System.Exception("not impl");
            },
            CopyFrom: function (sd) {
                throw new System.Exception("not impl");
            },
            SetBorder: function (left, bottom, right, top) {
                throw new System.Exception("not impl");
            },
            SetPadding: function (left, bottom, right, top) {
                throw new System.Exception("not impl");
            },
            SetRect: function (x, y, width, height) {
                throw new System.Exception("not impl");
            }
        }
    });
});
