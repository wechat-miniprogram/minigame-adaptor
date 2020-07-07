Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.Runtime.Serialization.Formatters.Binary.BinaryFormatter", {
        inherits: [System.Runtime.Serialization.IFormatter],
        alias: [
            "Deserialize", "System$Runtime$Serialization$IFormatter$Deserialize",
            "Serialize", "System$Runtime$Serialization$IFormatter$Serialize"
        ],
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Deserialize: function (serializationStream) {
                throw new System.Exception("not impl");
            },
            Serialize: function (serializationStream, grpah) {
                throw new System.Exception("not impl");
            }
        }
    });
});
