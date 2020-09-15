Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UISnapshotPoint", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            isOrthographic: false,
            nearClip: 0,
            farClip: 0,
            fieldOfView: 0,
            orthoSize: 0,
            thumbnail: null
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
