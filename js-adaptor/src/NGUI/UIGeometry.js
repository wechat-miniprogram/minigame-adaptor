Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIGeometry", {
        fields: {
            verts: null,
            uvs: null,
            cols: null,
            onCustomWrite: null
        },
        props: {
            hasTransformed: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasVertices: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            ApplyTransform: function (widgetToPanel, generateNormals) {
                if (generateNormals === void 0) { generateNormals = true; }
                throw new System.Exception("not impl");
            },
            Clear: function () {
                throw new System.Exception("not impl");
            },
            WriteToBuffers: function (v, u, c, n, t, u2) {
                throw new System.Exception("not impl");
            }
        }
    });
});
