Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("System.IO.Path", {
        statics: {
            fields: {
                DirectorySeparatorChar: 0
            },
            methods: {
                Combine: function (path1, path2) {
                    if (System.String.endsWith(path1, "/")) {
                        return (path1 || "") + (path2 || "");
                    }
                    return (path1 || "") + "/" + (path2 || "");
                },
                GetExtension: function (path) {
                    throw new System.Exception("not impl");
                },
                GetDirectoryName: function (path) {
                    throw new System.Exception("not impl");
                },
                GetFileNameWithoutExtension: function (path) {
                    throw new System.Exception("not impl");
                },
                GetFullPath: function (path) {
                    throw new System.Exception("not impl");
                },
                GetFullName: function (path) {
                    throw new System.Exception("not impl");
                },
                GetFileName: function (path) {
                    throw new System.Exception("not impl");
                }
            }
        }
    });
});
