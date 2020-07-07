import {physx, Phys3D} from './Physx';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.PhysicMaterialCombine", {
        $kind: "enum",
        statics: {
            fields: {
                Average: 0,
                Minimum: 2,
                Multiply: 1,
                Maximum: 3
            }
        }
    });
});

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.PhysicMaterial", {
        inherits: [MiniGameAdaptor.Object],
        props: {
            bounceCombine: {
                get: function () {
                    return this.nativeMaterial.bounceCombine;
                },
                set: function (value) {
                    this.nativeMaterial.bounceCombine = value;
                }
            },
            bounciness: {
                get: function () {
                    return this.nativeMaterial.bounciness;
                },
                set: function (value) {
                    this.nativeMaterial.bounciness = value;
                }
            },
            dynamicFriction: {
                get: function () {
                    return this.nativeMaterial.dynamicFriction;
                },
                set: function (value) {
                    this.nativeMaterial.dynamicFriction = value;
                }
            },
            frictionCombine: {
                get: function () {
                    return this.nativeMaterial.frictionCombine;
                },
                set: function (value) {
                    this.nativeMaterial.frictionCombine = value;
                }
            },
            staticFriction: {
                get: function () {
                    return this.nativeMaterial.staticFriction;
                },
                set: function (value) {
                    this.nativeMaterial.staticFriction = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                UnityEngine.Object.ctor.call(this);

                const instance = physx.Phys3dInstance;

                // https://docs.unity3d.com/Manual/class-PhysicMaterial.html
                this.nativeMaterial = new Phys3D.Material(instance);
            },
            $ctor1: function (name) {
                this.$initialize();
                UnityEngine.Object.ctor.call(this);

                // https://docs.unity3d.com/Manual/class-PhysicMaterial.html
                this.nativeMaterial = new Phys3D.Material(instance);
            }
        }
    });
});

