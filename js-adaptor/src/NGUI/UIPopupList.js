Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIPopupList", {
        inherits: [UIWidgetContainer],
        statics: {
            fields: {
                current: null,
                mChild: null,
                mFadeOutComplete: 0
            },
            props: {
                isOpen: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                Close: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            atlas: null,
            bitmapFont: null,
            trueTypeFont: null,
            fontSize: 0,
            fontStyle: 0,
            backgroundSprite: null,
            highlightSprite: null,
            background2DSprite: null,
            highlight2DSprite: null,
            position: 0,
            selection: 0,
            alignment: 0,
            items: null,
            itemData: null,
            itemCallbacks: null,
            padding: null,
            textColor: null,
            backgroundColor: null,
            highlightColor: null,
            isAnimated: false,
            isLocalized: false,
            textModifier: 0,
            separatePanel: false,
            overlap: 0,
            openOn: 0,
            onChange: null,
            mSelectedItem: null,
            mPanel: null,
            mBackground: null,
            mHighlight: null,
            mHighlightedLabel: null,
            mLabelList: null,
            mBgBorder: 0,
            keepValue: false,
            mSelection: null,
            mOpenFrame: 0,
            startingPosition: null,
            mExecuting: false,
            mUseDynamicFont: false,
            mStarted: false,
            mTweening: false,
            source: null
        },
        props: {
            activeFontScale: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            activeFontSize: {
                get: function () {
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
            callback: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            data: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            fitScale: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isColliderEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isValid: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            value: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.padding = new MiniGameAdaptor.Vector2();
                this.textColor = new MiniGameAdaptor.Color();
                this.backgroundColor = new MiniGameAdaptor.Color();
                this.highlightColor = new MiniGameAdaptor.Color();
                this.startingPosition = new MiniGameAdaptor.Vector3();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                UIWidgetContainer.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            AddItem: function (text) {
                throw new System.Exception("not impl");
            },
            AddItem$1: function (text, del) {
                throw new System.Exception("not impl");
            },
            AddItem$2: function (text, data, del) {
                if (del === void 0) { del = null; }
                throw new System.Exception("not impl");
            },
            Animate: function (widget, placeAbove, bottom) {
                throw new System.Exception("not impl");
            },
            AnimateColor: function (widget) {
                throw new System.Exception("not impl");
            },
            AnimatePosition: function (widget, placeAbove, bottom) {
                throw new System.Exception("not impl");
            },
            AnimateScale: function (widget, placeAbove, bottom) {
                throw new System.Exception("not impl");
            },
            Clear: function () {
                throw new System.Exception("not impl");
            },
            CloseSelf: function () {
                throw new System.Exception("not impl");
            },
            GetHighlightPosition: function () {
                throw new System.Exception("not impl");
            },
            Highlight: function (lbl, instant) {
                throw new System.Exception("not impl");
            },
            OnClick: function () {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                throw new System.Exception("not impl");
            },
            OnDoubleClick: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                throw new System.Exception("not impl");
            },
            OnItemClick: function (go) {
                throw new System.Exception("not impl");
            },
            OnItemHover: function (go, isOver) {
                throw new System.Exception("not impl");
            },
            OnItemPress: function (go, isPressed) {
                throw new System.Exception("not impl");
            },
            OnKey: function (key) {
                throw new System.Exception("not impl");
            },
            OnLocalize: function () {
                throw new System.Exception("not impl");
            },
            OnNavigate: function (key) {
                throw new System.Exception("not impl");
            },
            OnSelect: function (isSelected) {
                throw new System.Exception("not impl");
            },
            OnValidate: function () {
                throw new System.Exception("not impl");
            },
            RemoveItem: function (text) {
                throw new System.Exception("not impl");
            },
            RemoveItemByData: function (data) {
                throw new System.Exception("not impl");
            },
            Set: function (value, notify) {
                if (notify === void 0) { notify = true; }
                throw new System.Exception("not impl");
            },
            Show: function () {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            TriggerCallbacks: function () {
                throw new System.Exception("not impl");
            },
            UpdateTweenPosition: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
