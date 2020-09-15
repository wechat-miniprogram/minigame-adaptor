Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.BetterList$1", {
        fields: {
            size: 0
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        },
        methods: {
            getItem: function (i) {
                throw new System.Exception("not impl");
            },
            setItem: function (i, value) {
                throw new System.Exception("not impl");
            },
            Add: function (item) {
                throw new System.Exception("not impl");
            },
            Clear: function () {
                throw new System.Exception("not impl");
            },
            Contains: function (item) {
                throw new System.Exception("not impl");
            },
            GetEnumerator: function () {
                throw new System.Exception("not impl");
            },
            IndexOf: function (item) {
                throw new System.Exception("not impl");
            },
            Insert: function (index, item) {
                throw new System.Exception("not impl");
            },
            Pop: function () {
                throw new System.Exception("not impl");
            },
            Release: function () {
                throw new System.Exception("not impl");
            },
            Remove: function (item) {
                throw new System.Exception("not impl");
            },
            RemoveAt: function (index) {
                throw new System.Exception("not impl");
            },
            Sort: function (comparer) {
                throw new System.Exception("not impl");
            },
            ToArray: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
