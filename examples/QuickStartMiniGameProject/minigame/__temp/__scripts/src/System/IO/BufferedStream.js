Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    /** @namespace System.IO */

    /**
     * One of the design goals here is to prevent the buffer from getting in the way and slowing
     down underlying stream accesses when it is not needed. If you always read and write for sizes
     greater than the internal buffer size, then this class may not even allocate the internal buffer.
     See a large comment in Write for the details of the write buffer heuristic.
     This class buffers reads and writes in a shared buffer.
     (If you maintained two buffers separately, one operation would always trash the other buffer
     anyways, so we might as well use one buffer.)
     The assumption here is you will almost always be doing a series of reads or writes, but rarely
     alternate between the two of them on the same stream.
     Class Invariants:
     The class has one buffer, shared for reading and writing.
     It can only be used for one or the other at any point in time - not both.
     The following should be true:
     <![CDATA[
       * 0 <= _readPos <= _readLen < _bufferSize
       * 0 <= _writePos < _bufferSize
       * _readPos == _readLen && _readPos > 0 implies the read buffer is valid, but we're at the end of the buffer.
       * _readPos == _readLen == 0 means the read buffer contains garbage.
       * Either _writePos can be greater than 0, or _readLen & _readPos can be greater than zero,
         but neither can be greater than zero at the same time.
      ]]>
     This class will never cache more bytes than the max specified buffer size.
     However, it may use a temporary buffer of up to twice the size in order to combine several IO operations on
     the underlying stream into a single operation. This is because we assume that memory copies are significantly
     faster than IO operations on the underlying stream (if this was not true, using buffering is never appropriate).
     The max size of this "shadow" buffer is limited as to not allocate it on the LOH.
     Shadowing is always transient. Even when using this technique, this class still guarantees that the number of
     bytes cached (not yet written to the target stream or not yet consumed by the user) is never larger than the
     actual specified buffer size.
     *
     * @public
     * @class System.IO.BufferedStream
     * @augments System.IO.Stream
     */
    Bridge.define("System.IO.BufferedStream", {
        inherits: [System.IO.Stream],
        statics: {
            fields: {
                _DefaultBufferSize: 0,
                /**
                 * <pre><code>MaxShadowBufferSize</code></pre> is chosed such that shadow buffers are not allocated on the Large Object Heap.
                 Currently, an object is allocated on the LOH if it is larger than 85000 bytes. See LARGE_OBJECT_SIZE in ndp\clr\src\vm\gc.h
                 We will go with exactly 80 KBytes, although this is somewhat arbitrary.
                 *
                 * @static
                 * @private
                 * @memberof System.IO.BufferedStream
                 * @constant
                 * @default 81920
                 * @type number
                 */
                MaxShadowBufferSize: 0
            },
            ctors: {
                init: function () {
                    this._DefaultBufferSize = 4096;
                    this.MaxShadowBufferSize = 81920;
                }
            }
        },
        fields: {
            _stream: null,
            _buffer: null,
            _bufferSize: 0,
            _readPos: 0,
            _readLen: 0,
            _writePos: 0
        },
        props: {
            UnderlyingStream: {
                get: function () {
                    return this._stream;
                }
            },
            BufferSize: {
                get: function () {
                    return this._bufferSize;
                }
            },
            CanRead: {
                get: function () {
                    return this._stream != null && this._stream.CanRead;
                }
            },
            CanWrite: {
                get: function () {
                    return this._stream != null && this._stream.CanWrite;
                }
            },
            CanSeek: {
                get: function () {
                    return this._stream != null && this._stream.CanSeek;
                }
            },
            Length: {
                get: function () {
                    this.EnsureNotClosed();

                    if (this._writePos > 0) {
                        this.FlushWrite();
                    }

                    return this._stream.Length;
                }
            },
            Position: {
                get: function () {
                    this.EnsureNotClosed();
                    this.EnsureCanSeek();

                    return this._stream.Position.add(System.Int64((((((this._readPos - this._readLen) | 0) + this._writePos) | 0))));
                },
                set: function (value) {
                    if (value.lt(System.Int64(0))) {
                        throw new System.ArgumentOutOfRangeException.$ctor1("value");
                    }

                    this.EnsureNotClosed();
                    this.EnsureCanSeek();

                    if (this._writePos > 0) {
                        this.FlushWrite();
                    }

                    this._readPos = 0;
                    this._readLen = 0;
                    this._stream.Seek(value, 0);
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.IO.Stream.ctor.call(this);
            },
            $ctor1: function (stream) {
                System.IO.BufferedStream.$ctor2.call(this, stream, System.IO.BufferedStream._DefaultBufferSize);
            },
            $ctor2: function (stream, bufferSize) {
                this.$initialize();
                System.IO.Stream.ctor.call(this);

                if (stream == null) {
                    throw new System.ArgumentNullException.$ctor1("stream");
                }

                if (bufferSize <= 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor1("bufferSize");
                }

                this._stream = stream;
                this._bufferSize = bufferSize;

                // Allocate _buffer on its first use - it will not be used if all reads
                // & writes are greater than or equal to buffer size.

                if (!this._stream.CanRead && !this._stream.CanWrite) {
                    System.IO.__Error.StreamIsClosed();
                }
            }
        },
        methods: {
            EnsureNotClosed: function () {

                if (this._stream == null) {
                    System.IO.__Error.StreamIsClosed();
                }
            },
            EnsureCanSeek: function () {


                if (!this._stream.CanSeek) {
                    System.IO.__Error.SeekNotSupported();
                }
            },
            EnsureCanRead: function () {


                if (!this._stream.CanRead) {
                    System.IO.__Error.ReadNotSupported();
                }
            },
            EnsureCanWrite: function () {


                if (!this._stream.CanWrite) {
                    System.IO.__Error.WriteNotSupported();
                }
            },
            EnsureShadowBufferAllocated: function () {


                // Already have shadow buffer?
                if (this._buffer.length !== this._bufferSize || this._bufferSize >= System.IO.BufferedStream.MaxShadowBufferSize) {
                    return;
                }

                var shadowBuffer = System.Array.init(Math.min(((this._bufferSize + this._bufferSize) | 0), System.IO.BufferedStream.MaxShadowBufferSize), 0, System.Byte);
                System.Array.copy(this._buffer, 0, shadowBuffer, 0, this._writePos);
                this._buffer = shadowBuffer;
            },
            EnsureBufferAllocated: function () {


                // BufferedStream is not intended for multi-threaded use, so no worries about the get/set ---- on _buffer.
                if (this._buffer == null) {
                    this._buffer = System.Array.init(this._bufferSize, 0, System.Byte);
                }
            },
            Dispose$1: function (disposing) {

                try {
                    if (disposing && this._stream != null) {
                        try {
                            this.Flush();
                        } finally {
                            this._stream.Close();
                        }
                    }
                } finally {
                    this._stream = null;
                    this._buffer = null;

                    // Call base.Dispose(bool) to cleanup async IO resources
                    System.IO.Stream.prototype.Dispose$1.call(this, disposing);
                }
            },
            Flush: function () {

                this.EnsureNotClosed();

                // Has WRITE data in the buffer:
                if (this._writePos > 0) {

                    this.FlushWrite();
                    return;
                }

                // Has READ data in the buffer:
                if (this._readPos < this._readLen) {

                    // If the underlying stream is not seekable AND we have something in the read buffer, then FlushRead would throw.
                    // We can either throw away the buffer resulting in data loss (!) or ignore the Flush.
                    // (We cannot throw becasue it would be a breaking change.) We opt into ignoring the Flush in that situation.
                    if (!this._stream.CanSeek) {
                        return;
                    }

                    this.FlushRead();

                    // User streams may have opted to throw from Flush if CanWrite is false (although the abstract Stream does not do so).
                    // However, if we do not forward the Flush to the underlying stream, we may have problems when chaining several streams.
                    // Let us make a best effort attempt:
                    if (this._stream.CanWrite || Bridge.is(this._stream, System.IO.BufferedStream)) {
                        this._stream.Flush();
                    }

                    return;
                }

                // We had no data in the buffer, but we still need to tell the underlying stream to flush.
                if (this._stream.CanWrite || Bridge.is(this._stream, System.IO.BufferedStream)) {
                    this._stream.Flush();
                }

                this._writePos = (this._readPos = (this._readLen = 0));
            },
            FlushRead: function () {


                if (((this._readPos - this._readLen) | 0) !== 0) {
                    this._stream.Seek(System.Int64(this._readPos - this._readLen), 1);
                }

                this._readPos = 0;
                this._readLen = 0;
            },
            ClearReadBufferBeforeWrite: function () {

                // This is called by write methods to clear the read buffer.


                // No READ data in the buffer:
                if (this._readPos === this._readLen) {

                    this._readPos = (this._readLen = 0);
                    return;
                }

                // Must have READ data.

                // If the underlying stream cannot seek, FlushRead would end up throwing NotSupported.
                // However, since the user did not call a method that is intuitively expected to seek, a better message is in order.
                // Ideally, we would throw an InvalidOperation here, but for backward compat we have to stick with NotSupported.
                if (!this._stream.CanSeek) {
                    throw new System.NotSupportedException.ctor();
                }

                this.FlushRead();
            },
            FlushWrite: function () {


                this._stream.Write(this._buffer, 0, this._writePos);
                this._writePos = 0;
                this._stream.Flush();
            },
            ReadFromBuffer: function (array, offset, count) {

                var readBytes = (this._readLen - this._readPos) | 0;

                if (readBytes === 0) {
                    return 0;
                }


                if (readBytes > count) {
                    readBytes = count;
                }

                System.Array.copy(this._buffer, this._readPos, array, offset, readBytes);
                this._readPos = (this._readPos + readBytes) | 0;

                return readBytes;
            },
            ReadFromBuffer$1: function (array, offset, count, error) {

                try {

                    error.v = null;
                    return this.ReadFromBuffer(array, offset, count);

                } catch (ex) {
                    ex = System.Exception.create(ex);
                    error.v = ex;
                    return 0;
                }
            },
            Read: function (array, offset, count) {

                if (array == null) {
                    throw new System.ArgumentNullException.$ctor1("array");
                }
                if (offset < 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor1("offset");
                }
                if (count < 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor1("count");
                }
                if (((array.length - offset) | 0) < count) {
                    throw new System.ArgumentException.ctor();
                }

                this.EnsureNotClosed();
                this.EnsureCanRead();

                var bytesFromBuffer = this.ReadFromBuffer(array, offset, count);

                // We may have read less than the number of bytes the user asked for, but that is part of the Stream contract.

                // Reading again for more data may cause us to block if we're using a device with no clear end of file,
                // such as a serial port or pipe. If we blocked here and this code was used with redirected pipes for a
                // process's standard output, this can lead to deadlocks involving two processes.
                // BUT - this is a breaking change.
                // So: If we could not read all bytes the user asked for from the buffer, we will try once from the underlying
                // stream thus ensuring the same blocking behaviour as if the underlying stream was not wrapped in this BufferedStream.
                if (bytesFromBuffer === count) {
                    return bytesFromBuffer;
                }

                var alreadySatisfied = bytesFromBuffer;
                if (bytesFromBuffer > 0) {
                    count = (count - bytesFromBuffer) | 0;
                    offset = (offset + bytesFromBuffer) | 0;
                }

                // So the READ buffer is empty.
                this._readPos = (this._readLen = 0);

                // If there was anything in the WRITE buffer, clear it.
                if (this._writePos > 0) {
                    this.FlushWrite();
                }

                // If the requested read is larger than buffer size, avoid the buffer and still use a single read:
                if (count >= this._bufferSize) {

                    return ((this._stream.Read(array, offset, count) + alreadySatisfied) | 0);
                }

                // Ok. We can fill the buffer:
                this.EnsureBufferAllocated();
                this._readLen = this._stream.Read(this._buffer, 0, this._bufferSize);

                bytesFromBuffer = this.ReadFromBuffer(array, offset, count);

                // We may have read less than the number of bytes the user asked for, but that is part of the Stream contract.
                // Reading again for more data may cause us to block if we're using a device with no clear end of stream,
                // such as a serial port or pipe.  If we blocked here & this code was used with redirected pipes for a process's
                // standard output, this can lead to deadlocks involving two processes. Additionally, translating one read on the
                // BufferedStream to more than one read on the underlying Stream may defeat the whole purpose of buffering of the
                // underlying reads are significantly more expensive.

                return ((bytesFromBuffer + alreadySatisfied) | 0);
            },
            ReadByte: function () {

                this.EnsureNotClosed();
                this.EnsureCanRead();

                if (this._readPos === this._readLen) {

                    if (this._writePos > 0) {
                        this.FlushWrite();
                    }

                    this.EnsureBufferAllocated();
                    this._readLen = this._stream.Read(this._buffer, 0, this._bufferSize);
                    this._readPos = 0;
                }

                if (this._readPos === this._readLen) {
                    return -1;
                }

                var b = this._buffer[System.Array.index(Bridge.identity(this._readPos, ((this._readPos = (this._readPos + 1) | 0))), this._buffer)];
                return b;
            },
            WriteToBuffer: function (array, offset, count) {

                var bytesToWrite = Math.min(((this._bufferSize - this._writePos) | 0), count.v);

                if (bytesToWrite <= 0) {
                    return;
                }

                this.EnsureBufferAllocated();
                System.Array.copy(array, offset.v, this._buffer, this._writePos, bytesToWrite);

                this._writePos = (this._writePos + bytesToWrite) | 0;
                count.v = (count.v - bytesToWrite) | 0;
                offset.v = (offset.v + bytesToWrite) | 0;
            },
            WriteToBuffer$1: function (array, offset, count, error) {

                try {

                    error.v = null;
                    this.WriteToBuffer(array, offset, count);

                } catch (ex) {
                    ex = System.Exception.create(ex);
                    error.v = ex;
                }
            },
            Write: function (array, offset, count) {
                offset = {v:offset};
                count = {v:count};

                if (array == null) {
                    throw new System.ArgumentNullException.$ctor1("array");
                }
                if (offset.v < 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor1("offset");
                }
                if (count.v < 0) {
                    throw new System.ArgumentOutOfRangeException.$ctor1("count");
                }
                if (((array.length - offset.v) | 0) < count.v) {
                    throw new System.ArgumentException.ctor();
                }

                this.EnsureNotClosed();
                this.EnsureCanWrite();

                if (this._writePos === 0) {
                    this.ClearReadBufferBeforeWrite();
                }

                // We need to use the buffer, while avoiding unnecessary buffer usage / memory copies.
                // We ASSUME that memory copies are much cheaper than writes to the underlying stream, so if an extra copy is
                // guaranteed to reduce the number of writes, we prefer it.
                // We pick a simple strategy that makes degenerate cases rare if our assumptions are right.
                //
                // For ever write, we use a simple heuristic (below) to decide whether to use the buffer.
                // The heuristic has the desirable property (*) that if the specified user data can fit into the currently available
                // buffer space without filling it up completely, the heuristic will always tell us to use the buffer. It will also
                // tell us to use the buffer in cases where the current write would fill the buffer, but the remaining data is small
                // enough such that subsequent operations can use the buffer again.
                //
                // Algorithm:
                // Determine whether or not to buffer according to the heuristic (below).
                // If we decided to use the buffer:
                //     Copy as much user data as we can into the buffer.
                //     If we consumed all data: We are finished.
                //     Otherwise, write the buffer out.
                //     Copy the rest of user data into the now cleared buffer (no need to write out the buffer again as the heuristic
                //     will prevent it from being filled twice).
                // If we decided not to use the buffer:
                //     Can the data already in the buffer and current user data be combines to a single write
                //     by allocating a "shadow" buffer of up to twice the size of _bufferSize (up to a limit to avoid LOH)?
                //     Yes, it can:
                //         Allocate a larger "shadow" buffer and ensure the buffered  data is moved there.
                //         Copy user data to the shadow buffer.
                //         Write shadow buffer to the underlying stream in a single operation.
                //     No, it cannot (amount of data is still too large):
                //         Write out any data possibly in the buffer.
                //         Write out user data directly.
                //
                // Heuristic:
                // If the subsequent write operation that follows the current write operation will result in a write to the
                // underlying stream in case that we use the buffer in the current write, while it would not have if we avoided
                // using the buffer in the current write (by writing current user data to the underlying stream directly), then we
                // prefer to avoid using the buffer since the corresponding memory copy is wasted (it will not reduce the number
                // of writes to the underlying stream, which is what we are optimising for).
                // ASSUME that the next write will be for the same amount of bytes as the current write (most common case) and
                // determine if it will cause a write to the underlying stream. If the next write is actually larger, our heuristic
                // still yields the right behaviour, if the next write is actually smaller, we may making an unnecessary write to
                // the underlying stream. However, this can only occur if the current write is larger than half the buffer size and
                // we will recover after one iteration.
                // We have:
                //     useBuffer = (_writePos + count + count < _bufferSize + _bufferSize)
                //
                // Example with _bufferSize = 20, _writePos = 6, count = 10:
                //
                //     +---------------------------------------+---------------------------------------+
                //     |             current buffer            | next iteration's "future" buffer      |
                //     +---------------------------------------+---------------------------------------+
                //     |0| | | | | | | | | |1| | | | | | | | | |2| | | | | | | | | |3| | | | | | | | | |
                //     |0|1|2|3|4|5|6|7|8|9|0|1|2|3|4|5|6|7|8|9|0|1|2|3|4|5|6|7|8|9|0|1|2|3|4|5|6|7|8|9|
                //     +-----------+-------------------+-------------------+---------------------------+
                //     | _writePos |  current count    | assumed next count|avail buff after next write|
                //     +-----------+-------------------+-------------------+---------------------------+
                //
                // A nice property (*) of this heuristic is that it will always succeed if the user data completely fits into the
                // available buffer, i.e. if count < (_bufferSize - _writePos).


                var totalUserBytes;
                var useBuffer; // We do not expect buffer sizes big enough for an overflow, but if it happens, lets fail early:
                totalUserBytes = Bridge.Int.check(this._writePos + count.v, System.Int32);
                useBuffer = (Bridge.Int.check(totalUserBytes + count.v, System.Int32) < (Bridge.Int.check(this._bufferSize + this._bufferSize, System.Int32)));

                if (useBuffer) {

                    this.WriteToBuffer(array, offset, count);

                    if (this._writePos < this._bufferSize) {

                        return;
                    }


                    this._stream.Write(this._buffer, 0, this._writePos);
                    this._writePos = 0;

                    this.WriteToBuffer(array, offset, count);


                } else { // if (!useBuffer)

                    // Write out the buffer if necessary.
                    if (this._writePos > 0) {


                        // Try avoiding extra write to underlying stream by combining previously buffered data with current user data:
                        if (totalUserBytes <= (((this._bufferSize + this._bufferSize) | 0)) && totalUserBytes <= System.IO.BufferedStream.MaxShadowBufferSize) {

                            this.EnsureShadowBufferAllocated();
                            System.Array.copy(array, offset.v, this._buffer, this._writePos, count.v);
                            this._stream.Write(this._buffer, 0, totalUserBytes);
                            this._writePos = 0;
                            return;
                        }

                        this._stream.Write(this._buffer, 0, this._writePos);
                        this._writePos = 0;
                    }

                    // Write out user data.
                    this._stream.Write(array, offset.v, count.v);
                }
            },
            WriteByte: function (value) {

                this.EnsureNotClosed();

                if (this._writePos === 0) {

                    this.EnsureCanWrite();
                    this.ClearReadBufferBeforeWrite();
                    this.EnsureBufferAllocated();
                }

                // We should not be flushing here, but only writing to the underlying stream, but previous version flushed, so we keep this.
                if (this._writePos >= ((this._bufferSize - 1) | 0)) {
                    this.FlushWrite();
                }

                this._buffer[System.Array.index(Bridge.identity(this._writePos, ((this._writePos = (this._writePos + 1) | 0))), this._buffer)] = value;

            },
            Seek: function (offset, origin) {

                this.EnsureNotClosed();
                this.EnsureCanSeek();

                // If we have bytes in the WRITE buffer, flush them out, seek and be done.
                if (this._writePos > 0) {

                    // We should be only writing the buffer and not flushing,
                    // but the previous version did flush and we stick to it for back-compat reasons.
                    this.FlushWrite();
                    return this._stream.Seek(offset, origin);
                }

                // The buffer is either empty or we have a buffered READ.

                if (((this._readLen - this._readPos) | 0) > 0 && origin === 1) {

                    // If we have bytes in the READ buffer, adjust the seek offset to account for the resulting difference
                    // between this stream's position and the underlying stream's position.
                    offset = offset.sub(System.Int64((((this._readLen - this._readPos) | 0))));
                }

                var oldPos = this.Position;

                var newPos = this._stream.Seek(offset, origin);

                // If the seek destination is still within the data currently in the buffer, we want to keep the buffer data and continue using it.
                // Otherwise we will throw away the buffer. This can only happen on READ, as we flushed WRITE data above.

                // The offset of the new/updated seek pointer within _buffer:
                this._readPos = System.Int64.clip32(newPos.sub((oldPos.sub(System.Int64(this._readPos)))));

                // If the offset of the updated seek pointer in the buffer is still legal, then we can keep using the buffer:
                if (0 <= this._readPos && this._readPos < this._readLen) {

                    // Adjust the seek pointer of the underlying stream to reflect the amount of useful bytes in the read buffer:
                    this._stream.Seek(System.Int64(this._readLen - this._readPos), 1);

                } else { // The offset of the updated seek pointer is not a legal offset. Loose the buffer.

                    this._readPos = (this._readLen = 0);
                }

                return newPos;
            },
            SetLength: function (value) {

                if (value.lt(System.Int64(0))) {
                    throw new System.ArgumentOutOfRangeException.$ctor1("value");
                }

                this.EnsureNotClosed();
                this.EnsureCanSeek();
                this.EnsureCanWrite();

                this.Flush();
                this._stream.SetLength(value);
            }
        }
    });
});
