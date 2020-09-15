Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Localization", {
        statics: {
            fields: {
                loadFunction: null,
                onLocalize: null,
                localizationHasBeenSet: false
            },
            props: {
                dictionary: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                knownLanguages: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                language: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                ClearReplacements: function () {
                    throw new System.Exception("not impl");
                },
                Exists: function (key) {
                    throw new System.Exception("not impl");
                },
                Format: function (key, parameter) {
                    throw new System.Exception("not impl");
                },
                Format$1: function (key, arg0, arg1) {
                    throw new System.Exception("not impl");
                },
                Format$2: function (key, arg0, arg1, arg2) {
                    throw new System.Exception("not impl");
                },
                Format$3: function (key, parameters) {
                    if (parameters === void 0) { parameters = []; }
                    throw new System.Exception("not impl");
                },
                Get: function (key, warnIfMissing) {
                    if (warnIfMissing === void 0) { warnIfMissing = true; }
                    throw new System.Exception("not impl");
                },
                Load: function (asset) {
                    throw new System.Exception("not impl");
                },
                LoadCSV: function (bytes, merge) {
                    if (merge === void 0) { merge = false; }
                    throw new System.Exception("not impl");
                },
                LoadCSV$1: function (asset, merge) {
                    if (merge === void 0) { merge = false; }
                    throw new System.Exception("not impl");
                },
                Reload: function () {
                    throw new System.Exception("not impl");
                },
                ReplaceKey: function (key, val) {
                    throw new System.Exception("not impl");
                },
                Set: function (languageName, bytes) {
                    throw new System.Exception("not impl");
                },
                Set$1: function (languageName, dictionary) {
                    throw new System.Exception("not impl");
                },
                Set$2: function (key, value) {
                    throw new System.Exception("not impl");
                },
                Set$3: function (language, key, text) {
                    throw new System.Exception("not impl");
                }
            }
        }
    });
});
