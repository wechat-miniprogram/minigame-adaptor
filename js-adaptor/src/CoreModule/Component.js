Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Component", {
        inherits: [engine.Script],
        statics: {
            methods: {
                Deserialize: function(data, comp, context, builtContext) {
                    if (data.ref !== null && data.ref !== undefined && typeof(data.ref) === 'number') {
                        comp.ref = builtContext.components.data[data.ref];
                    }
                    else if (typeof(data) === 'number') {
                        comp.ref = builtContext.components.data[data];
                    }
                    return comp;
                }
            }
        },
        props: {
            gameObject: {
                get: function () {
                    return MiniGameAdaptor.engineToAdaptorMap.get(this.entity ? this.entity : this.ref.entity);
                }
            },
            tag: {
                get: function () {
                    // throw new System.Exception("not impl");
                    return this.gameObject.tag;
                },
                set: function (value) {
                    // throw new System.Exception("not impl");
                    this.gameObject.tag = value;
                }
            },
            transform: {
                get: function () {
                    return this.gameObject.transform;
                }
            },
            name: {
                get: function() {
                    return this.entity ? this.entity.name : this.ref.entity.name;
                },
                set: function(value) {
                    this.entity ? (this.entity.name = value) : (this.ref.entity.name = value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                // MiniGameAdaptor.Object.ctor.call(this);
                engine.Script.call(this);
            }
        },
        methods: {
            BroadcastMessage: function (methodName) {
                // throw new System.Exception("not impl");
                this.gameObject.BroadcastMessage(methodName);
            },
            BroadcastMessage$1: function (methodName, parameter) {
                // throw new System.Exception("not impl");
                this.gameObject.BroadcastMessage$1(methodName, parameter);
            },
            BroadcastMessage$2: function (methodName, parameter, options) {
                // throw new System.Exception("not impl");
                this.gameObject.BroadcastMessage$2(methodName, parameter, options);
            },
            BroadcastMessage$3: function (methodName, options) {
                // throw new System.Exception("not impl");
                this.gameObject.BroadcastMessage$3(methodName, options);
            },
            CompareTag: function (tag) {
                // throw new System.Exception("not impl");
                return this.tag === tag;
            },
            GetComponent: function (T) {
                return this.gameObject.GetComponent(T);
            },
            GetComponent$1: function (type) {
                return this.gameObject.GetComponent$1(T);
            },
            GetComponentInChildren: function (T) {
                return this.gameObject.GetComponentInChildren(T);
            },
            GetComponentInChildren$1: function (T, includeInactive) {
                return this.gameObject.GetComponentInChildren$1(T, includeInactive);
            },
            GetComponentInParent: function (T) {
                return this.gameObject.GetComponentInParent(T);
            },
            GetComponents: function (T) {
                return this.gameObject.GetComponents(T);
            },
            GetComponentsInChildren: function (T) {
                return this.gameObject.GetComponentsInChildren(T);
            },
            GetComponentsInChildren$1: function (T, includeInactive) {
                return this.gameObject.GetComponentsInChildren$1(T, includeInactive);
            },
            GetComponentsInParent: function (T) {
                return this.gameObject.GetComponentsInParent(T);
            },
            GetComponentsInParent$1: function (T, includeInactive) {
                return this.gameObject.GetComponentsInParent$1(T, includeInactive);
            },
            SendMessage: function (methodName) {
                // throw new System.Exception("not impl");
                this.gameObject.SendMessage(methodName);
            },
            SendMessage$1: function (methodName, value) {
                // throw new System.Exception("not impl");
                this.gameObject.SendMessage$1(methodName, value);
            },
            SendMessage$2: function (methodName, value, options) {
                // throw new System.Exception("not impl");
                this.gameObject.SendMessage$2(methodName, value, options);
            },
            SendMessage$3: function (methodName, options) {
                // throw new System.Exception("not impl");
                this.gameObject.SendMessage$3(methodName, options);
            },
            SendMessageUpwards: function (methodName) {
                throw new System.Exception("not impl");
            },
            SendMessageUpwards$1: function (methodName, value) {
                throw new System.Exception("not impl");
            },
            SendMessageUpwards$2: function (methodName, value, options) {
                throw new System.Exception("not impl");
            },
            SendMessageUpwards$3: function (methodName, options) {
                throw new System.Exception("not impl");
            }
        }
    });
});


