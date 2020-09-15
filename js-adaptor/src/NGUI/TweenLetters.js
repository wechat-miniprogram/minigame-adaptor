Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TweenLetters", {
        inherits: [UITweener],
        fields: {
            hoverOver: null,
            hoverOut: null
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                UITweener.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            OnUpdate: function (factor, isFinished) {
                throw new System.Exception("not impl");
            },
            Play: function (forward) {
                throw new System.Exception("not impl");
            }
        }
    });
});
