
import { engineColliderToAdaptorColliderMap } from './Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.MeshCollider", {
        inherits: [MiniGameAdaptor.Collider],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    const res = MiniGameAdaptor.Component.Deserialize(data, comp, context, builtContext);

                    engineColliderToAdaptorColliderMap.set(res.ref, comp);

                    return res;
                },
            }
        },
        fields: {
            _convex: false,
            _cookingOptions: 1,
            _shareMesh: null
        },
        props: {
            convex: {
                get: function () {
                    return this.ref.convex;
                },
                set: function (value) {
                    this.ref.convex = value;
                }
            },
            cookingOptions: {
                get: function () {
                    return this.ref.cookingOptions;
                },
                set: function (value) {
                    this.ref.cookingOptions = value;
                }
            },
            sharedMesh: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
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

engine.decorators.serialize('MiniGameAdaptor.MeshCollider')(MiniGameAdaptor.MeshCollider);
Object.defineProperty(MiniGameAdaptor.MeshCollider.prototype, '__properties', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: { ...MiniGameAdaptor.MeshCollider.prototype.__properties }
})
