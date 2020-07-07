Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Coroutine", {
        inherits: [MiniGameAdaptor.YieldInstruction],
        fields: {
            routine: null,
            waitForCoroutine: null,
            finished: false,
            __past: null
        },
        props: {
            keepWaiting: {
                get: function () {
                    return this.finished;
                }
            }
        },
        ctors: {
            ctor: function (routine) {
                this.$initialize();
                MiniGameAdaptor.YieldInstruction.ctor.call(this);
                this.routine = routine;
            }
        }
    });

});

 
