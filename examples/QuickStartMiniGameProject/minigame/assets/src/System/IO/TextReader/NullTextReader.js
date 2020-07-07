Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.TextReader.NullTextReader", {
        inherits: [System.IO.TextReader],
        $kind: "nested class",
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.IO.TextReader.ctor.call(this);
            }
        },
        methods: {
            Read$1: function (buffer, index, count) {
                return 0;
            },
            ReadLine: function () {
                return null;
            }
        }
    });
});
