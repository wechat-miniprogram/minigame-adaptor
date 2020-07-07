Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Events.UnityEventCallState", {
        $kind: "enum",
        statics: {
            fields: {
                Off: 0,
                EditorAndRuntime: 1,
                RuntimeOnly: 2
            }
        }
    });
});

 
