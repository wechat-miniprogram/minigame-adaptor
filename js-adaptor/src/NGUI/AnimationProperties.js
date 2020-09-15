Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TweenLetters.AnimationProperties", {
        $kind: "nested class",
        fields: {
            animationOrder: 0,
            overlap: 0,
            randomDurations: false,
            randomness: null,
            offsetRange: null,
            pos: null,
            rot: null,
            scale: null,
            alpha: 0
        },
        ctors: {
            init: function () {
                this.randomness = new MiniGameAdaptor.Vector2();
                this.offsetRange = new MiniGameAdaptor.Vector2();
                this.pos = new MiniGameAdaptor.Vector3();
                this.rot = new MiniGameAdaptor.Vector3();
                this.scale = new MiniGameAdaptor.Vector3();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                throw new System.Exception("not impl");
            }
        }
    });
});
