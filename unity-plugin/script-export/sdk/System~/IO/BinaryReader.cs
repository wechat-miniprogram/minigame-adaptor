namespace System.IO {
    public class BinaryReader {
         public BinaryReader(Stream input) { throw new Exception("not impl"); }

        public virtual int Read() { throw new Exception("not impl"); }
        public virtual int Read(byte[] buffer, int index, int count) { throw new Exception("not impl"); }
        public virtual int Read(char[] buffer, int index, int count) { throw new Exception("not impl"); }

        public virtual bool ReadBoolean() { throw new Exception("not impl"); }
        public virtual byte ReadByte() { throw new Exception("not impl"); }
        public virtual byte[] ReadBytes(int count) { throw new Exception("not impl"); }
        public virtual char ReadChar() { throw new Exception("not impl"); }
        public virtual char[] ReadChars(int count) { throw new Exception("not impl"); }
        public virtual decimal ReadDecimal() { throw new Exception("not impl"); }
        public virtual double ReadDouble() { throw new Exception("not impl"); }
        public virtual short ReadInt16() { throw new Exception("not impl"); }
        public virtual int ReadInt32() { throw new Exception("not impl"); }
        public virtual long ReadInt64() { throw new Exception("not impl"); }
        public virtual sbyte ReadSByte() { throw new Exception("not impl"); }
        public virtual float ReadSingle() { throw new Exception("not impl"); }
        public virtual string ReadString() { throw new Exception("not impl"); }
        public virtual ushort ReadUInt16() { throw new Exception("not impl"); }
        public virtual uint ReadUInt32() { throw new Exception("not impl"); }
        public virtual ulong ReadUInt64() { throw new Exception("not impl"); }
    }
}