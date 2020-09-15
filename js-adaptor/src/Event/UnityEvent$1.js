Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Events.UnityEvent$1", {
        inherits: [MiniGameAdaptor.Events.UnityEventBase],
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Events.UnityEventBase.ctor.call(this);
                this.eventList = [];
                //throw new System.Exception("not impl");
            }
        },
        methods: {
            methods: {
                FindMethod_Impl: function (name, targetObj) {
                    throw new System.Exception("not impl");
                },
                AddListener$1: function (call) {
                    this.eventList.push(call);
                },
                Invoke$1: function () {
                    this.eventList.forEach(v=>v(...arguments));
                },
                RemoveListener$1: function (call) {
                    const index = this.eventList.findIndex(v=>{
                        return v === call;
                    });
                    if(index >-1){
                        this.eventList.splice(index);
                    }
                }
            }
        }
    });
});

 
