Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Material", {
        inherits: [MiniGameAdaptor.Object],
        statics: {
            methods: {
                Deserialize: function(data, comp) {
                    comp.ref = engine.loader.getAsset(data.path ? data.path : data.value.path);
                    return comp;
                }
            }
        },
        fields: {
            ref: null,
            _shader: null,
            _color: null,
            _textures: null
        },
        props: {
            // Unity里Color取值范围为[0, 1]  引擎为[0, 255]
            color: {
                get: function () {
                    if(!this._color) {
                        let c = this.ref.getVector ? this.ref.getVector("_Color") : null;

                        if (!c) {
                            AdaptorDebugger.warn("Material: <" + this.ref._id + "> _Color properties not found");
                            return MiniGameAdaptor.Color.white;
                        }
                        this._color = new MiniGameAdaptor.Color.$ctor2(c[0], c[1], c[2], c[3]).__remap01();
                    }
                    return this._color;
                },
                set: function (value) {
                    if (value && value instanceof MiniGameAdaptor.Color) {
                        this._color = value;
                        const remap = value.__remap0255();
                        const vec4 = engine.Vector4.createFromNumber(remap.r, remap.g, remap.b, remap.a);
                        
                        if (!this.ref.setVector("_Color", vec4)) {
                            AdaptorDebugger.warn("Material: <" + this.ref._id + "> _Color properties not found");
                        }
                    }
                }
            },
            doubleSidedGI: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            enableInstancing: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            globalIlluminationFlags: {
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
            mainTextureOffset: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            mainTextureScale: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            passCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            renderQueue: {
                get: function () {
                    return this.ref.renderQueue;
                },
                set: function (value) {
                    this.ref.renderQueue = value;
                }
            },
            // ???
            shader: {
                get: function () {
                    if (!this._shader) {
                        this._shader = new MiniGameAdaptor.Shader(this.ref.effect);
                    }
                    return this._shader;
                },
                set: function (value) {
                    this._shader = value;
                }
            },
            shaderKeywords: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (source) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);
            },
            $ctor1: function (shader) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);
            },
            $ctor2: function (ref) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);
                this.ref = ref;
            }
        },
        methods: {
            CopyPropertiesFromMaterial: function (mat) {
                throw new System.Exception("not impl");
            },
            DisableKeyword: function (keyword) {
                throw new System.Exception("not impl");
            },
            EnableKeyword: function (keyword) {
                throw new System.Exception("not impl");
            },
            FindPass: function (passName) {
                throw new System.Exception("not impl");
            },
            GetColor: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetColor$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetColorArray: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            GetColorArray$1: function (name, values) {
                throw new System.Exception("not impl");
            },
            GetColorArray$2: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetColorArray$3: function (name) {
                throw new System.Exception("not impl");
            },
            GetFloat: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetFloat$1: function (name) {
                return this.ref.getFloat(name);
            },
            GetFloatArray: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetFloatArray$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetFloatArray$2: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            GetFloatArray$3: function (name, values) {
                throw new System.Exception("not impl");
            },
            GetInt: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetInt$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetMatrix: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetMatrix$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetMatrixArray: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            GetMatrixArray$1: function (name, values) {
                throw new System.Exception("not impl");
            },
            GetMatrixArray$2: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetMatrixArray$3: function (name) {
                throw new System.Exception("not impl");
            },
            GetPassName: function (pass) {
                throw new System.Exception("not impl");
            },
            GetShaderPassEnabled: function (passName) {
                throw new System.Exception("not impl");
            },
            GetTag: function (tag, searchFallbacks) {
                throw new System.Exception("not impl");
            },
            GetTag$1: function (tag, searchFallbacks, defaultValue) {
                throw new System.Exception("not impl");
            },
            GetTexture: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetTexture$1: function (name) {
                if (!this._textures) {
                    this._textures = [];
                    this.ref._textures.forEach((tex) => {
                        
                    });
                }
                return this._textures
            },
            GetTextureOffset: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetTextureOffset$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetTexturePropertyNameIDs: function () {
                throw new System.Exception("not impl");
            },
            GetTexturePropertyNameIDs$1: function (outNames) {
                throw new System.Exception("not impl");
            },
            GetTexturePropertyNames: function () {
                throw new System.Exception("not impl");
            },
            GetTexturePropertyNames$1: function (outNames) {
                throw new System.Exception("not impl");
            },
            GetTextureScale: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetTextureScale$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetVector: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetVector$1: function (name) {
                let vector = this.ref._uniforms.getArray(name);

                if (!vector || (vector && vector.length != 4)) {
                    return MiniGameAdaptor.Vector4.zero;
                }

                return new MiniGameAdaptor.Vector4.$ctor5(vector);
            },
            GetVectorArray: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            GetVectorArray$1: function (name, values) {
                throw new System.Exception("not impl");
            },
            GetVectorArray$2: function (nameID) {
                throw new System.Exception("not impl");
            },
            GetVectorArray$3: function (name) {
                throw new System.Exception("not impl");
            },
            HasProperty: function (nameID) {
                // throw new System.Exception("not impl");
                return false;
            },
            HasProperty$1: function (name) {
                // throw new System.Exception("not impl");
                return this.ref._uniforms.hasKey(name);
            },
            IsKeywordEnabled: function (keyword) {
                throw new System.Exception("not impl");
            },
            Lerp: function (start, end, t) {
                throw new System.Exception("not impl");
            },
            SetBuffer: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetBuffer$1: function (name, value) {
                throw new System.Exception("not impl");
            },
            SetColor: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetColor$1: function (name, value) {
                let c = this.ref._uniforms.getArray(name);
                if (!c) {
                    let raw = []
                    for (let i = 0; i < 4; i++) {
                        raw.push(c.getItem(i));
                    }
                    this.ref._uniforms.setArray(name, raw);
                }
            },
            SetColorArray: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetColorArray$1: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetColorArray$2: function (name, values) {
                throw new System.Exception("not impl");
            },
            SetColorArray$3: function (name, values) {
                throw new System.Exception("not impl");
            },
            SetFloat: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetFloat$1: function (name, value) {
                this.ref.setFloat(name, value);
            },
            SetFloatArray: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetFloatArray$1: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetFloatArray$2: function (name, values) {
                throw new System.Exception("not impl");
            },
            SetFloatArray$3: function (name, values) {
                throw new System.Exception("not impl");
            },
            SetInt: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetInt$1: function (name, value) {
                this.SetFloat$1(name, value);
            },
            SetMatrix: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetMatrix$1: function (name, value) {
                this.ref.setMatrix(name, value.ref);
            },
            SetMatrixArray: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetMatrixArray$1: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetMatrixArray$2: function (name, values) {
                throw new System.Exception("not impl");
            },
            SetMatrixArray$3: function (name, values) {
                throw new System.Exception("not impl");
            },
            SetOverrideTag: function (tag, val) {
                throw new System.Exception("not impl");
            },
            SetPass: function (pass) {
                throw new System.Exception("not impl");
            },
            SetShaderPassEnabled: function (passName, enabled) {
                throw new System.Exception("not impl");
            },
            SetTexture: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetTexture$1: function (name, value) {
                throw new System.Exception("not impl");
            },
            SetTextureOffset: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetTextureOffset$1: function (name, value) {
                throw new System.Exception("not impl");
            },
            SetTextureScale: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetTextureScale$1: function (name, value) {
                throw new System.Exception("not impl");
            },
            SetVector: function (nameID, value) {
                throw new System.Exception("not impl");
            },
            SetVector$1: function (name, value) {
                this.ref.setVector(name, value.ref);
            },
            SetVectorArray: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetVectorArray$1: function (nameID, values) {
                throw new System.Exception("not impl");
            },
            SetVectorArray$2: function (name, values) {
                throw new System.Exception("not impl");
            },
            SetVectorArray$3: function (name, values) {
                throw new System.Exception("not impl");
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.Material')(MiniGameAdaptor.Material);
Object.defineProperty(MiniGameAdaptor.Material.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Material.prototype.__properties }
})

