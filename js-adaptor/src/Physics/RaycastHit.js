Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RaycastHit", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.RaycastHit();}
            }
        },
        props: {
            barycentricCoordinate: {
                get: function () {
                    const tmp = this.ref.barycentricCoordinate;

                    return new MiniGameAdaptor.Vector3.$ctor3(tmp.x, tmp.y, tmp.z)._FlipX();
                },
                set: function (value) {
                    this.ref.barycentricCoordinate = value._FlipX().ref;
                }
            },
            collider: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }, distance: {
                get: function () {
                    return this.ref.distance;
                },
                set: function (value) {
                    this.ref.distance = value;
                }
            },
            lightmapCoord: {
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
            },
            point: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rigidbody: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            textureCoord: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            textureCoord2: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            transform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            triangleIndex: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();

                this.ref = new engine.RaycastHit();
            }
        },
        methods: {
            $clone: function (to) { return this; }
        }
    });
});


