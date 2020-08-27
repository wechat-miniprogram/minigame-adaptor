import { engineColliderToAdaptorColliderMap } from './Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.BoxCollider", {
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
            _size: null
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
                    const center = this.ref.center;

                    return new MiniGameAdaptor.Vector3.$ctor3(center.x, center.y, center.z)._FlipX();
                },
                set: function (value) {
                    this.ref.center = value._FlipX().ref;
                }
            },
            size: {
                get: function () {
                    const size = this.ref.size;

                    return new MiniGameAdaptor.Vector3.$ctor3(size.x, size.y, size.z)._FlipX();
                },
                set: function (value) {
                    this.ref.size = value._FlipX().ref;
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

engine.decorators.serialize('MiniGameAdaptor.BoxCollider')(MiniGameAdaptor.BoxCollider);
Object.defineProperty(MiniGameAdaptor.BoxCollider.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.BoxCollider.prototype.__properties }
})
