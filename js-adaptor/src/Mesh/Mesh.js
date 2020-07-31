Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    const EnumVertexLayoutUsage =  {
        CUSTOM : 0,
        POSITION : 1,
        NORMAL : 2,
        TANGENT : 3,
        UV0 : 4,
        UV1 : 5,
        UV2 : 6,
        COLOR : 7,
        BONEINDEX : 8,
        BONEWEIGHT : 9,
    }

    const EnumVertexFormat = {
        INVALID : 0,
        FLOAT : 1,
        FLOAT2 : 2,
        FLOAT3 : 3,
        FLOAT4 : 4,
        BYTE4 : 5,
        BYTE4N : 6,
        UBYTE4 : 7,
        UBYTE4N : 8,
        SHORT2 : 9,
        SHORT2N : 10,
        SHORT4 : 11,
        SHORT4N : 12,
        UINT10_N2 : 13,
    }

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
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bounds: {
                get: function () {
                    const center = new MiniGameAdaptor.Vector3.$ctor3(this.ref.boundBox.center)._FlipX();
                    const size = new MiniGameAdaptor.Vector3.$ctor3(this.ref.boundBox.size)._FlipX();

                    return new MiniGameAdaptor.Bounds.ctor(center, size);
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            colors: {
                get: function () {
                    throw new System.Exception("not impl");
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
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            subMeshCount: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            tangents: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            triangles: {
                get: function () {
                    return this._triangles;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv: {
                get: function () {
                    return [];
                },
                set: function (value) {
                    throw new System.Exception("not impl");
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
                    return 0;
                }
            },
            vertices: {
                get: function () {
                    return this._vertices;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (ref) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);

                let start = new Date();

                console.log('mesh ref', ref)
                const mesh = ref;
                const buffer = mesh._getRawVertexBuffer();
                if (!buffer) {
                    // 删除了数据
                }

                const _vertexLayout = mesh._vertexLayout;
                const stride = _vertexLayout.stride / 4;
                const config = mesh._vertexLayout.getConfigByUsage(EnumVertexLayoutUsage.POSITION);
                const offset = config.offset / 4;
                const verticesCount = buffer.length / stride;

                // 一个顶点为float x y z组成，每个属性占4个字节，总共12个字节
                const newBuffer = new Float32Array(verticesCount * 3);

                const vertices = [];

                // 遍历自研引擎Mesh的buffer数据，将顶点信息取出，存到一个新的Uint8Array里面
                let pStart;
                for (let i = 0; i < verticesCount; i++) {
                    pStart = buffer[i * stride + offset];
                    vertices.push(new MiniGameAdaptor.Vector3.$ctor2(pStart, pStart + 1, pStart + 2))
                }

                this._vertices = vertices;

                // uv数据
                const uvConfig = mesh._vertexLayout.getConfigByUsage(EnumVertexLayoutUsage.UV0);
                const uvOffset = uvConfig.offset / 4;
                const uvs = [];
                let vStart;
                for (let i = 0; i < verticesCount; i++) {
                    vStart = buffer[i * stride + uvOffset];
                    uvs.push(new MiniGameAdaptor.Vector3.$ctor2(pStart, pStart + 1))
                }

                const triangles = mesh._getRawIndiceBuffer();

                console.log('parse cost', new Date() - start);

                /*console.log(vertices, uvs, triangles)*/

                /*let start = new Date();

                // 三角形数据
                const source = mesh._indiceBuffer._uploadedBuffer;
                const bufferLen = source.buffer.byteLength;
                const sliceBuffer = source.buffer.slice(bufferLen - source.length, bufferLen)

                // 自研引擎是固定用uint16做index的，所以将手动裁剪出来的arraybuffer创建为Uint16Array即可
                const uint16 = new Uint16Array(sliceBuffer)
                const trianglesCount = uint16.length / 3;

                const uint32 = new Uint32Array(uint16.length)
                for ( let i = 0; i < uint16.length; i++) {
                    uint32[i] = uint16[i];
                }

                this._triangles = uint32;

                [>console.log(uint32, trianglesCount, verticesCount);<]

                console.log('parse cost', new Date() - start)*/
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
                throw new System.Exception("not impl");
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
                throw new System.Exception("not impl");
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
            }
        }
    });
});


