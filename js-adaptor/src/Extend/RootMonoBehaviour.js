import MiniGameAdaptor from '../MiniGameAdaptor.js';

const globalUpdateCallback = new Set()
function onRootMonoBehaviourUpdate(callback) {
    globalUpdateCallback.add(callback)
}
function offRootMonoBehaviourUpdate(callback) {
    globalUpdateCallback.delete(callback)
}

// onStart callback
const globalStartCallback = new Set()
function onRootMonoBehaviourStart(callback) {
    globalStartCallback.add(callback)
}
function offRootMonoBehaviourStart(callback) {
    globalStartCallback.delete(callback)
}

// 场景切换事件
const globalSceneLoadCallBack = new Set()
function onSceneLoad(callback) {
    globalStartCallback.add(callback)
}
function offSceneLoad(callback) {
    globalStartCallback.delete(callback)
}
function invokeSceneLoadCallBack() {
    globalSceneLoadCallBack.forEach((callback) => {
        callback()
    })
}

// 具体模块实现
class RootMonoBehaviour extends engine.Script{

    constructor(){
        super();
    }

    onAwake(){
    }

    onEnable() {
    }

    onStart(){
        globalStartCallback.forEach((callback) => {
            callback()
        })
    }

    onFixedUpdate(){
    }

    onUpdate(dt){
        MiniGameAdaptor.CoroutineManager.Instance.Update();
        globalUpdateCallback.forEach((callback) => {
            callback(dt)
        })
    }

    onLateUpdate(){
    }

    onDisable(){
    }

    onDestroy(){
    }
}

MiniGameAdaptor.register('RootMonoBehaviour', RootMonoBehaviour);

// var originPlayScene = game.playScene;

setTimeout(function () {
    var root = game.activeScene.root;
    root.addComponent(MiniGameAdaptor.RootMonoBehaviour);
    invokeSceneLoadCallBack();
}, 0);

export {
    onRootMonoBehaviourUpdate,
    offRootMonoBehaviourUpdate,
    onRootMonoBehaviourStart,
    offRootMonoBehaviourStart,
    onSceneLoad,
    offSceneLoad,
}
