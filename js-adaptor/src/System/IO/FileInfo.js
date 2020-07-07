/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function($asm, globals) {
    "use strict";

    Bridge.define("System.IO.FileInfo", {
        props: {
            Exists: {
                get: function() {
                    try {
                        this._fs.accessSync(this._wxPath);
                        return true;
                    } catch (e) {
                        console.log(e);
                        return false;
                    }
                }
            },
            Length: {
                get: function() {
                    const stat = this._fs.statSync(this._wxPath);
                    if (stat) {
                        return stat.size;
                    } else {
                        return undefined;
                    }
                }
            },
            LastWriteTimeUtc: {
                get: function() {
                    throw new System.Exception("not impl");
                },
                set: function(value) {
                    throw new System.Exception("not impl");
                }
            },
            FullName: {
                get: function() {
                    return this._wxPath;
                }
            }
        },
        ctors: {
            ctor: function(path) {
                this.$initialize();
                if (path.startsWith('/')) {
                    path = path.substring(1, path.length);
                }
                if (path.startsWith('usr')) {
                    path = path.substring(3, path.length);
                }
                this._wxPath = `${wx.env.USER_DATA_PATH}/` + path;
                console.log("FileInfo Created, Path:", this._wxPath);
                this._fs = wx.getFileSystemManager();
            }
        },
        methods: {
            Create: function() {
                try {
                    this._fs.unlinkSync(this._wxPath);
                } catch (e) {
                    console.log('FileInfo Create unlink old file', e);
                }
                return new System.IO.FileStream.$ctor1(this);
            }, 
            Open: function(mode) {
                return new System.IO.FileStream.$ctor1(this);
            }
        }
    });
});
