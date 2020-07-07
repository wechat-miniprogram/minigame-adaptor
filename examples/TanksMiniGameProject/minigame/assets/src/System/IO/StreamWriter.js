Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.StreamWriter", {
        inherits: [System.IO.TextWriter],
        statics: {
            fields: {
                DefaultBufferSize: 0,
                DefaultFileStreamBufferSize: 0,
                MinBufferSize: 0,
                Null: null,
                _UTF8NoBOM: null
            },
            props: {
                UTF8NoBOM: {
                    get: function () {
                        if (System.IO.StreamWriter._UTF8NoBOM == null) {
                            // No need for double lock - we just want to avoid extra
                            // allocations in the common case.
                            var noBOM = new System.Text.UTF8Encoding.$ctor2(false, true);
                            System.IO.StreamWriter._UTF8NoBOM = noBOM;
                        }
                        return System.IO.StreamWriter._UTF8NoBOM;
                    }
                }
            },
            ctors: {
                init: function () {
                    this.DefaultBufferSize = 1024;
                    this.DefaultFileStreamBufferSize = 4096;
                    this.MinBufferSize = 128;
                    this.Null = new System.IO.StreamWriter.$ctor4(System.IO.Stream.Null, new System.Text.UTF8Encoding.$ctor2(false, true), System.IO.StreamWriter.MinBufferSize, true);
                }
            }
        },
        fields: {
            stream: null,
            encoding: null,
            byteBuffer: null,
            charBuffer: null,
            charPos: 0,
            charLen: 0,
            autoFlush: false,
            haveWrittenPreamble: false,
            closable: false
        },
        props: {
            AutoFlush: {
                get: function () {
                    return this.autoFlush;
                },
                set: function (value) {
                    this.autoFlush = value;
                    if (value) {
                        this.Flush$1(true, false);
                    }
                }
            },
            BaseStream: {
                get: function () {
                    return this.stream;
                }
            },
            LeaveOpen: {
                get: function () {
                    return !this.closable;
                }
            },
            HaveWrittenPreamble: {
                set: function (value) {
                    this.haveWrittenPreamble = value;
                }
            },
            Encoding: {
                get: function () {
                    return this.encoding;
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.IO.TextWriter.$ctor1.call(this, null); // Ask for CurrentCulture all the time
            },
            $ctor1: function (stream) {
                System.IO.StreamWriter.$ctor4.call(this, stream, System.IO.StreamWriter.UTF8NoBOM, System.IO.StreamWriter.DefaultBufferSize, false);
            },
            $ctor2: function (stream, encoding) {
                System.IO.StreamWriter.$ctor4.call(this, stream, encoding, System.IO.StreamWriter.DefaultBufferSize, false);
            },
            $ctor3: function (stream, encoding, bufferSize) {
                System.IO.StreamWriter.$ctor4.call(this, stream, encoding, bufferSize, false);
            },
            $ctor4: function (stream, encoding, bufferSize, leaveOpen) {
                this.$initialize();
                System.IO.TextWriter.$ctor1.call(this, null);
                if (stream == null || encoding == null) {
                    throw new System.ArgumentNullException.$ctor1((stream == null ? "stream" : "encoding"));
                }
                if (!stream.CanWrite) {
                    throw new System.ArgumentException.$ctor1("Argument_StreamNotWritable");
                }
                if (bufferSize <= 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor4("bufferSize", "ArgumentOutOfRange_NeedPosNum");
                }

                this.Init(stream, encoding, bufferSize, leaveOpen);
            },
            $ctor5: function (path) {
                System.IO.StreamWriter.$ctor8.call(this, path, false, System.IO.StreamWriter.UTF8NoBOM, System.IO.StreamWriter.DefaultBufferSize);
            },
            $ctor6: function (path, append) {
                System.IO.StreamWriter.$ctor8.call(this, path, append, System.IO.StreamWriter.UTF8NoBOM, System.IO.StreamWriter.DefaultBufferSize);
            },
            $ctor7: function (path, append, encoding) {
                System.IO.StreamWriter.$ctor8.call(this, path, append, encoding, System.IO.StreamWriter.DefaultBufferSize);
            },
            $ctor8: function (path, append, encoding, bufferSize) {
                System.IO.StreamWriter.$ctor9.call(this, path, append, encoding, bufferSize, true);
            },
            $ctor9: function (path, append, encoding, bufferSize, checkHost) {
                this.$initialize();
                System.IO.TextWriter.$ctor1.call(this, null);
                throw new System.NotSupportedException.ctor();
            }
        },
        methods: {
            Init: function (streamArg, encodingArg, bufferSize, shouldLeaveOpen) {
                this.stream = streamArg;
                this.encoding = encodingArg;
                if (bufferSize < System.IO.StreamWriter.MinBufferSize) {
                    bufferSize = System.IO.StreamWriter.MinBufferSize;
                }
                this.charBuffer = System.Array.init(bufferSize, 0, System.Char);
                this.byteBuffer = System.Array.init(this.encoding.GetMaxByteCount(bufferSize), 0, System.Byte);
                this.charLen = bufferSize;
                // If we're appending to a Stream that already has data, don't write
                // the preamble.
                if (this.stream.CanSeek && this.stream.Position.gt(System.Int64(0))) {
                    this.haveWrittenPreamble = true;
                }
                this.closable = !shouldLeaveOpen;
            },
            Close: function () {
                this.Dispose$1(true);
            },
            Dispose$1: function (disposing) {
                try {
                    // We need to flush any buffered data if we are being closed/disposed.
                    // Also, we never close the handles for stdout & friends.  So we can safely
                    // write any buffered data to those streams even during finalization, which
                    // is generally the right thing to do.
                    if (this.stream != null) {
                        // Note: flush on the underlying stream can throw (ex., low disk space)
                        if (disposing) {
                            this.Flush$1(true, true);
                        }
                    }
                } finally {
                    // Dispose of our resources if this StreamWriter is closable.
                    // Note: Console.Out and other such non closable streamwriters should be left alone
                    if (!this.LeaveOpen && this.stream != null) {
                        try {
                            // Attempt to close the stream even if there was an IO error from Flushing.
                            // Note that Stream.Close() can potentially throw here (may or may not be
                            // due to the same Flush error). In this case, we still need to ensure
                            // cleaning up internal resources, hence the finally block.
                            if (disposing) {
                                this.stream.Close();
                            }
                        } finally {
                            this.stream = null;
                            this.byteBuffer = null;
                            this.charBuffer = null;
                            this.encoding = null;
                            this.charLen = 0;
                            System.IO.TextWriter.prototype.Dispose$1.call(this, disposing);
                        }
                    }
                }
            },
            Flush: function () {
                this.Flush$1(true, true);
            },
            Flush$1: function (flushStream, flushEncoder) {
                // flushEncoder should be true at the end of the file and if
                // the user explicitly calls Flush (though not if AutoFlush is true).
                // This is required to flush any dangling characters from our UTF-7
                // and UTF-8 encoders.
                if (this.stream == null) {
                    System.IO.__Error.WriterClosed();
                }

                // Perf boost for Flush on non-dirty writers.
                if (this.charPos === 0 && (!flushStream && !flushEncoder)) {
                    return;
                }

                /* if (!haveWrittenPreamble) {
                   haveWrittenPreamble = true;
                   byte[] preamble = encoding.GetPreamble();
                   if (preamble.Length > 0)
                       stream.Write(preamble, 0, preamble.Length);
                }*/

                var count = this.encoding.GetBytes$3(this.charBuffer, 0, this.charPos, this.byteBuffer, 0);
                this.charPos = 0;
                if (count > 0) {
                    this.stream.Write(this.byteBuffer, 0, count);
                }
                // By definition, calling Flush should flush the stream, but this is
                // only necessary if we passed in true for flushStream.  The Web
                // Services guys have some perf tests where flushing needlessly hurts.
                if (flushStream) {
                    this.stream.Flush();
                }
            },
            Write$1: function (value) {
                if (this.charPos === this.charLen) {
                    this.Flush$1(false, false);
                }
                this.charBuffer[System.Array.index(this.charPos, this.charBuffer)] = value;
                this.charPos = (this.charPos + 1) | 0;
                if (this.autoFlush) {
                    this.Flush$1(true, false);
                }
            },
            Write$2: function (buffer) {
                // This may be faster than the one with the index & count since it
                // has to do less argument checking.
                if (buffer == null) {
                    return;
                }

                var index = 0;
                var count = buffer.length;
                while (count > 0) {
                    if (this.charPos === this.charLen) {
                        this.Flush$1(false, false);
                    }
                    var n = (this.charLen - this.charPos) | 0;
                    if (n > count) {
                        n = count;
                    }
                    System.Array.copy(buffer, index, this.charBuffer, this.charPos, n);
                    this.charPos = (this.charPos + n) | 0;
                    index = (index + n) | 0;
                    count = (count - n) | 0;
                }
                if (this.autoFlush) {
                    this.Flush$1(true, false);
                }
            },
            Write$3: function (buffer, index, count) {
                if (buffer == null) {
                    throw new System.ArgumentNullException.$ctor3("buffer", "ArgumentNull_Buffer");
                }
                if (index < 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor4("index", "ArgumentOutOfRange_NeedNonNegNum");
                }
                if (count < 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor4("count", "ArgumentOutOfRange_NeedNonNegNum");
                }
                if (((buffer.length - index) | 0) < count) {
                    throw new System.ArgumentException.$ctor1("Argument_InvalidOffLen");
                }

                while (count > 0) {
                    if (this.charPos === this.charLen) {
                        this.Flush$1(false, false);
                    }
                    var n = (this.charLen - this.charPos) | 0;
                    if (n > count) {
                        n = count;
                    }
                    System.Array.copy(buffer, index, this.charBuffer, this.charPos, n);
                    this.charPos = (this.charPos + n) | 0;
                    index = (index + n) | 0;
                    count = (count - n) | 0;
                }
                if (this.autoFlush) {
                    this.Flush$1(true, false);
                }
            },
            Write$10: function (value) {
                if (value != null) {
                    var count = value.length;
                    var index = 0;
                    while (count > 0) {
                        if (this.charPos === this.charLen) {
                            this.Flush$1(false, false);
                        }
                        var n = (this.charLen - this.charPos) | 0;
                        if (n > count) {
                            n = count;
                        }
                        System.String.copyTo(value, index, this.charBuffer, this.charPos, n);
                        this.charPos = (this.charPos + n) | 0;
                        index = (index + n) | 0;
                        count = (count - n) | 0;
                    }
                    if (this.autoFlush) {
                        this.Flush$1(true, false);
                    }
                }
            }
        }
    });
});
