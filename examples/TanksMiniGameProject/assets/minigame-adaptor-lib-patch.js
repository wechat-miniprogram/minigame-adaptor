Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.GC", {
        statics: {
            props: {
                MaxGeneration: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                AddMemoryPressure: function (bytesAllocated) {
                    throw new System.Exception("not impl");
                },
                CancelFullGCNotification: function () {
                    throw new System.Exception("not impl");
                },
                Collect: function () {
                    throw new System.Exception("not impl");
                },
                Collect$1: function (generation) {
                    throw new System.Exception("not impl");
                },
                Collect$2: function (generation, mode) {
                    throw new System.Exception("not impl");
                },
                Collect$3: function (generation, mode, blocking) {
                    throw new System.Exception("not impl");
                },
                Collect$4: function (generation, mode, blocking, compacting) {
                    throw new System.Exception("not impl");
                },
                CollectionCount: function (generation) {
                    throw new System.Exception("not impl");
                },
                EndNoGCRegion: function () {
                    throw new System.Exception("not impl");
                },
                GetGeneration: function (obj) {
                    throw new System.Exception("not impl");
                },
                GetTotalMemory: function (forceFullCollection) {
                    throw new System.Exception("not impl");
                },
                KeepAlive: function (obj) {
                    throw new System.Exception("not impl");
                },
                RegisterForFullGCNotification: function (maxGenerationThreshold, largeObjectHeapThreshold) {
                    throw new System.Exception("not impl");
                },
                RemoveMemoryPressure: function (bytesAllocated) {
                    throw new System.Exception("not impl");
                },
                ReRegisterForFinalize: function (obj) {
                    throw new System.Exception("not impl");
                },
                SuppressFinalize: function (obj) {
                    throw new System.Exception("not impl");
                },
                TryStartNoGCRegion: function (totalSize) {
                    throw new System.Exception("not impl");
                },
                TryStartNoGCRegion$1: function (totalSize, disallowFullBlockingGC) {
                    throw new System.Exception("not impl");
                },
                TryStartNoGCRegion$2: function (totalSize, lohSize) {
                    throw new System.Exception("not impl");
                },
                TryStartNoGCRegion$3: function (totalSize, lohSize, disallowFullBlockingGC) {
                    throw new System.Exception("not impl");
                },
                WaitForFullGCApproach: function () {
                    throw new System.Exception("not impl");
                },
                WaitForFullGCApproach$1: function (millisecondsTimeout) {
                    throw new System.Exception("not impl");
                },
                WaitForFullGCComplete: function () {
                    throw new System.Exception("not impl");
                },
                WaitForFullGCComplete$1: function (millisecondsTimeout) {
                    throw new System.Exception("not impl");
                },
                WaitForPendingFinalizers: function () {
                    throw new System.Exception("not impl");
                }
            }
        }
    });

    Bridge.define("System.GCCollectionMode", {
        $kind: "enum",
        statics: {
            fields: {
                Default: 0,
                Forced: 1,
                Optimized: 2
            }
        }
    });

    Bridge.define("System.GCNotificationStatus", {
        $kind: "enum",
        statics: {
            fields: {
                Succeeded: 0,
                Failed: 1,
                Canceled: 2,
                Timeout: 3,
                NotApplicable: 4
            }
        }
    });

    Bridge.define("System.Net.BinaryPrimitives", {
        statics: {
            methods: {
                ReverseEndianness$4: function (value) {
                    return value;
                },
                ReverseEndianness$1: function (value) {
                    return Bridge.Int.sxs((System.Net.BinaryPrimitives.ReverseEndianness$5((value & 65535))) & 65535);
                },
                ReverseEndianness$2: function (value) {
                    return ((System.Net.BinaryPrimitives.ReverseEndianness$6((value >>> 0))) | 0);
                },
                ReverseEndianness$3: function (value) {
                    return System.Int64.clip64(System.Net.BinaryPrimitives.ReverseEndianness$7(System.Int64.clipu64(value)));
                },
                ReverseEndianness: function (value) {
                    return value;
                },
                ReverseEndianness$5: function (value) {

                    return (((((value >> 8) + (value << 8)) | 0)) & 65535);
                },
                ReverseEndianness$6: function (value) {

                    return ((System.Net.BitOperations.RotateRight(((value & 16711935) >>> 0), 8) + System.Net.BitOperations.RotateLeft(((value & 4278255360) >>> 0), 8)) >>> 0);
                },
                ReverseEndianness$7: function (value) {
                    return (System.UInt64(System.Net.BinaryPrimitives.ReverseEndianness$6(System.Int64.clipu32(value))).shl(32)).add(System.UInt64(System.Net.BinaryPrimitives.ReverseEndianness$6(System.Int64.clipu32(value.shru(32)))));
                }
            }
        }
    });

    Bridge.define("System.Net.BitOperations", {
        statics: {
            methods: {
                RotateLeft: function (value, offset) {
                    return (((((value << offset) >>> 0)) | (value >>> (((32 - offset) | 0)))) >>> 0);
                },
                RotateLeft$1: function (value, offset) {
                    return (value.shl(offset)).or((value.shru((((64 - offset) | 0)))));
                },
                RotateRight: function (value, offset) {
                    return (((value >>> offset) | (((value << (((32 - offset) | 0))) >>> 0))) >>> 0);
                },
                RotateRight$1: function (value, offset) {
                    return (value.shru(offset)).or((value.shl((((64 - offset) | 0)))));
                }
            }
        }
    });

    Bridge.define("System.Net.IPAddress", {
        statics: {
            methods: {
                HostToNetworkOrder$2: function (host) {
                    return System.BitConverter.isLittleEndian ? System.Net.BinaryPrimitives.ReverseEndianness$3(host) : host;
                },
                HostToNetworkOrder$1: function (host) {
                    return System.BitConverter.isLittleEndian ? System.Net.BinaryPrimitives.ReverseEndianness$2(host) : host;
                },
                HostToNetworkOrder: function (host) {
                    return System.BitConverter.isLittleEndian ? System.Net.BinaryPrimitives.ReverseEndianness$1(host) : host;
                },
                NetworkToHostOrder$2: function (network) {
                    return System.Net.IPAddress.HostToNetworkOrder$2(network);
                },
                NetworkToHostOrder$1: function (network) {
                    return System.Net.IPAddress.HostToNetworkOrder$1(network);
                },
                NetworkToHostOrder: function (network) {
                    return System.Net.IPAddress.HostToNetworkOrder(network);
                }
            }
        }
    });
});
