Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.PropertyBinding", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            source: null,
            target: null,
            direction: 0,
            update: 0,
            editMode: false
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
            UpdateTarget: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
