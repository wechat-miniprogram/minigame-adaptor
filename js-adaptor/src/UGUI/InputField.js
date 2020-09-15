Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.InputField", {

        statics: {
            methods: {
                Deserialize: function (data, comp, context, builtContext) {
                    MiniGameAdaptor.UI.UGUIEvenSystemHandler.register(data, comp, context, builtContext);
                    const input = comp.entity.getComponent(engine.UITextInput);
                    const label = input.label;
                    label.overflow = 1;
                    if(data.promptColor){
                        const color = data.promptColor;
                        input.promptColor = new engine.Color(color[0], color[1], color[2],color[3]);
                    }


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

                    const keyboard = comp.entity.getComponent(engine.KeyboardInputComponent);
                    keyboard.onKeyboardInput.add((context,res) => {
                        comp.onValueChanged.Invoke$1(res.value);
                        _onValueChangeCallback(res.value);
                    });

                    return comp;
                }
            }
        },
        fields:{
            _onValueChanged:null
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
            text:{
                get:function(){
                    return this.entity.getComponent(engine.UITextInput).text;
                },
                set:function(text){
                    this.entity.getComponent(engine.UITextInput).text = text;
                }
            }
        },
        methods: {

        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.UI.InputField')(MiniGameAdaptor.UI.InputField);
Object.defineProperty(MiniGameAdaptor.UI.InputField.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UI.InputField.prototype.__properties }
});
