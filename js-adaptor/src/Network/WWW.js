Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.WWW", {
        inherits: [MiniGameAdaptor.CustomYieldInstruction,System.IDisposable],
        statics: {
            methods: {
                EscapeURL: function (s) {
                    console.log("WWW call EscapeURL s:" + s);
                    var encodeuri = encodeURI(s);
                    console.log("WWW call EscapeURL encodeuri:" + encodeuri);
                    // var encodeuricom = encodeURIComponent(s);
                    // console.log("WWW call EscapeURL encodeuricom:" + encodeuricom);

                    return encodeuri;
                    // throw new System.Exception("not impl");
                },
                EscapeURL$1: function (s, e) {
                    throw new System.Exception("not impl");
                },
                LoadFromCacheOrDownload: function (url, version) {
                    throw new System.Exception("not impl");
                },
                LoadFromCacheOrDownload$1: function (url, version, crc) {
                    throw new System.Exception("not impl");
                },
                LoadFromCacheOrDownload$2: function (url, cachedBundle, crc) {
                    if (crc === void 0) { crc = 0; }
                    throw new System.Exception("not impl");
                },
                LoadFromCacheOrDownload$3: function (url, hash) {
                    throw new System.Exception("not impl");
                },
                LoadFromCacheOrDownload$4: function (url, hash, crc) {
                    throw new System.Exception("not impl");
                },
                UnEscapeURL: function (s) {
                    console.log("WWW call UnEscapeURL s:" + s);
                    var decodeuri = decodeURI(s);
                    console.log("WWW call UnEscapeURL decodeuri:" + decodeuri);
                    // throw new System.Exception("not impl");
                },
                UnEscapeURL$1: function (s, e) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            _bytes: null,
            _isDone: false,
            _keepWaiting: true,
            _url: "",
            _statusCode:-1,
            _responseHeaders:null,
            _errMsg:"",
        },
        props: {
            assetBundle: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            bytes: {
                get: function () {
                    return Array.from(new Uint8Array(this._bytes));
                }
            },
            bytesDownloaded: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            error: {
                get: function () {
                    return this._errMsg;
                    // throw new System.Exception("not impl");
                }
            },
            isDone: {
                get: function () {
                    return this._isDone;
                    // throw new System.Exception("not impl");
                }
            },
            keepWaiting: {
                get: function () {
                    return this._keepWaiting;
                    // throw new System.Exception("not impl");
                }
            },
            progress: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            responseHeaders: {
                get: function () {
                    return _responseHeaders;
                    // throw new System.Exception("not impl");
                }
            },
            text: {
                get: function () {
                    //没有参数指定返回类型,所以这里默认都返回空,引导去获取 byte
                    return "";
                    // throw new System.Exception("not impl");
                }
            },
            texture: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            textureNonReadable: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            threadPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            uploadProgress: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            url: {
                get: function () {
                    return this._url;
                    // throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (url) {
                this.$initialize();
                MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
                this._url = url;
                var thiz = this;
                console.log("WWW ctors url:" + this._url);
                this._requestTask = wx.request({
                    url: url,
                    responseType:'arraybuffer',
                    success (res) {
                        console.log("WWW call request success");
                        console.log(res.data)
                        thiz._bytes = res.data;
                        thiz._isDone = true;
                        thiz._keepWaiting = false;
                        thiz._statusCode = res.statusCode;
                    },
                    fail(res) {
                        console.log("WWW call request fail");
                        console.log(res.data)
                        thiz._isDone = true;
                        thiz._keepWaiting = false;
                        thiz._statusCode = res.statusCode;
                        thiz._errMsg = res.errMsg;
                    }
                })
                this._requestTask.onHeadersReceived((res) => {
                    console.log('WWW call request onHeadersReceived', res.header)
                })
                console.log("WWW call request");
//                 throw new System.Exception("not impl");
            },
            $ctor1: function (url, postData) {
                this.$initialize();
                MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
                this._url = url;
                var thiz = this;
                console.log("WWW ctors url:" + this._url + ",postData:" + postData);
                this._uploadTask = wx.request({
                    url: url,
                    responseType:'arraybuffer',
                    method:'POST',
                    data:postData,
                    success (res) {
                        console.log("WWW call request success");
                        console.log(res.data)
                        thiz._bytes = res.data;
                        thiz._isDone = true;
                        thiz._keepWaiting = false;
                        thiz._statusCode = res.statusCode;
                    },
                    fail(res) {
                        console.log("WWW call request fail");
                        console.log(res.data)
                        thiz._isDone = true;
                        thiz._keepWaiting = false;
                        thiz._statusCode = res.statusCode;
                        thiz._errMsg = res.errMsg;
                    }
                })
                console.log("WWW call request");
                // throw new System.Exception("not impl");
            },
            $ctor2: function (url, postData, headers) {
                this.$initialize();
                MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
                this._url = url;
                var thiz = this;
                console.log("WWW ctors url:" + this._url + ",postData:" + postData + ",headers:" + headers);
                this._requestTask = wx.request({
                    url: url,
                    responseType:'arraybuffer',
                    method:'POST',
                    data:postData,
                    header:headers,
                    success (res) {
                        console.log("WWW call request success");
                        console.log(res.data)
                        thiz._bytes = res.data;
                        thiz._isDone = true;
                        thiz._keepWaiting = false;
                        thiz._statusCode = res.statusCode;
                    },
                    fail(res) {
                        console.log("WWW call request fail");
                        console.log(res.data)
                        thiz._isDone = true;
                        thiz._keepWaiting = false;
                        thiz._statusCode = res.statusCode;
                        thiz._errMsg = res.errMsg;
                    }
                })
                console.log("WWW call request");
                // throw new System.Exception("not impl");
            },
            $ctor3: function (url, form) {
                //form的 header 尚不清楚如何获取,所以暂时也不支持这个方法,可以使用传参数和 header 的方法替代
                this.$initialize();
                MiniGameAdaptor.CustomYieldInstruction.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Dispose: function () {
                throw new System.Exception("not impl");
            },
            System$IDisposable$Dispose: function () {
                throw new System.Exception("Exception");
            },
            GetAudioClip: function () {
                throw new System.Exception("not impl");
            },
            GetAudioClip$1: function (threeD) {
                throw new System.Exception("not impl");
            },
            GetAudioClip$2: function (threeD, stream) {
                throw new System.Exception("not impl");
            },
            GetAudioClip$3: function (threeD, stream, audioType) {
                throw new System.Exception("not impl");
            },
            GetAudioClipCompressed: function () {
                throw new System.Exception("not impl");
            },
            GetAudioClipCompressed$1: function (threeD) {
                throw new System.Exception("not impl");
            },
            GetAudioClipCompressed$2: function (threeD, audioType) {
                throw new System.Exception("not impl");
            },
            LoadImageIntoTexture: function (texture) {
                throw new System.Exception("not impl");
            }
        }
    });
});


