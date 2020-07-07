Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.LayerMask", {
        $kind: "struct",
        statics: {
            methods: {
                GetMask: function (layerNames) {
                    if (layerNames === void 0) { layerNames = []; }
                    return new MiniGameAdaptor.LayerMask();
                },
                LayerToName: function (layer) {
                    return "Default";
                },
                NameToLayer: function (layerName) {
                    return 0;
                },
                op_Implicit: function (mask) {
                    // throw new System.Exception("not impl");
                    return mask._mask;
                },
                op_Implicit$1: function (intVal) {
                    // throw new System.Exception("not impl");
                    return new MiniGameAdaptor.LayerMask.$ctor1(intVal);
                },
                getDefaultValue: function () { return new MiniGameAdaptor.LayerMask(); }
            }
        },
        fields: {
            _mask: 0
        },
        props: {
            value: {
                get: function () {
                    return this._mask;
                },
                set: function (value) {
                    this._mask = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function(intVal) {
                this.$initialize();
                this._mask = intVal;
            }
        },
        methods: {
            $clone: function (to) { return this; }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.LayerMask')(MiniGameAdaptor.LayerMask);
Object.defineProperty(MiniGameAdaptor.LayerMask.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.LayerMask.prototype.__properties }
})