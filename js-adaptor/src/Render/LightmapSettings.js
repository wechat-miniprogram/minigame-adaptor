Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.LightmapSettings", {
        inherits: [MiniGameAdaptor.Object],
        statics: {
            fields: {
                _lightmaps: []
            },
            props: {
                lightmaps: {
                    get: function () {
                        return this._lightmaps;
                    },
                    set: function (value) {
                        this._lightmaps = value;
                    }
                },
                lightmapsMode: {
                    get: function () {

                    },
                    set: function (value) {

                    }
                },
                lightProbes: {
                    get: function () {

                    },
                    set: function (value) {

                    }
                }
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.LightmapSettings')(MiniGameAdaptor.LightmapSettings);
Object.defineProperty(MiniGameAdaptor.LightmapSettings.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.LightmapSettings.prototype.__properties }
})