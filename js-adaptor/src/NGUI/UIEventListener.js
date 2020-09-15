Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIEventListener", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            methods: {
                Get: function (go) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            parameter: null,
            onSubmit: null,
            onClick: null,
            onDoubleClick: null,
            onHover: null,
            onPress: null,
            onSelect: null,
            onScroll: null,
            onDragStart: null,
            onDrag: null,
            onDragOver: null,
            onDragOut: null,
            onDragEnd: null,
            onDrop: null,
            onKey: null,
            onTooltip: null,
            needsActiveCollider: false
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            Clear: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
