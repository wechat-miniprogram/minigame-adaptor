Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.Directory", {
        statics: {
            methods: {
                GetDirectories: function (path) {
                    throw new System.Exception("not impl");
                },
                Exists: function (path) {
                    // throw new Exception("not impl");
                    return false;
                },
                CreateDirectory: function (path) {
                    throw new System.Exception("not impl");
                },
                GetFiles: function (path) {
                    throw new System.Exception("not impl");
                },
                GetFiles$1: function (path, searchPattern, searchOption) {
                    throw new System.Exception("not impl");
                },
                GetParent: function (path) {
                    throw new System.Exception("not impl");
                },
                Delete: function (path) {
                    throw new System.Exception("not impl");
                },
                Delete$1: function (path, recursive) {
                    throw new System.Exception("not impl");
                }
            }
        }
    });
});
