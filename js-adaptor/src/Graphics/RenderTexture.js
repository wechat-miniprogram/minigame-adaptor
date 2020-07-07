Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RenderTexture", {
        inherits: [MiniGameAdaptor.Texture],
        statics: {
            props: {
                active: {
                    get: function () {
                        // 自研引擎没有active的概念，默认active
                        return true;
                    },
                    set: function (value) {
                        return true;
                    }
                }
            },
            methods: {
                GetTemporary: function (width, height) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$1: function (width, height, depthBuffer) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$2: function (width, height, depthBuffer, format) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$3: function (width, height, depthBuffer, format, readWrite) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$4: function (width, height, depthBuffer, format, readWrite, antiAliasing) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$5: function (width, height, depthBuffer, format, readWrite, antiAliasing, memorylessMode) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$6: function (width, height, depthBuffer, format, readWrite, antiAliasing, memorylessMode, vrUsage) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$7: function (width, height, depthBuffer, format, readWrite, antiAliasing, memorylessMode, vrUsage, useDynamicScale) {
                    throw new System.Exception("not impl");
                },
                GetTemporary$8: function (desc) {
                    throw new System.Exception("not impl");
                },
                ReleaseTemporary: function (temp) {
                    throw new System.Exception("not impl");
                },
                SupportsStencil: function (rt) {
                    throw new System.Exception("not impl");
                }
            }
        },
        props: {
            antiAliasing: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            autoGenerateMips: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bindTextureMS: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            colorBuffer: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            depth: {
                get: function () {
                    return this.ref._depthPixelFormat;
                },
                set: function (value) {
                    throw new System.Exception("can not set depth");
                }
            },
            depthBuffer: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            descriptor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            dimension: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            enableRandomWrite: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            format: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            height: {
                get: function () {
                    return this.ref.height;
                },
                set: function (value) {
                    throw new System.Exception("height can not be set");
                }
            },
            isPowerOfTwo: {
                get: function () {
                    return (this.width & (this.width - 1)) === 0 && (this.height & (this.height - 1)) === 0;
                },
                set: function (value) {
                    throw new System.Exception("can not set this property");
                }
            },
            memorylessMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sRGB: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            useDynamicScale: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useMipMap: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            volumeDepth: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            vrUsage: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            width: {
                get: function () {
                    return this.ref.width;
                },
                set: function (value) {
                    throw new System.Exception("width can not be set");
                }
            }
        },
        ctors: {
            ctor: function (width, height, depth) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);

                this.ref = new engine.RenderTexture(width, height);
            },
            $ctor1: function (width, height, depth, format) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);

                this.ref = new engine.RenderTexture(width, height);
            },
            $ctor2: function (width, height, depth, format) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);

                this.ref = new engine.RenderTexture(width, height);
            },
            $ctor3: function (width, height, depth, format, readWrite) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);
                this.ref = new engine.RenderTexture(width, height);
            },
            $ctor4: function (textureToCopy) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);
                this.ref = new engine.RenderTexture(width, height);
            },
            $ctor5: function (desc) {
                this.$initialize();
                MiniGameAdaptor.Texture.ctor.call(this);
                this.ref = new engine.RenderTexture(width, height);
            }
        },
        methods: {
            ConvertToEquirect: function (equirect, eye) {
                if (eye === void 0) { eye = 2; }
                throw new System.Exception("not impl");
            },
            Create: function () {
                return true;
            },
            DiscardContents: function () {
                throw new System.Exception("not impl");
            },
            DiscardContents$1: function (discardColor, discardDepth) {
                throw new System.Exception("not impl");
            },
            GenerateMips: function () {
                throw new System.Exception("not impl");
            },
            IsCreated: function () {
                return true;
            },
            MarkRestoreExpected: function () {
                throw new System.Exception("not impl");
            },
            Release: function () {
                throw new System.Exception("not impl");
            },
            ResolveAntiAliasedSurface: function () {
                throw new System.Exception("not impl");
            },
            ResolveAntiAliasedSurface$1: function (target) {
                throw new System.Exception("not impl");
            },
            SetGlobalShaderProperty: function (propertyName) {
                throw new System.Exception("not impl");
            }
        }
    });
});


