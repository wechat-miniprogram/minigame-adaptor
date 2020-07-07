Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.LineRenderer", {
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
            alignment: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            colorGradient: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            endColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            endWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            generateLightingData: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            loop: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            numCapVertices: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            numCornerVertices: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            positionCount: {
                get: function () {
                    return this.ref.posCount;
                },
                set: function (value) {
                    this.ref.posCount = value;
                }
            },
            shadowBias: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            startColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            startWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            textureMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useWorldSpace: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            widthCurve: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            widthMultiplier: {
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
            BakeMesh: function (mesh, useTransform) {
                if (useTransform === void 0) { useTransform = false; }
                throw new System.Exception("not impl");
            },
            BakeMesh$1: function (mesh, camera, useTransform) {
                if (useTransform === void 0) { useTransform = false; }
                throw new System.Exception("not impl");
            },
            GetPosition: function (index) {
                throw new System.Exception("not impl");
            },
            GetPositions: function (positions) {
                throw new System.Exception("not impl");
            },
            SetPosition: function (index, position) {
                this.ref.setPosition(index, position.ref);
            },
            SetPositions: function (positions) {
                throw new System.Exception("not impl");
            },
            Simplify: function (tolerance) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.LineRenderer')(MiniGameAdaptor.LineRenderer);
Object.defineProperty(MiniGameAdaptor.LineRenderer.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.LineRenderer.prototype.__properties }
})
MiniGameAdaptor.LineRenderer.prototype.__properties.ref = { type: "LineRenderer" };