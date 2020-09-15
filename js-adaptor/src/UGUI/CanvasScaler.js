Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.CanvasScaler", {
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    this._data  = data;
                    return comp;
                }
            }
        },
        fields:{
            _data:null,
        },
        props: {
            matchWidthOrHeight: {
                get: function () {
                    const type = engine.game.activeScene2D.settings.adaptationType;
                    if(type === 0){
                        return 1;
                    }else if(type === 1){
                        return 0;
                    }else if(type === 2){
                        return 0.5;
                    }else{
                        return null;
                    }
                },
                set: function (value) {
                    if(value <= 0.25){
                        engine.game.activeScene2D.settings.adaptationType = 1;
                    }else if(type >= 0.75){
                        engine.game.activeScene2D.settings.adaptationType = 0;
                    }else{
                        engine.game.activeScene2D.settings.adaptationType = 2;
                    }
                }
            }
        },
        methods: {

        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.UI.CanvasScaler')(MiniGameAdaptor.UI.CanvasScaler);
Object.defineProperty(MiniGameAdaptor.UI.CanvasScaler.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UI.CanvasScaler.prototype.__properties }
});
