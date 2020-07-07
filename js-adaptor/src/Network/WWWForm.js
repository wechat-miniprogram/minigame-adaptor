Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.WWWForm", {
        fields: {
            _dictdata:{},
            _strdictdata:"",
        },
        props: {
            data: {
                get: function () {
                    this._strdictdata = JSON.stringify(this._dictdata);
                    return this._strdictdata;
                }
            },
            headers: {
                get: function () {
                    //header是只读的,尚不清楚如何获取,暂不支持
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            AddBinaryData: function (fieldName, contents) {
                throw new System.Exception("not impl");
            },
            AddBinaryData$1: function (fieldName, contents, fileName) {
                throw new System.Exception("not impl");
            },
            AddBinaryData$2: function (fieldName, contents, fileName, mimeType) {
                throw new System.Exception("not impl");
            },
            AddField: function (fieldName, i) {
                this._dictdata[fieldName] = i;
            },
            AddField$1: function (fieldName, value) {
                this._dictdata[fieldName] = value;
            },
            AddField$2: function (fieldName, value, e) {
                throw new System.Exception("not impl");
            }
        }
    });
});


