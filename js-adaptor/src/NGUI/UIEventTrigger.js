Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIEventTrigger", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            }
        },
        fields: {
            onHoverOver: null,
            onHoverOut: null,
            onPress: null,
            onRelease: null,
            onSelect: null,
            onDeselect: null,
            onClick: null,
            onDoubleClick: null,
            onDragStart: null,
            onDragEnd: null,
            onDragOver: null,
            onDragOut: null,
            onDrag: null
        },
        props: {
            isColliderEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        }
    });
});
