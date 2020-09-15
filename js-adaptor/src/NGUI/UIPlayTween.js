Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPlayTween", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            }
        },
        fields: {
            tweenTarget: null,
            tweenGroup: 0,
            trigger: 0,
            playDirection: 0,
            resetOnPlay: false,
            resetIfDisabled: false,
            ifDisabledOnPlay: 0,
            disableWhenFinished: 0,
            includeChildren: false,
            onFinished: null
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
            Play: function (forward) {
                throw new System.Exception("not impl");
            }
        }
    });
});
