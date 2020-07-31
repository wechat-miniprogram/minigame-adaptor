Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Bounds", {
    inherits: function () { return [System.IEquatable$1(MiniGameAdaptor.Bounds)]; },
    $kind: "struct",
    statics: {
      methods: {
        op_Equality: function (lhs, rhs) {
          throw new System.Exception("not impl");
        },
        op_Inequality: function (lhs, rhs) {
          throw new System.Exception("not impl");
        },
        getDefaultValue: function () { return new MiniGameAdaptor.Bounds(); }
      }
    },
    fields: {
      m_Center: null,
      m_Extents: null
    },
    props: {
      center: {
        get: function () {
          return this.m_Center;
        },
        set: function (value) {
          this.m_Center = value;
          return this.m_Center;
        }
      },
      extents: {
        get: function () {
            return this.m_Extents;
        },
        set: function (value) {
          throw new System.Exception("not impl");
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
      size: {
        get: function () {
            return this.m_Size;
        },
        set: function (value) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      $ctor1: function (center, size) {
        this.$initialize();
        throw new System.Exception("not impl");
      },
      ctor: function (center, size) {
        this.$initialize();
        this.m_Center = center;
        this.m_Size = size;
        /*this.m_Extents = size * 0.5;*/
      }
    },
    methods: {
      ClosestPoint: function (point) {
        throw new System.Exception("not impl");
      },
      Contains: function (point) {
        throw new System.Exception("not impl");
      },
      Encapsulate: function (bounds) {
        throw new System.Exception("not impl");
      },
      Encapsulate$1: function (point) {
        throw new System.Exception("not impl");
      },
      equals: function (other) {
        throw new System.Exception("not impl");
      },
      Equals: function (other) {
        throw new System.Exception("not impl");
      },
      System$IEquatable$1$MiniGameAdaptor$Bounds$equalsT: function (other) {
        throw new System.Exception("Exception");
      },
      Expand: function (amount) {
        throw new System.Exception("not impl");
      },
      Expand$1: function (amount) {
        throw new System.Exception("not impl");
      },
      getHashCode: function () {
        throw new System.Exception("not impl");
      },
      IntersectRay: function (ray) {
        throw new System.Exception("not impl");
      },
      IntersectRay$1: function (ray, distance) {
        throw new System.Exception("not impl");
      },
      Intersects: function (bounds) {
        throw new System.Exception("not impl");
      },
      SetMinMax: function (min, max) {
        throw new System.Exception("not impl");
      },
      SqrDistance: function (point) {
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


