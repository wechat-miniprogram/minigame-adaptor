Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIWrapContent", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            itemSize: 0,
            cullContent: false,
            minIndex: 0,
            maxIndex: 0,
            hideInactive: false,
            onInitializeItem: null,
            mTrans: null,
            mPanel: null,
            mScroll: null,
            mHorizontal: false,
            mFirstTime: false,
            mChildren: null
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
            CacheScrollView: function () {
                throw new System.Exception("not impl");
            },
            OnMove: function (panel) {
                throw new System.Exception("not impl");
            },
            ResetChildPositions: function () {
                throw new System.Exception("not impl");
            },
            SortAlphabetically: function () {
                throw new System.Exception("not impl");
            },
            SortBasedOnScrollMovement: function () {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            UpdateItem: function (item, index) {
                throw new System.Exception("not impl");
            },
            WrapContent: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
