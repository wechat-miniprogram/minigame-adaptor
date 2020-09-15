Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";
    const FillDirection = {
        LeftToRight:0,
        RightToLeft:1,
        BottomToTop:2,
        TopToBottom:3
    };

    const ShowCondition ={
        Always :0,
        OnlyIfNeeded : 1,
        WhenDragging : 2
    };

    Bridge.define("MiniGameAdaptor.UIScrollBar", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            scrollViewHeight:0,
            scrollViewContentHeight:0,
            scrollViewMoveDistance:0,
            fillDirection:FillDirection.LeftToRight,
            alpha:0,
            barBlock:null,
            showCondition:0,
            targetScrollView:null,
            isTouchMoving:false,
            scrollBarActive:false,
        },
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    comp._initData(data, comp, context, builtContext);
                    return comp;
                }
            }
        },
        props: {
            barSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.MonoBehaviour.ctor.call(this);
            }
        },
        methods: {
            _initData(data, comp, context, builtContext){

                this.alpha = data.alpha;
                this.fillDirection = data.fillDirection;
                this.barBlock = builtContext.components.data[data.foregroundWidget];

                const _onStart = this.onStart;
                this.onStart = ()=> {
                    _onStart.call(this);
                    this.scrollBarActive = true;
                    this._reSetBarBlock();
                };
                this.scrollBarActive = true;
                this.entity.transform2D.activeInHierarchyChangedEvent.add(()=>{
                    this.entity.transform2D.boundsChangeEvent.add(()=>{
                        this._resizeBarBlock();
                    });
                    this.barBlock.entity.transform2D.boundsChangeEvent.add(()=>{
                        this._resizeBarBlock();
                    });
                });


            },
            _showScrollBar(){
                this.entity.getComponent(engine.UISprite).color.a = parseInt(this.alpha*255);
            },
            _hideScrollBar(){
                this.entity.getComponent(engine.UISprite).color.a = 0;
            },
            _setScrollBarShowCondition(condition){
                this.showCondition = condition;
                if(this.showCondition === ShowCondition.WhenDragging){
                    this._hideScrollBar();
                }
            },
            _setTargetScrollView(scrollView){
                this.targetScrollView = scrollView;
            },
            _resizeBarBlock(){
                if(!this.targetScrollView || !this.scrollViewHeight || !this.scrollViewContentHeight){
                    return false;
                }
                let destSize;
                switch (this.fillDirection) {
                    case FillDirection.TopToBottom:
                    case FillDirection.BottomToTop:
                        destSize = parseInt((this.scrollViewHeight / this.scrollViewContentHeight) * this.entity.transform2D.size.y);

                        this.barBlock.entity.transform2D.sizeY = destSize;
                        break;
                    case FillDirection.LeftToRight:
                    case FillDirection.RightToLeft:
                        destSize = parseInt((this.scrollViewHeight / this.scrollViewContentHeight) * this.entity.transform2D.size.x);


                        this.barBlock.entity.transform2D.sizeX = destSize;
                        break;
                }

                //调整一下滑动块的位置
                this._onScrollViewTouchMove();
            },
            _onScrollViewTouchEnd(){
                this.isTouchMoving = false;
                if(this.showCondition === ShowCondition.WhenDragging){
                    this._hideScrollBar();
                }
            },
            _onScrollViewTouchStart(){
                this.isTouchMoving = true;
                if(this.showCondition === ShowCondition.WhenDragging){
                    this._showScrollBar();
                }
            },
            _onScrollViewTouchMove(){
                const moveDistance = this.targetScrollView.entity.getComponent(engine.UIScrollView).moveDistance;
                const {scrollViewHeight,scrollViewContentHeight} = this;
                let percent = moveDistance/(scrollViewContentHeight - scrollViewHeight);
                if(percent<0){
                    percent = 0;
                }
                if(percent>1){
                    percent = 1;
                }
                let step = 0;
                // offset 对应unity里面的anchor的偏移
                const {leftOffset,rightOffset,topOffset,bottomOffset} = this.barBlock.entity.getComponent(engine.UIWidget) || {leftOffset:0,rightOffset:0,topOffset:0,bottomOffset:0};

                switch (this.fillDirection) {
                    case FillDirection.TopToBottom:
                        step = percent*(this.entity.transform2D.size.y - this.barBlock.entity.transform2D.size.y + bottomOffset);
                        this.barBlock.entity.transform2D.position.y = step + topOffset;
                        break;
                    case FillDirection.BottomToTop:
                        step = (1-percent)*(this.entity.transform2D.size.y - this.barBlock.entity.transform2D.size.y + bottomOffset);
                        this.barBlock.entity.transform2D.position.y = step + topOffset;
                        break;
                    case FillDirection.LeftToRight:
                        step = percent*(this.entity.transform2D.size.x - this.barBlock.entity.transform2D.size.x + rightOffset);
                        this.barBlock.entity.transform2D.position.x = step + leftOffset;
                        break;
                    case FillDirection.RightToLeft:

                        step = (1-percent)*(this.entity.transform2D.size.x - this.barBlock.entity.transform2D.size.x + rightOffset );

                        this.barBlock.entity.transform2D.position.x = step + leftOffset;

                        break;
                }

            },
            _onScrollViewBoundsChange(){
                this._reSetBarBlock();
            },
            _reSetBarBlock(){
                if(!this.scrollBarActive || !this.targetScrollView ){
                    return false;
                }
                const transform2D = this.targetScrollView.entity.transform2D;
                switch (this.fillDirection) {
                    case FillDirection.LeftToRight:
                    case FillDirection.RightToLeft:
                        this.scrollViewHeight = transform2D.size.x;
                        this.scrollViewContentHeight = transform2D.children[0].size.x;
                        break;
                    case FillDirection.TopToBottom:
                    case FillDirection.BottomToTop:
                        // 垂直
                        this.scrollViewHeight = transform2D.size.y;
                        this.scrollViewContentHeight = transform2D.children[0].size.y;
                        break;
                }
                this._resizeBarBlock();

                if(this.showCondition === ShowCondition.OnlyIfNeeded){
                    if(this.scrollViewHeight >=this.scrollViewContentHeight){
                        this._hideScrollBar();
                    }else{
                        this._showScrollBar();
                    }
                }else if(this.showCondition === ShowCondition.Always){
                    this._showScrollBar();
                }else if(this.showCondition === ShowCondition.WhenDragging){
                    if(this.isTouchMoving){
                        this._showScrollBar();
                    }else{
                        this._hideScrollBar();
                    }
                }
            },

            ForceUpdate: function () {
                throw new System.Exception("not impl");
            },
            LocalToValue: function (localPos) {
                throw new System.Exception("not impl");
            },
            OnStart: function () {
                throw new System.Exception("not impl");
            },
            Upgrade: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.UIScrollBar')(MiniGameAdaptor.UIScrollBar);
Object.defineProperty(MiniGameAdaptor.UIScrollBar.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UIScrollBar.prototype.__properties }
})
