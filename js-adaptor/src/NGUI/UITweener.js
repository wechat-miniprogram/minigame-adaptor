Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UITweener", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        statics: {
            fields: {
                current: null
            },
            methods: {
                Begin: function (T, go, duration, delay) {
                    if (delay === void 0) { delay = 0.0; }
                    throw new System.Exception("not impl");
                }
            }
        },
        fields: {
            method: 0,
            style: 0,
            animationCurve: null,
            ignoreTimeScale: false,
            delay: 0,
            duration: 0,
            steeperCurves: false,
            tweenGroup: 0,
            useFixedUpdate: false,
            onFinished: null,
            eventReceiver: null,
            callWhenFinished: null,
            timeScale: 0
        },
        props: {
            amountPerDelta: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            direction: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            tweenFactor: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            }
        },
        methods: {
            AddOnFinished: function (del) {
                throw new System.Exception("not impl");
            },
            AddOnFinished$1: function (del) {
                throw new System.Exception("not impl");
            },
            DoUpdate: function () {
                throw new System.Exception("not impl");
            },
            FixedUpdate: function () {
                throw new System.Exception("not impl");
            },
            OnUpdate: function (factor, isFinished) {
                throw new System.Exception("not impl");
            },
            Play: function (forward) {
                throw new System.Exception("not impl");
            },
            PlayForward: function () {
                throw new System.Exception("not impl");
            },
            PlayReverse: function () {
                throw new System.Exception("not impl");
            },
            RemoveOnFinished: function (del) {
                throw new System.Exception("not impl");
            },
            ResetToBeginning: function () {
                throw new System.Exception("not impl");
            },
            Sample: function (factor, isFinished) {
                throw new System.Exception("not impl");
            },
            SetEndToCurrentValue: function () {
                throw new System.Exception("not impl");
            },
            SetOnFinished: function (del) {
                throw new System.Exception("not impl");
            },
            SetOnFinished$1: function (del) {
                throw new System.Exception("not impl");
            },
            SetStartToCurrentValue: function () {
                throw new System.Exception("not impl");
            },
            Start: function () {
                throw new System.Exception("not impl");
            },
            Toggle: function () {
                throw new System.Exception("not impl");
            },
            Update: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
