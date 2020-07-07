Bridge.assembly("unity_project", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TextAreaAttribute", {
        inherits: [MiniGameAdaptor.PropertyAttribute],
        fields: {
            minLines: 0,
            maxLines: 0
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
            },
            $ctor1: function (minLines, maxLines) {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
                this.minLines = minLines;
                this.maxLines = maxLines;
            }
        }
    });
});
