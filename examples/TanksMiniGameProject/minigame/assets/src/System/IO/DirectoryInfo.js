Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.DirectoryInfo", {
        props: {
            FullName: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function (path) {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});
