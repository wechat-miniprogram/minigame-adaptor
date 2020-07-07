import { getWxSystemInfo } from '../System/utils'

Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.Screen", {
    statics: {
      props: {
        autorotateToLandscapeLeft: {
          get: function () {
            throw new System.Exception("not impl");
          },
          set: function (value) {
            throw new System.Exception("not impl");
          }
        },
        autorotateToLandscapeRight: {
          get: function () {
            throw new System.Exception("not impl");
          },
          set: function (value) {
            throw new System.Exception("not impl");
          }
        },
        autorotateToPortrait: {
          get: function () {
            throw new System.Exception("not impl");
          },
          set: function (value) {
            throw new System.Exception("not impl");
          }
        },
        autorotateToPortraitUpsideDown: {
          get: function () {
            throw new System.Exception("not impl");
          },
          set: function (value) {
            throw new System.Exception("not impl");
          }
        },
        currentResolution: {
          get: function () {
            throw new System.Exception("not impl");
          }
        },
        dpi: {
          get: function () {
            // console.warn('小游戏不支持获取dpi')
            return 300;
          }
        },
        fullScreen: {
          get: function () {
            throw new System.Exception("not impl");
          },
          set: function (value) {
            throw new System.Exception("not impl");
          }
        },
        fullScreenMode: {
          get: function () {
            throw new System.Exception("not impl");
          },
          set: function (value) {
            throw new System.Exception("not impl");
          }
        },
        height: {
          get: function () {
            const systemInfo = getWxSystemInfo()
            return systemInfo.windowHeight
          }
        },
        orientation: {
          get: function () {
            throw new System.Exception("not impl");
          },
          set: function (value) {
            throw new System.Exception("not impl");
          }
        },
        resolutions: {
          get: function () {
            throw new System.Exception("not impl");
          }
        },
        safeArea: {
          get: function () {
            throw new System.Exception("not impl");
          }
        },
        sleepTimeout: {
          get: function () {
            return 0;
          },
          set: function (value) {
            return 0;
          }
        },
        width: {
          get: function () {
            const systemInfo = getWxSystemInfo()
            return systemInfo.windowWidth
          }
        }
      },
      methods: {
        SetResolution: function (width, height, fullscreen) {
          throw new System.Exception("not impl");
        },
        SetResolution$1: function (width, height, fullscreen, preferredRefreshRate) {
          throw new System.Exception("not impl");
        },
        SetResolution$2: function (width, height, fullscreenMode) {
          throw new System.Exception("not impl");
        },
        SetResolution$3: function (width, height, fullscreenMode, preferredRefreshRate) {
          throw new System.Exception("not impl");
        }
      }
    },
    ctors: {
      ctor: function () {
        this.$initialize();
        // throw new System.Exception("not impl");
      }
    }
  });
});


