Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    function BroadcastMessage(result, ref,  methodName, parameter) {
        ref.getAllComponents().forEach( item => {
            if ( item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName] ) {
                result.flag = true;

                if ( parameter ) {
                    item[methodName](parameter);
                } else {
                    item[methodName]();
                }
            }
        });
    }

    let hasBroadcastMessageReceiver = false;

    Bridge.define("MiniGameAdaptor.GameObject", {
        inherits: [MiniGameAdaptor.Object],
        fields: {
            ref: null,
            _transform: null,
            _layer: 0
        },
        statics: {
            methods: {
                CreatePrimitive: function (type) {
                    throw new System.Exception("not impl");
                },
                Find: function (name) {
                    const root = game.activeScene.root.transform;
                    let result = null;
                    root.travelChild(child => {
                        if (child.entity.name === name) {
                            result = MiniGameAdaptor.engineToAdaptorMap.get(child.entity);
                            return;
                        }
                    });
                    return result;
                },
                FindGameObjectsWithTag: function (tag) {
                    throw new System.Exception("not impl");
                },
                FindGameObjectWithTag: function (tag) {
                    throw new System.Exception("not impl");
                },
                FindWithTag: function (tag) {
                    throw new System.Exception("not impl");
                }
            }
        },
        props: {
            activeInHierarchy: {
                get: function () {
                    return this.ref.activeInHierarchy;
                }
            },
            activeSelf: {
                get: function () {
                    return this.ref.active;
                }
            },
            gameObject: {
                // TODO
                get: function () {
                    return this;
                }
            },
            isStatic: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            layer: {
                get: function () {
                    return this._layer;
                },
                set: function (value) {
                    this._layer = value;
                }
            },
            scene: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            tag: {
                get: function () {
                    return this.__tag;
                },
                set: function (value) {
                    this.__tag === value;
                }
            },
            transform: {
                get: function () {
                    return this._transform;
                }
            },
            name: {
                get: function() {
                    return this.ref.name;
                },
                set: function(value) {
                    this.ref.name = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);

                this.ref = engine.Entity.createEntity3D();
                MiniGameAdaptor.engineToAdaptorMap.set(this.ref, this);

                this.__tag = 'Untagged';
                this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
            },
            $ctor1: function (name) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);

                this.ref = engine.Entity.createEntity3D(name);
                MiniGameAdaptor.engineToAdaptorMap.set(this.ref, this);

                this.__tag = 'Untagged';
                this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
            },
            $ctor2: function (name, components) {
                if (components === void 0) { components = []; }

                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);

                this.ref = engine.Entity.createEntity3D(name);
                MiniGameAdaptor.engineToAdaptorMap.set(this.ref, this);

                this.__tag = 'Untagged';
                this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
            },
            $ctor3: function(ref) {
                this.$initialize();
                MiniGameAdaptor.Object.ctor.call(this);
                this.ref = ref;

                this.__tag = 'Untagged';

                let __transform = this.ref.getComponent(MiniGameAdaptor.Transform);
                if (__transform) {
                    this._transform = __transform;
                } else {
                    this._transform = new MiniGameAdaptor.Transform(this.ref.transform);
                }
            }
        },
        methods: {
            AddComponent: function (T) {
                return this.ref.addComponent(T);
            },
            AddComponent$1: function (componentType) {
                return this.ref.addComponent(componentType);
            },

            // alls the method named methodName on every MonoBehaviour in this game object or any of its children.
            _BroadcastMessage: function (entity, methodName, parameter) {
                entity.getAllComponents().forEach( item => {
                    if ( item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName] ) {
                        hasBroadcastMessageReceiver = true;

                        if ( parameter ) {
                            item[methodName](parameter);
                        } else {
                            item[methodName]();
                        }
                    }
                });

                entity.transform.children.forEach( child => {
                    this._BroadcastMessage(child.entity, methodName, parameter);
                });
            },

            BroadcastMessage: function (methodName) {
                hasBroadcastMessageReceiver = false;

                this._BroadcastMessage(this.ref, methodName);

                if ( !hasBroadcastMessageReceiver ) {
                    console.error(`BroadcastMessage ${ methodName } has no receiver!`);
                }
            },

            BroadcastMessage$1: function (methodName, parameter) {
                hasBroadcastMessageReceiver = false;

                this._BroadcastMessage(this.ref, methodName, parameter);

                if ( !hasBroadcastMessageReceiver ) {
                    console.error(`BroadcastMessage ${ methodName } has no receiver!`);
                }
            },

            BroadcastMessage$2: function (methodName, parameter, options) {
                hasBroadcastMessageReceiver = false;

                this._BroadcastMessage(this.ref, methodName, parameter);

                if ( !hasBroadcastMessageReceiver && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver ) {
                    console.error(`BroadcastMessage ${ methodName } has no receiver!`);
                }
            },

            BroadcastMessage$3: function (methodName, options) {
                hasBroadcastMessageReceiver = false;

                this._BroadcastMessage(this.ref, methodName);

                if ( !hasBroadcastMessageReceiver && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver ) {
                    console.error(`BroadcastMessage ${ methodName } has no receiver!`);
                }
            },

            CompareTag: function (tag) {
                throw new System.Exception("not impl");
            },
            GetComponent: function (T) {
                return this.ref.getComponent(T);
            },
            GetComponent$1: function (type) {
                return this.ref.getComponent(type);
            },
            // dfs
            _GetComponentInChildrenRecursively: function (children, T, includeInactive) {
                if (!children) return null;
                for (var i = 0; i < children.length; i++) {
                    if (!includeInactive && !children[i].entity.active) {
                        continue;
                    }

                    if (children[i]._children) {
                        let comp = this._GetComponentInChildrenRecursively(children[i]._children, T, includeInactive);
                        if (comp) return comp;
                    }

                    let comp = children[i].entity.getComponent(T);
                    if (comp) return comp;
                }
            },
            // Returns the component of Type type in the GameObject or any of its children using depth first search.
            GetComponentInChildren: function (T) {
                return this.GetComponentInChildren$1(T, false);
            },
            GetComponentInChildren$1: function (T, includeInactive) {
                let selfComp = this.ref.getComponent(T);
                if (selfComp) {
                    return selfComp;
                }
                return this._GetComponentInChildrenRecursively(this.ref.transform._children, T, includeInactive);
            },
            _GetComponentInParentRecursively: function (transform, T) {
                if (!transform) return null;
                let c = transform.entity.getComponent(T);
                if (c) return c;
                return this._GetComponentInParentRecursively(transform.parent, T);
            },
            GetComponentInParent: function (T) {
                return this._GetComponentInParentRecursively(this.ref.transform, T);
            },
            GetComponents: function (T) {
                return this.ref.getComponents(T);
            },
            GetComponentsInChildren: function (T) {
                return this.GetComponentsInChildren$1(T, false);
            },
            GetComponentsInChildren$1: function (T, includeInactive) {
                let comps = [];

                this.ref.transform.travelChild(child => {
                    if (!includeInactive && !child.entity.active) return;

                    let comp = child.entity.getComponent(T);
                    if (comp) comps.push(comp);
                });
                return comps;
            },
            GetComponentsInChildren$3: function (T, lst) {
                var comps = this.GetComponentsInChildren$1(T, true);
                lst.AddRange(comps);
                return comps;
            },
            GetComponentsInParent: function (T) {
                return this.GetComponentsInParent$1(T, false);
            },
            GetComponentsInParent$1: function (T, includeInactive) {
                let comps = [];

                let selfComp = this.ref.getComponent(T);
                if (selfComp) {
                    comps.push(selfComp);
                }

                let transform = this.ref.transform;
                while(transform && transform.entity.name !== game.activeScene.root.name) {
                    if (!includeInactive && !transform.entity.active) return comps;

                    let comp = transform.entity.getComponent(T);
                    if (comp) comps.push(comp);
                    transform = transform.parent;
                }
                return comps;
            },
            SendMessage: function (methodName) {
                let flag = false;
                this.ref.getAllComponents().forEach( item => {
                    if ( item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName] ) {
                        flag = true;
                        item[methodName]();
                    }
                });

                if( !flag ) {
                    console.error(`SendMessage ${ methodName } has no receiver!`);
                }
            },
            SendMessage$1: function (methodName, value) {
                let flag = false;
                this.ref.getAllComponents().forEach( item => {
                    if ( item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName] ) {
                        flag = true;
                        item[methodName](value);
                    }
                });

                if( !flag ) {
                    console.error(`SendMessage ${ methodName } has no receiver!`);
                }
            },
            SendMessage$2: function (methodName, value, options) {
                let flag = false;
                this.ref.getAllComponents().forEach( item => {
                    if ( item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName] ) {
                        flag = true;
                        item[methodName](value);
                    }
                });

                if( !flag && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver ) {
                    console.error(`SendMessage ${ methodName } has no receiver!`);
                }
            },
            SendMessage$3: function (methodName, options) {
                let flag = false;
                this.ref.getAllComponents().forEach( item => {
                    if ( item instanceof MiniGameAdaptor.MonoBehaviour && item[methodName] ) {
                        flag = true;
                        item[methodName]();
                    }
                });

                if( !flag && options === MiniGameAdaptor.SendMessageOptions.RequireReceiver ) {
                    console.error(`SendMessage ${ methodName } has no receiver!`);
                }
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
            },
            SetActive: function (value) {
                // console.log(this.ref.name + ' active: ' + value);
                this.ref.active = value;
            }
        }
    });
});


engine.decorators.serialize('MiniGameAdaptor.GameObject')(MiniGameAdaptor.GameObject);
Object.defineProperty(MiniGameAdaptor.GameObject.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.GameObject.prototype.__properties }
})
