Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Events.UnityEvent", {
        inherits: [MiniGameAdaptor.Events.UnityEventBase],
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Events.UnityEventBase.ctor.call(this);
                throw new System.Exception("not impl");
            }
        },
        methods: {
            AddListener: function (call) {
                throw new System.Exception("not impl");
            },
            Invoke: function () {
                throw new System.Exception("not impl");
            },
            RemoveListener: function (call) {
                throw new System.Exception("not impl");
            }
        }
    });
});

 
