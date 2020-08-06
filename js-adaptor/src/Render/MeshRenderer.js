Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.MeshRenderer", {
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
            additionalVertexStreams: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            subMeshStartIndex: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (entity) {
                this.$initialize();
                MiniGameAdaptor.Renderer.ctor.call(this);

                if (!entity.getComponent(engine.MeshRenderer)) {
                    this.ref = entity.addComponent(engine.MeshRenderer);
                }
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.MeshRenderer')(MiniGameAdaptor.MeshRenderer);
Object.defineProperty(MiniGameAdaptor.MeshRenderer.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.MeshRenderer.prototype.__properties }
})
MiniGameAdaptor.MeshRenderer.prototype.__properties.ref = { type: "MeshRenderer" };
