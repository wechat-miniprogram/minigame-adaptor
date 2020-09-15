Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.NGUIText", {
        statics: {
            fields: {
                bitmapFont: null,
                dynamicFont: null,
                glyph: null,
                fontSize: 0,
                fontScale: 0,
                pixelDensity: 0,
                fontStyle: 0,
                alignment: 0,
                tint: null,
                rectWidth: 0,
                rectHeight: 0,
                regionWidth: 0,
                regionHeight: 0,
                maxLines: 0,
                gradient: false,
                gradientBottom: null,
                gradientTop: null,
                encoding: false,
                spacingX: 0,
                spacingY: 0,
                premultiply: false,
                symbolStyle: 0,
                finalSize: 0,
                finalSpacingX: 0,
                finalLineHeight: 0,
                baseline: 0,
                useSymbols: false
            },
            ctors: {
                init: function () {
                    this.tint = new MiniGameAdaptor.Color();
                    this.gradientBottom = new MiniGameAdaptor.Color();
                    this.gradientTop = new MiniGameAdaptor.Color();
                }
            },
            methods: {
                Align: function (verts, indexOffset, printedWidth, elements) {
                    if (elements === void 0) { elements = 4; }
                    throw new System.Exception("not impl");
                },
                CalculateOffsetToFit: function (text) {
                    throw new System.Exception("not impl");
                },
                CalculatePrintedSize: function (text) {
                    throw new System.Exception("not impl");
                },
                EncodeAlpha: function (a) {
                    throw new System.Exception("not impl");
                },
                EncodeColor: function (text, c) {
                    throw new System.Exception("not impl");
                },
                EncodeColor$1: function (c) {
                    throw new System.Exception("not impl");
                },
                EncodeColor24: function (c) {
                    throw new System.Exception("not impl");
                },
                EncodeColor32: function (c) {
                    throw new System.Exception("not impl");
                },
                EndLine: function (s) {
                    throw new System.Exception("not impl");
                },
                GetApproximateCharacterIndex: function (verts, indices, pos) {
                    throw new System.Exception("not impl");
                },
                GetEndOfLineThatFits: function (text) {
                    throw new System.Exception("not impl");
                },
                GetExactCharacterIndex: function (verts, indices, pos) {
                    throw new System.Exception("not impl");
                },
                GetGlyph: function (ch, prev, fontScale) {
                    if (fontScale === void 0) { fontScale = 1.0; }
                    throw new System.Exception("not impl");
                },
                GetGlyphWidth: function (ch, prev, fontScale) {
                    throw new System.Exception("not impl");
                },
                GetSymbol: function (text, index, textLength) {
                    throw new System.Exception("not impl");
                },
                InsertHyperlink: function (text, index, keyword, link, prefix, suffix) {
                    if (prefix === void 0) { prefix = null; }
                    if (suffix === void 0) { suffix = null; }
                    throw new System.Exception("not impl");
                },
                IsHex: function (ch) {
                    throw new System.Exception("not impl");
                },
                IsSpace: function (ch) {
                    throw new System.Exception("not impl");
                },
                ParseAlpha: function (text, index) {
                    throw new System.Exception("not impl");
                },
                ParseColor: function (text, offset) {
                    if (offset === void 0) { offset = 0; }
                    throw new System.Exception("not impl");
                },
                ParseColor24: function (text, offset) {
                    if (offset === void 0) { offset = 0; }
                    throw new System.Exception("not impl");
                },
                ParseColor32: function (text, offset) {
                    throw new System.Exception("not impl");
                },
                ParseSymbol: function (text, index) {
                    throw new System.Exception("not impl");
                },
                ParseSymbol$1: function (text, index, colors, premultiply, sub, bold, italic, underline, strike, ignoreColor) {
                    throw new System.Exception("not impl");
                },
                Prepare: function (text) {
                    throw new System.Exception("not impl");
                },
                Print: function (text, verts, uvs, cols) {
                    throw new System.Exception("not impl");
                },
                PrintApproximateCharacterPositions: function (text, verts, indices) {
                    throw new System.Exception("not impl");
                },
                PrintCaretAndSelection: function (text, start, end, caret, highlight) {
                    throw new System.Exception("not impl");
                },
                PrintExactCharacterPositions: function (text, verts, indices) {
                    throw new System.Exception("not impl");
                },
                ReplaceLink: function (text, index, type, prefix, suffix) {
                    if (prefix === void 0) { prefix = null; }
                    if (suffix === void 0) { suffix = null; }
                    throw new System.Exception("not impl");
                },
                ReplaceLinks: function (text, prefix, suffix) {
                    if (prefix === void 0) { prefix = null; }
                    if (suffix === void 0) { suffix = null; }
                    throw new System.Exception("not impl");
                },
                StripSymbols: function (text) {
                    throw new System.Exception("not impl");
                },
                Update: function () {
                    throw new System.Exception("not impl");
                },
                Update$1: function (request) {
                    throw new System.Exception("not impl");
                },
                WrapText: function (text, finalText, wrapLineColors) {
                    if (wrapLineColors === void 0) { wrapLineColors = false; }
                    throw new System.Exception("not impl");
                },
                WrapText$1: function (text, finalText, keepCharCount, wrapLineColors, useEllipsis) {
                    if (useEllipsis === void 0) { useEllipsis = false; }
                    throw new System.Exception("not impl");
                }
            }
        }
    });
});
