Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EnvelopContent", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            targetRoot: null,
            padLeft: 0,
            padRight: 0,
            padBottom: 0,
            padTop: 0,
            ignoreDisabled: false
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
            Execute: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
