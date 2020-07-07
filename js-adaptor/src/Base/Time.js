import MiniGameAdaptor from '../MiniGameAdaptor.js';
import {onRootMonoBehaviourUpdate, onSceneLoad} from '../Extend/RootMonoBehaviour'

let _fixedDeltaTime = 0.04;
let _deltaTime = 0.02;
let _time = 0;
let _frameCount = 0;
let lastLevelLoadTime = _time;
let smoothDeltaTimer = {
    recordArray: [],
    recordMaxCount: 5,
    recordOldestIndex: 0,
    getSmoothDeltaTime: function() {
        let result = 0;
        this.recordArray.forEach(dt => {
            result += dt;
        });
        return result / this.recordArray.length;
    }
};

onRootMonoBehaviourUpdate((dt) => {
    // dt = 0.0167;
    _deltaTime = dt;
    _time += dt;
    _frameCount++;
    // console.log(_time);

    if (smoothDeltaTimer.recordArray.length < smoothDeltaTimer.recordMaxCount) {
        smoothDeltaTimer.recordArray.push(dt);
    } else {
        smoothDeltaTimer.recordArray[smoothDeltaTimer.recordOldestIndex] = dt;
        smoothDeltaTimer.recordOldestIndex = (smoothDeltaTimer.recordOldestIndex + 1) % smoothDeltaTimer.recordMaxCount;
    }
})
onSceneLoad(() => {
    lastLevelLoadTime = _time;
})

class Time{
    static get time(){ return _time; }
    static get deltaTime(){ return _deltaTime; }
    static get fixedDeltaTime(){ return _fixedDeltaTime; }
    static set fixedDeltaTime(v) { _fixedDeltaTime = v; }
    static get frameCount(){ return _frameCount; }
    static get realtimeSinceStartup() { return _time; }
    static get unscaledDeltaTime() { return _deltaTime; }
    // 这是以秒计算到最后的关卡已经加载完的时间。
    static get timeSinceLevelLoad() {
        return _time - lastLevelLoadTime
    }
    static get smoothDeltaTime() {
        return smoothDeltaTimer.getSmoothDeltaTime();
    }
}

// 将对象挂在到MiniGameAdaptor
MiniGameAdaptor.register('Time', Time);

