Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Quaternion", {
        inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Quaternion)]; },
        $kind: "struct",
        statics: {
            fields: {
                kEpsilon: 0,
                identityQuaternion : null
            },
            props: {
                identity: {
                    get: function () {
                        return MiniGameAdaptor.Quaternion.identityQuaternion.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.kEpsilon = 1E-06;
                    this.identityQuaternion = new MiniGameAdaptor.Quaternion.$ctor1(0, 0, 0, 1);
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
                Angle: function (a, b) {
                    let dot = MiniGameAdaptor.Quaternion.Dot(a, b);
                    return MiniGameAdaptor.Quaternion.__IsEqualUsingDot(dot) ? 0 : MiniGameAdaptor.Mathf.Acos(MiniGameAdaptor.Mathf.Min(MiniGameAdaptor.Mathf.Abs(dot), 1.0)) * 2.0 * MiniGameAdaptor.Mathf.Rad2Deg;
                },
                __IsEqualUsingDot: function(dot) {
                    return dot > 1.0 - MiniGameAdaptor.Quaternion.kEpsilon;
                },
                AngleAxis: function (angle, axis) {
                    if (axis.sqrMagnitude === 0) {
                        return MiniGameAdaptor.Quaternion.identity;
                    }

                    let result = new MiniGameAdaptor.Quaternion();
                    let radians = angle * MiniGameAdaptor.Mathf.Deg2Rad * 0.5;
                    axis.Normalize();
                    axis = MiniGameAdaptor.Vector3.op_Multiply$1(axis, Math.sin(radians));
                    result.x = axis.x;
                    result.y = axis.y;
                    result.z = axis.z;
                    result.w = Math.cos(radians);

                    return MiniGameAdaptor.Quaternion.Normalize(result);
                },
                Dot: function (a, b) {
                    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
                },
                Euler: function (x, y, z) {
                    return MiniGameAdaptor.Quaternion.Euler$1(new MiniGameAdaptor.Vector3.$ctor2(x, y, z));
                },
                Euler$1: function (euler) {
                    if (!euler) { return; }
                    let rad = euler._Deg2Rad();
                    return new MiniGameAdaptor.Quaternion.$ctor2(engine.Quaternion.fromEulerAngles(rad.ref));
                },
                // from http://stackoverflow.com/questions/11492299/quaternion-to-euler-angles-algorithm-how-to-convert-to-y-up-and-between-ha
                // __FromEulerRad: function (euler) {
                //     let yaw = euler.x;
                //     let pitch = euler.y;
                //     let roll = euler.z;
                //     let rollOver2 = roll * 0.5;
                //     let sinRollOver2 = Math.sin(rollOver2);
                //     let cosRollOver2 = Math.cos(rollOver2);
                //     let pitchOver2 = pitch * 0.5;
                //     let sinPitchOver2 = Math.sin(pitchOver2);
                //     let cosPitchOver2 = Math.cos(pitchOver2);
                //     let yawOver2 = yaw * 0.5;
                //     let sinYawOver2 = Math.sin(yawOver2);
                //     let cosYawOver2 = Math.cos(yawOver2);
                //     let result = new MiniGameAdaptor.Quaternion.$ctor1(
                //         cosYawOver2 * cosPitchOver2 * cosRollOver2 + sinYawOver2 * sinPitchOver2 * sinRollOver2,
                //         cosYawOver2 * cosPitchOver2 * sinRollOver2 - sinYawOver2 * sinPitchOver2 * cosRollOver2,
                //         cosYawOver2 * sinPitchOver2 * cosRollOver2 + sinYawOver2 * cosPitchOver2 * sinRollOver2,
                //         sinYawOver2 * cosPitchOver2 * cosRollOver2 - cosYawOver2 * sinPitchOver2 * sinRollOver2
                //     );
                //     return result;
                // },
                FromToRotation: function (fromDirection, toDirection) {
                    return MiniGameAdaptor.Quaternion.RotateTowards(MiniGameAdaptor.Quaternion.LookRotation(fromDirection), MiniGameAdaptor.Quaternion.LookRotation(toDirection), float.MaxValue);
                },
                Inverse: function (rotation) {
                    let lengthSq = rotation.x * rotation.x + rotation.y * rotation.y + rotation.z * rotation.z + rotation.w * rotation.w;
                    if (lengthSq != 0.0) {
                        let i = 1.0 / lengthSq;
                        return new MiniGameAdaptor.Quaternion.$ctor1(rotation.x * -i, rotation.y * -i, rotation.z * -i, rotation.w * i);
                    }
                    return rotation;
                },
                Lerp: function (a, b, t) {
                    return MiniGameAdaptor.Quaternion.Slerp(a, b, t);
                },
                LerpUnclamped: function (a, b, t) {
                    return MiniGameAdaptor.Quaternion.SlerpUnclamped(a, b, t);
                },
                LookRotation: function (forward) {
                    let up = MiniGameAdaptor.Vector3.up;
                    return MiniGameAdaptor.Quaternion.LookRotation$1(forward, up);
                },
                LookRotation$1: function (forward, upwards) {
                    forward = MiniGameAdaptor.Vector3.Normalize(forward);
                    let right = MiniGameAdaptor.Vector3.Normalize(MiniGameAdaptor.Vector3.Cross(upwards, forward));
                    upwards = MiniGameAdaptor.Vector3.Cross(forward, right);
                    let m00 = right.x;
                    let m01 = right.y;
                    let m02 = right.z;
                    let m10 = upwards.x;
                    let m11 = upwards.y;
                    let m12 = upwards.z;
                    let m20 = forward.x;
                    let m21 = forward.y;
                    let m22 = forward.z;


                    let num8 = (m00 + m11) + m22;
                    let quaternion = new MiniGameAdaptor.Quaternion();
                    if (num8 > 0) {
                        let num = Math.sqrt(num8 + 1);
                        quaternion.w = num * 0.5;
                        // divide by 0
                        if (num !== 0) {
                            num = 0.5 / num;
                        }
                        quaternion.x = (m12 - m21) * num;
                        quaternion.y = (m20 - m02) * num;
                        quaternion.z = (m01 - m10) * num;
                        return quaternion;
                    }
                    if ((m00 >= m11) && (m00 >= m22)) {
                        let num7 = Math.sqrt(((1 + m00) - m11) - m22);
                        let num4 = 0;
                        // divide by 0
                        if (num7 !== 0) {
                            num4 = 0.5 / num7;
                        }
                        quaternion.x = 0.5 * num7;
                        quaternion.y = (m01 + m10) * num4;
                        quaternion.z = (m02 + m20) * num4;
                        quaternion.w = (m12 - m21) * num4;
                        return quaternion;
                    }
                    if (m11 > m22) {
                        let num6 = Math.sqrt(((1 + m11) - m00) - m22);
                        let num3 = 0;
                        // divide by 0
                        if (num6 !== 0) {
                            num3 = 0.5 / num6;
                        }
                        quaternion.x = (m10 + m01) * num3;
                        quaternion.y = 0.5 * num6;
                        quaternion.z = (m21 + m12) * num3;
                        quaternion.w = (m20 - m02) * num3;
                        return quaternion;
                    }
                    let num5 = Math.sqrt(((1 + m22) - m00) - m11);
                    let num2 = 0;
                    // divide by 0
                    if (num5 !== 0) {
                        num2 = 0.5 / num5;
                    }
                    quaternion.x = (m20 + m02) * num2;
                    quaternion.y = (m21 + m12) * num2;
                    quaternion.z = 0.5 * num5;
                    quaternion.w = (m01 - m10) * num2;
                    return quaternion;
                },
                Normalize: function (q) {
                    let mag = MiniGameAdaptor.Mathf.Sqrt(MiniGameAdaptor.Quaternion.Dot(q, q));

                    if (mag < MiniGameAdaptor.Mathf.Epsilon)
                        return MiniGameAdaptor.Quaternion.identity;

                    return new MiniGameAdaptor.Quaternion.$ctor4(q.x / mag, q.y / mag, q.z / mag, q.w / mag);
                },
                RotateTowards: function (from, to, maxDegreesDelta) {
                    let angle = MiniGameAdaptor.Quaternion.Angle(from, to);
                    if (angle == 0.0) return to;
                    return MiniGameAdaptor.Quaternion.SlerpUnclamped(from, to, MiniGameAdaptor.Mathf.Min(1.0, maxDegreesDelta / angle));
                },
                Slerp: function (a, b, t) {
                    if (t > 1.0) t = 1.0;
                    if (t < 0.0) t = 0.0;
                    return new MiniGameAdaptor.Quaternion.$ctor2(a.ref.slerp(b.ref, t));
                },
                SlerpUnclamped: function (a, b, t) {
                    return new MiniGameAdaptor.Quaternion.$ctor2(a.ref.slerp(b.ref, t));
                },
                op_Equality: function (lhs, rhs) {
                    return MiniGameAdaptor.Quaternion.__IsEqualUsingDot(MiniGameAdaptor.Quaternion.Dot(lhs, rhs));
                },
                op_Inequality: function (lhs, rhs) {
                    return !MiniGameAdaptor.Quaternion.op_Equality(lhs, rhs);
                },
                op_Multiply: function (lhs, rhs) {
                    return new MiniGameAdaptor.Quaternion.$ctor1(
                        lhs.w * rhs.x + lhs.x * rhs.w + lhs.y * rhs.z - lhs.z * rhs.y,
                        lhs.w * rhs.y + lhs.y * rhs.w + lhs.z * rhs.x - lhs.x * rhs.z,
                        lhs.w * rhs.z + lhs.z * rhs.w + lhs.x * rhs.y - lhs.y * rhs.x,
                        lhs.w * rhs.w - lhs.x * rhs.x - lhs.y * rhs.y - lhs.z * rhs.z
                    );
                },
                op_Multiply$1: function (rotation, point) {
                    let x = rotation.x * 2;
                    let y = rotation.y * 2;
                    let z = rotation.z * 2;
                    let xx = rotation.x * x;
                    let yy = rotation.y * y;
                    let zz = rotation.z * z;
                    let xy = rotation.x * y;
                    let xz = rotation.x * z;
                    let yz = rotation.y * z;
                    let wx = rotation.w * x;
                    let wy = rotation.w * y;
                    let wz = rotation.w * z;

                    let res = new MiniGameAdaptor.Vector3.$ctor2(
                        (1 - (yy + zz)) * point.x + (xy - wz) * point.y + (xz + wy) * point.z,
                        (xy + wz) * point.x + (1 - (xx + zz)) * point.y + (yz - wx) * point.z,
                        (xz - wy) * point.x + (yz + wx) * point.y + (1 - (xx + yy)) * point.z
                    );

                    return res;
                },
                getDefaultValue: function () { return new MiniGameAdaptor.Quaternion(); }
            }
        },
        fields: {
            ref: null
        },
        props: {
            eulerAngles: {
                get: function () {
                    return new MiniGameAdaptor.Vector3.$ctor4(this.ref.toEulerAngles())._FlipX()._Rad2Deg();
                },
                set: function (value) {
                    this.ref = engine.Quaternion.fromEulerAngles(value._Deg2Rad()._FlipX().ref);
                }
            },
            normalized: {
                get: function () {
                    return MiniGameAdaptor.Quaternion.Normalize(this);
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
            $ctor1: function (x, y, z, w) {
                this.$initialize();
                this.ref = new engine.Quaternion();
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
                this.Normalize();
            },
            $ctor2: function(ref) {
                this.$initialize();
                this.ref = ref;
            },
            $ctor3: function (ref) {
                this.$initialize();
                this.ref = new engine.Quaternion();
                this.x = ref.x;
                this.y = ref.y;
                this.z = ref.z;
                this.w = ref.w;
            },
            // same as $ctor1
            // just for Normalize
            $ctor4: function (x, y, z, w) {
                this.$initialize();
                this.ref = new engine.Quaternion();
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            },
            ctor: function () {
                this.$initialize();
                this.ref = new engine.Quaternion();
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
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Quaternion index!");
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
                        throw new System.IndexOutOfRangeException.$ctor1("Invalid Quaternion index!");
                }
            },
            equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Quaternion))) {
                    return false;
                }

                return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Quaternion));
            },
            equalsT: function (other) {
                return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
            },
            Equals: function (other) {
                if (!(Bridge.is(other, MiniGameAdaptor.Quaternion))) {
                    return false;
                }

                return this.equalsT(other);
            },
            System$IEquatable$1$MiniGameAdaptor$Quaternion$equalsT: function (other) {
                throw new System.Exception("Exception");
            },
            getHashCode: function () {
                return System.Single.getHashCode(this.x) ^ (System.Single.getHashCode(this.y) << 2) ^ (System.Single.getHashCode(this.z) >> 2) ^ (System.Single.getHashCode(this.w) >> 2);
            },
            Normalize: function () {
                MiniGameAdaptor.Quaternion.Normalize(this).$clone(this);
            },
            Set: function (newX, newY, newZ, newW) {
                this.x = newX;
                this.y = newY;
                this.z = newZ;
                this.w = newW;
            },
            SetFromToRotation: function (fromDirection, toDirection) {
                MiniGameAdaptor.Quaternion.FromToRotation(fromDirection, toDirection).$clone(this);
            },
            SetLookRotation: function (view) {
                MiniGameAdaptor.Quaternion.SetLookRotation$1(view, MiniGameAdaptor.Vector3.up);
            },
            SetLookRotation$1: function (view, up) {
                MiniGameAdaptor.Quaternion.LookRotation(view, up).$clone(this);
            },
            // 这里的参数是 out 别名，不应该直接 *= 或者 =。@eugenejiang see see?
            // Reply: 确实如此 = =!! fixed
            ToAngleAxis: function (angle, axis) {
                this.__ToAxisAngleRad(axis, angle);
                angle.v *= MiniGameAdaptor.Mathf.Rad2Deg;
                // return angle;
            },
            __ToAxisAngleRad(axis, angle) {
                let q = this;
                if (Math.abs(q.w) > 1.0) {
                    q.Normalize();
                }
                angle.v = 2.0 * Math.acos(q.w);
                let d = Math.sqrt(1.0 - q.w * q.w);
                if (d > 0.0001) {
                    axis.v = MiniGameAdaptor.Vector3.op_Division(new MiniGameAdaptor.Vector3.$ctor2(q.x, q.y, q.z), d);
                } else {
                    axis.v = new MiniGameAdaptor.Vector3.$ctor2(1, 0, 0);
                }
            },
            toString: function () {
                return System.String.format("({0:F1}, {1:F1}, {2:F1}, {3:F1})", this.x, this.y, this.z, this.w);
            },
            ToString: function (format) {
                return "(" + this.x.toFixed(format) + ", " + this.y.toFixed(format) + ", " + this.z.toFixed(format) + ", " + this.w.toFixed(format) + ")";
            },
            $clone: function (to) {
                var s = to || new MiniGameAdaptor.Quaternion();
                s.x = this.x;
                s.y = this.y;
                s.z = this.z;
                s.w = this.w;
                return s;
            },
            _FlipXnW() {
                this.x *= -1;
                this.w *= -1;
                return this;
            },
            _FlipX() {
                this.x *= -1;
                return this;
            }
        }
    });
});

engine.decorators.serialize('MiniGameAdaptor.Quaternion')(MiniGameAdaptor.Quaternion);
Object.defineProperty(MiniGameAdaptor.Quaternion.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Quaternion.prototype.__properties }
})
