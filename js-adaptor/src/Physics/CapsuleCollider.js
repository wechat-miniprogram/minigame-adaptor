import {physx, Phys3D, bindEventForCollider} from './Physx';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.CapsuleCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function(data, comp) {
                    if (typeof(data) === "number") {
                        return comp;
                    }

                    console.log(data)

                    const instance = physx.Phys3dInstance;
                    const entity = comp.entity;

                    const scale = comp.transform.localScale;
                    const center = new Phys3D.RawVec3f(data.center[0], data.center[1], data.center[2]);

                    comp.nativeCollider = new Phys3D.CapsuleCollider(physx.Phys3dInstance, center, data.height, data.radius);
                    comp.nativeCollider.direction = data.direction;

                    // 设置material信息
                    const materialData = data.material || {};
                    comp.nativeCollider.material = new Phys3D.Material(
                        physx.Phys3dInstance,
                        materialData.dynamicFriction,
                        materialData.staticFriction,
                        materialData.bounciness,
                        materialData.frictionCombine,
                        materialData.bounceCombine,
                    );

                    const hasRigidBody = comp.getComponent(MiniGameAdaptor.Rigidbody);

                    comp.nativeCollider.scale = new Phys3D.RawVec3f(scale.x, scale.y, scale.z);

                    // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞
                    if (!hasRigidBody) {
                        physx.addStaticBodyForCollider(comp)
                    }

                    // 为collider绑定事件
                    bindEventForCollider(comp.nativeCollider, comp.gameObject)

                    return comp;
                }
            }
        },
        fields: {
            _isTrigger: false,
            _center: null,
            _radius: 0,
            _height: 0,
            _direction: 1
        },
        props: {
            isTrigger: {
                get: function () {
                    return this.nativeCollider.isTrigger;
                },
                set: function (value) {
                    this.nativeCollider.isTrigger = value;
                }
            },
            center: {
                get: function () {
                    const RawVec3f = this.nativeCollider.center;
                    return new MiniGameAdaptor.Vector3.$ctor3(RawVec3f)._FlipX();
                },
                set: function (value) {
                    this.nativeCollider.center = new Phys3D.RawVec3f(-value.x, value.y, value.z);
                }
            },
            radius: {
                get: function () {
                    return this.nativeCollider.radius;
                },
                set: function (value) {
                    this.nativeCollider.radius = value;
                }
            },
            height: {
                get: function () {
                    return this.nativeCollider.height;
                },
                set: function (value) {
                    this.nativeCollider.height = value;
                }
            },
            direction: {
                get: function () {
                    return this.nativeCollider.direction;
                },
                set: function (value) {
                    this.nativeCollider.direction = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Collider.ctor.call(this);

            }
        },
        methods: {
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.CapsuleCollider')(MiniGameAdaptor.CapsuleCollider);
Object.defineProperty(MiniGameAdaptor.CapsuleCollider.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.CapsuleCollider.prototype.__properties }
})
