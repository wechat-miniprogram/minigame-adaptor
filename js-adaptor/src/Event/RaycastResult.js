Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.RaycastResult", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.EventSystems.RaycastResult(); }
            }
        },
        fields: {
            module: null,
            distance: 0,
            index: 0,
            depth: 0,
            sortingLayer: 0,
            sortingOrder: 0,
            worldPosition: null,
            worldNormal: null,
            screenPosition: null
        },
        props: {
            gameObject: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isValid: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.worldPosition = new MiniGameAdaptor.Vector3();
                this.worldNormal = new MiniGameAdaptor.Vector3();
                this.screenPosition = new MiniGameAdaptor.Vector2();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Clear: function () {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            },
            getHashCode: function () {
                var h = Bridge.addHash([4871899276, this.module, this.distance, this.index, this.depth, this.sortingLayer, this.sortingOrder, this.worldPosition, this.worldNormal, this.screenPosition]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, MiniGameAdaptor.EventSystems.RaycastResult)) {
                    return false;
                }
                return Bridge.equals(this.module, o.module) && Bridge.equals(this.distance, o.distance) && Bridge.equals(this.index, o.index) && Bridge.equals(this.depth, o.depth) && Bridge.equals(this.sortingLayer, o.sortingLayer) && Bridge.equals(this.sortingOrder, o.sortingOrder) && Bridge.equals(this.worldPosition, o.worldPosition) && Bridge.equals(this.worldNormal, o.worldNormal) && Bridge.equals(this.screenPosition, o.screenPosition);
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.EventSystems.RaycastResult();
                s.module = this.module;
                s.distance = this.distance;
                s.index = this.index;
                s.depth = this.depth;
                s.sortingLayer = this.sortingLayer;
                s.sortingOrder = this.sortingOrder;
                s.worldPosition = this.worldPosition.$clone();
                s.worldNormal = this.worldNormal.$clone();
                s.screenPosition = this.screenPosition.$clone();
                return s;
            }
        }
    });
});


