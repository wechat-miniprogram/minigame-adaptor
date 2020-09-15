Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UIToggle", {
        inherits: [MiniGameAdaptor.UIWidgetContainer],
        statics: {
            fields: {
                list: null,
                current: null
            },
            methods: {
                GetActiveToggle: function (group) {
                    throw new System.Exception("not impl");
                },
                Deserialize: function(data, comp, context, builtContext) {
                    const parent = comp.entity.transform2D.parent.entity;
                    const toggle = comp.entity.getComponent(engine.UIToggle);
                    comp.group = data.group;

                    Object.defineProperty(toggle,'activeSprite',{
                        get:function(){
                            return toggle.target;
                        },
                        set:function(v){
                            toggle.target = v;
                        },
                        configuarble:true
                    });

                    if(data.group){
                        // 设置了一个组的，这里要手动创建一个UIToggleGroup
                        let uiToggleGroup = parent.getComponent(engine.UIToggleGroup);
                        if(!uiToggleGroup){
                            uiToggleGroup = parent.addComponent(engine.UIToggleGroup);
                        }
                        uiToggleGroup.addToggle(toggle);
                    }

                    const script = comp.entity.addComponent(engine.Script);
                    script.onStateChange = (isChecked, state)=>{
                        toggle.onChange.ForEach(v=>{
                            MiniGameAdaptor.UIToggle.current = toggle;
                            v.__callback && v.__callback(isChecked, state);
                            comp.value = isChecked;
                        });
                    };

                    toggle.onChange = new (System.Collections.Generic.List$1(MiniGameAdaptor.EventDelegate)).ctor();

                    if(data.onChange && data.onChange.length){
                        data.onChange.forEach(c => {
                            if (!c) return;
                            let target = builtContext.components.data[c.target];
                            let method = c.method

                            let params = c.params;
                            let paramsObj = [];
                            params.forEach(p => {
                                paramsObj.push(builtContext.components.data[p]);
                            });

                            MiniGameAdaptor.EventDelegate.__genEngineInputCallback(toggle, target, method, paramsObj,'onChange');
                        });
                    }

                    Object.defineProperty(toggle,'value',{
                        get:function(){
                            return comp.value;
                        },
                        set:function(v){
                            comp.value = v;
                        },
                        configuarble:true
                    });

                    toggle.Set = comp.Set.bind(comp);

                    comp._data = data;
                    return comp;
                }
            }
        },
        fields: {
            _data:null,
            _value:false,
            group: 0,
            activeSprite: null,
            invertSpriteState: false,
            activeAnimation: null,
            animator: null,
            tween: null,
            startsActive: false,
            instantTween: false,
            optionCanBeNone: false,
            onChange: null,
            validator: null
        },
        props: {
            isColliderEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            value: {
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    if(value !== this._value){
                        this._value = value;
                        const toggle = this.entity.getComponent(engine.UIToggle);
                        toggle.setState(value ? engine.UIToggle.ToggleState.Checked : engine.UIToggle.ToggleState.UnChecked);
                    }
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.UIWidgetContainer.ctor.call(this);
            }
        },
        methods: {
            Set: function (state, notify) {
                this.value = state;
            },
            Start: function () {
                // throw new System.Exception("not impl");
                // @
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UIToggle')(MiniGameAdaptor.UIToggle);
Object.defineProperty(MiniGameAdaptor.UIToggle.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UIToggle.prototype.__properties }
})
