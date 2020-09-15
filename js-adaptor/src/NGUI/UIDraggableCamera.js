Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDraggableCamera", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            rootForBounds: null,
            scale: null,
            scrollWheelFactor: 0,
            dragEffect: 0,
            smoothDragStart: false,
            momentumAmount: 0
        },
        props: {
            currentMomentum: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.scale = new MiniGameAdaptor.Vector2();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            ConstrainToBounds: function (immediate) {
                throw new System.Exception("not impl");
            },
            Drag: function (delta) {
                throw new System.Exception("not impl");
            },
            Press: function (isPressed) {
                throw new System.Exception("not impl");
            },
            Scroll: function (delta) {
                throw new System.Exception("not impl");
            }
        }
    });
});
