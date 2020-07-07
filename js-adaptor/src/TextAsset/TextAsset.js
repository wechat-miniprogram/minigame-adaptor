
Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.TextAsset", {
    inherits: function () { return [MiniGameAdaptor.Object, System.IEquatable$1(MiniGameAdaptor.TextAsset)]; },
    $kind: "struct",
    statics: {
      ctors: {
        init: function (args) {
          // console.log('MiniGameAdaptor.TextAsset init', args, this)
        }
      },
      methods: {
        Deserialize: function (data, comp) {
          comp._path = data.path ? data.path : data.value.path
          comp._text = data.text ? data.text : data.value.text
          comp.name = comp._path.substring(comp._path.lastIndexOf('/') + 1, comp._path.lastIndexOf('.'))

          return comp
        },
      }
    },
    fields: {
      _path: '',
      _text: ''
    },
    props: {
      bytes: {
        get: function () {
          return this._text
        }
      },
      text: {
        get: function () {
          return this._text
        }
      }
    },
    ctors: {
      ctor: function (string) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);
      },
      $ctor1: function (string, path) {
        this.$initialize();
        MiniGameAdaptor.Object.ctor.call(this);

        this._text = string;
        this._path = path;
      }
    },
    methods: {
      toString: function () {
        return this._text;
      }
    }
  });
});

engine.decorators.serialize('MiniGameAdaptor.TextAsset')(MiniGameAdaptor.TextAsset);
Object.defineProperty(MiniGameAdaptor.TextAsset.prototype, '__properties', {
  enumerable: false,
  configurable: true,
  writable: false,
  value: { ...MiniGameAdaptor.TextAsset.prototype.__properties }
})
MiniGameAdaptor.TextAsset.prototype.__properties.path = { type: "string" };
MiniGameAdaptor.TextAsset.prototype.__properties.text = { type: "string" };
