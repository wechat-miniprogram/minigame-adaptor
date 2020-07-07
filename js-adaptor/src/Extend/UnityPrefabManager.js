import MiniGameAdaptor from '../MiniGameAdaptor.js';

let UnityPrefabManager = {
    loadedPrefabsMap : {
        __prefabsMap : new Map(),

        get: function(path) {
            if (!this.__prefabsMap.has(path)) throw new Error(path + " not exists, try load it first");

            return this.__prefabsMap.get(path);
        },
        has: function(path) {
            return this.__prefabsMap.has(path);
        },
        tryGetSync: function(path) {
            let prefab = null;
            if (!this.__prefabsMap.has(path)) {
                try {
                    prefab = engine.loader.getAsset(path);
                    this.__prefabsMap.set(path, prefab);
                } catch (e) {
                    
                } finally {
                    return prefab;
                }
            }
            return this.__prefabsMap.get(path);
        },
        tryGetAsync: function(path, callback) {
            if (!this.__prefabsMap.has(path)) {
                // to avoid load the same prefab twice
                this.__prefabsMap.set(path, null);

                engine.loader.load(path).promise.then((prefab) => {
                    this.__prefabsMap.set(path, prefab);
                    callback(prefab);
                });
            } else {
                callback(this.__prefabsMap.get(path));
            }
        },
        addAsync: function(path, callback) {
            if (!this.__prefabsMap.has(path)) {
                this.__prefabsMap.set(path,)
                engine.loader.load(path).promise.then((prefab) => {
                    this.__prefabsMap.set(path, prefab);
                    if (callback) callback(prefab);
                });
            } else {
                if (callback) callback(this.__prefabsMap.get(path));
            }
        },
        addRangeAsync: function(paths, callback) {
            if (!Array.isArray(paths)) throw new Error("invalid array");
            
            let prefabs = [];
            paths.forEach((path) => {
                let p = path;
                this.addAsync(p, (prefab) => {
                    prefabs.push(prefab);
                });
            });
            let promise = new Promise(function(resolve, reject) {
                if (prefabs.length === paths.length) {
                    resolve(prefabs);
                } else {
                    reject("reject");
                }
            });
            promise.then((value) => {
                callback(value);
            });
        }
    }
}

// 将对象挂在到MiniGameAdaptor
MiniGameAdaptor.register('UnityPrefabManager', UnityPrefabManager);