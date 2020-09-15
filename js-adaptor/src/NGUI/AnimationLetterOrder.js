Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.TweenLetters.AnimationLetterOrder", {
        $kind: "nested enum",
        statics: {
            fields: {
                Forward: 0,
                Reverse: 1,
                Random: 2
            }
        }
    });
});
