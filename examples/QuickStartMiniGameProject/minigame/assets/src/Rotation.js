Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Rotation", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        methods: {
            Start: function () {

            },
            Update: function () {
                this.transform.Rotate$2(MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.up.$clone(), 100), MiniGameAdaptor.Time.deltaTime));
            }
        }
    });
});
