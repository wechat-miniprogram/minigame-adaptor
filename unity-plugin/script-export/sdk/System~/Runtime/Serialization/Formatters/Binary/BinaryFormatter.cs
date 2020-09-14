using System.IO;

namespace System.Runtime.Serialization.Formatters.Binary {
    public class BinaryFormatter : IFormatter {
        public BinaryFormatter() {
            throw new Exception("not impl");
        }

        public object Deserialize(Stream serializationStream) {
            throw new Exception("not impl");
        }

        public void Serialize(Stream serializationStream, object grpah) {
            throw new Exception("not impl");
        }
    }
}