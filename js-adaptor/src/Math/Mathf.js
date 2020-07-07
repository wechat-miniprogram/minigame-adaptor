const GAMMA_TO_LINEAR = 2.2;
const LINEAR_TO_GAMMA = 0.45454545;
const RANDOM_SEED     = 0.8694896071683615;

// =====================================================================================
// Ported from Stefan Gustavson's java implementation
// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
// Read Stefan's excellent paper for details on how this code works.
//
// Sean McCullough banksean@gmail.com
// credits https://gist.github.com/banksean/304522#file-perlin-noise-simplex-js-L156

/**
 * You can pass in a random number generator object if you like.
 * It is assumed to have a random() method.
 */
function SimplexNoise(seed) {
  let i;
  if (!seed) seed = Math.random();
  this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
  this.p = [];
  for (i = 0; i < 256; i++) {
    this.p[i] = Math.floor(seed * 256);
  }
  // To remove the need for index wrapping, double the permutation table length
  this.perm = [];
  for (i = 0; i < 512; i++) {
    this.perm[i] = this.p[i & 255];
  }
}

SimplexNoise.prototype.dot = function(g, x, y) {
  return g[0]*x + g[1]*y;
};

SimplexNoise.prototype.noise = function (xin, yin) {
  let n0, n1, n2, // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in
    F2 = 0.5 * (Math.sqrt(3.0) - 1.0),
    s = (xin + yin) * F2, // Hairy factor for 2D
    i = Math.floor(xin + s),
    j = Math.floor(yin + s),
    G2 = (3.0 - Math.sqrt(3.0)) / 6.0,
    t = (i + j) * G2,
    X0 = i - t, // Unskew the cell origin back to (x,y) space
    Y0 = j - t,
    x0 = xin - X0, // The x,y distances from the cell origin
    y0 = yin - Y0,
  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
    i1, j1, // Offsets for second (middle) corner of simplex in (i,j) coords
    x1, x2, y1, y2,
    ii, jj, gi0, gi1, gi2,
    t0, t1, t2;
  if (x0 > y0) {
    // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1 = 1;
    j1 = 0;
  } else {
    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1 = 0;
    j1 = 1;
  }
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6
  x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
  y1 = y0 - j1 + G2;
  x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
  y2 = y0 - 1.0 + 2.0 * G2;
  // Work out the hashed gradient indices of the three simplex corners
  ii = i & 255;
  jj = j & 255;
  gi0 = this.perm[ii + this.perm[jj]] % 12;
  gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
  gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
  // Calculate the contribution from the three corners
  t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 < 0) {
    n0 = 0.0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient
  }
  t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 < 0) {
    n1 = 0.0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
  }
  t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 < 0) {
    n2 = 0.0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  return 70.0 * (n0 + n1 + n2);
};

