Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIWidget", {
        inherits: [MiniGameAdaptor.UIRect],
        statics: {
            methods: {
                FullCompareFunc: function (left, right) {
                    throw new System.Exception("not impl");
                },
                PanelCompareFunc: function (left, right) {
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            mColor: null,
            mPivot: 0,
            mWidth: 0,
            mHeight: 0,
            mDepth: 0,
            mMat: null,
            onChange: null,
            onPostFill: null,
            mOnRender: null,
            autoResizeBoxCollider: false,
            hideIfOffScreen: false,
            keepAspectRatio: 0,
            aspectRatio: 0,
            hitCheck: null,
            panel: null,
            geometry: null,
            fillGeometry: false,
            mPlayMode: false,
            mDrawRegion: null,
            drawCall: null,
            mCorners: null
        },
        props: {
            alpha: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            border: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            color: {
                get: function () {
                    // throw new System.Exception("not impl");
                    const c = this.ref.color;
                    return new MiniGameAdaptor.Color.$ctor2(c.r, c.g, c.b, c.a).__remap01();
                },
                set: function (value) {
                    // throw new System.Exception("not impl");
                    const remap = value.__remap0255();
                    // this.ref.color.setRGBA(remap.r, remap.g, remap.b, remap.a);
                    this.ref.color.r = remap.r;
                    this.ref.color.g = remap.g;
                    this.ref.color.b = remap.b;
                    this.ref.color.a = remap.a;
                }
            },
            depth: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            drawingDimensions: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            drawRegion: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            hasBoxCollider: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            hasVertices: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            height: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isVisible: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localCenter: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localCorners: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            localSize: {
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
            material: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            minHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            minWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            onRender: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pivot: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            pivotOffset: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            rawPivot: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            raycastDepth: {
                get: function () {
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
            width: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            worldCenter: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            worldCorners: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.mColor = new MiniGameAdaptor.Color();
                this.mDrawRegion = new MiniGameAdaptor.Vector4();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.UIRect.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            Awake: function () {
                // throw new System.Exception("not impl");
            },
            CalculateBounds: function () {
                throw new System.Exception("not impl");
            },
            CalculateBounds$1: function (relativeParent) {
                throw new System.Exception("not impl");
            },
            CalculateCumulativeAlpha: function (frameID) {
                throw new System.Exception("not impl");
            },
            CalculateFinalAlpha: function (frameID) {
                throw new System.Exception("not impl");
            },
            CheckLayer: function () {
                throw new System.Exception("not impl");
            },
            CreatePanel: function () {
                throw new System.Exception("not impl");
            },
            GetSides: function (relativeTo) {
                throw new System.Exception("not impl");
            },
            Invalidate: function (includeChildren) {
                throw new System.Exception("not impl");
            },
            MakePixelPerfect: function () {
                throw new System.Exception("not impl");
            },
            MarkAsChanged: function () {
                throw new System.Exception("not impl");
            },
            OnAnchor: function () {
                throw new System.Exception("not impl");
            },
            OnDisable: function () {
                // throw new System.Exception("not impl");
                // TODO
            },
            OnFill: function (verts, uvs, cols) {
                throw new System.Exception("not impl");
            },
            OnInit: function () {
                throw new System.Exception("not impl");
            },
            OnStart: function () {
                throw new System.Exception("not impl");
            },
            OnUpdate: function () {
                throw new System.Exception("not impl");
            },
            ParentHasChanged: function () {
                throw new System.Exception("not impl");
            },
            RemoveFromPanel: function () {
                throw new System.Exception("not impl");
            },
            ResizeCollider: function () {
                throw new System.Exception("not impl");
            },
            SetColorNoAlpha: function (c) {
                throw new System.Exception("not impl");
            },
            SetDimensions: function (w, h) {
                throw new System.Exception("not impl");
            },
            SetDirty: function () {
                throw new System.Exception("not impl");
            },
            SetRect: function (x, y, width, height) {
                throw new System.Exception("not impl");
            },
            UpdateFinalAlpha: function (frameID) {
                throw new System.Exception("not impl");
            },
            UpdateGeometry: function (frame) {
                throw new System.Exception("not impl");
            },
            UpdateTransform: function (frame) {
                throw new System.Exception("not impl");
            },
            UpdateVisibility: function (visibleByAlpha, visibleByPanel) {
                throw new System.Exception("not impl");
            },
            UpgradeFrom265: function () {
                throw new System.Exception("not impl");
            },
            WriteToBuffers: function (v, u, c, n, t, u2) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UIWidget')(MiniGameAdaptor.UIWidget);
Object.defineProperty(MiniGameAdaptor.UIWidget.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UIWidget.prototype.__properties }
})