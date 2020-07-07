Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.ContextMenu", {
        inherits: [System.Attribute],
        fields: {
            menuItem: null,
            validate: false,
            priority: 0
        },
        ctors: {
            ctor: function (itemName) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            },
            $ctor1: function (itemName, isValidateFunction) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            },
            $ctor2: function (itemName, isValidateFunction, priority) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            }
        }
    });
});
