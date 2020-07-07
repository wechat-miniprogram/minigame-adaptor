Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Vector4", {
        inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Vector4)]; },
        $kind: "struct",
        statics: {
            fields: {
                kEpsilon: 0,
                zeroVector: null,
                oneVector: null,
                positiveInfinityVector: null,
                negativeInfinityVector: null
            },
            props: {
                zero: {
                    get: function () {
                        return MiniGameAdaptor.Vector4.zeroVector.$clone();
                    }
                },
                one: {
                    get: function () {
                        return MiniGameAdaptor.Vector4.oneVector.$clone();
                    }
                },
                positiveInfinity: {
                    get: function () {
                        return MiniGameAdaptor.Vector4.positiveInfinityVector.$clone();
                    }
                },
                negativeInfinity: {
                    get: function () {
                        return MiniGameAdaptor.Vector4.negativeInfinityVector.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.kEpsilon = 1E-05;
                    this.zeroVector = new MiniGameAdaptor.Vector4.$ctor3(0.0, 0.0, 0.0, 0.0);
                    this.oneVector = new MiniGameAdaptor.Vector4.$ctor3(1.0, 1.0, 1.0, 1.0);
                    this.positiveInfinityVector = new MiniGameAdaptor.Vector4.$ctor3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
                    this.negativeInfinityVector = new MiniGameAdaptor.Vector4.$ctor3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
                }
            },
            methods: {
                Deserialize: function(data, comp) { 
                    comp.x = data[0];
                    comp.y = data[1];
                    comp.z = data[2];
                    comp.w = data[3];
                    return comp;
                },
                Distance: function (a, b) {
                    return MiniGameAdaptor.Vector4.Magnitude(MiniGameAdaptor.Vector4.op_Subtraction(a, b));
                },
                Dot: function (a, b) {
                    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
                },
                Lerp: function (a, b, t) {
                    if (t > 1.0) t = 1.0;
                    if (t < 0.0) t = 0.0;
                    return new MiniGameAdaptor.Vector4.$ctor4(a.ref.lerp(b.ref, t));
                },
                LerpUnclamped: function (a, b, t) {
                    return new MiniGameAdaptor.Vector4.$ctor4(a.ref.lerp(b.ref, t));
                },
                Magnitude: function (a) {
                    return Math.sqrt(MiniGameAdaptor.Vector4.Dot(a, a));
                },
                Max: function (lhs, rhs) {
                    return new Vector4.$ctor3(
                        lhs.x > rhs.x ? lhs.x : rhs.x,
                        lhs.y > rhs.y ? lhs.y : rhs.y,
                        lhs.z > rhs.z ? lhs.z : rhs.z,
                        lhs.w > rhs.w ? lhs.w : rhs.w
                    );
                },
                Min: function (lhs, rhs) {
                    return new Vector4.$ctor3(
                        lhs.x < rhs.x ? lhs.x : rhs.x,
                        lhs.y < rhs.y ? lhs.y : rhs.y,
                        lhs.z < rhs.z ? lhs.z : rhs.z,
                        lhs.w < rhs.w ? lhs.w : rhs.w
                    );
                },
                MoveTowards: function (current, target, maxDistanceDelta) {
                    let toVector_x = target.x - current.x;
                    let toVector_y = target.y - current.y;
                    let toVector_z = target.z - current.z;
                    let toVector_w = target.w - current.w;
            
                    let sqdist = (toVector_x * toVector_x +
                        toVector_y * toVector_y +
                        toVector_z * toVector_z +
                        toVector_w * toVector_w);
            
                    if (sqdist == 0 || (maxDistanceDelta >= 0 && sqdist <= maxDistanceDelta * maxDistanceDelta))
                        return target;
            
                    var dist = Math.sqrt(sqdist);
            
                    return new MiniGameAdaptor.Vector4.$ctor3(current.x + toVector_x / dist * maxDistanceDelta,
                        current.y + toVector_y / dist * maxDistanceDelta,
                        current.z + toVector_z / dist * maxDistanceDelta,
                        current.w + toVector_w / dist * maxDistanceDelta);
                },
                Normalize: function (a) {
                    let mag = MiniGameAdaptor.Vector4.Magnitude(a);
                    if (mag > MiniGameAdaptor.Vector4.kEpsilon) {
                        return MiniGameAdaptor.Vector4.op_Division(a, mag);
                    } else {
                        return MiniGameAdaptor.Vector4.zero.$clone();
                    }
                },
                Project: function (a, b) {
                    return b * (MiniGameAdaptor.Vector4.Dot(a, b) / MiniGameAdaptor.Vector4.Dot(b, b));
                },
                Scale: function (a, b) {
                    return new MiniGameAdaptor.Vector4.$ctor3(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
                },
                SqrMagnitude: function (a) {
                    return MiniGameAdaptor.Vector4.Dot(a, a);
                },
                op_Addition: function (a, b) {
                    return new MiniGameAdaptor.Vector4.$ctor3(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
                },
                op_Division: function (a, d) {
                    return new MiniGameAdaptor.Vector4.$ctor3(a.x / d, a.y / d, a.z / d, a.w / d);
                },
                op_Equality: function (lhs, rhs) {
                    let diffx = lhs.x - rhs.x;
                    let diffy = lhs.y - rhs.y;
                    let diffz = lhs.z - rhs.z;
                    let diffw = lhs.w - rhs.w;
                    let sqrmag = diffx * diffx + diffy * diffy + diffz * diffz + diffw * diffw;
                    return sqrmag < MiniGameAdaptor.Vector4.kEpsilon * MiniGameAdaptor.Vector4.kEpsilon;
                },
                op_Implicit: function (v) {
                    return new MiniGameAdaptor.Vector4.$ctor3(v.x, v.y, v.z, 0);
                },
                op_Implicit$1: function (v) {
                    return new MiniGameAdaptor.Vector3.$ctor2(v.x, v.y, v.z);
                },
                op_Implicit$2: function (v) {
                    return new MiniGameAdaptor.Vector4.$ctor3(v.x, v.y, 0, 0);
                },
                op_Implicit$3: function (v) {
                    return new MiniGameAdaptor.Vector2.$ctor1(v.x, v.y);
                },
                op_Inequality: function (lhs, rhs) {
                    return !MiniGameAdaptor.Vector4.op_Equality(lhs, rhs);
                },
                op_Multiply: function (d, a) {
                    return new MiniGameAdaptor.Vector4.$ctor3(a.x * d, a.y * d, a.z * d, a.w * d);
                },
                op_Multiply$1: function (a, d) {
                    return new MiniGameAdaptor.Vector4.$ctor3(a.x * d, a.y * d, a.z * d, a.w * d);
                },
                op_Subtraction: function (a, b) {
                    return new MiniGameAdaptor.Vector4.$ctor3(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
                },
                op_UnaryNegation: function (a) {
                    return new MiniGameAdaptor.Vector4.$ctor3(-a.x, -a.y, -a.z, -a.w);
                },
                getDefaultValue: function () { return new MiniGameAdaptor.Vector4(); }
            }
        },
        fields: {
            ref: null
        },
        props: {
            magnitude: {
                get: function () {
                    return Math.sqrt(MiniGameAdaptor.Vector4.Dot(this, this));
                }
            },
            normalized: {
                get: function () {
                    return MiniGameAdaptor.Vector4.Normalize(this);
                }
            },
            sqrMagnitude: {
                get: function () {
                    return MiniGameAdaptor.Vector4.Dot(this, this);
                }
            },
            x : {
                get : function () {
                    return this.ref.x;
                },
                set : function (value) {
                    this.ref.x = value;
                }
            },
            y : {
                get : function () {
                    return this.ref.y;
                },
                set : function (value) {
                    this.ref.y = value;
                }
            },
            z : {
                get : function () {
                    return this.ref.z;
                },
                set : function (value) {
                    this.ref.z = value;
                }
            },
            w : {
                get : function () {
                    return this.ref.w;
                },
                set : function (value) {
                    this.ref.w = value;
                }
            }
        },
        ctors: {
            $ctor1: function (x, y) {
                this.$initialize();
                this.ref = new engine.Vector4();
                this.x = x;
                this.y = y;
                this.z = 0;
                this.w = 0;
            },
            $ctor2: function (x, y, z) {
                this.$initialize();
                this.ref = new engine.Vector4();
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = 0;
            },
            $ctor3: function (x, y, z, w) {
                this.$initialize();
                this.ref = new engine.Vector4();
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            },
            $ctor4: function (ref) { 
                this.$initialize();
                this.ref = ref;
            },
            $ctor5: function (array) {
                this.$initialize();
                this.ref = new engine.Vector4();
                this.x = array[0];
                this.y = array[1];
                this.z = array[2];
                this.w = array[3];
            },
            ctor: function () {
                this.$initialize();
                this.ref = new engine.Vector4();
                this.x = this.y = this.z = this.w = 0;
            }
        },
        methods: {
            getItem: function (index) {
                switch (index) {
                    case 0: 
                        return this.x;
                    case 1: 
                        return this.y;
                    case 2: 
                        return this.z;
                    case 3: 
                        return this.w;
                    default: 
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector4 index!");
                }
            },
            setItem: function (index, value) {
                switch (index) {
                    case 0: 
                        this.x = value;
                        break;
                    case 1: 
                        this.y = value;
                        break;
                    case 2: 
                        this.z = value;
                        break;
                    case 3: 
                        this.w = value;
                        break;
                    default: 
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector4 index!");
                }
            },
            equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Vector4))) {
                    return false;
                }

                return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Vector4));
            },
            equalsT: function (other) {
                return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
            },
            Equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Vector4))) {
                    return false;
                }

                return this.ref.equal(other.ref);
            },
            System$IEquatable$1$MiniGameAdaptor$Vector4$equalsT: function (other) {
                throw new System.Exception("Exception");
            },
            getHashCode: function () {
                return System.Single.getHashCode(this.x) ^ (System.Single.getHashCode(this.y) << 2) ^ (System.Single.getHashCode(this.z) >> 2) ^ (System.Single.getHashCode(this.w) >> 2);
            },
            Normalize: function () {
                let mag = MiniGameAdaptor.Vector4.Magnitude(this);
                if (mag > MiniGameAdaptor.Vector4.kEpsilon) {
                    (MiniGameAdaptor.Vector4.op_Division(this, mag)).$clone(this);
                } else {
                    (MiniGameAdaptor.Vector4.zero.$clone()).$clone(this);
                }
            },
            Scale: function (scale) {
                this.x *= scale.x;
                this.y *= scale.y;
                this.z *= scale.z;
                this.w *= scale.w;
            },
            Set: function (newX, newY, newZ, newW) {
                this.x = newX;
                this.y = newY;
                this.z = newZ;
                this.w = newW;
            },
            SqrMagnitude: function () {
                return MiniGameAdaptor.Vector4.Dot(this, this);
            },
            toString: function () {
                return System.String.format("({0:F1}, {1:F1}, {2:F1}, {3:F1})", this.x, this.y, this.z, this.w);
            },
            ToString: function (format) {
                return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ", " + this.z.toFixed(format) + ", " + this.w.toFixed(format) + ")";
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.Vector4();
                s.x = this.x;
                s.y = this.y;
                s.z = this.z;
                s.w = this.w;
                return s;
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Vector4')(MiniGameAdaptor.Vector4);
Object.defineProperty(MiniGameAdaptor.Vector4.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Vector4.prototype.__properties }
})