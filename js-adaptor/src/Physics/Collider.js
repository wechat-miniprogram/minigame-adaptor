import {physx, Phys3D, bindEventForCollider} from './Physx';

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
                    return this.nativeCollider.bounds;
                }
            },
            contactOffset: {
                get: function () {
                    return this.nativeCollider.contactOffset;
                },
                set: function (value) {
                    this.nativeCollider.contactOffset = value;
                }
            },
            enabled: {
                get: function () {
                    return this.nativeCollider.enabled;
                },
                set: function (value) {
                    this.nativeCollider.enabled = value;
                }
            },
            isTrigger: {
                get: function () {
                    return this.nativeCollider.isTrigger;
                },
                set: function (value) {
                    this.nativeRigidBody.isTrigger = value;
                }
            },
            material: {
                get: function () {
                    const material = this.nativeCollider.material;
                    const res = new MiniGameAdaptor.PhysicMaterial()
                    res.bounceCombine = material.bounceCombine;
                    res.bounciness = material.bounciness;
                    res.dynamicFriction = material.dynamicFriction;
                    res.frictionCombine = material.frictionCombine;
                    res.staticFriction = material.staticFriction;

                    return res;
                },
                set: function (value) {
                    const instance = physx.Phys3dInstance;
                    this.nativeCollider.material = new Phys3D.Material(
                                                                    instance,
                                                                    value.dynamicFriction,
                                                                    value.staticFriction,
                                                                    value.bounciness,
                                                                    value.frictionCombine,
                                                                    value.bounceCombine
                                                   );
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
                const RawVec3f = new Phys3D.RawVec3f(position.x, position.y, position.z);
                const resRawVec3f = this.nativeCollider.ClosestPoint(RawVec3f)

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f.x, resRawVec3f.y, resRawVec3f.z);
            },
            ClosestPointOnBounds: function (position) {
                const RawVec3f = new Phys3D.RawVec3f(position.x, position.y, position.z);
                const resRawVec3f = this.nativeCollider.ClosestPointOnBounds(RawVec3f)

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f.x, resRawVec3f.y, resRawVec3f.z);
            },
            Raycast: function (ray, hitInfo, maxDistance) {
                throw new System.Exception("not impl");
            }
        }
    });
});
