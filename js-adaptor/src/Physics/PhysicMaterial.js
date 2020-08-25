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
                    return this.ref.bounceCombine;
                },
                set: function (value) {
                    this.ref.bounceCombine = value;
                }
            },
            bounciness: {
                get: function () {
                    return this.ref.bounciness;
                },
                set: function (value) {
                    this.ref.bounciness = value;
                }
            },
            dynamicFriction: {
                get: function () {
                    return this.ref.dynamicFriction;
                },
                set: function (value) {
                    this.ref.dynamicFriction = value;
                }
            },
            frictionCombine: {
                get: function () {
                    return this.ref.frictionCombine;
                },
                set: function (value) {
                    this.ref.frictionCombine = value;
                }
            },
            staticFriction: {
                get: function () {
                    return this.ref.staticFriction;
                },
                set: function (value) {
                    this.ref.staticFriction = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);
                this.ref = new engine.PhysicMaterial();
            },
            $ctor1: function (name) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);

                this.ref = new engine.PhysicMaterial();
            }
        }
    });
});

