let objMap = new WeakMap();

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.Object", {
        statics: {
            methods: {
                Destroy: function (obj) {
                    MiniGameAdaptor.Object.Destroy$1(obj, 0);
                },
                Destroy$1: function (obj, t) {
                    setTimeout(() => {
                        if (obj instanceof MiniGameAdaptor.Component) {
                            obj.entity ? obj.entity.removeComponent(obj) : obj = null;
                        } else {
                            obj.ref ? obj.ref.destroy() : obj = null;
                        }
                    }, t * 1000);
                },
                DestroyImmediate: function (obj) {
                    MiniGameAdaptor.Object.Destroy$1(obj, 0);
                },
                DestroyImmediate$1: function (obj, allowDestroyingAssets) {
                     throw new System.Exception("not impl");
                },
                DontDestroyOnLoad: function (target) {
                    throw new System.Exception("not impl");
                },
                FindObjectOfType: function (T) {
                    throw new System.Exception("not impl");
                },
                FindObjectsOfType: function (T) {
                    throw new System.Exception("not impl");
                },
                Instantiate: function (T, original) {
                    return MiniGameAdaptor.Object.Instantiate$1(T, original, game.sceneRoot.transform._children[0]);
                },
                Instantiate$1: function (T, original, parent) {
                    return MiniGameAdaptor.Object.Instantiate$4(T, original, null, null, parent);
                },
                Instantiate$2: function (T, original, parent, worldPositionStays) {
                    return MiniGameAdaptor.Object.Instantiate$4(T, original, null, null, parent);
                },
                Instantiate$3: function (T, original, position, rotation) {
                    return MiniGameAdaptor.Object.Instantiate$4(T, original, position, rotation, game.sceneRoot.transform._children[0]);
                },
                Instantiate$4: function (T, original, position, rotation, parent) {
                    // 特殊处理对engine.Prefab进行instantiate的逻辑
                    if (original instanceof engine.Prefab) {
                        let entity = original.instantiate();

                        entity.__prefab = original;
                        if (!entity.__clone) {
                            entity.name += "(Clone)";
                            entity.__clone = true;
                        }
                        parent.ref ? parent.ref.addChild(entity.transform) : parent.addChild(entity.transform);

                        let go = MiniGameAdaptor.engineToAdaptorMap.get(entity);
                        if (position) go.transform.position = position;
                        if (rotation) go.transform.rotation = rotation;

                        // onInstantiated回调
                        entity.components.forEach(c => {
                            if (c instanceof MiniGameAdaptor.Component && c["onInstantiated"]) {
                                c["onInstantiated"]();
                            }
                        });

                        if (T === MiniGameAdaptor.GameObject) {
                            return go;
                        } else {
                            return go.GetComponent(T);
                        }
                    } else if (original instanceof T) {

                        // 递归克隆entity及components
                        let cloneEntityRecursive = function(_origin, _copy) {
                            _origin.getAllComponents().forEach(component => {
                                let comp = _copy.addComponent(component.constructor);
                                // clone transform
                                if (comp && comp instanceof engine.Transform3D) {
                                    comp.position = engine.Vector3.createFromNumber(component.position.x, component.position.y, component.position.z);
                                    comp.quaternion = engine.Quaternion.createFromNumber(component.quaternion.x, component.quaternion.y, component.quaternion.z, component.quaternion.w);
                                    comp.scale = engine.Vector3.createFromNumber(component.scale.x, component.scale.y, component.scale.z);
                                }
                                
                                // TODO:
                                // 将原component上的值clone到新的component上
                            });

                            const _children = _origin.transform._children;
                            const len = _children.length;

                            if (len === 0) return;

                            for (let i = 0; i < len; i++) {
                                let _child = engine.Entity.createEntity3D(_children[i].entity.name);
                                _copy.transform.addChild(_child.transform);
                                cloneEntityRecursive(_children[i].entity, _child);
                            }
                        }

                        if (T === MiniGameAdaptor.GameObject) {
                            let origin = original.ref;
                            if (origin.__prefab) {
                                return MiniGameAdaptor.Object.Instantiate$4(T, origin.__prefab, position, rotation, parent);
                            }

                            let newRoot = engine.Entity.createEntity3D(origin.name + '(Clone)');
                            // let newRoot = engine.Entity.createEntity3D(origin.name);

                            cloneEntityRecursive(origin, newRoot);
                            parent.ref ? parent.ref.addChild(newRoot.transform) : parent.addChild(newRoot.transform);

                            // onInstantiated回调
                            entity.components.forEach(c => {
                                if (c instanceof MiniGameAdaptor.Component && c["onInstantiated"]) {
                                    c["onInstantiated"]();
                                }
                            });
                            return MiniGameAdaptor.engineToAdaptorMap.get(newRoot);
                        } else {
                            let origin = original.gameObject.ref;
                            if (origin.__prefab) {
                                return MiniGameAdaptor.Object.Instantiate$4(T, origin.__prefab, position, rotation, parent);
                            }
                            
                            let newRoot = engine.Entity.createEntity3D(origin.name + '(Clone)');
                            // let newRoot = engine.Entity.createEntity3D(origin.name);

                            cloneEntityRecursive(origin, newRoot);
                            parent.ref ? parent.ref.addChild(newRoot.transform) : parent.addChild(newRoot.transform);

                            // onInstantiated回调
                            entity.components.forEach(c => {
                                if (c instanceof MiniGameAdaptor.Component && c["onInstantiated"]) {
                                    c["onInstantiated"]();
                                }
                            });
                            return MiniGameAdaptor.engineToAdaptorMap.get(newRoot).GetComponent(T);
                        }
                    }
                },
                Instantiate$5: function (original) {
                    throw new System.Exception("not impl");
                },
                Instantiate$6: function (original, parent) {
                    throw new System.Exception("not impl");
                },
                Instantiate$7: function (original, parent, instantiateInWorldSpace) {
                    throw new System.Exception("not impl");
                },
                Instantiate$8: function (original, position, rotation) {
                    throw new System.Exception("not impl");
                },
                Instantiate$9: function (original, position, rotation, parent) {
                    throw new System.Exception("not impl");
                },
                op_Equality: function (x, y) {
                    return x == y;
                },
                op_Implicit: function (exists) {
                    return !!exists;
                },
                op_Inequality: function (x, y) {
                     return x != y;
                }
            }
        },
        props: {
            hideFlags: {
                get: function () {
                    return this.__hideFlags;
                },
                set: function (value) {
                    this.__hideFlags = value;
                }
            },
            name: {
                get: function () {
                    return this.__name;
                },
                set: function (value) {
                    this.__name = value;
                }
            }
        },
        ctors: {
            ctor: function (name) {
                this.$initialize();

                let _private = {};
                _private.uuid = uuidv4();
                objMap.set(this, _private);

                this.__hideFlags = 'None';
                this.__name      = name ? name : '';
            }
        },
        methods: {
            equals: function (other) {
                return !!this === other;
            },
            getHashCode: function () {
                return objMap.get(this).uuid;
            },
            GetInstanceID: function () {
                return objMap.get(this).uuid;
            },
            toString: function () {
                return this.name;
            }
        }
    });
});

