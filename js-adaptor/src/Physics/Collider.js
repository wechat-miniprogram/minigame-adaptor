
Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Collider", {
        inherits: [MiniGameAdaptor.Component],
        props: {
            attachedRigidbody: {
                get: function () {
                    return this.nativeCollider.adaptorRigidBody;
                }
            },
            bounds: {
                get: function () {
                    return this.ref.bounds;
                }
            },
            contactOffset: {
                get: function () {
                    return this.ref.contactOffset;
                },
                set: function (value) {
                    this.ref.contactOffset = value;
                }
            },
            enabled: {
                get: function () {
                    return this.ref.active;
                },
                set: function (value) {
                    this.ref.active = value;
                }
            },
            isTrigger: {
                get: function () {
                    return this.ref.isTrigger;
                },
                set: function (value) {
                    this.ref.isTrigger = value;
                }
            },
            material: {
                get: function () {
                    const material = this.ref.material;

                    const res = new MiniGameAdaptor.PhysicMaterial()

                    res.bounceCombine = material.bounceCombine;
                    res.bounciness = material.bounciness;
                    res.dynamicFriction = material.dynamicFriction;
                    res.frictionCombine = material.frictionCombine;
                    res.staticFriction = material.staticFriction;

                    return res;
                },
                set: function (value) {
                    var material = new MiniGameAdaptor.PhysicMaterial();
                    Object.assign(material, value);

                    this.ref.material = material.ref;
                }
            },
            sharedMaterial: {
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
                MiniGameAdaptor.Component.ctor.call(this);
            }
        },
        methods: {
            ClosestPoint: function (position) {
                const resRawVec3f = this.ref.ClosestPoint(position._FlipX().ref)

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f.x, resRawVec3f.y, resRawVec3f.z)._FlipX();
            },
            ClosestPointOnBounds: function (position) {
                const resRawVec3f = this.ref.ClosestPointOnBounds(position._FlipX().ref)

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f.x, resRawVec3f.y, resRawVec3f.z)._FlipX();
            },
            Raycast: function (ray, hitInfo, maxDistance) {
                throw new System.Exception("not impl");
            }
        }
    });
});

