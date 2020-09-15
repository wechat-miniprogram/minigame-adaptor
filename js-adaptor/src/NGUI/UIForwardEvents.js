Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIForwardEvents", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            target: null,
            onHover: false,
            onPress: false,
            onClick: false,
            onDoubleClick: false,
            onSelect: false,
            onDrag: false,
            onDrop: false,
            onSubmit: false,
            onScroll: false
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
