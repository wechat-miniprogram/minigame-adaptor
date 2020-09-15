Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UISavedOption", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            keyName: null
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
            SaveProgress: function () {
                throw new System.Exception("not impl");
            },
            SaveSelection: function () {
                throw new System.Exception("not impl");
            },
            SaveState: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
