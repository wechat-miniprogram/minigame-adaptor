Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Vector3", {
        inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Vector3)]; },
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
                forwardVector: null,
                backVector: null,
                positiveInfinityVector: null,
                negativeInfinityVector: null
            },
            props: {
                zero: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.zeroVector.$clone();
                    }
                },
                one: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.oneVector.$clone();
                    }
                },
                forward: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.forwardVector.$clone();
                    }
                },
                back: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.backVector.$clone();
                    }
                },
                up: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.upVector.$clone();
                    }
                },
                down: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.downVector.$clone();
                    }
                },
                left: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.leftVector.$clone();
                    }
                },
                right: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.rightVector.$clone();
                    }
                },
                positiveInfinity: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.positiveInfinityVector.$clone();
                    }
                },
                negativeInfinity: {
                    get: function () {
                        return MiniGameAdaptor.Vector3.negativeInfinityVector.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.kEpsilon = 1E-05;
                    this.kEpsilonNormalSqrt = 1E-10;
                    this.zeroVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 0.0, 0.0);
                    this.oneVector = new MiniGameAdaptor.Vector3.$ctor2(1.0, 1.0, 1.0);
                    this.upVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 1.0, 0.0);
                    this.downVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, -1.0, 0.0);
                    // 坐标系问题x颠倒 @eugenejiang
                    // ?? 在adaptor内的运算应该保持和unity的左手坐标系一致，最后再做后处理Flip到引擎右手坐标系
                    // 所以这里改回去
                    this.leftVector = new MiniGameAdaptor.Vector3.$ctor2(-1.0, 0.0, 0.0);
                    this.rightVector = new MiniGameAdaptor.Vector3.$ctor2(1.0, 0.0, 0.0);
                    this.forwardVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 0.0, 1.0);
                    this.backVector = new MiniGameAdaptor.Vector3.$ctor2(0.0, 0.0, -1.0);
                    this.positiveInfinityVector = new MiniGameAdaptor.Vector3.$ctor2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
                    this.negativeInfinityVector = new MiniGameAdaptor.Vector3.$ctor2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
                }
            },
            methods: {
                Deserialize: function(data, comp) {
                    comp.x = data[0];
                    comp.y = data[1];
                    comp.z = data[2];
                    return comp;
                },
                Angle: function (from, to) {
                    let denominator = Math.sqrt(from.sqrMagnitude * to.sqrMagnitude);
                    if (denominator < MiniGameAdaptor.Vector3.kEpsilonNormalSqrt)
                        return 0.0;

                    let dot = MiniGameAdaptor.Mathf.Clamp(MiniGameAdaptor.Vector3.Dot(from, to) / denominator, -1.0, 1.0);
                    return (Math.acos(dot)) * MiniGameAdaptor.Mathf.Rad2Deg;
                },
                ClampMagnitude: function (vector, maxLength) {
                    let sqrmag = vector.sqrMagnitude;
                    if (sqrmag > maxLength * maxLength) {
                        let mag = Math.sqrt(sqrmag);
                        let normalized_x = vector.x / mag;
                        let normalized_y = vector.y / mag;
                        let normalized_z = vector.z / mag;
                        return new MiniGameAdaptor.Vector3.$ctor2(normalized_x * maxLength,
                            normalized_y * maxLength,
                            normalized_z * maxLength);
                    }
                    return vector;
                },
                Cross: function (lhs, rhs) {
                    // return new MiniGameAdaptor.Vector3.$ctor3(lhs.ref.cross(rhs.ref));
                    return new MiniGameAdaptor.Vector3.$ctor2(
                        lhs.y * rhs.z - lhs.z * rhs.y,
                        lhs.z * rhs.x - lhs.x * rhs.z,
                        lhs.x * rhs.y - lhs.y * rhs.x
                    );
                },
                Distance: function (a, b) {
                    // return a.ref.distanceTo(b.ref);
                    let diff_x = a.x - b.x;
                    let diff_y = a.y - b.y;
                    let diff_z = a.z - b.z;
                    return Math.sqrt(diff_x * diff_x + diff_y * diff_y + diff_z * diff_z);
                },
                Dot: function (lhs, rhs) {
                    // return lhs.ref.dot(rhs.ref);
                    return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
                },
                Lerp: function (a, b, t) {
                    // if (t > 1.0) t = 1.0;
                    // if (t < 0.0) t = 0.0;
                    // return new MiniGameAdaptor.Vector3.$ctor3(a.ref.lerp(b.ref, t));
                    t = MiniGameAdaptor.Mathf.Clamp01(t);
                    return new MiniGameAdaptor.Vector3.$ctor2(
                        a.x + (b.x - a.x) * t,
                        a.y + (b.y - a.y) * t,
                        a.z + (b.z - a.z) * t
                    );
                },
                LerpUnclamped: function (a, b, t) {
                    return new MiniGameAdaptor.Vector3.$ctor2(
                        a.x + (b.x - a.x) * t,
                        a.y + (b.y - a.y) * t,
                        a.z + (b.z - a.z) * t
                    );
                },
                Magnitude: function (vector) {
                    return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
                },
                Max: function (lhs, rhs) {
                    return new MiniGameAdaptor.Vector3.$ctor2(
                        lhs.x > rhs.x ? lhs.x : rhs.x,
                        lhs.y > rhs.y ? lhs.y : rhs.y,
                        lhs.z > rhs.z ? lhs.z : rhs.z
                    );
                },
                Min: function (lhs, rhs) {
                    return new MiniGameAdaptor.Vector3.$ctor2(
                        lhs.x < rhs.x ? lhs.x : rhs.x,
                        lhs.y < rhs.y ? lhs.y : rhs.y,
                        lhs.z < rhs.z ? lhs.z : rhs.z
                    );
                },
                MoveTowards: function (current, target, maxDistanceDelta) {
                    let toVector_x = target.x - current.x;
                    let toVector_y = target.y - current.y;
                    let toVector_z = target.z - current.z;

                    let sqdist = toVector_x * toVector_x + toVector_y * toVector_y + toVector_z * toVector_z;

                    if (sqdist == 0 || (maxDistanceDelta >= 0 && sqdist <= maxDistanceDelta * maxDistanceDelta))
                        return target;
                    let dist = Math.sqrt(sqdist);

                    return new MiniGameAdaptor.Vector3.$ctor2(current.x + toVector_x / dist * maxDistanceDelta,
                        current.y + toVector_y / dist * maxDistanceDelta,
                        current.z + toVector_z / dist * maxDistanceDelta);
                },
                Normalize: function (value) {
                    let mag = MiniGameAdaptor.Vector3.Magnitude(value);
                    if (mag > MiniGameAdaptor.Vector3.kEpsilon) {
                        return MiniGameAdaptor.Vector3.op_Division(value, mag);
                    } else {
                        return MiniGameAdaptor.Vector3.zero.$clone();
                    }
                },
                OrthoNormalize: function (normal, tangent) {
                    normal.v = MiniGameAdaptor.Vector3.Normalize(normal);
                    tangent.v = MiniGameAdaptor.Vector3.ProjectOnPlane(tangent, normal);
                    tangent.v = MiniGameAdaptor.Vector3.Normalize(tangent);
                },
                // https://github.com/gsage/engine/blob/master/Vendor/gmath/src/Vector3.hpp
                OrthoNormalize$1: function (normal, tangent, binormal) {
                    MiniGameAdaptor.Vector3.OrthoNormaliz(normal, tangent);
                    binormal.v = MiniGameAdaptor.Vector3.ProjectOnPlane(binormal, tangent);
                    binormal.v = MiniGameAdaptor.Vector3.ProjectOnPlane(binormal, normal);
                    binormal.v = MiniGameAdaptor.Vector3.Normalize(binormal);
                },
                Project: function (vector, onNormal) {
                    let sqrMag = MiniGameAdaptor.Vector3.Dot(onNormal, onNormal);
                    if (sqrMag < MiniGameAdaptor.Mathf.Epsilon) {
                        return MiniGameAdaptor.Vector3.zero;

                    } else{
                        let dot = MiniGameAdaptor.Vector3.Dot(vector, onNormal);
                        return new MiniGameAdaptor.Vector3.$ctor2(onNormal.x * dot / sqrMag,
                            onNormal.y * dot / sqrMag,
                            onNormal.z * dot / sqrMag);
                    }
                },
                ProjectOnPlane: function (vector, planeNormal) {
                    let sqrMag = MiniGameAdaptor.Vector3.Dot(planeNormal, planeNormal);
                    if (sqrMag < MiniGameAdaptor.Mathf.Epsilon) {
                        return vector;

                    } else {
                        let dot = MiniGameAdaptor.Vector3.Dot(vector, planeNormal);
                        return new MiniGameAdaptor.Vector3.$ctor2(vector.x - planeNormal.x * dot / sqrMag,
                            vector.y - planeNormal.y * dot / sqrMag,
                            vector.z - planeNormal.z * dot / sqrMag);
                    }
                },
                Reflect: function (inDirection, inNormal) {
                    let factor = -2.0 * MiniGameAdaptor.Vector3.Dot(inNormal, inDirection);
                    return new MiniGameAdaptor.Vector3.$ctor2(factor * inNormal.x + inDirection.x,
                        factor * inNormal.y + inDirection.y,
                        factor * inNormal.z + inDirection.z);
                },
                // https://github.com/gsage/engine/blob/master/Vendor/gmath/src/Vector3.hpp
                RotateTowards: function (current, target, maxRadiansDelta, maxMagnitudeDelta) {
                    let magCur = MiniGameAdaptor.Vector3.Magnitude(current);
                    let magTar = MiniGameAdaptor.Vector3.Magnitude(target);
                    let newMag = magCur + maxMagnitudeDelta *
                      ((magTar > magCur) - (magCur > magTar));
                    newMag = Math.min(newMag, Math.max(magCur, magTar));
                    newMag = Math.max(newMag, Math.min(magCur, magTar));

                    let totalAngle = MiniGameAdaptor.Vector3.Angle(current, target) - maxRadiansDelta;
                    if (totalAngle <= 0) {
                        return MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.Normalize(target), newMag);
                    } else if (totalAngle >= M_PI) {
                      return MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.Normalize(MiniGameAdaptor.Vector3.op_UnaryNegation(target)), newMag);
                    }
                    let axis = MiniGameAdaptor.Vector3.Cross(current, target);
                    let magAxis = MiniGameAdaptor.Vector3.Magnitude(axis);
                    if (magAxis == 0) {
                        axis = MiniGameAdaptor.Vector3.Normalize(MiniGameAdaptor.Vector3.Cross(current, MiniGameAdaptor.Vector3.op_Addition(current, new MiniGameAdaptor.Vector3.$ctor2(3.95, 5.32, -4.24))));
                    } else {
                        axis = MiniGameAdaptor.Vector3.op_Division(axis, magAxis);
                    }
                    current = MiniGameAdaptor.Vector3.Normalize(current);
                    let newVector = MiniGameAdaptor.Vector3.op_Multiply$1(current, Math.cos(maxRadiansDelta)) + MiniGameAdaptor.Vector3.op_Multiply$1(MiniGameAdaptor.Vector3.Cross(axis, current), Math.sin(maxRadiansDelta));

                    return MiniGameAdaptor.Vector3.op_Multiply$1(newVector, newMag);
                },
                Scale: function (a, b) {
                    // return new MiniGameAdaptor.Vector3.$ctor3(a.ref.scaleXYZ(b.x, b.y, b.z));
                    return new MiniGameAdaptor.Vector3.$ctor2(a.x * b.x, a.y * b.y, a.z * b.z);
                },
                SignedAngle: function (from, to, axis) {
                    let unsignedAngle = MiniGameAdaptor.Vector3.Angle(from, to);

                    let cross_x = from.y * to.z - from.z * to.y;
                    let cross_y = from.z * to.x - from.x * to.z;
                    let cross_z = from.x * to.y - from.y * to.x;
                    let sign = MiniGameAdaptor.Mathf.Sign(axis.x * cross_x + axis.y * cross_y + axis.z * cross_z);
                    return unsignedAngle * sign;
                },
                Slerp: function (lhs, rhs, t) {
                    return MiniGameAdaptor.Vector3.SlerpUnclamped(lhs, rhs, MiniGameAdaptor.Mathf.Clamp01(t));
                },
                SlerpUnclamped: function (lhs, rhs, t) {
                    let lhsMag = MiniGameAdaptor.Vector3.Magnitude (lhs);
                    let rhsMag = MiniGameAdaptor.Vector3.Magnitude (rhs);

                    if (lhsMag < MiniGameAdaptor.Vector3.kEpsilon || rhsMag < MiniGameAdaptor.Vector3.kEpsilon) {
                        return MiniGameAdaptor.Vector3.Lerp(lhs, rhs, t);
                    }

                    let lerpedMagnitude = MiniGameAdaptor.Mathf.Lerp(lhsMag, rhsMag, t);

                    let dot = MiniGameAdaptor.Vector3.Dot(lhs, rhs) / (lhsMag * rhsMag);

                    // almost same
                    if (dot > 1.0 - MiniGameAdaptor.Vector3.kEpsilon) {
                        return MiniGameAdaptor.Vector3.Lerp(lhs, rhs, t);
                    }
                    // almost opposite
                    else if (dot < MiniGameAdaptor.Vector3.kEpsilon - 1) {
                        let lhsNorm = MiniGameAdaptor.Vector3.op_Division(lhs, lhsMag);
                        let axis = MiniGameAdaptor.Vector3.OrthoNormalVectorFast(lhsNorm);
                        let m = new window.__minigamePrivate.Matrix3x3();
                        m.SetAxisAngle(axis, Math.PI * t);
                        let slerped = m.MultiplyVec3(lhsNorm);
                        slerped = MiniGameAdaptor.Vector3.op_Multiply$1(slerped, lerpedMagnitude);
                        return slerped;
                    }
                    else {
                        let axis = MiniGameAdaptor.Vector3.Cross(lhs, rhs);
                        let lhsNorm = MiniGameAdaptor.Vector3.op_Division(lhs, lhsMag);
                        axis = MiniGameAdaptor.Vector3.Normalize(axis);
                        let angle = Math.acos(dot) * t;

                        let m = new window.__minigamePrivate.Matrix3x3();
                        m.SetAxisAngle(axis, angle);
                        let slerped = m.MultiplyVec3(lhsNorm);
                        slerped = MiniGameAdaptor.Vector3.op_Multiply$1(slerped, lerpedMagnitude);
                        return slerped;
                    }
                },
                SmoothDamp: function (current, target, currentVelocity, smoothTime) {
                    let deltaTime = MiniGameAdaptor.Time.deltaTime;
                    let maxSpeed = MiniGameAdaptor.Mathf.Infinity;
                    return MiniGameAdaptor.Vector3.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
                },
                SmoothDamp$1: function (current, target, currentVelocity, smoothTime, maxSpeed) {
                    let deltaTime = MiniGameAdaptor.Time.deltaTime;
                    return MiniGameAdaptor.Vector3.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
                },
                SmoothDamp$2: function (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                    let output_x = 0;
                    let output_y = 0;
                    let output_z = 0;

                    // Based on Game Programming Gems 4 Chapter 1.10
                    smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);
                    let omega = 2 / smoothTime;

                    let x = omega * deltaTime;
                    let exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

                    let change_x = current.x - target.x;
                    let change_y = current.y - target.y;
                    let change_z = current.z - target.z;
                    let originalTo = target;

                    // Clamp maximum speed
                    let maxChange = maxSpeed * smoothTime;

                    let maxChangeSq = maxChange * maxChange;
                    let sqrmag = change_x * change_x + change_y * change_y + change_z * change_z;
                    if (sqrmag > maxChangeSq) {
                        var mag = Math.sqrt(sqrmag);
                        change_x = change_x / mag * maxChange;
                        change_y = change_y / mag * maxChange;
                        change_z = change_z / mag * maxChange;
                    }

                    target.x = current.x - change_x;
                    target.y = current.y - change_y;
                    target.z = current.z - change_z;

                    let temp_x = (currentVelocity.v.x + omega * change_x) * deltaTime;
                    let temp_y = (currentVelocity.v.y + omega * change_y) * deltaTime;
                    let temp_z = (currentVelocity.v.z + omega * change_z) * deltaTime;

                    currentVelocity.v.x = (currentVelocity.v.x - omega * temp_x) * exp;
                    currentVelocity.v.y = (currentVelocity.v.y - omega * temp_y) * exp;
                    currentVelocity.v.z = (currentVelocity.v.z - omega * temp_z) * exp;

                    output_x = target.x + (change_x + temp_x) * exp;
                    output_y = target.y + (change_y + temp_y) * exp;
                    output_z = target.z + (change_z + temp_z) * exp;

                    let origMinusCurrent_x = originalTo.x - current.x;
                    let origMinusCurrent_y = originalTo.y - current.y;
                    let origMinusCurrent_z = originalTo.z - current.z;
                    let outMinusOrig_x = output_x - originalTo.x;
                    let outMinusOrig_y = output_y - originalTo.y;
                    let outMinusOrig_z = output_z - originalTo.z;

                    if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y + origMinusCurrent_z * outMinusOrig_z > 0) {
                        output_x = originalTo.x;
                        output_y = originalTo.y;
                        output_z = originalTo.z;

                        currentVelocity.v.x = (output_x - originalTo.x) / deltaTime;
                        currentVelocity.v.y = (output_y - originalTo.y) / deltaTime;
                        currentVelocity.v.z = (output_z - originalTo.z) / deltaTime;
                    }

                    return new MiniGameAdaptor.Vector3.$ctor2(output_x, output_y, output_z);
                },
                SqrMagnitude: function (vector) {
                    return vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
                },
                op_Addition: function (a, b) {
                    return new MiniGameAdaptor.Vector3.$ctor2(a.x + b.x, a.y + b.y, a.z + b.z);
                },
                op_Division: function (a, d) {
                    // is that right? or throw DivideByZeroException?
                    if (d === 0) {
                        return new MiniGameAdaptor.Vector3();
                    }
                    return new MiniGameAdaptor.Vector3.$ctor2(a.x / d, a.y / d, a.z / d);
                },
                op_Equality: function (lhs, rhs) {
                    let diff_x = lhs.x - rhs.x;
                    let diff_y = lhs.y - rhs.y;
                    let diff_z = lhs.z - rhs.z;
                    let sqrmag = diff_x * diff_x + diff_y * diff_y + diff_z * diff_z;
                    return sqrmag < MiniGameAdaptor.Vector3.kEpsilon * MiniGameAdaptor.Vector3.kEpsilon ;
                },
                op_Inequality: function (lhs, rhs) {
                    return !(MiniGameAdaptor.Vector3.op_Equality(lhs, rhs));
                },
                op_Multiply: function (d, a) {
                    return new MiniGameAdaptor.Vector3.$ctor2(a.x * d, a.y * d, a.z * d);
                },
                op_Multiply$1: function (a, d) {
                    return new MiniGameAdaptor.Vector3.$ctor2(a.x * d, a.y * d, a.z * d);
                },
                op_Subtraction: function (a, b) {
                    return new MiniGameAdaptor.Vector3.$ctor2(a.x - b.x, a.y - b.y, a.z - b.z);
                },
                op_UnaryNegation: function (a) {
                    return new MiniGameAdaptor.Vector3.$ctor2(-a.x, -a.y, -a.z);
                },
                getDefaultValue: function () { return new MiniGameAdaptor.Vector3(); }
            }
        },
        fields: {
            ref: null,
            // _x: 0,
            // _y: 0,
            // _z: 0
        },
        props: {
            magnitude: {
                get: function () {
                    // return this.ref.length();
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
                }
            },
            normalized: {
                get: function () {
                    // return new MiniGameAdaptor.Vector3.$ctor3(this.ref.normalize());
                    let n = this.$clone();
                    n.Normalize();
                    return n;
                }
            },
            sqrMagnitude: {
                get: function () {
                    // return this.magnitude * this.magnitude;
                    return this.x * this.x + this.y * this.y + this.z * this.z;
                }
            },
            x : {
                get : function () {
                    return this.ref.x;
                    // return this._x;
                },
                set : function (value) {
                    // this._x = value;
                    this.ref.x = value;
                }
            },
            y : {
                get : function () {
                    return this.ref.y;
                    // return this._y;
                },
                set : function (value) {
                    // this._y = value;
                    this.ref.y = value;
                }
            },
            z : {
                get : function () {
                    return this.ref.z;
                    // return this._z;
                },
                set : function (value) {
                    // this._z = value;
                    this.ref.z = value;
                }
            }
        },
        ctors: {
            $ctor1: function (x, y) {
                this.$initialize();
                this.ref = new engine.Vector3();
                this.x = x;
                this.y = y;
                this.z = 0;
            },
            $ctor2: function (x, y, z) {
                this.$initialize();
                this.ref = new engine.Vector3();
                this.x = x;
                this.y = y;
                this.z = z;
            },
            $ctor3: function (ref) {
                this.$initialize();
                this.ref = ref;
            },
            $ctor4: function (ref) {
                this.$initialize();
                this.ref = new engine.Vector3();
                this.x = ref.x;
                this.y = ref.y;
                this.z = ref.z;
            },
            ctor: function () {
                this.$initialize();
                this.ref = new engine.Vector3();
                this.x = this.y = this.z = 0;
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
                    default:
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector3 index!");
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
                    default:
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Vector3 index!");
                }
            },
            equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Vector3))) {
                    return false;
                }

                return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Vector3));
            },
            equalsT: function (other) {
                return this.x === other.x && this.y === other.y && this.z === other.z;
            },
            Equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Vector3))) {
                    return false;
                }

                // return this.ref.equal(other.ref);
                return this.equalsT(other);
            },
            System$IEquatable$1$MiniGameAdaptor$Vector3$equalsT: function (other) {
                throw new System.Exception("Exception");
            },
            getHashCode: function () {
                return System.Single.getHashCode(this.x) ^ (System.Single.getHashCode(this.y) << 2) ^ (System.Single.getHashCode(this.z) >> 2);
            },
            Normalize: function () {
                let mag = MiniGameAdaptor.Vector3.Magnitude(this);
                if (mag > MiniGameAdaptor.Vector3.kEpsilon) {
                    (MiniGameAdaptor.Vector3.op_Division(this, mag)).$clone(this);
                } else {
                    (MiniGameAdaptor.Vector3.zero.$clone()).$clone(this);
                }
            },
            Scale: function (scale) {
                this.x *= scale.x;
                this.y *= scale.y;
                this.z *= scale.z;
            },
            Set: function (newX, newY, newZ) {
                this.x = newX;
                this.y = newY;
                this.z = newZ;
            },
            toString: function () {
                return System.String.format("({0:F1}, {1:F1}, {2:F1})", this.x, this.y, this.z);
            },
            ToString: function (format) {
                return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ", " + this.z.toFixed(format) + ")";
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.Vector3();
                s.x = this.x;
                s.y = this.y;
                s.z = this.z;
                return s;
            },
            _Deg2Rad() {
                this.x *= MiniGameAdaptor.Mathf.Deg2Rad;
                this.y *= MiniGameAdaptor.Mathf.Deg2Rad;
                this.z *= MiniGameAdaptor.Mathf.Deg2Rad;
                return this;
            },
            _Rad2Deg() {
                this.x *= MiniGameAdaptor.Mathf.Rad2Deg;
                this.y *= MiniGameAdaptor.Mathf.Rad2Deg;
                this.z *= MiniGameAdaptor.Mathf.Rad2Deg;
                return this;
            },
            _FlipX() {
                this.x *= -1;
                return this;
            },
            _FlipY() {
                this.y *= -1;
                return this;
            },
            _FlipZ() {
                this.z *= -1;
                return this;
            },
            _FlipXYZ() {
                this.x *= -1;
                this.y *= -1;
                this.z *= -1;
                return this;
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.Vector3')(MiniGameAdaptor.Vector3);
Object.defineProperty(MiniGameAdaptor.Vector3.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Vector3.prototype.__properties }
})
