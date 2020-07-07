Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.DirectoryNotFoundException", {
        inherits: [System.IO.IOException],
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.IO.IOException.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
