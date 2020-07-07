Bridge.assembly("unity_project", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.RequireComponent", {
        inherits: [System.Attribute],
        fields: {
            m_Type0: null,
            m_Type1: null,
            m_Type2: null
        },
        ctors: {
            ctor: function (requiredComponent) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            },
            $ctor1: function (requiredComponent, requiredComponent2) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            },
            $ctor2: function (requiredComponent, requiredComponent2, requiredComponent3) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            }
        }
    });
});
