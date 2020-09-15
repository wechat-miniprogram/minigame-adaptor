Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIRect", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                mSides: null
            }
        },
        fields: {
            leftAnchor: null,
            rightAnchor: null,
            bottomAnchor: null,
            topAnchor: null,
            updateAnchors: 0,
            mGo: null,
            mTrans: null,
            mChildren: null,
            mChanged: false,
            mParentFound: false,
            mCam: null,
            mStarted: false,
            finalAlpha: 0
        },
        props: {
            alpha: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            anchorCamera: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cachedGameObject: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cachedTransform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cameraRayDistance: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            canBeAnchored: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isAnchored: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isAnchoredHorizontally: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isAnchoredVertically: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isFullyAnchored: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localCorners: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            parent: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            root: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            worldCorners: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            Awake: function () {
                // throw new System.Exception("not impl");
            },
            CalculateFinalAlpha: function (frameID) {
                throw new System.Exception("not impl");
            },
            GetLocalPos: function (ac, trans) {
                throw new System.Exception("not impl");
            },
            GetSides: function (relativeTo) {
                throw new System.Exception("not impl");
            },
            Invalidate: function (includeChildren) {
                throw new System.Exception("not impl");
            },
            OnAnchor: function () {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                // throw new System.Exception("not impl");
            },
            OnEnable: function () {
                // throw new System.Exception("not impl");
            },
            OnInit: function () {
                throw new System.Exception("not impl");
            },
            OnStart: function () {
                throw new System.Exception("not impl");
            },
            OnUpdate: function () {
                throw new System.Exception("not impl");
            },
            ParentHasChanged: function () {
                throw new System.Exception("not impl");
            },
            ResetAnchors: function () {
                throw new System.Exception("not impl");
            },
            ResetAndUpdateAnchors: function () {
                throw new System.Exception("not impl");
            },
            SetAnchor: function (left, leftOffset, bottom, bottomOffset, right, rightOffset, top, topOffset) {
                throw new System.Exception("not impl");
            },
            SetAnchor$1: function (go) {
                throw new System.Exception("not impl");
            },
            SetAnchor$2: function (go, left, bottom, right, top) {
                throw new System.Exception("not impl");
            },
            SetAnchor$3: function (go, left, leftOffset, bottom, bottomOffset, right, rightOffset, top, topOffset) {
                throw new System.Exception("not impl");
            },
            SetAnchor$4: function (go, left, bottom, right, top) {
                throw new System.Exception("not impl");
            },
            SetAnchor$5: function (t) {
                throw new System.Exception("not impl");
            },
            SetRect: function (x, y, width, height) {
                throw new System.Exception("not impl");
            },
            SetScreenRect: function (left, top, width, height) {
                throw new System.Exception("not impl");
            },
            Start: function () {
                // throw new System.Exception("not impl");
            },
            // Update: function () {
                // throw new System.Exception("not impl");
            // },
            UpdateAnchors: function () {
                throw new System.Exception("not impl");
            },
            UpdateAnchorsInternal: function (frame) {
                throw new System.Exception("not impl");
            }
        }
    });
});
