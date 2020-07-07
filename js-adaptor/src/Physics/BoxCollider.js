import {physx, Phys3D, bindEventForCollider} from './Physx';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.BoxCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function (data, comp) {
                    /*console.log('BoxCollider Deserialize', data)*/
                    if (typeof (data) === "number") {
                        return comp;
                    }

                    const instance = physx.Phys3dInstance;

                    let hasRigidBody = false;
                    let components = comp.gameObject.ref.components;
                    let adaptorRigidBody = null;
                    for (let i = 0; i < components.length; i++) {
                        let component = components[i];
                        let type = component.__typeName;
                        if (type == "MiniGameAdaptor.Rigidbody") {
                            hasRigidBody = true;
                            /*adaptorRigidBody = component;
                            comp.rigidBody = component.nativeRigidBody;*/
                        }
                    }

                    const entity = comp.entity;
                    const pos = entity.transform.position;

                    const collider = comp.nativeCollider;

                    const scale = comp.transform.localScale;
                    collider.center = new Phys3D.RawVec3f(data.center[0], data.center[1], data.center[2]);

                    // collider的scale要和GameObject本身的scale保持一致
                    collider.size = new Phys3D.RawVec3f(data.size[0] * scale.x, data.size[1] * scale.y, data.size[2] * scale.z);

                    // 设置material信息
                    const materialData = data.material || {};
                    collider.material = new Phys3D.Material(
                        physx.Phys3dInstance,
                        materialData.dynamicFriction,
                        materialData.staticFriction,
                        materialData.bounciness,
                        materialData.frictionCombine,
                        materialData.bounceCombine,
                    )

                    // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞
                    if (!hasRigidBody) {
                        comp.rigidBody = new Phys3D.StaticRigidbody(instance);
                        /*console.log('static nativeRigidBody', comp.rigidBody)*/
                        comp.rigidBody.position = new Phys3D.RawVec3f(pos.x, pos.y, pos.z);
                        comp.rigidBody.__sourceComp = comp;

                        comp.nativeCollider.attachedRigidbody = comp.rigidBody;
                        physx.addBody(comp.rigidBody)

                        const quaternion = comp.entity.transform.quaternion;
                        const RawQuaternion = new Phys3D.RawQuaternion()

                        RawQuaternion.x = quaternion.x;
                        RawQuaternion.y = quaternion.y;
                        RawQuaternion.z = quaternion.z;
                        RawQuaternion.w = quaternion.w;

                        comp.rigidBody.rotation = RawQuaternion;
                    }
                    /*else {
                        try {
                            comp.nativeCollider.attachedRigidbody = comp.rigidBody;
                            comp.nativeCollider.adaptorRigidBody = adaptorRigidBody;
                        } catch(e) {
                            console.log(e)
                        }
                    }*/

                    // 为collider绑定事件
                    bindEventForCollider(comp.nativeCollider, comp.gameObject)

                    const render = comp.entity.getComponent(engine.MeshRenderer);

                    if (render) {
                        // 拿到微信引擎的mesh数据
                        const buffer = render.mesh._vertexBuffers;
                        let mesh = new Phys3D.PhysMesh();
                    }

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

                const physCenter = new Phys3D.RawVec3f(0, 0, 0);
                const physSize = new Phys3D.RawVec3f(1, 1, 1);
                this.nativeCollider = new Phys3D.BoxCollider(physx.Phys3dInstance, physCenter, physSize);
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
