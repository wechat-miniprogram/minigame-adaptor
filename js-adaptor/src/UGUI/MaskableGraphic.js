Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.MaskableGraphic", {
        inherits: [MiniGameAdaptor.UI.Graphic,MiniGameAdaptor.UI.IClippable,MiniGameAdaptor.UI.IMaskable,MiniGameAdaptor.UI.IMaterialModifier],
        props: {
            maskable: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            onCullStateChanged: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$IClippable$gameObject: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$IClippable$rectTransform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            Cull: function (clipRect, validRect) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$IClippable$Cull: function (clipRect, validRect) {
                throw new System.Exception("Exception");
            },
            GetModifiedMaterial: function (baseMaterial) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$IMaterialModifier$GetModifiedMaterial: function (baseMaterial) {
                throw new System.Exception("Exception");
            },
            RecalculateClipping: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$IClippable$RecalculateClipping: function () {
                throw new System.Exception("Exception");
            },
            RecalculateMasking: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$IMaskable$RecalculateMasking: function () {
                throw new System.Exception("Exception");
            },
            SetClipRect: function (clipRect, validRect) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$IClippable$SetClipRect: function (value, validRect) {
                throw new System.Exception("Exception");
            }
        }
    });
});

 
