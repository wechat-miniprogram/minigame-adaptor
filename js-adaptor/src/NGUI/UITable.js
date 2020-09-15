Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UITable", {
        inherits: [UIWidgetContainer],
        fields: {
            columns: 0,
            direction: 0,
            sorting: 0,
            pivot: 0,
            cellAlignment: 0,
            hideInactive: false,
            keepWithinPanel: false,
            padding: null,
            onReposition: null,
            onCustomSort: null,
            mPanel: null,
            mInitDone: false,
            mReposition: false
        },
        props: {
            repositionNow: {
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.padding = new MiniGameAdaptor.Vector2();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                UIWidgetContainer.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            GetChildList: function () {
                throw new System.Exception("not impl");
            },
            Init: function () {
                throw new System.Exception("not impl");
            },
            LateUpdate: function () {
                throw new System.Exception("not impl");
            },
            Reposition: function () {
                throw new System.Exception("not impl");
            },
            RepositionVariableSize: function (children) {
                throw new System.Exception("not impl");
            },
            Sort: function (list) {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
