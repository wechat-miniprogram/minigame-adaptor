
import MiniGameAdaptor from '../MiniGameAdaptor.js';

// 具体模块实现
class SceneManager {

    static getNameByIndex(index) {
        const name = SceneManager.index2NameMap[index];
        if (!name) {
            throw new Error('scene index to name mapping not found');
        }
        return name;
    }

    static getPathByName(name) {
        const path = SceneManager.name2PathMap[name];
        if (!path) {
            throw new Error('scene name to path mapping not found');
        }
        return path;
    }

    static getPathByIndex(index) {
        const name = getNameByIndex(index)
        const path = getPathByName(name)

        return path;
    }


    static _loadScene(name, path, callback) {
        engine.loader.load(path).promise.then((res) => {
            engine.game.playScene(res)
            // game.run();
            callback && callback();
           }).catch((error)=>{
            console.error(error);
            callback(null);
        });
    }

    static LoadScene(sceneData, callback) {
        if (typeof(sceneData) === "number") {
            const name = getNameByIndex(sceneData);
            const path = getPathByName(name);

            this._loadScene(name, path, callback);
        } else if (typeof(sceneData) === "string") {
            let path = SceneManager.name2PathMap[sceneData];
            // sceneData is scene name
            if (path) {
                this._loadScene(sceneData, path, callback);
            }
            // sceneData is scene path
            else {
                Object.entries(SceneManager.name2PathMap).forEach(kv => {
                    let k = kv[0];
                    let v = kv[1];
                    if (v === sceneData || v.substring(0, v.length - 6) === sceneData) {
                        this._loadScene(k, v, callback);
                    }
                });
            }
        }
    }
}

if (window.__minigamePrivate) {
    SceneManager.index2NameMap = window.__minigamePrivate.i2n;
    SceneManager.name2PathMap = window.__minigamePrivate.n2p;
}

// 将对象挂在到MiniGameAdaptor
MiniGameAdaptor.register('SceneManager', SceneManager);
