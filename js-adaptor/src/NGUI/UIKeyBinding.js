Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIKeyBinding", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            methods: {
                GetActiveModifier: function () {
                    throw new System.Exception("not impl");
                },
                GetKeyCode: function (text, key, modifier) {
                    throw new System.Exception("not impl");
                },
                GetString: function (keyCode, modifier) {
                    throw new System.Exception("not impl");
                },
                IsBound: function (key) {
                    throw new System.Exception("not impl");
                },
                IsModifierActive: function (modifier) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            keyCode: 0,
            modifier: 0,
            action: 0
        },
        props: {
            captionText: {
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
            IsModifierActive: function () {
                throw new System.Exception("not impl");
            },
            OnBindingClick: function () {
                throw new System.Exception("not impl");
            },
            OnBindingPress: function (pressed) {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            OnSubmit: function () {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            },
            Update: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
