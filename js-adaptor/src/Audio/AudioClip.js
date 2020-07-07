Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AudioClip", {
        inherits: [MiniGameAdaptor.Object],
        statics: {
            methods: {
                Deserialize: function(data, comp) {
                    console.log("AudioClip Deserialize");
                    comp._src = data._src;
                    // comp._src = 'http://file.52lishi.com/file/yinxiao/ly-17-06-21-33.mp3';
                    return comp;
                },
                Create: function (name, lengthSamples, channels, frequency, stream) {
                    this._frequency = frequency;
                    this._channels = channels;
                },
                Create$1: function (name, lengthSamples, channels, frequency, stream, pcmreadercallback) {
                    throw new System.Exception("not impl");
                },
                Create$2: function (name, lengthSamples, channels, frequency, stream, pcmreadercallback, pcmsetpositioncallback) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            _src: "",
            _length: 0,
            _frequency:0.0,
            _channels:0,
        },
        props: {
            src: {
                get: function () {
                    return this._src;
                },
                set: function (value) {
                    this._src = value;
                }
            },
            ambisonic: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            channels: {
                get: function () {
                    return this._frequency;
                }
            },
            frequency: {
                get: function () {
                    return this._channels;
                }
            },
            length: {
                get: function () {
                    return this._length;
                },
                set: function (value) {
                    this._length = value;
                }
            },
            loadInBackground: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            loadState: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            loadType: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            preloadAudioData: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            samples: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            GetData: function (data, offsetSamples) {
                throw new System.Exception("not impl");
            },
            LoadAudioData: function () {
                throw new System.Exception("not impl");
            },
            SetData: function (data, offsetSamples) {
                throw new System.Exception("not impl");
            },
            UnloadAudioData: function () {
                throw new System.Exception("not impl");
            },
            SetSrc: function (src) {
                this._src = src;
            }
        }
    });
});


