namespace System {
    [Bridge.FileName("minigame-adaptor-lib-patch")]
    [Bridge.IgnoreCast]
    [Bridge.IgnoreGeneric]
    public enum GCCollectionMode {
        Default = 0,
        Forced = 1,
        Optimized = 2,
    }
    [Bridge.FileName("minigame-adaptor-lib-patch")]
    [Bridge.IgnoreCast]
    [Bridge.IgnoreGeneric]
    public enum GCNotificationStatus {
        Succeeded = 0,
        Failed = 1,
        Canceled = 2,
        Timeout = 3,
        NotApplicable = 4,
    }

    [Bridge.FileName("minigame-adaptor-lib-patch")]
    [Bridge.IgnoreCast]
    [Bridge.IgnoreGeneric]
    public static class GC {
        public static int MaxGeneration { get { throw new Exception("not impl"); } }
        public static void AddMemoryPressure(long bytesAllocated) { throw new Exception("not impl"); }
        public static void CancelFullGCNotification() { throw new Exception("not impl"); }
        public static void Collect() { throw new Exception("not impl"); }
        public static void Collect(int generation) { throw new Exception("not impl"); }
        public static void Collect(int generation, GCCollectionMode mode) { throw new Exception("not impl"); }
        public static void Collect(int generation, GCCollectionMode mode, bool blocking) { throw new Exception("not impl"); }
        public static void Collect(int generation, GCCollectionMode mode, bool blocking, bool compacting) { throw new Exception("not impl"); }
        public static int CollectionCount(int generation) { throw new Exception("not impl"); }
        public static void EndNoGCRegion() { throw new Exception("not impl"); }
        public static int GetGeneration(object obj) { throw new Exception("not impl"); }
        public static long GetTotalMemory(bool forceFullCollection) { throw new Exception("not impl"); }
        public static void KeepAlive(object obj) { throw new Exception("not impl"); }
        public static void RegisterForFullGCNotification(int maxGenerationThreshold, int largeObjectHeapThreshold) { throw new Exception("not impl"); }
        public static void RemoveMemoryPressure(long bytesAllocated) { throw new Exception("not impl"); }
        public static void ReRegisterForFinalize(object obj) { throw new Exception("not impl"); }
        public static void SuppressFinalize(object obj) { throw new Exception("not impl"); }
        public static bool TryStartNoGCRegion(long totalSize) { throw new Exception("not impl"); }
        public static bool TryStartNoGCRegion(long totalSize, bool disallowFullBlockingGC) { throw new Exception("not impl"); }
        public static bool TryStartNoGCRegion(long totalSize, long lohSize) { throw new Exception("not impl"); }
        public static bool TryStartNoGCRegion(long totalSize, long lohSize, bool disallowFullBlockingGC) { throw new Exception("not impl"); }
        public static GCNotificationStatus WaitForFullGCApproach() { throw new Exception("not impl"); }
        public static GCNotificationStatus WaitForFullGCApproach(int millisecondsTimeout) { throw new Exception("not impl"); }
        public static GCNotificationStatus WaitForFullGCComplete() { throw new Exception("not impl"); }
        public static GCNotificationStatus WaitForFullGCComplete(int millisecondsTimeout) { throw new Exception("not impl"); }
        public static void WaitForPendingFinalizers() { throw new Exception("not impl"); }
    }
}
 