Bridge.define("MiniGameAdaptor.Mathf", {
    $kind: "struct",
    statics: {
        fields: {
            PI              : 0,
            Infinity        : 0,
            NegativeInfinity: 0,
            Deg2Rad         : 0,
            Rad2Deg         : 0,
            Epsilon         : 0
        },
        ctors: {
            init: function () {
                this.PI               = Math.PI;
                this.Deg2Rad          = Math.PI * 2 / 360;
                this.Rad2Deg          = 1 / this.Deg2Rad;
                this.Infinity         = Number.POSITIVE_INFINITY;
                this.NegativeInfinity = Number.NEGATIVE_INFINITY;
                this.Epsilon          = 1e-5;
            }
        },
        methods: {
            Abs: function (value) {
                return Math.abs(value);
            },
            Abs$1: function (f) {
                return Math.abs(f);
            },
            Acos: function (f) {
                return Math.acos(f);
            },
            Approximately: function (a, b) {
                // If a or b is zero, compare that the other is less or equal to epsilon.
                // If neither a or b are 0, then find an epsilon that is good for
                // comparing numbers at the maximum magnitude of a and b.
                // Floating points have about 7 significant digits, so
                // 1.000001f can be represented while 1.0000001f is rounded to zero,
                // thus we could use an epsilon of 0.000001f for comparing values close to 1.
                // We multiply this epsilon by the biggest magnitude of a and b.
                return MiniGameAdaptor.Mathf.Abs$1(b - a) < MiniGameAdaptor.Mathf.Max$2(1E-06 * MiniGameAdaptor.Mathf.Max$2(MiniGameAdaptor.Mathf.Abs$1(a), MiniGameAdaptor.Mathf.Abs$1(b)), MiniGameAdaptor.Mathf.Epsilon * 8);
            },
            Asin: function (f) {
                return Math.asin(f);
            },
            Atan: function (f) {
                return Math.atan(f);
            },
            Atan2: function (y, x) {
                return Math.atan2(y, x);
            },
            Ceil: function (f) {
                return Math.ceil(f);
            },
            CeilToInt: function (f) {
                return Bridge.Int.clip32(Math.ceil(f));
            },
            Clamp: function (value, min, max) {
                if (value < min) {
                    value = min;
                } else if (value > max) {
                    value = max;
                }
                return value;
            },
            Clamp$1: function (value, min, max) {
                if (value < min) {
                    value = min;
                } else if (value > max) {
                    value = max;
                }
                return value;
            },
            Clamp01: function (value) {
                if (value < 0.0) {
                    return 0.0;
                } else {
                    if (value > 1.0) {
                        return 1.0;
                    } else {
                        return value;
                    }
                }
            },
            ClosestPowerOfTwo: function (value) {
                let nextPowerOfTwo = MiniGameAdaptor.Mathf.nextPowerOfTwo(value);

                // if value is between nextPowerOfTwo and pre-pre nextPowerOfTwo
                if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
                    // prev power of two
                    return nextPowerOfTwo >> 1;
                }

                return nextPowerOfTwo;
            },

            // TODO: test
            // https://github.com/Unity-Technologies/FPSSample/blob/master/Packages/com.unity.render-pipelines.high-definition/Runtime/Lighting/LightUtils.cs
            CorrelatedColorTemperatureToRGB: function (temperature) {
                let r, g, b;

                // Temperature must fall between 1000 and 40000 degrees
                // The fitting require to divide kelvin by 1000 (allow more precision)
                let kelvin = MiniGameAdaptor.Mathf.Clamp(temperature, 1000.0, 40000.0) / 1000.0;

                let kelvin2 = kelvin * kelvin;

                // Using 6570 as a pivot is an approximation, pivot point for red is around 6580 and for blue and green around 6560.
                // Calculate each color in turn (Note, clamp is not really necessary as all value belongs to [0..1] but can help for extremum).
                // Red
                r = kelvin < 6.570 ? 1.0 : Mathf.Clamp((1.35651 + 0.216422 * kelvin + 0.000633715 * kelvin2) / (-3.24223 + 0.918711 * kelvin), 0.0, 1.0);
                // Green
                g = kelvin < 6.570 ?
                    Mathf.Clamp((-399.809 + 414.271 * kelvin + 111.543 * kelvin2) / (2779.24 + 164.143 * kelvin + 84.7356 * kelvin2), 0.0, 1.0) :
                    Mathf.Clamp((1370.38 + 734.616 * kelvin + 0.689955 * kelvin2) / (-4625.69 + 1699.87 * kelvin), 0.0, 1.0);
                //Blue
                b = kelvin > 6.570 ? 1.0 : Mathf.Clamp((348.963 - 523.53 * kelvin + 183.62 * kelvin2) / (2848.82 - 214.52 * kelvin + 78.8614 * kelvin2), 0.0, 1.0);

                return new Color(r, g, b, 1.0);
            },

            Cos: function (f) {
                return Math.cos(f);
            },
            DeltaAngle: function (current, target) {
                var delta = MiniGameAdaptor.Mathf.Repeat((target - current), 360.0);
                if (delta > 180.0) {
                    delta -= 360.0;
                }
                return delta;
            },
            Exp: function (power) {
                return Math.exp(power);
            },
            // TODO
            FloatToHalf: function (val) {
                throw new System.Exception("not impl");
            },
            Floor: function (f) {
                return Math.floor(f);
            },
            FloorToInt: function (f) {
                return Bridge.Int.clip32(Math.floor(f));
            },
            Gamma: function (value, absmax, gamma) {
                var negative = false;
                if (value < 0.0) {
                    negative = true;
                }
                var absval = MiniGameAdaptor.Mathf.Abs$1(value);
                if (absval > absmax) {
                    return negative ? -absval : absval;
                }

                var result = MiniGameAdaptor.Mathf.Pow(absval / absmax, gamma) * absmax;
                return negative ? -result : result;
            },
            GammaToLinearSpace: function (value) {
                // return Math.pow(value, GAMMA_TO_LINEAR);
                if (value <= 0.04045)
                    return value / 12.92;
                else if (value < 1.0)
                    return Math.pow((value + 0.055) / 1.055, 2.4);
                else
                    return Math.pow(value, 2.4);
            },
            // TODO
            HalfToFloat: function (val) {
                throw new System.Exception("not impl");
            },
            InverseLerp: function (a, b, value) {
                if (a !== b) {
                    return MiniGameAdaptor.Mathf.Clamp01((value - a) / (b - a));
                } else {
                    return 0.0;
                }
            },
            IsPowerOfTwo: function (value) {
                value = toInt(value);

                return (value & (value - 1)) === 0;
            },
            Lerp: function (a, b, t) {
                return a + (b - a) * MiniGameAdaptor.Mathf.Clamp01(t);
            },
            LerpAngle: function (a, b, t) {
                var delta = MiniGameAdaptor.Mathf.Repeat((b - a), 360);
                if (delta > 180) {
                    delta -= 360;
                }
                return a + delta * MiniGameAdaptor.Mathf.Clamp01(t);
            },
            LerpUnclamped: function (a, b, t) {
                return a + (b - a) * t;
            },
            LinearToGammaSpace: function (value) {
                // return Math.pow(value, LINEAR_TO_GAMMA);
                if (value <= 0.0)
                    return 0.0;
                else if (value <= 0.0031308)
                    return 12.92 * value;
                else if (value <= 1.0)
                    return 1.055 * Math.pow(value, 0.41666) - 0.055;
                else
                    return Math.pow(value, 0.41666);
            },
            Log: function (f) {
                return Bridge.Math.log(f);
            },
            Log$1: function (f, p) {
                return Bridge.Math.logWithBase(f, p);
            },
            Log10: function (f) {
                return Bridge.Math.logWithBase(f, 10.0);
            },
            Max: function (a, b) {
                return a > b ? a : b;
            },
            Max$1: function (values) {
                if (values === void 0) { values = []; }
                var len = values.length;
                if (len === 0) {
                    return 0;
                }
                var m = values[System.Array.index(0, values)];
                for (var i = 1; i < len; i = (i + 1) | 0) {
                    if (values[System.Array.index(i, values)] > m) {
                        m = values[System.Array.index(i, values)];
                    }
                }
                return m;
            },
            Max$2: function (a, b) {
                return a > b ? a : b;
            },
            Max$3: function (values) {
                if (values === void 0) { values = []; }
                var len = values.length;
                if (len === 0) {
                    return 0;
                }
                var m = values[System.Array.index(0, values)];
                for (var i = 1; i < len; i = (i + 1) | 0) {
                    if (values[System.Array.index(i, values)] > m) {
                        m = values[System.Array.index(i, values)];
                    }
                }
                return m;
            },
            Min: function (a, b) {
                return a < b ? a : b;
            },
            Min$1: function (values) {
                if (values === void 0) { values = []; }
                var len = values.length;
                if (len === 0) {
                    return 0;
                }
                var m = values[System.Array.index(0, values)];
                for (var i = 1; i < len; i = (i + 1) | 0) {
                    if (values[System.Array.index(i, values)] < m) {
                        m = values[System.Array.index(i, values)];
                    }
                }
                return m;
            },
            Min$2: function (a, b) {
                return a > b ? a : b;
            },
            Min$3: function (values) {
                if (values === void 0) { values = []; }
                var len = values.length;
                if (len === 0) {
                    return 0;
                }
                var m = values[System.Array.index(0, values)];
                for (var i = 1; i < len; i = (i + 1) | 0) {
                    if (values[System.Array.index(i, values)] > m) {
                        m = values[System.Array.index(i, values)];
                    }
                }
                return m;
            },
            MoveTowards: function (current, target, maxDelta) {
                if (MiniGameAdaptor.Mathf.Abs$1(target - current) <= maxDelta) {
                    return target;
                }
                return current + MiniGameAdaptor.Mathf.Sign(target - current) * maxDelta;
            },
            MoveTowardsAngle: function (current, target, maxDelta) {
                var deltaAngle = MiniGameAdaptor.Mathf.DeltaAngle(current, target);
                if (-maxDelta < deltaAngle && deltaAngle < maxDelta) {
                    return target;
                }
                target = current + deltaAngle;
                return MiniGameAdaptor.Mathf.MoveTowards(current, target, maxDelta);
            },
            NextPowerOfTwo: function (value) {
                value = toInt(value);

                if (value < 0) return 0;

                --value;
                value |= value >> 1;
                value |= value >> 2;
                value |= value >> 4;
                value |= value >> 8;
                value |= value >> 16;
                value += 1;

                return value;
            },
            PerlinNoise: function (x, y) {
                return (new SimplexNoise(RANDOM_SEED)).noise(x, y);
            },
            PingPong: function (t, length) {
                t = MiniGameAdaptor.Mathf.Repeat(t, length * 2.0);
                return length - MiniGameAdaptor.Mathf.Abs$1(t - length);
            },
            Pow: function (f, p) {
                return Math.pow(f, p);
            },
            Repeat: function (t, length) {
                return MiniGameAdaptor.Mathf.Clamp$1(t - MiniGameAdaptor.Mathf.Floor(t / length) * length, 0.0, length);
            },
            Round: function (f) {
                return Bridge.Math.round(f, 0, 6);
            },
            RoundToInt: function (f) {
                return Bridge.Int.clip32(Bridge.Math.round(f, 0, 6));
            },
            Sign: function (f) {
                return f >= 0.0 ? 1.0 : -1.0;
            },
            Sin: function (f) {
                return Math.sin(f);
            },
            SmoothDamp: function (current, target, currentVelocity, smoothTime) {
                let maxSpeed = Infinity;
                let deltaTime = MiniGameAdaptor.Time.deltaTime;

                smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);

                var num = 2.0 / smoothTime;
                var num2 = num * deltaTime;
                var num3 = 1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
                var num4 = current - target;
                var num5 = target;
                var num6 = maxSpeed * smoothTime;

                num4 = MiniGameAdaptor.Mathf.Clamp(num4, -num6, num6);
                target = current - num4;

                var num7 = (currentVelocity.v + num * num4) * deltaTime;
                currentVelocity.v = (currentVelocity.v - num * num7) * num3;
                var num8 = target + (num4 + num7) * num3;
                if (num5 - current > 0.0 === num8 > num5) {
                    num8 = num5;
                    currentVelocity.v = (num8 - num5) / deltaTime;
                }
                return num8;
            },
            SmoothDamp$1: function (current, target, currentVelocity, smoothTime, maxSpeed) {
                let deltaTime = MiniGameAdaptor.Time.deltaTime;

                smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);

                var num = 2.0 / smoothTime;
                var num2 = num * deltaTime;
                var num3 = 1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
                var num4 = current - target;
                var num5 = target;
                var num6 = maxSpeed * smoothTime;

                num4 = MiniGameAdaptor.Mathf.Clamp(num4, -num6, num6);
                target = current - num4;

                var num7 = (currentVelocity.v + num * num4) * deltaTime;
                currentVelocity.v = (currentVelocity.v - num * num7) * num3;
                var num8 = target + (num4 + num7) * num3;
                if (num5 - current > 0.0 === num8 > num5) {
                    num8 = num5;
                    currentVelocity.v = (num8 - num5) / deltaTime;
                }
                return num8;
            },
            SmoothDamp$2: function (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                smoothTime = MiniGameAdaptor.Mathf.Max(0.0001, smoothTime);

                var num = 2.0 / smoothTime;
                var num2 = num * deltaTime;
                var num3 = 1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
                var num4 = current - target;
                var num5 = target;
                var num6 = maxSpeed * smoothTime;

                num4 = MiniGameAdaptor.Mathf.Clamp(num4, -num6, num6);
                target = current - num4;

                var num7 = (currentVelocity.v + num * num4) * deltaTime;
                currentVelocity.v = (currentVelocity.v - num * num7) * num3;
                var num8 = target + (num4 + num7) * num3;
                if (num5 - current > 0.0 === num8 > num5) {
                    num8 = num5;
                    currentVelocity.v = (num8 - num5) / deltaTime;
                }
                return num8;
            },
            SmoothDampAngle: function (current, target, currentVelocity, smoothTime) {
                let maxSpeed = Infinity;
                let deltaTime = MiniGameAdaptor.Time.deltaTime;

                target = current + MiniGameAdaptor.Mathf.DeltaAngle(current, target);

                return MiniGameAdaptor.Mathf.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
            },
            SmoothDampAngle$1: function (current, target, currentVelocity, smoothTime, maxSpeed) {
                let deltaTime = MiniGameAdaptor.Time.deltaTime;

                target = current + MiniGameAdaptor.Mathf.DeltaAngle(current, target);

                return MiniGameAdaptor.Mathf.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
            },
            SmoothDampAngle$2: function (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                target = current + MiniGameAdaptor.Mathf.DeltaAngle(current, target);

                return MiniGameAdaptor.Mathf.SmoothDamp$2(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
            },
            SmoothStep: function (from, to, t) {
                t = MiniGameAdaptor.Mathf.Clamp01(t);
                t = -2.0 * t * t * t + 3.0 * t * t;
                return to * t + from * (1.0 - t);
            },
            Sqrt: function (f) {
                return Math.sqrt(f);
            },
            Tan: function (f) {
                return Math.tan(f);
            },
            getDefaultValue: function () { return new MiniGameAdaptor.Mathf(); }
        }
    },
    methods: {
        $clone: function (to) { return this; }
    }
});
