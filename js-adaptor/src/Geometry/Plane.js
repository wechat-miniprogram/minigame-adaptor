Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.Plane", {
        $kind: "struct",
        statics: {
            methods: {
                Translate: function (plane, translation) {
                    throw new System.Exception("not impl");
                },
                getDefaultValue: function () { return new UnityEngine.Plane(); }
            }
        },
        props: {
            distance: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            flipped: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            normal: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            $ctor1: function (inNormal, d) {
                this.$initialize();
            },
            $ctor2: function (inNormal, inPoint) {
                this.$initialize();
            },
            $ctor3: function (a, b, c) {
                this.$initialize();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            ClosestPointOnPlane: function (point) {
                throw new System.Exception("not impl");
            },
            Flip: function () {
                throw new System.Exception("not impl");
            },
            GetDistanceToPoint: function (point) {
                throw new System.Exception("not impl");
            },
            GetSide: function (point) {
                throw new System.Exception("not impl");
            },
            Raycast: function (ray, enter) {
                throw new System.Exception("not impl");
            },
            SameSide: function (inPt0, inPt1) {
                throw new System.Exception("not impl");
            },
            Set3Points: function (a, b, c) {
                throw new System.Exception("not impl");
            },
            SetNormalAndPosition: function (inNormal, inPoint) {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            },
            ToString: function (format) {
                throw new System.Exception("not impl");
            },
            Translate: function (translation) {
                throw new System.Exception("not impl");
            },
            $clone: function (to) { return this; }
        }
    });
});
