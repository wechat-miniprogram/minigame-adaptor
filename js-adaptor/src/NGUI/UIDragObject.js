Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDragObject", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            target: null,
            panelRegion: null,
            scrollMomentum: null,
            restrictWithinPanel: false,
            contentRect: null,
            dragEffect: 0,
            momentumAmount: 0,
            scale: null
        },
        props: {
            dragMovement: {
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
                this.scrollMomentum = new MiniGameAdaptor.Vector3();
                this.scale = new MiniGameAdaptor.Vector3();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            CancelMovement: function () {
                throw new System.Exception("not impl");
            },
            CancelSpring: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
