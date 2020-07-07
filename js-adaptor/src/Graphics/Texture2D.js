Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Texture2D", {
        inherits: [MiniGameAdaptor.Texture],
        fields: {
            ref: null
        },
        statics: {
            props: {
                blackTexture: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                whiteTexture: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                GenerateAtlas: function (sizes, padding, atlasSize, results) {
                    throw new System.Exception("not impl");
                }
            }
        },
        props: {
            desiredMipmapLevel: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            format: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isReadable: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            loadedMipmapLevel: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            loadingMipmapLevel: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            mipmapCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            requestedMipmapLevel: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            streamingMipmaps: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            streamingMipmapsPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (width, height) {
                this.$initialize();
                this.ref = new engine.Texture2D();

                /*MiniGameAdaptor.Texture.ctor.call(this);*/
            },
            $ctor1: function (width, height, format, flags) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);
            },
            $ctor2: function (width, height, textureFormat, mipChain) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);
            },
            $ctor3: function (width, height, textureFormat, mipChain, linear) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);
            },
            $ctor4: function (ref) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);
                
                this.ref = ref;
            }
        },
        methods: {
            Apply: function () {
                throw new System.Exception("not impl");
            },
            Apply$1: function (updateMipmaps) {
                throw new System.Exception("not impl");
            },
            Apply$2: function (updateMipmaps, makeNoLongerReadable) {
                throw new System.Exception("not impl");
            },
            ClearRequestedMipmapLevel: function () {
                throw new System.Exception("not impl");
            },
            Compress: function (highQuality) {
                throw new System.Exception("not impl");
            },
            GetPixel: function (x, y) {
                throw new System.Exception("not impl");
            },
            GetPixelBilinear: function (x, y) {
                throw new System.Exception("not impl");
            },
            GetPixels: function () {
                throw new System.Exception("not impl");
            },
            GetPixels$1: function (miplevel) {
                throw new System.Exception("not impl");
            },
            GetPixels$2: function (x, y, blockWidth, blockHeight) {
                throw new System.Exception("not impl");
            },
            GetPixels$3: function (x, y, blockWidth, blockHeight, miplevel) {
                throw new System.Exception("not impl");
            },
            GetPixels32: function () {
                throw new System.Exception("not impl");
            },
            GetPixels32$1: function (miplevel) {
                throw new System.Exception("not impl");
            },
            GetRawTextureData: function () {
                throw new System.Exception("not impl");
            },
            GetRawTextureData$1: function (T) {
                throw new System.Exception("not impl");
            },
            IsRequestedMipmapLevelLoaded: function () {
                throw new System.Exception("not impl");
            },
            LoadRawTextureData: function (data) {
                throw new System.Exception("not impl");
            },
            LoadRawTextureData$1: function (T, data) {
                throw new System.Exception("not impl");
            },
            PackTextures: function (textures, padding) {
                throw new System.Exception("not impl");
            },
            PackTextures$1: function (textures, padding, maximumAtlasSize) {
                throw new System.Exception("not impl");
            },
            PackTextures$2: function (textures, padding, maximumAtlasSize, makeNoLongerReadable) {
                throw new System.Exception("not impl");
            },
            ReadPixels: function (source, destX, destY) {
                throw new System.Exception("not impl");
            },
            ReadPixels$1: function (source, destX, destY, recalculateMipMaps) {
                throw new System.Exception("not impl");
            },
            Resize: function (width, height) {
                throw new System.Exception("not impl");
            },
            Resize$1: function (width, height, format, hasMipMap) {
                throw new System.Exception("not impl");
            },
            SetPixel: function (x, y, color) {
                throw new System.Exception("not impl");
            },
            SetPixels: function (x, y, blockWidth, blockHeight, colors) {
                throw new System.Exception("not impl");
            },
            SetPixels$1: function (x, y, blockWidth, blockHeight, colors, miplevel) {
                throw new System.Exception("not impl");
            },
            SetPixels$2: function (colors) {
                throw new System.Exception("not impl");
            },
            SetPixels$3: function (colors, miplevel) {
                throw new System.Exception("not impl");
            },
            SetPixels32: function (x, y, blockWidth, blockHeight, colors) {
                throw new System.Exception("not impl");
            },
            SetPixels32$1: function (x, y, blockWidth, blockHeight, colors, miplevel) {
                throw new System.Exception("not impl");
            },
            SetPixels32$2: function (colors) {
                throw new System.Exception("not impl");
            },
            SetPixels32$3: function (colors, miplevel) {
                throw new System.Exception("not impl");
            }
        }
    });
});


