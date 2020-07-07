Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Events.UnityEventBase", {
        inherits: [MiniGameAdaptor.ISerializationCallbackReceiver],
        statics: {
            methods: {
                GetValidMethodInfo: function (obj, functionName, argumentTypes) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            GetPersistentEventCount: function () {
                throw new System.Exception("not impl");
            },
            GetPersistentMethodName: function (index) {
                throw new System.Exception("not impl");
            },
            GetPersistentTarget: function (index) {
                throw new System.Exception("not impl");
            },
            RemoveAllListeners: function () {
                throw new System.Exception("not impl");
            },
            SetPersistentListenerState: function (index, state) {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$ISerializationCallbackReceiver$OnAfterDeserialize: function () {
                throw new System.Exception("Exception");
            },
            MiniGameAdaptor$ISerializationCallbackReceiver$OnBeforeSerialize: function () {
                throw new System.Exception("Exception");
            }
        }
    });
});

 
