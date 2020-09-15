Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Sprite", {
        inherits: [MiniGameAdaptor.Object],
        statics: {
            methods: {
                Create: function (texture, rect, pivot) {
                    throw new System.Exception("not impl");
                },
                Create$1: function (texture, rect, pivot, pixelsPerUnit) {
                    throw new System.Exception("not impl");
                },
                Create$2: function (texture, rect, pivot, pixelsPerUnit, extrude) {
                    throw new System.Exception("not impl");
                },
                Create$3: function (texture, rect, pivot, pixelsPerUnit, extrude, meshType) {
                    throw new System.Exception("not impl");
                },
                Create$4: function (texture, rect, pivot, pixelsPerUnit, extrude, meshType, border) {
                    throw new System.Exception("not impl");
                },
                Create$5: function (texture, rect, pivot, pixelsPerUnit, extrude, meshType, border, generateFallbackPhysicsShape) {
                    throw new System.Exception("not impl");
                }
            },
            methods: {
                Deserialize: function (data, comp, context, builtContext) {
                    let ref = builtContext.components.data[data.ref];
                    if(ref && ref.spriteFrame)
                        comp._spriteFrame = ref.spriteFrame;
                    return comp;
                }
            },
            fields: {
                _spriteFrame: null
            }
        },
        props: {
            associatedAlphaSplitTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            border: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            bounds: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            packed: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            packingMode: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            packingRotation: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pivot: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pixelsPerUnit: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            rect: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            texture: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            textureRect: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            textureRectOffset: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            triangles: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            uv: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            vertices: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            GetPhysicsShape: function (shapeIdx, physicsShape) {
                throw new System.Exception("not impl");
            },
            GetPhysicsShapeCount: function () {
                throw new System.Exception("not impl");
            },
            GetPhysicsShapePointCount: function (shapeIdx) {
                throw new System.Exception("not impl");
            },
            OverrideGeometry: function (vertices, triangles) {
                throw new System.Exception("not impl");
            },
            OverridePhysicsShape: function (physicsShapes) {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
