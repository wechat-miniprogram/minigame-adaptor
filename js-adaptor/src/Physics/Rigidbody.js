import { engineRigidBodyToAdaptorRigidBodyMap } from './Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.ForceMode", {
        $kind: "enum",
        statics: {
            fields: {
                Force: 0,
                Acceleration: 5,
                Impulse: 1,
                VelocityChange: 2
            }
        }
    });
});

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.RigidbodyConstraints", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                FreezePositionX: 2,
                FreezePositionY: 4,
                FreezePositionZ: 8,
                FreezeRotationX: 16,
                FreezeRotationY: 32,
                FreezeRotationZ: 64,
                FreezePosition: 14,
                FreezeRotation: 112,
                FreezeAll: 126
            }
        }
    });
});

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Rigidbody", {
        inherits: [MiniGameAdaptor.Component],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    const res = MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);

                    engineRigidBodyToAdaptorRigidBodyMap.set(res.ref, comp);

                    return res;
                },
            }
        },
        props: {
            angularDrag: {
                get: function () {
                    return this.ref.angularDamping;
                },
                set: function (value) {
                    this.ref.angularDamping = value;
                }
            },
            angularVelocity: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this.ref.angularVelocity)._FlipX();
                },
                set: function (value) {
                    this.ref.angularVelocity = value._FlipX().ref;
                }
            },
            centerOfMass: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this.ref.centerOfMass)._FlipX();
                },
                set: function (value) {
                    this.ref.centerOfMass = value._FlipX().ref;
                }
            },
            collisionDetectionMode: {
                get: function () {
                    return this.ref.collisionDetectionMode;
                },
                set: function (value) {
                    this.ref.collisionDetectionMode = value;
                }
            },
            constraints: {
                get: function () {
                    return this.ref.constraints;
                },
                set: function (value) {
                    this.ref.constraints = value;
                }
            },
            detectCollisions: {
                get: function () {
                    return this.ref.detectCollisions;
                },
                set: function (value) {
                    this.ref.detectCollisions = value;
                }
            },
            drag: {
                get: function () {
                    return this.ref.linearDamping;
                },
                set: function (value) {
                    this.ref.linearDamping = value;
                }
            },
            freezeRotation: {
                get: function () {
                    return this.ref.freezeRotation;
                },
                set: function (value) {
                    this.ref.freezeRotation = value;
                }
            },
            inertiaTensor: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this.ref.inertiaTensor)._FlipX();
                },
                set: function (value) {
                    this.ref.inertiaTensor = value._FlipX().ref;
                }
            },
            inertiaTensorRotation: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            interpolation: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isKinematic: {
                get: function () {
                    return this.ref.isKinematic;
                },
                set: function (value) {
                    this.ref.isKinematic = value;
                }
            },
            mass: {
                get: function () {
                    return this.ref.mass;
                },
                set: function (value) {
                    this.ref.mass = value;
                }
            },
            maxAngularVelocity: {
                get: function () {
                    return this.ref.maxAngularVelocity;
                },
                set: function (value) {
                    this.ref.maxAngularVelocity = value;
                }
            },
            maxDepenetrationVelocity: {
                get: function () {
                    return this.ref.maxDepenetrationVelocity;
                },
                set: function (value) {
                    this.ref.maxDepenetrationVelocity = value;
                }
            },
            position: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this.ref.position)._FlipX();
                },
                set: function (value) {
                    this.ref.position = value._FlipX().ref;
                }
            },
            rotation: {
                get: function () {
                    return new MiniGameAdaptor.Quaternion.$ctor3(this.ref.rotation)._FlipXnW();
                },
                set: function (value) {
                    this.ref.rotation = value._FlipXnW().ref;
                }
            },
            sleepThreshold: {
                get: function () {
                    return this.ref.sleepThreshold;
                },
                set: function (value) {
                    this.ref.sleepThreshold = value;
                }
            },
            solverIterations: {
                get: function () {
                    return this.ref.sleepThreshold;
                },
                set: function (value) {
                    this.ref.sleepThreshold = value;
                }
            },
            solverVelocityIterations: {
                get: function () {
                    return this.ref.solverVelocityIterations;
                },
                set: function (value) {
                    this.ref.solverVelocityIterations = value;
                }
            },
            useGravity: {
                get: function () {
                    return this.ref.useGravity;
                },
                set: function (value) {
                    this.ref.useGravity = value;
                }
            },
            velocity: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this.ref.velocity)._FlipX();
                },
                set: function (value) {
                    this.ref.velocity = value._FlipX().ref;
                }
            },
            worldCenterOfMass: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this.ref.getWorldCenterOfMass())._FlipX();
                }
            }
        },
        ctors: {
            ctor: function (entity) {
                this.$initialize();
                MiniGameAdaptor.Component.ctor.call(this);
            }
        },
        methods: {
            AddExplosionForce: function (explosionForce, explosionPosition, explosionRadius) {
                this.ref.AddExplosionForce(explosionForce, explosionPosition._FlipX().ref, explosionRadius, 0, 0);
            },

            AddExplosionForce$1: function (explosionForce, explosionPosition, explosionRadius, upwardsModifier) {
                this.ref.AddExplosionForce(explosionForce, explosionPosition._FlipX().ref, explosionRadius, upwardsModifier, 0);
            },
            AddExplosionForce$2: function (explosionForce, explosionPosition, explosionRadius, upwardsModifier, mode) {
                this.ref.AddExplosionForce(explosionForce, explosionPosition._FlipX().ref, explosionRadius, upwardsModifier, mode);
            },
            AddForce: function (x, y, z) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);
                this.ref.AddForce(vec, MiniGameAdaptor.ForceMode.Force)
            },
            AddForce$1: function (x, y, z, mode) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);
                this.ref.AddForce(vec, mode)
            },
            AddForce$2: function (force) {
                this.ref.AddForce(force._FlipX().ref, MiniGameAdaptor.ForceMode.Force)
            },
            AddForce$3: function (force, mode) {
                this.ref.AddForce(force._FlipX().ref, mode)
            },
            AddForceAtPosition: function (force, position) {
                this.ref.AddForceAtPosition(force._FlipX().ref, position._FlipX().ref,  MiniGameAdaptor.ForceMode.force);
            },
            AddForceAtPosition$1: function (force, position, mode) {
                this.ref.AddForceAtPosition(force._FlipX().ref, position._FlipX().ref,  mode);
            },
            AddRelativeForce: function (x, y, z) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);
                this.ref.AddRelativeForce(vec, MiniGameAdaptor.ForceMode.Force)
            },
            AddRelativeForce$1: function (x, y, z, mode) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);
                this.ref.AddRelativeForce(vec, mode)
            },
            AddRelativeForce$2: function (force) {
                this.ref.AddRelativeForce(force._FlipX().ref, MiniGameAdaptor.ForceMode.Force);
            },
            AddRelativeForce$3: function (force, mode) {
                this.ref.AddRelativeForce(force._FlipX().ref, mode);
            },
            AddRelativeTorque: function (x, y, z) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);
                this.ref.AddRelativeTorque(vec, MiniGameAdaptor.ForceMode.Force)
            },
            AddRelativeTorque$1: function (x, y, z, mode) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);
                this.ref.AddRelativeTorque(vec, mode)
            },
            AddRelativeTorque$2: function (torque) {
                this.ref.AddRelativeTorque(torque._FlipX().ref, MiniGameAdaptor.ForceMode.Force)
            },
            AddRelativeTorque$3: function (torque, mode) {
                this.ref.AddRelativeTorque(torque._FlipX().ref, mode)
            },
            AddTorque: function (x, y, z) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);
                this.ref.AddTorque(vec, MiniGameAdaptor.ForceMode.Force)
            },
            AddTorque$1: function (x, y, z, mode) {
                const vec = engine.Vector3.createFromNumber(-x, y, z);

                this.ref.AddTorque(vec, mode)
            },
            AddTorque$2: function (torque) {
                this.ref.AddTorque(torque._FlipX().ref, MiniGameAdaptor.ForceMode.Force)
            },
            AddTorque$3: function (torque, mode) {
                this.ref.AddTorque(torque._FlipX().ref, mode)
            },
            ClosestPointOnBounds: function (position) {
                const resRawVec3f = this.ref.ClosestPointOnBounds(position._FlipX().ref);

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f)._FlipX();
            },
            GetPointVelocity: function (worldPoint) {
                const resRawVec3f = this.ref.GetPointVelocity(worldPoint._FlipX().ref);

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f)._FlipX();
            },

            GetRelativePointVelocity: function (relativePoint) {
                const resRawVec3f = this.ref.GetRelativePointVelocity(relativePoint._FlipX().ref);

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f)._FlipX();
            },
            IsSleeping: function () {
                return this.ref.IsSleeping();
            },
            MovePosition: function (position) {
                this.ref.movePosition(position._FlipX().ref);
            },
            MoveRotation: function (rot) {
                this.ref.moveRotation(rot._FlipXnW().ref)
            },
            ResetCenterOfMass: function () {
                this.ref.ResetCenterOfMass();
            },
            ResetInertiaTensor: function () {
                this.ref.ResetInertiaTensor();
            },
            SetDensity: function (density) {
                this.ref.SetDensity(density);
            },
            Sleep: function () {
                this.ref.Sleep();
            },
            SweepTest: function (direction, hitInfo) {
                throw new System.Exception("not impl");
            },
            SweepTest$1: function (direction, hitInfo, maxDistance) {
                throw new System.Exception("not impl");
            },
            SweepTest$2: function (direction, hitInfo, maxDistance, queryTriggerInteraction) {
                throw new System.Exception("not impl");
            },
            SweepTestAll: function (direction) {
                throw new System.Exception("not impl");
            },
            SweepTestAll$1: function (direction, maxDistance) {
                throw new System.Exception("not impl");
            },
            SweepTestAll$2: function (direction, maxDistance, queryTriggerInteraction) {
                throw new System.Exception("not impl");
            },
            WakeUp: function () {
                this.ref.WakeUp();
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Rigidbody')(MiniGameAdaptor.Rigidbody);
Object.defineProperty(MiniGameAdaptor.Rigidbody.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Rigidbody.prototype.__properties }
})

