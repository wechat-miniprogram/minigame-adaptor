namespace System.IO {
    public class FileNotFoundException : IOException {
        public FileNotFoundException() {
            throw new Exception("not impl");
        }
    }

    public class DirectoryNotFoundException : IOException {
        public DirectoryNotFoundException() {
            throw new Exception("not impl");
        }
    }
}