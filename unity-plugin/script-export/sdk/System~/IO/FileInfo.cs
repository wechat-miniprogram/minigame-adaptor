namespace System.IO {

    [Bridge.External]
    public class FileInfo {

        public FileInfo(string path) {
            throw new Exception("not impl");
        }

        public bool Exists {
            get {
                throw new Exception("not impl");
            }
        }

        public int Length {
            get {
                throw new Exception("not impl");
            }
        }

        public DateTime LastWriteTimeUtc {
            get {
                throw new Exception("not impl");
            }
            set {
                throw new Exception("not impl");
            }
        }

        public FileStream Open(FileMode mode) {
            throw new Exception("not impl");
        }
        
        public FileStream Create() {
            throw new Exception("not impl");
        }

        public string FullName {
            get {
                throw new Exception("not impl");
            }
        }

        public StreamWriter CreateText() {
            throw new Exception("not impl");
        }

        public StreamWriter AppendText() {
            throw new Exception("not impl");
        }
        
    }
}