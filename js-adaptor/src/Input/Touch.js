Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Touch", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new MiniGameAdaptor.Touch(); }
            }
        },
        fields: {
            _fingerId: -1,
            _position:new MiniGameAdaptor.Vector2.$ctor1(0, 0),
            _phase:-1,
            // _isDone: false,
            // _keepWaiting: true,
            // _url: "",
            // _statusCode:-1,
            // _responseHeaders:null,
        },
        props: {
            altitudeAngle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            azimuthAngle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            deltaPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            deltaTime: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fingerId: {
                get: function () {
                    return this._fingerId;
                    // throw new System.Exception("not impl");
                },
                set: function (value) {
                    this._fingerId = value;
                    // throw new System.Exception("not impl");
                }
            },
            maximumPossiblePressure: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            phase: {
                get: function () {
                    return this._phase;
                    // throw new System.Exception("not impl");
                },
                set: function (value) {
                    this._phase = value;
                    // throw new System.Exception("not impl");
                }
            },
            position: {
                get: function () {
                    return this._position;
                    // throw new System.Exception("not impl");
                },
                set: function (value) {
                    this._position = value;
                    // throw new System.Exception("not impl");
                }
            },
            pressure: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            radius: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            radiusVariance: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            rawPosition: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            tapCount: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            type: {
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
            }
        },
        methods: {
            $clone: function (to) { return this; }
        }
    });
});


