Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Selectable", {
        inherits: [MiniGameAdaptor.EventSystems.UIBehaviour,MiniGameAdaptor.EventSystems.IPointerEnterHandler,MiniGameAdaptor.EventSystems.ISelectHandler,MiniGameAdaptor.EventSystems.IPointerExitHandler,MiniGameAdaptor.EventSystems.IDeselectHandler,MiniGameAdaptor.EventSystems.IPointerDownHandler,MiniGameAdaptor.EventSystems.IPointerUpHandler,MiniGameAdaptor.EventSystems.IMoveHandler],
        statics: {
            props: {
                allSelectables: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            }
        },
        props: {
            animationTriggers: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            animator: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            colors: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            image: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            interactable: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            navigation: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            spriteState: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            targetGraphic: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            transition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            FindSelectable: function (dir) {
                throw new System.Exception("not impl");
            },
            FindSelectableOnDown: function () {
                throw new System.Exception("not impl");
            },
            FindSelectableOnLeft: function () {
                throw new System.Exception("not impl");
            },
            FindSelectableOnRight: function () {
                throw new System.Exception("not impl");
            },
            FindSelectableOnUp: function () {
                throw new System.Exception("not impl");
            },
            IsInteractable: function () {
                throw new System.Exception("not impl");
            },
            OnDeselect: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IDeselectHandler$OnDeselect: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnMove: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IMoveHandler$OnMove: function (eventData) {
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
            OnSelect: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$ISelectHandler$OnSelect: function (eventData) {
                throw new System.Exception("Exception");
            },
            Select: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
