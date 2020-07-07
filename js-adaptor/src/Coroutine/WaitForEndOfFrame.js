Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.WaitForEndOfFrame", {
        inherits: [MiniGameAdaptor.YieldInstruction],
        fields: {
            first: true,
        },
        props: {
            keepWaiting: {
                get: function () {
                    if (this.first) {
                        this.first = false;
                        return true;
                    }
                    return false;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.YieldInstruction.ctor.call(this);
            }
        }
    });
});

 
