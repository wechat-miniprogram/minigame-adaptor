Bridge.define("MiniGameAdaptor.Color", {
    inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Color)]; },
    $kind: "struct",
    statics: {
        props: {
            red: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(1.0, 0.0, 0.0, 1.0);
                }
            },
            green: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(0.0, 1.0, 0.0, 1.0);
                }
            },
            blue: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(0.0, 0.0, 1.0, 1.0);
                }
            },
            white: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(1.0, 1.0, 1.0, 1.0);
                }
            },
            black: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(0.0, 0.0, 0.0, 1.0);
                }
            },
            yellow: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(1.0, 0.921568632, 0.0156862754, 1.0);
                }
            },
            cyan: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(0.0, 1.0, 1.0, 1.0);
                }
            },
            magenta: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(1.0, 0.0, 1.0, 1.0);
                }
            },
            gray: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(0.5, 0.5, 0.5, 1.0);
                }
            },
            grey: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(0.5, 0.5, 0.5, 1.0);
                }
            },
            clear: {
                get: function () {
                    return new MiniGameAdaptor.Color.$ctor2(0.0, 0.0, 0.0, 0.0);
                }
            }
        },
        methods: {
            Deserialize: function(data, comp) { 
                comp.r = data[0];
                comp.g = data[1];
                comp.b = data[2];
                comp.a = data[3];
                return comp;
            },
            Lerp: function (a, b, t) {
                t = MiniGameAdaptor.Mathf.Clamp01(t);
                return new MiniGameAdaptor.Color.$ctor2(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t, a.a + (b.a - a.a) * t);
            },
            LerpUnclamped: function (a, b, t) {
                return new MiniGameAdaptor.Color.$ctor2(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t, a.a + (b.a - a.a) * t);
            },
            RGBToHSV: function (rgbColor, H, S, V) {
                if ((rgbColor.b > rgbColor.g) && (rgbColor.b > rgbColor.r)) {
                    MiniGameAdaptor.Color.RGBToHSVHelper(4.0, rgbColor.b, rgbColor.r, rgbColor.g, H, S, V);
                } else {
                    if (rgbColor.g > rgbColor.r) {
                        MiniGameAdaptor.Color.RGBToHSVHelper(2.0, rgbColor.g, rgbColor.b, rgbColor.r, H, S, V);
                    } else {
                        MiniGameAdaptor.Color.RGBToHSVHelper(0.0, rgbColor.r, rgbColor.g, rgbColor.b, H, S, V);
                    }
                }
            },
            RGBToHSVHelper: function (offset, dominantcolor, colorone, colortwo, H, S, V) {
                V.v = dominantcolor;
                if (V.v !== 0) {
                    let small = 0;
                    if (colorone > colortwo) {
                        small = colortwo;
                    } else {
                        small = colorone;
                    }

                    let diff = V.v - small;

                    if (diff !== 0) {
                        S.v = diff / V.v;
                        H.v = offset + ((colorone - colortwo) / diff);
                    } else {
                        S.v = 0;
                        H.v = offset + (colorone - colortwo);
                    }

                    H.v /= 6;

                    if (H.v < 0) {
                        H.v += 1.0;
                    }
                } else {
                    S.v = 0;
                    H.v = 0;
                }
            },
            HSVToRGB: function (H, S, V) {
                return MiniGameAdaptor.Color.HSVToRGB$1(H, S, V, true);
            },
            HSVToRGB$1: function (H, S, V, hdr) {
                let retval = MiniGameAdaptor.Color.white.$clone();
                if (S === 0) {
                    retval.r = V;
                    retval.g = V;
                    retval.b = V;
                } else if (V === 0) {
                    retval.r = 0;
                    retval.g = 0;
                    retval.b = 0;
                } else {
                    retval.r = 0;
                    retval.g = 0;
                    retval.b = 0;

                    let t_S, t_V, h_to_floor;

                    t_S = S;
                    t_V = V;
                    h_to_floor = H * 6.0;

                    let temp = Bridge.Int.clip32(MiniGameAdaptor.Mathf.Floor(h_to_floor));
                    let t = h_to_floor - temp;
                    let let_1 = (t_V) * (1 - t_S);
                    let let_2 = t_V * (1 - t_S * t);
                    let let_3 = t_V * (1 - t_S * (1 - t));

                    switch (temp) {
                        case 0: 
                            retval.r = t_V;
                            retval.g = let_3;
                            retval.b = let_1;
                            break;
                        case 1: 
                            retval.r = let_2;
                            retval.g = t_V;
                            retval.b = let_1;
                            break;
                        case 2: 
                            retval.r = let_1;
                            retval.g = t_V;
                            retval.b = let_3;
                            break;
                        case 3: 
                            retval.r = let_1;
                            retval.g = let_2;
                            retval.b = t_V;
                            break;
                        case 4: 
                            retval.r = let_3;
                            retval.g = let_1;
                            retval.b = t_V;
                            break;
                        case 5: 
                            retval.r = t_V;
                            retval.g = let_1;
                            retval.b = let_2;
                            break;
                        case 6: 
                            retval.r = t_V;
                            retval.g = let_3;
                            retval.b = let_1;
                            break;
                        case -1: 
                            retval.r = t_V;
                            retval.g = let_1;
                            retval.b = let_2;
                            break;
                    }

                    if (!hdr) {
                        retval.r = MiniGameAdaptor.Mathf.Clamp$1(retval.r, 0.0, 1.0);
                        retval.g = MiniGameAdaptor.Mathf.Clamp$1(retval.g, 0.0, 1.0);
                        retval.b = MiniGameAdaptor.Mathf.Clamp$1(retval.b, 0.0, 1.0);
                    }
                }
                return retval.$clone();
            },
            op_Addition: function (a, b) {
                return new MiniGameAdaptor.Color.$ctor2(a.r + b.r, a.g + b.g, a.b + b.b, a.a + b.a);
            },
            op_Subtraction: function (a, b) {
                return new MiniGameAdaptor.Color.$ctor2(a.r - b.r, a.g - b.g, a.b - b.b, a.a - b.a);
            },
            op_Multiply: function (a, b) {
                return new MiniGameAdaptor.Color.$ctor2(a.r * b.r, a.g * b.g, a.b * b.b, a.a * b.a);
            },
            op_Multiply$1: function (a, b) {
                return new MiniGameAdaptor.Color.$ctor2(a.r * b, a.g * b, a.b * b, a.a * b);
            },
            op_Multiply$2: function (b, a) {
                return new MiniGameAdaptor.Color.$ctor2(a.r * b, a.g * b, a.b * b, a.a * b);
            },
            op_Division: function (a, b) {
                return new MiniGameAdaptor.Color.$ctor2(a.r / b, a.g / b, a.b / b, a.a / b);
            },
            op_Equality: function (lhs, rhs) {
                return MiniGameAdaptor.Vector4.op_Equality(MiniGameAdaptor.Color.op_Implicit$1(lhs), MiniGameAdaptor.Color.op_Implicit$1(rhs));
            },
            op_Inequality: function (lhs, rhs) {
                return !(MiniGameAdaptor.Color.op_Equality(lhs.$clone(), rhs.$clone()));
            },
            op_Implicit$1: function (c) {
                return new MiniGameAdaptor.Vector4.$ctor3(c.r, c.g, c.b, c.a);
            },
            op_Implicit: function (v) {
                return new MiniGameAdaptor.Color.$ctor2(v.x, v.y, v.z, v.w);
            },
            getDefaultValue: function () { return new MiniGameAdaptor.Color(); }
        }
    },
    fields: {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    },
    props: {
        grayscale: {
            get: function () {
                return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
            }
        },
        maxColorComponent: {
            get: function () {
                return MiniGameAdaptor.Mathf.Max$2(MiniGameAdaptor.Mathf.Max$2(this.r, this.g), this.b);
            }
        },
        linear: {
            get: function () {
                return new MiniGameAdaptor.Color.$ctor2(MiniGameAdaptor.Mathf.GammaToLinearSpace(r), MiniGameAdaptor.Mathf.GammaToLinearSpace(g), MiniGameAdaptor.Mathf.GammaToLinearSpace(b), a);
            }
        },
        gamma: {
            get: function () {
                return new MiniGameAdaptor.Color.$ctor2(MiniGameAdaptor.Mathf.LinearToGammaSpace(r), MiniGameAdaptor.Mathf.LinearToGammaSpace(g), MiniGameAdaptor.Mathf.LinearToGammaSpace(b), a);
            }
        }
    },
    alias: ["equalsT", "System$IEquatable$1$Demo$MiniGameAdaptor$Color$equalsT"],
    ctors: {
        $ctor2: function (r, g, b, a) {
            this.$initialize();
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        },
        $ctor1: function (r, g, b) {
            this.$initialize();
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = 1.0;
        },
        ctor: function () {
            this.$initialize();
        }
    },
    methods: {
        getItem: function (index) {
            switch (index) {
                case 0: 
                    return this.r;
                case 1: 
                    return this.g;
                case 2: 
                    return this.b;
                case 3: 
                    return this.a;
                default: 
                    throw new System.IndexOutOfRangeException.$ctor1("Invalid Color index(" + index + ")!");
            }
        },
        setItem: function (index, value) {
            switch (index) {
                case 0: 
                    this.r = value;
                    break;
                case 1: 
                    this.g = value;
                    break;
                case 2: 
                    this.b = value;
                    break;
                case 3: 
                    this.a = value;
                    break;
                default: 
                    throw new System.IndexOutOfRangeException.$ctor1("Invalid Color index(" + index + ")!");
            }
        },
        toString: function () {
            return System.String.format("RGBA({0:F3}, {1:F3}, {2:F3}, {3:F3})", this.r, this.g, this.b, this.a);
        },
        ToString: function (format) {
            return System.String.format("RGBA({0}, {1}, {2}, {3})", System.Single.format(this.r, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat), System.Single.format(this.g, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat), System.Single.format(this.b, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat), System.Single.format(this.a, format, System.Globalization.CultureInfo.inletiantCulture.numberFormat));
        },
        getHashCode: function () {
            return MiniGameAdaptor.Color.op_Implicit$1(this).getHashCode();
        },
        equals: function (other) {
            if (!(Bridge.is(other, MiniGameAdaptor.Color))) {
                return false;
            }

            return this.equalsT(Bridge.cast(other, MiniGameAdaptor.Color));
        },
        equalsT: function (other) {
            return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
        },
        RGBMultiplied$1: function (multiplier) {
            return new MiniGameAdaptor.Color.$ctor2(this.r * multiplier, this.g * multiplier, this.b * multiplier, this.a);
        },
        RGBMultiplied: function (multiplier) {
            return new MiniGameAdaptor.Color.$ctor2(this.r * multiplier.r, this.g * multiplier.g, this.b * multiplier.b, this.a);
        },
        AlphaMultiplied: function (multiplier) {
            return new MiniGameAdaptor.Color.$ctor2(this.r, this.g, this.b, this.a * multiplier);
        },
        $clone: function (to) {
            let s = to || new MiniGameAdaptor.Color();
            s.r = this.r;
            s.g = this.g;
            s.b = this.b;
            s.a = this.a;
            return s;
        },
        __remap01: function() {
            this.r /= 255;
            this.g /= 255;
            this.b /= 255;
            this.a /= 255;
            return this;
        },
        __remap0255: function() {
            this.r *= 255;
            this.g *= 255;
            this.b *= 255;
            this.a *= 255;
            return this;
        }
    }
});
engine.decorators.serialize('MiniGameAdaptor.Color')(MiniGameAdaptor.Color);
Object.defineProperty(MiniGameAdaptor.Color.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.Color.prototype.__properties }
})
