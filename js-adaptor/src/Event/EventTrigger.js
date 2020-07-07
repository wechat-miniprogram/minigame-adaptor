Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.EventTrigger", {
        inherits: [MiniGameAdaptor.MonoBehaviour,MiniGameAdaptor.EventSystems.IEndDragHandler,MiniGameAdaptor.EventSystems.IDropHandler,MiniGameAdaptor.EventSystems.IScrollHandler,MiniGameAdaptor.EventSystems.IUpdateSelectedHandler,MiniGameAdaptor.EventSystems.IPointerEnterHandler,MiniGameAdaptor.EventSystems.ISelectHandler,MiniGameAdaptor.EventSystems.IPointerExitHandler,MiniGameAdaptor.EventSystems.IDeselectHandler,MiniGameAdaptor.EventSystems.IPointerDownHandler,MiniGameAdaptor.EventSystems.IMoveHandler,MiniGameAdaptor.EventSystems.IPointerUpHandler,MiniGameAdaptor.EventSystems.ISubmitHandler,MiniGameAdaptor.EventSystems.IPointerClickHandler,MiniGameAdaptor.EventSystems.ICancelHandler,MiniGameAdaptor.EventSystems.IBeginDragHandler,MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler,MiniGameAdaptor.EventSystems.IDragHandler],
        props: {
            triggers: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            OnBeginDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IBeginDragHandler$OnBeginDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnCancel: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$ICancelHandler$OnCancel: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnDeselect: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IDeselectHandler$OnDeselect: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IDragHandler$OnDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnDrop: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IDropHandler$OnDrop: function (eventData) {
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
            OnMove: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IMoveHandler$OnMove: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnPointerClick: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnPointerDown: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnPointerEnter: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IPointerEnterHandler$OnPointerEnter: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnPointerExit: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IPointerExitHandler$OnPointerExit: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnPointerUp: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IPointerUpHandler$OnPointerUp: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnScroll: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IScrollHandler$OnScroll: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnSelect: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$ISelectHandler$OnSelect: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnSubmit: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnUpdateSelected: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IUpdateSelectedHandler$OnUpdateSelected: function (eventData) {
                throw new System.Exception("Exception");
            }
        }
    });
});