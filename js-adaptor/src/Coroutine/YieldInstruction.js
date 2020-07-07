Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.YieldInstruction", {
        inherits: [System.Collections.IEnumerator],
        props: {
            Current: {
                get: function () {
                    return null;
                }
            }
        },
        alias: [
            "Current", "System$Collections$IEnumerator$Current",
            "moveNext", "System$Collections$IEnumerator$moveNext",
            "reset", "System$Collections$IEnumerator$reset"
        ],
        methods: {
            moveNext: function () {
                return this.keepWaiting;
            },
            reset: function () { }
        }
    });
});

 
