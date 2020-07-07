var requireLocal = function() {
    require("./weapp-adapter.js");
    require("./minigame-adaptor-lib.js");
    require("./minigame-adaptor-lib.meta.js");
    require("./minigame-adaptor-lib-patch.js");
    require("./minigame-adaptor.js");
}

import config from './minigame-adaptor-config.js';

function requireBridge() {
    if(config.pluginConfig.useMiniGameAdaptorPlugin) {
        try {
            // requirePlugin(config.pluginConfig.pluginAlias)({
            //     useLocalBridgeAdaptor: !config.pluginConfig.useMiniGameAdaptorJs
            // })
            requirePlugin(config.pluginConfig.pluginAlias, {
                enableRequireHostModule: true, // 是否允许插件引用宿主的模块，默认 false
                customEnv: { // 传递给插件的值，多次调用传递会覆盖写（Object.assign）
                  wx
                }
              })

            if (!config.pluginConfig.useMiniGameAdaptorJs) {
                require("./minigame-adaptor.js");
            }

            return 'require bridge plugin'
        } catch(e) {
            console.error(e)
            return 'error'
        }
    } else {
        // 不使用adaptor引擎插件，引入本地文件，该逻辑依赖插件在导出的时候选择不适用引擎插件
        try {
            requireLocal();
            return 'require local file';
        } catch(e) {
            console.error(e)
            return 'error';
        }
    }  
}

function readSceneConfig() {
    if (config.sceneConfig) {
        if (!window.__minigamePrivate) {
            window.__minigamePrivate = {}
        }
        window.__minigamePrivate.i2n = config.sceneConfig.index2NameMap;
        window.__minigamePrivate.n2p = config.sceneConfig.name2PathMap;
    }
}

readSceneConfig();
requireBridge();
