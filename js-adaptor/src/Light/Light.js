Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Light", {
        inherits: [MiniGameAdaptor.Behaviour],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                },
                GetLights: function (type, layer) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            _color: null
        },
        props: {
            bakingOutput: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            // not support, just return the intensity right now
            bounceIntensity: {
                get: function () {
                    return this.intensity;
                },
                set: function (value) {
                    this.intensity = value;
                }
            },
            color: {
                get: function () {
                    if (!this._color) {
                        this._color = new MiniGameAdaptor.Color.$ctor1(this.ref.color.r, this.ref.color.g, this.ref.color.b);
                    }
                },
                set: function (value) {
                    if (!this._color) {
                        this._color = new MiniGameAdaptor.Color.$ctor1(this.ref.color.r, this.ref.color.g, this.ref.color.b);
                    }

                    this._color.ref = value.ref;
                }
            },
            colorTemperature: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            commandBufferCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cookie: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            cookieSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            cullingMask: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            flare: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            // The Intensity of a light is multiplied with the Light color.
            // The value can be between 0 and 8. This allows you to create over bright lights.
            intensity: {
                get: function () {
                    return this.ref.intensity;
                },
                set: function (value) {
                    this.ref.intensity = MiniGameAdaptor.Mathf.Clamp(value, 0, 8);
                }
            },
            layerShadowCullDistances: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            lightmapBakeType: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            lightShadowCasterMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            range: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            renderMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowAngle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
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
            shadowCustomResolution: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowNearPlane: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowNormalBias: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowRadius: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowResolution: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadows: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowStrength: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spotAngle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            type: {
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
                MiniGameAdaptor.Behaviour.ctor.call(this);

                // this.ref = ref;
            }
        },
        methods: {
            AddCommandBuffer: function (evt, buffer) {
                throw new System.Exception("not impl");
            },
            AddCommandBuffer$1: function (evt, buffer, shadowPassMask) {
                throw new System.Exception("not impl");
            },
            AddCommandBufferAsync: function (evt, buffer, queueType) {
                throw new System.Exception("not impl");
            },
            AddCommandBufferAsync$1: function (evt, buffer, shadowPassMask, queueType) {
                throw new System.Exception("not impl");
            },
            GetCommandBuffers: function (evt) {
                throw new System.Exception("not impl");
            },
            RemoveAllCommandBuffers: function () {
                throw new System.Exception("not impl");
            },
            RemoveCommandBuffer: function (evt, buffer) {
                throw new System.Exception("not impl");
            },
            RemoveCommandBuffers: function (evt) {
                throw new System.Exception("not impl");
            },
            Reset: function () {
                throw new System.Exception("not impl");
            },
            SetLightDirty: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Light')(MiniGameAdaptor.Light);
Object.defineProperty(MiniGameAdaptor.Light.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Light.prototype.__properties }
})
