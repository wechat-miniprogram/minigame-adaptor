Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Slider", {
        inherits: [MiniGameAdaptor.UI.Selectable,MiniGameAdaptor.UI.ICanvasElement,MiniGameAdaptor.EventSystems.IInitializePotentialDragHandler,MiniGameAdaptor.EventSystems.IDragHandler],
        statics: {
            Direction:{
                LeftToRight:0,
                RightToLeft:1,
                BottomToTop:2,
                TopToBottom:3
            },
            methods: {
                Deserialize: function (data, comp, context, builtContext) {
                    const fillRectImage = data.fillRectImage && builtContext.components.data[data.fillRectImage];
                    const handleRectImage  = data.handleRectImage && builtContext.components.data[data.handleRectImage];

                    // 为了能点击，加一个透明sprite
                    comp.entity.addComponent(engine.UISprite);

                    comp._maxValue = data.maxValue;
                    comp._minValue = data.minValue;
                    comp._wholeNumbers = data.wholeNumbers;
                    comp._direction = data.direction;
                    comp._transition = data.transition;
                    comp._interactable = data.interactable;
                    comp._fillRectImage = fillRectImage;
                    comp._handleRectImage = handleRectImage;

                    if(fillRectImage){

                       const widget1 = fillRectImage.entity.addComponent(engine.UIWidget);
                       switch (data.direction) {
                           case MiniGameAdaptor.UI.Slider.Direction.LeftToRight:
                               widget1.leftAnchorTarget = comp.entity.transform2D;
                               widget1.leftAnchor = 0;
                               break;
                           case MiniGameAdaptor.UI.Slider.Direction.RightToLeft:
                               widget1.rightAnchorTarget = comp.entity.transform2D;
                               widget1.rightAnchor = 1;
                               break;
                           case MiniGameAdaptor.UI.Slider.Direction.TopToBottom:
                               widget1.topAnchorTarget = comp.entity.transform2D;
                               widget1.topAnchor = 1;
                               break;
                           case MiniGameAdaptor.UI.Slider.Direction.BottomToTop:
                               widget1.bottomAnchorTarget = comp.entity.transform2D;
                               widget1.bottomAnchor = 0;
                               break;
                        }



                       const fillRectImageTouch =  fillRectImage.entity.addComponent(engine.TouchInputComponent);

                       fillRectImageTouch.onTouchStart.add(resetFillRect);

                       fillRectImageTouch.onTouchMove.add(resetFillRect);

                       const compTouch = comp.entity.addComponent(engine.TouchInputComponent);

                       compTouch.onTouchStart.add(resetFillRect);

                       compTouch.onTouchMove.add(resetFillRect);

                        if(handleRectImage){
                            const widget2 = handleRectImage.entity.addComponent(engine.UIWidget);
                            switch (data.direction) {
                                case MiniGameAdaptor.UI.Slider.Direction.LeftToRight:
                                    widget2.leftAnchorTarget = fillRectImage.entity.transform2D;
                                    widget2.leftAnchor = 1;
                                    break;
                                case MiniGameAdaptor.UI.Slider.Direction.RightToLeft:
                                    widget2.rightAnchorTarget = fillRectImage.entity.transform2D;
                                    widget2.rightAnchor = 0;
                                    break;
                                case MiniGameAdaptor.UI.Slider.Direction.TopToBottom:
                                    widget2.topAnchorTarget = fillRectImage.entity.transform2D;
                                    widget2.topAnchor = 0;
                                    break;
                                case MiniGameAdaptor.UI.Slider.Direction.BottomToTop:
                                    widget2.bottomAnchorTarget = fillRectImage.entity.transform2D;
                                    widget2.bottomAnchor = 1;
                                    break;
                            }

                            const button = handleRectImage.entity.addComponent(engine.UIButton);
                            setColor(button,'pressedColor');
                            setColor(button,'normalColor');
                            setColor(button,'disabledColor');

                        }

                    }

                    function setColor(btn,key){
                        const color = data[key];
                        if(!color){
                            return;
                        }
                        btn[key] = new engine.Color(color[0], color[1], color[2],color[3]);
                    }

                    function resetFillRect(c,e){
                        const transform = c.entity.transform2D;
                        let x = 0,y = 0;
                        switch (data.direction) {

                            case MiniGameAdaptor.UI.Slider.Direction.LeftToRight:
                                x = e.touches[0].position.x + transform.anchorX * transform.sizeX;
                                break;
                            case MiniGameAdaptor.UI.Slider.Direction.RightToLeft:
                                x =  transform.sizeX - (e.touches[0].position.x + transform.anchorX * transform.sizeX);
                                break;
                            case MiniGameAdaptor.UI.Slider.Direction.TopToBottom:
                                y = transform.sizeY -  (e.touches[0].position.y + transform.anchorY * transform.sizeY);
                                break;
                            case MiniGameAdaptor.UI.Slider.Direction.BottomToTop:
                                y = e.touches[0].position.y + transform.anchorY * transform.sizeY;
                                break;

                        }


                        switch (data.direction) {
                            case MiniGameAdaptor.UI.Slider.Direction.LeftToRight:
                            case MiniGameAdaptor.UI.Slider.Direction.RightToLeft:
                                let maxWidth = handleRectImage.entity.transform2D.parent.sizeX;
                                if(x>maxWidth){
                                    x = maxWidth;
                                }else if(x<0){
                                    x = 0;
                                }

                                comp.normalizedValue = x/maxWidth;

                                break;
                            case MiniGameAdaptor.UI.Slider.Direction.TopToBottom:
                            case MiniGameAdaptor.UI.Slider.Direction.BottomToTop:
                                let maxHeight = handleRectImage.entity.transform2D.parent.sizeY;
                                if(y>maxHeight){
                                    y = maxHeight;
                                }else if(y<0){
                                    y = 0;
                                }

                                comp.normalizedValue = y/maxHeight;

                                break;

                        }


                    }

                    const onValueChangedList = data.onValueChanged || [];
                    const targetList = onValueChangedList.map(v=>builtContext.components.data[v.target]);
                    comp._onValueChangeCallback = function(){
                        onValueChangedList.forEach((v,k)=>{
                            let target = targetList[k];
                            const method = v.method;
                            const targetType = v.targetType;
                            if(targetType === "UnityEngine.GameObject"){
                                target = new MiniGameAdaptor.GameObject.$ctor3(target.entity);
                            }
                            target[method].apply(target,arguments);
                        });
                    };


                    return comp;
                }
            }
        },
        fields: {
            _onValueChangeCallback:null,
            _onValueChanged:null,
            _maxValue:0,
            _minValue:0,
            _direction:0,
            _wholeNumbers:false,
            _normalizedValue:0,
            _transition:0,
            _handleRectImage:null,
            _fillRectImage:null
        },
        props: {
            direction: {
                get: function () {
                    return this._direction;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fillRect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            handleRect: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            maxValue: {
                get: function () {
                    return this._maxValue;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            minValue: {
                get: function () {
                    return this._minValue;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            normalizedValue: {
                get: function () {
                    return this._normalizedValue;
                },
                set: function (value) {
                    if(value === this._normalizedValue || value <0 || value > 1){
                        return false;
                    }

                    const transform = this._handleRectImage ? this._handleRectImage.entity.transform2D.parent : this.entity.transform2D;
                    let _value = 0;
                    if(this.wholeNumbers){
                        _value = Math.round(value*(this.maxValue - this.minValue));
                        value = _value / (this.maxValue - this.minValue);
                    }else {
                        _value = value * (this.maxValue - this.minValue);
                    }
                    _value = _value+this.minValue;

                    this._normalizedValue = value;

                    if(this.direction === MiniGameAdaptor.UI.Slider.Direction.TopToBottom || this.direction === MiniGameAdaptor.UI.Slider.Direction.BottomToTop){

                        this._fillRectImage.entity.transform2D.sizeY = value * transform.sizeY;

                    }else{

                        this._fillRectImage.entity.transform2D.sizeX = value * transform.sizeX;



                    }
                    this._onValueChangeCallback && this._onValueChangeCallback(_value);
                    this.onValueChanged.Invoke$1(_value);

                }
            },
            onValueChanged: {
                get: function () {
                    if(!this._onValueChanged){
                        this._onValueChanged = new MiniGameAdaptor.Events.UnityEvent();
                    }
                    return this._onValueChanged;
                },
                set: function (value) {
                    this._onValueChanged = value;
                }
            },
            value: {
                get: function () {
                    const v = this.normalizedValue * (this.maxValue - this.minValue)+this.minValue;
                    return this.wholeNumbers ? Math.round(v) : v;
                },
                set: function (value) {
                    if(value > this.maxValue || value < this.minValue){
                        return false;
                    }

                    this.normalizedValue = (value - this.minValue)/(this.maxValue-this.minValue);

                }
            },
            wholeNumbers: {
                get: function () {
                    return this._wholeNumbers;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ICanvasElement$transform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        alias: [
            "OnMove", "MiniGameAdaptor$EventSystems$IMoveHandler$OnMove",
            "OnPointerDown", "MiniGameAdaptor$EventSystems$IPointerDownHandler$OnPointerDown"
        ],
        methods: {
            FindSelectableOnDown: function () {
                throw new System.Exception("not impl");
            },
            FindSelectableOnLeft: function () {
                throw new System.Exception("not impl");
            },
            FindSelectableOnRight: function () {
                throw new System.Exception("not impl");
            },
            FindSelectableOnUp: function () {
                throw new System.Exception("not impl");
            },
            GraphicUpdateComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$GraphicUpdateComplete: function () {
                throw new System.Exception("Exception");
            },
            LayoutComplete: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$LayoutComplete: function () {
                throw new System.Exception("Exception");
            },
            OnDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IDragHandler$OnDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnInitializePotentialDrag: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IInitializePotentialDragHandler$OnInitializePotentialDrag: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnMove: function (eventData) {
                throw new System.Exception("not impl");
            },
            OnPointerDown: function (eventData) {
                throw new System.Exception("not impl");
            },
            Rebuild: function (executing) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$Rebuild: function (executing) {
                throw new System.Exception("Exception");
            },
            SetDirection: function (direction, includeRectLayouts) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function () {
                throw new System.Exception("Exception");
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.UI.Slider')(MiniGameAdaptor.UI.Slider);
Object.defineProperty(MiniGameAdaptor.UI.Slider.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UI.Slider.prototype.__properties }
});

 
