Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TooltipAttribute", {
        inherits: [MiniGameAdaptor.PropertyAttribute],
        fields: {
            tooltip: null
        },
        ctors: {
            ctor: function (tooltip) {
                this.$initialize();
                MiniGameAdaptor.PropertyAttribute.ctor.call(this);
                this.tooltip = tooltip ? tooltip : "";
            }
        }
    });
});

 
