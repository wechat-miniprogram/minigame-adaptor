Bridge.assembly("unity_project", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RuntimeInitializeOnLoadMethodAttribute", {
        inherits: [MiniGameAdaptor.Scripting.PreserveAttribute],
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Scripting.PreserveAttribute.ctor.call(this);
            },
            $ctor1: function (loadType) {
                this.$initialize();
                MiniGameAdaptor.Scripting.PreserveAttribute.ctor.call(this);
            }
        }
    });
});
