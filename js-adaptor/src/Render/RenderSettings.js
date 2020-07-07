/**
 * @compiler Bridge.NET 17.10.1
 */
 Bridge.assembly("unity-script-converter", function($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.RenderSettings", {
      statics: {
        fields: {
          _fog: false,
          _color: undefined,
          _ambientLight: undefined,
          _fogMode: 2,
          _endDis: undefined,
        },
        props: {
          fog: {
            set: function(state) {
              this._fog = state;
              if (state) {
                if (game.activeScene.settings.fogMode === 0) {
                  game.activeScene.settings.fogMode = this._fogMode + 1;
                } 
              } else {
                game.activeScene.settings.fogMode = 0;
              }
            },
            get: function() {
              return this._fog;
            }
          },
          fogMode: {
            set: function(mode) {
              this._fogMode = mode;              
              if (this._fog) {
                game.activeScene.settings.fogMode = mode + 1;
              }
            }, 
            get: function() {
              return this._fogMode;
            }
          },
          fogColor: {
            set: function(color) {
              this._color = color;
              game.activeScene.settings.fogColor.x = color.r/255.0;
              game.activeScene.settings.fogColor.y = color.g/255.0;
              game.activeScene.settings.fogColor.z = color.b/255.0;
            },
            get: function() {
              return this._color; 
            }
          },
          ambientLight: {
            set: function(color) {
              this._ambientLight = color;
              game.activeScene.settings.ambientLight.x = color.r/255.0;
              game.activeScene.settings.ambientLight.y = color.g/255.0;
              game.activeScene.settings.ambientLight.z = color.b/255.0;
            },
            get: function() {
              return this._ambientLight; 
            }
          },
          fogDensity: {
            set: function(density) {
              game.activeScene.settings.fogDensity = density;
            },
            get: function() {
              return game.activeScene.settings.fogDensity; 
            }
    
          },
          fogStartDistance: {
            set: function(dis) {
              if (this._endDis != undefined) {
                game.activeScene.settings.fogRange = this._endDis - dis;
              }
              game.activeScene.settings.fogStart = dis;
            },
            get: function() {
              return game.activeScene.settings.fogStart; 
            }
          },
          fogEndDistance: {
            set: function(dis) {
              this._endDis = dis;
              game.activeScene.settings.fogRange = dis - game.activeScene.settings.fogStart;
            },
            get: function() {
              return this._endDis;
            }
          }
        }
      },
      fields: {
      },
      props: {
      },
      ctors: {
      },
      methods: {
      }
  });
});