Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Renderer", {
        inherits: [MiniGameAdaptor.Component],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                }
            }
        },
        fields: {
            _material: null,
            _sharedMaterial: null,
            _materials: null,
            _sharedMaterials: null,
            _lightmapScaleOffset: null
        },
        props: {
            allowOcclusionWhenDynamic: {
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
                }
            },
            enabled: {
                get: function () {
                    return this.ref.active;
                },
                set: function (value) {
                    this.ref.active = value;
                }
            },
            isPartOfStaticBatch: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isVisible: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            lightmapIndex: {
                get: function () {
                    return this.ref.lightMapIndex;
                },
                set: function (value) {
                    this.ref.lightMapIndex = value;
                }
            },
            lightmapScaleOffset: {
                get: function () {
                    if (!this._lightmapScaleOffset) {
                        this._lightmapScaleOffset = new MiniGameAdaptor.Vector4.$ctor4(this.ref.lightMapScaleOffset);
                    }
                    return this._lightmapScaleOffset;
                },
                set: function (value) {
                    if (!this._lightmapScaleOffset) {
                        this._lightmapScaleOffset = new MiniGameAdaptor.Vector4.$ctor4(value.ref);
                    }
                    this.ref.lightMapScaleOffset = value.ref;
                }
            },
            lightProbeProxyVolumeOverride: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            lightProbeUsage: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            localToWorldMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            material: {
                get: function () {
                    if (!this._material) {
                        this._material = new MiniGameAdaptor.Material.$ctor2(this.ref.material);
                    }
                    return this._material;
                },
                set: function (value) {
                    this.ref.material = value.ref;
                    this._material = value;
                }
            },
            materials: {
                get: function () {
                    if (!this._materials) {
                        this._materials = [];
                        this.ref.materials.forEach(mat => {
                            this._materials.push(new MiniGameAdaptor.Material.$ctor2(mat));
                        });
                    }
                    return this._materials;
                },
                set: function (value) {
                    this.ref.materials.clear();
                    value.forEach(mat => {
                        this.ref.materials.push(mat.ref);
                    });
                }
            },
            motionVectorGenerationMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            probeAnchor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            realtimeLightmapIndex: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            realtimeLightmapScaleOffset: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            receiveShadows: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            reflectionProbeUsage: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rendererPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            renderingLayerMask: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowCastingMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sharedMaterial: {
                get: function () {
                    return this.material;
                },
                set: function (value) {
                    this.material = value;
                }
            },
            sharedMaterials: {
                get: function () {
                    return this.materials;
                },
                set: function (value) {
                    this.materials = value;
                }
            },
            sortingLayerID: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sortingLayerName: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sortingOrder: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            worldToLocalMatrix: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Component.ctor.call(this);
            }
        },
        methods: {
            GetClosestReflectionProbes: function (result) {
                throw new System.Exception("not impl");
            },
            GetMaterials: function (m) {
                throw new System.Exception("not impl");
            },
            GetPropertyBlock: function (properties) {
                throw new System.Exception("not impl");
            },
            GetPropertyBlock$1: function (properties, materialIndex) {
                throw new System.Exception("not impl");
            },
            GetSharedMaterials: function (m) {
                throw new System.Exception("not impl");
            },
            HasPropertyBlock: function () {
                throw new System.Exception("not impl");
            },
            SetPropertyBlock: function (properties) {
                throw new System.Exception("not impl");
            },
            SetPropertyBlock$1: function (properties, materialIndex) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Renderer')(MiniGameAdaptor.Renderer);
Object.defineProperty(MiniGameAdaptor.Renderer.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Renderer.prototype.__properties }
})