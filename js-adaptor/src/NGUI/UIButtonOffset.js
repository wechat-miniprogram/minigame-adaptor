Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIButtonOffset", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            tweenTarget: null,
            hover: null,
            pressed: null,
            duration: 0
        },
        ctors: {
            init: function () {
                this.hover = new MiniGameAdaptor.Vector3();
                this.pressed = new MiniGameAdaptor.Vector3();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
