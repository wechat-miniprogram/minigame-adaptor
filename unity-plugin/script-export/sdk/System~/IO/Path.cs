namespace System.IO {
    public static class Path {
        public static string Combine(string path1, string path2) {
            if (path1.EndsWith("/")) {
                return path1 + path2;
            }
            return path1 + "/" + path2;
        }

        public static string GetExtension(string path) {
            throw new Exception("not impl");
        }

        public static string GetDirectoryName(string path) {
            throw new Exception("not impl");
        }

        public static string GetFileNameWithoutExtension(string path) {
            throw new Exception("not impl");
        }

        public static string GetFullPath(string path) {
            throw new Exception("not impl");
        }

        public static string GetFullName(string path) {
            throw new Exception("not impl");
        }

        public static string GetFileName(string path) {
            throw new Exception("not impl");
        }

        public static readonly char DirectorySeparatorChar;
    }
}