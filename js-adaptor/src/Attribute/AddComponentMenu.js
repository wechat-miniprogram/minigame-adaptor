Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.AddComponentMenu", {
        inherits: [System.Attribute],
        props: {
            componentMenu: {
                get: function () {
                }
            },
            componentOrder: {
                get: function () {
                }
            }
        },
        ctors: {
            ctor: function (menuName) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            },
            $ctor1: function (menuName, order) {
                this.$initialize();
                System.Attribute.ctor.call(this);
            }
        }
    });
});
