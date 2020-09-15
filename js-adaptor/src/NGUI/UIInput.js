Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIInput", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null,
                selection: null,
                mDrawStart: 0,
                mLastIME: null
            }
        },
        fields: {
            label: null,
            inputType: 0,
            onReturnKey: 0,
            keyboardType: 0,
            hideInput: false,
            selectAllTextOnFocus: false,
            submitOnUnselect: false,
            validation: 0,
            characterLimit: 0,
            savedAs: null,
            activeTextColor: null,
            caretColor: null,
            selectionColor: null,
            onSubmit: null,
            onChange: null,
            onValidate: null,
            mValue: null,
            mDefaultText: null,
            mDefaultColor: null,
            mPosition: 0,
            mDoInit: false,
            mAlignment: 0,
            mLoadSavedValue: false,
            mSelectionStart: 0,
            mSelectionEnd: 0,
            mHighlight: null,
            mCaret: null,
            mBlankTex: null,
            mNextBlink: 0,
            mLastAlpha: 0,
            mCached: null,
            mSelectMe: 0,
            mSelectTime: 0,
            mStarted: false,
            onUpArrow: null,
            onDownArrow: null
        },
        props: {
            caret: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cursorPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            defaultColor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            defaultText: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            inputShouldBeHidden: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isSelected: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            selectionEnd: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            selectionStart: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
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
                this.activeTextColor = new MiniGameAdaptor.Color();
                this.caretColor = new MiniGameAdaptor.Color();
                this.selectionColor = new MiniGameAdaptor.Color();
                this.mDefaultColor = new MiniGameAdaptor.Color();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            Cleanup: function () {
                throw new System.Exception("not impl");
            },
            DoBackspace: function () {
                throw new System.Exception("not impl");
            },
            ExecuteOnChange: function () {
                throw new System.Exception("not impl");
            },
            GetCharUnderMouse: function () {
                throw new System.Exception("not impl");
            },
            GetLeftText: function () {
                throw new System.Exception("not impl");
            },
            GetRightText: function () {
                throw new System.Exception("not impl");
            },
            GetSelection: function () {
                throw new System.Exception("not impl");
            },
            Init: function () {
                throw new System.Exception("not impl");
            },
            Insert: function (text) {
                throw new System.Exception("not impl");
            },
            LoadValue: function () {
                throw new System.Exception("not impl");
            },
            OnDeselectEvent: function () {
                throw new System.Exception("not impl");
            },
            OnDrag: function (delta) {
                throw new System.Exception("not impl");
            },
            OnPress: function (isPressed) {
                throw new System.Exception("not impl");
            },
            OnSelect: function (isSelected) {
                throw new System.Exception("not impl");
            },
            OnSelectEvent: function () {
                throw new System.Exception("not impl");
            },
            ProcessEvent: function (ev) {
                throw new System.Exception("not impl");
            },
            RemoveFocus: function () {
                throw new System.Exception("not impl");
            },
            SaveToPlayerPrefs: function (val) {
                throw new System.Exception("not impl");
            },
            SaveValue: function () {
                throw new System.Exception("not impl");
            },
            Set: function (value, notify) {
                if (notify === void 0) { notify = true; }
                throw new System.Exception("not impl");
            },
            Start: function () {
                // throw new System.Exception("not impl");
                // @
            },
            Submit: function () {
                throw new System.Exception("not impl");
            },
            Update: function () {
                // throw new System.Exception("not impl");
                // @
            },
            UpdateLabel: function () {
                throw new System.Exception("not impl");
            },
            Validate: function (text, pos, ch) {
                throw new System.Exception("not impl");
            },
            Validate$1: function (val) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UIInput')(MiniGameAdaptor.UIInput);
Object.defineProperty(MiniGameAdaptor.UIInput.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UIInput.prototype.__properties }
})