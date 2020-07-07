Bridge.assembly("unity_project", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RangeAttribute", {
        inherits: [MiniGameAdaptor.PropertyAttribute],
        fields: {
            min: 0,
            max: 0
        },
        ctors: {
            ctor: function (min, max) {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
                this.min = min;
                this.max = max;
            }
        }
    });
});
