Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AnimationClip", {
        inherits: [MiniGameAdaptor.Motion],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                }
            }
        },
        fields: {
            ref: null,
            name: ""
        },
        props: {
            empty: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            events: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            frameRate: {
                get: function () {
                    return this.ref.frameRate;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            hasGenericRootTransform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasMotionCurves: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasMotionFloatCurves: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasRootCurves: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            humanMotion: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            legacy: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            length: {
                get: function () {
                    return this.ref.length;
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
            wrapMode: {
                get: function () {
                    return this.ref.wrapMode;
                },
                set: function (value) {
                    this.ref.wrapMode = value;
                }
            }
        },
        ctors: {
            ctor: function (ref, name) {
                this.$initialize();
                MiniGameAdaptor.Motion.ctor.call(this);

                if (ref instanceof engine.AnimationClip) {
                    this.ref = ref;
                    this.name = name;
                }
            }
        },
        methods: {
            AddEvent: function (evt) {
                throw new System.Exception("not impl");
            },
            ClearCurves: function () {
                throw new System.Exception("not impl");
            },
            EnsureQuaternionContinuity: function () {
                throw new System.Exception("not impl");
            },
            SampleAnimation: function (go, time) {
                throw new System.Exception("not impl");
            },
            SetCurve: function (relativePath, type, propertyName, curve) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.AnimationClip')(MiniGameAdaptor.AnimationClip);
Object.defineProperty(MiniGameAdaptor.AnimationClip.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.AnimationClip.prototype.__properties }
})
// MiniGameAdaptor.AnimationClip.prototype.__properties.ref = { type: "AnimationClip" };
