Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AnimationOrTween.Trigger", {
        $kind: "enum",
        statics: {
            fields: {
                OnClick: 0,
                OnHover: 1,
                OnPress: 2,
                OnHoverTrue: 3,
                OnHoverFalse: 4,
                OnPressTrue: 5,
                OnPressFalse: 6,
                OnActivate: 7,
                OnActivateTrue: 8,
                OnActivateFalse: 9,
                OnDoubleClick: 10,
                OnSelect: 11,
                OnSelectTrue: 12,
                OnSelectFalse: 13
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UIButtonMessage.Trigger", {
        $kind: "nested enum",
        statics: {
            fields: {
                OnClick: 0,
                OnMouseOver: 1,
                OnMouseOut: 2,
                OnPress: 3,
                OnRelease: 4,
                OnDoubleClick: 5
            }
        }
    });

    Bridge.define("MiniGameAdaptor.UIPlaySound.Trigger", {
        $kind: "nested enum",
        statics: {
            fields: {
                OnClick: 0,
                OnMouseOver: 1,
                OnMouseOut: 2,
                OnPress: 3,
                OnRelease: 4,
                Custom: 5,
                OnEnable: 6,
                OnDisable: 7
            }
        }
    });
});
