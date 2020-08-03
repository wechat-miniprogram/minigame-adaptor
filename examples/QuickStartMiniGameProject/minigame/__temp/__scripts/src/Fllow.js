Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Fllow", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            player: null,
            speed: 0,
            distance: null
        },
        ctors: {
            init: function () {
                this.distance = new MiniGameAdaptor.Vector3();
                this.speed = 5.0;
            }
        },
        methods: {
            Start: function () {

                this.distance = MiniGameAdaptor.Vector3.op_Subtraction(this.transform.position.$clone(), this.player.position.$clone());
            },
            Update: function () {
                var targetCamPos = MiniGameAdaptor.Vector3.op_Addition(this.player.position.$clone(), this.distance.$clone());

                this.transform.position = targetCamPos.$clone();
            }
        }
    });
});
