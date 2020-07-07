Bridge.assembly("unity_project", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.MultilineAttribute", {
        inherits: [MiniGameAdaptor.PropertyAttribute],
        fields: {
            lines: 0
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
            },
            $ctor1: function (lines) {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
                this.lines = lines;
            }
        }
    });
});
