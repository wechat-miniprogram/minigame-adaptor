Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.WaitForSeconds", {
        inherits: [MiniGameAdaptor.YieldInstruction],
        fields: {
            endTime: 0
        },
        props: {
            keepWaiting: {
                get: function () {
                    if (MiniGameAdaptor.Time.time <= this.endTime) {
                        return true;
                    }
                    return false;
                }
            }
        },
        ctors: {
            ctor: function (seconds) {
                this.$initialize();
                MiniGameAdaptor.YieldInstruction.ctor.call(this);
                // this.endTime = Date.now() + seconds * 1000;
                this.endTime = MiniGameAdaptor.Time.time + seconds;
            }
        }
    });
});