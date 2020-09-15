Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UITexture", {
        inherits: [MiniGameAdaptor.UIBasicSprite],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {

                    comp.ref = builtContext.components.data[data.ref];

                    // if (!comp.__onClick) { 
                    //     comp.__onClick = {} 
                    // }

                    // comp.__onClick.target = builtContext.components.data[data.onClick.target];
                    // comp.__onClick.method = data.onClick.method;
                    // comp.__onClick.params = []
                    // data.onClick.params.forEach(p => {
                    //     comp.__onClick.params.push(builtContext.components.data[p]);
                    // });
                    return comp;
                }
            }
        },
        props: {
            border: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            drawingDimensions: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            fixedAspect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            mainTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            material: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            premultipliedAlpha: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            shader: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uvRect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.UIBasicSprite.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            MakePixelPerfect: function () {
                throw new System.Exception("not impl");
            },
            OnFill: function (verts, uvs, cols) {
                throw new System.Exception("not impl");
            },
            OnUpdate: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UITexture')(MiniGameAdaptor.UITexture);
Object.defineProperty(MiniGameAdaptor.UITexture.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UITexture.prototype.__properties }
})