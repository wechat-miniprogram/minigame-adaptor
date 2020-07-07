Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.ParticleSystem", {
        inherits: [MiniGameAdaptor.Component],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                },
                ResetPreMappedBufferMemory: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            ref: null
        },
        props: {
            collision: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            colorBySpeed: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            colorOverLifetime: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            customData: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            emission: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            externalForces: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            forceOverLifetime: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            inheritVelocity: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isEmitting: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isPaused: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isPlaying: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isStopped: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            lights: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            limitVelocityOverLifetime: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            main: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            noise: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            particleCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            proceduralSimulationSupported: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            randomSeed: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rotationBySpeed: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            rotationOverLifetime: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            shape: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            sizeBySpeed: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            sizeOverLifetime: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            subEmitters: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            textureSheetAnimation: {
                get: function () {
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
            trails: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            trigger: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            useAutoRandomSeed: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            velocityOverLifetime: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (ref) {
                this.$initialize();
                MiniGameAdaptor.Component.ctor.call(this);
                
                if (ref instanceof engine.Particle) {
                    this.ref = ref;
                }
            }
        },
        methods: {
            Clear: function () {
                throw new System.Exception("not impl");
            },
            Clear$1: function (withChildren) {
                throw new System.Exception("not impl");
            },
            Emit: function (count) {
                throw new System.Exception("not impl");
            },
            Emit$1: function (emitParams, count) {
                throw new System.Exception("not impl");
            },
            GetParticles: function (particles) {
                throw new System.Exception("not impl");
            },
            GetParticles$1: function (particles, size) {
                throw new System.Exception("not impl");
            },
            GetParticles$2: function (particles, size, offset) {
                throw new System.Exception("not impl");
            },
            IsAlive: function () {
                throw new System.Exception("not impl");
            },
            IsAlive$1: function (withChildren) {
                throw new System.Exception("not impl");
            },
            Pause: function () {
                this.ref.emitter.start = false;
            },
            Pause$1: function (withChildren) {
                if (withChildren) {
                    this.ref.entity.transform.travelChild(child => {
                        let particleComp = null;
                        if (particleComp = child.entity.getComponent(engine.Particle)) {
                            particleComp.emitter.start = false;
                        }
                    });
                } else {
                    this.ref.emitter.start = false;
                }
            },
            Play: function () {
                this.ref.emitter.start = true;
            },
            Play$1: function (withChildren) {
                if (withChildren) {
                    this.ref.entity.transform.travelChild(child => {
                        let particleComp = null;
                        if (particleComp = child.entity.getComponent(engine.Particle)) {
                            particleComp.emitter.start = true;
                        }
                    });
                } else {
                    this.ref.emitter.start = true;
                }
            },
            SetParticles: function (particles) {
                throw new System.Exception("not impl");
            },
            SetParticles$1: function (particles, size) {
                throw new System.Exception("not impl");
            },
            SetParticles$2: function (particles, size, offset) {
                throw new System.Exception("not impl");
            },
            Simulate: function (t) {
                throw new System.Exception("not impl");
            },
            Simulate$1: function (t, withChildren) {
                throw new System.Exception("not impl");
            },
            Simulate$2: function (t, withChildren, restart) {
                throw new System.Exception("not impl");
            },
            Simulate$3: function (t, withChildren, restart, fixedTimeStep) {
                throw new System.Exception("not impl");
            },
            Stop: function () {
                this.ref.emitter.start = false;
            },
            Stop$1: function (withChildren) {
                throw new System.Exception("not impl");
            },
            Stop$2: function (withChildren, stopBehavior) {
                throw new System.Exception("not impl");
            },
            TriggerSubEmitter: function (subEmitterIndex) {
                throw new System.Exception("not impl");
            },
            TriggerSubEmitter$1: function (subEmitterIndex, particle) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.ParticleSystem')(MiniGameAdaptor.ParticleSystem);
Object.defineProperty(MiniGameAdaptor.ParticleSystem.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.ParticleSystem.prototype.__properties }
})
// MiniGameAdaptor.ParticleSystem.prototype.__properties.ref = { type: "Particle" };