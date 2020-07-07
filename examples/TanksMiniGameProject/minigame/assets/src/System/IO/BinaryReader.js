Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.BinaryReader", {
        ctors: {
            ctor: function (input) {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Read: function () {
                throw new System.Exception("not impl");
            },
            Read$1: function (buffer, index, count) {
                throw new System.Exception("not impl");
            },
            Read$2: function (buffer, index, count) {
                throw new System.Exception("not impl");
            },
            ReadBoolean: function () {
                throw new System.Exception("not impl");
            },
            ReadByte: function () {
                throw new System.Exception("not impl");
            },
            ReadBytes: function (count) {
                throw new System.Exception("not impl");
            },
            ReadChar: function () {
                throw new System.Exception("not impl");
            },
            ReadChars: function (count) {
                throw new System.Exception("not impl");
            },
            ReadDecimal: function () {
                throw new System.Exception("not impl");
            },
            ReadDouble: function () {
                throw new System.Exception("not impl");
            },
            ReadInt16: function () {
                throw new System.Exception("not impl");
            },
            ReadInt32: function () {
                throw new System.Exception("not impl");
            },
            ReadInt64: function () {
                throw new System.Exception("not impl");
            },
            ReadSByte: function () {
                throw new System.Exception("not impl");
            },
            ReadSingle: function () {
                throw new System.Exception("not impl");
            },
            ReadString: function () {
                throw new System.Exception("not impl");
            },
            ReadUInt16: function () {
                throw new System.Exception("not impl");
            },
            ReadUInt32: function () {
                throw new System.Exception("not impl");
            },
            ReadUInt64: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
