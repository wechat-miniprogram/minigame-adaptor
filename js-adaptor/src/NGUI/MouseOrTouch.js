Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICamera.MouseOrTouch", {
        $kind: "nested class",
        fields: {
            key: 0,
            pos: null,
            lastPos: null,
            delta: null,
            totalDelta: null,
            pressedCam: null,
            last: null,
            current: null,
            pressed: null,
            dragged: null,
            pressTime: 0,
            clickTime: 0,
            clickNotification: 0,
            touchBegan: false,
            pressStarted: false,
            dragStarted: false,
            ignoreDelta: 0
        },
        props: {
            deltaTime: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isOverUI: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.pos = new MiniGameAdaptor.Vector2();
                this.lastPos = new MiniGameAdaptor.Vector2();
                this.delta = new MiniGameAdaptor.Vector2();
                this.totalDelta = new MiniGameAdaptor.Vector2();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});
