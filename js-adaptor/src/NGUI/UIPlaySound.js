Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPlaySound", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            audioClip: null,
            trigger: 0,
            volume: 0,
            pitch: 0
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
            Play: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
