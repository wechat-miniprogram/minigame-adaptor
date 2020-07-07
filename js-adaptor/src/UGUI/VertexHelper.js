Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.VertexHelper", {
        inherits: [System.IDisposable],
        props: {
            currentIndexCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            currentVertCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            },
            $ctor1: function (m) {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            AddTriangle: function (idx0, idx1, idx2) {
                throw new System.Exception("not impl");
            },
            AddUIVertexQuad: function (verts) {
                throw new System.Exception("not impl");
            },
            AddUIVertexStream: function (verts, indices) {
                throw new System.Exception("not impl");
            },
            AddUIVertexTriangleStream: function (verts) {
                throw new System.Exception("not impl");
            },
            AddVert: function (v) {
                throw new System.Exception("not impl");
            },
            AddVert$1: function (position, color, uv0) {
                throw new System.Exception("not impl");
            },
            AddVert$2: function (position, color, uv0, uv1, normal, tangent) {
                throw new System.Exception("not impl");
            },
            Clear: function () {
                throw new System.Exception("not impl");
            },
            Dispose: function () {
                throw new System.Exception("not impl");
            },
            System$IDisposable$Dispose: function () {
                throw new System.Exception("Exception");
            },
            FillMesh: function (mesh) {
                throw new System.Exception("not impl");
            },
            GetUIVertexStream: function (stream) {
                throw new System.Exception("not impl");
            },
            PopulateUIVertex: function (vertex, i) {
                throw new System.Exception("not impl");
            },
            SetUIVertex: function (vertex, i) {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
