Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UICamera", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                list: null,
                GetKeyDown: null,
                GetKeyUp: null,
                GetKey: null,
                GetAxis: null,
                GetAnyKeyDown: null,
                GetMouse: null,
                GetTouch: null,
                RemoveTouch: null,
                onScreenResize: null,
                onCustomInput: null,
                showTooltips: false,
                ignoreAllEvents: false,
                ignoreControllerInput: false,
                lastWorldPosition: null,
                lastWorldRay: null,
                lastHit: null,
                current: null,
                currentCamera: null,
                onSchemeChange: null,
                currentTouchID: 0,
                currentTouch: null,
                fallThrough: null,
                onClick: null,
                onDoubleClick: null,
                onHover: null,
                onPress: null,
                onSelect: null,
                onScroll: null,
                onDrag: null,
                onDragStart: null,
                onDragOver: null,
                onDragOut: null,
                onDragEnd: null,
                onDrop: null,
                onKey: null,
                onNavigate: null,
                onPan: null,
                onTooltip: null,
                onMouseMove: null,
                controller: null,
                activeTouches: null,
                isDragging: false,
                GetInputTouchCount: null,
                GetInputTouch: null
            },
            props: {
                controllerNavigationObject: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                currentKey: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                currentRay: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                currentScheme: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                disableController: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                dragCount: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                eventHandler: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                first: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                hoveredObject: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                inputHasFocus: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                interactingWithUI: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                isOverUI: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                lastEventPosition: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                mainCamera: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                mouse0: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                mouse1: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                mouse2: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                selectedObject: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                tooltipObject: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                uiHasFocus: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            ctors: {
                init: function () {
                    this.lastWorldPosition = new MiniGameAdaptor.Vector3();
                    this.lastWorldRay = new MiniGameAdaptor.Ray();
                    this.lastHit = new MiniGameAdaptor.RaycastHit();
                }
            },
            methods: {
                CancelNextTooltip: function () {
                    throw new System.Exception("not impl");
                },
                CountInputSources: function () {
                    throw new System.Exception("not impl");
                },
                FindCameraForLayer: function (layer) {
                    throw new System.Exception("not impl");
                },
                HideTooltip: function () {
                    throw new System.Exception("not impl");
                },
                IsHighlighted: function (go) {
                    throw new System.Exception("not impl");
                },
                IsPartOfUI: function (go) {
                    throw new System.Exception("not impl");
                },
                IsPressed: function (go) {
                    throw new System.Exception("not impl");
                },
                Notify: function (go, funcName, obj) {
                    throw new System.Exception("not impl");
                },
                Raycast: function (inPos) {
                    throw new System.Exception("not impl");
                },
                Raycast$1: function (touch) {
                    throw new System.Exception("not impl");
                },
                ShowTooltip: function (go) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            eventType: 0,
            eventsGoToColliders: false,
            eventReceiverMask: null,
            processEventsIn: 0,
            debug: false,
            useMouse: false,
            useTouch: false,
            allowMultiTouch: false,
            useKeyboard: false,
            useController: false,
            stickyTooltip: false,
            tooltipDelay: 0,
            longPressTooltip: false,
            mouseDragThreshold: 0,
            mouseClickThreshold: 0,
            touchDragThreshold: 0,
            touchClickThreshold: 0,
            rangeDistance: 0,
            horizontalAxisName: null,
            verticalAxisName: null,
            horizontalPanAxisName: null,
            verticalPanAxisName: null,
            scrollAxisName: null,
            commandClick: false,
            submitKey0: 0,
            submitKey1: 0,
            cancelKey0: 0,
            cancelKey1: 0,
            autoHideCursor: false
        },
        props: {
            cachedCamera: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.eventReceiverMask = new MiniGameAdaptor.LayerMask();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            ProcessMouse: function () {
                throw new System.Exception("not impl");
            },
            ProcessOthers: function () {
                throw new System.Exception("not impl");
            },
            ProcessTouch: function (pressed, released) {
                throw new System.Exception("not impl");
            },
            ProcessTouches: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
