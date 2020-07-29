import {physx, Phys3D, bindEventForCollider, nativeColliderToAdaptorColliderMap} from './Physx';

/**
 * 创建Mesh是有性能开销的，不同的MeshCollider可能共用一个PhyMesh，这里加个weakmap做池
 */
const meshMap = new WeakMap();

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.MeshCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function (data, comp) {
                    if (!Phys3D) {
                        return comp;
                    }

                    const meshId = data.mesh
                    let phyMesh = null;
                    // 从资源管理器取Mesh数据，如果取不到，从运行时取
                    let mesh = engine.loader.getAsset(meshId) || comp.entity.getComponent(engine.MeshRenderer).mesh;

                    // 对齐Unity的error提示
                    const rigidBody = comp.entity.getComponent(MiniGameAdaptor.Rigidbody);
                    if (  (rigidBody && rigidBody.nativeRigidBody && !rigidBody.nativeRigidBody.isKinematic)
                        || (rigidBody && rigidBody.__deserializeData && !rigidBody.__deserializeData.isKinematic) ) {
                        console.error(`Non-convex MeshCollider with non-kinematic Rigidbody is no longer supported since Unity 5.\nIf you want to use a non-convex mesh either make the Rigidbody kinematic or remove the Rigidbody component. `)
                    }

                    if (meshMap.get(mesh)) {
                        phyMesh = meshMap.get(mesh);
                    } else {
                        const buffer = mesh._vertexBuffers[0]._uploadedBuffer;
                        const _vertexLayout = mesh._vertexLayout;
                        const stride = _vertexLayout.stride;
                        const config = mesh._vertexLayout.getConfigByUsage(1);

                        const {offset, format } = config;
                        const len = buffer.length;

                        const verticesCount = len / stride;

                        // 一个顶点为float x y z组成，每个属性占4个字节，总共12个字节
                        const verBytes = 12;
                        const newBuffer = new Uint8Array(verticesCount * verBytes);

                        // 遍历自研引擎Mesh的buffer数据，将顶点信息取出，存到一个新的Uint8Array里面
                        let index = 0;
                        for ( let i = 0; i < len; i += stride) {
                            for (let j = i + offset; j < i + offset + verBytes; j++) {
                                newBuffer[index++] = buffer[j];
                            }
                        }

                        // 手动截取最后一段索引相关的buffer然后创建Uint32Array
                        const source = mesh._indiceBuffer._uploadedBuffer;
                        const bufferLen = source.buffer.byteLength;
                        const sliceBuffer = source.buffer.slice(bufferLen - source.length, bufferLen)

                        // 自研引擎是固定用uint16做index的，所以将手动裁剪出来的arraybuffer创建为Uint16Array即可
                        const uint16 = new Uint16Array(sliceBuffer)
                        const trianglesCount = uint16.length / 3;

                        phyMesh = new Phys3D.PhysMesh(physx.Phys3dInstance);

                        const float32 = new Float32Array(newBuffer.buffer);
                        phyMesh.SetVertices(float32, verticesCount);
                        // 客户端特殊处理，传第三个参数支持为支持uint16的情况
                        phyMesh.SetTriangles(uint16, trianglesCount, true);

                        meshMap.set(mesh, phyMesh)
                    }

                    comp.nativeCollider = new Phys3D.MeshCollider(physx.Phys3dInstance, data.convex, data.cookingOptions, phyMesh);

                    const scale = comp.transform.localScale;
                    comp.nativeCollider.scale = new Phys3D.RawVec3f(scale.x, scale.y, scale.z);

                    const hasRigidBody = !!comp.getComponent(MiniGameAdaptor.Rigidbody);

                    // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞
                    if (!hasRigidBody) {
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
            _convex: false,
            _cookingOptions: 1,
            _shareMesh: null
        },
        props: {
            convex: {
                get: function () {
                    return this.nativeCollider.convex;
                },
                set: function (value) {
                    this.nativeCollider.convex = value;
                }
            },
            cookingOptions: {
                get: function () {
                    return this.nativeCollider.cookingOptions;
                },
                set: function (value) {
                    this.nativeCollider.cookingOptions = value;
                }
            },
            sharedMesh: {
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

                MiniGameAdaptor.Collider.ctor.call(this);
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.MeshCollider')(MiniGameAdaptor.MeshCollider);
Object.defineProperty(MiniGameAdaptor.MeshCollider.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...MiniGameAdaptor.MeshCollider.prototype.__properties }
})
