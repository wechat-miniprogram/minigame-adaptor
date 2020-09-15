Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Button", {
        inherits: [MiniGameAdaptor.UI.Selectable,MiniGameAdaptor.EventSystems.ISubmitHandler,MiniGameAdaptor.EventSystems.IPointerClickHandler],
        statics: {
            fields: {
                list: null,
                current: null
            },
            methods: {
                Deserialize: function (data, comp, context, builtContext) {

                    comp.ref = builtContext.components.data[data.ref];

                    const compTouch = comp.entity.getComponent(engine.TouchInputComponent);
                    const onClickList = data.onClickList || [];
                    const targetList = onClickList.map(v=>builtContext.components.data[v.target]);

                    MiniGameAdaptor.UI.UGUIEvenSystemHandler.register(data, comp, context, builtContext);

                    if(compTouch){
                        compTouch.onClick.add(()=>{
                            onClickList.forEach((v,k)=>{
                                let target = targetList[k];
                                const method = v.method;
                                const targetType = v.targetType;
                                if(targetType === "UnityEngine.GameObject"){
                                    target = new MiniGameAdaptor.GameObject.$ctor3(target.entity);
                                }
                                target[method].apply(target);
                            });
                            comp.onClick.Invoke$1();
                        });
                    }

                    MiniGameAdaptor.UI.Selectable.Deserialize(data, comp, context, builtContext);

                    return comp;
                }
            }
        },
        fields:{
          _onclick:null
        },
        props: {
            onClick: {
                get: function () {
                    if(!this._onclick){
                        this._onclick = new MiniGameAdaptor.Events.UnityEvent();
                    }
                    return this._onclick;
                },
                set: function (value) {
                    this._onclick = value;
                }
            },
        },
        methods: {
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
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.UI.Button')(MiniGameAdaptor.UI.Button);
Object.defineProperty(MiniGameAdaptor.UI.Button.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UI.Button.prototype.__properties }
});
