function isNumber(x) {
  return typeof x === 'number' && (x === x)
}

function colorToHexMap(color) {
  const map = {
    'red': '#FF0000',
    'cyan': '#00FFFF',
    'blue': '#0000FF',
    'darkblue': '#00008B',
    'lightblue': '#ADD8E6',
    'purple': '#800080',
    'yellow': '#FFFF00',
    'lime': '#00FF00',
    'fuchsia': '#FF00FF',
    'white': '#FFFFFF',
    'silver': '#C0C0C0',
    'grey': '#808080',
    'black': '#000000',
    'orange': '#FFA500',
    'brown': '#A52A2A',
    'maroon': '#800000',
    'green': '#008000',
    'olive': '#808000',
    'navy': '#000080',
    'teal': '#008080',
    'aqua': '#00FFFF',
    'magenta': '#FF00FF'
  }
  return map[color]
}

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.ColorUtility", {
    statics: {
      methods: {
        ToHtmlStringRGBA: function (color = {}) {
          let { r, g, b, a } = color
          if (isNumber(r) && isNumber(g) && isNumber(b) && isNumber(a)) {
            r = Math.min(1, Math.max(0, r))
            g = Math.min(1, Math.max(0, g))
            b = Math.min(1, Math.max(0, b))
            a = Math.min(1, Math.max(0, a))
            const htmlStringRGBA = [r, g, b, a].reduce((pre, cur) => {
              return pre + ((cur * 255) | 1 << 8).toString(16).slice(1)
            }, '')
            return htmlStringRGBA
          } else {
            throw new System.Exception("ToHtmlStringRGBA: params error");
          }
        },
        ToHtmlStringRGB: function (color = {}) {
          let { r, g, b } = color
          if (isNumber(r) && isNumber(g) && isNumber(b)) {
            r = Math.min(1, Math.max(0, r))
            g = Math.min(1, Math.max(0, g))
            b = Math.min(1, Math.max(0, b))
            const htmlStringRGB = [r, g, b].reduce((pre, cur) => {
              return pre + ((cur * 255) | 1 << 8).toString(16).slice(1)
            }, '')
            return htmlStringRGB
          } else {
            throw new System.Exception("ToHtmlStringRGB: params error");
          }
        },
        TryParseHtmlString: function (htmlString = '', color) {
          if (!htmlString || !color) {
            throw new System.Exception("TryParseHtmlString: params error");
          }
          function hexToColor(hex, color) {
            let c
            c = hex.substring(1).split('')
            if (c.length == 3) {
              c = [c[0], c[0], c[1], c[1], c[2], c[2], 'F', 'F']
            }
            if (c.length == 4) {
              c = [c[0], c[0], c[1], c[1], c[2], c[2], c[3], c[3]]
            }
            if (c.length == 6) {
              c = [c[0], c[1], c[2], c[3], c[4], c[5], 'F', 'F']
            }
            c = '0x' + c.join('')
            const r = (c >> 24) & 255
            const g = (c >> 16) & 255
            const b = (c >> 8) & 255
            const a = c & 255
            if (color.setItem) {
              color.setItem(0, r)
              color.setItem(1, g)
              color.setItem(2, b)
              color.setItem(3, a)
            } else if (color.v) {
              color.v.setItem(0, r)
              color.v.setItem(1, g)
              color.v.setItem(2, b)
              color.v.setItem(3, a)
            } else {
              throw new System.Exception("TryParseHtmlString: params error");
            }
          }
          if (/^#(([A-Fa-f0-9]{3}){1,2}|([A-Fa-f0-9]{4}){1,2})$/.test(htmlString)) {
            hexToColor(htmlString, color)
            return true
          } else if (colorToHexMap(htmlString)) {
            // 文字颜色
            hexToColor(colorToHexMap(htmlString), color)
            return true
          } else {
            return false
          }
        }
      }
    },
    ctors: {
      ctor: function () {
        this.$initialize();
        throw new System.Exception("not impl");
      }
    }
  });
});


