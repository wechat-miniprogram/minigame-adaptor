Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.SphereCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function(data, comp) {
                    if (typeof(data) === "number") {
                        return comp;
                    }
                    
                    comp._isTrigger = data.isTrigger;
                    comp._center = new MiniGameAdaptor.Vector3.$ctor2(data.center[0], data.center[1], data.center[2]);
                    comp._radius = data.radius;
                    
                    return comp;
                }
            }
        },
        fields: {
            _isTrigger: false,
            _center: null,
            _radius : 0
        },
        props: {
            isTrigger: {
                get: function () {
                    return this._isTrigger;
                },
                set: function (value) {
                    this._isTrigger = value;
                }
            },
            center: {
                get: function () {
                    return this._center;
                },
                set: function (value) {
                    this._center = value;
                }
            },
            radius: {
                get: function () {
                    return this._radius;
                },
                set: function (value) {
                    this._radius = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Collider.ctor.call(this);
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.SphereCollider')(MiniGameAdaptor.SphereCollider);
Object.defineProperty(MiniGameAdaptor.SphereCollider.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.SphereCollider.prototype.__properties }
})