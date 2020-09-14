namespace System.Text {
    public class EncoderFallbackException : ArgumentException {
        public EncoderFallbackException() {
            throw new Exception("not impl");
        }
    }

    public class DecoderFallbackException : ArgumentException {
        public DecoderFallbackException() {
            throw new Exception("not impl");
        }
    }
}