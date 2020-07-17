import {onRootMonoBehaviourUpdate} from '../Extend/RootMonoBehaviour'

let mousePosition
let _mouseButtonDownState = false
let mouseButtonDownState = false
let _mouseButtonUpState = false
let mouseButtonUpState = false
let mouseButtonIsHeldDown = false
const validButtons = [0, 1, 2]
let mAacceleration = new MiniGameAdaptor.Vector3.$ctor2(0, 0, 0)

let mTouchCount = 0;
let mTouchEnd = true;
let mTouches = new Array();


// 消费当前的 mouseButtonDownState 和 mouseButtonUpState，需要在所有组件 Update 之前调用这两个函数
function consumeMouseButtonDownState() {
    mouseButtonDownState = _mouseButtonDownState
    _mouseButtonDownState = false
}
function consumeMouseButtonUpState() {
    mouseButtonUpState = _mouseButtonUpState
    _mouseButtonUpState = false
}
//用标记延迟修改mTouchCount,防止最后一次 End/Cancel 受不到.
function consumeTouchCountState() {
    if(mTouchEnd){
        mTouchCount = 0;
    }
}
onRootMonoBehaviourUpdate(consumeMouseButtonDownState)
onRootMonoBehaviourUpdate(consumeMouseButtonUpState)
onRootMonoBehaviourUpdate(consumeTouchCountState)

wx.onTouchStart((e) => {
    _mouseButtonDownState = true
    updateMousePosition(e.touches)
    updateTouches(e.touches,e.changedTouches,MiniGameAdaptor.TouchPhase.Began)
})

wx.onTouchMove((e) => {
    updateMousePosition(e.touches)
    updateTouches(e.touches,e.changedTouches,MiniGameAdaptor.TouchPhase.Moved)
})

wx.onTouchCancel((e) => {
    updateMousePosition(e.touches)
    updateTouches(e.touches,e.changedTouches,MiniGameAdaptor.TouchPhase.Canceled)
})

wx.onTouchEnd((e) => {
    _mouseButtonUpState = true
    updateMousePosition(e.touches)
    updateTouches(e.touches,e.changedTouches,MiniGameAdaptor.TouchPhase.Ended)
})

const { screenHeight } = wx.getSystemInfoSync()

// 更新 mousePosition 的坐标，所有 touch 事件发生时都要更新一次，取所有手指的平均值
// 参考 https://answers.unity.com/questions/180987/inputmouseposition-equivalent-to-first-finger-touc.html
function updateMousePosition(touches) {
    if (!mousePosition) {
        mousePosition = new MiniGameAdaptor.Vector3.$ctor1(0, 0)
    }
    if (touches.length === 0) {
        mouseButtonIsHeldDown = false
        return
    }

    mouseButtonIsHeldDown = true

    const { xSum, ySum } = touches.reduce(({xSum, ySum}, {clientX, clientY}) => {
        return {
            xSum: xSum + clientX,
            ySum: ySum + clientY
        }
    }, {xSum: 0, ySum: 0})
    const x = xSum / touches.length
    const y = ySum / touches.length

    mousePosition.x = x
    mousePosition.y = screenHeight - y
}

