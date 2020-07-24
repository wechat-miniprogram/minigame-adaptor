import {physx, Phys3D, bindEventForCollider, } from './Physx';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.SphereCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function(data, comp) {
                    if (typeof(data) === "number") {
                        return comp;
                    }

                    const instance = physx.Phys3dInstance;
                    const entity = comp.entity;

                    const scale = comp.transform.localScale;
                    const center = new Phys3D.RawVec3f(data.center[0], data.center[1], data.center[2]);

                    comp.nativeCollider = new Phys3D.SphereCollider(physx.Phys3dInstance, center, data.radius);
                    comp.nativeCollider.isTrigger = data.isTrigger;

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

                    comp.nativeCollider.scale = new Phys3D.RawVec3f(scale.x, scale.y, scale.z);

                    const hasRigidBody = comp.getComponent(MiniGameAdaptor.Rigidbody);

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
            _radius : 0
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
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Collider.ctor.call(this);
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.SphereCollider')(MiniGameAdaptor.SphereCollider);
Object.defineProperty(MiniGameAdaptor.SphereCollider.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.SphereCollider.prototype.__properties }
})
