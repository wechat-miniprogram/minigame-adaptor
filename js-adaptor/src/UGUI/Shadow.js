Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Shadow", {
        inherits: [MiniGameAdaptor.UI.BaseMeshEffect],
        props: {
            effectColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            effectDistance: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useGraphicAlpha: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        alias: ["ModifyMesh$1", "MiniGameAdaptor$UI$IMeshModifier$ModifyMesh"],
        methods: {
            ModifyMesh$1: function (vh) {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
