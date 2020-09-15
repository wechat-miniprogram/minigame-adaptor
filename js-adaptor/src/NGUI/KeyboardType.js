Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIInput.KeyboardType", {
        $kind: "nested enum",
        statics: {
            fields: {
                Default: 0,
                ASCIICapable: 1,
                NumbersAndPunctuation: 2,
                URL: 3,
                NumberPad: 4,
                PhonePad: 5,
                NamePhonePad: 6,
                EmailAddress: 7
            }
        }
    });
});
