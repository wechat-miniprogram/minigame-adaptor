Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIRect.AnchorPoint", {
        $kind: "nested class",
        fields: {
            target: null,
            relative: 0,
            absolute: 0,
            rect: null,
            targetCam: null
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            },
            $ctor1: function (relative) {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            GetSides: function (relativeTo) {
                throw new System.Exception("not impl");
            },
            Set: function (relative, absolute) {
                throw new System.Exception("not impl");
            },
            Set$1: function (target, relative, absolute) {
                throw new System.Exception("not impl");
            },
            SetHorizontal: function (parent, localPos) {
                throw new System.Exception("not impl");
            },
            SetToNearest: function (abs0, abs1, abs2) {
                throw new System.Exception("not impl");
            },
            SetToNearest$1: function (rel0, rel1, rel2, abs0, abs1, abs2) {
                throw new System.Exception("not impl");
            },
            SetVertical: function (parent, localPos) {
                throw new System.Exception("not impl");
            }
        }
    });
});
