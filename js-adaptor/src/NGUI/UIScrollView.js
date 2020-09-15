Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIScrollView", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                list: null
            },
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    comp.data = data;
                    const bar = builtContext.components.data[data.verticalScrollBar || data.horizontalScrollBar];
                    function onBoundsChange(){
                        bar._onScrollViewBoundsChange();
                    }
                    const scrollView = comp.getComponent(engine.UIScrollView);

                    function bindValue(target,nTarget,key){
                        Object.defineProperty(target,key,{
                            get:function(){
                                return nTarget[key];
                            },
                            set:function(v){
                                nTarget[key] = v;
                            },
                            configuarble:true
                        });
                    }

                    bindValue(scrollView,comp,'canMoveHorizontally');
                    bindValue(scrollView,comp,'canMoveVertically');
                    bindValue(scrollView,comp,'currentMomentum');
                    bindValue(scrollView,comp,'panel');

                    comp.entity.transform2D.activeInHierarchyChangedEvent.add(()=>{
                        if(bar){
                            bar._setTargetScrollView(comp);
                            bar._setScrollBarShowCondition(data.showScrollBars);
                            bar._onScrollViewBoundsChange();
                            comp.entity.transform2D.children[0].boundsChangeEvent.add(onBoundsChange);
                            comp.entity.transform2D.boundsChangeEvent.add(onBoundsChange);
                        }

                        const touchEvent = comp.entity.getComponent(engine.TouchInputComponent);
                        touchEvent.onTouchMove.add((c,e)=>{
                            bar && bar._onScrollViewTouchMove(c,e);
                        });
                        touchEvent.onTouchEnd.add((c,e)=>{
                            bar && bar._onScrollViewTouchEnd(c,e);
                            if(typeof scrollView.onDragFinished === 'function'){
                                scrollView.onDragFinished(c,e);
                            }
                        });
                        touchEvent.onTouchStart.add((c,e)=>{
                            bar._onScrollViewTouchStart(c,e);
                            if(typeof scrollView.onDragStarted === 'function'){
                                scrollView.onDragStarted(c,e);
                            }
                        });
                    });

                    return comp;
                }
            }
        },
        fields: {
            movement: 0,
            dragEffect: 0,
            restrictWithinPanel: false,
            constrainOnDrag: false,
            disableDragIfFits: false,
            smoothDragStart: false,
            iOSDragEmulation: false,
            scrollWheelFactor: 0,
            momentumAmount: 0,
            dampenStrength: 0,
            horizontalScrollBar: null,
            verticalScrollBar: null,
            showScrollBars: 0,
            customMovement: null,
            contentPivot: 0,
            onDragStarted: null,
            onDragFinished: null,
            onMomentumMove: null,
            onStoppedMoving: null,
            mTrans: null,
            mPanel: null,
            mPlane: null,
            mLastPos: null,
            mPressed: false,
            mMomentum: null,
            mScroll: 0,
            mBounds: null,
            mCalculatedBounds: false,
            mShouldMove: false,
            mIgnoreCallbacks: false,
            mDragID: 0,
            mDragStartOffset: null,
            mDragStarted: false,
            centerOnChild: null
        },
        props: {
            bounds: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            canMoveHorizontally: {
                get: function () {
                    return Boolean(this.data.canMoveHorizontally);
                }
            },
            canMoveVertically: {
                get: function () {
                    return Boolean(this.data.canMoveVertically);
                }
            },
            currentMomentum: {
                get: function () {
                    return this.mMomentum;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isDragging: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            panel: {
                get: function () {
                    return this.mPlane;
                }
            },
            shouldMove: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            shouldMoveHorizontally: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            shouldMoveVertically: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            init: function () {
                this.customMovement = new MiniGameAdaptor.Vector2();
                this.mPlane = new MiniGameAdaptor.Plane();
                this.mLastPos = new MiniGameAdaptor.Vector3();
                this.mMomentum = new MiniGameAdaptor.Vector3();
                this.mBounds = new MiniGameAdaptor.Bounds();
                this.mDragStartOffset = new MiniGameAdaptor.Vector2();
            },
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            DisableSpring: function () {
                throw new System.Exception("not impl");
            },
            Drag: function () {
                throw new System.Exception("not impl");
            },
            InvalidateBounds: function () {
                throw new System.Exception("not impl");
            },
            MoveAbsolute: function (absolute) {
                throw new System.Exception("not impl");
            },
            MoveRelative: function (relative) {
                throw new System.Exception("not impl");
            },
            OnPan: function (delta) {
                throw new System.Exception("not impl");
            },
            OnScrollBar: function () {
                throw new System.Exception("not impl");
            },
            Press: function (pressed) {
                throw new System.Exception("not impl");
            },
            ResetPosition: function () {
                throw new System.Exception("not impl");
            },
            RestrictWithinBounds: function (instant) {
                throw new System.Exception("not impl");
            },
            RestrictWithinBounds$1: function (instant, horizontal, vertical) {
                throw new System.Exception("not impl");
            },
            Scroll: function (delta) {
                throw new System.Exception("not impl");
            },
            SetDragAmount: function (x, y, updateScrollbars) {
                throw new System.Exception("not impl");
            },
            UpdatePosition: function () {
                throw new System.Exception("not impl");
            },
            UpdateScrollbars: function () {
                throw new System.Exception("not impl");
            },
            UpdateScrollbars$1: function (recalculateBounds) {
                throw new System.Exception("not impl");
            },
            UpdateScrollbars$2: function (slider, contentMin, contentMax, contentSize, viewSize, inverted) {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UIScrollView')(MiniGameAdaptor.UIScrollView);
Object.defineProperty(MiniGameAdaptor.UIScrollView.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UIScrollView.prototype.__properties }
})
