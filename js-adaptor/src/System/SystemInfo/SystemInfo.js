import { getWxSystemInfo } from '../utils'

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.SystemInfo", {
    statics: {
      props: {
        deviceUniqueIdentifier: {
          get: function () {
            return '';
          }
        },
        operatingSystem: {
          get: function () {
            return getWxSystemInfo().system
          }
        },
        deviceModel: {
          get: function() {
            return getWxSystemInfo().model
          }
        },
        systemMemorySize: {
          get: function() {
            return getWxSystemInfo().systemMemorySize
          }
        },
        graphicsShaderLevel: {
          get: function() {
            // https://docs.unity3d.com/2018.4/Documentation/ScriptReference/SystemInfo-graphicsShaderLevel.html
            return 35;
          }
        },
        supportsImageEffects: {
          get: function() {
            // temp impl.
            return false;
          }
        }
      },
      methods: {
        SupportsRenderTextureFormat: function(format) {
          // temp impl.
          return false;
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


