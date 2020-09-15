Bridge.assembly("NGUI-stub", function ($asm, globals) {
    "use strict";
    Bridge.define("MiniGameAdaptor.EventDelegate", {
        statics: {
            methods: {
                Add: function (list, callback) {
                    if (!list) {
                        return;
                    }
                    list.add(new MiniGameAdaptor.EventDelegate.$ctor1(callback));
                },
                Add$1: function (list, callback, oneShot) {
                    throw new System.Exception("not impl");
                },
                Add$2: function (list, ev) {
                    throw new System.Exception("not impl");
                },
                Add$3: function (list, ev, oneShot) {
                    throw new System.Exception("not impl");
                },
                Execute: function (list) {
                    throw new System.Exception("not impl");
                },
                IsValid: function (list) {
                    throw new System.Exception("not impl");
                },
                Remove: function (list, ev) {
                    if(!list){
                        return;
                    }
                    list.remove(ev);
                },
                Remove$1: function (list, callback) {
                    throw new System.Exception("not impl");
                },
                Set: function (list, callback) {
                    throw new System.Exception("not impl");
                },
                Set$1: function (list, del) {
                    throw new System.Exception("not impl");
                },
                __genEngineInputCallback: function(_comp, target, method, paramsObj, event='onClick') {

                    if (!_comp || !target || !method) return;
                    var onClick = {};

                    onClick.target = target
                    onClick.method = method

                    onClick.params = []
                    paramsObj.forEach(obj => {
                        // mock GameObject/Component
                        onClick.params.push({
                            ref: obj,
                            name: obj.entity.name,
                            GetComponent: function(T) {
                                return obj.entity.getComponent(T)
                            }
                        });
                    });

                    var callback = function(comp, event) {
                        const btn = _comp.entity.getComponent(engine.UIButton);
                        if(btn && btn.disable){
                            return false;
                        }
                        if (onClick.target[onClick.method]) {
                            onClick.target[onClick.method].apply(onClick.target, onClick.params);
                        }
                    };
                    // view
                    _comp[event].add(new MiniGameAdaptor.EventDelegate.$ctor1(callback));
                    return callback;
                },
            }
        },
        fields: {
            oneShot: false,
            target:null,
            methodName:null,
            __callback: null
        },
        props: {
            isEnabled: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            isValid: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            parameters: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
            },
            $ctor1: function (call) {
                this.$initialize();
                this.$initialize();
                this.__callback = call;
            },
            $ctor2: function (target, methodName) {
                this.target = target;
                this.methodName = methodName;
                this.$initialize();
                if (target && methodName && target[methodName]) {
                    this.__callback = function(comp, event) {
                        target[methodName](comp, event);
                    };
                }
            }
        },
        methods: {
            Clear: function () {
                throw new System.Exception("not impl");
            },
            equals: function (obj) {
                throw new System.Exception("not impl");
            },
            Execute: function () {
                if(this.target){
                    this.target[this.methodName]();
                }
            },
            getHashCode: function () {
                throw new System.Exception("not impl");
            },
            Set: function (target, methodName) {
                throw new System.Exception("not impl");
            },
            toString: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.EventDelegate')(MiniGameAdaptor.EventDelegate);
Object.defineProperty(MiniGameAdaptor.EventDelegate.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.EventDelegate.prototype.__properties }
})
