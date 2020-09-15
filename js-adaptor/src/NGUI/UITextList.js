Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UITextList", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            textLabel: null,
            scrollBar: null,
            style: 0,
            paragraphHistory: 0,
            mSeparator: null,
            mScroll: 0,
            mTotalLines: 0,
            mLastWidth: 0,
            mLastHeight: 0
        },
        props: {
            isValid: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            lineHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            paragraphCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            paragraphs: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            scrollHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            scrollValue: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Add: function (text) {
                throw new System.Exception("not impl");
            },
            Add$1: function (text, updateVisible) {
                throw new System.Exception("not impl");
            },
            Clear: function () {
                throw new System.Exception("not impl");
            },
            OnDrag: function (delta) {
                throw new System.Exception("not impl");
            },
            OnScroll: function (val) {
                throw new System.Exception("not impl");
            },
            Rebuild: function () {
                throw new System.Exception("not impl");
            },
            UpdateVisibleText: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
