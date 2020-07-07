Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("PhyWorld.BoxEntity", {
        $kind: "nested class",
        fields: {
            collider: null,
            aabb: null
        }
    });
});
