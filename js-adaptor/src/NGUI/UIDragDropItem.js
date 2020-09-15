Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDragDropItem", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                draggedItems: null
            }
        },
        fields: {
            restriction: 0,
            cloneOnDrag: false,
            pressAndHoldDelay: 0,
            interactable: false,
            mTrans: null,
            mParent: null,
            mCollider: null,
            mCollider2D: null,
            mButton: null,
            mRoot: null,
            mGrid: null,
            mTable: null,
            mDragStartTime: 0,
            mDragScrollView: null,
            mPressed: false,
            mDragging: false,
            mTouch: null
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
            Awake: function () {
                throw new System.Exception("not impl");
            },
            DestroySelf: function () {
                throw new System.Exception("not impl");
            },
            EnableDragScrollView: function () {
                throw new System.Exception("not impl");
            },
            OnApplicationFocus: function (focus) {
                throw new System.Exception("not impl");
            },
            OnClone: function (original) {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                throw new System.Exception("not impl");
            },
            OnDrag: function (delta) {
                throw new System.Exception("not impl");
            },
            OnDragDropEnd: function () {
                throw new System.Exception("not impl");
            },
            OnDragDropMove: function (delta) {
                throw new System.Exception("not impl");
            },
            OnDragDropRelease: function (surface) {
                throw new System.Exception("not impl");
            },
            OnDragDropStart: function () {
                throw new System.Exception("not impl");
            },
            OnDragEnd: function () {
                throw new System.Exception("not impl");
            },
            OnDragStart: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            OnPress: function (isPressed) {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            StartDragging: function () {
                throw new System.Exception("not impl");
            },
            StopDragging: function (go) {
                if (go === void 0) { go = null; }
                throw new System.Exception("not impl");
            },
            Update: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
