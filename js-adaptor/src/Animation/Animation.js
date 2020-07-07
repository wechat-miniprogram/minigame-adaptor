Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Animation", {
        inherits: [MiniGameAdaptor.Behaviour,System.Collections.IEnumerable],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    return MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);
                }
            }
        },
        fields: {
            ref: null,
            _clip: null,
            _clips: null,
            _animationsState: []
        },
        props: {
            animatePhysics: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            name: {
                get: function() {
                    return this.ref.clip;
                }
            },
            clip: {
                get: function () {
                    this.__initClips();

                    if (!this._clip) {
                        this._clip = this._clips[this.ref.clip];
                    }

                    return this._clip;
                },
                set: function (value) {
                    let c = this.clip;
                    // if (c) {
                    //     this.ref.clip = 
                    // }
                }
            },
            cullingType: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isPlaying: {
                get: function () {
                    return this.ref.isPlaying;
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
            playAutomatically: {
                get: function () {
                    return this.ref.autoPlay;
                },
                set: function (value) {
                    this.ref.autoPlay = value;
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
            ctor: function (animation) {
                this.$initialize();
                MiniGameAdaptor.Behaviour.ctor.call(this);

                if (animation instanceof engine.Animation) {
                    this.ref = animation;
                    Object.entries(this.ref.clips).forEach(c => {
                        let clip = new MiniGameAdaptor.AnimationClip(c[1], c[0]);
                        this._clips[c[0]] = clip;
                        this._animationsState.push(new MiniGameAdaptor.AnimationState.$ctor1(clip));
                    });
                }
            }
        },
        methods: {
            getItem: function (name) {
                // return (name && this._animationsState[name]) ? this._animationsState[name] : null;
                this.__initClips();
                return this._clips[name];
            },
            AddClip: function (clip, newName) {
                throw new System.Exception("not impl");
            },
            AddClip$1: function (clip, newName, firstFrame, lastFrame) {
                throw new System.Exception("not impl");
            },
            AddClip$2: function (clip, newName, firstFrame, lastFrame, addLoopFrame) {
                throw new System.Exception("not impl");
            },
            Blend: function (animation) {
                throw new System.Exception("not impl");
            },
            Blend$1: function (animation, targetWeight) {
                throw new System.Exception("not impl");
            },
            Blend$2: function (animation, targetWeight, fadeLength) {
                throw new System.Exception("not impl");
            },
            CrossFade: function (animation) {
                throw new System.Exception("not impl");
            },
            CrossFade$1: function (animation, fadeLength) {
                throw new System.Exception("not impl");
            },
            CrossFade$2: function (animation, fadeLength, mode) {
                throw new System.Exception("not impl");
            },
            CrossFadeQueued: function (animation) {
                throw new System.Exception("not impl");
            },
            CrossFadeQueued$1: function (animation, fadeLength) {
                throw new System.Exception("not impl");
            },
            CrossFadeQueued$2: function (animation, fadeLength, queue) {
                throw new System.Exception("not impl");
            },
            CrossFadeQueued$3: function (animation, fadeLength, queue, mode) {
                throw new System.Exception("not impl");
            },
            GetClip: function (name) {
                return this.getItem(name);
            },
            GetClipCount: function () {
                throw new System.Exception("not impl");
            },
            GetEnumerator: function () {
                return new (MiniGameAdaptor.Animation.Enumerator()).$ctor1(this);
            },
            System$Collections$IEnumerable$GetEnumerator: function () {
                throw new System.Exception("Exception");
            },
            IsPlaying: function (name) {
                return this.ref.playingClip === name;
            },
            Play: function () {
                this.ref.play();
            },
            Play$1: function (animation) {
                this.ref.play(animation);
            },
            Play$2: function (animation, mode) {
                if (mode === MiniGameAdaptor.PlayMode.StopAll) {
                    this.ref.stop();
                }
                this.ref.play(animation);
            },
            Play$3: function (mode) {
                if (mode === MiniGameAdaptor.PlayMode.StopAll) {
                    this.ref.stop();
                }
                this.ref.play();
            },
            PlayQueued: function (animation) {
                // 这里先直接play
                this.ref.play(animation);
            },
            PlayQueued$1: function (animation, queue) {
                throw new System.Exception("not impl");
            },
            PlayQueued$2: function (animation, queue, mode) {
                throw new System.Exception("not impl");
            },
            RemoveClip: function (clipName) {
                throw new System.Exception("not impl");
            },
            RemoveClip$1: function (clip) {
                throw new System.Exception("not impl");
            },
            Rewind: function () {
                this.ref.stop();
                this.ref.play();
            },
            Rewind$1: function (name) {
                this.ref.stop();
                this.ref.play(name);
            },
            Sample: function () {
                // how to impl?
                // throw new System.Exception("not impl");
            },
            Stop: function () {
                this.ref.stop();
            },
            Stop$1: function (name) {
                throw new System.Exception("not impl");
            },
            SyncLayer: function (layer) {
                throw new System.Exception("not impl");
            },
            __initClips: function() {
                if (!this._clips) {
                    this._clips = {};
                    Object.entries(this.ref.clips).forEach(c => {
                        this._clips[c[0]] = new MiniGameAdaptor.AnimationClip(c[1], c[0]);
                    });
                }
            },
            __getStateAtIndex: function(i) {
                if (i > -1 && i < this._animationsState.length) {
                    return this._animationsState[i];
                }
                return null;
            },
            __getStateCount: function() {
                return this._animationsState.length;
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Animation')(MiniGameAdaptor.Animation);
Object.defineProperty(MiniGameAdaptor.Animation.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Animation.prototype.__properties }
})
MiniGameAdaptor.Animation.prototype.__properties.ref = { type: "Animation" };
