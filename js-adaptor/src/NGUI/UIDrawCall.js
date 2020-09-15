Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIDrawCall", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            props: {
                activeList: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                inactiveList: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                ClearAll: function () {
                    throw new System.Exception("not impl");
                },
                Count: function (panel) {
                    throw new System.Exception("not impl");
                },
                Create: function (panel, mat, tex, shader) {
                    throw new System.Exception("not impl");
                },
                Destroy: function (dc) {
                    throw new System.Exception("not impl");
                },
                MoveToScene: function (scene) {
                    throw new System.Exception("not impl");
                },
                ReleaseAll: function () {
                    throw new System.Exception("not impl");
                },
                ReleaseInactive: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            widgetCount: 0,
            depthStart: 0,
            depthEnd: 0,
            manager: null,
            panel: null,
            clipTexture: null,
            alwaysOnScreen: false,
            verts: null,
            norms: null,
            tans: null,
            uvs: null,
            uv2: null,
            cols: null,
            isDirty: false,
            onRender: null,
            onCreateDrawCall: null,
            mBlock: null
        },
        props: {
            baseMaterial: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            cachedTransform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            dynamicMaterial: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            finalRenderQueue: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isClipped: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            mainTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            renderQueue: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shader: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            shadowMode: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sortingLayerName: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            sortingOrder: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            triangles: {
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
        },
        methods: {
            UpdateGeometry: function (widgetCount) {
                throw new System.Exception("not impl");
            }
        }
    });
});
