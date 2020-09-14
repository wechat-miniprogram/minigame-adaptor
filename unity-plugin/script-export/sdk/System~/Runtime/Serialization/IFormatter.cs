using System.IO;

namespace System.Runtime.Serialization {
    public interface IFormatter {
        object Deserialize(Stream serializationStream);

        void Serialize(Stream serializationStream, object graph);
    }
}