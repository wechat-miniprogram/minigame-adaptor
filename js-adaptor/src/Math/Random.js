Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Random", {
        statics: {
            props: {
                insideUnitCircle: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                insideUnitSphere: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                onUnitSphere: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                // https://projecteuclid.org/euclid.aoms/1177692644
                rotation: {
                    get: function () {
                        let x, y, z, u, v, w, s;
                        do {
                            x = MiniGameAdaptor.Random.Range(-1, 1);
                            y = MiniGameAdaptor.Random.Range(-1, 1);
                            z = x * x + y * y;
                        } while (z > 1);
                        do {
                            u = MiniGameAdaptor.Random.Range(-1, 1);
                            v = MiniGameAdaptor.Random.Range(-1, 1);
                            w = u * u + v * v;
                        } while (w > 1);
                        s = Math.sqrt((1 - z) / w);
                        return new MiniGameAdaptor.Quaternion.$ctor1(x, y, s * u, s * v);
                    }
                },
                rotationUniform: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                state: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                value: {
                    get: function () {
                        return MiniGameAdaptor.Random.Range(0,1);
                    }
                }
            },
            methods: {
                ColorHSV: function () {
                    return MiniGameAdaptor.Random.ColorHSV$4(0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0);
                },
                ColorHSV$1: function (hueMin, hueMax) {
                    return MiniGameAdaptor.Random.ColorHSV$4(hueMin, hueMax, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0);
                },
                ColorHSV$2: function (hueMin, hueMax, saturationMin, saturationMax) {
                    return MiniGameAdaptor.Random.ColorHSV$4(hueMin, hueMax, saturationMin, saturationMax, 0.0, 1.0, 1.0, 1.0);
                },
                ColorHSV$3: function (hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax) {
                    return MiniGameAdaptor.Random.ColorHSV$4(hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, 1.0, 1.0);
                },
                ColorHSV$4: function (hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, alphaMin, alphaMax) {
                    let h = MiniGameAdaptor.Mathf.Lerp(hueMin, hueMax, MiniGameAdaptor.Random.value);
                    let s = MiniGameAdaptor.Mathf.Lerp(saturationMin, saturationMax, MiniGameAdaptor.Random.value);
                    let v = MiniGameAdaptor.Mathf.Lerp(valueMin, valueMax, MiniGameAdaptor.Random.value);
                    let color = MiniGameAdaptor.Color.HSVToRGB$1(h, s, v, true);
                    color.a = MiniGameAdaptor.Mathf.Lerp(alphaMin, alphaMax, MiniGameAdaptor.Random.value);
                    return color.$clone();
                },
                InitState: function (seed) {
                    throw new System.Exception("not impl");
                },
                //float [min, max]
                Range: function (min, max) {
                    return Math.floor(Math.random() * (max - min) + min);
                },
                //int [min, max)
                Range$1: function (min, max) {
                    let r = Math.random();  // [0. 1)
                    let d = max - min;
                    r *= d;
                    r += min;
                    if (max - r < 0.0001) {
                        return max;
                    }
                    if (r - min < 0.0001) {
                        return min;
                    }
                    return r;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        }
    });
});
