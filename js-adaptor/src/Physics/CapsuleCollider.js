import { engineColliderToAdaptorColliderMap } from './Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.CapsuleCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    const res = MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);

                    if (res.ref) {
                        engineColliderToAdaptorColliderMap.set(res.ref, comp);
                    }

                    return res;
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
                    return this.ref.isTrigger;
                },
                set: function (value) {
                    this.ref.isTrigger = value;
                }
            },
            center: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor3(this.ref.center)._FlipX();
                },
                set: function (value) {
                    this.ref.center = value._FlipX().ref;
                }
            },
            radius: {
                get: function () {
                    return this.ref.radius;
                },
                set: function (value) {
                    this.ref.radius = value;
                }
            },
            height: {
                get: function () {
                    return this.ref.height;
                },
                set: function (value) {
                    this.ref.height = value;
                }
            },
            direction: {
                get: function () {
                    return this.ref.direction;
                },
                set: function (value) {
                    this.ref.direction = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Collider.ctor.call(this);

            }
        },
        methods: {
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
