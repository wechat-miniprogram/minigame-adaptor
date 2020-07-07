Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.ShaderVariantCollection", {
        inherits: [MiniGameAdaptor.Object],
        props: {
            isWarmedUp: {
                get: function () {
                    
                }
            },
            shaderCount: {
                get: function () {
                    
                }
            },
            variantCount: {
                get: function () {
                    
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);
            }
        },
        methods: {
            Add: function (variant) {
                
            },
            Clear: function () {
                
            },
            Contains: function (variant) {
                
            },
            Remove: function (variant) {
                
            },
            WarmUp: function () {
                
            }
        }
    });
});
