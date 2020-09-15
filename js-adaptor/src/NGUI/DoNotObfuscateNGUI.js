Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.DoNotObfuscateNGUI", {
        inherits: [System.Attribute],
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
