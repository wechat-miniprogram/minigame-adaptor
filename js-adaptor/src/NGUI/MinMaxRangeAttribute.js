Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.MinMaxRangeAttribute", {
        inherits: [MiniGameAdaptor.PropertyAttribute],
        fields: {
            minLimit: 0,
            maxLimit: 0
        },
        ctors: {
            ctor: function (minLimit, maxLimit) {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
