Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.SkinnedMeshRenderer", {
        inherits: [MiniGameAdaptor.Renderer],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                }
            }
        },
        fields: {
            ref: null
        },
        props: {
            bones: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            forceMatrixRecalculationPerRender: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            localBounds: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            quality: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rootBone: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sharedMesh: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            skinnedMotionVectors: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            updateWhenOffscreen: {
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
                MiniGameAdaptor.Renderer.ctor.call(this);
            }
        },
        methods: {
            BakeMesh: function (mesh) {
                throw new System.Exception("not impl");
            },
            GetBlendShapeWeight: function (index) {
                throw new System.Exception("not impl");
            },
            SetBlendShapeWeight: function (index, value) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.SkinnedMeshRenderer')(MiniGameAdaptor.SkinnedMeshRenderer);
Object.defineProperty(MiniGameAdaptor.SkinnedMeshRenderer.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.SkinnedMeshRenderer.prototype.__properties }
})
// MiniGameAdaptor.SkinnedMeshRenderer.prototype.__properties.ref = { type: "SkinnedMeshRenderer" };