Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.CapsuleCollider", {
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
                    comp._height = data.height;
                    comp._direction = data.direction;

                    return comp;
                }
            }
        },
        fields: {
            _isTrigger: false,
            _center: null,
            _radius: 0,
            _height: 0,
            _direction: 1
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
            },
            height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                }
            },
            direction: {
                get: function () {
                    return this._direction;
                },
                set: function (value) {
                    this._direction = value;
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
engine.decorators.serialize('MiniGameAdaptor.CapsuleCollider')(MiniGameAdaptor.CapsuleCollider);
Object.defineProperty(MiniGameAdaptor.CapsuleCollider.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.CapsuleCollider.prototype.__properties }
})
