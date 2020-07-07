function ToInvariantString(formate, val) {
    return value.toFixed(format)
}
Bridge.define("MiniGameAdaptor.Matrix4x4", {
    inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Matrix4x4)]; },
    $kind: "struct",
    statics: {
        props: {
            identity: {
                get: function () {
                    return identityMatrix;
                }
            },
            zero: {
                get: function () {
                    return zeroMatrix;
                }
            }
        },
        methods: {
            Deserialize: function(data, comp) { 
                comp.m00 = data[0];
                comp.m01 = data[1];
                comp.m02 = data[2];
                comp.m03 = data[3];
                comp.m10 = data[4];
                comp.m11 = data[5];
                comp.m12 = data[6];
                comp.m13 = data[7];
                comp.m20 = data[8];
                comp.m21 = data[9];
                comp.m22 = data[10];
                comp.m23 = data[11];
                comp.m30 = data[12];
                comp.m31 = data[13];
                comp.m32 = data[14];
                comp.m33 = data[15];
                return comp;
            },
            Determinant: function (m) {
                return m.determinant;
            },

            // TODO
            Frustum: function (left, right, bottom, top, zNear, zFar) {
                throw new System.Exception("not impl");
            },

            Frustum$1: function (fp) {
                throw new System.Exception("not impl");
            },

            Inverse: function (m) {
                return m.inverse;
            },

            LookAt: function (from, to, up) {
                let m = engine.Matrix4.lookAt(from, to, up);

                return new MiniGameAdaptor.Matrix4x4.$ctor2(m._raw);
            },

            Ortho: function (left, right, bottom, top, zNear, zFar) {
                let m = engine.Matrix4.orthographic(left, right, bottom, top, zNear, zFar);

                return new MiniGameAdaptor.Matrix4x4.$ctor2(m._raw);
            },

            Perspective: function (fov, aspect, zNear, zFar) {
                let m = engine.Matrix4.perspective(fov, aspect, zNear, zFar);

                return new MiniGameAdaptor.Matrix4x4.$ctor2(m._raw);
            },

            Rotate: function (q) {
                let x = q.x * 2.0;
                let y = q.y * 2.0;
                let z = q.z * 2.0;
                let xx = q.x * x;
                let yy = q.y * y;
                let zz = q.z * z;
                let xy = q.x * y;
                let xz = q.x * z;
                let yz = q.y * z;
                let wx = q.w * x;
                let wy = q.w * y;
                let wz = q.w * z;

                // Calculate 3x3 matrix from orthonormal basis
                let m = new MiniGameAdaptor.Matrix4x4();

                m.m00 = 1.0 - (yy + zz); m.m10 = xy + wz; m.m20 = xz - wy; m.m30 = 0.0;
                m.m01 = xy - wz; m.m11 = 1.0 - (xx + zz); m.m21 = yz + wx; m.m31 = 0.0;
                m.m02 = xz + wy; m.m12 = yz - wx; m.m22 = 1.0 - (xx + yy); m.m32 = 0.0;
                m.m03 = 0.0; m.m13 = 0.0; m.m23 = 0.0; m.m33 = 1.0;

                return m;
            },

            Scale: function (vector) {
                let m = new MiniGameAdaptor.Matrix4x4();

                m.m00 = vector.x; m.m01 = 0; m.m02 = 0; m.m03 = 0;
                m.m10 = 0; m.m11 = vector.y; m.m12 = 0; m.m13 = 0;
                m.m20 = 0; m.m21 = 0; m.m22 = vector.z; m.m23 = 0;
                m.m30 = 0; m.m31 = 0; m.m32 = 0; m.m33 = 1;

                return m;
            },

            Translate: function (vector) {
                let m = new MiniGameAdaptor.Matrix4x4();

                m.m00 = 1; m.m01 = 0; m.m02 = 0; m.m03 = vector.x;
                m.m10 = 0; m.m11 = 1; m.m12 = 0; m.m13 = vector.y;
                m.m20 = 0; m.m21 = 0; m.m22 = 1; m.m23 = vector.z;
                m.m30 = 0; m.m31 = 0; m.m32 = 0; m.m33 = 1;

                return m;
            },

            Transpose: function (m) {
                return new this.transpose;
            },

            TRS: function (pos, q, s) {
                let res = new MiniGameAdaptor.Matrix4x4();

                let scaleX = scale.x;
                let scaleY = scale.y;
                let scaleZ = scale.z;

                let x2 = rotation.x * rotation.x;
                let xy = rotation.x * rotation.y;
                let xz = rotation.x * rotation.z;
                let xw = rotation.x * rotation.w;
                let y2 = rotation.y * rotation.y;
                let yz = rotation.y * rotation.z;
                let yw = rotation.y * rotation.w;
                let z2 = rotation.z * rotation.z;
                let zw = rotation.z * rotation.w;
                let w2 = rotation.w * rotation.w;

                let m00 = x2 - y2 - z2 + w2;
                let m01 = 2.0 * (xy - zw);
                let m02 = 2.0 * (xz + yw);

                let m10 = 2.0 * (xy + zw);
                let m11 = -x2 + y2 - z2 + w2;
                let m12 = 2.0 * (yz - xw);

                let m20 = 2.0 * (xz - yw);
                let m21 = 2.0 * (yz + xw);
                let m22 = -x2 - y2 + z2 + w2;

                res.setItem(0, m00 * scaleX);
                res.setItem(1, m10 * scaleX);
                res.setItem(2, m20 * scaleX);
                res.setItem(3, 0.0);
                res.setItem(4, m01 * scaleY);
                res.setItem(5,m11 * scaleY);
                res.setItem(6, m21 * scaleY0);
                res.setItem(7, 0.0);
                res.setItem(8, m02 * scaleZ);
                res.setItem(9, m12 * scaleZ);
                res.setItem(10, m22 * scaleZ);
                res.setItem(11, 0.0);
                res.setItem(12, translation.x);
                res.setItem(13, translation.y);
                res.setItem(14, translation.z);
                res.setItem(15, 1.0);

                return res;
            },

            op_Equality: function (lhs, rhs) {
                return lhs.equals(rhs);
            },

            op_Inequality: function (lhs, rhs) {
                return !lhs.equals(rhs);
            },

            op_Multiply: function (lhs, rhs) {
                let res = new MiniGameAdaptor.Matrix4x4();

                res.m00 = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10 + lhs.m02 * rhs.m20 + lhs.m03 * rhs.m30;
                res.m01 = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11 + lhs.m02 * rhs.m21 + lhs.m03 * rhs.m31;
                res.m02 = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02 * rhs.m22 + lhs.m03 * rhs.m32;
                res.m03 = lhs.m00 * rhs.m03 + lhs.m01 * rhs.m13 + lhs.m02 * rhs.m23 + lhs.m03 * rhs.m33;

                res.m10 = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10 + lhs.m12 * rhs.m20 + lhs.m13 * rhs.m30;
                res.m11 = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11 + lhs.m12 * rhs.m21 + lhs.m13 * rhs.m31;
                res.m12 = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12 * rhs.m22 + lhs.m13 * rhs.m32;
                res.m13 = lhs.m10 * rhs.m03 + lhs.m11 * rhs.m13 + lhs.m12 * rhs.m23 + lhs.m13 * rhs.m33;

                res.m20 = lhs.m20 * rhs.m00 + lhs.m21 * rhs.m10 + lhs.m22 * rhs.m20 + lhs.m23 * rhs.m30;
                res.m21 = lhs.m20 * rhs.m01 + lhs.m21 * rhs.m11 + lhs.m22 * rhs.m21 + lhs.m23 * rhs.m31;
                res.m22 = lhs.m20 * rhs.m02 + lhs.m21 * rhs.m12 + lhs.m22 * rhs.m22 + lhs.m23 * rhs.m32;
                res.m23 = lhs.m20 * rhs.m03 + lhs.m21 * rhs.m13 + lhs.m22 * rhs.m23 + lhs.m23 * rhs.m33;

                res.m30 = lhs.m30 * rhs.m00 + lhs.m31 * rhs.m10 + lhs.m32 * rhs.m20 + lhs.m33 * rhs.m30;
                res.m31 = lhs.m30 * rhs.m01 + lhs.m31 * rhs.m11 + lhs.m32 * rhs.m21 + lhs.m33 * rhs.m31;
                res.m32 = lhs.m30 * rhs.m02 + lhs.m31 * rhs.m12 + lhs.m32 * rhs.m22 + lhs.m33 * rhs.m32;
                res.m33 = lhs.m30 * rhs.m03 + lhs.m31 * rhs.m13 + lhs.m32 * rhs.m23 + lhs.m33 * rhs.m33;

                return res;
            },

            op_Multiply$1: function (lhs, vector) {
                let res = new MiniGameAdaptor.Vector4();

                res.x = lhs.m00 * vector.x + lhs.m01 * vector.y + lhs.m02 * vector.z + lhs.m03 * vector.w;
                res.y = lhs.m10 * vector.x + lhs.m11 * vector.y + lhs.m12 * vector.z + lhs.m13 * vector.w;
                res.z = lhs.m20 * vector.x + lhs.m21 * vector.y + lhs.m22 * vector.z + lhs.m23 * vector.w;
                res.w = lhs.m30 * vector.x + lhs.m31 * vector.y + lhs.m32 * vector.z + lhs.m33 * vector.w;

                return res;
            },

            getDefaultValue: function () { return new MiniGameAdaptor.Matrix4x4(); }
        }
    },

    fields: {
        ref: null
    },

    props: {
        m00: {
            get: function() {
                return this.ref._raw[0];
            },

            set: function(value) {
                this.ref._raw[0] = value;
            }
        },

        m10: {
            get: function() {
                return this.ref._raw[1];
            },

            set: function(value) {
                this.ref._raw[0] = value;
            }
        },
        m20: {
            get: function() {
                return this.ref._raw[2];
            },

            set: function(value) {
                this.ref._raw[2] = value;
            }
        },

        m30: {
            get: function() {
                return this.ref._raw[3];
            },

            set: function(value) {
                this.ref._raw[3] = value;
            }
        },
        m01: {
            get: function() {
                return this.ref._raw[4];
            },

            set: function(value) {
                this.ref._raw[4] = value;
            }
        },
        m11: {
            get: function() {
                return this.ref._raw[5];
            },

            set: function(value) {
                this.ref._raw[5] = value;
            }
        },
        m21: {
            get: function() {
                return this.ref._raw[6];
            },

            set: function(value) {
                this.ref._raw[6] = value;
            }
        },
        m31: {
            get: function() {
                return this.ref._raw[7];
            },

            set: function(value) {
                this.ref._raw[7] = value;
            }
        },
        m02: {
            get: function() {
                return this.ref._raw[8];
            },

            set: function(value) {
                this.ref._raw[8] = value;
            }
        },
        m12: {
            get: function() {
                return this.ref._raw[9];
            },

            set: function(value) {
                this.ref._raw[9] = value;
            }
        },
        m22: {
            get: function() {
                return this.ref._raw[10];
            },

            set: function(value) {
                this.ref._raw[10] = value;
            }
        },
        m32: {
            get: function() {
                return this.ref._raw[11];
            },

            set: function(value) {
                this.ref._raw[11] = value;
            }
        },
        m03: {
            get: function() {
                return this.ref._raw[12];
            },

            set: function(value) {
                this.ref._raw[12] = value;
            }
        },
        m13: {
            get: function() {
                return this.ref._raw[13];
            },

            set: function(value) {
                this.ref._raw[13] = value;
            }
        },
        m23: {
            get: function() {
                return this.ref._raw[14];
            },

            set: function(value) {
                this.ref._raw[14] = value;
            }
        },
        m33: {
            get: function() {
                return this.ref._raw[15];
            },

            set: function(value) {
                this.ref._raw[15] = value;
            }
        },
        decomposeProjection: {
            get: function () {
                throw new System.Exception("not impl");
            }
        },
        determinant: {
            get: function () {
                let te = this.ref._raw;

                let n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
                let n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
                let n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
                let n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

                return (
                    n41 * (
                        + n14 * n23 * n32
                        - n13 * n24 * n32
                        - n14 * n22 * n33
                        + n12 * n24 * n33
                        + n13 * n22 * n34
                        - n12 * n23 * n34
                    ) +
                    n42 * (
                        + n11 * n23 * n34
                        - n11 * n24 * n33
                        + n14 * n21 * n33
                        - n13 * n21 * n34
                        + n13 * n24 * n31
                        - n14 * n23 * n31
                    ) +
                    n43 * (
                        + n11 * n24 * n32
                        - n11 * n22 * n34
                        - n14 * n21 * n32
                        + n12 * n21 * n34
                        + n14 * n22 * n31
                        - n12 * n24 * n31
                    ) +
                    n44 * (
                        - n13 * n22 * n31
                        - n11 * n23 * n32
                        + n11 * n22 * n33
                        + n13 * n21 * n32
                        - n12 * n21 * n33
                        + n12 * n23 * n31
                    )
		        );
            }
        },

        inverse: {
            get: function () {
                let m = this.ref.inverse();

                return new MiniGameAdaptor.Matrix4x4.$ctor3(m);
            }
        },

        isIdentity: {
            get: function () {
                return this.equals(identityMatrix);
            }
        },

        // TODO
        lossyScale: {
            get: function () {
                throw new System.Exception("not impl");
            }
        },

        rotation: {
            get: function () {
                throw new System.Exception("not impl");
            }
        },

        transpose: {
            get: function () {
                let te = this.ref._raw.slice();
                let tmp;

                tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
                tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
                tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

                tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
                tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
                tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

                return new MiniGameAdaptor.Matrix4x4.$ctor2(te);
            }
        }
    },
    ctors: {
        $ctor1: function (column0, column1, column2, column3) {
            this.$initialize();
            this.ref = new engine.Matrix4();

            this.m00 = column0.x; this.m01 = column1.x; this.m02 = column2.x; this.m03 = column3.x;
            this.m10 = column0.y; this.m11 = column1.y; this.m12 = column2.y; this.m13 = column3.y;
            this.m20 = column0.z; this.m21 = column1.z; this.m22 = column2.z; this.m23 = column3.z;
            this.m30 = column0.w; this.m31 = column1.w; this.m32 = column2.w; this.m33 = column3.w;
        },

        $ctor2: function (array) {
            this.$initialize();
            this.ref = new engine.Matrix4();

            this.m00 = array[0]; this.m01  = array[4]; this.m02  = array[8]; this.m03  = array[12];
            this.m10 = array[1]; this.m11  = array[5]; this.m12  = array[9]; this.m13  = array[13];
            this.m20 = array[2]; this.m21  = array[6]; this.m22  = array[10]; this.m23 = array[14];
            this.m30 = array[3]; this.m31  = array[7]; this.m32  = array[11]; this.m33 = array[15];
        },
        $ctor3: function(ref) {
            this.$initialize();
            this.ref = ref;
        },
        ctor: function () {
            this.$initialize();
            this.ref = new engine.Matrix4();

            this.m00 = 0; this.m01 = 0; this.m02 = 0; this.m03 = 0;
            this.m10 = 0; this.m11 = 0; this.m12 = 0; this.m13 = 0;
            this.m20 = 0; this.m21 = 0; this.m22 = 0; this.m23 = 0;
            this.m30 = 0; this.m31 = 0; this.m32 = 0; this.m33 = 0;
        }
    },
    methods: {
        getItem: function (index) {
            return this.ref._raw[index];
        },

        setItem: function (index, value) {
            switch (index) {
                case 0: this.m00 = value; break;
                case 1: this.m10 = value; break;
                case 2: this.m20 = value; break;
                case 3: this.m30 = value; break;
                case 4: this.m01 = value; break;
                case 5: this.m11 = value; break;
                case 6: this.m21 = value; break;
                case 7: this.m31 = value; break;
                case 8: this.m02 = value; break;
                case 9: this.m12 = value; break;
                case 10: this.m22 = value; break;
                case 11: this.m32 = value; break;
                case 12: this.m03 = value; break;
                case 13: this.m13 = value; break;
                case 14: this.m23 = value; break;
                case 15: this.m33 = value; break;
                default:
                    throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix index!");
            }
        },

        getItem$1: function (row, column) {
            if ( row < 0 || row > 3 )
                throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix row");

            if ( column < 0 || column > 3 )
                throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix column");

            return this[`m${column}${row}`];
        },

        setItem$1: function (row, column, value) {
            if ( row < 0 || row > 3 )
                throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix row");

            if ( column < 0 || column > 3 )
                throw new System.IndexOutOfRangeException.$ctor1("Invalid matrix column");

            this[`m${column}${row}`] = value;
        },

        equals: function (other) {
            return this.Equals(other);
        },

        Equals: function (other) {
            let te = this.ref._raw;
            let me = other.ref._raw;

            for ( let i = 0; i < 16; i ++ ) {

                if ( te[ i ] !== me[ i ] ){
                    return false;
                }

            }

            return true;
        },

        System$IEquatable$1$MiniGameAdaptor$Matrix4x4$equalsT: function (other) {
            throw new System.Exception("Exception");
        },

        GetColumn: function (index) {
             switch (index) {
                case 0: return new MiniGameAdaptor.Vector4(this.m00, this.m10, this.m20, this.m30);
                case 1: return new MiniGameAdaptor.Vector4(this.m01, this.m11, this.m21, this.m31);
                case 2: return new MiniGameAdaptor.Vector4(this.m02, this.m12, this.m22, this.m32);
                case 3: return new MiniGameAdaptor.Vector4(this.m03, this.m13, this.m23, this.m33);
                default:
                    throw new System.IndexOutOfRangeException.$ctor1("Invalid column index!");
            }
        },

        getHashCode: function () {
            return this.GetColumn(0).GetHashCode() ^ (this.GetColumn(1).GetHashCode() << 2) ^ (this.GetColumn(2).GetHashCode() >> 2) ^ (this.GetColumn(3).GetHashCode() >> 1);
        },

        GetRow: function (index) {
             switch (index) {
                case 0:
                    return new Vector4(this.m00, this.m01, this.m02, this.m03);
                case 1:
                    return new Vector4(this.m10, this.m11, this.m12, this.m13);
                case 2:
                    return new Vector4(this.m20, this.m21, this.m22, this.m23);
                case 3:
                    return new Vector4(this.m30, this.m31, this.m32, this.m33);
                default:
                    throw new System.IndexOutOfRangeException.$ctor1("Invalid row index!");
            }
        },

        MultiplyPoint: function (point) {
            let res = new MiniGameAdaptor.Vector3();
            let w;
            res.x = this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03;
            res.y = this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13;
            res.z = this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23;

            w = this.m30 * point.x + this.m31 * point.y + this.m32 * point.z + this.m33;
            // divide by 0
            if (w !== 0) {
                w = 1 / w;
            }
            res.x *= w;
            res.y *= w;
            res.z *= w;

            return res;
        },

        MultiplyPoint3x4: function (point) {
            let res = new MiniGameAdaptor.Vector3();

            res.x = this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03;
            res.y = this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13;
            res.z = this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23;

            return res;
        },

        MultiplyVector: function (vector) {
            let res = new MiniGameAdaptor.Vector3();

            res.x = this.m00 * vector.x + this.m01 * vector.y + this.m02 * vector.z;
            res.y = this.m10 * vector.x + this.m11 * vector.y + this.m12 * vector.z;
            res.z = this.m20 * vector.x + this.m21 * vector.y + this.m22 * vector.z;
            return res;
        },

        SetColumn: function (index, column) {
             switch (index) {
                case 0:
                     this.setItem(0, column.x);
                     this.setItem(4, column.y);
                     this.setItem(8, column.z);
                     this.setItem(12, column.w);
                     break;
                case 1:
                     this.setItem(1, column.x);
                     this.setItem(5, column.y);
                     this.setItem(9, column.z);
                     this.setItem(13, column.w);
                     break;

                case 2:
                     this.setItem(2, column.x);
                     this.setItem(6, column.y);
                     this.setItem(10, column.z);
                     this.setItem(14, column.w);
                     break;

                case 3:
                     this.setItem(3, column.x);
                     this.setItem(7, column.y);
                     this.setItem(11, column.z);
                     this.setItem(15, column.w);
                     break;

                default:
                    throw new System.IndexOutOfRangeException.$ctor1("Invalid column index!");
            }
        },

        SetRow: function (index, row) {
             switch (index) {
                case 0:
                     this.setItem(0, row.x);
                     this.setItem(1, row.y);
                     this.setItem(2, row.z);
                     this.setItem(3, row.w);
                     break;
                case 1:
                     this.setItem(4, row.x);
                     this.setItem(5, row.y);
                     this.setItem(6, row.z);
                     this.setItem(7, row.w);
                     break;

                case 2:
                     this.setItem(8, row.x);
                     this.setItem(9, row.y);
                     this.setItem(10, row.z);
                     this.setItem(11, row.w);
                     break;

                case 3:
                     this.setItem(12, row.x);
                     this.setItem(13, row.y);
                     this.setItem(14, row.z);
                     this.setItem(15, row.w);
                     break;

                default:
                    throw new System.IndexOutOfRangeException.$ctor1("Invalid row index!");
            }
        },

        SetTRS: function (translation, rotation, scale) {
            let scaleX = scale.x;
            let scaleY = scale.y;
            let scaleZ = scale.z;

            let x2 = rotation.x * rotation.x;
            let xy = rotation.x * rotation.y;
            let xz = rotation.x * rotation.z;
            let xw = rotation.x * rotation.w;
            let y2 = rotation.y * rotation.y;
            let yz = rotation.y * rotation.z;
            let yw = rotation.y * rotation.w;
            let z2 = rotation.z * rotation.z;
            let zw = rotation.z * rotation.w;
            let w2 = rotation.w * rotation.w;

            let m00 = x2 - y2 - z2 + w2;
            let m01 = 2.0 * (xy - zw);
            let m02 = 2.0 * (xz + yw);

            let m10 = 2.0 * (xy + zw);
            let m11 = -x2 + y2 - z2 + w2;
            let m12 = 2.0 * (yz - xw);

            let m20 = 2.0 * (xz - yw);
            let m21 = 2.0 * (yz + xw);
            let m22 = -x2 - y2 + z2 + w2;

            this.setItem(0, m00 * scaleX);
            this.setItem(1, m10 * scaleX);
            this.setItem(2, m20 * scaleX);
            this.setItem(3, 0.0);
            this.setItem(4, m01 * scaleY);
            this.setItem(5,m11 * scaleY);
            this.setItem(6, m21 * scaleY0);
            this.setItem(7, 0.0);
            this.setItem(8, m02 * scaleZ);
            this.setItem(9, m12 * scaleZ);
            this.setItem(10, m22 * scaleZ);
            this.setItem(11, 0.0);
            this.setItem(12, translation.x);
            this.setItem(13, translation.y);
            this.setItem(14, translation.z);
            this.setItem(15, 1.0);
        },

        toString: function () {
            return System.String.format(
                "{0:F5}\t{1:F5}\t{2:F5}\t{3:F5}\n{4:F5}\t{5:F5}\t{6:F5}\t{7:F5}\n{8:F5}\t{9:F5}\t{10:F5}\t{11:F5}\n{12:F5}\t{13:F5}\t{14:F5}\t{15:F5}\n",
                this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33
            );
        },

        ToString: function (format) {
            return System.String.format("{0}\t{1}\t{2}\t{3}\n{4}\t{5}\t{6}\t{7}\n{8}\t{9}\t{10}\t{11}\n{12}\t{13}\t{14}\t{15}\n",
                ToInvariantString(format, this.m00), ToInvariantString(format, this.m01), ToInvariantString(format, this.m02), ToInvariantString(format, this.m03),
                ToInvariantString(format, this.m10), ToInvariantString(format, this.m11), ToInvariantString(format, this.m12), ToInvariantString(format, this.m13),
                ToInvariantString(format, this.m20), ToInvariantString(format, this.m21), ToInvariantString(format, this.m22), ToInvariantString(format, this.m23),
                ToInvariantString(format, this.m30), ToInvariantString(format, this.m31), ToInvariantString(format, this.m32), ToInvariantString(format, this.m33));
        },

        TransformPlane: function (plane) {
            var ittrans = this.inverse;

            let x = plane.normal.x, y = plane.normal.y, z = plane.normal.z, w = plane.distance;

            // note: a transpose is part of this transformation
            var a = ittrans.m00 * x + ittrans.m10 * y + ittrans.m20 * z + ittrans.m30 * w;
            var b = ittrans.m01 * x + ittrans.m11 * y + ittrans.m21 * z + ittrans.m31 * w;
            var c = ittrans.m02 * x + ittrans.m12 * y + ittrans.m22 * z + ittrans.m32 * w;
            var d = ittrans.m03 * x + ittrans.m13 * y + ittrans.m23 * z + ittrans.m33 * w;

            return new MiniGameAdaptor.Plane(new MiniGameAdaptor.Vector3(a, b, c), d);
        },

        ValidTRS: function () {
            throw new System.Exception("not impl");
        },

        $clone: function (to) {
            let s = to || new MiniGameAdaptor.Matrix4x4();

            s.m00 = this.m00;
            s.m10 = this.m10;
            s.m20 = this.m20;
            s.m30 = this.m30;
            s.m01 = this.m01;
            s.m11 = this.m11;
            s.m21 = this.m21;
            s.m31 = this.m31;
            s.m02 = this.m02;
            s.m12 = this.m12;
            s.m22 = this.m22;
            s.m32 = this.m32;
            s.m03 = this.m03;
            s.m13 = this.m13;
            s.m23 = this.m23;
            s.m33 = this.m33;
            return s;
        }
    }
});

const identityMatrix = new MiniGameAdaptor.Matrix4x4.$ctor1(
    new MiniGameAdaptor.Vector4.$ctor3(1,0,0,0),
    new MiniGameAdaptor.Vector4.$ctor3(0,1,0,0),
    new MiniGameAdaptor.Vector4.$ctor3(0,0,1,0),
    new MiniGameAdaptor.Vector4.$ctor3(0,0,0,1),
);

const zeroMatrix = new MiniGameAdaptor.Matrix4x4.$ctor1(
    new MiniGameAdaptor.Vector4.$ctor3(0,0,0,0),
    new MiniGameAdaptor.Vector4.$ctor3(0,0,0,0),
    new MiniGameAdaptor.Vector4.$ctor3(0,0,0,0),
    new MiniGameAdaptor.Vector4.$ctor3(0,0,0,0),
);

engine.decorators.serialize('MiniGameAdaptor.Matrix4x4')(MiniGameAdaptor.Matrix4x4);
Object.defineProperty(MiniGameAdaptor.Matrix4x4.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Matrix4x4.prototype.__properties }
})