Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AnimationState", {
        inherits: [MiniGameAdaptor.TrackedReference],
        fields: {
            _clip: null
        },
        props: {
            blendMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            clip: {
                get: function () {
                    return this._clip;
                }
            },
            enabled: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            layer: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            length: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            name: {
                get: function () {
                    return this.clip.name;
                },
                set: function (value) {
                    this.clip.name = value;
                }
            },
            normalizedSpeed: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            normalizedTime: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            speed: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            time: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            weight: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            wrapMode: {
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
                MiniGameAdaptor.TrackedReference.ctor.call(this);
                // throw new System.Exception("not impl");
            },
            $ctor1: function (clip) {
                this.$initialize();
                MiniGameAdaptor.TrackedReference.ctor.call(this);
                this._clip = clip;
            }
        },
        methods: {
            AddMixingTransform: function (mix) {
                throw new System.Exception("not impl");
            },
            AddMixingTransform$1: function (mix, recursive) {
                throw new System.Exception("not impl");
            },
            RemoveMixingTransform: function (mix) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.AnimationState')(MiniGameAdaptor.AnimationState);
Object.defineProperty(MiniGameAdaptor.AnimationState.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.AnimationState.prototype.__properties }
})
 
