
import MiniGameAdaptor from '../MiniGameAdaptor.js';
import { getFile } from '../File/getFile.js';

// 具体模块实现
class Resources {
    static Load(path, callback, options) {
        
        path = path.toLowerCase();
        Resources.getFileInfo(path, function(fullpath, type){
            if(type === "GameObject"){
                engine.loader.load(fullpath, options).promise.then((prefab) => {
                    callback(prefab);
                }).catch((error)=>{
                    console.error(error);
                    callback(null);
                });
            }
            else if(type === "AudioClip"){
                var url = fullpath+".raw";
                engine.loader.load(url).promise.then(function(raw){ 
                    var clip = new MiniGameAdaptor.AudioClip();
                    clip.SetSrc(raw.value);
                    callback(clip);
                }).catch((error)=>{
                    console.error(error);
                    callback(null);
                });
            }
            else if(type === "TextAsset"){
                Resources.LoadRes(path, MiniGameAdaptor.TextAsset, callback);
            }
            else if(type == "Texture2D"){
                //TODO
                throw new System.Exception("not support file:"+path);
            }
            else{
                throw new System.Exception("not support file:"+path);
            }
        });
        // let dir = 'Assets/Resources/';
        // if (__wxConfig.trgame) dir = 'Assets/Game/Resources/';
        
        // const fullpath = dir + path + '.prefab';
        
        // engine.loader.load(fullpath).promise.then((prefab) => {
        //     const depPrefabs = prefab.meta.config.prefabs;
        //     if (depPrefabs) {
        //         MiniGameAdaptor.UnityPrefabManager.loadedPrefabsMap.addRangeAsync(depPrefabs, (prefabs) => {
        //             callback(prefab);
        //         });
        //     } else {
        //         callback(prefab);
        //     }
        // });
        
    }
    /**** 加载文本类型资源, 指定了type，性能更高一些
     C#业务用法：
		WX.Resources.Load<TextAsset>("1", (result)=>{
			Debug.Log("***********" + result);
        });
    导出JS后：
    MiniGameAdaptor.Resources.LoadRes("1", MiniGameAdaptor.TextAsset, function (result) {
            MiniGameAdaptor.Debug.Log(System.String.concat("***********", result));
        });
    */
    static LoadRes(path, type, callback, options) {
        //********************** */
        path = path.toLowerCase();
        if(type === MiniGameAdaptor.TextAsset){
            Resources.getFilePathByKey(path, "TextAsset", function(realPath){
                var url = realPath+".raw";
                engine.loader.load(url).promise.then(function(raw){ 
                    callback(new MiniGameAdaptor.TextAsset.$ctor1(raw.value, url));
                }).catch((error)=>{
                    console.error(error);
                    callback(null);
                });
            });
        }
        else if(type === MiniGameAdaptor.AudioClip){
            Resources.getFilePathByKey(path, "AudioClip", function(realPath){
                var url = realPath+".raw";
                engine.loader.load(url).promise.then(function(raw){ 
                    var clip = new MiniGameAdaptor.AudioClip();
                    clip.SetSrc(raw.value);
                    callback(clip);
                }).catch((error)=>{
                    console.error(error);
                    callback(null);
                });
            });
        }
        else if(type === MiniGameAdaptor.GameObject){
            Resources.getFilePathByKey(path, "GameObject", function(realPath){
                engine.loader.load(realPath, options).promise.then((prefab) => {
                    callback(prefab);
                }).catch((error)=>{
                    console.error(error);
                    callback(null);
                });
            });
        }
        else{
            throw new System.Exception("not support type");
        }
    }

    //加载指定类型的所有文件
    static LoadAll(path, type, callback) {

        if(type === MiniGameAdaptor.TextAsset){
            Resources.getFilesByType("TextAsset", function(mapRes){
                var total_cnt = 0;
                var down_cnt = 0;
                var retObjs = new Array();
                if(mapRes){
                    mapRes.forEach(function(value,key){
                        if(path && path.length>0 && value.indexOf(path) == -1){
                            
                        }
                        else{
                            total_cnt++;
                            var url = value + ".raw";
                            engine.loader.load(url).promise.then(function(raw){ 
                                down_cnt++;
                                retObjs.push(raw.value);
                                if(down_cnt == total_cnt){
                                    callback(retObjs);
                                }
                            }).catch((error)=>{
                                console.error(error);
                            });
                        }
                    });
                }
            });
        }
        else{
            throw new System.Exception("not support type");
        }
    }

    static getFilePathByKey(key, type, callback){
        Resources.loadResMap(function(){
            var ret = null;
            var fileMap = Resources.mapRes.get(type);
            if(fileMap){
                var filepath = fileMap.get(key);
                if(filepath){
                    ret = filepath;
                }
            }
            callback(ret);
        })
    }

    static getFilesByType(type, callback){

        Resources.loadResMap(function(){
            var ret = null;
            var fileMap = Resources.mapRes.get(type);
            callback(fileMap);
        })
    }

    static loadResMap(callback){
        if(Resources.mapCallback.length > 0){
            Resources.mapCallback.push(callback);
            return;
        }
        if(Resources.mapRes == null){
            Resources.mapRes = new Map();
            var url = "Assets/Resources.json";
            Resources.mapCallback.push(callback);
            engine.loader.load(url).promise.then(function(raw){ 
                var resObj = raw.value;
                for(var i=0; i<resObj.length; i++){
                    var category = resObj[i];
                    var type = category.type;
                    var files = category.files;
                    if(files.length > 0){
                        Resources.resTypes.push(type);
                        var thisTypeMap = new Map();
                        for(var k=0; k<files.length; k++){
                            var fileInfo = files[k];
                            var key = fileInfo.key.toLowerCase();
                            var value = fileInfo.name;
                            thisTypeMap.set(key, value);
                        }
                        Resources.mapRes.set(type, thisTypeMap);
                    }
                }
                for(var i = 0; i<Resources.mapCallback.length; i++){
                    var cbk = Resources.mapCallback[i];
                    cbk();
                }
                Resources.mapCallback.splice(0);
            }).catch((error)=>{
                throw new System.Exception(error);
            });
        }
        else{
            callback();
        }
    }

    static UnloadUnusedAssets(){
        
    }

    static getFileInfo(path, callback){
        path = path.toLowerCase();
        Resources.loadResMap(function(){
            var hasfile = false;
            for(var i=0; i < Resources.resTypes.length; i++){
                var type = Resources.resTypes[i];
                var fileMap = Resources.mapRes.get(type);

                if(fileMap){
                    var realpath = fileMap.get(path);
                    if(realpath){
                        hasfile = true;
                        callback(realpath, type);
                    }
                }
            }
            if(hasfile == false){
                callback(null);
            }
        })
    }
}

Resources.mapRes = null;
Resources.mapCallback = new Array();
Resources.resTypes = new Array();

Resources.directoryPathSet = new Set(); 

// 将对象挂在到MiniGameAdaptor
MiniGameAdaptor.register('Resources', Resources);
