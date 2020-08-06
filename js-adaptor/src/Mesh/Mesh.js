import {physx, Phys3D, bindEventForCollider, nativeColliderToAdaptorColliderMap} from '../Physics/Physx';
import { EnumVertexLayoutUsage, getPointDataByUsage, createEngineMesh} from './MeshHelper.js';

function propsChecker(mesh) {
    return mesh.vertices.length && mesh.normals.length && mesh.uv.length && mesh.triangles.length && mesh.tangents.length && !mesh.engineMesh;
}

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Mesh", {
        inherits: [MiniGameAdaptor.Object],
        fields: {
            ref: null
        },
        props: {
            bindposes: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            blendShapeCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            boneWeights: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bounds: {
                get: function () {
                    const center = new MiniGameAdaptor.Vector3.$ctor3(this.ref.boundBox.center)._FlipX();
                    /*const size = new MiniGameAdaptor.Vector3.$ctor3(this.ref.boundBox.size)._FlipX();*/
                    const size = new MiniGameAdaptor.Vector3.$ctor2(1,1,1)

                    return new MiniGameAdaptor.Bounds.ctor(center, size);
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            colors: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            colors32: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            indexFormat: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isReadable: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            normals: {
                get: function () {
                    return this._normals || [];
                },
                set: function (value) {
                    this._normals = value;

                    if (propsChecker(this)) {
                        createEngineMesh(this)
                    }
                }
            },
            subMeshCount: {
                get: function () {
                    return this._subMeshCount || this.ref.getSubMeshCount();
                },
                set: function (value) {
                    this._subMeshCount = value;
                }
            },
            tangents: {
                get: function () {
                    return this._tangents || [];
                },
                set: function (value) {
                    this._tangents = value;
                    if (propsChecker(this)) {
                        createEngineMesh(this)
                    }
                }
            },
            triangles: {
                get: function () {
                    return this._triangles || [];
                },
                set: function (value) {
                    this._triangles = value;
                    if (propsChecker(this)) {
                        createEngineMesh(this)
                    }
                }
            },
            uv: {
                get: function () {
                    return this._uv || [];
                },
                set: function (value) {
                    this._uv = value;
                    if (propsChecker(this)) {
                        createEngineMesh(this)
                    }
                }
            },
            uv2: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv3: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv4: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv5: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv6: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv7: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv8: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    return [];
                }
            },
            vertexBufferCount: {
                get: function () {
                    return 0
                }
            },
            vertexCount: {
                get: function () {
                    return this._vertices.length;
                }
            },
            vertices: {
                get: function () {
                    return this._vertices || [];
                },
                set: function (value) {
                    this._vertices = value;
                    if (propsChecker(this)) {
                        createEngineMesh(this)
                    }
                }
            }
        },
        ctors: {
            ctor: function (ref) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);

                if (ref) {
                    this.ref = ref;
                    this._buffer = ref._getRawVertexBuffer();
                    this._vertexLayout = ref._vertexLayout;

                    // 顶点数据
                    this._vertices = getPointDataByUsage(this._buffer, this._vertexLayout, EnumVertexLayoutUsage.POSITION);

                    // uv数据
                    this._uv = getPointDataByUsage(this._buffer, this._vertexLayout, EnumVertexLayoutUsage.UV0);

                    // normals数据
                    this._normals = getPointDataByUsage(this._buffer, this._vertexLayout, EnumVertexLayoutUsage.NORMAL);

                    // tangents数据
                    this._tangents = getPointDataByUsage(this._buffer, this._vertexLayout, EnumVertexLayoutUsage.TANGENT);

                    // 三角形数据
                    this._triangles = ref._getRawIndiceBuffer();
                } else {
                    // TODO 创建真正的自研引擎Mesh
                    this.ref = new engine.Mesh();
                }
            }
        },
        methods: {
            AddBlendShapeFrame: function (shapeName, frameWeight, deltaVertices, deltaNormals, deltaTangents) {
                throw new System.Exception("not impl");
            },
            Clear: function () {
                throw new System.Exception("not impl");
            },
            Clear$1: function (keepVertexLayout) {
                throw new System.Exception("not impl");
            },
            ClearBlendShapes: function () {
                throw new System.Exception("not impl");
            },
            CombineMeshes: function (combine) {
                throw new System.Exception("not impl");
            },
            CombineMeshes$1: function (combine, mergeSubMeshes) {
                throw new System.Exception("not impl");
            },
            CombineMeshes$2: function (combine, mergeSubMeshes, useMatrices) {
                throw new System.Exception("not impl");
            },
            CombineMeshes$3: function (combine, mergeSubMeshes, useMatrices, hasLightmapData) {
                throw new System.Exception("not impl");
            },
            GetBaseVertex: function (submesh) {
                throw new System.Exception("not impl");
            },
            GetBindposes: function (bindposes) {
                throw new System.Exception("not impl");
            },
            GetBlendShapeFrameCount: function (shapeIndex) {
                throw new System.Exception("not impl");
            },
            GetBlendShapeFrameVertices: function (shapeIndex, frameIndex, deltaVertices, deltaNormals, deltaTangents) {
                throw new System.Exception("not impl");
            },
            GetBlendShapeFrameWeight: function (shapeIndex, frameIndex) {
                throw new System.Exception("not impl");
            },
            GetBlendShapeIndex: function (blendShapeName) {
                throw new System.Exception("not impl");
            },
            GetBlendShapeName: function (shapeIndex) {
                throw new System.Exception("not impl");
            },
            GetBoneWeights: function (boneWeights) {
                throw new System.Exception("not impl");
            },
            GetColors: function (colors) {
                throw new System.Exception("not impl");
            },
            GetColors$1: function (colors) {
                throw new System.Exception("not impl");
            },
            GetIndexCount: function (submesh) {
                throw new System.Exception("not impl");
            },
            GetIndexStart: function (submesh) {
                throw new System.Exception("not impl");
            },
            GetIndices: function (submesh) {
                throw new System.Exception("not impl");
            },
            GetIndices$1: function (submesh, applyBaseVertex) {
                throw new System.Exception("not impl");
            },
            GetIndices$2: function (indices, submesh) {
                throw new System.Exception("not impl");
            },
            GetIndices$3: function (indices, submesh, applyBaseVertex) {
                throw new System.Exception("not impl");
            },
            GetNormals: function (normals) {
                throw new System.Exception("not impl");
            },
            GetTangents: function (tangents) {
                throw new System.Exception("not impl");
            },
            GetTopology: function (submesh) {
                throw new System.Exception("not impl");
            },
            GetTriangles: function (submesh) {
                if (this.subMeshCount === 1 && submesh === 0 ) {
                    return this._triangles;
                } else {
                    throw new System.Exception("not impl");
                }
            },
            GetTriangles$1: function (submesh, applyBaseVertex) {
                throw new System.Exception("not impl");
            },
            GetTriangles$2: function (triangles, submesh) {
                throw new System.Exception("not impl");
            },
            GetTriangles$3: function (triangles, submesh, applyBaseVertex) {
                throw new System.Exception("not impl");
            },
            GetUVDistributionMetric: function (uvSetIndex) {
                throw new System.Exception("not impl");
            },
            GetUVs: function (channel, uvs) {
                throw new System.Exception("not impl");
            },
            GetUVs$1: function (channel, uvs) {
                throw new System.Exception("not impl");
            },
            GetUVs$2: function (channel, uvs) {
                throw new System.Exception("not impl");
            },
            GetVertices: function (vertices) {
                throw new System.Exception("not impl");
            },
            MarkDynamic: function () {
                throw new System.Exception("not impl");
            },
            RecalculateBounds: function () {
                throw new System.Exception("not impl");
            },
            RecalculateNormals: function () {
                throw new System.Exception("not impl");
            },
            RecalculateTangents: function () {
                throw new System.Exception("not impl");
            },
            SetColors: function (inColors) {
                throw new System.Exception("not impl");
            },
            SetColors$1: function (inColors) {
                throw new System.Exception("not impl");
            },
            SetIndices: function (indices, topology, submesh) {
                throw new System.Exception("not impl");
            },
            SetIndices$1: function (indices, topology, submesh, calculateBounds) {
                throw new System.Exception("not impl");
            },
            SetIndices$2: function (indices, topology, submesh, calculateBounds, baseVertex) {
                throw new System.Exception("not impl");
            },
            SetNormals: function (inNormals) {
                throw new System.Exception("not impl");
            },
            SetTangents: function (inTangents) {
                throw new System.Exception("not impl");
            },
            SetTriangles: function (triangles, submesh) {
                throw new System.Exception("not impl");
            },
            SetTriangles$1: function (triangles, submesh, calculateBounds) {
                throw new System.Exception("not impl");
            },
            SetTriangles$2: function (triangles, submesh, calculateBounds, baseVertex) {
                throw new System.Exception("not impl");
            },
            SetTriangles$3: function (triangles, submesh) {
                throw new System.Exception("not impl");
            },
            SetTriangles$4: function (triangles, submesh, calculateBounds) {
                if ( submesh === 0) {
                    this.triangles = triangles;
                } else {
                    this.triangles = this.triangles.concat(triangles)
                }
            },
            SetTriangles$5: function (triangles, submesh, calculateBounds, baseVertex) {
                throw new System.Exception("not impl");
            },
            SetUVs: function (channel, uvs) {
                throw new System.Exception("not impl");
            },
            SetUVs$1: function (channel, uvs) {
                throw new System.Exception("not impl");
            },
            SetUVs$2: function (channel, uvs) {
                throw new System.Exception("not impl");
            },
            SetVertices: function (inVertices) {
                throw new System.Exception("not impl");
            },
            UploadMeshData: function (markNoLongerReadable) {
                throw new System.Exception("not impl");
            },
            test: function(vertices, triangles) {
                const phyMesh = new Phys3D.PhysMesh(physx.Phys3dInstance);
                const float32 = new Float32Array(vertices.length * 3);

                let index = 0;
                vertices.forEach(item => {
                    float32[index] = item.x;
                    index++;
                    float32[index] = item.y;
                    index++;
                    float32[index] = item.z;
                    index++;
                });
                phyMesh.SetVertices(float32, vertices.length);

                const indices = new Float32Array(triangles.length);
                triangles.forEach((item, index) => {
                    indices[index] = triangles[index];
                });
                phyMesh.SetTriangles(indices, triangles.length / 3);

                const nativeCollider = new Phys3D.MeshCollider(physx.Phys3dInstance, true, 14, phyMesh);

                /*const rigidBody = new Phys3D.StaticRigidbody(physx.Phys3dInstance);*/
                const rigidBody = new Phys3D.DynamicRigidbody(physx.Phys3dInstance, 10);
                rigidBody.position = new Phys3D.RawVec3f(-2, 0 ,0);

                nativeCollider.attachedRigidbody = rigidBody;
            }
        }
    });
});


