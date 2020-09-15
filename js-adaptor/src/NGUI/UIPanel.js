Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPanel", {
        inherits: [UIRect],
        statics: {
            fields: {
                list: null
            },
            props: {
                nextUnusedDepth: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                CompareFunc: function (a, b) {
                    throw new System.Exception("not impl");
                },
                Find: function (trans) {
                    throw new System.Exception("not impl");
                },
                Find$1: function (trans, createIfMissing) {
                    throw new System.Exception("not impl");
                },
                Find$2: function (trans, createIfMissing, layer) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            onGeometryUpdated: null,
            showInPanelTool: false,
            generateNormals: false,
            generateUV2: false,
            shadowMode: 0,
            widgetsAreStatic: false,
            cullWhileDragging: false,
            alwaysOnScreen: false,
            anchorOffset: false,
            softBorderPadding: false,
            renderQueue: 0,
            startingRenderQueue: 0,
            widgets: null,
            drawCalls: null,
            worldToLocal: null,
            drawCallClipRange: null,
            onClipMove: null,
            onCreateMaterial: null,
            onCreateDrawCall: null,
            useSortingOrder: false
        },
        props: {
            alpha: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            baseClipRegion: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            canBeAnchored: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            clipCount: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            clipOffset: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            clipping: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            clipSoftness: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            clipTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            depth: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            drawCallOffset: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            finalClipRegion: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            halfPixelOffset: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasClipping: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasCumulativeClipping: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            height: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localCorners: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            parentPanel: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            sortingLayerName: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sortingOrder: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            usedForUI: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            width: {
                get: function () {
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
            init: function () {
                this.worldToLocal = new MiniGameAdaptor.Matrix4x4();
                this.drawCallClipRange = new MiniGameAdaptor.Vector4();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                UIRect.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            AddWidget: function (w) {
                throw new System.Exception("not impl");
            },
            Affects: function (w) {
                throw new System.Exception("not impl");
            },
            Awake: function () {
                throw new System.Exception("not impl");
            },
            CalculateConstrainOffset: function (min, max) {
                throw new System.Exception("not impl");
            },
            CalculateFinalAlpha: function (frameID) {
                throw new System.Exception("not impl");
            },
            ConstrainTargetToBounds: function (target, immediate) {
                throw new System.Exception("not impl");
            },
            ConstrainTargetToBounds$1: function (target, targetBounds, immediate) {
                throw new System.Exception("not impl");
            },
            FillDrawCall: function (dc) {
                throw new System.Exception("not impl");
            },
            FindDrawCall: function (w) {
                throw new System.Exception("not impl");
            },
            GetSides: function (relativeTo) {
                throw new System.Exception("not impl");
            },
            GetViewSize: function () {
                throw new System.Exception("not impl");
            },
            GetWindowSize: function () {
                throw new System.Exception("not impl");
            },
            Invalidate: function (includeChildren) {
                throw new System.Exception("not impl");
            },
            IsVisible: function (w) {
                throw new System.Exception("not impl");
            },
            IsVisible$1: function (worldPos) {
                throw new System.Exception("not impl");
            },
            IsVisible$2: function (a, b, c, d) {
                throw new System.Exception("not impl");
            },
            OnAnchor: function () {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            OnInit: function () {
                throw new System.Exception("not impl");
            },
            OnStart: function () {
                throw new System.Exception("not impl");
            },
            ParentHasChanged: function () {
                throw new System.Exception("not impl");
            },
            RebuildAllDrawCalls: function () {
                throw new System.Exception("not impl");
            },
            Refresh: function () {
                throw new System.Exception("not impl");
            },
            RemoveWidget: function (w) {
                throw new System.Exception("not impl");
            },
            SetDirty: function () {
                throw new System.Exception("not impl");
            },
            SetRect: function (x, y, width, height) {
                throw new System.Exception("not impl");
            },
            SortWidgets: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
