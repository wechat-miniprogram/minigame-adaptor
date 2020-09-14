namespace System.IO {
    public class BinaryWriter {
        public BinaryWriter(Stream s) {
            throw new Exception("not impl");
        }

        public virtual void Write(ulong value) { throw new Exception("not impl"); }

        public virtual void Write(uint value) { throw new Exception("not impl"); }

        public virtual void Write(ushort value) { throw new Exception("not impl"); }
        public virtual void Write(string value) { throw new Exception("not impl"); }
        public virtual void Write(float value) { throw new Exception("not impl"); }

        public virtual void Write(sbyte value) { throw new Exception("not impl"); }
        public virtual void Write(long value) { throw new Exception("not impl"); }
        public virtual void Write(int value) { throw new Exception("not impl"); }
        public virtual void Write(short value) { throw new Exception("not impl"); }
        public virtual void Write(decimal value) { throw new Exception("not impl"); }
        public virtual void Write(char[] chars, int index, int count) { throw new Exception("not impl"); }
        public virtual void Write(char[] chars) { throw new Exception("not impl"); }
        public virtual void Write(byte[] buffer, int index, int count) { throw new Exception("not impl"); }
        public virtual void Write(byte[] buffer) { throw new Exception("not impl"); }
        public virtual void Write(byte value) { throw new Exception("not impl"); }
        public virtual void Write(bool value) { throw new Exception("not impl"); }
        public virtual void Write(double value) { throw new Exception("not impl"); }
        public virtual void Write(char ch) { throw new Exception("not impl"); }
    }
}