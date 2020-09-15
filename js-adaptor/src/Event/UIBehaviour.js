Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.UIBehaviour", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        methods: {
            IsActive: function () {
                return this.entity.active;
            },
            IsDestroyed: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
