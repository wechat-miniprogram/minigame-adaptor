Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIImageButton", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            target: null,
            normalSprite: null,
            hoverSprite: null,
            pressedSprite: null,
            disabledSprite: null,
            pixelSnap: false
        },
        props: {
            isEnabled: {
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
        }
    });
});
