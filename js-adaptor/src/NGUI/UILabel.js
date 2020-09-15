Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UILabel", {
        inherits: [MiniGameAdaptor.UIWidget],
        statics: {
            fields: {
                list: null,
                current: null
            },
            methods: {
                Deserialize: function (data, comp, context, builtContext) {
                    return comp;
                }
            }
        },
        fields: {
            keepCrispWhenShrunk: 0,
            customModifier: null
        },
        props: {
            alignment: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            ambigiousFont: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            applyGradient: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            bitmapFont: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            defaultFontSize: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            drawingDimensions: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
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
            effectiveSpacingX: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            effectiveSpacingY: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            effectStyle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            finalFontSize: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            floatSpacingX: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            floatSpacingY: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fontSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fontStyle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            gradientBottom: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            gradientTop: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isAnchoredHorizontally: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isAnchoredVertically: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localCorners: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localSize: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            mainTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            material: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            maxLineCount: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            modifier: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            multiLine: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            overflowEllipsis: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            overflowHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            overflowMethod: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            overflowWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            printedSize: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            printedText: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            processedText: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            quadsPerCharacter: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            spacingX: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spacingY: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            supportEncoding: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            symbolStyle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            text: {
                get: function () {
                    // throw new System.Exception("not impl");
                    // TODO
                },
                set: function (value) {
                    // throw new System.Exception("not impl");
                    // TODO
                }
            },
            trueTypeFont: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useFloatSpacing: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            worldCorners: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                console.log('1111');
                this.$initialize();
                MiniGameAdaptor.UIWidget.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            ApplyOffset: function (verts, start) {
                throw new System.Exception("not impl");
            },
            ApplyShadow: function (verts, uvs, cols, start, end, x, y) {
                throw new System.Exception("not impl");
            },
            AssumeNaturalSize: function () {
                throw new System.Exception("not impl");
            },
            CalculateOffsetToFit: function (text) {
                throw new System.Exception("not impl");
            },
            GetCharacterIndex: function (currentIndex, key) {
                throw new System.Exception("not impl");
            },
            GetCharacterIndexAtPosition: function (localPos, precise) {
                throw new System.Exception("not impl");
            },
            GetCharacterIndexAtPosition$1: function (worldPos, precise) {
                throw new System.Exception("not impl");
            },
            GetSides: function (relativeTo) {
                throw new System.Exception("not impl");
            },
            GetUrlAtCharacterIndex: function (characterIndex) {
                throw new System.Exception("not impl");
            },
            GetUrlAtPosition: function (localPos) {
                throw new System.Exception("not impl");
            },
            GetUrlAtPosition$1: function (worldPos) {
                throw new System.Exception("not impl");
            },
            GetWordAtCharacterIndex: function (characterIndex) {
                throw new System.Exception("not impl");
            },
            GetWordAtPosition: function (localPos) {
                throw new System.Exception("not impl");
            },
            GetWordAtPosition$1: function (worldPos) {
                throw new System.Exception("not impl");
            },
            MakePixelPerfect: function () {
                throw new System.Exception("not impl");
            },
            MarkAsChanged: function () {
                throw new System.Exception("not impl");
            },
            OnAnchor: function () {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                //throw new System.Exception("not impl");
            },
            OnEnable: function () {
                // throw new System.Exception("not impl");
                // @
            },
            OnFill: function (verts, uvs, cols) {
                throw new System.Exception("not impl");
            },
            OnInit: function () {
                throw new System.Exception("not impl");
            },
            OnStart: function () {
                throw new System.Exception("not impl");
            },
            PrintOverlay: function (start, end, caret, highlight, caretColor, highlightColor) {
                throw new System.Exception("not impl");
            },
            ProcessText: function (legacyMode, full) {
                if (legacyMode === void 0) { legacyMode = false; }
                if (full === void 0) { full = true; }
                throw new System.Exception("not impl");
            },
            SetActiveFont: function (fnt) {
                throw new System.Exception("not impl");
            },
            SetCurrentPercent: function () {
                throw new System.Exception("not impl");
            },
            SetCurrentProgress: function () {
                throw new System.Exception("not impl");
            },
            SetCurrentSelection: function () {
                throw new System.Exception("not impl");
            },
            UpdateNGUIText: function () {
                throw new System.Exception("not impl");
            },
            UpgradeFrom265: function () {
                throw new System.Exception("not impl");
            },
            Wrap: function (text, $final) {
                throw new System.Exception("not impl");
            },
            Wrap$1: function (text, $final, height) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UILabel')(MiniGameAdaptor.UILabel);
Object.defineProperty(MiniGameAdaptor.UILabel.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UILabel.prototype.__properties }
})
