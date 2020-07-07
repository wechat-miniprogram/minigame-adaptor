let networkType = ''
let targetFrameRate = 60

wx.getNetworkType({
    success(res) {
        networkType = res.networkType
    }
})
wx.onNetworkStatusChange(function (res) {
    networkType = res.networkType
})

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Application", {
        statics: {
            events: {
                lowMemory: null,
                logMessageReceived: null,
                logMessageReceivedThreaded: null,
                onBeforeRender: null,
                focusChanged: null,
                wantsToQuit: null,
                quitting: null
            },
            props: {
                absoluteURL: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                backgroundLoadingPriority: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                buildGUID: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                cloudProjectId: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                companyName: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                consoleLogPath: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                dataPath: {
                    get: function () {
                        return __wxConfig.platform === 'devtools' ? 'http://tmp' : 'wxfile://tmp'
                    }
                },
                genuine: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                genuineCheckAvailable: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                identifier: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                installerName: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                installMode: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                internetReachability: {
                    get: function () {
                        if (networkType === 'none') {
                            return MiniGameAdaptor.NetworkReachability.NotReachable
                        } else if (networkType === '2g' || networkType === '3g' || networkType === '4g' || networkType === '5g' || networkType === '6g') {
                            return MiniGameAdaptor.NetworkReachability.ReachableViaCarrierDataNetwork
                        } else {
                            return MiniGameAdaptor.NetworkReachability.ReachableViaLocalAreaNetwork
                        }
                    }
                },
                isBatchMode: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                isConsolePlatform: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                isEditor: {
                    get: function () {
                        return false
                    }
                },
                isFocused: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                isMobilePlatform: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                isPlaying: {
                    get: function () {
                        return true;
                    }
                },
                persistentDataPath: {
                    get: function () {
                        return '/usr'
                    }
                },
                platform: {
                    get: function () {
                        const platform = __wxConfig.platform
                        if (platform === 'android') {
                            return MiniGameAdaptor.RuntimePlatform.Android
                        } else if (platform === 'ios') {
                            return MiniGameAdaptor.RuntimePlatform.IPhonePlayer
                        } else if (platform === 'devtools') {
                            return MiniGameAdaptor.RuntimePlatform.WechatDevtools
                        } else {
                            return 'unknown'
                        }
                    }
                },
                productName: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                runInBackground: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                sandboxType: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                streamingAssetsPath: {
                    get: function () {
                        // 随Unity打包存在的文件夹，只读。即读取小游戏代码包文件.(从根目录开始)
                        return ''
                    }
                },
                systemLanguage: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                targetFrameRate: {
                    get: function () {
                        return targetFrameRate
                    },
                    set: function (fps = 60) {
                        if (fps > 60) fps = 60
                        targetFrameRate = fps
                        if (engine.FrameSystem && engine.FrameSystem.setPreferredFramesPerSecond) {
                            engine.FrameSystem.setPreferredFramesPerSecond(fps);
                        } else {
                            wx.setPreferredFramesPerSecond(fps);
                        }
                    }
                },
                temporaryCachePath: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                unityVersion: {
                    get: function () {
                        return '0';
                    }
                },
                version: {
                    get: function () {
                        return '0';
                    }
                }
            },
            methods: {
                CanStreamedLevelBeLoaded: function (levelIndex) {
                    throw new System.Exception("not impl");
                },
                CanStreamedLevelBeLoaded$1: function (levelName) {
                    throw new System.Exception("not impl");
                },
                GetBuildTags: function () {
                    throw new System.Exception("not impl");
                },
                GetStackTraceLogType: function (logType) {
                    throw new System.Exception("not impl");
                },
                HasProLicense: function () {
                    throw new System.Exception("not impl");
                },
                HasUserAuthorization: function (mode) {
                    throw new System.Exception("not impl");
                },
                IsPlaying: function (obj) {
                    return true
                },
                OpenURL: function (url) {
                    throw new System.Exception("not impl");
                },
                Quit: function () {
                    wx.exitMiniProgram()
                },
                RequestAdvertisingIdentifierAsync: function (delegateMethod) {
                    throw new System.Exception("not impl");
                },
                RequestUserAuthorization: function (mode) {
                    throw new System.Exception("not impl");
                },
                SetBuildTags: function (buildTags) {
                    throw new System.Exception("not impl");
                },
                SetStackTraceLogType: function (logType, stackTraceType) {
                    throw new System.Exception("not impl");
                },
                Unload: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        }
    });
});


