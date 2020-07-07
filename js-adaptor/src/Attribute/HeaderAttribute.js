Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.HeaderAttribute", {
        inherits: [MiniGameAdaptor.PropertyAttribute],
        fields: {
            header: null
        },
        ctors: {
            ctor: function (header) {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
                this.header = header;
            }
        }
    });
});

 
