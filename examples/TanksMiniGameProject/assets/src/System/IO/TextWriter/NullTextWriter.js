Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.TextWriter.NullTextWriter", {
        inherits: [System.IO.TextWriter],
        $kind: "nested class",
        props: {
            Encoding: {
                get: function () {
                    return System.Text.Encoding.Default;
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.IO.TextWriter.$ctor1.call(this, System.Globalization.CultureInfo.invariantCulture);
            }
        },
        methods: {
            Write$3: function (buffer, index, count) { },
            Write$10: function (value) { },
            WriteLine: function () { },
            WriteLine$11: function (value) { },
            WriteLine$9: function (value) { }
        }
    });
});
