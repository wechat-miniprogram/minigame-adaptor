Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.Security.Cryptography.MD5CryptoServiceProvider", {
        inherits: [System.Security.Cryptography.MD5],
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                System.Security.Cryptography.MD5.ctor.call(this);

            }
        }
    });
});
