Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIKeyNavigation", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                list: null,
                mLastFrame: 0
            },
            props: {
                current: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                GetCenter: function (go) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            constraint: 0,
            onUp: null,
            onDown: null,
            onLeft: null,
            onRight: null,
            onClick: null,
            onTab: null,
            startsSelected: false
        },
        props: {
            isColliderEnabled: {
                get: function () {
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
            Get: function (myDir, x, y) {
                if (x === void 0) { x = 1.0; }
                if (y === void 0) { y = 1.0; }
                throw new System.Exception("not impl");
            },
            GetDown: function () {
                throw new System.Exception("not impl");
            },
            GetLeft: function () {
                throw new System.Exception("not impl");
            },
            GetRight: function () {
                throw new System.Exception("not impl");
            },
            GetUp: function () {
                throw new System.Exception("not impl");
            },
            OnClick: function () {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            OnKey: function (key) {
                throw new System.Exception("not impl");
            },
            OnNavigate: function (key) {
                throw new System.Exception("not impl");
            }
        }
    });
});
