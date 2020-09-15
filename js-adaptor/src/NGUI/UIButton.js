Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIButton", {
        inherits: [MiniGameAdaptor.UIButtonColor],
        statics: {
            fields: {
                current: null
            },
            methods: {
                Deserialize: function(data, comp, context, builtContext) {

                    comp.ref = builtContext.components.data[data.ref];

                    if (!comp.__onClick) { 
                        comp.__onClick = []
                    }

                    function setColor(key){
                        const color = data[key];
                        if(!color){
                            return;
                        }
                        comp[key] = new engine.Color(color[0], color[1], color[2],color[3]);
                    }
                    //自研引擎的color处理有问题，要自己处理
                    setColor('normalColor');
                    setColor('pressedColor');
                    setColor('disabledColor');

                    if (data.onClick) {
                        data.onClick.forEach(c => {
                            if (!c) return;
                            let target = builtContext.components.data[c.target];
                            let method = c.method
    
                            let params = c.params;
                            let paramsObj = []
                            params.forEach(p => {
                                paramsObj.push(builtContext.components.data[p]);
                            });
    
                            let onclick = MiniGameAdaptor.EventDelegate.__genEngineInputCallback(comp, target, method, paramsObj,'onClick');
                            comp.__onClick.push(onclick);
                        });
                    }

                    return comp;
                }
            }
        },
        fields: {
            normalColor:null,
            disabledColor:null,
            pressedColor:null,
            dragHighlight: false,
            hoverSprite: null,
            pressedSprite: null,
            disabledSprite: null,
            hoverSprite2D: null,
            pressedSprite2D: null,
            disabledSprite2D: null,
            pixelSnap: false,
            onClick: null,
            __onClick: null,
            __inputComp: null
        },
        props: {
            isEnabled: {
                get: function () {
                    return !this.entity.getComponent(engine.UIButton).disable;
                },
                set: function (value) {
                    const btn = this.entity.getComponent(engine.UIButton);
                    btn.disable = !value;
                    const label = this.entity.getComponent(engine.UILabel);
                    if(label){
                        if(value && this.normalColor){
                            label.fontColor = this.normalColor;
                        }else if(!value && this.disabledColor){
                            label.fontColor = this.disabledColor;
                        }
                    }
                }
            },
            normalSprite: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            normalSprite2D: {
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
                this.onClick = new (System.Collections.Generic.List$1(MiniGameAdaptor.EventDelegate)).ctor();
                MiniGameAdaptor.UIButtonColor.ctor.call(this);
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            OnDisable: function () {

            },
            OnClick: function () {
                throw new System.Exception("not impl");
            },
            OnDragOut: function () {
                throw new System.Exception("not impl");
            },
            OnDragOver: function () {
                throw new System.Exception("not impl");
            },
            OnEnable: function () {
                this.__inputComp = this.entity.getComponent(engine.TouchInputComponent);
                if (this.__inputComp) {
                    let _this = this;
                    this.__inputComp.onTouchStart.add((comp, event)=>{

                        const btn = comp.entity.getComponent(engine.UIButton);
                        if(btn && btn.disable){
                            return false;
                        }
                        const label = comp.entity.getComponent(engine.UILabel);
                        if(label && this.pressedColor){
                            label.fontColor = this.pressedColor;
                        }
                        _this.onClick.ForEach(c => {
                            c.__callback(comp, event);
                        });
                    });
                    this.__inputComp.onTouchEnd.add((comp, event)=> {
                        const btn = comp.entity.getComponent(engine.UIButton);
                        if(btn && btn.disable){
                            return false;
                        }
                        const label = comp.entity.getComponent(engine.UILabel);
                        if(label  && this.normalColor){
                           label.fontColor = this.normalColor;
                        }
                    });
                }
            },
            OnInit: function () {
                throw new System.Exception("not impl");
            },
            SetSprite: function (sp) {
                throw new System.Exception("not impl");
            },
            SetSprite$1: function (sp) {
                throw new System.Exception("not impl");
            },
            SetState: function (state, immediate) {
                const btn = this.entity.getComponent(engine.UIButton);
                btn.setState(state);
                const label = this.entity.getComponent(engine.UILabel);
                if(label){
                    if(state === engine.UIButton.State.Normal && this.normalColor){
                        label.fontColor = this.normalColor;
                    }else if(state === engine.UIButton.State.Disable && this.disabledColor){
                        label.fontColor = this.disabledColor;
                    }else if(state === engine.UIButton.State.Pressed && this.pressedColor){
                        label.fontColor = this.pressedColor;
                    }
                }
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UIButton')(MiniGameAdaptor.UIButton);
Object.defineProperty(MiniGameAdaptor.UIButton.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UIButton.prototype.__properties }
})
// MiniGameAdaptor.UIButton.prototype.__properties.ref = { type: "UIButton" };
