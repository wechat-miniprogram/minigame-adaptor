import {Phys3D, physx, } from './Physx';

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
                    if (!data) {
                        return comp;
                    }

                    comp.__deserializeData = data;
                    console.log('Rigidbody Deserialize ctor called', data, comp, comp.__deserializeData)

                    return comp;
                },
            }
        },
        props: {
            angularDrag: {
                get: function () {
                    return this.nativeRigidBody.angularDamping;
                },
                set: function (value) {
                    this.nativeRigidBody.angularDamping = value;
                }
            },
            angularVelocity: {
                get: function () {
                    const RawVec3f = this.nativeRigidBody.angularVelocity;
                    return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f);
                },
                set: function (value) {
                    this.nativeRigidBody.angularVelocity = new Phys3D.RawVec3f(value.x, value.y, value.z);
                }
            },
            centerOfMass: {
                get: function () {
                    const RawVec3f = this.nativeRigidBody.centerOfMass;
                    return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f);
                },
                set: function (value) {
                    this.nativeRigidBody.centerOfMass = new Phys3D.RawVec3f(value.x, value.y, value.z);
                }
            },
            collisionDetectionMode: {
                get: function () {
                    return this.nativeRigidBody.collisionDetectionMode;
                },
                set: function (value) {
                    this.nativeRigidBody.collisionDetectionMode = value;
                }
            },
            constraints: {
                get: function () {
                    return this.nativeRigidBody.constraints;
                },
                set: function (value) {
                    this.nativeRigidBody.constraints = value;
                }
            },
            detectCollisions: {
                get: function () {
                    return this.nativeRigidBody.detectCollisions;
                },
                set: function (value) {
                    this.nativeRigidBody.detectCollisions = value;
                }
            },
            drag: {
                get: function () {
                    return this.nativeRigidBody.linearDamping;
                },
                set: function (value) {
                    this.nativeRigidBody.linearDamping = value;
                }
            },
            freezeRotation: {
                get: function () {
                    return this.nativeRigidBody.freezeRotation;
                },
                set: function (value) {
                    this.nativeRigidBody.freezeRotation = true;
                }
            },
            inertiaTensor: {
                get: function () {
                    const RawVec3f = this.nativeRigidBody.inertiaTensor;
                    return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f)._FlipX();
                },
                set: function (value) {
                    this.nativeRigidBody.inertiaTensor = new Phys3D.RawVec3f(-value.x, value.y, value.z);
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
                    return this.nativeRigidBody.isKinematic;
                },
                set: function (value) {
                    this.nativeRigidBody.isKinematic = value;
                }
            },
            mass: {
                get: function () {
                    return this.nativeRigidBody.mass;
                },
                set: function (value) {
                    this.nativeRigidBody.mass = value;
                }
            },
            maxAngularVelocity: {
                get: function () {
                    return this.nativeRigidBody.maxAngularVelocity;
                },
                set: function (value) {
                    this.nativeRigidBody.maxAngularVelocity = value;
                }
            },
            maxDepenetrationVelocity: {
                get: function () {
                    return this.nativeRigidBody.maxDepenetrationVelocity;
                },
                set: function (value) {
                    this.nativeRigidBody.maxDepenetrationVelocity = value;
                }
            },
            position: {
                get: function () {
                    const RawVec3f = this.nativeRigidBody.position;
                    return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f)._FlipX();
                },
                set: function (value) {
                    this.nativeRigidBody.position = new Phys3D.RawVec3f(-value.x, value.y, value.z);
                }
            },
            rotation: {
                get: function () {
                    const rotation = this.nativeRigidBody.rotation;

                    return new MiniGameAdaptor.Quaternion.$ctor3(rotation)._FlipXnW();
                },
                // TODO: 坐标系换算
                set: function (value) {
                    this.nativeRigidBody.rotation = value;
                }
            },
            sleepThreshold: {
                get: function () {
                    return this.nativeRigidBody.sleepThreshold;
                },
                set: function (value) {
                    this.nativeRigidBody.sleepThreshold = value;
                }
            },
            solverIterations: {
                get: function () {
                    return this.nativeRigidBody.sleepThreshold;
                },
                set: function (value) {
                    this.nativeRigidBody.sleepThreshold = value;
                }
            },
            solverVelocityIterations: {
                get: function () {
                    return this.nativeRigidBody.solverVelocityIterations;
                },
                set: function (value) {
                    this.nativeRigidBody.solverVelocityIterations = value;
                }
            },
            useGravity: {
                get: function () {
                    return this.nativeRigidBody.useGravity;
                },
                set: function (value) {
                    this.nativeRigidBody.useGravity = value;
                }
            },
            velocity: {
                get: function () {
                    const RawVec3f = this.nativeRigidBody.velocity;
                    return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f)._FlipX();
                },
                set: function (value) {
                    this.nativeRigidBody.velocity = new Phys3D.RawVec3f(-value.x, value.y, value.z);
                }
            },
            worldCenterOfMass: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (entity) {
                this.$initialize();
                MiniGameAdaptor.Component.ctor.call(this);
                /**
                 * 在native中的Phys3D创建对应的刚体
                 * 因为不确定后续是否会执行反序列函数，所以将nativeRigidBody放到构造函数里面，防止手动addComponent(RigidBody)之后里面设置属性会undefined的情况
                 */
                const body = new Phys3D.DynamicRigidbody(physx.Phys3dInstance);

                this.nativeRigidBody = body;
                this.gameObject.nativeRigidBody = body;
                this.nativeRigidBody.__sourceComp = this;
            }
        },
        methods: {
            onStart: function () {
                if(!this.__physInitReady) {
                    this.onInstantiated();
                }
            },

            onInstantiated: function() {
                if (!Phys3D) {
                    return;
                }

                const body = this.nativeRigidBody;
                this.gameObject.nativeRigidBody = body;

                // 设置native层物理刚体的实际位置
                const pos = this.entity.transform.worldPosition;
                this.nativeRigidBody.position = new Phys3D.RawVec3f(pos.x, pos.y, pos.z);

                // 直接调用AddComponent的情况没有反序列化数据
                const data = this.__deserializeData;
                if (data) {
                    body.angularDamping = data.angularDrag;
                    body.collisionDetectionMode = data.collisionDetectionMode;
                    body.constraints = data.constraints;
                    body.linearDamping = data.drag;
                    body.isKinematic = data.isKinematic;
                    body.mass = data.mass;
                    body.useGravity = data.useGravity;
                }

                // 将entity的旋转同步到物理
                physx.syncRotation(this.entity, body);

                [MiniGameAdaptor.BoxCollider, MiniGameAdaptor.MeshCollider, MiniGameAdaptor.CapsuleCollider, MiniGameAdaptor.SphereCollider].forEach( colliderClass => {
                    const collider = this.getComponent(colliderClass);

                    if (collider && collider.nativeCollider) {
                        collider.nativeCollider.adaptorRigidBody = this;
                        collider.nativeCollider.attachedRigidbody = body;
                    }
                })

                body.userData = this.entity;

                physx.addBody(this.nativeRigidBody);

                this.__physInitReady = true;
            },

            AddExplosionForce: function (explosionForce, explosionPosition, explosionRadius) {
                const RawVec3f =  new Phys3D.RawVec3f(-explosionPosition.x, explosionPosition.y, explosionPosition.z);
                this.nativeRigidBody.AddExplosionForce(explosionForce, RawVec3f, explosionRadius)
            },

            AddExplosionForce$1: function (explosionForce, explosionPosition, explosionRadius, upwardsModifier) {
                const RawVec3f =  new Phys3D.RawVec3f(-explosionPosition.x, explosionPosition.y, explosionPosition.z);
                this.nativeRigidBody.AddExplosionForce(explosionForce, RawVec3f, explosionRadius, upwardsModifier);
            },
            AddExplosionForce$2: function (explosionForce, explosionPosition, explosionRadius, upwardsModifier, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-explosionPosition.x, explosionPosition.y, explosionPosition.z);

                this.nativeRigidBody.AddExplosionForce(explosionForce, RawVec3f, explosionRadius, upwardsModifier, mode);
            },
            AddForce: function (x, y, z) {
                const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                this.nativeRigidBody.AddForce(RawVec3f, MiniGameAdaptor.ForceMode.Force)
            },
            AddForce$1: function (x, y, z, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-value.x, value.y, value.z);
                this.nativeRigidBody.AddForce(RawVec3f, mode)
            },
            AddForce$2: function (force) {
                const RawVec3f =  new Phys3D.RawVec3f(-force.x, force.y, force.z);
                this.nativeRigidBody.AddForce(RawVec3f, MiniGameAdaptor.ForceMode.Force)
            },
            AddForce$3: function (force, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-force.x, force.y, force.z);
                this.nativeRigidBody.AddForce(RawVec3f, mode)
            },
            AddForceAtPosition: function (force, position) {
                const RawVec3f =  new Phys3D.RawVec3f(-force.x, force.y, force.z);
                const posRawVec3f =  new Phys3D.RawVec3f(position.x, position.y, position.z);
                this.nativeRigidBody.AddForceAtPosition(RawVec3f, posRawVec3f,  MiniGameAdaptor.ForceMode.force);
            },
            AddForceAtPosition$1: function (force, position, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-force.x, force.y, force.z);
                const posRawVec3f =  new Phys3D.RawVec3f(-position.x, position.y, position.z);
                this.nativeRigidBody.AddForceAtPosition(RawVec3f, posRawVec3f,  mode);
            },
            AddRelativeForce: function (x, y, z) {
                const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                this.nativeRigidBody.AddRelativeForce(RawVec3f, MiniGameAdaptor.ForceMode.Force)
            },
            AddRelativeForce$1: function (x, y, z, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                this.nativeRigidBody.AddRelativeForce(RawVec3f, mode)
            },
            AddRelativeForce$2: function (force) {
                const RawVec3f =  new Phys3D.RawVec3f(-force.x, force.y, force.z);
                this.nativeRigidBody.AddRelativeForce(RawVec3f, MiniGameAdaptor.ForceMode.Force);
            },
            AddRelativeForce$3: function (force, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-force.x, force.y, force.z);
                this.nativeRigidBody.AddRelativeForce(RawVec3f, mode);
            },
            AddRelativeTorque: function (x, y, z) {
                const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                this.nativeRigidBody.AddRelativeTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force)
            },
            AddRelativeTorque$1: function (x, y, z, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                this.nativeRigidBody.AddRelativeTorque(RawVec3f, mode)
            },
            AddRelativeTorque$2: function (torque) {
                const RawVec3f =  new Phys3D.RawVec3f(-torque.x, torque.y, torque.z);
                this.nativeRigidBody.AddRelativeTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force)
            },
            AddRelativeTorque$3: function (torque, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-torque.x, torque.y, torque.z);
                this.nativeRigidBody.AddRelativeTorque(RawVec3f, mode)
            },
            AddTorque: function (x, y, z) {
                const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                this.nativeRigidBody.AddTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force)
            },
            AddTorque$1: function (x, y, z, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-x, y, z);
                this.nativeRigidBody.AddTorque(RawVec3f, mode)
            },
            AddTorque$2: function (torque) {
                const RawVec3f =  new Phys3D.RawVec3f(-torque.x, torque.y, torque.z);
                this.nativeRigidBody.AddTorque(RawVec3f, MiniGameAdaptor.ForceMode.Force)
            },
            AddTorque$3: function (torque, mode) {
                const RawVec3f =  new Phys3D.RawVec3f(-torque.x, torque.y, torque.z);
                this.nativeRigidBody.AddTorque(RawVec3f, mode)
            },
            ClosestPointOnBounds: function (position) {
                const RawVec3f =  new Phys3D.RawVec3f(-position.x, position.y, position.z);
                const resRawVec3f = this.nativeRigidBody.ClosestPointOnBounds(RawVec3f);

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f);
            },
            GetPointVelocity: function (worldPoint) {
                const RawVec3f =  new Phys3D.RawVec3f(-worldPoint.x, worldPoint.y, worldPoint.z);
                const resRawVec3f = this.nativeRigidBody.GetPointVelocity(RawVec3f);

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f);
            },

            GetRelativePointVelocity: function (relativePoint) {
                const RawVec3f =  new Phys3D.RawVec3f(-relativePoint.x, relativePoint.y, relativePoint.z);
                const resRawVec3f = this.nativeRigidBody.GetRelativePointVelocity(RawVec3f);

                return new MiniGameAdaptor.Vector3.$ctor3(resRawVec3f)._FlipX();
            },
            IsSleeping: function () {
                return this.nativeRigidBody.IsSleeping();
            },
            MovePosition: function (position) {
                const RawVec3f =  new Phys3D.RawVec3f(-position.x, position.y, position.z);
                this.nativeRigidBody.MovePosition(RawVec3f);
            },
            MoveRotation: function (rot) {
                throw new System.Exception("not impl");
            },
            ResetCenterOfMass: function () {
                this.nativeRigidBody.ResetCenterOfMass();
            },
            ResetInertiaTensor: function () {
                this.nativeRigidBody.ResetInertiaTensor();
            },
            SetDensity: function (density) {
                this.nativeRigidBody.SetDensity(density);
            },
            Sleep: function () {
                this.nativeRigidBody.Sleep();
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
                this.nativeRigidBody.WakeUp();
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

