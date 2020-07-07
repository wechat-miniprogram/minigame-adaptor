Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.LightmapData", {
        inherits: [MiniGameAdaptor.Object],
        fields: {
            lightmapColor_: null,
            lightmapDir_: null,
            shadowMask_: null
        },
        props: {  

            lightmapColor: {
                get: function () {
                    return this.lightmapColor_;
                }
            },
            lightmapDir: {
                get: function () {
                    return this.lightmapDir_;
                }
            },
            shadowMask: {
                get: function () {
                    return this.shadowMask_;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Behaviour.ctor.call(this);
            }
        }
    });
});


engine.decorators.serialize('MiniGameAdaptor.LightmapData')(MiniGameAdaptor.LightmapData);
Object.defineProperty(MiniGameAdaptor.LightmapData.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.LightmapData.prototype.__properties }
})