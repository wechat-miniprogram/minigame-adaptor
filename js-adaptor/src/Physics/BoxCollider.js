import {physx, Phys3D, bindEventForCollider, nativeColliderToAdaptorColliderMap} from './Physx';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.BoxCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function (data, comp) {
                    if (typeof (data) === "number") {
                        return comp;
                    }

                    // 这里兼容不支持native物理引擎的情况
                    if (!Phys3D) {
                        return comp;
                    }

                    const instance = physx.Phys3dInstance;

                    const entity = comp.entity;
                    const pos = entity.transform.position;

                    const collider = comp.nativeCollider;

                    const scale = comp.transform.localScale;
                    collider.center = new Phys3D.RawVec3f(data.center[0], data.center[1], data.center[2]);

                    collider.isTrigger = data.isTrigger;

                    // collider的scale要和GameObject本身的scale保持一致
                    collider.size = new Phys3D.RawVec3f(data.size[0] * scale.x || 0.00001, data.size[1] * scale.y || 0.00001, data.size[2] * scale.z || 0.00001);
                    console.log(data.size[0] * scale.x, data.size[1] * scale.y, data.size[2] * scale.z);

                    // 设置material信息
                    // TODO: share
                    const materialData = data.material || {};
                    collider.material = new Phys3D.Material(
                        physx.Phys3dInstance,
                        materialData.dynamicFriction,
                        materialData.staticFriction,
                        materialData.bounciness,
                        materialData.frictionCombine,
                        materialData.bounceCombine,
                    )

                    const hasRigidBody = comp.getComponent(MiniGameAdaptor.Rigidbody);

                    // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞
                    if (!hasRigidBody && Phys3D) {
                        physx.addStaticBodyForCollider(comp)
                    }

                    // 为collider绑定事件
                    bindEventForCollider(comp.nativeCollider, comp.gameObject)

                    nativeColliderToAdaptorColliderMap.set(comp.nativeCollider, comp);

                    return comp;
                }
            }
        },
        fields: {
            _isTrigger: false,
            _center: null,
            _size: null
        },
        props: {
            isTrigger: {
                get: function () {
                    return this.nativeCollider.isTrigger;
                },
                set: function (value) {
                    this.nativeRigidBody.isTrigger = value;
                }
            },
            center: {
                get: function () {
                    const center = this.nativeCollider.center;

                    return new MiniGameAdaptor.Vector3.$ctor3(center.x, center.y, center.z);
                },
                set: function (value) {
                    this.nativeCollider.center = new Phys3D.RawVec3f(value.x, value.y, value.z);
                }
            },
            size: {
                get: function () {
                    const size = this.nativeCollider.size;

                    return new MiniGameAdaptor.Vector3.$ctor3(size.x, size.y, size.z);
                },
                set: function (value) {
                    this.nativeCollider.size = new Phys3D.RawVec3f(value.x, value.y, value.z);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Collider.ctor.call(this);

                if (Phys3D) {
                    const physCenter = new Phys3D.RawVec3f(0, 0, 0);
                    const physSize = new Phys3D.RawVec3f(1, 1, 1);

                    this.nativeCollider = new Phys3D.BoxCollider(physx.Phys3dInstance, physCenter, physSize);
                }
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.BoxCollider')(MiniGameAdaptor.BoxCollider);
Object.defineProperty(MiniGameAdaptor.BoxCollider.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.BoxCollider.prototype.__properties }
})
