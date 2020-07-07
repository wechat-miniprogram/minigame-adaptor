Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.UIBehaviour", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        methods: {
            IsActive: function () {
                throw new System.Exception("not impl");
            },
            IsDestroyed: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
