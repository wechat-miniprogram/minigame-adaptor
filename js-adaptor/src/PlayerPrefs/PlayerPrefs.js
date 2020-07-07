Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    // 加上前缀，防止跟直接调用wx.setStorage传入相同的key时产生冲突
    const prefix = '@@PlayerPrefs_'
    Bridge.define("MiniGameAdaptor.PlayerPrefs", {
        statics: {
            methods: {
                DeleteAll: function () {
                    wx.getStorageInfo({
                        success(res) {
                            res.keys.forEach(key => {
                                wx.removeStorage({
                                    key: prefix + key
                                })
                            })
                        }
                    })
                },
                DeleteKey: function (key) {
                    wx.removeStorage({
                        key: prefix + key
                    })
                },
                GetFloat: function (key, defaultValue = 0) {
                    const val = wx.getStorageSync(prefix + key)
                    return val !== '' ? val : defaultValue
                },
                GetFloat$1: function (key, defaultValue = 0) {
                    const val = wx.getStorageSync(prefix + key)
                    return val !== '' ? val : defaultValue
                },
                GetInt: function (key, defaultValue = 0) {
                    const val = wx.getStorageSync(prefix + key)
                    return val !== '' ? val : defaultValue
                },
                GetInt$1: function (key, defaultValue = 0) {
                    const val = wx.getStorageSync(prefix + key)
                    return val !== '' ? val : defaultValue
                },
                GetString: function (key, defaultValue = '') {
                    const val = wx.getStorageSync(prefix + key)
                    return val !== '' ? val : defaultValue
                },
                GetString$1: function (key, defaultValue = '') {
                    const val = wx.getStorageSync(prefix + key)
                    return val !== '' ? val : defaultValue
                },
                HasKey: function (key) {
                    const storageInfo = wx.getStorageInfoSync()
                    return storageInfo.keys.includes(prefix + key)
                },
                Save: function () {
                    return void 0
                },
                SetFloat: function (key, value) {
                    wx.setStorage({
                        key: prefix + key,
                        data: parseFloat(value)
                    })
                },
                SetInt: function (key, value) {
                    wx.setStorage({
                        key: prefix + key,
                        data: parseInt(value)
                    })
                },
                SetString: function (key, value) {
                    wx.setStorage({
                        key: prefix + key,
                        data: '' + value
                    })
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});
