Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.MeshFilter", {
        inherits: [MiniGameAdaptor.Component],
        fields: {
            _mesh: null,
            _sharedMesh: null
        },
        props: {
            mesh: {
                get: function () {
                    if (!this._mesh) {
                        let renderer = this.GetComponent(MiniGameAdaptor.Renderer);
                        if (renderer) {
                            this._mesh = new MiniGameAdaptor.Mesh(renderer.ref.mesh);
                        }
                    }
                    return this._mesh;
                },
                set: function (value) {
                    this._mesh = value;

                    this.entity.getComponent(engine.MeshRenderer).mesh = value.ref;

                    /*this.mesh.ref = value.ref;*/
                }
            },
            sharedMesh: {
                get: function () {
                    if (!this._sharedMesh) {
                        let renderer = this.GetComponent(MiniGameAdaptor.Renderer);
                        if (renderer) {
                            // ?
                            this._sharedMesh = new MiniGameAdaptor.Mesh(renderer.ref.mesh);
                        }
                    }
                    return this._sharedMesh;
                },
                set: function (value) {
                    this.sharedMesh.ref = value.ref;

                    this.entity.getComponent(engine.MeshRenderer).mesh = value.ref;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.MeshFilter')(MiniGameAdaptor.MeshFilter);
Object.defineProperty(MiniGameAdaptor.MeshFilter.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.MeshFilter.prototype.__properties }
})

