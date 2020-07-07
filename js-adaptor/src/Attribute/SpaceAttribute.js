Bridge.assembly("unity_project", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.SpaceAttribute", {
        inherits: [MiniGameAdaptor.PropertyAttribute],
        fields: {
            height: 0
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
            },
            $ctor1: function (height) {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
            }
        }
    });
});
