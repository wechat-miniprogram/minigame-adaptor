Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIButtonKeys", {
        inherits: [UIKeyNavigation],
        fields: {
            selectOnClick: null,
            selectOnUp: null,
            selectOnDown: null,
            selectOnLeft: null,
            selectOnRight: null
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                UIKeyNavigation.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            Upgrade: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
