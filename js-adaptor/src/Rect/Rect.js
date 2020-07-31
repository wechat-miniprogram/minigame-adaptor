Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Rect", {
    inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Rect)]; },
    $kind: "struct",
    statics: {
      props: {
        zero: {
          get: function () {
            throw new System.Exception("not impl");
          }
        }
      },
      methods: {
        MinMaxRect: function (xmin, ymin, xmax, ymax) {
        },
        NormalizedToPoint: function (rectangle, normalizedRectCoordinates) {
          throw new System.Exception("not impl");
        },
        PointToNormalized: function (rectangle, point) {
          throw new System.Exception("not impl");
        },
        op_Equality: function (lhs, rhs) {
          throw new System.Exception("not impl");
        },
        op_Inequality: function (lhs, rhs) {
          throw new System.Exception("not impl");
        },
        getDefaultValue: function () { return new MiniGameAdaptor.Rect(); }
      }
    },
    fields: {
      _x: 0,
      _y: 0,
      _width: 0,
      _height: 0
    },
    props: {
      center: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      height: {
        get: function () {
          return this._height
        },
        set: function (value) {
          this._height = value
          return this._height
        }
      },
      max: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      min: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      position: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      size: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      width: {
        get: function () {
          return this._width
        },
        set: function (value) {
          this._width = value
          return this._width
        }
      },
      x: {
        get: function () {
          return this._x
        },
        set: function (value) {
          this._x = value
          return this._x
        }
      },
      xMax: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      xMin: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      y: {
        get: function () {
          return this._y
        },
        set: function (value) {
          this._y = value
          return this._y
        }
      },
      yMax: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      },
      yMin: {
        get: function () {
          throw new System.Exception("not impl");
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      $ctor1: function (x, y, width, height) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      $ctor2: function (source) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      $ctor3: function (position, size) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      ctor: function (x, y, width, height) {
        this.$initialize();
        this._x = x
        this._y = y
        this._width = width
        this._height = height
      }
    },
    methods: {
      Contains: function (point) {
        throw new System.Exception("not impl");
      },
      Contains$1: function (point) {
        throw new System.Exception("not impl");
      },
      Contains$2: function (point, allowInverse) {
        throw new System.Exception("not impl");
      },
      equals: function (other) {
        throw new System.Exception("not impl");
      },
      Equals: function (other) {
        throw new System.Exception("not impl");
      },
      System$IEquatable$1$MiniGameAdaptor$Rect$equalsT: function (other) {
        throw new System.Exception("Exception");
      },
      getHashCode: function () {
        throw new System.Exception("not impl");
      },
      Overlaps: function (other) {
        throw new System.Exception("not impl");
      },
      Overlaps$1: function (other, allowInverse) {
        throw new System.Exception("not impl");
      },
      Set: function (x, y, width, height) {
        throw new System.Exception("not impl");
      },
      toString: function () {
        throw new System.Exception("not impl");
      },
      ToString: function (format) {
        throw new System.Exception("not impl");
      },
      $clone: function (to) { return this; }
    }
  });
});


