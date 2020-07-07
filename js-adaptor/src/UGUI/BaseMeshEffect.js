Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.BaseMeshEffect", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour,MiniGameAdaptor.UI.IMeshModifier],
        methods: {
            ModifyMesh: function (mesh) {
                throw new System.Exception("not impl");
            },
            ModifyMesh$1: function (vh) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$IMeshModifier$ModifyMesh: function (verts) {
                throw new System.Exception("Exception");
            }
        }
    });
});

 
