Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.NGUIMath", {
        statics: {
            methods: {
                AdjustByDPI: function (height) {
                    throw new System.Exception("not impl");
                },
                AdjustWidget: function (w, left, bottom, right, top) {
                    throw new System.Exception("not impl");
                },
                AdjustWidget$1: function (w, left, bottom, right, top, minWidth, minHeight) {
                    throw new System.Exception("not impl");
                },
                AdjustWidget$2: function (w, left, bottom, right, top, minWidth, minHeight, maxWidth, maxHeight) {
                    throw new System.Exception("not impl");
                },
                CalculateAbsoluteWidgetBounds: function (trans) {
                    throw new System.Exception("not impl");
                },
                CalculateRelativeWidgetBounds: function (trans) {
                    throw new System.Exception("not impl");
                },
                CalculateRelativeWidgetBounds$1: function (trans, considerInactive) {
                    throw new System.Exception("not impl");
                },
                CalculateRelativeWidgetBounds$2: function (relativeTo, content) {
                    throw new System.Exception("not impl");
                },
                CalculateRelativeWidgetBounds$3: function (relativeTo, content, considerInactive, considerChildren) {
                    if (considerChildren === void 0) { considerChildren = true; }
                    throw new System.Exception("not impl");
                },
                ClampIndex: function (val, max) {
                    throw new System.Exception("not impl");
                },
                ColorToInt: function (c) {
                    throw new System.Exception("not impl");
                },
                ConstrainRect: function (minRect, maxRect, minArea, maxArea) {
                    throw new System.Exception("not impl");
                },
                ConvertToPixels: function (rect, width, height, round) {
                    throw new System.Exception("not impl");
                },
                ConvertToTexCoords: function (rect, width, height) {
                    throw new System.Exception("not impl");
                },
                DecimalToHex24: function (num) {
                    throw new System.Exception("not impl");
                },
                DecimalToHex32: function (num) {
                    throw new System.Exception("not impl");
                },
                DecimalToHex8: function (num) {
                    throw new System.Exception("not impl");
                },
                DecimalToHexChar: function (num) {
                    throw new System.Exception("not impl");
                },
                DistanceToRectangle: function (screenPoints, mousePos) {
                    throw new System.Exception("not impl");
                },
                DistanceToRectangle$1: function (worldPoints, mousePos, cam) {
                    throw new System.Exception("not impl");
                },
                GetPivot: function (offset) {
                    throw new System.Exception("not impl");
                },
                GetPivotOffset: function (pv) {
                    throw new System.Exception("not impl");
                },
                HexToColor: function (val) {
                    throw new System.Exception("not impl");
                },
                HexToDecimal: function (ch) {
                    throw new System.Exception("not impl");
                },
                IntToBinary: function (val, bits) {
                    throw new System.Exception("not impl");
                },
                IntToColor: function (val) {
                    throw new System.Exception("not impl");
                },
                Lerp: function (from, to, factor) {
                    throw new System.Exception("not impl");
                },
                MakePixelPerfect: function (rect) {
                    throw new System.Exception("not impl");
                },
                MakePixelPerfect$1: function (rect, width, height) {
                    throw new System.Exception("not impl");
                },
                MoveRect: function (rect, x, y) {
                    throw new System.Exception("not impl");
                },
                MoveWidget: function (w, x, y) {
                    throw new System.Exception("not impl");
                },
                OverlayPosition: function (trans, target) {
                    throw new System.Exception("not impl");
                },
                OverlayPosition$1: function (trans, worldPos, worldCam) {
                    throw new System.Exception("not impl");
                },
                OverlayPosition$2: function (trans, worldPos, worldCam, myCam) {
                    throw new System.Exception("not impl");
                },
                RepeatIndex: function (val, max) {
                    throw new System.Exception("not impl");
                },
                ResizeWidget: function (w, pivot, x, y, minWidth, minHeight) {
                    throw new System.Exception("not impl");
                },
                ResizeWidget$1: function (w, pivot, x, y, minWidth, minHeight, maxWidth, maxHeight) {
                    throw new System.Exception("not impl");
                },
                RotateTowards: function (from, to, maxAngle) {
                    throw new System.Exception("not impl");
                },
                ScreenToParentPixels: function (pos, relativeTo) {
                    throw new System.Exception("not impl");
                },
                ScreenToPixels: function (pos, relativeTo) {
                    throw new System.Exception("not impl");
                },
                SpringDampen: function (velocity, strength, deltaTime) {
                    throw new System.Exception("not impl");
                },
                SpringDampen$1: function (velocity, strength, deltaTime) {
                    throw new System.Exception("not impl");
                },
                SpringLerp: function (strength, deltaTime) {
                    throw new System.Exception("not impl");
                },
                SpringLerp$1: function (from, to, strength, deltaTime) {
                    throw new System.Exception("not impl");
                },
                SpringLerp$2: function (from, to, strength, deltaTime) {
                    throw new System.Exception("not impl");
                },
                SpringLerp$3: function (from, to, strength, deltaTime) {
                    throw new System.Exception("not impl");
                },
                SpringLerp$4: function (from, to, strength, deltaTime) {
                    throw new System.Exception("not impl");
                },
                WorldToLocalPoint: function (worldPos, worldCam, uiCam, relativeTo) {
                    throw new System.Exception("not impl");
                },
                Wrap01: function (val) {
                    throw new System.Exception("not impl");
                },
                WrapAngle: function (angle) {
                    throw new System.Exception("not impl");
                }
            }
        }
    });
});
