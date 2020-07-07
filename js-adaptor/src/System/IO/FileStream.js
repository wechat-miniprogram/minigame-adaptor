/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function($asm, globals) {
    "use strict";

    Bridge.define("System.IO.FileStream", {
        fields: {
            _buffer: [],
            _readBuffer: undefined,
            _readPos: 0,
            _length: 0
        },
        props: {
            CanRead: {
                get: function() {
                    return true;
                }
            },
            CanWrite: {
                get: function() {
                    return true;
                }
            },
            CanTimeout: {
                get: function() {
                    return false;
                }
            },
            CanSeek: {
                get: function() {
                    return false;
                }
            }
        },
        ctors: {
            $ctor1: function(fileInfo) {
                this.$initialize();
                this._fileInfo = fileInfo;
                console.log("FileStream Created, Path:", fileInfo._wxPath);
            }
        },
        methods: {
            Write: function(array, offset, count) {
                this._buffer = this._buffer.concat(array.slice(offset, offset + count))
            },
            Flush: function() {
                var buffer = Uint8Array.from(this._buffer).buffer;
                try {
                    this._fileInfo._fs.writeFileSync(this._fileInfo._wxPath, buffer); 
                } catch (e) {
                    console.log('filestream write error', e);
                }
            },
            Close: function() {
                this.Flush();
                this._buffer = [];
                this._readBuffer = undefined;
                this._readPos = 0;
                this._length = 0;
            },
            Dispose: function() {
            },
            Read: function(array, offset, count) {
               if (!array) {
                   throw new Exception('illegal array');
               } 
               if (!this._readBuffer) {
                   this._readBuffer = new Uint8Array(this._fileInfo._fs.readFileSync(this._fileInfo._wxPath));
               }
               var result = Array.from(this._readBuffer.slice(this._readPos, this._readPos + count));
               this._readPos = this._readPos + result.length;
               Array.prototype.splice.apply(array, [offset, result.length].concat(result));
               return result.length;
            }
        }
    });
});