function updateTouches(touches,changedTouches,phase) {
    if (!mTouches) {
        mTouches = new Array();
    }
    let i = 0,j = 0;
    if (touches.length === 0) {
        if(changedTouches.length !== 0) {
            //changedTouches取出来的内容不是 Touch对象,还需要再确认一下原因,先简单写成如果 touches 为 0,就全部置为新的 phase
            // console.log("Input changedTouches.length:" + changedTouches.length);
            // for (i=0;i<changedTouches.length;i++){
            //     let changedtouche = changedTouches[i];
            //     console.log("Input changedTouch.fingerId:" + changedTouches[i].fingerId);
            //     console.log("Input changedTouch.fingerId:" + changedtouche.fingerId);
            //     console.log("Input changedTouch.position:" + changedTouches[i].position);
            //     console.log("Input changedTouch.position:" + changedtouche.position);
            //     console.log("Input changedTouch.phase:" + changedTouches[i].phase);
            //     console.log("Input changedTouch.phase:" + changedtouche.phase);
            //     for(j=0;j<mTouches.length;j++) {
            //         let touche = mTouches[j];
            //         console.log("Input changedTouch.fingerId:" + changedTouches[i].fingerId + ",touche.fingerId:" + touche.fingerId);
            //         if(changedTouches[i].fingerId === touche.fingerId) {
            //             let position = new MiniGameAdaptor.Vector2.$ctor1(changedTouches[i].clientX, changedTouches[i].clientY)
            //             touche.position = position;
            //             touche.phase = phase;
            //             mTouches[j] = touche;
            //             break;
            //         }
            //     }
            // }
        }
        for(i=0;i<mTouches.length;i++) {
            mTouches[i] = new MiniGameAdaptor.Touch();
            mTouches[i].phase = phase;
        }
        mTouchEnd = true;
        mTouchCount = changedTouches.length;
    } else {
        //待优化,不用每次都 new,可以就用原先mTouches的,只去改变值就好
        for (i=0;i<touches.length;i++){
            let touche = new MiniGameAdaptor.Touch();
            touche.fingerId = touches[i].identifier;
            let position = new MiniGameAdaptor.Vector2.$ctor1(touches[i].clientX, screenHeight - touches[i].clientY)
            touche.position = position;
            touche.phase = phase;
            mTouches[i] = touche;
        }
        mTouchEnd = false;
        mTouchCount = touches.length;
    }
    // console.log("Input mTouchCount:" + mTouchCount + ",mTouchEnd:" + mTouchEnd + ",phase:" + phase);
}
// 自动生成的桩代码
Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Input", {
        statics: {
            props: {
                acceleration: {
                    get: function () {
                        if (!mAacceleration) {
                            mAacceleration = new MiniGameAdaptor.Vector3.$ctor2(0, 0, 0)
                        }
                        return mAacceleration;
                    }
                },
                accelerationEventCount: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                accelerationEvents: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                anyKey: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                anyKeyDown: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                backButtonLeavesApp: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                compass: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                compensateSensors: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                compositionCursorPos: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                compositionString: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                deviceOrientation: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                gyro: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                imeCompositionMode: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                imeIsSelected: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                inputString: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                location: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                mousePosition: {
                    get: function () {
                        if (!mousePosition) {
                            mousePosition = new MiniGameAdaptor.Vector3.$ctor1(0, 0)
                        }
                        return mousePosition
                    }
                },
                mousePresent: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                mouseScrollDelta: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                multiTouchEnabled: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                simulateMouseWithTouches: {
                    get: function () {
                        throw new System.Exception("not impl");
                    },
                    set: function (value) {
                        throw new System.Exception("not impl");
                    }
                },
                stylusTouchSupported: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                touchCount: {
                    get: function () {
                        return mTouchCount;
                        // throw new System.Exception("not impl");
                    }
                },
                touches: {
                    get: function () {
                        return mTouches;
                        // throw new System.Exception("not impl");
                    }
                },
                touchPressureSupported: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                },
                touchSupported: {
                    get: function () {
                        throw new System.Exception("not impl");
                    }
                }
            },
            methods: {
                GetAccelerationEvent: function (index) {
                    throw new System.Exception("not impl");
                },
                GetAxis: function (axisName) {
                    throw new System.Exception("not impl");
                },
                GetAxisRaw: function (axisName) {
                    throw new System.Exception("not impl");
                },
                GetButton: function (buttonName) {
                    throw new System.Exception("not impl");
                },
                GetButtonDown: function (buttonName) {
                    throw new System.Exception("not impl");
                },
                GetButtonUp: function (buttonName) {
                    throw new System.Exception("not impl");
                },
                GetJoystickNames: function () {
                    throw new System.Exception("not impl");
                },
                GetKey: function (name) {
                    // dummy impl.
                },
                GetKey$1: function (key) {
                    // dummy impl.
                },
                GetKeyDown: function (name) {
                    // dummy impl.
                },
                GetKeyDown$1: function (key) {
                    // dummy impl.
                },
                GetKeyUp: function (name) {
                    // dummy impl.
                },
                GetKeyUp$1: function (key) {
                    // dummy impl.
                },
                GetMouseButton: function (button) {
                    if (validButtons.indexOf(button) > -1) {
                        return mouseButtonIsHeldDown
                    }
                    throw new System.Exception(`invalid button: ${button}`)
                },
                GetMouseButtonDown: function (button) {
                    if (validButtons.indexOf(button) > -1) {
                        return mouseButtonDownState
                    }
                    throw new System.Exception(`invalid button: ${button}`)
                },
                GetMouseButtonUp: function (button) {
                    if (validButtons.indexOf(button) > -1) {
                        return mouseButtonUpState
                    }
                    throw new System.Exception(`invalid button: ${button}`)
                },
                GetTouch: function (index) {
                    return mTouches.length >= index ? mTouches[index] : null;
                    // throw new System.Exception("not impl");
                },
                ResetInputAxes: function () {
                    throw new System.Exception("not impl");
                },
                StartAccelerometer: function (interval) {
                    console.log('Input StartAccelerometer interval: ' + interval);
                    wx.startAccelerometer({
                        interval: interval,
                        success: (res) => {
                            console.log('Input StartAccelerometer success');
                            wx.onAccelerometerChange(function (res) {
                                if(mAacceleration){
                                    mAacceleration.x = res.x;
                                    mAacceleration.y = res.y;
                                    mAacceleration.z = res.z;
                                }
                            });
                        }
                    })
                },
                StopAccelerometer: function () {
                    wx.stopAccelerometer();
                    wx.offAccelerometerChange();
                },
            }
        },
        ctors: {
            ctor: function () {
                console.log('Input ctor $initialize');
                this.$initialize();
                if (!this._acceleration) {
                    console.log('Input ctor $initialize new _acceleration');
                    this._acceleration = new MiniGameAdaptor.Vector3.$ctor2(0, 0, 0)
                }
            }
        }
    });
});

export {
    consumeMouseButtonUpState,
    consumeMouseButtonDownState
}
