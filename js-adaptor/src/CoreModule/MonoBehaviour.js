import { engineColliderToAdaptorColliderMap } from '../Physics/Physx.js';

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.MonoBehaviour", {
        inherits: [MiniGameAdaptor.Behaviour],
        statics: {
            methods: {
                print: function (message) {
                    console.log(message.toString());
                }
            }
        },
        fields: {
            __fixedTimer: 0
        },
        props: {
            runInEditMode: {
                get: function () {
                    return false;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            useGUILayout: {
                get: function () {
                    return false;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            enabled : {
                get: function () {
                    return this.active;
                },
                set: function (value) {
                    this.active = value;
                }
            },
            isActiveAndEnabled: {
                get: function () {
                    return this.active;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Behaviour.ctor.call(this);
                this.timers = {};
            }
        },
        methods: {
            CancelInvoke: function () {
                for(var name in this.timers){
                    if(this.timers.hasOwnProperty(name)){
                        var id = this.timers[name];
                        clearTimeout(id);
                        clearInterval(id);
                    }
                }
                this.timers = {};
            },
            CancelInvoke$1: function (methodName) {
                if(this.timers.hasOwnProperty(methodName)){
                    var id = this.timers[methodName];
                    clearTimeout(id);
                    clearInterval(id);
                    delete this.timers[methodName];
                }
            },
            Invoke: function (methodName, time) {
                if ( this[methodName] ) {
                    let _this = this;
                    var id = setTimeout(()=>{
                        _this[methodName] ();
                    }, time * 1000);
                    this.timers[methodName] = id;
                }
            },
            InvokeRepeating: function (methodName, time, repeatRate) {
                if ( this[methodName] ) {
                    let _this = this;
                    setTimeout(()=>{
                        var id = setInterval(()=>{
                            _this[methodName] ();
                        }, repeatRate * 1000);
                        this.timers[methodName] = id;
                    }, time * 1000);
                }
            },
            IsInvoking: function () {
                return Object.keys(this.timers).length > 0;
            },
            IsInvoking$1: function (methodName) {
                return this.timers.hasOwnProperty(methodName);
            },
            StartCoroutine: function (routine) {
                return MiniGameAdaptor.CoroutineManager.Instance.StartCoroutine(routine);
            },
            StartCoroutine$1: function (methodName) {
                return MiniGameAdaptor.CoroutineManager.Instance.StartCoroutine(this[methodName]());
            },
            StartCoroutine$2: function (methodName, value) {
                throw new System.Exception("not impl");
            },
            StopAllCoroutines: function () {
                return MiniGameAdaptor.CoroutineManager.Instance.StopAllCoroutines();
            },
            StopCoroutine: function (routine) {
                return MiniGameAdaptor.CoroutineManager.Instance.StopCoroutine(routine);
            },
            StopCoroutine$1: function (methodName) {
                return MiniGameAdaptor.CoroutineManager.Instance.StopCoroutine(this[methodName]());
            },
            StopCoroutine$2: function (routine) {
                return MiniGameAdaptor.CoroutineManager.Instance.StopCoroutine(routine);
            },

            /* 调用子实例的实例函数*/
            _BridgeInvokeInstanceMethodIfHas(methodName) {
                try {
                    if (!methodName) {
                        return;
                    }
                    if (!this._BridgeInvokeNameMap) {
                        this._BridgeInvokeNameMap = {};
                    }
                    var method = this._BridgeInvokeNameMap[methodName];
                    if (method === undefined) {
                        method = Bridge.Reflection.getMembers(Bridge.getType(this), 8, 52 | 256, methodName);
                        if (!method) {
                            method = null;
                            if (this[methodName]) {
                                console.error("_BridgeInvokeInstanceMethodIfHas, error", Bridge.getType(this));
                            }
                        }
                        this._BridgeInvokeNameMap[methodName] = method;
                    }

                    if (method) {
                        // searched, found it
                        return Bridge.Reflection.midel(method, this, null)(null);
                    }
                }
                catch(e) {
                    const name = this.entity ? this.entity.name : "";
                    const type = this.$$fullname ? this.$$fullname : "";
                    console.error("[" + methodName + " Error]   " + name + "   " + type);
                    throw e;
                }
            },

            // simple iteration trying to invoke overload method
            // cuz reflection costs much more time
            _OverloadMethodInvoke(methodName, parameter) {
                if (this[methodName]) {
                    if (parameter) {
                        this[methodName](parameter)
                    } else {
                        this[methodName]()
                    }
                    // this[methodName]();
                    return;
                }
                // bridge overload
                for(let i = 0; i < 5; i++) {
                    let overloadName = methodName + "$" + i;
                    if (this[overloadName]) {
                        // this[overloadName]();
                        if (parameter) {
                            this[methodName](parameter)
                        } else {
                            this[methodName]()
                        }
                        return;
                    }
                }
            },

            onAwake(){
                // if (this.Awake) this.Awake();
                // this._BridgeInvokeInstanceMethodIfHas("Awake");
                this._OverloadMethodInvoke("Awake")
            },

            onEnable() {
                // if (this.OnEnable) this.OnEnable();
                // this._BridgeInvokeInstanceMethodIfHas("OnEnable");
                this._OverloadMethodInvoke("OnEnable")

            },

            onStart(){
                // if (this.Start) this.Start();
                // this._BridgeInvokeInstanceMethodIfHas("Start");
                this._OverloadMethodInvoke("Start")

            },

            onFixedUpdate(){
                // engine doesn't have FixedUpdate callback

                // if (this.FixedUpdate) this.FixedUpdate();
                // this._BridgeInvokeInstanceMethodIfHas("FixedUpdate");
            },

            onUpdate(dt){

                // this._BridgeInvokeInstanceMethodIfHas("Update");
                this._OverloadMethodInvoke("Update")

                // mock FixedUpdate, but not precise
                this.__fixedTimer += dt
                if (this.__fixedTimer >= MiniGameAdaptor.Time.fixedDeltaTime) {
                    this.__fixedTimer = 0;
                    // this._BridgeInvokeInstanceMethodIfHas("FixedUpdate");
                    this._OverloadMethodInvoke("FixedUpdate");
                }

            },

            onLateUpdate(){
                // this._BridgeInvokeInstanceMethodIfHas("LateUpdate");
                this._OverloadMethodInvoke("LateUpdate")

            },

            onDisable(){
                // this._BridgeInvokeInstanceMethodIfHas("OnDisable");
                this._OverloadMethodInvoke("OnDisable")

            },

            onDestroy(){
                // this._BridgeInvokeInstanceMethodIfHas("OnDestroy");
                this._OverloadMethodInvoke("OnDestroy")

            },

            // 下面是物理组件才会用到的生命周期函数
            onTriggerEnter(other){
                const collider = engineColliderToAdaptorColliderMap.get(other.collider);
                this._OverloadMethodInvoke("OnTriggerEnter", collider);
            },

            onTriggerExit(other){
                const collider = engineColliderToAdaptorColliderMap.get(other.collider);
                this._OverloadMethodInvoke("OnTriggerExit", collider);
            },

            onTriggerStay(other){
                const collider = engineColliderToAdaptorColliderMap.get(other.collider);
                this._OverloadMethodInvoke("OnTriggerStay", collider);
            },

            onCollisionEnter(other){
                const collision = new MiniGameAdaptor.Collision.$ctor1(other);
                /*console.log('onCollisionEnter',other,  collision)*/
                this._OverloadMethodInvoke("OnCollisionEnter", collision);
            },

            onCollisionExit(other){
                const collision = new MiniGameAdaptor.Collision.$ctor1(other);
                /*console.log('onCollisionExit', other,  collision)*/
                this._OverloadMethodInvoke("OnCollisionExit", collision);
            },

            onCollisionStay(other){
                const collision = new MiniGameAdaptor.Collision.$ctor1(other);
                /*console.log('onCollisionStay', other,  collision)*/
                this._OverloadMethodInvoke("OnCollisionStay", collision);
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.MonoBehaviour')(MiniGameAdaptor.MonoBehaviour);
Object.defineProperty(MiniGameAdaptor.MonoBehaviour.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.MonoBehaviour.prototype.__properties }
})
