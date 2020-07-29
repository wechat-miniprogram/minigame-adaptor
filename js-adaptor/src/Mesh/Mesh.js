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
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bounds: {
                get: function () {
                    throw new System.Exception("not impl");
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
                    throw new System.Exception("not impl");
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
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            triangles: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv2: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv3: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv4: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv5: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv6: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv7: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uv8: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            vertexBufferCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            vertexCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            vertices: {
                get: function () {
                    throw new System.Exception("not impl");
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

                this.ref = ref;
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


