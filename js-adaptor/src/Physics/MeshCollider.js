import { EnumVertexLayoutUsage, getPointDataByUsage, getPointBuffer, createEngineMesh} from '../Mesh/MeshHelper.js';
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
                    comp.__deserializeData = data;


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
        },

        methods: {
            onStart: function () {
                if(!this.__physInitReady) {
                    this.onInstantiated();
                }
            },

            onInstantiated: function() {
                this.__physInitReady = true;
                if (!Phys3D) {
                    return comp;
                }

                const data = this.__deserializeData || {}
                const comp = this;

                const meshId = data.mesh
                let phyMesh = null;
                // 从资源管理器取Mesh数据，如果取不到，从运行时取
                let mesh = (meshId && engine.loader.getAsset(meshId)) || comp.entity.getComponent(engine.MeshRenderer).mesh;

                // 对齐Unity的error提示
                const rigidBody = comp.entity.getComponent(MiniGameAdaptor.Rigidbody);
                if (  rigidBody && rigidBody.nativeRigidBody && !rigidBody.nativeRigidBody.isKinematic && data && !data.convex) {
                    console.error(`Non-convex MeshCollider with non-kinematic Rigidbody is no longer supported since Unity 5.\nIf you want to use a non-convex mesh either make the Rigidbody kinematic or remove the Rigidbody component. `)
                }

                if (meshMap.get(mesh)) {
                    phyMesh = meshMap.get(mesh);
                } else {
                    phyMesh = new Phys3D.PhysMesh(physx.Phys3dInstance);

                    // 兼容一些buffer取不到的情况
                    const _buffer = mesh._getRawVertexBuffer() || mesh._rawVertexBuffers[0];
                    const _vertexLayout = mesh._vertexLayout;
                    const {newBuffer, verticesCount} = getPointBuffer(_buffer, _vertexLayout);

                    // 三角形数据
                    const triangles = mesh._getRawIndiceBuffer();

                    phyMesh.SetVertices(newBuffer, verticesCount);

                    // 客户端特殊处理，传第三个参数支持为支持uint16的情况
                    phyMesh.SetTriangles(triangles, triangles.length / 3, true);

                    meshMap.set(mesh, phyMesh)
                }

                comp.nativeCollider = new Phys3D.MeshCollider(physx.Phys3dInstance, data.convex === undefined ? true : data.convex, data.cookingOptions || 14, phyMesh);

                const scale = comp.transform.localScale;
                comp.nativeCollider.scale = new Phys3D.RawVec3f(scale.x, scale.y, scale.z);

                const hasRigidBody = !!comp.getComponent(MiniGameAdaptor.Rigidbody);

                // 如果gameObject没有设置RigidBody，为他创建静态刚体，用于碰撞
                if (!hasRigidBody) {
                    physx.addStaticBodyForCollider(comp)
                } else if (!this.nativeCollider.attachedRigidbody) {
                    // 先添加RigidBody再添加MeshCollider的场景
                    this.nativeCollider.adaptorRigidBody = rigidBody;
                    this.nativeCollider.attachedRigidbody = rigidBody.nativeRigidBody;
                }

                // 为collider绑定事件
                bindEventForCollider(comp.nativeCollider, comp.gameObject)
                nativeColliderToAdaptorColliderMap.set(comp.nativeCollider, comp);
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
