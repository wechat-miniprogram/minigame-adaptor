Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.ContactPoint", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.ContactPoint(); }
            }
        },
        props: {
            normal: {
                get: function () {
                    return this._normal;
                }
            },
            otherCollider: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            point: {
                get: function () {
                    return this._point;
                }
            },
            separation: {
                get: function () {
                    return this.nativeData.separation;
                }
            },
            thisCollider: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (nativeData) {
                this.$initialize();

                this.nativeData = nativeData || {};

                this._point = new MiniGameAdaptor.Vector3.$ctor3(this.nativeData.point)._FlipX();
                this._normal = new MiniGameAdaptor.Vector3.$ctor3(this.nativeData.normal)._FlipX();
            }
        },
        methods: {
            $clone: function (to) { return this; }
        }
    });
});
