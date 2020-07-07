Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Shader", {
        inherits: [MiniGameAdaptor.Object],
        fields: {
            ref: null
        },
        statics: {
            props: {
                globalMaximumLOD: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                globalRenderPipeline: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                DisableKeyword: function (keyword) {
                    // throw new System.Exception("not impl");
                },
                EnableKeyword: function (keyword) {
                    // throw new System.Exception("not impl");
                },
                Find: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalColor: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalColor$1: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalFloat: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalFloat$1: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalFloatArray: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalFloatArray$1: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalFloatArray$2: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                GetGlobalFloatArray$3: function (name, values) {
                    throw new System.Exception("not impl");
                },
                GetGlobalInt: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalInt$1: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalMatrix: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalMatrix$1: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalMatrixArray: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                GetGlobalMatrixArray$1: function (name, values) {
                    throw new System.Exception("not impl");
                },
                GetGlobalMatrixArray$2: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalMatrixArray$3: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalTexture: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalTexture$1: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalVector: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalVector$1: function (name) {
                    throw new System.Exception("not impl");
                },
                GetGlobalVectorArray: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                GetGlobalVectorArray$1: function (name, values) {
                    throw new System.Exception("not impl");
                },
                GetGlobalVectorArray$2: function (nameID) {
                    throw new System.Exception("not impl");
                },
                GetGlobalVectorArray$3: function (name) {
                    throw new System.Exception("not impl");
                },
                IsKeywordEnabled: function (keyword) {
                    throw new System.Exception("not impl");
                },
                PropertyToID: function (name) {
                    throw new System.Exception("not impl");
                },
                SetGlobalBuffer: function (nameID, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalBuffer$1: function (name, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalColor: function (nameID, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalColor$1: function (name, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalFloat: function (nameID, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalFloat$1: function (name, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalFloatArray: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalFloatArray$1: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalFloatArray$2: function (name, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalFloatArray$3: function (name, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalInt: function (nameID, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalInt$1: function (name, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalMatrix: function (nameID, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalMatrix$1: function (name, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalMatrixArray: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalMatrixArray$1: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalMatrixArray$2: function (name, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalMatrixArray$3: function (name, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalTexture: function (nameID, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalTexture$1: function (name, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalVector: function (nameID, value) {
                    throw new System.Exception("not impl");
                },
                SetGlobalVector$1: function (name, value) {
                    // throw new System.Exception("not impl");
                },
                SetGlobalVectorArray: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalVectorArray$1: function (nameID, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalVectorArray$2: function (name, values) {
                    throw new System.Exception("not impl");
                },
                SetGlobalVectorArray$3: function (name, values) {
                    throw new System.Exception("not impl");
                },
                WarmupAllShaders: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        props: {
            isSupported: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            maximumLOD: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            renderQueue: {
                get: function () {
                    return this.ref._defaultRenderQueue;
                }
            }
        },
        ctors: {
            ctor: function (ref) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);

                this.ref = ref;
            }
        },
    });
});

 
