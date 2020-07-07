Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Vector2", {
        inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Vector2)]; },
        $kind: "struct",
        statics: {
            fields: {
                kEpsilon: 0,
                kEpsilonNormalSqrt: 0,
                zeroVector: null,
                oneVector: null,
                upVector: null,
                downVector: null,
                leftVector: null,
                rightVector: null,
                positiveInfinityVector: null,
                negativeInfinityVector: null
            },
            props: {
                zero: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.zeroVector.$clone();
                    }
                },
                one: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.oneVector.$clone();
                    }
                },
                up: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.upVector.$clone();
                    }
                },
                down: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.downVector.$clone();
                    }
                },
                left: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.leftVector.$clone();
                    }
                },
                right: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.rightVector.$clone();
                    }
                },
                positiveInfinity: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.positiveInfinityVector.$clone();
                    }
                },
                negativeInfinity: {
                    get: function () {
                        return MiniGameAdaptor.Vector2.negativeInfinityVector.$clone();
                    }
                }  
            },
            ctors: {
                init: function () {
                    this.kEpsilon = 1E-05;
                    this.kEpsilonNormalSqrt = 1E-15;
                    this.zeroVector = new MiniGameAdaptor.Vector2.$ctor1(0.0, 0.0);
                    this.oneVector = new MiniGameAdaptor.Vector2.$ctor1(1.0, 1.0);
                    this.upVector = new MiniGameAdaptor.Vector2.$ctor1(0.0, 1.0);
                    this.downVector = new MiniGameAdaptor.Vector2.$ctor1(0.0, -1.0);
                    this.leftVector = new MiniGameAdaptor.Vector2.$ctor1(-1.0, 0.0);
                    this.rightVector = new MiniGameAdaptor.Vector2.$ctor1(1.0, 0.0);
                    this.positiveInfinityVector = new MiniGameAdaptor.Vector2.$ctor1(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
                    this.negativeInfinityVector = new MiniGameAdaptor.Vector2.$ctor1(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
                }
            },
            methods: {
                Deserialize: function(data, comp) { 
                    comp.x = data[0];
                    comp.y = data[1];
                    return comp;
                },
                Angle: function (from, to) {
                    let denominator = Math.sqrt(from.sqrMagnitude * to.sqrMagnitude);
                    if (denominator < MiniGameAdaptor.Vector2.kEpsilonNormalSqrt)
                        return 0;
            
                    let dot = MiniGameAdaptor.Mathf.Clamp(MiniGameAdaptor.Vector2.Dot(from, to) / denominator, -1, 1);
                    return Math.acos(dot) * MiniGameAdaptor.Mathf.Rad2Deg;
                },
                ClampMagnitude: function (vector, maxLength) {
                    let sqrMagnitude = vector.sqrMagnitude;
                    if (sqrMagnitude > maxLength * maxLength) {
                        let mag = Math.sqrt(sqrMagnitude);
            
                        let normalized_x = vector.x / mag;
                        let normalized_y = vector.y / mag;
                        return new MiniGameAdaptor.Vector2.$ctor1(normalized_x * maxLength,
                            normalized_y * maxLength);
                    }
                    return vector;
                },
                Distance: function (a, b) {
                    let diff_x = a.x - b.x;
                    let diff_y = a.y - b.y;
                    return Math.sqrt(diff_x * diff_x + diff_y * diff_y);
                },
                Dot: function (lhs, rhs) {
                    return lhs.ref.dot(rhs.ref);
                },
                Lerp: function (a, b, t) {
                    if (t > 1.0) t = 1.0;
                    if (t < 0.0) t = 0.0;
                    return new MiniGameAdaptor.Vector2.$ctor2(a.ref.lerp(b.ref, t));
                },
                LerpUnclamped: function (a, b, t) {
                    return new MiniGameAdaptor.Vector2.$ctor2(a.ref.lerp(b.ref, t));
                },
                Max: function (lhs, rhs) {
                    return new MiniGameAdaptor.Vector2.$ctor1(
                        lhs.x > rhs.x ? lhs.x : rhs.x,
                        lhs.y > rhs.y ? lhs.y : rhs.y
                    );
                },
                Min: function (lhs, rhs) {
                    return new MiniGameAdaptor.Vector2.$ctor1(
                        lhs.x < rhs.x ? lhs.x : rhs.x,
                        lhs.y < rhs.y ? lhs.y : rhs.y
                    );
                },
                MoveTowards: function (current, target, maxDistanceDelta) {
                    let toVector_x = target.x - current.x;
                    let toVector_y = target.y - current.y;
            
                    let sqDist = toVector_x * toVector_x + toVector_y * toVector_y;
            
                    if (sqDist == 0 || (maxDistanceDelta >= 0 && sqDist <= maxDistanceDelta * maxDistanceDelta))
                        return target;
            
                    let dist = Math.sqrt(sqDist);
            
                    return new MiniGameAdaptor.Vector2.$ctor1(current.x + toVector_x / dist * maxDistanceDelta,
                        current.y + toVector_y / dist * maxDistanceDelta);
                },
                Perpendicular: function (inDirection) {
                    return new MiniGameAdaptor.Vector2.$ctor1(-inDirection.y, inDirection.x);
                },
                Reflect: function (inDirection, inNormal) {
                    let factor = -2 * MiniGameAdaptor.Vector2.Dot(inNormal, inDirection);
                    return new MiniGameAdaptor.Vector2.$ctor1(factor * inNormal.x + inDirection.x, factor * inNormal.y + inDirection.y);
                },
                Scale: function (a, b) {
                    return new MiniGameAdaptor.Vector2.$ctor1(a.x * b.x, a.y * b.y);
                },
                SignedAngle: function (from, to) {
                    let unsigned_angle = MiniGameAdaptor.Vector2.Angle(from, to);
                    let sign = MiniGameAdaptor.Mathf.Sign(from.x * to.y - from.y * to.x);
                    return unsigned_angle * sign;
                },
                SmoothDamp: function (current, target, currentVelocity, smoothTime) {
                    let deltaTime = MiniGameAdaptor.Time.deltaTime;
                    let maxSpeed = MiniGameAdaptor.Mathf.Infinity;
                    return MiniGameAdaptor.Vector2.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
                },
                SmoothDamp$1: function (current, target, currentVelocity, smoothTime, maxSpeed) {
                    let deltaTime = MiniGameAdaptor.Time.deltaTime;
                    return MiniGameAdaptor.Vector2.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
                },
                SmoothDamp$2: function (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                    smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);
                    let omega = 2 / smoothTime;
        
                    let x = omega * deltaTime;
                    let exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        
                    let change_x = current.x - target.x;
                    let change_y = current.y - target.y;
                    let originalTo = target;
        
                    let maxChange = maxSpeed * smoothTime;
        
                    let maxChangeSq = maxChange * maxChange;
                    let sqDist = change_x * change_x + change_y * change_y;
                    if (sqDist > maxChangeSq) {
                        var mag = Math.sqrt(sqDist);
                        change_x = change_x / mag * maxChange;
                        change_y = change_y / mag * maxChange;
                    }
        
                    target.x = current.x - change_x;
                    target.y = current.y - change_y;
        
                    let temp_x = (currentVelocity.x + omega * change_x) * deltaTime;
                    let temp_y = (currentVelocity.y + omega * change_y) * deltaTime;
        
                    currentVelocity.x = (currentVelocity.x - omega * temp_x) * exp;
                    currentVelocity.y = (currentVelocity.y - omega * temp_y) * exp;
        
                    let output_x = target.x + (change_x + temp_x) * exp;
                    let output_y = target.y + (change_y + temp_y) * exp;
        
                    let origMinusCurrent_x = originalTo.x - current.x;
                    let origMinusCurrent_y = originalTo.y - current.y;
                    let outMinusOrig_x = output_x - originalTo.x;
                    let outMinusOrig_y = output_y - originalTo.y;
        
                    if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y > 0) {
                        output_x = originalTo.x;
                        output_y = originalTo.y;
        
                        currentVelocity.x = (output_x - originalTo.x) / deltaTime;
                        currentVelocity.y = (output_y - originalTo.y) / deltaTime;
                    }
                    return new MiniGameAdaptor.Vector2.$ctor1(output_x, output_y);
                },
                SqrMagnitude: function (a) {
                    return a.x * a.x + a.y * a.y;
                },
                op_Addition: function (a, b) {
                    return new MiniGameAdaptor.Vector2.$ctor1(a.x + b.x, a.y + b.y);
                },
                op_Division: function (a, d) {
                    return new MiniGameAdaptor.Vector2.$ctor1(a.x / d, a.y / d);
                },
                op_Division$1: function (a, b) {
                    return new MiniGameAdaptor.Vector2.$ctor1(a.x / b.x, a.y / b.y);
                },
                op_Equality: function (lhs, rhs) {
                    let diff_x = lhs.x - rhs.x;
                    let diff_y = lhs.y - rhs.y;
                    return (diff_x * diff_x + diff_y * diff_y) < MiniGameAdaptor.Vector2.kEpsilon * MiniGameAdaptor.Vector2.kEpsilon;
                },
                op_Implicit: function (v) {
                    return new MiniGameAdaptor.Vector2.$ctor1(v.x, v.y);
                },
                op_Implicit$1: function (v) {
                    return new MiniGameAdaptor.Vector3.$ctor1(v.x, v.y);
                },
                op_Inequality: function (lhs, rhs) {
                    return !MiniGameAdaptor.Vector2.op_Equality(lhs, rhs);
                },
                op_Multiply: function (d, a) {
                    return new MiniGameAdaptor.Vector2.$ctor1(d * a.x, d * a.y);
                },
                op_Multiply$1: function (a, d) {
                    return new MiniGameAdaptor.Vector2.$ctor1(d * a.x, d * a.y);
                },
                op_Multiply$2: function (a, b) {
                    return new MiniGameAdaptor.Vector2.$ctor1(a.x * b.x, a.y * b.y);
                },
                op_Subtraction: function (a, b) {
                    return new MiniGameAdaptor.Vector2.$ctor1(a.x - b.x, a.y - b.y);
                },
                op_UnaryNegation: function (a) {
                    return new MiniGameAdaptor.Vector2.$ctor1(-a.x, -a.y);
                },
                getDefaultValue: function () { return new MiniGameAdaptor.Vector2(); }
            }
        },
        fields: {
            ref: null
        },
        props: {
            magnitude: {
                get: function () {
                    return this.ref.length();
                }
            },
            normalized: {
                get: function () {
                    return new MiniGameAdaptor.Vector2.$ctor2(this.ref.normalize());
                }
            },
            sqrMagnitude: {
                get: function () {
                    return this.magnitude * this.magnitude;
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
            }
        },
        ctors: {
            $ctor2: function (ref) {
                this.$initialize();
                this.ref = ref;
            },
            $ctor1: function (x, y) {
                this.$initialize();
                this.ref = new engine.Vector2();
                this.x = x;
                this.y = y;
            },
            ctor: function () {
                this.$initialize();
                this.ref = new engine.Vector2();
                this.x = 0;
                this.y = 0;
            }
        },
        methods: {
            getItem: function (index) {
                switch (index) {
                    case 0: 
                        return this.x;
                    case 1: 
                        return this.y;
                    default: 
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector2 index!");
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
                    default: 
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector2 index!");
                }
            },
            equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Vector2))) {
                    return false;
                }

                return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Vector2));
            },
            equalsT: function (other) {
                return this.x === other.x && this.y === other.y;
            },
            Equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Vector2))) {
                    return false;
                }
                return this.ref.equal(other.ref);
            },
            System$IEquatable$1$MiniGameAdaptor$Vector2$equalsT: function (other) {
                throw new System.Exception("Exception");
            },
            getHashCode: function () {
                return System.Single.getHashCode(this.x) ^ (System.Single.getHashCode(this.y) << 2);
            },
            Normalize: function () {
                let mag = this.magnitude;
                if (mag > MiniGameAdaptor.Vector2.kEpsilon) {
                    (MiniGameAdaptor.Vector2.op_Division(this, mag)).$clone(this);
                } else {
                    (MiniGameAdaptor.Vector2.zero.$clone()).$clone(this);
                }
            },
            Scale: function (scale) {
                this.x *= scale.x;
                this.y *= scale.y;
            },
            Set: function (newX, newY) {
                this.x = newX;
                this.y = newY;
            },
            SqrMagnitude: function () {
                return this.x * this.x + this.y * this.y;
            },
            toString: function () {
                return System.String.format("({0:F1}, {1:F1})", this.x, this.y);
            },
            ToString: function (format) {
                return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ")";
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.Vector2();
                s.x = this.x;
                s.y = this.y;
                return s;
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Vector2')(MiniGameAdaptor.Vector2);
Object.defineProperty(MiniGameAdaptor.Vector2.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Vector2.prototype.__properties }
})