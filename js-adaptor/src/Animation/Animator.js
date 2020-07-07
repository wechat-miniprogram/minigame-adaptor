Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Animator", {
        inherits: [MiniGameAdaptor.Behaviour],
        statics: {
            fields: {
                hash_id:0,
                name_map:null
            },
            ctors: {
                init: function () {
                    this.name_map = new Map();
                }
            },
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                },
                StringToHash: function (name) {
                    var exist  = false;
                    for (var val of this.name_map) { 
                        if(val[1] == name){
                            exist = true;
                            return val[0];
                        }
                    }
                    if(exist == false){
                        this.hash_id++;
                        this.name_map.set(this.hash_id, name);
                        return this.hash_id;
                    }
                },
                getHashName: function (id){
                    var name = this.name_map.get(id);
                    return name;
                }
            }
        },
        fields: {
            // _ref: null
            ref: null
        },
        props: {           
            // ref: {
            //     get: function () {
            //         if (!this._ref) {
            //             this._ref = this.entity.getComponent(engine.Animator);
            //         }
            //         return this._ref;
            //     },
            //     set: function (value) {
            //         this._ref = value;
            //     }
            // },
            angularVelocity: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            applyRootMotion: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            avatar: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bodyPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bodyRotation: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            cullingMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            deltaPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            deltaRotation: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            feetPivotActive: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fireEvents: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            gravityWeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasBoundPlayables: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasRootMotion: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasTransformHierarchy: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            humanScale: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isHuman: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isInitialized: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isMatchingTarget: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isOptimizable: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            keepAnimatorControllerStateOnDisable: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            layerCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            layersAffectMassCenter: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            leftFeetBottomHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            logWarnings: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            parameterCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            parameters: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pivotPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pivotWeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            playableGraph: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            playbackTime: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            recorderMode: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            recorderStartTime: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            recorderStopTime: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rightFeetBottomHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            rootPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rootRotation: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            runtimeAnimatorController: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            speed: {
                get: function () {
                    return this.ref.speed;
                },
                set: function (value) {
                    this.ref.speed = value;
                }
            },
            stabilizeFeet: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            targetPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            targetRotation: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            updateMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            velocity: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (animator) {
                this.$initialize();
                MiniGameAdaptor.Behaviour.ctor.call(this);
                if (animator instanceof engine.Animator) {
                    this.ref = animator;
                }
            }
        },
        methods: {
            ApplyBuiltinRootMotion: function () {
                throw new System.Exception("not impl");
            },
            CrossFade: function (stateHashName, normalizedTransitionDuration) {
                throw new System.Exception("not impl");
            },
            CrossFade$1: function (stateHashName, normalizedTransitionDuration, layer) {
                throw new System.Exception("not impl");
            },
            CrossFade$2: function (stateHashName, normalizedTransitionDuration, layer, normalizedTimeOffset) {
                throw new System.Exception("not impl");
            },
            CrossFade$3: function (stateHashName, normalizedTransitionDuration, layer, normalizedTimeOffset, normalizedTransitionTime) {
                throw new System.Exception("not impl");
            },
            CrossFade$4: function (stateName, normalizedTransitionDuration) {
                throw new System.Exception("not impl");
            },
            CrossFade$5: function (stateName, normalizedTransitionDuration, layer) {
                throw new System.Exception("not impl");
            },
            CrossFade$6: function (stateName, normalizedTransitionDuration, layer, normalizedTimeOffset) {
                throw new System.Exception("not impl");
            },
            CrossFade$7: function (stateName, normalizedTransitionDuration, layer, normalizedTimeOffset, normalizedTransitionTime) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime: function (stateHashName, fixedTransitionDuration) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime$1: function (stateHashName, fixedTransitionDuration, layer) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime$2: function (stateHashName, fixedTransitionDuration, layer, fixedTimeOffset) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime$3: function (stateHashName, fixedTransitionDuration, layer, fixedTimeOffset, normalizedTransitionTime) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime$4: function (stateName, fixedTransitionDuration) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime$5: function (stateName, fixedTransitionDuration, layer) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime$6: function (stateName, fixedTransitionDuration, layer, fixedTimeOffset) {
                throw new System.Exception("not impl");
            },
            CrossFadeInFixedTime$7: function (stateName, fixedTransitionDuration, layer, fixedTimeOffset, normalizedTransitionTime) {
                throw new System.Exception("not impl");
            },
            GetAnimatorTransitionInfo: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetBehaviour: function (T) {
                throw new System.Exception("not impl");
            },
            GetBehaviours: function (T) {
                throw new System.Exception("not impl");
            },
            GetBehaviours$1: function (fullPathHash, layerIndex) {
                throw new System.Exception("not impl");
            },
            GetBoneTransform: function (humanBoneId) {
                throw new System.Exception("not impl");
            },
            GetBool: function (id) {
                throw new System.Exception("not impl");
            },
            GetBool$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetCurrentAnimatorClipInfo: function (layerIndex, clips) {
                throw new System.Exception("not impl");
            },
            GetCurrentAnimatorClipInfo$1: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetCurrentAnimatorClipInfoCount: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetCurrentAnimatorStateInfo: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetFloat: function (id) {
                throw new System.Exception("not impl");
            },
            GetFloat$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetIKHintPosition: function (hint) {
                throw new System.Exception("not impl");
            },
            GetIKHintPositionWeight: function (hint) {
                throw new System.Exception("not impl");
            },
            GetIKPosition: function (goal) {
                throw new System.Exception("not impl");
            },
            GetIKPositionWeight: function (goal) {
                throw new System.Exception("not impl");
            },
            GetIKRotation: function (goal) {
                throw new System.Exception("not impl");
            },
            GetIKRotationWeight: function (goal) {
                throw new System.Exception("not impl");
            },
            GetInteger: function (id) {
                throw new System.Exception("not impl");
            },
            GetInteger$1: function (name) {
                throw new System.Exception("not impl");
            },
            GetLayerIndex: function (layerName) {
                let result = null;
                this.ref.layers.forEach(layer => {
                    if (layer.name === layerName) {
                        result = layer.name;
                        return;
                    }
                });
                return result;
            },
            GetLayerName: function (layerIndex) {
                return this.ref.layers.length >= layerIndex ? this.ref.layers[layerIndex] : null;
            },
            GetLayerWeight: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetNextAnimatorClipInfo: function (layerIndex, clips) {
                throw new System.Exception("not impl");
            },
            GetNextAnimatorClipInfo$1: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetNextAnimatorClipInfoCount: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetNextAnimatorStateInfo: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            GetParameter: function (index) {
                throw new System.Exception("not impl");
            },
            HasState: function (layerIndex, stateID) {
                throw new System.Exception("not impl");
            },
            InterruptMatchTarget: function () {
                throw new System.Exception("not impl");
            },
            InterruptMatchTarget$1: function (completeMatch) {
                throw new System.Exception("not impl");
            },
            IsInTransition: function (layerIndex) {
                throw new System.Exception("not impl");
            },
            IsParameterControlledByCurve: function (id) {
                throw new System.Exception("not impl");
            },
            IsParameterControlledByCurve$1: function (name) {
                throw new System.Exception("not impl");
            },
            MatchTarget: function (matchPosition, matchRotation, targetBodyPart, weightMask, startNormalizedTime) {
                throw new System.Exception("not impl");
            },
            MatchTarget$1: function (matchPosition, matchRotation, targetBodyPart, weightMask, startNormalizedTime, targetNormalizedTime) {
                throw new System.Exception("not impl");
            },
            Play: function (stateNameHash) {
                throw new System.Exception("not impl");
            },
            Play$1: function (stateNameHash, layer) {
                throw new System.Exception("not impl");
            },
            Play$2: function (stateNameHash, layer, normalizedTime) {
                throw new System.Exception("not impl");
            },
            Play$3: function (stateName) {
                this.Play$4(stateName, 0);
            },
            Play$4: function (stateName, layer) {
                const layerName = this.GetLayerName(layer);
                if (layerName) {
                    this.ref.play('Base Layer.' + stateName);
                } else {
                    this.ref.play(layerName + '.' + stateName);
                }
            },
            Play$5: function (stateName, layer, normalizedTime) {
                throw new System.Exception("not impl");
            },
            PlayInFixedTime: function (stateNameHash) {
                throw new System.Exception("not impl");
            },
            PlayInFixedTime$1: function (stateNameHash, layer) {
                throw new System.Exception("not impl");
            },
            PlayInFixedTime$2: function (stateNameHash, layer, fixedTime) {
                throw new System.Exception("not impl");
            },
            PlayInFixedTime$3: function (stateName) {
                throw new System.Exception("not impl");
            },
            PlayInFixedTime$4: function (stateName, layer) {
                throw new System.Exception("not impl");
            },
            PlayInFixedTime$5: function (stateName, layer, fixedTime) {
                throw new System.Exception("not impl");
            },
            Rebind: function () {
                throw new System.Exception("not impl");
            },
            ResetTrigger: function (id) {
                throw new System.Exception("not impl");
            },
            ResetTrigger$1: function (name) {
                throw new System.Exception("not impl");
            },
            SetBoneLocalRotation: function (humanBoneId, rotation) {
                throw new System.Exception("not impl");
            },
            SetBool: function (id, value) {
                var name = MiniGameAdaptor.Animator.getHashName(id);
                this.ref.setBool(name, value);
            },
            SetBool$1: function (name, value) {
                this.ref.setBool(name, value);
            },
            SetFloat: function (id, value) {
                var name = MiniGameAdaptor.Animator.getHashName(id);
                this.ref.setFloat(name, value);
            },
            SetFloat$1: function (id, value, dampTime, deltaTime) {
                var name = MiniGameAdaptor.Animator.getHashName(id);
                this.ref.setFloat(name, value);
            },
            SetFloat$2: function (name, value) {
                this.ref.setFloat(name, value);
            },
            SetFloat$3: function (name, value, dampTime, deltaTime) {
                this.ref.setFloat(name, value);
            },
            SetIKHintPosition: function (hint, hintPosition) {
                throw new System.Exception("not impl");
            },
            SetIKHintPositionWeight: function (hint, value) {
                throw new System.Exception("not impl");
            },
            SetIKPosition: function (goal, goalPosition) {
                throw new System.Exception("not impl");
            },
            SetIKPositionWeight: function (goal, value) {
                throw new System.Exception("not impl");
            },
            SetIKRotation: function (goal, goalRotation) {
                throw new System.Exception("not impl");
            },
            SetIKRotationWeight: function (goal, value) {
                throw new System.Exception("not impl");
            },
            SetInteger: function (id, value) {
                var name = MiniGameAdaptor.Animator.getHashName(id);
                this.ref.setInteger(name, value);
            },
            SetInteger$1: function (name, value) {
                this.ref.setInteger(name, value);
            },
            SetLayerWeight: function (layerIndex, weight) {
                throw new System.Exception("not impl");
            },
            SetLookAtPosition: function (lookAtPosition) {
                throw new System.Exception("not impl");
            },
            SetLookAtWeight: function (weight) {
                throw new System.Exception("not impl");
            },
            SetLookAtWeight$1: function (weight, bodyWeight) {
                throw new System.Exception("not impl");
            },
            SetLookAtWeight$2: function (weight, bodyWeight, headWeight) {
                throw new System.Exception("not impl");
            },
            SetLookAtWeight$3: function (weight, bodyWeight, headWeight, eyesWeight) {
                throw new System.Exception("not impl");
            },
            SetLookAtWeight$4: function (weight, bodyWeight, headWeight, eyesWeight, clampWeight) {
                throw new System.Exception("not impl");
            },
            SetTarget: function (targetIndex, targetNormalizedTime) {
                throw new System.Exception("not impl");
            },
            SetTrigger: function (id) {
                throw new System.Exception("not impl");
            },
            SetTrigger$1: function (name) {
                throw new System.Exception("not impl");
            },
            StartPlayback: function () {
                throw new System.Exception("not impl");
            },
            StartRecording: function (frameCount) {
                throw new System.Exception("not impl");
            },
            StopPlayback: function () {
                throw new System.Exception("not impl");
            },
            StopRecording: function () {
                throw new System.Exception("not impl");
            },
            Update: function (deltaTime) {
                throw new System.Exception("not impl");
            },
            WriteDefaultValues: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});


engine.decorators.serialize('MiniGameAdaptor.Animator')(MiniGameAdaptor.Animator);
Object.defineProperty(MiniGameAdaptor.Animator.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Animator.prototype.__properties }
})
// MiniGameAdaptor.Animator.prototype.__properties.ref = { type: "Animator" };
