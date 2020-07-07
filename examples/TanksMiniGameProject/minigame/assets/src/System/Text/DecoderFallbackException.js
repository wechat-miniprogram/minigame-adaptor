Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.Text.DecoderFallbackException", {
        inherits: [System.ArgumentException],
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.ArgumentException.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
