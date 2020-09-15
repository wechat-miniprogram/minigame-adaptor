Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.PropertyBinding.UpdateCondition", {
        $kind: "nested enum",
        statics: {
            fields: {
                OnStart: 0,
                OnUpdate: 1,
                OnLateUpdate: 2,
                OnFixedUpdate: 3
            }
        }
    });
});
