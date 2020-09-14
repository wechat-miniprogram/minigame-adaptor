namespace System.Net
{
    // https://github.com/dotnet/corefx/blob/f8c382f76955e8da9f0cf314d5945a5af34d72b7/src/System.Net.Primitives/src/System/Net/IPAddress.cs
    [Bridge.FileName("minigame-adaptor-lib-patch")]
    [Bridge.IgnoreCast]
    [Bridge.IgnoreGeneric]
    public static class IPAddress {
        public static long HostToNetworkOrder(long host) {
            return BitConverter.IsLittleEndian ? BinaryPrimitives.ReverseEndianness(host) : host;
        }

        public static int HostToNetworkOrder(int host) {
            return BitConverter.IsLittleEndian ? BinaryPrimitives.ReverseEndianness(host) : host;
        }

        public static short HostToNetworkOrder(short host) {
            return BitConverter.IsLittleEndian ? BinaryPrimitives.ReverseEndianness(host) : host;
        }

        public static long NetworkToHostOrder(long network) {
            return HostToNetworkOrder(network);
        }

        public static int NetworkToHostOrder(int network) {
            return HostToNetworkOrder(network);
        }

        public static short NetworkToHostOrder(short network) {
            return HostToNetworkOrder(network);
        }
    }

    // https://github.com/dotnet/corefx/blob/d3911035f2ba3eb5c44310342cc1d654e42aa316/src/Common/src/CoreLib/System/Buffers/Binary/Reader.cs
    [Bridge.FileName("minigame-adaptor-lib-patch")]
    [Bridge.IgnoreCast]
    [Bridge.IgnoreGeneric]
    public static class BinaryPrimitives {

        public static sbyte ReverseEndianness(sbyte value) {
            return value;
        }

        public static short ReverseEndianness(short value) => (short)ReverseEndianness((ushort)value);

        public static int ReverseEndianness(int value) => (int)ReverseEndianness((uint)value);

        public static long ReverseEndianness(long value) => (long)ReverseEndianness((ulong)value);

        public static byte ReverseEndianness(byte value) {
            return value;
        }

        public static ushort ReverseEndianness(ushort value) {

            return (ushort)((value >> 8) + (value << 8));
        }

        public static uint ReverseEndianness(uint value) {

            return BitOperations.RotateRight(value & 0x00FF00FFu, 8)
                + BitOperations.RotateLeft(value & 0xFF00FF00u, 8);
        }

        public static ulong ReverseEndianness(ulong value) {
            return ((ulong)ReverseEndianness((uint)value) << 32)
                + ReverseEndianness((uint)(value >> 32));
        }
    }

    // https://github.com/dotnet/corefx/blob/ea8557901ef8976238690872160b5b885fe08a31/src/Common/src/CoreLib/System/Numerics/BitOperations.cs
    [Bridge.FileName("minigame-adaptor-lib-patch")]
    [Bridge.IgnoreCast]
    [Bridge.IgnoreGeneric]
    public static class BitOperations {

        public static uint RotateLeft(uint value, int offset)
            => (value << offset) | (value >> (32 - offset));

        public static ulong RotateLeft(ulong value, int offset)
            => (value << offset) | (value >> (64 - offset));

        public static uint RotateRight(uint value, int offset)
            => (value >> offset) | (value << (32 - offset));

        public static ulong RotateRight(ulong value, int offset)
            => (value >> offset) | (value << (64 - offset));
    }
}