Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Toggle", {
        inherits: [MiniGameAdaptor.UI.Selectable,MiniGameAdaptor.UI.ICanvasElement,MiniGameAdaptor.EventSystems.ISubmitHandler,MiniGameAdaptor.EventSystems.IPointerClickHandler],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {

                    MiniGameAdaptor.UI.UGUIEvenSystemHandler.register(data, comp, context, builtContext);
                    const toggle = comp.entity.getComponent(engine.UIToggle);
                    if(data.toggleGroup){
                        let toggleGroup = builtContext.components.data[data.toggleGroup];
                        toggleGroup = toggleGroup.entity.getComponent(engine.UIToggleGroup);
                        toggleGroup.addToggle(toggle);
                    }

                    comp._isOn = toggle.isChecked;


                    const onValueChangedList = data.onValueChanged || [];
                    const targetList = onValueChangedList.map(v=>builtContext.components.data[v.target]);
                    const _onValueChangeCallback = function(){
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

                    const script = comp.entity.addComponent(engine.Script);
                    script.onStateChange = (isChecked)=>{
                        comp.onValueChanged.Invoke$1(isChecked);
                        _onValueChangeCallback(isChecked);
                    };

                    return comp;
                }
            }
        },
        fields: {
            _isOn:false,
            toggleTransition: 0,
            graphic: null,
        },
        props: {
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
            group: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            isOn: {
                get: function () {
                    return this._isOn;
                },
                set: function (value) {
                    this._isOn = Boolean(value);
                    const toggle = comp.entity.getComponent(engine.UIToggle);
                    toggle.isChecked = Boolean(value);
                }
            },
            MiniGameAdaptor$UI$ICanvasElement$transform: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
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
            OnPointerClick: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$IPointerClickHandler$OnPointerClick: function (eventData) {
                throw new System.Exception("Exception");
            },
            OnSubmit: function (eventData) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$EventSystems$ISubmitHandler$OnSubmit: function (eventData) {
                throw new System.Exception("Exception");
            },
            Rebuild: function (executing) {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ICanvasElement$Rebuild: function (executing) {
                throw new System.Exception("Exception");
            },
            MiniGameAdaptor$UI$ICanvasElement$IsDestroyed: function () {
                throw new System.Exception("Exception");
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.UI.Toggle')(MiniGameAdaptor.UI.Toggle);
Object.defineProperty(MiniGameAdaptor.UI.Toggle.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UI.Toggle.prototype.__properties }
})
 
