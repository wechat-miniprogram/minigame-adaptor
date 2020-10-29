import { engineColliderToAdaptorColliderMap } from './Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.SphereCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    const res = MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);

                    engineColliderToAdaptorColliderMap.set(res.ref, comp);

                    return res;
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
            }
        },
        ctors: {
            ctor: function (entity) {
                this.$initialize();
                MiniGameAdaptor.Collider.ctor.call(this);

                if (!entity.getComponent(engine.SphereCollider)) {
                    this.ref = entity.addComponent(engine.SphereCollider);
                }
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
});

