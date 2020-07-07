Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.ScrollRect", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour,MiniGameAdaptor.EventSystems.IEndDragHandler,MiniGameAdaptor.EventSystems.IScrollHandler,MiniGameAdaptor.UI.ICanvasElement,MiniGameAdaptor.UI.ILayoutElement,MiniGameAdaptor.UI.ILayoutGroup,MiniGameAdaptor.EventSystems.IBeginDragHandler,MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler,MiniGameAdaptor.EventSystems.IDragHandler],
        props: {
            content: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            decelerationRate: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            elasticity: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            flexibleHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            flexibleWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            horizontal: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            horizontalNormalizedPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            horizontalScrollbar: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            horizontalScrollbarSpacing: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            horizontalScrollbarVisibility: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            inertia: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            layoutPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            minHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            minWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            movementType: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            normalizedPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            onValueChanged: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            preferredHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            preferredWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            scrollSensitivity: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            velocity: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            vertical: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            verticalNormalizedPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            verticalScrollbar: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            verticalScrollbarSpacing: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            verticalScrollbarVisibility: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            viewport: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ICanvasElement$transform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$flexibleHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$flexibleWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$layoutPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$minHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$minWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$preferredHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$preferredWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            CalculateLayoutInputHorizontal: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal: function () {
                throw new System.Exception("Exception");
            },
            CalculateLayoutInputVertical: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical: function () {
                throw new System.Exception("Exception");
            },
            GraphicUpdateComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function () {
                throw new System.Exception("Exception");
            },
            IsActive: function () {
                throw new System.Exception("not impl");
            },
            LayoutComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function () {
                throw new System.Exception("Exception");
            },
            OnBeginDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IDragHandler$OnDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnEndDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IEndDragHandler$OnEndDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnInitializePotentialDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnScroll: function (data) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IScrollHandler$OnScroll: function (eventData) {
                throw new System.Exception("Exception");
            },
            Rebuild: function (executing) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$Rebuild: function (executing) {
                throw new System.Exception("Exception");
            },
            SetLayoutHorizontal: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutController$SetLayoutHorizontal: function () {
                throw new System.Exception("Exception");
            },
            SetLayoutVertical: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutController$SetLayoutVertical: function () {
                throw new System.Exception("Exception");
            },
            StopMovement: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function () {
                throw new System.Exception("Exception");
            }
        }
    });
});

 
