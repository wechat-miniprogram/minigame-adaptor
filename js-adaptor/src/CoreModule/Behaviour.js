Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Behaviour", {
        inherits: [MiniGameAdaptor.Component],
        props: {
            enabled: {
                get: function get() {
                  return this._active;
                },
                set: function set(value) {
                  this._active = value;
                }
            },
            isActiveAndEnabled: {
                get: function () {
                    // ?
                    return this._active;
                    // throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Component.ctor.call(this);
            }
        }
    });
});
