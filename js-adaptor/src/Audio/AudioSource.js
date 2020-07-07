Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AudioSource", {
        inherits: [MiniGameAdaptor.AudioBehaviour],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    // return comp;
                    if (!data || !data._clip) {
                        return comp;
                    }
                    if (typeof(data) === 'number') {
                        data = builtContext.components.data[data];
                    }
                    var path = engine.loader.getAsset(data._clip).value;
                    comp._clip = new MiniGameAdaptor.AudioClip();
                    comp._clip.src = path;
                    // comp._clip.src = 'http://file.52lishi.com/file/yinxiao/ly-17-06-21-33.mp3';
                    // comp._clip.src = 'https://www.sx95113.com/upload/file/c72c221f-9372-4a99-8c86-b49083c9c429.mp3';
                    comp._playOnAwake = data._playOnAwake;
                    comp._loop = data._loop;
                    comp._mute = data._mute;
                    comp._volume = data._volume;
                    comp.initAudio();
                    return comp;
                },
                PlayClipAtPoint: function (clip, position) {
                    throw new System.Exception("not impl");
                },
                PlayClipAtPoint$1: function (clip, position, volume) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            _clip: null,
            _mute: false,
            _playOnAwake : false,
            _loop : false,
            _volume : 1,
            _playing : false,
        },
        props: {
            bypassEffects: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bypassListenerEffects: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bypassReverbZones: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            clip: {
                get: function () {
                    return this._clip
                },
                set: function (value) {
                    this._clip = value
                    this._audioContext.src = value ? value.src : null;
                }
            },
            dopplerLevel: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            ignoreListenerPause: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            ignoreListenerVolume: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isPlaying: {
                get: function () {
                    return this._playing
                    // throw new System.Exception("not impl");
                }
            },
            isVirtual: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            loop: {
                get: function () {
                    return this._loop
                },
                set: function (value) {
                    if(this._loop == value){
                        return;
                    }
                    this._loop = value
                    this._audioContext.loop = value
                }
            },
            maxDistance: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            minDistance: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            mute: {
                get: function () {
                    return this._mute
                },
                set: function (value) {
                    if (value === this._mute) {
                        return
                    }

                    this._mute = value
                    if (value) {
                        this._audioContext.volume = this._volume
                    } else {
                        this._audioContext.volume = 0
                    }
                }
            },
            outputAudioMixerGroup: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            panStereo: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pitch: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            playOnAwake: {
                get: function () {
                    return this._playOnAwake
                    // throw new System.Exception("not impl");
                },
                set: function (value) {
                    this._playOnAwake = value
                    // throw new System.Exception("not impl");
                }
            },
            // priority: {
            //     get: function () {
            //         throw new System.Exception("not impl");
            //     },
            //     set: function (value) {
            //         throw new System.Exception("not impl");
            //     }
            // },
            reverbZoneMix: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rolloffMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spatialBlend: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spatialize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spatializePostEffects: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spread: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            time: {
                get: function () {
                    if(MiniGameAdaptor.closeAudio){
                        return 0;
                    }
                    else{
                        return this._audioContext.currentTime
                    }
                },
                set: function (value) {
                    if(MiniGameAdaptor.closeAudio){
                    }
                    else{
                        this._audioContext.seek(value)
                    }
                }
            },
            timeSamples: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            velocityUpdateMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            volume: {
                get: function () {
                    return this._volume
                },
                set: function (value) {
                    if(this._volume != value){
                        this._volume = value
    
                        if (!this._mute) {
                            this._audioContext.volume = value
                        }
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.AudioBehaviour.ctor.call(this);
                
                if(MiniGameAdaptor.closeAudio){
                    this._audioContext = {};
                }
                else{
                    this._audioContext = wx.createInnerAudioContext();
                }
            }
        },
        methods: {
            initAudio:function(){
                if(MiniGameAdaptor.closeAudio){
                    this._audioContext = {};
                    return;
                }
                // console.log("AudioSource createInnerAudioContext src:" + this._clip.src);
                this._audioContext = wx.createInnerAudioContext();
                this._audioContext.onPlay(() => {
                    // console.log('AudioSource onPlay')
                    // console.log('AudioSource onPlay duration:' + this._audioContext.duration)
                    this._clip.length = this._audioContext.duration;
                    this._playing = true;
                });
                this._audioContext.onError((res) => {
                    // console.log('AudioSource onError errCode:' + res.errCode + ',errMsg:' + res.errMsg)
                    this._playing = false;
                });
                this._audioContext.onCanplay(() => {
                    // console.log('AudioSource onCanplay')
                    // console.log('AudioSource onCanplay duration:' + this._audioContext.duration)
                    this._clip.length = this._audioContext.duration;
                });
                this._audioContext.onEnded(() => {
                    // console.log('AudioSource onEnded')
                    // console.log('AudioSource onEnded duration:' + this._audioContext.duration)
                    this._clip.length = this._audioContext.duration;
                    this._playing = false;
                });
                this._audioContext.onPause(() => {
                    // console.log('AudioSource onPause')
                    // console.log('AudioSource onPause duration:' + this._audioContext.duration)
                    this._clip.length = this._audioContext.duration;
                    this._playing = false;
                });
                this._audioContext.onStop(() => {
                    // console.log('AudioSource onStop')
                    this._playing = false;
                });
                // this._audioContext.src = this._clip.src
                //file:///类型的数据ide 播放不出,还会导致 url 类型的也播放失败
                this._audioContext.src = this._clip.src
                this._audioContext.loop = this._loop
                if (this._mute) {
                    this._audioContext.volume = 0
                } else if (typeof this._volume === 'number') {
                    this._audioContext.volume = this._volume
                }

                if(this._playOnAwake){
                    this._audioContext.play();
                }
            },
            GetAmbisonicDecoderFloat: function (index, value) {
                throw new System.Exception("not impl");
            },
            GetCustomCurve: function (type) {
                throw new System.Exception("not impl");
            },
            GetOutputData: function (samples, channel) {
                throw new System.Exception("not impl");
            },
            GetSpatializerFloat: function (index, value) {
                throw new System.Exception("not impl");
            },
            GetSpectrumData: function (samples, channel, $window) {
                throw new System.Exception("not impl");
            },
            Pause: function () {
                if(MiniGameAdaptor.closeAudio){
                    return;
                }
                // console.log("AudioSource pause");
                this._audioContext.pause()
            },
            Play: function () {
                if(MiniGameAdaptor.closeAudio){
                    return;
                }
                // console.log("AudioSource play");
                this._audioContext.play()
            },
            Play$1: function (delay) {
                throw new System.Exception("not impl");
            },
            PlayDelayed: function (delay) {
                throw new System.Exception("not impl");
            },
            PlayOneShot: function (clip) {
                if(MiniGameAdaptor.closeAudio){
                    return;
                }
                this._audioContextOneShot = wx.createInnerAudioContext();
                this._audioContextOneShot.onPlay(() => {
                    // console.log('AudioSourceOneShot onPlay')
                });
                this._audioContextOneShot.onError((res) => {
                    // console.log('AudioSourceOneShot onError errCode:' + res.errCode + ',errMsg:' + res.errMsg)
                });
                this._audioContextOneShot.onCanplay(() => {
                    // console.log('AudioSourceOneShot onCanplay')
                });
                this._audioContextOneShot.onEnded(() => {
                    // console.log('AudioSourceOneShot onEnded')
                });
                this._audioContextOneShot.onPause(() => {
                    // console.log('AudioSourceOneShot onPause')
                });
                this._audioContextOneShot.onStop(() => {
                    // console.log('AudioSourceOneShot onStop')
                });
                //src 如果未Deserialize,这里会挂,需要外部保证参数有效
                // console.log("AudioSourceOneShot PlayOneShot src:" + clip.src);
                this._audioContextOneShot.src = clip.src
                this._audioContextOneShot.loop = false

                this._audioContextOneShot.play();
            },
            PlayOneShot$1: function (clip, volumeScale) {
                if(MiniGameAdaptor.closeAudio){
                    return;
                }
                this._audioContextOneShotVolume = wx.createInnerAudioContext();
                this._audioContextOneShotVolume.onPlay(() => {
                    // console.log('AudioSourceOneShotVolume onPlay')
                });
                this._audioContextOneShotVolume.onError((res) => {
                    // console.log('AudioSourceOneShotVolume onError errCode:' + res.errCode + ',errMsg:' + res.errMsg)
                });
                this._audioContextOneShotVolume.onCanplay(() => {
                    // console.log('AudioSourceOneShotVolume onCanplay')
                });
                this._audioContextOneShotVolume.onEnded(() => {
                    // console.log('AudioSourceOneShotVolume onEnded')
                });
                this._audioContextOneShotVolume.onPause(() => {
                    // console.log('AudioSourceOneShotVolume onPause')
                });
                this._audioContextOneShotVolume.onStop(() => {
                    // console.log('AudioSourceOneShotVolume onStop')
                });
                //src 如果未Deserialize,这里会挂,需要外部保证参数有效
                // console.log("AudioSourceOneShotVolume PlayOneShot src:" + clip.src + ',volumeScale:'+ volumeScale);
                this._audioContextOneShotVolume.src = clip.src
                // this._audioContextOneShotVolume.src = 'http://file.52lishi.com/file/yinxiao/ly-17-06-21-33.mp3'
                this._audioContextOneShotVolume.loop = false
                this._audioContextOneShotVolume.volume = volumeScale

                this._audioContextOneShotVolume.play();
            },
            PlayScheduled: function (time) {
                throw new System.Exception("not impl");
            },
            SetAmbisonicDecoderFloat: function (index, value) {
                throw new System.Exception("not impl");
            },
            SetCustomCurve: function (type, curve) {
                throw new System.Exception("not impl");
            },
            SetScheduledEndTime: function (time) {
                throw new System.Exception("not impl");
            },
            SetScheduledStartTime: function (time) {
                throw new System.Exception("not impl");
            },
            SetSpatializerFloat: function (index, value) {
                throw new System.Exception("not impl");
            },
            Stop: function () {
                if(MiniGameAdaptor.closeAudio){
                    return;
                }
                // console.log("AudioSource stop");
                this._audioContext.stop()
            },
            UnPause: function () {
                if(MiniGameAdaptor.closeAudio){
                    return;
                }
                // console.log("AudioSource UnPause");
                this._audioContext.play()
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.AudioSource')(MiniGameAdaptor.AudioSource);
Object.defineProperty(MiniGameAdaptor.AudioSource.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.AudioSource.prototype.__properties }
})
MiniGameAdaptor.AudioSource.prototype.__properties._clip = { type: "string" };
MiniGameAdaptor.AudioSource.prototype.__properties._mute = { type: "boolean" };
MiniGameAdaptor.AudioSource.prototype.__properties._playOnAwake = { type: "boolean" };
MiniGameAdaptor.AudioSource.prototype.__properties._loop = { type: "boolean" };
MiniGameAdaptor.AudioSource.prototype.__properties._volume = { type: "number" };
